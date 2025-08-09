#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const PUBLIC_DOCS_DIR = 'public/docs';
const COMPONENT_PAGES_DIR = 'src/pages';

/**
 * Move documentation files from public/docs to appropriate component page folders
 */
async function moveDocumentationFiles() {
    console.log('🚀 Moving documentation files to component folders...');

    try {
        // Get all documentation files
        const docFiles = await fs.readdir(PUBLIC_DOCS_DIR);
        const componentDocFiles = docFiles.filter(file =>
            file.endsWith('_DOCUMENTATION.md') &&
            !file.startsWith('CONSOLIDATED_PROJECT')
        );

        console.log(`📄 Found ${componentDocFiles.length} component documentation files`);

        let moved = 0;
        let created = 0;
        let skipped = 0;

        for (const docFile of componentDocFiles) {
            // Extract component name from filename
            const componentName = extractComponentName(docFile);

            if (!componentName) {
                console.warn(`⚠️ Could not extract component name from: ${docFile}`);
                skipped++;
                continue;
            }

            // Find matching component page directory
            const componentPageDir = await findComponentPageDir(componentName);

            if (!componentPageDir) {
                // Create the component page directory if it doesn't exist
                const newComponentDir = path.join(COMPONENT_PAGES_DIR, componentName.toLowerCase());
                await fs.mkdir(newComponentDir, { recursive: true });

                console.log(`📁 Created directory: ${newComponentDir}`);
                created++;

                // Move documentation file
                const sourcePath = path.join(PUBLIC_DOCS_DIR, docFile);
                const targetPath = path.join(newComponentDir, 'README.md');
                await fs.copyFile(sourcePath, targetPath);

                console.log(`✅ Moved ${docFile} → ${componentName.toLowerCase()}/README.md`);
                moved++;

            } else {
                // Component page directory exists
                const targetPath = path.join(componentPageDir, 'README.md');

                try {
                    // Check if README.md already exists
                    await fs.access(targetPath);
                    console.log(`⚠️ README.md already exists in: ${componentPageDir}`);
                    skipped++;
                } catch {
                    // README.md doesn't exist, move it
                    const sourcePath = path.join(PUBLIC_DOCS_DIR, docFile);
                    await fs.copyFile(sourcePath, targetPath);

                    console.log(`✅ Moved ${docFile} → ${path.basename(componentPageDir)}/README.md`);
                    moved++;
                }
            }
        }

        console.log(`\n📊 Summary:`);
        console.log(`   ✅ Moved: ${moved} files`);
        console.log(`   📁 Created: ${created} directories`);
        console.log(`   ⚠️ Skipped: ${skipped} files`);
        console.log(`\n🎉 Documentation move completed!`);

        return { moved, created, skipped };

    } catch (error) {
        console.error('❌ Error moving documentation files:', error);
        throw error;
    }
}

/**
 * Extract component name from documentation filename
 */
function extractComponentName(filename) {
    // Remove _DOCUMENTATION.md suffix
    const baseName = filename.replace('_DOCUMENTATION.md', '');

    // Map special cases
    const specialCases = {
        'BACKTOP': 'backtop',
        'DATEPICKER': 'datepicker',
        'TIMEPICKER': 'timepicker',
        'TREEVIEW': 'treeview',
        'TEXTAREA': 'textarea'
    };

    if (specialCases[baseName]) {
        return specialCases[baseName];
    }

    // Convert to lowercase for directory name
    return baseName.toLowerCase();
}

/**
 * Find existing component page directory
 */
async function findComponentPageDir(componentName) {
    const possibleDirs = [
        path.join(COMPONENT_PAGES_DIR, componentName),
        path.join(COMPONENT_PAGES_DIR, componentName.toLowerCase()),
        path.join(COMPONENT_PAGES_DIR, componentName.charAt(0).toUpperCase() + componentName.slice(1).toLowerCase())
    ];

    for (const dir of possibleDirs) {
        try {
            await fs.access(dir);
            const stats = await fs.stat(dir);
            if (stats.isDirectory()) {
                return dir;
            }
        } catch {
            // Directory doesn't exist, continue
        }
    }

    return null;
}

/**
 * Generate metadata for newly created component directories
 */
async function generateMetadataForNewDirs() {
    console.log('📝 Generating metadata for component pages...');

    const componentCategories = {
        'affix': { category: 'Navigation', description: 'Fixed positioning component', complexity: 'medium' },
        'avatar': { category: 'Data Display', description: 'User avatar with badge support', complexity: 'low' },
        'backtop': { category: 'Navigation', description: 'Back to top button', complexity: 'low' },
        'badge': { category: 'Data Display', description: 'Status badge and count indicator', complexity: 'low' },
        'breadcrumb': { category: 'Navigation', description: 'Breadcrumb navigation trail', complexity: 'low' },
        'carousel': { category: 'Data Display', description: 'Image and content carousel', complexity: 'high' },
        'collapse': { category: 'Data Display', description: 'Collapsible content panels', complexity: 'medium' },
        'container': { category: 'Layout', description: 'Content container component', complexity: 'low' },
        'datepicker': { category: 'Form Controls', description: 'Date selection component', complexity: 'high' },
        'divider': { category: 'Layout', description: 'Content divider line', complexity: 'low' },
        'drawer': { category: 'Overlays', description: 'Slide-out panel overlay', complexity: 'high' },
        'empty': { category: 'Feedback', description: 'Empty state placeholder', complexity: 'medium' },
        'grid': { category: 'Layout', description: 'Responsive grid system', complexity: 'medium' },
        'image': { category: 'Data Display', description: 'Enhanced image component', complexity: 'medium' },
        'pagination': { category: 'Navigation', description: 'Page navigation component', complexity: 'medium' },
        'popover': { category: 'Overlays', description: 'Popover tooltip overlay', complexity: 'high' },
        'radio': { category: 'Form Controls', description: 'Radio button selection', complexity: 'low' },
        'skeleton': { category: 'Feedback', description: 'Loading skeleton placeholder', complexity: 'medium' },
        'spinner': { category: 'Feedback', description: 'Loading spinner indicator', complexity: 'low' },
        'stack': { category: 'Layout', description: 'Vertical/horizontal stack layout', complexity: 'low' },
        'steps': { category: 'Navigation', description: 'Step-by-step progress', complexity: 'medium' },
        'switch': { category: 'Form Controls', description: 'Toggle switch component', complexity: 'low' },
        'tags': { category: 'Data Display', description: 'Tag and label components', complexity: 'medium' },
        'textarea': { category: 'Form Controls', description: 'Multi-line text input', complexity: 'low' },
        'timepicker': { category: 'Form Controls', description: 'Time selection component', complexity: 'high' },
        'toast': { category: 'Feedback', description: 'Toast notification system', complexity: 'high' },
        'transfer': { category: 'Form Controls', description: 'Transfer list component', complexity: 'high' },
        'treeview': { category: 'Data Display', description: 'Tree structure display', complexity: 'high' },
        'upload': { category: 'Form Controls', description: 'File upload component', complexity: 'high' }
    };

    let generated = 0;

    for (const [componentKey, data] of Object.entries(componentCategories)) {
        const componentDir = path.join(COMPONENT_PAGES_DIR, componentKey);
        const metadataPath = path.join(componentDir, 'metadata.json');

        try {
            // Check if directory exists
            await fs.access(componentDir);

            // Check if metadata already exists
            try {
                await fs.access(metadataPath);
                continue; // Skip if metadata exists
            } catch {
                // Metadata doesn't exist, create it
            }

            const metadata = {
                name: componentKey.charAt(0).toUpperCase() + componentKey.slice(1),
                category: data.category,
                description: data.description,
                size: data.complexity === 'high' ? 'large' : data.complexity === 'low' ? 'small' : 'medium',
                complexity: data.complexity,
                tags: generateTagsForComponent(componentKey, data.category),
                hasTests: true,
                hasStories: false,
                hasA11yTests: false,
                buildStatus: 'stable',
                features: [
                    'TypeScript support with strict typing',
                    'Full accessibility (WCAG 2.1 AA)',
                    'Dark mode and theme support',
                    'Responsive design patterns',
                    'Performance optimized'
                ],
                examples: [
                    'Basic usage',
                    'Advanced configuration',
                    'Custom styling',
                    'Event handling'
                ]
            };

            await fs.writeFile(metadataPath, JSON.stringify(metadata, null, 2), 'utf8');
            console.log(`✅ Created metadata for: ${metadata.name}`);
            generated++;

        } catch (error) {
            // Directory doesn't exist or other error
            continue;
        }
    }

    console.log(`📝 Generated ${generated} metadata files`);
    return generated;
}

/**
 * Generate tags for component based on name and category
 */
function generateTagsForComponent(name, category) {
    const baseTags = ['component', 'ui'];

    // Category-based tags
    if (category === 'Form Controls') baseTags.push('form', 'input');
    if (category === 'Data Display') baseTags.push('display', 'data');
    if (category === 'Navigation') baseTags.push('navigation', 'menu');
    if (category === 'Layout') baseTags.push('layout', 'structure');
    if (category === 'Feedback') baseTags.push('feedback', 'status');
    if (category === 'Overlays') baseTags.push('overlay', 'popup');

    // Component-specific tags
    const specificTags = {
        'affix': ['fixed', 'sticky'],
        'avatar': ['profile', 'user'],
        'badge': ['count', 'indicator'],
        'carousel': ['slideshow', 'gallery'],
        'datepicker': ['calendar', 'date'],
        'timepicker': ['time', 'clock'],
        'upload': ['file', 'drag-drop'],
        'table': ['sorting', 'filtering'],
        'toast': ['notification', 'alert'],
        'modal': ['dialog', 'popup'],
        'drawer': ['sidebar', 'panel']
    };

    if (specificTags[name]) {
        baseTags.push(...specificTags[name]);
    }

    return baseTags;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    moveDocumentationFiles()
        .then(async () => {
            await generateMetadataForNewDirs();
        })
        .catch(console.error);
}

export { moveDocumentationFiles };
