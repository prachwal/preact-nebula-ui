# ConfigProvider - Dokumentacja

## Przegląd

Komponent `ConfigProvider` zapewnia globalną konfigurację dla wszystkich komponentów Nebula UI w aplikacji. Umożliwia zarządzanie motywami, ustawieniami regionalnymi, domyślnymi propami komponentów oraz innymi globalnymi ustawieniami interfejsu użytkownika.

## Funkcje

- **Zarządzanie motywami** - Globalna konfiguracja kolorów, typografii i tokenów designu
- **Internacjonalizacja** - Wsparcie dla wielu języków i formatów regionalnych
- **Domyślne props** - Centralne zarządzanie domyślnymi właściwościami komponentów
- **CSS Variables** - Automatyczne generowanie zmiennych CSS
- **Algorytmy motywu** - Dynamiczne generowanie kolorów na podstawie podstawowego zestawu
- **Prefiksy CSS** - Konfiguracja prefiksów klas CSS
- **Wave efekty** - Konfiguracja efektów interakcji

## Podstawowe użycie

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

## Zaawansowane przykłady

### Kompletna konfiguracja motywu

```tsx
import { ConfigProvider } from '@preact-nebula/ui'

const customTheme = {
  token: {
    // Kolory podstawowe
    colorPrimary: '#722ed1',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#f5222d',
    colorInfo: '#1890ff',
    
    // Tło i teksty
    colorBg: '#ffffff',
    colorText: '#262626',
    colorTextSecondary: '#8c8c8c',
    
    // Typografia
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
    
    // Kontrolki
    controlHeight: 32,
    controlHeightLG: 40,
    controlHeightSM: 24,
    
    // Animacje
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
        <h1>Aplikacja z niestandardowym motywem</h1>
        {/* Komponenty aplikacji */}
      </div>
    </ConfigProvider>
  )
}
```

### Konfiguracja z ustawieniami regionalnymi

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
        <h1>Aplikacja w języku polskim</h1>
        {/* Komponenty będą używać polskich tłumaczeń */}
      </div>
    </ConfigProvider>
  )
}
```

### Domyślne props dla komponentów

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
        {/* Wszystkie przyciski będą domyślnie md i primary */}
        <Button>Przycisk</Button>
        
        {/* Wszystkie inputy będą mieć placeholder */}
        <Input />
        
        {/* Tabele będą domyślnie z ramkami */}
        <Table dataSource={data} columns={columns} />
      </div>
    </ConfigProvider>
  )
}
```

### CSS Variables i prefiksy

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
        {/* Komponenty będą używać prefiksu "my-ui-" */}
        <Button>Przycisk z custom prefiksem</Button>
      </div>
    </ConfigProvider>
  )
}
```

### Nested Providers i dziedziczenie

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
          <h1>Aplikacja główna</h1>
        </header>
        
        <main>
          {/* Sekcja z różnym motywem */}
          <ConfigProvider
            theme={{
              algorithm: darkAlgorithm,
              inherit: true, // Dziedziczy tokeny z parent
              token: {
                colorPrimary: '#722ed1', // Override primary color
              }
            }}
          >
            <section className="dark-section">
              <h2>Sekcja z ciemnym motywem</h2>
              <Button>Ciemny przycisk</Button>
            </section>
          </ConfigProvider>
          
          <section className="normal-section">
            <h2>Sekcja z normalnym motywem</h2>
            <Button>Normalny przycisk</Button>
          </section>
        </main>
      </div>
    </ConfigProvider>
  )
}
```

## Props API

### ConfigProviderProps

| Prop                | Typ                                  | Domyślna        | Opis                           |
| ------------------- | ------------------------------------ | --------------- | ------------------------------ |
| `theme`             | `ThemeConfig`                        | `undefined`     | Konfiguracja motywu            |
| `locale`            | `LocaleConfig`                       | `undefined`     | Ustawienia regionalne          |
| `componentDefaults` | `ComponentDefaultsConfig`            | `{}`            | Domyślne props dla komponentów |
| `prefixCls`         | `string`                             | `'nebula'`      | Prefiks dla klas CSS           |
| `iconPrefixCls`     | `string`                             | `'nebula-icon'` | Prefiks dla ikon               |
| `cssVar`            | `boolean \| CSSVarConfig`            | `false`         | Konfiguracja CSS Variables     |
| `algorithm`         | `ThemeAlgorithm \| ThemeAlgorithm[]` | `undefined`     | Algorytmy generowania motywu   |
| `autoInsertCss`     | `boolean`                            | `true`          | Automatyczne wstawianie CSS    |
| `wave`              | `WaveConfig`                         | `undefined`     | Konfiguracja efektów wave      |

### ThemeConfig

| Prop         | Typ                                  | Opis                               |
| ------------ | ------------------------------------ | ---------------------------------- |
| `token`      | `GlobalToken`                        | Globalne tokeny designu            |
| `components` | `ComponentTokenMap`                  | Tokeny specyficzne dla komponentów |
| `algorithm`  | `ThemeAlgorithm \| ThemeAlgorithm[]` | Algorytmy generowania              |
| `hashed`     | `boolean`                            | Czy używać hash dla CSS            |
| `inherit`    | `boolean`                            | Czy dziedziczyć z parent           |

### GlobalToken (wybrane właściwości)

| Token           | Typ      | Opis                   |
| --------------- | -------- | ---------------------- |
| `colorPrimary`  | `string` | Główny kolor aplikacji |
| `colorSuccess`  | `string` | Kolor sukcesu          |
| `colorWarning`  | `string` | Kolor ostrzeżenia      |
| `colorError`    | `string` | Kolor błędu            |
| `fontFamily`    | `string` | Czcionka główna        |
| `fontSize`      | `number` | Rozmiar czcionki       |
| `borderRadius`  | `number` | Promień ramki          |
| `controlHeight` | `number` | Wysokość kontrolek     |
| `padding`       | `number` | Podstawowy padding     |
| `margin`        | `number` | Podstawowy margin      |

## Hooks

### useConfig

Hook do dostępu do globalnej konfiguracji:

```tsx
import { useConfig } from '@preact-nebula/ui'

function MyComponent() {
  const config = useConfig()
  
  return (
    <div className={`${config.prefixCls}-my-component`}>
      <p>Prefiks: {config.prefixCls}</p>
    </div>
  )
}
```

### useTheme

Hook do dostępu do tokénów motywu:

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
      Komponent używający tokénów motywu
    </div>
  )
}
```

### useLocale

Hook do dostępu do ustawień regionalnych:

```tsx
import { useLocale } from '@preact-nebula/ui'

function LocalizedComponent() {
  const { locale, messages, formatDate } = useLocale()
  
  return (
    <div>
      <p>Język: {locale}</p>
      <p>OK: {messages['button.ok']}</p>
      <p>Data: {formatDate(new Date())}</p>
    </div>
  )
}
```

### useComponentDefaults

Hook do dostępu do domyślnych props:

```tsx
import { useComponentDefaults } from '@preact-nebula/ui'

function MyButton(props: ButtonProps) {
  const defaults = useComponentDefaults('Button')
  const finalProps = { ...defaults, ...props }
  
  return <button {...finalProps} />
}
```

## Algorytmy motywu

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
        <h1>Ciemny motyw</h1>
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
        <h1>Kompaktowy motyw</h1>
      </div>
    </ConfigProvider>
  )
}
```

### Łączenie algorytmów

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
        <h1>Ciemny + Kompaktowy</h1>
      </div>
    </ConfigProvider>
  )
}
```

## Najlepsze praktyki

### Hierarchia Provider'ów

```tsx
// ✅ Dobrze - logiczna hierarchia
<ConfigProvider theme={globalTheme}>
  <Router>
    <Layout>
      <ConfigProvider theme={sectionTheme}>
        <AdminPanel />
      </ConfigProvider>
    </Layout>
  </Router>
</ConfigProvider>

// ❌ Źle - za dużo zagnieżdżeń
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
// ✅ Dobrze - stabilne referencje
const theme = useMemo(() => ({
  token: { colorPrimary: '#1890ff' }
}), [])

<ConfigProvider theme={theme}>
  <App />
</ConfigProvider>

// ❌ Źle - nowa referencja przy każdym renderze
<ConfigProvider theme={{ token: { colorPrimary: '#1890ff' } }}>
  <App />
</ConfigProvider>
```

### TypeScript

```tsx
// Rozszerzanie typów tokénów
declare module '@preact-nebula/ui' {
  interface GlobalToken {
    customColorBrand?: string
    customSpacingUnit?: number
  }
}

// Użycie z TypeScript
const theme: ThemeConfig = {
  token: {
    customColorBrand: '#ff6b35',
    customSpacingUnit: 8,
  }
}
```

## Przykłady integracji

### Z React Router

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

### Z State Management

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

ConfigProvider jest fundamentalnym komponentem który pozwala na centralne zarządzanie wszystkimi aspektami wyglądu i zachowania komponentów w aplikacji Nebula UI.
