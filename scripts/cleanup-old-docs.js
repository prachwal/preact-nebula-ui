#!/usr/bin/env node

import { readdir, unlink, stat } from 'fs/promises';
import { join } from 'path';

const PUBLIC_DOCS_DIR = './public/docs';

// Files to keep in public/docs (non-component specific files)
const KEEP_FILES = [
    'docs-metadata.json',
    '_STRUCTURE.md',
    'README.md',
    'BUILD_REPORT.md',
    'COMPONENT_COVERAGE_REPORT.md',
    'CONSOLIDATED_PROJECT_DOCUMENTATION.md',
    'DEPLOYMENT_GUIDE.md',
    'DOCUMENTATION_GUIDE.md',
    'IMPLEMENTATION_PLAN.md',
    'PROJECT_STATUS.md',
    'SIZE_STANDARDIZATION_CHECKLIST.md',
    'UNIFIED_CHECKLIST.md',
    'UNIFIED_PROJECT_SUMMARY.md',
    'CHANGELOG.md'
];

// Directories to keep
const KEEP_DIRS = [
    'components',
    'milestone-1',
    'milestone-2',
    'milestone-3',
    'milestone-4',
    'milestone-5',
    'milestone-6',
    'milestone-7',
    'milestone-8',
    'milestone-9',
    'milestone-10',
    'milestone-11',
    'milestones',
    'project',
    'reports'
];

async function processFile(entry, fullPath, stats) {
    if (!stats.isFile()) return null;

    // Check if it's a component documentation file
    if (entry.endsWith('_DOCUMENTATION.md') && !KEEP_FILES.includes(entry)) {
        try {
            await unlink(fullPath);
            console.log(`🗑️  Deleted: ${entry}`);
            return 'deleted';
        } catch (error) {
            console.error(`❌ Failed to delete ${entry}: ${error.message}`);
            return 'error';
        }
    }

    const reason = KEEP_FILES.includes(entry) ? '' : ' (not a component doc)';
    console.log(`⏭️  Kept: ${entry}${reason}`);
    return 'kept';
}

async function processDirectory(entry) {
    const reason = KEEP_DIRS.includes(entry) ? '' : ' (manual review needed)';
    console.log(`📁 Directory kept: ${entry}/${reason}`);
    return 'kept';
}

async function cleanupOldDocs() {
    try {
        console.log('🧹 Cleaning up old documentation files from public/docs...\n');

        const entries = await readdir(PUBLIC_DOCS_DIR);
        let deletedCount = 0;
        let skippedCount = 0;

        for (const entry of entries) {
            const fullPath = join(PUBLIC_DOCS_DIR, entry);
            const stats = await stat(fullPath);

            const result = stats.isFile()
                ? await processFile(entry, fullPath, stats)
                : await processDirectory(entry);

            if (result === 'deleted') deletedCount++;
            else if (result === 'kept') skippedCount++;
        }

        console.log(`\n✅ Cleanup completed:`);
        console.log(`   🗑️  Deleted files: ${deletedCount}`);
        console.log(`   ⏭️  Kept files/dirs: ${skippedCount}`);

    } catch (error) {
        console.error('❌ Error during cleanup:', error.message);
        process.exit(1);
    }
}

cleanupOldDocs();
