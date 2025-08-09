#!/usr/bin/env node

import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const PUBLIC_DOCS_DIR = 'public/docs';
const METADATA_OUTPUT_FILE = 'public/docs/docs-metadata.json';
const COMPONENT_PAGES_DIR = 'src/pages';
const DOCS_DIR = 'docs';

/**
 * Build comprehensive documentation system
 */
async function buildDocumentationSystem() {
    console.log('🚀 Building comprehensive documentation system...');

    try {
        // Clean and prepare directories
        await fs.mkdir(PUBLIC_DOCS_DIR, { recursive: true });
        await fs.mkdir(path.dirname(METADATA_OUTPUT_FILE), { recursive: true });

        const metadata = {
            version: '3.0.0',
            generated: new Date().toISOString(),
            components: [],
            milestones: [],
            project: [],
            reports: [],
            categories: {
                'Form Controls': [],
                'Data Display': [],
                'Navigation': [],
                'Layout': [],
                'Feedback': [],
                'Overlays': [],
                'General': [],
                'Other': []
            },
            stats: {
                totalComponents: 0,
                componentsWithTests: 0,
                componentsWithPages: 0,
                totalFiles: 0,
                lastBuild: new Date().toISOString()
            },
            searchIndex: []
        };

        // Process component pages
        await processComponentPages(metadata);

        // Process project documentation
        await processProjectDocumentation(metadata);

        // Process milestones
        await processMilestones(metadata);

        // Copy documentation files from public/docs source
        await copyDocumentationFiles(metadata);

        // Generate search index
        await generateSearchIndex(metadata);

        // Calculate statistics
        calculateStatistics(metadata);

        // Organize by categories
        organizeByCategories(metadata);

        // Write final metadata
        await fs.writeFile(
            METADATA_OUTPUT_FILE,
            JSON.stringify(metadata, null, 2),
            'utf8'
        );

        console.log(`✅ Documentation system built successfully!`);
        console.log(`📊 Components: ${metadata.stats.totalComponents}`);
        console.log(`📄 Total files: ${metadata.stats.totalFiles}`);
        console.log(`📝 Metadata: ${METADATA_OUTPUT_FILE}`);
        console.log(`📁 Public docs: ${PUBLIC_DOCS_DIR}`);

        return metadata;

    } catch (error) {
        console.error('❌ Error building documentation system:', error);
        throw error;
    }
}

/**
 * Process component pages and their metadata
 */
async function processComponentPages(metadata) {
    console.log('📱 Processing component pages...');

    try {
        const entries = await fs.readdir(COMPONENT_PAGES_DIR, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isDirectory() && !['docs', 'home', 'components'].includes(entry.name)) {
                const componentDir = path.join(COMPONENT_PAGES_DIR, entry.name);
                const metadataPath = path.join(componentDir, 'metadata.json');

                try {
                    // Check if component has metadata.json
                    await fs.access(metadataPath);
                    const metadataContent = await fs.readFile(metadataPath, 'utf8');
                    const componentMetadata = JSON.parse(metadataContent);

                    // Check if component has README.md
                    const readmePath = path.join(componentDir, 'README.md');
                    try {
                        await fs.access(readmePath);

                        // Copy README.md to public/docs/components/
                        const docTarget = `${PUBLIC_DOCS_DIR}/components/${entry.name}.md`;
                        await fs.mkdir(path.dirname(docTarget), { recursive: true });
                        await fs.copyFile(readmePath, docTarget);

                        const docEntry = {
                            ...componentMetadata,
                            path: `/docs/components/${entry.name}.md`,
                            lastModified: new Date().toISOString()
                        };

                        metadata.components.push(docEntry);

                        console.log(`✅ ${componentMetadata.name}: metadata + documentation`);

                    } catch {
                        // No README.md found, create basic entry
                        const basicEntry = {
                            ...componentMetadata,
                            path: `/components/${entry.name}`,
                            lastModified: new Date().toISOString()
                        };

                        metadata.components.push(basicEntry);
                        console.log(`📝 ${componentMetadata.name}: metadata only`);
                    }
                } catch {
                    console.warn(`⚠️ No metadata.json found for: ${entry.name}`);
                }
            }
        }
    } catch (error) {
        console.warn('⚠️ Could not process component pages:', error.message);
    }

    console.log(`📱 Processed ${metadata.components.length} component pages`);
}

/**
 * Process project documentation
 */
async function processProjectDocumentation(metadata) {
    console.log('📚 Processing project documentation...');

    try {
        const metadataPath = path.join(DOCS_DIR, 'metadata.json');

        try {
            await fs.access(metadataPath);
            const metadataContent = await fs.readFile(metadataPath, 'utf8');
            const projectMetadata = JSON.parse(metadataContent);

            // Copy each project file
            for (const file of projectMetadata.files) {
                const sourcePath = path.join(DOCS_DIR, file.name);
                const targetPath = `${PUBLIC_DOCS_DIR}/project/${file.name}`;

                try {
                    await fs.access(sourcePath);
                    await fs.mkdir(path.dirname(targetPath), { recursive: true });
                    await fs.copyFile(sourcePath, targetPath);

                    const docEntry = {
                        name: file.name.replace('.md', ''),
                        path: `/docs/project/${file.name}`,
                        category: 'Project',
                        description: file.description,
                        size: file.size,
                        tags: file.tags,
                        lastModified: (await fs.stat(sourcePath)).mtime.toISOString()
                    };

                    metadata.project.push(docEntry);

                } catch (error) {
                    console.warn(`⚠️ Could not copy project file: ${file.name} - ${error.message}`);
                }
            }

        } catch {
            console.warn('⚠️ No project metadata.json found');
        }

    } catch (error) {
        console.warn('⚠️ Could not process project documentation:', error.message);
    }

    console.log(`📚 Processed ${metadata.project.length} project documents`);
}

/**
 * Process milestone documentation
 */
async function processMilestones(metadata) {
    console.log('🎯 Processing milestones...');

    try {
        const entries = await fs.readdir(DOCS_DIR, { withFileTypes: true });

        for (const entry of entries) {
            if (entry.isDirectory() && entry.name.startsWith('milestone-')) {
                const milestoneDir = path.join(DOCS_DIR, entry.name);
                const metadataPath = path.join(milestoneDir, 'metadata.json');
                const readmePath = path.join(milestoneDir, 'README.md');

                let milestoneData = {
                    name: `Milestone ${entry.name.replace('milestone-', '')}`,
                    category: 'Milestones',
                    description: 'Project milestone documentation',
                    size: 'medium',
                    tags: ['milestone', 'planning'],
                    status: 'unknown'
                };

                // Load metadata if exists
                try {
                    await fs.access(metadataPath);
                    const metadataContent = await fs.readFile(metadataPath, 'utf8');
                    const milestoneMetadata = JSON.parse(metadataContent);
                    milestoneData = { ...milestoneData, ...milestoneMetadata };
                } catch {
                    // Use default metadata
                }

                // Copy README if exists
                try {
                    await fs.access(readmePath);
                    const targetPath = `${PUBLIC_DOCS_DIR}/milestones/${entry.name}.md`;
                    await fs.mkdir(path.dirname(targetPath), { recursive: true });
                    await fs.copyFile(readmePath, targetPath);

                    const docEntry = {
                        ...milestoneData,
                        path: `/docs/milestones/${entry.name}.md`,
                        lastModified: (await fs.stat(readmePath)).mtime.toISOString()
                    };

                    metadata.milestones.push(docEntry);

                    console.log(`✅ ${milestoneData.name}`);

                } catch {
                    console.warn(`⚠️ No README.md found for milestone: ${entry.name}`);
                }
            }
        }

    } catch (error) {
        console.warn('⚠️ Could not process milestones:', error.message);
    }

    console.log(`🎯 Processed ${metadata.milestones.length} milestones`);
}

/**
 * Copy documentation files from public/docs that weren't processed yet
 */
async function copyDocumentationFiles(metadata) {
    console.log('📄 Copying additional documentation files...');

    const sourceDir = 'public/docs';

    try {
        const entries = await fs.readdir(sourceDir);

        const reportFiles = entries.filter(file =>
            file.endsWith('_REPORT.md') ||
            file.includes('COVERAGE') ||
            file.includes('SUMMARY')
        );

        for (const file of reportFiles) {
            const sourcePath = path.join(sourceDir, file);
            const targetPath = `${PUBLIC_DOCS_DIR}/reports/${file}`;

            try {
                await fs.mkdir(path.dirname(targetPath), { recursive: true });
                await fs.copyFile(sourcePath, targetPath);

                const docEntry = {
                    name: file.replace('.md', '').replace(/_/g, ' '),
                    path: `/docs/reports/${file}`,
                    category: 'Reports',
                    description: 'Generated report and analysis',
                    size: 'medium',
                    tags: ['report', 'analysis'],
                    lastModified: (await fs.stat(sourcePath)).mtime.toISOString()
                };

                metadata.reports.push(docEntry);

            } catch (error) {
                console.warn(`⚠️ Could not copy report: ${file} - ${error.message}`);
            }
        }

    } catch (error) {
        console.warn('⚠️ Could not copy additional documentation files:', error.message);
    }

    console.log(`📊 Copied ${metadata.reports.length} report files`);
}

/**
 * Generate search index for all documentation
 */
async function generateSearchIndex(metadata) {
    const allDocs = [
        ...metadata.components,
        ...metadata.milestones,
        ...metadata.project,
        ...metadata.reports
    ];

    for (const doc of allDocs) {
        const indexEntry = {
            title: doc.name,
            path: doc.path,
            category: doc.category,
            description: doc.description,
            tags: doc.tags || [],
            searchText: `${doc.name} ${doc.description} ${(doc.tags || []).join(' ')}`.toLowerCase()
        };

        metadata.searchIndex.push(indexEntry);
    }
}

/**
 * Calculate statistics
 */
function calculateStatistics(metadata) {
    metadata.stats.totalComponents = metadata.components.length;
    metadata.stats.componentsWithTests = metadata.components.filter(c => c.hasTests).length;
    metadata.stats.componentsWithPages = metadata.components.length; // All have pages now
    metadata.stats.totalFiles =
        metadata.components.length +
        metadata.milestones.length +
        metadata.project.length +
        metadata.reports.length;
}

/**
 * Organize components by categories
 */
function organizeByCategories(metadata) {
    for (const component of metadata.components) {
        const category = component.category || 'Other';
        if (metadata.categories[category]) {
            metadata.categories[category].push(component.name);
        }
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    buildDocumentationSystem().catch(console.error);
}

export { buildDocumentationSystem };
