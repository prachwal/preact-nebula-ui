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
- 🧪 **Well-tested** - 100% test coverage, 400+ tests passing, 22 components

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

Nebula UI provides a growing set of accessible, customizable, and well-tested components:

### 🎛️ Form Controls
- **Button** – Variants, sizes, icons, loading, fullWidth
- **Input** – All variants, accessibility, required states
- **Label** – Accessibility, required/disabled states
- **Textarea** – Auto-resize, char count, variants, dark mode
- **FieldError** – Accessible error messages
- **Checkbox** – Tri-state, validation, custom content, accessibility
- **Radio** – Single selection, groups, validation, accessibility
- **Switch** – Toggle controls, animations, sizes, icons
- **Select** – Dropdown with search, multi-select, keyboard navigation

### 🏗️ Layout System
- **Card** – Composable, variants, header/body/footer
- **Container** – Responsive, max-width, padding controls
- **Stack** – Vertical/horizontal, spacing, alignment
- **Divider** – Horizontal/vertical, text, style variants

### 📢 Feedback Components
- **Alert** – Info/success/warning/error, dismissible, actions
- **Badge** – Status indicators, dot mode, overflow handling
- **Progress** – Linear/circular, indeterminate, labels
- **Skeleton** – Loading placeholders, shapes, animations

### 🎨 Display Components
- **Spinner** – Size, color, accessibility
- **Avatar** – Images, initials, groups, badges

### 🧭 Navigation
- **Tabs** – Horizontal/vertical, variants, keyboard navigation

All components are fully typed, accessible (WCAG 2.1 AA), and covered by comprehensive tests (400+ test cases).

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

- [x] Milestone 1: Forms Foundation (Input, Label, Textarea, FieldError) – **Done**
- [x] Milestone 2: Layout System (Card, Container, Stack, Divider) – **Done**  
- [x] Milestone 3: Feedback Components (Alert, Badge, Progress, Skeleton) – **Done**
- [x] Spinner, Avatar, Tabs – **Done**
- [x] **Milestone 4: Advanced Form Controls (Checkbox, Radio, Switch, Select) – COMPLETED**
- [ ] [Milestone 5: Navigation & Data (Breadcrumb, Pagination, Table)](docs/milestone-5/)
## 📚 Documentation Structure

Nebula UI uses a milestone-based documentation system. Each major milestone has its own folder in `docs/`, containing:

- `README.md` – Milestone overview, goals, and delivered components
- `IMPLEMENTATION_CHECKLIST.md` – Detailed implementation checklist for each component
- `TECHNICAL_OVERVIEW.md` – Technical architecture, design decisions, and patterns

**Milestone documentation folders:**

- [Milestone 1: Forms Foundation](docs/milestone-1/)
- [Milestone 2: Layout System](docs/milestone-2/)
- [Milestone 3: Feedback Components](docs/milestone-3/)
- [Milestone 4: Advanced Form Controls](docs/milestone-4/)
- [Milestone 5: Navigation & Data](docs/milestone-5/)

For global project plans, status, and size standardization, see:

- [Implementation Plan](docs/IMPLEMENTATION_PLAN.md)
- [Milestone Implementation Plan](docs/MILESTONE_IMPLEMENTATION_PLAN.md)
- [Project Status](docs/PROJECT_STATUS.md)
- [Size Standardization Checklist](docs/SIZE_STANDARDIZATION_CHECKLIST.md)
- [ ] Milestone 6: Advanced Interactions (Modal, Tooltip, Popover)
- [ ] Storybook documentation
- [ ] Theme customization system
- [ ] CI/CD pipeline
- [ ] More comprehensive edge-case testing


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
