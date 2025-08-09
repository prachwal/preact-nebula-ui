# Nebula UI - Home

Welcome to **Nebula UI** - a modern, accessible, and production-ready component library for React and Preact applications.

## 🌟 Why Choose Nebula UI?

Nebula UI provides everything you need to build beautiful, accessible, and performant user interfaces:

### ✨ Modern & Beautiful
- **40+ Components** - Complete set of UI components
- **Dark Mode** - Built-in theme switching
- **Responsive Design** - Mobile-first approach
- **Clean Aesthetics** - Modern design system

### 🛡️ Production Ready
- **TypeScript First** - Complete type safety
- **Accessibility** - WCAG 2.1 AA compliant
- **Well Tested** - 1400+ tests with 100% coverage
- **Performance Optimized** - Tree-shaking support

### 🎨 Highly Customizable
- **Theme System** - Extensive customization options
- **CSS Variables** - Easy runtime theming
- **Component Variants** - Multiple style variants
- **Brand Flexibility** - Adapt to your brand identity

## 🚀 Quick Start

Get started with Nebula UI in minutes:

```bash
npm install @nebula-ui/components
```

```tsx
import { Button, Card, Input } from '@nebula-ui/components'
import '@nebula-ui/components/styles.css'

function App() {
  return (
    <Card>
      <h1>Welcome to Nebula UI</h1>
      <Input placeholder="Enter your name..." />
      <Button variant="primary">Get Started</Button>
    </Card>
  )
}
```

## 📊 Component Coverage

| Category          | Components   | Status     |
| ----------------- | ------------ | ---------- |
| **Form Controls** | 9 components | ✅ Complete |
| **Data Display**  | 8 components | ✅ Complete |
| **Navigation**    | 6 components | ✅ Complete |
| **Layout**        | 4 components | ✅ Complete |
| **Feedback**      | 5 components | ✅ Complete |
| **Overlays**      | 4 components | ✅ Complete |
| **Advanced**      | 8 components | ✅ Complete |

**Total: 44 components** - All production ready!

## 🏆 Key Features

### 🎯 Developer Experience
- **IntelliSense** - Full TypeScript support
- **Documentation** - Comprehensive docs with examples
- **Storybook** - Interactive component playground
- **Hot Reload** - Fast development iteration

### ♿ Accessibility First
- **Screen Readers** - Full NVDA, JAWS, VoiceOver support
- **Keyboard Navigation** - Complete keyboard accessibility
- **Focus Management** - Proper focus indicators
- **ARIA Support** - Semantic HTML and ARIA attributes

### ⚡ Performance
- **Bundle Size** - Optimized for minimal footprint
- **Tree Shaking** - Import only what you need
- **Lazy Loading** - Component-level code splitting
- **SSR Support** - Server-side rendering ready

## 🎨 Design System

Nebula UI follows modern design principles:

- **Consistent Spacing** - 8px grid system
- **Typography Scale** - Harmonious text sizing
- **Color Palette** - Accessible contrast ratios
- **Border Radius** - Consistent rounded corners
- **Shadows** - Subtle depth and elevation

## 📱 Examples

### Form Example
```tsx
import { Input, Button, Card, Label, FieldError } from '@nebula-ui/components'

function ContactForm() {
  return (
    <Card>
      <form>
        <div>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" type="email" />
          <FieldError>Email is required</FieldError>
        </div>
        <Button type="submit">Send Message</Button>
      </form>
    </Card>
  )
}
```

### Data Display Example
```tsx
import { Table, Badge, Avatar, Card } from '@nebula-ui/components'

function UserTable() {
  return (
    <Card>
      <Table>
        <thead>
          <tr>
            <th>User</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Avatar src="/user.jpg" />
              John Doe
            </td>
            <td>
              <Badge variant="success">Active</Badge>
            </td>
          </tr>
        </tbody>
      </Table>
    </Card>
  )
}
```

## 🔗 Quick Links

- **[Browse Components](/components)** - Explore all available components
- **[Installation Guide](/docs/installation)** - Step-by-step setup
- **[Theme Customization](/docs/theming)** - Customize your design
- **[GitHub Repository](https://github.com/your-org/nebula-ui)** - Source code
- **[Live Demo](https://nebula-ui-demo.vercel.app)** - Try it yourself

## 📈 Project Stats

- **✅ 44/44 Components** - Complete component library
- **✅ 1400+ Tests** - Comprehensive test coverage  
- **✅ TypeScript** - Full type safety
- **✅ Accessibility** - WCAG 2.1 AA compliant
- **✅ Dark Mode** - Built-in theme switching
- **✅ Documentation** - Complete docs for all components

---

Ready to build amazing UIs? [Get started now](/docs/installation) or [browse our components](/components).
