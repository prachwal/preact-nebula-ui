# 📦 Import Guidelines - Preact Nebula UI

## 🎯 Optimal Import Patterns

This guide explains how to import Nebula UI components efficiently for optimal bundle size.

## 🚀 Recommended Import Patterns

### Individual Component Imports (Recommended)

```tsx
// ✅ Best Practice - Import only what you need
import { Button } from 'preact-nebula-ui';
import { Input } from 'preact-nebula-ui';
import { Card } from 'preact-nebula-ui';
```

### Multiple Component Imports

```tsx
// ✅ Good - Multiple components from single import
import { Button, Input, Card, Modal } from 'preact-nebula-ui';
```

### Barrel Exports (Use with caution)

```tsx
// ⚠️ Caution - Imports everything, may increase bundle size
import * as NebulaUI from 'preact-nebula-ui';

// Better approach - destructure what you need
const { Button, Input } = NebulaUI;
```

## 📊 Bundle Size Impact

### Small Application (5-10 components)
- **Individual imports**: ~50-100KB
- **Selective imports**: ~60-120KB  
- **Full library**: ~500KB

### Medium Application (15-25 components)
- **Individual imports**: ~150-250KB
- **Selective imports**: ~180-300KB
- **Full library**: ~500KB

### Large Application (30+ components)
- **Individual imports**: ~300-400KB
- **Selective imports**: ~350-450KB
- **Full library**: ~500KB

## 🎨 Styles Import

Always import styles separately to enable CSS tree-shaking:

```tsx
// ✅ Import styles once in your main file
import 'preact-nebula-ui/styles';

// Or import in CSS
@import 'preact-nebula-ui/styles';
```

## 🛠️ TypeScript Integration

Nebula UI provides complete TypeScript definitions:

```tsx
import type { ButtonProps, InputProps } from 'preact-nebula-ui';
import { Button, Input } from 'preact-nebula-ui';

interface MyComponentProps {
  buttonProps: ButtonProps;
  inputProps: InputProps;
}

const MyComponent = ({ buttonProps, inputProps }: MyComponentProps) => (
  <div>
    <Input {...inputProps} />
    <Button {...buttonProps} />
  </div>
);
```

## 🔧 Advanced Import Patterns

### Theme Provider Setup

```tsx
// App.tsx
import { ConfigProvider } from 'preact-nebula-ui';
import 'preact-nebula-ui/styles';

const App = () => (
  <ConfigProvider theme="dark">
    <YourApplication />
  </ConfigProvider>
);
```

### Lazy Loading Components

```tsx
// For code splitting large components
import { lazy } from 'preact/compat';

const Table = lazy(() => 
import('preact-nebula-ui').then(module => ({ default: module.Table }))
);

const DatePicker = lazy(() => 
import('preact-nebula-ui').then(module => ({ default: module.DatePicker }))
);
```

### Dynamic Imports

```tsx
// For conditional component loading
const loadComponent = async (componentName: string) => {
const module = await import('preact-nebula-ui');
  return module[componentName];
};

// Usage
const Button = await loadComponent('Button');
```

## ⚡ Performance Tips

### 1. Import Only What You Use
```tsx
// ❌ Don't import unused components
import { Button, Input, Table, DatePicker } from 'preact-nebula-ui';

// Only use Button and Input
const MyForm = () => (
  <form>
    <Input />
    <Button>Submit</Button>
  </form>
);
```

```tsx
// ✅ Import only what you need
import { Button, Input } from 'preact-nebula-ui';

const MyForm = () => (
  <form>
    <Input />
    <Button>Submit</Button>
  </form>
);
```

### 2. Use Tree-Shaking Friendly Bundlers
- **Vite**: Automatic tree-shaking ✅
- **Webpack 5**: Configure `sideEffects: false` ✅  
- **Rollup**: Built-in tree-shaking ✅
- **Parcel**: Automatic optimization ✅

### 3. Enable Production Optimizations

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'], // If using React mode
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
});
```

## 🧪 Bundle Analysis

To analyze your bundle size with Nebula UI:

```bash
# Install bundle analyzer
npm install --save-dev webpack-bundle-analyzer

# Build and analyze
npm run build
npx webpack-bundle-analyzer dist/
```

### Expected Results
- **Core components**: ~50KB
- **Form components**: ~80KB  
- **Data components**: ~120KB
- **Advanced components**: ~150KB
- **Complete library**: ~500KB gzipped

## 📋 Common Import Scenarios

### Dashboard Application
```tsx
import { 
  Card, 
  Table, 
  Button, 
  Progress,
  Avatar,
  Badge 
} from 'preact-nebula-ui';
// Bundle size: ~200KB
```

### Form Application  
```tsx
import {
  Input,
  Textarea, 
  Select,
  Checkbox,
  Radio,
  Switch,
  Button,
  Alert
} from 'preact-nebula-ui';
// Bundle size: ~180KB
```

### E-commerce Site
```tsx
import {
  Card,
  Button, 
  Badge,
  Rating,
  Carousel,
  Modal,
  Toast
} from 'preact-nebula-ui';
// Bundle size: ~220KB
```

## 🔍 Troubleshooting

### Large Bundle Size
1. Check imports - ensure you're not importing unused components
2. Verify tree-shaking is working in your bundler
3. Use bundle analyzer to identify heavy components
4. Consider lazy loading for large components

### Missing Styles
1. Ensure styles are imported: `import 'preact-nebula-ui/styles'`
2. Check CSS import order
3. Verify Tailwind CSS is configured correctly

### TypeScript Errors
1. Update TypeScript to latest version (>5.0)
2. Ensure `moduleResolution: "bundler"` in tsconfig.json
3. Check peer dependencies are installed

## 📊 Import Cheat Sheet

| Use Case | Components | Bundle Size | Import Pattern |
|----------|------------|-------------|----------------|
| **Simple Forms** | Input, Button, Label | ~60KB | Individual imports |
| **Data Tables** | Table, Pagination, Search | ~150KB | Selective imports |
| **Admin Dashboard** | Card, Table, Button, Progress | ~200KB | Grouped imports |
| **E-commerce** | Card, Button, Rating, Carousel | ~220KB | Feature-based imports |
| **Complete App** | All components | ~500KB | Full library import |

---

**💡 Recommendation**: Start with individual component imports and monitor your bundle size. Most applications only need 10-15 components, resulting in a bundle size of 150-250KB.

This approach ensures optimal performance while maintaining development flexibility.
