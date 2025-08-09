#!/usr/bin/env node

import fs from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Copy documentation and metadata to dist for production build
 */
async function copyDocsToDistribution() {
    console.log('📚 Copying documentation to distribution...');

    try {
        const DIST_DIR = 'dist';
        const DIST_DOCS_DIR = path.join(DIST_DIR, 'docs');
        const PUBLIC_DOCS_DIR = 'public/docs';

        // Clean existing dist/docs directory
        console.log('🧹 Cleaning existing dist/docs directory...');
        try {
            await fs.rm(DIST_DOCS_DIR, { recursive: true, force: true });
            console.log('✅ Cleaned existing dist/docs directory');
        } catch (cleanError) {
            // Directory might not exist, which is fine
            if (cleanError.code !== 'ENOENT') {
                console.log('⚠️ Warning during cleanup:', cleanError.message);
            } else {
                console.log('ℹ️ No existing dist/docs directory to clean');
            }
        }

        // Ensure dist directory exists
        await fs.mkdir(DIST_DOCS_DIR, { recursive: true });

        // Check if public/docs exists and has content
        let docsExist = false;
        try {
            const publicDocsStats = await fs.stat(PUBLIC_DOCS_DIR);
            if (publicDocsStats.isDirectory()) {
                const files = await fs.readdir(PUBLIC_DOCS_DIR);
                docsExist = files.length > 0;
            }
        } catch (error) {
            console.log(`ℹ️ No public/docs directory found: ${error.message}`);
        }

        if (docsExist) {
            // Copy all documentation files from public/docs to dist/docs
            await copyDirectory(PUBLIC_DOCS_DIR, DIST_DOCS_DIR);
            console.log(`✅ Documentation copied to ${DIST_DOCS_DIR}`);
        }

        // Copy component metadata from src/pages to dist/docs/components
        const COMPONENT_PAGES_DIR = 'src/pages';
        const DIST_COMPONENTS_DIR = path.join(DIST_DOCS_DIR, 'components');

        await fs.mkdir(DIST_COMPONENTS_DIR, { recursive: true });

        const componentDirs = await fs.readdir(COMPONENT_PAGES_DIR);
        let copiedComponents = 0;

        for (const componentDir of componentDirs) {
            const componentPath = path.join(COMPONENT_PAGES_DIR, componentDir);
            const stats = await fs.stat(componentPath);

            if (stats.isDirectory()) {
                const metadataPath = path.join(componentPath, 'metadata.json');
                const readmePath = path.join(componentPath, 'README.md');

                try {
                    // Check if metadata exists
                    await fs.access(metadataPath);

                    const destComponentDir = path.join(DIST_COMPONENTS_DIR, componentDir);
                    await fs.mkdir(destComponentDir, { recursive: true });

                    // Copy metadata.json
                    await fs.copyFile(metadataPath, path.join(destComponentDir, 'metadata.json'));

                    // Copy README.md if exists
                    try {
                        await fs.access(readmePath);
                        await fs.copyFile(readmePath, path.join(destComponentDir, 'README.md'));
                    } catch (readmeError) {
                        console.log(`ℹ️ No README.md for ${componentDir}: ${readmeError.message}`);
                    }

                    copiedComponents++;
                } catch (metadataError) {
                    console.log(`⏭️ Skipping ${componentDir} (no metadata): ${metadataError.message}`);
                }
            }
        }

        console.log(`✅ Copied ${copiedComponents} component metadata files`);
        console.log(`📁 Distribution docs: ${DIST_DOCS_DIR}`);

        return {
            docsExist,
            copiedComponents,
            distDocsDir: DIST_DOCS_DIR
        };

    } catch (error) {
        console.error('❌ Error copying documentation to dist:', error);
        throw error;
    }
}

/**
 * Recursively copy directory contents
 */
async function copyDirectory(source, destination) {
    await fs.mkdir(destination, { recursive: true });

    const entries = await fs.readdir(source, { withFileTypes: true });

    for (const entry of entries) {
        const sourcePath = path.join(source, entry.name);
        const destPath = path.join(destination, entry.name);

        if (entry.isDirectory()) {
            await copyDirectory(sourcePath, destPath);
        } else {
            await fs.copyFile(sourcePath, destPath);
        }
    }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    copyDocsToDistribution().catch(console.error);
}

export { copyDocsToDistribution };
