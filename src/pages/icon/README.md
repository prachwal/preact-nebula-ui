# Icon Component Documentation

## Overview
The Icon component provides a flexible and comprehensive SVG icon system for consistent visual communication throughout your application. It features 50+ carefully crafted built-in icons while also supporting custom SVG content, making it suitable for any design requirement.

## Features
- **Comprehensive Icon Library**: 50+ built-in icons covering navigation, actions, communication, media, status, and UI elements
- **Custom SVG Support**: Use your own SVG content when built-in icons don't meet your needs
- **Multiple Size Variants**: 6 size options from extra small (xs) to extra large (2xl)
- **Color System**: 8 semantic color variants with automatic dark mode support
- **Animation Support**: Built-in spin animation for loading states and interactive elements
- **Styling Flexibility**: Support for filled/outlined variants, custom stroke width, and viewBox
- **Accessibility**: Full ARIA support and screen reader compatibility
- **Dark Mode**: Complete dark theme support with appropriate color schemes

## Basic Usage

### Simple Icon
```typescript
import { Icon } from '@nebula/components'

function SimpleIcon() {
  return (
    <Icon name="home" />
  )
}
```

### Icon with Size
```typescript
import { Icon } from '@nebula/components'

function SizedIcons() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="star" size="xs" />
      <Icon name="star" size="sm" />
      <Icon name="star" size="md" />
      <Icon name="star" size="lg" />
      <Icon name="star" size="xl" />
      <Icon name="star" size="2xl" />
    </div>
  )
}
```

### Icon with Color
```typescript
import { Icon } from '@nebula/components'

function ColoredIcons() {
  return (
    <div className="flex items-center gap-4">
      <Icon name="check" color="success" />
      <Icon name="warning" color="warning" />
      <Icon name="x" color="error" />
      <Icon name="info" color="primary" />
      <Icon name="settings" color="secondary" />
    </div>
  )
}
```

### Custom SVG Icon
```typescript
import { Icon } from '@nebula/components'

function CustomIcon() {
  return (
    <Icon size="lg" className="text-purple-600">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </Icon>
  )
}
```

## Size Variants
The Icon component supports 6 different size variants:

```typescript
import { Icon } from '@nebula/components'

function AllSizes() {
  return (
    <div className="flex items-center gap-4">
      {/* Extra Small - 12px */}
      <Icon name="home" size="xs" />
      
      {/* Small - 16px */}
      <Icon name="home" size="sm" />
      
      {/* Medium - 20px (default) */}
      <Icon name="home" size="md" />
      
      {/* Large - 24px */}
      <Icon name="home" size="lg" />
      
      {/* Extra Large - 32px */}
      <Icon name="home" size="xl" />
      
      {/* 2X Large - 40px */}
      <Icon name="home" size="2xl" />
    </div>
  )
}
```

## Color Variants
Multiple color options with automatic dark mode support:

```typescript
import { Icon } from '@nebula/components'

function ColorVariants() {
  return (
    <div className="grid grid-cols-4 gap-4">
      {/* Inherits parent color */}
      <Icon name="home" color="inherit" />
      
      {/* Uses current text color */}
      <Icon name="home" color="current" />
      
      {/* Semantic colors */}
      <Icon name="check" color="success" />
      <Icon name="warning" color="warning" />
      <Icon name="x" color="error" />
      
      {/* Theme colors */}
      <Icon name="info" color="primary" />
      <Icon name="user" color="secondary" />
      <Icon name="settings" color="muted" />
    </div>
  )
}
```

## Built-in Icons
The component includes 50+ carefully designed icons organized by category:

### Navigation Icons
```typescript
import { Icon } from '@nebula/components'

function NavigationIcons() {
  return (
    <div className="flex gap-4">
      <Icon name="chevron-up" />
      <Icon name="chevron-down" />
      <Icon name="chevron-left" />
      <Icon name="chevron-right" />
      <Icon name="arrow-up" />
      <Icon name="arrow-down" />
      <Icon name="arrow-left" />
      <Icon name="arrow-right" />
      <Icon name="home" />
      <Icon name="menu" />
    </div>
  )
}
```

### Action Icons
```typescript
import { Icon } from '@nebula/components'

function ActionIcons() {
  return (
    <div className="flex gap-4">
      <Icon name="plus" />
      <Icon name="minus" />
      <Icon name="x" />
      <Icon name="check" />
      <Icon name="edit" />
      <Icon name="trash" />
      <Icon name="copy" />
      <Icon name="share" />
      <Icon name="download" />
      <Icon name="upload" />
    </div>
  )
}
```

### Communication Icons
```typescript
import { Icon } from '@nebula/components'

function CommunicationIcons() {
  return (
    <div className="flex gap-4">
      <Icon name="mail" />
      <Icon name="phone" />
      <Icon name="message" />
      <Icon name="bell" />
      <Icon name="link" />
      <Icon name="external-link" />
    </div>
  )
}
```

### Media Icons
```typescript
import { Icon } from '@nebula/components'

function MediaIcons() {
  return (
    <div className="flex gap-4">
      <Icon name="play" />
      <Icon name="pause" />
      <Icon name="stop" />
      <Icon name="volume" />
      <Icon name="volume-mute" />
      <Icon name="image" />
      <Icon name="video" />
      <Icon name="music" />
    </div>
  )
}
```

### Status Icons
```typescript
import { Icon } from '@nebula/components'

function StatusIcons() {
  return (
    <div className="flex gap-4">
      <Icon name="info" />
      <Icon name="warning" />
      <Icon name="error" />
      <Icon name="success" />
      <Icon name="loading" spin />
    </div>
  )
}
```

## Animated Icons
Add spin animation for loading states:

```typescript
import { Icon } from '@nebula/components'

function AnimatedIcons() {
  return (
    <div className="flex items-center gap-4">
      {/* Loading spinner */}
      <Icon name="loading" spin size="lg" />
      
      {/* Spinning gear */}
      <Icon name="settings" spin size="lg" color="primary" />
      
      {/* Custom spinning icon */}
      <Icon spin size="lg" color="success">
        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
      </Icon>
    </div>
  )
}
```

## Advanced Usage

### Filled vs Outlined Icons
```typescript
import { Icon } from '@nebula/components'

function IconVariants() {
  return (
    <div className="flex gap-4">
      {/* Outlined (default) */}
      <Icon name="heart" size="lg" />
      
      {/* Filled variant */}
      <Icon name="heart" size="lg" filled />
      
      {/* Custom stroke width for outlined */}
      <Icon name="star" size="lg" strokeWidth={1} />
      <Icon name="star" size="lg" strokeWidth={3} />
    </div>
  )
}
```

### Custom ViewBox
```typescript
import { Icon } from '@nebula/components'

function CustomViewBox() {
  return (
    <Icon size="lg" viewBox="0 0 32 32" strokeWidth={1}>
      <path d="M16 3C8.8 3 3 8.8 3 16s5.8 13 13 13 13-5.8 13-13S23.2 3 16 3z"/>
      <path d="M16 8v8l6 3"/>
    </Icon>
  )
}
```

### Interactive Icons
```typescript
import { Icon } from '@nebula/components'
import { useState } from 'preact/hooks'

function InteractiveIcons() {
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  
  return (
    <div className="flex gap-4">
      <button
        onClick={() => setLiked(!liked)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={liked ? 'Unlike' : 'Like'}
      >
        <Icon
          name="heart"
          size="lg"
          color={liked ? 'error' : 'muted'}
          filled={liked}
          className="transition-colors"
        />
      </button>
      
      <button
        onClick={() => setBookmarked(!bookmarked)}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
      >
        <Icon
          name="bookmark"
          size="lg"
          color={bookmarked ? 'primary' : 'muted'}
          filled={bookmarked}
          className="transition-colors"
        />
      </button>
    </div>
  )
}
```

### Theme Toggle
```typescript
import { Icon } from '@nebula/components'
import { useTheme } from '@/hooks/useTheme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <Icon
        name={theme === 'light' ? 'moon' : 'sun'}
        size="sm"
        className="text-gray-600 dark:text-gray-300 transition-colors"
      />
    </button>
  )
}
```

### Icon in Buttons
```typescript
import { Button, Icon } from '@nebula/components'

function ButtonsWithIcons() {
  return (
    <div className="flex gap-4">
      {/* Icon before text */}
      <Button variant="primary">
        <Icon name="plus" size="sm" className="mr-2" />
        Add Item
      </Button>
      
      {/* Icon after text */}
      <Button variant="outline">
        Download
        <Icon name="download" size="sm" className="ml-2" />
      </Button>
      
      {/* Icon only button */}
      <Button variant="ghost" size="sm" aria-label="Settings">
        <Icon name="settings" size="sm" />
      </Button>
      
      {/* Loading state */}
      <Button variant="primary" disabled>
        <Icon name="loading" spin size="sm" className="mr-2" />
        Processing...
      </Button>
    </div>
  )
}
```

### Icon in Cards
```typescript
import { Card, CardHeader, CardContent, Icon } from '@nebula/components'

function IconCards() {
  const features = [
    {
      icon: 'shield',
      title: 'Security',
      description: 'Advanced security features to protect your data',
      color: 'success' as const
    },
    {
      icon: 'zap',
      title: 'Performance',
      description: 'Lightning fast performance and optimization',
      color: 'warning' as const
    },
    {
      icon: 'users',
      title: 'Collaboration',
      description: 'Work together with your team seamlessly',
      color: 'primary' as const
    }
  ]
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <Card key={index} className="text-center">
          <CardHeader>
            <div className="mb-4">
              <div className="inline-flex p-3 bg-gray-100 dark:bg-gray-800 rounded-full">
                <Icon
                  name={feature.icon}
                  size="xl"
                  color={feature.color}
                />
              </div>
            </div>
            <h3 className="text-lg font-semibold">{feature.title}</h3>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-400">
              {feature.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
```

## Props Reference

### Icon Props
| Prop          | Type                                                                                                 | Default       | Description                         |
| ------------- | ---------------------------------------------------------------------------------------------------- | ------------- | ----------------------------------- |
| `name`        | `string`                                                                                             | -             | Name of built-in icon to render     |
| `size`        | `'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                      | `'md'`        | Size variant                        |
| `color`       | `'inherit' \| 'current' \| 'primary' \| 'secondary' \| 'success' \| 'warning' \| 'error' \| 'muted'` | `'current'`   | Color variant                       |
| `spin`        | `boolean`                                                                                            | `false`       | Whether icon should spin            |
| `filled`      | `boolean`                                                                                            | `false`       | Whether to render filled variant    |
| `strokeWidth` | `number`                                                                                             | `2`           | Stroke width for outlined icons     |
| `viewBox`     | `string`                                                                                             | `'0 0 24 24'` | Custom viewBox for the SVG          |
| `children`    | `ComponentChild`                                                                                     | -             | Custom SVG content                  |
| `className`   | `string`                                                                                             | -             | Additional CSS classes              |
| `aria-label`  | `string`                                                                                             | -             | Accessible label for screen readers |
| `role`        | `string`                                                                                             | `'img'`       | ARIA role                           |

## Complete Icon List

### Navigation (10 icons)
- `chevron-up`, `chevron-down`, `chevron-left`, `chevron-right`
- `arrow-up`, `arrow-down`, `arrow-left`, `arrow-right`
- `home`, `menu`

### Actions (16 icons)  
- `plus`, `minus`, `x`, `check`
- `edit`, `trash`, `copy`, `share`
- `download`, `upload`, `save`, `refresh`
- `search`, `filter`, `sort`, `more`

### Communication (6 icons)
- `mail`, `phone`, `message`
- `bell`, `link`, `external-link`

### Media (8 icons)
- `play`, `pause`, `stop`
- `volume`, `volume-mute`
- `image`, `video`, `music`

### Status (5 icons)
- `info`, `warning`, `error`, `success`, `loading`

### UI Elements (8 icons)
- `eye`, `eye-off`, `lock`, `unlock`
- `bookmark`, `star`, `heart`, `flag`

### Time & Calendar (3 icons)
- `calendar`, `clock`, `timer`

### Theme (2 icons)
- `sun`, `moon`

## Accessibility
The Icon component provides comprehensive accessibility features:

- **ARIA Attributes**: Automatic `role="img"` and support for `aria-label`
- **Screen Reader Support**: Icons can be properly announced to screen readers
- **Semantic Colors**: Color variants provide meaningful visual and semantic information
- **Focus Management**: Interactive icons support proper focus handling
- **High Contrast**: All color combinations meet WCAG contrast requirements
- **Keyboard Navigation**: Icons in interactive elements support keyboard interaction

### Accessibility Best Practices
```typescript
// Decorative icon (hidden from screen readers)
<Icon name="star" aria-hidden="true" />

// Meaningful icon with label
<Icon name="warning" aria-label="Warning message" />

// Interactive icon with proper labeling
<button aria-label="Close dialog">
  <Icon name="x" />
</button>

// Icon with additional context
<Icon name="check" color="success" aria-label="Task completed successfully" />
```

## Examples

### Status Indicators
```typescript
import { Icon } from '@nebula/components'

function StatusIndicators() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Icon name="success" color="success" size="sm" />
        <span className="text-green-700 dark:text-green-300">Operation successful</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Icon name="warning" color="warning" size="sm" />
        <span className="text-yellow-700 dark:text-yellow-300">Warning: Check configuration</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Icon name="error" color="error" size="sm" />
        <span className="text-red-700 dark:text-red-300">Error: Unable to connect</span>
      </div>
      
      <div className="flex items-center gap-2">
        <Icon name="loading" spin color="primary" size="sm" />
        <span className="text-blue-700 dark:text-blue-300">Processing...</span>
      </div>
    </div>
  )
}
```

### Navigation Menu
```typescript
import { Icon } from '@nebula/components'

function NavigationMenu() {
  const menuItems = [
    { icon: 'home', label: 'Dashboard', href: '/' },
    { icon: 'users', label: 'Users', href: '/users' },
    { icon: 'settings', label: 'Settings', href: '/settings' },
    { icon: 'bell', label: 'Notifications', href: '/notifications' },
    { icon: 'help', label: 'Help', href: '/help' }
  ]
  
  return (
    <nav className="space-y-1">
      {menuItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Icon name={item.icon} size="sm" color="secondary" />
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
```
