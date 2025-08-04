# 🛠️ Milestone 2: Technical Overview - Layout System

## 🏗️ Layout Architecture Design

### Flexbox-First Approach

**Design Philosophy**
- Flexbox provides powerful one-dimensional layout capabilities
- CSS Grid reserved for future complex two-dimensional layouts
- Mobile-first responsive design with progressive enhancement
- Container queries consideration for future component-level responsiveness

**Stack Component Algorithm**
```typescript
// Core flexbox algorithm implementation
const getFlexDirection = (direction: Direction, reverse: boolean) => {
  const directions = {
    horizontal: reverse ? 'row-reverse' : 'row',
    vertical: reverse ? 'column-reverse' : 'column'
  }
  return directions[direction]
}

const getAlignItems = (align: Align) => ({
  start: 'flex-start',
  center: 'center', 
  end: 'flex-end',
  stretch: 'stretch'
})[align]

const getJustifyContent = (justify: Justify) => ({
  start: 'flex-start',
  center: 'center',
  end: 'flex-end', 
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly'
})[justify]
```

### Responsive Container System

**Breakpoint Strategy**
```typescript
// Responsive container max-width system
const containerSizes = {
  sm: 'max-w-screen-sm',    // 640px
  md: 'max-w-screen-md',    // 768px
  lg: 'max-w-screen-lg',    // 1024px
  xl: 'max-w-screen-xl',    // 1280px
  full: 'w-full'            // 100%
}

// Responsive padding system
const paddingSizes = {
  none: 'p-0',
  sm: 'p-4',     // 16px
  md: 'p-6',     // 24px  
  lg: 'p-8'      // 32px
}
```

**Mobile-First Implementation**
```css
/* Container responsive behavior */
.container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container { max-width: 640px; }
}

@media (min-width: 768px) {
  .container { max-width: 768px; }
}

@media (min-width: 1024px) {
  .container { max-width: 1024px; }
}

@media (min-width: 1280px) {
  .container { max-width: 1280px; }
}
```

## 🎨 Styling Architecture

### Design Token System

**Spacing Scale**
```typescript
// Consistent spacing across all layout components
const spacing = {
  none: '0',
  xs: '0.25rem',   // 4px
  sm: '0.5rem',    // 8px
  md: '1rem',      // 16px
  lg: '1.5rem',    // 24px
  xl: '2rem',      // 32px
  '2xl': '2.5rem', // 40px
  '3xl': '3rem'    // 48px
}
```

**Elevation System (Card Component)**
```css
/* Shadow elevation levels */
.elevation-1 { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12); }
.elevation-2 { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.12); }
.elevation-3 { box-shadow: 0 10px 20px rgba(0, 0, 0, 0.12); }

/* Dark mode elevation adjustments */
.dark .elevation-1 { box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3); }
.dark .elevation-2 { box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); }
.dark .elevation-3 { box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3); }
```

**Color System Integration**
```typescript
// Consistent color usage across layout components
const colors = {
  surface: {
    primary: 'bg-white dark:bg-gray-800',
    secondary: 'bg-gray-50 dark:bg-gray-700',
    accent: 'bg-blue-50 dark:bg-blue-900'
  },
  border: {
    default: 'border-gray-200 dark:border-gray-600',
    muted: 'border-gray-100 dark:border-gray-700',
    accent: 'border-blue-200 dark:border-blue-600'
  }
}
```

## 🔧 Component Composition Architecture

### Card Sub-Component Pattern

**Compound Component Design**
```typescript
// Main Card component with sub-components attached
export const Card = Object.assign(CardComponent, {
  Header: CardHeader,
  Body: CardBody,
  Footer: CardFooter
})

// Usage pattern enables flexible composition
<Card variant="elevated">
  <Card.Header>
    <h2>Dashboard</h2>
  </Card.Header>
  <Card.Body>
    <p>Content goes here</p>
  </Card.Body>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card>
```

**Context-Based Communication**
```typescript
// Card context for sharing state between sub-components
const CardContext = createContext<{
  variant?: CardVariant
  padding?: PaddingSize
  clickable?: boolean
}>({})

// Sub-components access context for styling consistency
const CardHeader = ({ children, className, ...props }: CardHeaderProps) => {
  const context = useContext(CardContext)
  const classes = cn(
    'card-header',
    context.padding && paddingClasses[context.padding],
    className
  )
  return <header className={classes} {...props}>{children}</header>
}
```

### Stack Layout Algorithm

**Gap-Based Spacing**
```typescript
// Modern CSS gap property for consistent spacing
const getStackClasses = (props: StackProps) => {
  const { direction, spacing, align, justify, wrap } = props
  
  return cn(
    'flex',
    direction === 'vertical' ? 'flex-col' : 'flex-row',
    spacing && gapClasses[spacing],
    align && alignClasses[align],
    justify && justifyClasses[justify],
    wrap && 'flex-wrap'
  )
}

// CSS gap classes for reliable spacing
const gapClasses = {
  none: 'gap-0',
  xs: 'gap-1',     // 4px
  sm: 'gap-2',     // 8px
  md: 'gap-4',     // 16px
  lg: 'gap-6',     // 24px
  xl: 'gap-8'      // 32px
}
```

## 📱 Responsive Design Implementation

### Breakpoint-Aware Components

**Container Responsive Behavior**
```typescript
// Container component adapts to screen size
const Container = ({ size = 'lg', ...props }: ContainerProps) => {
  const classes = cn(
    'w-full mx-auto px-4',
    {
      'max-w-screen-sm': size === 'sm',
      'max-w-screen-md': size === 'md', 
      'max-w-screen-lg': size === 'lg',
      'max-w-screen-xl': size === 'xl',
      'max-w-none': size === 'full'
    }
  )
  
  return <div className={classes} {...props} />
}
```

**Responsive Stack Behavior**
```typescript
// Stack can change direction based on screen size
<Stack 
  direction="vertical"
  className="md:flex-row"  // Horizontal on medium screens+
  spacing="md"
>
  <div>Sidebar</div>
  <div>Main content</div>
</Stack>
```

### Performance Optimizations

**CSS-Based Layout Performance**
- Use CSS transforms instead of changing layout properties
- Leverage CSS Grid and Flexbox for GPU acceleration
- Minimize reflows through efficient class application
- Use `contain` property for layout isolation

**Component Re-render Optimization**
```typescript
// Memoize expensive calculations
const stackClasses = useMemo(() => {
  return cn(
    'flex',
    directionClasses[direction],
    spacingClasses[spacing],
    alignClasses[align],
    justifyClasses[justify]
  )
}, [direction, spacing, align, justify])

// Prevent unnecessary re-renders
const MemoizedCard = memo(Card, (prevProps, nextProps) => {
  return (
    prevProps.variant === nextProps.variant &&
    prevProps.padding === nextProps.padding &&
    prevProps.hoverable === nextProps.hoverable
  )
})
```

## ♿ Accessibility Architecture

### Semantic HTML Structure

**Card Accessibility**
```typescript
// Cards use proper semantic elements
const Card = ({ clickable, children, ...props }: CardProps) => {
  const Element = clickable ? 'button' : 'article'
  
  return (
    <Element
      role={clickable ? 'button' : 'article'}
      tabIndex={clickable ? 0 : undefined}
      aria-pressed={clickable ? undefined : undefined}
      className={cardClasses}
      {...props}
    >
      {children}
    </Element>
  )
}
```

**Focus Management**
```css
/* Consistent focus indicators across layout components */
.card:focus-visible {
  outline: 2px solid theme('colors.blue.500');
  outline-offset: 2px;
}

.card:focus-visible:not(:focus) {
  outline: none;
}
```

**Screen Reader Support**
```typescript
// Divider with text maintains proper heading hierarchy
const Divider = ({ children, orientation, ...props }: DividerProps) => {
  if (children) {
    return (
      <div role="separator" aria-orientation={orientation} {...props}>
        <span className="divider-text">{children}</span>
      </div>
    )
  }
  
  return (
    <hr 
      role="separator" 
      aria-orientation={orientation}
      className={dividerClasses}
      {...props}
    />
  )
}
```

## 🧪 Testing Architecture

### Layout Testing Strategies

**Responsive Behavior Testing**
```typescript
describe('Container responsive behavior', () => {
  it('applies correct max-width for each size', () => {
    const { rerender } = render(<Container size="sm">Content</Container>)
    expect(screen.getByText('Content')).toHaveClass('max-w-screen-sm')
    
    rerender(<Container size="lg">Content</Container>)
    expect(screen.getByText('Content')).toHaveClass('max-w-screen-lg')
  })
})
```

**Layout Algorithm Testing**
```typescript
describe('Stack layout algorithm', () => {
  it('applies correct flexbox properties', () => {
    render(
      <Stack direction="horizontal" spacing="md" align="center">
        <div>Item 1</div>
        <div>Item 2</div>
      </Stack>
    )
    
    const stack = screen.getByRole('generic')
    expect(stack).toHaveClass('flex', 'flex-row', 'gap-4', 'items-center')
  })
})
```

**Composition Testing**
```typescript
describe('Card composition', () => {
  it('renders with header, body, and footer', () => {
    render(
      <Card>
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>
    )
    
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Body')).toBeInTheDocument()
    expect(screen.getByText('Footer')).toBeInTheDocument()
  })
})
```

## 🚀 Future Extensibility

### Component Extension Points

**Custom Layout Components**
```typescript
// Layout components can be extended for specific use cases
interface DashboardCardProps extends CardProps {
  metric?: string
  trend?: 'up' | 'down' | 'stable'
}

const DashboardCard = ({ metric, trend, children, ...props }: DashboardCardProps) => {
  return (
    <Card {...props}>
      <Card.Header>
        <Stack direction="horizontal" justify="between" align="center">
          {children}
          <TrendIndicator trend={trend} />
        </Stack>
      </Card.Header>
      <Card.Body>
        <div className="text-3xl font-bold">{metric}</div>
      </Card.Body>
    </Card>
  )
}
```

**CSS Grid Integration**
```typescript
// Future Grid component building on layout patterns
interface GridProps extends ComponentProps<'div'> {
  columns?: number | string
  rows?: number | string
  gap?: SpacingSize
  areas?: string[]
}

const Grid = ({ columns, rows, gap, areas, children, ...props }: GridProps) => {
  const gridStyle = {
    gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
    gridTemplateRows: typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows,
    gridTemplateAreas: areas?.map(area => `"${area}"`).join(' ')
  }
  
  return (
    <div 
      className={cn('grid', gap && gapClasses[gap])}
      style={gridStyle}
      {...props}
    >
      {children}
    </div>
  )
}
```

The layout system established in Milestone 2 provides a solid foundation for complex, responsive, and accessible user interfaces while maintaining excellent performance and developer experience.
