#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';

const COMPONENT_PAGES_DIR = 'src/pages';

/**
 * Generate metadata.json files for component pages that don't have them
 */
async function generateMissingMetadata() {
    console.log('🚀 Generating metadata for component pages...');

    const componentData = {
        'anchor': {
            name: 'Anchor',
            category: 'Navigation',
            description: 'Navigation anchor links with smooth scrolling',
            complexity: 'low',
            tags: ['navigation', 'scroll', 'anchor', 'link']
        },
        'autocomplete': {
            name: 'Autocomplete',
            category: 'Form Controls',
            description: 'Smart search input with suggestions and filtering',
            complexity: 'high',
            tags: ['form', 'search', 'suggestions', 'filter']
        },
        'checkbox': {
            name: 'Checkbox',
            category: 'Form Controls',
            description: 'Checkbox input for boolean or multi-select values',
            complexity: 'low',
            tags: ['form', 'input', 'boolean', 'selection']
        },
        'select': {
            name: 'Select',
            category: 'Form Controls',
            description: 'Dropdown selection component with search capabilities',
            complexity: 'medium',
            tags: ['form', 'dropdown', 'selection', 'options']
        },
        'tooltip': {
            name: 'Tooltip',
            category: 'Overlays',
            description: 'Contextual information overlay on hover or focus',
            complexity: 'medium',
            tags: ['overlay', 'information', 'hover', 'context']
        },
        'rating': {
            name: 'Rating',
            category: 'Form Controls',
            description: 'Star rating component for feedback and evaluation',
            complexity: 'medium',
            tags: ['rating', 'stars', 'feedback', 'evaluation']
        },
        'slider': {
            name: 'Slider',
            category: 'Form Controls',
            description: 'Range slider for numeric value selection',
            complexity: 'high',
            tags: ['range', 'slider', 'numeric', 'input']
        },
        'tabs': {
            name: 'Tabs',
            category: 'Navigation',
            description: 'Tabbed interface for organizing content sections',
            complexity: 'medium',
            tags: ['navigation', 'tabs', 'content', 'organization']
        },
        'table': {
            name: 'Table',
            category: 'Data Display',
            description: 'Data table with sorting, filtering, and pagination',
            complexity: 'high',
            tags: ['data', 'table', 'sorting', 'filtering']
        },
        'progress': {
            name: 'Progress',
            category: 'Feedback',
            description: 'Progress indicators and loading bars',
            complexity: 'low',
            tags: ['progress', 'loading', 'feedback', 'status']
        }
    };

    let created = 0;

    for (const [componentKey, data] of Object.entries(componentData)) {
        const componentDir = path.join(COMPONENT_PAGES_DIR, componentKey);
        const metadataPath = path.join(componentDir, 'metadata.json');

        try {
            // Check if directory exists
            await fs.access(componentDir);

            // Check if metadata already exists
            try {
                await fs.access(metadataPath);
                console.log(`⚠️ Metadata already exists for: ${data.name}`);
                continue;
            } catch {
                // Metadata doesn't exist, create it
            }

            const metadata = {
                name: data.name,
                category: data.category,
                description: data.description,
                size: data.complexity === 'high' ? 'large' : data.complexity === 'low' ? 'small' : 'medium',
                complexity: data.complexity,
                tags: data.tags,
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
            console.log(`✅ Created metadata for: ${data.name}`);
            created++;

        } catch (error) {
            console.warn(`⚠️ Could not create metadata for ${componentKey}:`, error.message);
        }
    }

    console.log(`\n🎉 Created ${created} metadata files`);
    return created;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
    generateMissingMetadata().catch(console.error);
}

export { generateMissingMetadata };
