#!/usr/bin/env node

import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DOCS_OUTPUT_DIR = 'public/docs';
const METADATA_OUTPUT_FILE = 'src/data/docs-metadata.json';

/**
 * Scan component directories and generate documentation metadata
 */
async function generateDocsMetadata() {
    console.log('🚀 Generating documentation metadata...');

    try {
        // Ensure output directories exist
        await fs.mkdir(DOCS_OUTPUT_DIR, { recursive: true });
        await fs.mkdir(path.dirname(METADATA_OUTPUT_FILE), { recursive: true });

        const metadata = {
            components: [],
            milestones: [],
            project: [],
            reports: [],
            generated: new Date().toISOString(),
            totalFiles: 0
        };

        // Generate component documentation
        await generateComponentDocs(metadata);

        // Generate milestone documentation  
        await generateMilestoneDocs(metadata);

        // Generate project documentation
        await generateProjectDocs(metadata);

        // Generate reports documentation
        await generateReportsDocs(metadata);

        // Calculate total files
        metadata.totalFiles =
            metadata.components.length +
            metadata.milestones.length +
            metadata.project.length +
            metadata.reports.length;

        // Write metadata file
        await fs.writeFile(
            METADATA_OUTPUT_FILE,
            JSON.stringify(metadata, null, 2),
            'utf8'
        );

        console.log(`✅ Generated metadata for ${metadata.totalFiles} documentation files`);
        console.log(`📝 Metadata saved to: ${METADATA_OUTPUT_FILE}`);
        console.log(`📁 Documentation copied to: ${DOCS_OUTPUT_DIR}`);

        return metadata;

    } catch (error) {
        console.error('❌ Error generating documentation metadata:', error);
        throw error;
    }
}

/**
 * Generate component documentation metadata
 */
async function generateComponentDocs(metadata) {
    const nebulaDir = 'nebula/components';

    try {
        const componentDirs = await fs.readdir(nebulaDir, { withFileTypes: true });

        for (const dirent of componentDirs) {
            if (dirent.isDirectory()) {
                const componentName = dirent.name;
                const componentDir = path.join(nebulaDir, componentName);
                const readmePath = path.join(componentDir, 'README.md');
                const docPath = path.join(componentDir, `${componentName}.md`);

                // Check if documentation exists
                let sourceFile = null;

                try {
                    await fs.access(readmePath);
                    sourceFile = readmePath;
                } catch {
                    try {
                        await fs.access(docPath);
                        sourceFile = docPath;
                    } catch {
                        // Create basic documentation if none exists
                        sourceFile = await createBasicComponentDoc(componentDir, componentName);
                    }
                }

                // Copy documentation to public directory
                const targetPath = `${DOCS_OUTPUT_DIR}/components/${componentName.toLowerCase()}.md`;
                await fs.mkdir(path.dirname(targetPath), { recursive: true });
                await fs.copyFile(sourceFile, targetPath);

                // Analyze component for metadata
                const componentMetadata = await analyzeComponent(componentDir, componentName);

                metadata.components.push({
                    name: componentName,
                    path: `/docs/components/${componentName.toLowerCase()}.md`,
                    category: 'Components',
                    description: componentMetadata.description,
                    size: componentMetadata.size,
                    tags: componentMetadata.tags,
                    hasTests: componentMetadata.hasTests,
                    hasStories: componentMetadata.hasStories,
                    lastModified: componentMetadata.lastModified
                });
            }
        }
    } catch (error) {
        console.warn('⚠️ Could not process components directory:', error.message);
    }

    console.log(`📱 Generated ${metadata.components.length} component docs`);
}

/**
 * Analyze component directory for metadata
 */
async function analyzeComponent(componentDir, componentName) {
    let files = [];
    try {
        files = await fs.readdir(componentDir);
    } catch {
        // Directory might not exist or be accessible
    }

    let description = `${componentName} component with full TypeScript support`;
    let size = 'medium';
    let tags = ['ui', 'component'];
    let hasTests = false;
    let hasStories = false;
    let lastModified = new Date().toISOString();

    // Check for test files
    hasTests = files.some(file => file.includes('.test.'));

    // Check for story files  
    hasStories = files.some(file => file.includes('.stories.'));

    // Analyze component complexity for size
    const componentFiles = files.filter(file => file.endsWith('.tsx') || file.endsWith('.ts'));
    if (componentFiles.length > 3) size = 'large';
    if (componentFiles.length === 1) size = 'small';

    // Generate tags based on component name and type
    const componentLower = componentName.toLowerCase();
    if (componentLower.includes('form') || componentLower.includes('input') || componentLower.includes('select')) {
        tags.push('form', 'input');
    }
    if (componentLower.includes('layout') || componentLower.includes('grid') || componentLower.includes('container')) {
        tags.push('layout', 'container');
    }
    if (componentLower.includes('modal') || componentLower.includes('dialog') || componentLower.includes('popup')) {
        tags.push('overlay', 'dialog');
    }
    if (componentLower.includes('button') || componentLower.includes('click')) {
        tags.push('interactive', 'button');
    }
    if (componentLower.includes('table') || componentLower.includes('data') || componentLower.includes('list')) {
        tags.push('data', 'table');
    }
    if (componentLower.includes('nav') || componentLower.includes('menu') || componentLower.includes('breadcrumb')) {
        tags.push('navigation', 'menu');
    }
    if (componentLower.includes('alert') || componentLower.includes('toast') || componentLower.includes('notification')) {
        tags.push('feedback', 'notification');
    }

    // Get last modified time
    try {
        const stats = await fs.stat(componentDir);
        lastModified = stats.mtime.toISOString();
    } catch {
        // Use current time if we can't get stats
    }

    return {
        description,
        size,
        tags: [...new Set(tags)], // Remove duplicates
        hasTests,
        hasStories,
        lastModified
    };
}

/**
 * Create basic component documentation if none exists
 */
async function createBasicComponentDoc(componentDir, componentName) {
    const docContent = `# ${componentName}

${componentName} component with full TypeScript support and accessibility features.

## Features

- ✅ TypeScript support
- ✅ Accessibility compliant  
- ✅ Dark mode support
- ✅ Responsive design
- ✅ Test coverage

## Usage

\`\`\`tsx
import { ${componentName} } from 'nebula';

export function Example() {
    return (
        <${componentName}>
            Content
        </${componentName}>
    );
}
\`\`\`

## Props

See TypeScript definitions for complete props interface.

## Examples

Basic usage examples and API documentation.
`;

    const docPath = path.join(componentDir, 'README.md');
    await fs.writeFile(docPath, docContent, 'utf8');
    return docPath;
}

/**
 * Generate milestone documentation metadata  
 */
async function generateMilestoneDocs(metadata) {
    const docsDir = 'docs';

    try {
        const entries = await fs.readdir(docsDir, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isDirectory() && entry.name.startsWith('milestone-')) {
                const milestoneName = entry.name;
                const milestoneDir = path.join(docsDir, milestoneName);
                const readmePath = path.join(milestoneDir, 'README.md');

                try {
                    await fs.access(readmePath);

                    // Copy to public directory
                    const targetPath = `${DOCS_OUTPUT_DIR}/milestones/${milestoneName}.md`;
                    await fs.mkdir(path.dirname(targetPath), { recursive: true });
                    await fs.copyFile(readmePath, targetPath);

                    // Read content for analysis
                    const content = await fs.readFile(readmePath, 'utf8');
                    const lines = content.split('\n');
                    const title = lines.find(line => line.startsWith('# '))?.replace('# ', '') ||
                        `Milestone ${milestoneName.replace('milestone-', '')}`;

                    metadata.milestones.push({
                        name: title,
                        path: `/docs/milestones/${milestoneName}.md`,
                        category: 'Milestones',
                        description: 'Project milestone documentation and implementation details',
                        size: 'large',
                        tags: ['milestone', 'planning', 'roadmap'],
                        lastModified: (await fs.stat(readmePath)).mtime.toISOString()
                    });

                } catch (error) {
                    console.warn(`⚠️ Could not process milestone: ${milestoneName} - ${error.message}`);
                }
            }
        }
    } catch (error) {
        console.warn('⚠️ Could not process docs directory:', error.message);
    }

    console.log(`🎯 Generated ${metadata.milestones.length} milestone docs`);
}

/**
 * Generate project documentation metadata
 */
async function generateProjectDocs(metadata) {
    const projectFiles = [
        { source: 'README.md', name: 'README', description: 'Main project documentation' },
        { source: 'docs/IMPLEMENTATION_PLAN.md', name: 'Implementation Plan', description: 'Detailed implementation roadmap' },
        { source: 'docs/COMPONENT_ARCHITECTURE_SUMMARY.md', name: 'Component Architecture', description: 'Architecture and design patterns' },
        { source: 'docs/IMPORT_GUIDE.md', name: 'Import Guide', description: 'How to import and use components' },
        { source: 'docs/SIZE_STANDARDIZATION_CHECKLIST.md', name: 'Size Standardization', description: 'Component size standards' }
    ];

    for (const file of projectFiles) {
        try {
            await fs.access(file.source);

            // Copy to public directory
            const targetPath = `${DOCS_OUTPUT_DIR}/project/${file.source.split('/').pop()}`;
            await fs.mkdir(path.dirname(targetPath), { recursive: true });
            await fs.copyFile(file.source, targetPath);

            const size = file.source === 'README.md' ? 'large' : 'medium';

            let tags;
            if (file.source === 'README.md') {
                tags = ['overview', 'setup'];
            } else if (file.name.toLowerCase().includes('architecture')) {
                tags = ['architecture', 'design'];
            } else if (file.name.toLowerCase().includes('import')) {
                tags = ['usage', 'guide'];
            } else {
                tags = ['planning', 'standards'];
            }

            metadata.project.push({
                name: file.name,
                path: `/docs/project/${file.source.split('/').pop()}`,
                category: 'Project',
                description: file.description,
                size,
                tags,
                lastModified: (await fs.stat(file.source)).mtime.toISOString()
            });

        } catch (error) {
            console.warn(`⚠️ Could not process project file: ${file.source} - ${error.message}`);
        }
    }

    console.log(`📚 Generated ${metadata.project.length} project docs`);
}

/**
 * Generate reports documentation metadata
 */
async function generateReportsDocs(metadata) {
    const reportFiles = [
        { source: 'docs/PROJECT_STATUS.md', name: 'Project Status', description: 'Current project status and progress' },
        { source: 'docs/COMPONENT_COVERAGE_REPORT.md', name: 'Component Coverage', description: 'Test coverage and quality metrics' },
        { source: 'docs/FINAL_PROJECT_REPORT.md', name: 'Final Report', description: 'Complete project summary' },
        { source: 'PRODUCTION_READY.md', name: 'Production Ready', description: 'Production readiness checklist' }
    ];

    for (const file of reportFiles) {
        try {
            await fs.access(file.source);

            // Copy to public directory
            const targetPath = `${DOCS_OUTPUT_DIR}/reports/${file.source.split('/').pop()}`;
            await fs.mkdir(path.dirname(targetPath), { recursive: true });
            await fs.copyFile(file.source, targetPath);

            let tags;
            if (file.name.toLowerCase().includes('status')) {
                tags = ['status', 'progress'];
            } else if (file.name.toLowerCase().includes('coverage')) {
                tags = ['testing', 'coverage'];
            } else if (file.name.toLowerCase().includes('final')) {
                tags = ['summary', 'final'];
            } else {
                tags = ['production', 'checklist'];
            }

            metadata.reports.push({
                name: file.name,
                path: `/docs/reports/${file.source.split('/').pop()}`,
                category: 'Reports',
                description: file.description,
                size: 'medium',
                tags,
                lastModified: (await fs.stat(file.source)).mtime.toISOString()
            });

        } catch (error) {
            console.warn(`⚠️ Could not process report file: ${file.source} - ${error.message}`);
        }
    }

    console.log(`📊 Generated ${metadata.reports.length} report docs`);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    generateDocsMetadata().catch(console.error);
}

export { generateDocsMetadata };
