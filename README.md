# 🌟 Nebula UI

Modern, accessible, and customizable component library built with **Preact** and **Tailwind CSS**.

[![NPM Version](https://img.shields.io/npm/v/@prp/nebula-ui)](https://www.npmjs.com/package/@prp/nebula-ui)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8+-blue)](https://www.typescriptlang.org/)
[![Preact](https://img.shields.io/badge/Preact-10.26+-purple)](https://preactjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-cyan)](https://tailwindcss.com/)

## ✨ Features

- 🚀 **Built for Preact** - Optimized for Preact with full TypeScript support
- 🎨 **Tailwind CSS** - Utility-first styling with customization
- 📦 **Tree-shakable** - Import only what you need
- ♿ **Accessible** - WCAG compliant components
- 🔧 **Customizable** - Easy to theme and extend
- 📱 **Responsive** - Mobile-first design approach
- 🧪 **Well-tested** - Comprehensive test coverage

## 📦 Installation

```bash
npm install @prp/nebula-ui
```

Make sure you have the required peer dependencies:

```bash
npm install preact
```

## 🚀 Quick Start

### 1. Import Styles

Add the Nebula UI styles to your main CSS file:

```css
@import '@prp/nebula-ui/styles';
```

Or import in your JavaScript/TypeScript entry file:

```javascript
import '@prp/nebula-ui/styles'
```

### 2. Use Components

```tsx
import { Button } from '@prp/nebula-ui'

function App() {
  return (
    <div>
      <Button variant="primary" size="lg">
        Hello Nebula UI!
      </Button>
    </div>
  )
}
```

## 🧩 Components

### Button

A versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@prp/nebula-ui'

// Basic usage
<Button>Click me</Button>

// With variants
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// With sizes
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>

// With states
<Button loading>Loading...</Button>
<Button disabled>Disabled</Button>

// With icons
<Button leftIcon="🚀">Launch</Button>
<Button rightIcon="→">Next</Button>

// Full width
<Button fullWidth>Full Width Button</Button>
```

#### Button Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'destructive'` | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `leftIcon` | `ComponentChildren` | - | Icon before text |
| `rightIcon` | `ComponentChildren` | - | Icon after text |
| `fullWidth` | `boolean` | `false` | Take full container width |
| `disabled` | `boolean` | `false` | Disable the button |
| `className` | `string` | - | Additional CSS classes |

## 🎨 Customization

Nebula UI uses Tailwind CSS classes. You can customize the appearance by:

1. **Extending Tailwind Config** - Add custom colors, spacing, etc.
2. **Custom CSS Classes** - Override default styles with your own classes
3. **CSS Variables** - Modify component tokens (coming soon)

## 🧪 Development

### Setup

```bash
git clone https://github.com/PRachwal/preact-nebula-ui.git
cd preact-nebula-ui
npm install
```

### Scripts

```bash
# Start development server
npm run dev

# Build the library
npm run build:lib

# Run tests
npm run test

# Run tests with coverage
npm run test:coverage

# Type check
npm run type-check

# Lint code
npm run lint

# Build and publish (dry run)
npm run publish:dry

# Publish to NPM
npm run publish:npm
```

### Windows PowerShell Scripts

For Windows users, use the PowerShell scripts in the `scripts/` folder:

```powershell
# Build the library
.\scripts\build.ps1

# Publish (dry run)
.\scripts\publish.ps1 -DryRun

# Publish to NPM
.\scripts\publish.ps1
```

## 📋 Roadmap

- [ ] More components (Input, Select, Modal, etc.)
- [ ] Dark mode support
- [ ] Theme customization system
- [ ] Storybook documentation
- [ ] Form validation helpers
- [ ] Animation utilities

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT © [PRachwal](https://github.com/PRachwal)

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@prp/nebula-ui)
- [GitHub Repository](https://github.com/PRachwal/preact-nebula-ui)
- [Issues](https://github.com/PRachwal/preact-nebula-ui/issues)

---

Made with ❤️ using Preact and Tailwind CSS
