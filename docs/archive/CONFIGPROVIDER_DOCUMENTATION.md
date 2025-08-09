# ConfigProvider - Documentation

## Overview

The `ConfigProvider` component provides global configuration for all Nebula UI components in your application. It allows you to manage themes, locale settings, default component props, and other global UI settings.

## Features

- **Theme management** - Global configuration of colors, typography, and design tokens
- **Internationalization** - Support for multiple languages and regional formats
- **Default props** - Central management of default component properties
- **CSS Variables** - Automatic generation of CSS variables
- **Theme algorithms** - Dynamic color generation based on a base set
- **CSS Prefixes** - Configuration of CSS class prefixes
- **Wave effects** - Configuration of interaction effects

## Basic Usage

```tsx
import { ConfigProvider } from '@preact-nebula/ui'
import { App } from './App'

function Root() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        }
      }}
    >
      <App />
    </ConfigProvider>
  )
}
```

## Advanced Examples

### Complete Theme Configuration

```tsx
import { ConfigProvider } from '@preact-nebula/ui'

const customTheme = {
  token: {
    // Primary colors
    colorPrimary: '#722ed1',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    
    // Background and text
    colorBg: '#ffffff',
    colorText: '#262626',
    colorTextSecondary: '#8c8c8c',
    
    // Typography
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    fontSize: 14,
    lineHeight: 1.5714285714285714,
    
    // Spacing
    padding: 16,
    margin: 16,
    
    // Border radius
    borderRadius: 6,
    borderRadiusLG: 8,
    borderRadiusSM: 4,
    
    // Controls
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    
    // Animations
    motionDurationMid: '0.2s',
    motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    
    // Z-index
    zIndexPopupBase: 1000,
    zIndexModal: 1000,
    zIndexDrawer: 1000,
    zIndexTooltip: 1070,
  },
  components: {
    Button: {
      borderRadiusSM: 4,
      borderRadius: 6,
      borderRadiusLG: 8,
    },
    Input: {
      borderRadius: 6,
      controlHeight: 36,
    },
    Modal: {
      borderRadiusLG: 12,
    }
  }
}

function ThemedApp() {
  return (
    <ConfigProvider theme={customTheme}>
      <div className="min-h-screen bg-gray-50">
        <h1>Application with Custom Theme</h1>
        {/* Application components */}
      </div>
    </ConfigProvider>
  )
}
```

### Configuration with Locale Settings

```tsx
import { ConfigProvider } from '@preact-nebula/ui'

const polishLocale = {
  locale: 'pl-PL',
  direction: 'ltr' as const,
  messages: {
    'button.ok': 'OK',
    'button.cancel': 'Anuluj',
    'button.submit': 'Wyślij',
    'button.reset': 'Resetuj',
    'pagination.prev': 'Poprzednia',
    'pagination.next': 'Następna',
    'pagination.page': 'Strona',
    'pagination.total': 'Łącznie {total} elementów',
    'select.placeholder': 'Wybierz opcję',
    'select.noData': 'Brak danych',
    'upload.drag': 'Przeciągnij pliki tutaj',
    'upload.clickToUpload': 'Kliknij aby przesłać',
    'datepicker.today': 'Dzisiaj',
    'datepicker.clear': 'Wyczyść',
    'modal.ok': 'OK',
    'modal.cancel': 'Anuluj',
  },
  dateFormat: 'DD.MM.YYYY',
  timeFormat: 'HH:mm',
  firstDayOfWeek: 1, // Poniedziałek
  numberFormat: {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  },
  currency: 'PLN'
}

function LocalizedApp() {
  return (
    <ConfigProvider
      locale={polishLocale}
      theme={{
        token: {
          colorPrimary: '#1890ff',
          fontFamily: 'Inter, -apple-system, sans-serif',
        }
      }}
    >
      <div>
        <h1>Application in Polish</h1>
        {/* Components will use Polish translations */}
      </div>
    </ConfigProvider>
  )
}
```

### Default Props for Components

```tsx
const componentDefaults = {
  Button: {
    size: 'md',
    variant: 'primary',
  },
  Input: {
    size: 'md',
    placeholder: 'Wprowadź wartość...',
  },
  Modal: {
    centered: true,
    closable: true,
    maskClosable: false,
  },
  Table: {
    size: 'md',
    bordered: true,
    showHeader: true,
  },
  Pagination: {
    showSizeChanger: true,
    showQuickJumper: true,
    showTotal: (total: number, range: [number, number]) => 
      `${range[0]}-${range[1]} z ${total} elementów`,
  }
}

function AppWithDefaults() {
  return (
    <ConfigProvider
      componentDefaults={componentDefaults}
      theme={{
        token: {
          colorPrimary: '#722ed1',
        }
      }}
    >
      <div>
        {/* All buttons will be md and primary by default */}
        <Button>Button</Button>
        
        {/* All inputs will have a placeholder */}
        <Input />
        
        {/* Tables will be bordered by default */}
        <Table dataSource={data} columns={columns} />
      </div>
    </ConfigProvider>
  )
}
```

### CSS Variables and Prefixes

```tsx
function CustomPrefixApp() {
  return (
    <ConfigProvider
      prefixCls="my-ui"
      iconPrefixCls="my-icon"
      cssVar={{
        prefix: 'my-theme',
        key: 'default'
      }}
      theme={{
        token: {
          colorPrimary: '#722ed1',
          borderRadius: 8,
        }
      }}
    >
      <div>
        {/* Components will use the prefix "my-ui-" */}
        <Button>Button with Custom Prefix</Button>
      </div>
    </ConfigProvider>
  )
}
```

### Nested Providers and Inheritance

```tsx
function NestedProvidersApp() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        }
      }}
    >
      <div className="app">
        <header>
          <h1>Main Application</h1>
        </header>
        
        <main>
          {/* Section with a different theme */}
          <ConfigProvider
            theme={{
              algorithm: darkAlgorithm,
              inherit: true, // Inherit tokens from parent
              token: {
                colorPrimary: '#722ed1', // Override primary color
              }
            }}
          >
            <section className="dark-section">
              <h2>Section with Dark Theme</h2>
              <Button>Dark Button</Button>
            </section>
          </ConfigProvider>
          
          <section className="normal-section">
            <h2>Section with Normal Theme</h2>
            <Button>Normal Button</Button>
          </section>
        </main>
      </div>
    </ConfigProvider>
  )
}
```

## Props API

### ConfigProviderProps

| Prop                | Type                                 | Default         | Description                  |
| ------------------- | ------------------------------------ | --------------- | ---------------------------- |
| `theme`             | `ThemeConfig`                        | `undefined`     | Theme configuration          |
| `locale`            | `LocaleConfig`                       | `undefined`     | Locale settings              |
| `componentDefaults` | `ComponentDefaultsConfig`            | `{}`            | Default props for components |
| `prefixCls`         | `string`                             | `'nebula'`      | Prefix for CSS classes       |
| `iconPrefixCls`     | `string`                             | `'nebula-icon'` | Prefix for icons             |
| `cssVar`            | `boolean \| CSSVarConfig`            | `false`         | CSS Variables configuration  |
| `algorithm`         | `ThemeAlgorithm \| ThemeAlgorithm[]` | `undefined`     | Theme generation algorithms  |
| `autoInsertCss`     | `boolean`                            | `true`          | Automatic CSS insertion      |
| `wave`              | `WaveConfig`                         | `undefined`     | Wave effects configuration   |

### ThemeConfig

| Prop         | Type                                 | Description               |
| ------------ | ------------------------------------ | ------------------------- |
| `token`      | `GlobalToken`                        | Global design tokens      |
| `components` | `ComponentTokenMap`                  | Component-specific tokens |
| `algorithm`  | `ThemeAlgorithm \| ThemeAlgorithm[]` | Generation algorithms     |
| `hashed`     | `boolean`                            | Use hash for CSS          |
| `inherit`    | `boolean`                            | Inherit from parent       |

### GlobalToken (selected properties)

| Token           | Type     | Description               |
| --------------- | -------- | ------------------------- |
| `colorPrimary`  | `string` | Primary application color |
| `colorSuccess`  | `string` | Success color             |
| `colorWarning`  | `string` | Warning color             |
| `colorError`    | `string` | Error color               |
| `fontFamily`    | `string` | Primary font              |
| `fontSize`      | `number` | Font size                 |
| `borderRadius`  | `number` | Border radius             |
| `controlHeight` | `number` | Control height            |
| `padding`       | `number` | Default padding           |
| `margin`        | `number` | Default margin            |

## Hooks

### useConfig

Hook to access global configuration:

```tsx
import { useConfig } from '@preact-nebula/ui'

function MyComponent() {
  const config = useConfig()
  
  return (
    <div className={`${config.prefixCls}-my-component`}>
      <p>Prefix: {config.prefixCls}</p>
    </div>
  )
}
```

### useTheme

Hook to access theme tokens:

```tsx
import { useTheme } from '@preact-nebula/ui'

function ThemedComponent() {
  const { token } = useTheme()
  
  return (
    <div 
      style={{
        color: token.colorPrimary,
        borderRadius: token.borderRadius,
        padding: token.padding,
      }}
    >
      Component using theme tokens
    </div>
  )
}
```

### useLocale

Hook to access locale settings:

```tsx
import { useLocale } from '@preact-nebula/ui'

function LocalizedComponent() {
  const { locale, messages, formatDate } = useLocale()
  
  return (
    <div>
      <p>Language: {locale}</p>
      <p>OK: {messages['button.ok']}</p>
      <p>Date: {formatDate(new Date())}</p>
    </div>
  )
}
```

### useComponentDefaults

Hook to access default props:

```tsx
import { useComponentDefaults } from '@preact-nebula/ui'

function MyButton(props: ButtonProps) {
  const defaults = useComponentDefaults('Button')
  const finalProps = { ...defaults, ...props }
  
  return <button {...finalProps} />
}
```

## Theme Algorithms

### Dark Theme Algorithm

```tsx
import { ConfigProvider, theme } from '@preact-nebula/ui'

const { darkAlgorithm } = theme

function DarkApp() {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
        token: {
          colorPrimary: '#1890ff',
        }
      }}
    >
      <div className="dark-app">
        <h1>Dark Theme</h1>
      </div>
    </ConfigProvider>
  )
}
```

### Compact Theme Algorithm

```tsx
import { ConfigProvider, theme } from '@preact-nebula/ui'

const { compactAlgorithm } = theme

function CompactApp() {
  return (
    <ConfigProvider
      theme={{
        algorithm: compactAlgorithm,
        token: {
          colorPrimary: '#722ed1',
        }
      }}
    >
      <div className="compact-app">
        <h1>Compact Theme</h1>
      </div>
    </ConfigProvider>
  )
}
```

### Combining Algorithms

```tsx
import { ConfigProvider, theme } from '@preact-nebula/ui'

const { darkAlgorithm, compactAlgorithm } = theme

function DarkCompactApp() {
  return (
    <ConfigProvider
      theme={{
        algorithm: [darkAlgorithm, compactAlgorithm],
        token: {
          colorPrimary: '#52c41a',
        }
      }}
    >
      <div>
        <h1>Dark + Compact Theme</h1>
      </div>
    </ConfigProvider>
  )
}
```

## Best Practices

### Provider Hierarchy

```tsx
// ✅ Good - logical hierarchy
<ConfigProvider theme={globalTheme}>
  <Router>
    <Layout>
      <ConfigProvider theme={sectionTheme}>
        <AdminPanel />
      </ConfigProvider>
    </Layout>
  </Router>
</ConfigProvider>

// ❌ Bad - too many nested providers
<ConfigProvider>
  <ConfigProvider>
    <ConfigProvider>
      <Component />
    </ConfigProvider>
  </ConfigProvider>
</ConfigProvider>
```

### Performance

```tsx
// ✅ Good - stable references
const theme = useMemo(() => ({
  token: { colorPrimary: '#1890ff' }
}), [])

<ConfigProvider theme={theme}>
  <App />
</ConfigProvider>

// ❌ Bad - new reference on every render
<ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
  <App />
</ConfigProvider>
```

### TypeScript

```tsx
// Extending token types
declare module '@preact-nebula/ui' {
  interface GlobalToken {
    customColorBrand?: string
    customSpacingUnit?: number
  }
}

// Usage with TypeScript
const theme: ThemeConfig = {
  token: {
    customColorBrand: '#ff6b35',
    customSpacingUnit: 8,
  }
}
```

## Integration Examples

### With React Router

```tsx
import { ConfigProvider } from '@preact-nebula/ui'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: '#1890ff' } }}
      locale={polishLocale}
    >
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={
            <ConfigProvider theme={{ algorithm: darkAlgorithm }}>
              <AdminLayout />
            </ConfigProvider>
          } />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}
```

### With State Management

```tsx
import { useSelector } from 'react-redux'
import { ConfigProvider } from '@preact-nebula/ui'

function ThemedApp() {
  const theme = useSelector(state => state.theme)
  const locale = useSelector(state => state.locale)
  
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.isDark ? darkAlgorithm : undefined,
        token: {
          colorPrimary: theme.primaryColor,
        }
      }}
      locale={locale}
    >
      <App />
    </ConfigProvider>
  )
}
```

ConfigProvider is a fundamental component that allows central management of all aspects of the appearance and behavior of components in the Nebula UI application.
