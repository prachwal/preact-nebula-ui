import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const simplePages = [
    'checkbox', 'radio', 'switch', 'select', 'breadcrumb', 'pagination',
    'tabs', 'badge', 'progress', 'skeleton', 'spinner', 'toast', 'avatar',
    'drawer', 'popover', 'table', 'divider', 'container', 'stack', 'label'
];

function convertSimplePage(componentName) {
    const pagePath = path.join(__dirname, 'src', 'pages', componentName, `${componentName.charAt(0).toUpperCase() + componentName.slice(1)}Page.tsx`);

    if (!fs.existsSync(pagePath)) {
        console.log(`⚠️ File not found: ${pagePath}`);
        return false;
    }

    let content = fs.readFileSync(pagePath, 'utf8');

    // Check if already converted
    if (content.includes('usePathTabPage')) {
        console.log(`✅ ${componentName} already converted`);
        return true;
    }

    console.log(`🔄 Converting ${componentName}...`);

    // Replace imports
    content = content.replace(
        /import { useState } from 'preact\/hooks'\n/,
        ''
    );

    content = content.replace(
        /import { PageHeader } from '..\/..\/components\/layout\/PageHeader'/,
        `import { PageHeader } from '../../components/layout/PageHeader'
import { usePathTabPage, PathTabPageConfigs } from '../../hooks'`
    );

    // Remove type definitions
    content = content.replace(/type DemoType = [^;]+;?\n\n?/g, '');
    content = content.replace(/interface Tab {[^}]+}\n\n?/g, '');

    // Find and extract existing tabs
    const tabsMatch = content.match(/const tabs: Tab\[\] = \[([\s\S]*?)\]/);
    if (!tabsMatch) {
        console.log(`❌ Could not find tabs definition in ${componentName}`);
        return false;
    }

    const tabsContent = tabsMatch[1];
    const tabLines = tabsContent.split('\n').filter(line => line.includes('key:'));

    const additionalTabs = [];
    for (const line of tabLines) {
        const keyMatch = line.match(/key: '([^']+)'/);
        const labelMatch = line.match(/label: '([^']+)'/);

        if (keyMatch && labelMatch) {
            const key = keyMatch[1];
            const label = labelMatch[1];

            // Skip basic, props, docs/documentation as they're automatic
            if (!['basic', 'props', 'docs', 'documentation'].includes(key)) {
                additionalTabs.push(`      { key: '${key}', label: '${label}' }`);
            }
        }
    }

    // Replace useState with usePathTabPage
    const additionalTabsStr = additionalTabs.length > 0 ? `[\n${additionalTabs.join(',\n')}\n    ]` : '[]';

    content = content.replace(
        /const \[activeDemo, setActiveDemo\] = useState<DemoType>\('[^']+'\)\n\n  const tabs: Tab\[\] = \[[\s\S]*?\]/,
        `const { activeTab, setActiveTab, tabs } = usePathTabPage(
    PathTabPageConfigs.withDocumentation('/${componentName}', ${additionalTabsStr})
  )`
    );

    // Replace activeDemo with activeTab in JSX
    content = content.replace(/activeDemo/g, 'activeTab');
    content = content.replace(/setActiveDemo/g, 'setActiveTab');
    content = content.replace(/\(tab\) => setActiveTab\(tab as DemoType\)/g, 'setActiveTab');

    // Fix docs tab reference
    content = content.replace(/activeTab === 'docs'/g, "activeTab === 'documentation'");

    fs.writeFileSync(pagePath, content);
    console.log(`✅ ${componentName} converted successfully`);
    return true;
}

function updateAppRouting(componentName) {
    const appPath = path.join(__dirname, 'src', 'app.tsx');
    let appContent = fs.readFileSync(appPath, 'utf8');

    const oldRoute = `path="/${componentName}"`;
    const newRoute = `path="/${componentName}/:tab"`;

    if (appContent.includes(newRoute)) {
        console.log(`✅ ${componentName} routing already updated`);
        return;
    }

    if (appContent.includes(oldRoute)) {
        appContent = appContent.replace(oldRoute, newRoute);
        fs.writeFileSync(appPath, appContent);
        console.log(`✅ ${componentName} routing updated`);
    }
}

// Convert all simple pages
console.log('🚀 Starting batch conversion of simple pages...\n');

for (const componentName of simplePages) {
    try {
        if (convertSimplePage(componentName)) {
            updateAppRouting(componentName);
        }
        console.log('');
    } catch (error) {
        console.error(`❌ Error converting ${componentName}:`, error.message);
    }
}

console.log('✨ Batch conversion completed!');
