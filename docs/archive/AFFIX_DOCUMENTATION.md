# Affix - Documentation

## Overview

The `Affix` component allows you to "stick" an element to a specific position on the screen while scrolling. It's especially useful for creating navigation elements, action buttons, or side panels that should remain visible while the content is being scrolled.

## Features

- **Positioning** - Ability to stick to the top or bottom of the screen
- **Offsets** - Control the distance from the edge of the screen
- **Target** - Ability to specify a container element to monitor
- **Threshold** - Activation threshold for affixing
- **Sizes** - Size variants (sm, md, lg)
- **Events** - Callbacks for different component states
- **Accessibility** - Full support for assistive technologies

## Basic Usage

```tsx
import { Affix } from '@preact-nebula/ui'

function BasicAffixExample() {
  return (
    <div className="h-screen">
      <div className="h-96 bg-gray-100 p-4">
        Scroll down...
      </div>
      
      <Affix offsetTop={20}>
        <div className="bg-blue-500 text-white p-4 rounded">
          This element will be affixed to the top of the screen
        </div>
      </Affix>
      
      <div className="h-screen bg-gray-200 p-4">
        Long page content...
      </div>
    </div>
  )
}
```

## Advanced Examples

### Affix positioned at the bottom

```tsx
function BottomAffixExample() {
  return (
    <div className="min-h-screen">
      <div className="h-screen bg-gray-100 p-4">
        Page content
      </div>
      
      <Affix 
        position="bottom" 
        offsetBottom={20}
        onAffix={(affixed) => console.log('Affixed:', affixed)}
      >
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          Button affixed to the bottom
        </button>
      </Affix>
    </div>
  )
}
```

### Affix with custom target

```tsx
function CustomTargetAffixExample() {
  const [target, setTarget] = useState<HTMLElement | null>(null)
  
  return (
    <div className="h-screen flex">
      <div className="flex-1 p-4">Main content</div>
      
      <div 
        ref={setTarget}
        className="w-64 h-96 overflow-y-auto bg-gray-50 p-4"
      >
        <div className="h-64 bg-gray-200 mb-4">
          Scrollable container
        </div>
        
        <Affix 
          target={target}
          offsetTop={10}
          size="sm"
        >
          <div className="bg-blue-400 text-white p-2 rounded">
            Affixed within the container
          </div>
        </Affix>
        
        <div className="h-96 bg-gray-200 mt-4">
          More content...
        </div>
      </div>
    </div>
  )
}
```

### Responsive Affix with threshold

```tsx
function ResponsiveAffixExample() {
  const [affixed, setAffixed] = useState(false)
  
  return (
    <div className="min-h-screen">
      <header className="h-20 bg-blue-600 text-white flex items-center px-6">
        <h1>Page Header</h1>
      </header>
      
      <div className="h-40 bg-gray-100 p-4">
        Scroll down to activate affixing
      </div>
      
      <Affix
        offsetTop={0}
        threshold={80}
        onChange={setAffixed}
        onScroll={(scrollTop, affixed) => {
          console.log(`Scroll: ${scrollTop}px, Affixed: ${affixed}`)
        }}
        className={cn(
          "transition-shadow duration-300",
          affixed && "shadow-lg"
        )}
      >
        <nav className="bg-white border-b px-6 py-3">
          <div className="flex space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Navigation
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Products
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600">
              Contact
            </a>
          </div>
        </nav>
      </Affix>
      
      <div className="h-screen bg-gray-200 p-4">
        <p>Long page content...</p>
      </div>
    </div>
  )
}
```

### Affix with different sizes

```tsx
function SizedAffixExample() {
  return (
    <div className="min-h-screen space-y-8">
      <div className="h-64 bg-gray-100 p-4">
        Scroll to see different sizes
      </div>
      
      <Affix offsetTop={20} size="sm">
        <div className="bg-red-400 text-white p-2 rounded text-sm">
          Small Affix (sm)
        </div>
      </Affix>
      
      <Affix offsetTop={60} size="md">
        <div className="bg-green-500 text-white p-3 rounded">
          Medium Affix (md) - default
        </div>
      </Affix>
      
      <Affix offsetTop={110} size="lg">
        <div className="bg-blue-600 text-white p-4 rounded text-lg">
          Large Affix (lg)
        </div>
      </Affix>
      
      <div className="h-screen bg-gray-200 p-4">
        Page content
      </div>
    </div>
  )
}
```

## Props API

### AffixProps

| Prop           | Type                                                               | Default     | Description                                         |
| -------------- | ------------------------------------------------------------------ | ----------- | --------------------------------------------------- |
| `size`         | `'sm' \| 'md' \| 'lg'`                                             | `'md'`      | Component size                                      |
| `offsetTop`    | `number`                                                           | `0`         | Distance from the top when affixed at the top       |
| `offsetBottom` | `number`                                                           | `undefined` | Distance from the bottom when affixed at the bottom |
| `target`       | `HTMLElement \| Window \| string \| (() => HTMLElement \| Window)` | `window`    | Element to monitor for scrolling                    |
| `position`     | `'top' \| 'bottom'`                                                | `'top'`     | Affix position                                      |
| `disabled`     | `boolean`                                                          | `false`     | Disables the affixing functionality                 |
| `threshold`    | `number`                                                           | `0`         | Threshold in pixels for activation                  |
| `onAffix`      | `(affixed: boolean) => void`                                       | `undefined` | Callback fired on state change                      |
| `onChange`     | `(affixed: boolean) => void`                                       | `undefined` | Alias for onAffix                                   |
| `onScroll`     | `(scrollTop: number, affixed: boolean) => void`                    | `undefined` | Callback on scroll                                  |
| `className`    | `string`                                                           | `undefined` | Additional CSS classes                              |
| `children`     | `ComponentChild`                                                   | `undefined` | Component content                                   |

### Sizes

- **sm** - Compact size for small elements
- **md** - Standard size (default)
- **lg** - Larger size for prominent elements

### Target Options

- **HTMLElement** - Specific DOM element
- **Window** - Browser window (default)
- **string** - CSS selector
- **function** - Function returning an element

## Accessibility

### ARIA Support

```tsx
<Affix
  aria-label="Sticky navigation"
  aria-describedby="affix-help"
  role="navigation"
>
  <nav>
    <span id="affix-help" className="sr-only">
      This navigation will stick while scrolling
    </span>
    {/* Navigation items */}
  </nav>
</Affix>
```

### Accessibility Best Practices

- Use appropriate ARIA roles for affixed elements
- Provide an alternative way to access affixed content
- Avoid disrupting the natural tab navigation flow
- Test with screen readers
- Consider disabling for users with motion sensitivity

## Best Practices

### Usage

```tsx
// ✅ Good - basic affixing
<Affix offsetTop={20}>
  <button>Sticky button</button>
</Affix>

// ✅ Good - with appropriate ARIA
<Affix 
  position="bottom" 
  offsetBottom={20}
  aria-label="Toolbar"
>
  <div role="toolbar">
    <button>Save</button>
    <button>Cancel</button>
  </div>
</Affix>

// ❌ Bad - too many sticky elements
<>
  <Affix offsetTop={0}><nav>Nav 1</nav></Affix>
  <Affix offsetTop={60}><nav>Nav 2</nav></Affix>
  <Affix offsetTop={120}><nav>Nav 3</nav></Affix>
</>
```

### Performance

- Use `threshold` to avoid unnecessary calculations
- Limit the number of active Affix elements at the same time
- Consider `disabled` when the functionality is not needed
- Use `target` for elements in scrollable containers

### Responsive Design

```tsx
// Adaptive offsets
<Affix 
  offsetTop={20}
  className="lg:static lg:relative" // Disable on large screens
>
  <div className="lg:p-0 p-4">
    Responsive content
  </div>
</Affix>
```

### Z-index Management

```tsx
// Layer control
<Affix 
  offsetTop={20}
  className="z-50" // Ensure proper z-index
>
  <div className="bg-white shadow-lg">
    Sticky content
  </div>
</Affix>
```

## Integration with Other Components

### With BackTop

```tsx
<>
  <Affix offsetTop={20}>
    <nav className="bg-white shadow">
      Main navigation
    </nav>
  </Affix>
  
  <BackTop 
    visibilityHeight={300}
    className="fixed bottom-4 right-4"
  />
</>
```

### With Drawer

```tsx
function DrawerWithAffix() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  
  return (
    <>
      <Affix offsetTop={0}>
        <header className="bg-white border-b px-4 py-3">
          <button 
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden"
          >
            Menu
          </button>
        </header>
      </Affix>
      
      <Drawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        placement="left"
      >
        <nav>Mobile menu items</nav>
      </Drawer>
    </>
  )
}
```

## Advanced Examples

### Affix with animations

```tsx
function AnimatedAffixExample() {
  const [isAffixed, setIsAffixed] = useState(false)
  
  return (
    <Affix
      offsetTop={20}
      onChange={setIsAffixed}
      className={cn(
        "transition-all duration-300 ease-in-out",
        isAffixed ? "transform scale-95 shadow-xl" : "transform scale-100"
      )}
    >
      <div className={cn(
        "bg-white rounded-lg p-4",
        isAffixed ? "border-2 border-blue-500" : "border border-gray-200"
      )}>
        <h3 className="text-lg font-semibold">
          {isAffixed ? "🔒 Affixed" : "📄 Normal"}
        </h3>
        <p>The component's status changes with scrolling</p>
      </div>
    </Affix>
  )
}
```

### Smart Navigation with Affix

```tsx
function SmartNavigation() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  
  return (
    <Affix
      offsetTop={isScrollingUp ? 0 : -80}
      onScroll={(scrollTop) => {
        setIsScrollingUp(scrollTop < lastScrollY)
        setLastScrollY(scrollTop)
      }}
      className={cn(
        "transition-transform duration-300",
        !isScrollingUp && "transform -translate-y-full"
      )}
    >
      <nav className="bg-white border-b shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex space-x-6 py-4">
            {['home', 'about', 'services', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={cn(
                  "px-3 py-2 rounded-md transition-colors",
                  activeSection === section
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-600 hover:text-blue-600"
                )}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </Affix>
  )
}
```

The `Affix` component is a powerful tool for creating sticky interfaces that enhance the usability and accessibility of applications by keeping key elements within the user's reach while scrolling through content.
