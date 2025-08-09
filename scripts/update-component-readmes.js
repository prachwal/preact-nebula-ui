#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const DOCS_SOURCE_DIR = 'public/docs';
const COMPONENTS_DIR = 'nebula/components';

/**
 * Update component README files with documentation from public/docs
 */
async function updateComponentREADMEs() {
    console.log('🚀 Updating component README files with detailed documentation...');

    try {
        // Get list of all documentation files
        const docFiles = await fs.readdir(DOCS_SOURCE_DIR);
        const componentDocFiles = docFiles.filter(file =>
            file.endsWith('_DOCUMENTATION.md') &&
            !file.startsWith('UNIFIED') &&
            !file.startsWith('CONSOLIDATED')
        );

        console.log(`📄 Found ${componentDocFiles.length} component documentation files`);

        let updatedCount = 0;
        let skippedCount = 0;

        for (const docFile of componentDocFiles) {
            // Extract component name from filename
            // ALERT_DOCUMENTATION.md -> Alert
            const componentName = extractComponentName(docFile);

            if (!componentName) {
                console.warn(`⚠️ Could not extract component name from: ${docFile}`);
                skippedCount++;
                continue;
            }

            // Check if component directory exists
            const componentDir = path.join(COMPONENTS_DIR, componentName);
            try {
                await fs.access(componentDir);
            } catch {
                console.warn(`⚠️ Component directory not found: ${componentDir}`);
                skippedCount++;
                continue;
            }

            // Read source documentation
            const sourceDocPath = path.join(DOCS_SOURCE_DIR, docFile);
            const sourceContent = await fs.readFile(sourceDocPath, 'utf8');

            // Update component README
            const readmePath = path.join(componentDir, 'README.md');
            await fs.writeFile(readmePath, sourceContent, 'utf8');

            console.log(`✅ Updated: ${componentName}/README.md`);
            updatedCount++;
        }

        console.log(`\n📊 Summary:`);
        console.log(`   ✅ Updated: ${updatedCount} components`);
        console.log(`   ⚠️ Skipped: ${skippedCount} files`);
        console.log(`\n🎉 Component README update completed!`);

        return { updated: updatedCount, skipped: skippedCount };

    } catch (error) {
        console.error('❌ Error updating component READMEs:', error);
        throw error;
    }
}

/**
 * Extract component name from documentation filename
 */
function extractComponentName(filename) {
    // Remove _DOCUMENTATION.md suffix and convert to proper case
    const baseName = filename.replace('_DOCUMENTATION.md', '');

    // Convert to proper component name format
    // ALERT -> Alert
    // AUTOCOMPLETE -> Autocomplete  
    // BACKTOP -> BackTop
    // DATEPICKER -> DatePicker
    // TIMEPICKER -> TimePicker
    // TREEVIEW -> TreeView

    const specialCases = {
        'BACKTOP': 'BackTop',
        'DATEPICKER': 'DatePicker',
        'TIMEPICKER': 'TimePicker',
        'TREEVIEW': 'TreeView',
        'TEXTAREA': 'Textarea'  // Fixed: Textarea not TextArea
    };

    if (specialCases[baseName]) {
        return specialCases[baseName];
    }

    // Default: capitalize first letter, rest lowercase
    return baseName.charAt(0).toUpperCase() + baseName.slice(1).toLowerCase();
}

/**
 * Verify component directory structure
 */
async function verifyComponentStructure() {
    console.log('🔍 Verifying component directory structure...');

    try {
        const componentDirs = await fs.readdir(COMPONENTS_DIR, { withFileTypes: true });
        const components = componentDirs
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        console.log(`📁 Found ${components.length} component directories:`);

        for (const component of components.sort()) {
            const readmePath = path.join(COMPONENTS_DIR, component, 'README.md');
            try {
                await fs.access(readmePath);
                console.log(`   ✅ ${component}/README.md`);
            } catch {
                console.log(`   ⚠️ ${component}/README.md - Missing`);
            }
        }

        return components;

    } catch (error) {
        console.error('❌ Error verifying component structure:', error);
        throw error;
    }
}

/**
 * List available documentation files
 */
async function listAvailableDocumentation() {
    console.log('📚 Available documentation files:');

    try {
        const docFiles = await fs.readdir(DOCS_SOURCE_DIR);
        const componentDocs = docFiles.filter(file =>
            file.endsWith('_DOCUMENTATION.md')
        );

        for (const docFile of componentDocs.sort()) {
            const componentName = extractComponentName(docFile);
            const size = await getFileSize(path.join(DOCS_SOURCE_DIR, docFile));
            console.log(`   📄 ${docFile} -> ${componentName} (${size})`);
        }

        return componentDocs;

    } catch (error) {
        console.error('❌ Error listing documentation:', error);
        throw error;
    }
}

/**
 * Get human readable file size
 */
async function getFileSize(filePath) {
    try {
        const stats = await fs.stat(filePath);
        const bytes = stats.size;

        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
        return `${Math.round(bytes / (1024 * 1024))} MB`;

    } catch {
        return 'Unknown';
    }
}

/**
 * Main execution
 */
async function main() {
    const args = process.argv.slice(2);

    if (args.includes('--verify')) {
        await verifyComponentStructure();
        return;
    }

    if (args.includes('--list')) {
        await listAvailableDocumentation();
        return;
    }

    if (args.includes('--summary')) {
        await generateUpdateSummary();
        return;
    }

    // Default: update all README files
    await updateComponentREADMEs();
}

/**
 * Generate summary of updated files
 */
async function generateUpdateSummary() {
    console.log('📊 Generating update summary...');

    try {
        const componentDirs = await fs.readdir(COMPONENTS_DIR, { withFileTypes: true });
        const components = componentDirs
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        let totalSize = 0;
        let fileCount = 0;
        const sizeSummary = [];

        for (const component of components.sort()) {
            const readmePath = path.join(COMPONENTS_DIR, component, 'README.md');
            try {
                const stats = await fs.stat(readmePath);
                const size = stats.size;
                totalSize += size;
                fileCount++;

                sizeSummary.push({
                    component,
                    size,
                    sizeFormatted: await getFileSize(readmePath),
                    lastModified: stats.mtime.toLocaleString()
                });
            } catch {
                sizeSummary.push({
                    component,
                    size: 0,
                    sizeFormatted: 'Missing',
                    lastModified: 'N/A'
                });
            }
        }

        // Sort by size descending
        sizeSummary.sort((a, b) => b.size - a.size);

        console.log(`\n📋 Update Summary:`);
        console.log(`   📁 Total components: ${components.length}`);
        console.log(`   ✅ Updated files: ${fileCount}`);
        console.log(`   📊 Total documentation size: ${Math.round(totalSize / 1024)} KB`);
        console.log(`   📈 Average file size: ${Math.round(totalSize / fileCount / 1024)} KB`);

        console.log(`\n🏆 Top 10 largest documentation files:`);
        sizeSummary.slice(0, 10).forEach((item, index) => {
            console.log(`   ${index + 1}. ${item.component}: ${item.sizeFormatted}`);
        });

        return sizeSummary;

    } catch (error) {
        console.error('❌ Error generating update summary:', error);
        throw error;
    }
}// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    main().catch(console.error);
}

export { updateComponentREADMEs, verifyComponentStructure, listAvailableDocumentation };
