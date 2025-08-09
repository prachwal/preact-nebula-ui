# Portal Component Documentation

## Overview
The **Portal** component provides a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. This is essential for modals, tooltips, dropdowns, and other components that need to escape their container's styling constraints or z-index stacking context.

## Features
- **DOM Node Escape**: Render content outside parent hierarchy
- **Custom Container**: Specify target container element
- **SSR Safe**: Handles server-side rendering gracefully
- **React Portal API**: Uses Preact's createPortal for compatibility
- **Automatic Cleanup**: Properly manages portal lifecycle
- **Flexible Content**: Supports any React children
- **Type Safe**: Full TypeScript support with proper typing

## Basic Usage

### Simple Portal
```tsx
import { Portal } from '@nebula-ui/components'

function App() {
  return (
    <div className="relative overflow-hidden">
      <h1>Main Content</h1>
      
      <Portal>
        <div className="fixed top-0 left-0 bg-black bg-opacity-50 z-50">
          This content is rendered outside the parent div!
        </div>
      </Portal>
    </div>
  )
}
```

### Modal Implementation
```tsx
import { Portal } from '@nebula-ui/components'
import { useState } from 'preact/hooks'

function ModalExample() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      {isOpen && (
        <Portal>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Modal Title</h2>
              <p className="mb-4">This modal is rendered via Portal!</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
```

## Advanced Examples

### Custom Container
```tsx
import { Portal } from '@nebula-ui/components'
import { useEffect, useRef } from 'preact/hooks'

function CustomContainerPortal() {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="relative">
      <h1>Main Content</h1>
      
      <div ref={containerRef} className="border p-4 min-h-[200px]">
        <h2>Custom Container</h2>
        
        <Portal container={containerRef.current}>
          <div className="absolute top-0 right-0 bg-yellow-200 p-2 rounded">
            Rendered in custom container!
          </div>
        </Portal>
      </div>
    </div>
  )
}
```

### Tooltip with Portal
```tsx
import { Portal } from '@nebula-ui/components'
import { useState, useRef } from 'preact/hooks'

function TooltipPortal() {
  const [showTooltip, setShowTooltip] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const triggerRef = useRef<HTMLButtonElement>(null)

  const handleMouseEnter = (event: MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect()
    setPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    })
    setShowTooltip(true)
  }

  return (
    <div className="p-20">
      <button
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setShowTooltip(false)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Hover me for tooltip
      </button>

      {showTooltip && (
        <Portal>
          <div
            className="fixed bg-black text-white px-2 py-1 rounded text-sm pointer-events-none z-50 transform -translate-x-1/2 -translate-y-full"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`
            }}
          >
            This is a tooltip via Portal!
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-black"></div>
          </div>
        </Portal>
      )}
    </div>
  )
}
```

### Dropdown Menu Portal
```tsx
import { Portal } from '@nebula-ui/components'
import { useState, useRef, useEffect } from 'preact/hooks'

function DropdownPortal() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setPosition({
        x: rect.left,
        y: rect.bottom + 5
      })
    }
  }, [isOpen])

  return (
    <div className="p-4">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        Toggle Dropdown
      </button>

      {isOpen && (
        <Portal>
          <div
            className="fixed bg-white border shadow-lg rounded min-w-[200px] z-50"
            style={{
              left: `${position.x}px`,
              top: `${position.y}px`
            }}
          >
            <div className="py-1">
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Option 1
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Option 2
              </button>
              <button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                Option 3
              </button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
```

### Multi-Level Portal
```tsx
import { Portal } from '@nebula-ui/components'
import { useState } from 'preact/hooks'

function MultiLevelPortal() {
  const [showModal, setShowModal] = useState(false)
  const [showNestedModal, setShowNestedModal] = useState(false)

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
        Open First Modal
      </button>

      {showModal && (
        <Portal>
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">First Modal</h2>
              <p className="mb-4">This is the first modal level.</p>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => setShowNestedModal(true)}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Open Nested Modal
                </button>
                <button 
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          {showNestedModal && (
            <Portal>
              <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
                  <h3 className="text-lg font-bold mb-4">Nested Modal</h3>
                  <p className="mb-4">This modal is nested via another Portal!</p>
                  <button 
                    onClick={() => setShowNestedModal(false)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Close Nested
                  </button>
                </div>
              </div>
            </Portal>
          )}
        </Portal>
      )}
    </div>
  )
}
```

### Portal with Event Handling
```tsx
import { Portal } from '@nebula-ui/components'
import { useState, useEffect } from 'preact/hooks'

function PortalWithEvents() {
  const [isOpen, setIsOpen] = useState(false)

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // Prevent body scroll
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close on backdrop click
  const handleBackdropClick = (event: MouseEvent) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <div>
      <button onClick={() => setIsOpen(true)}>
        Open Portal with Events
      </button>

      {isOpen && (
        <Portal>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleBackdropClick}
          >
            <div className="bg-white rounded-lg p-6 max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">Portal with Events</h2>
              <p className="mb-4">Press Escape or click backdrop to close.</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Close
              </button>
            </div>
          </div>
        </Portal>
      )}
    </div>
  )
}
```

## Props API

| Prop        | Type                | Default         | Description                          |
| ----------- | ------------------- | --------------- | ------------------------------------ |
| `children`  | `ComponentChildren` | Required        | The content to render in the portal  |
| `container` | `Element`           | `document.body` | The container element to render into |

## Use Cases

### Modal Dialogs
Perfect for modal dialogs that need to overlay the entire page:
```tsx
<Portal>
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
    {/* Modal content */}
  </div>
</Portal>
```

### Tooltips and Popovers
Useful for tooltips that shouldn't be clipped by parent containers:
```tsx
<Portal>
  <div className="absolute bg-black text-white p-2 rounded">
    Tooltip content
  </div>
</Portal>
```

### Dropdown Menus
Essential for dropdowns that need to appear above other elements:
```tsx
<Portal>
  <div className="absolute bg-white shadow-lg border rounded">
    {/* Dropdown items */}
  </div>
</Portal>
```

### Notifications/Toasts
Great for notification systems that need global positioning:
```tsx
<Portal>
  <div className="fixed top-4 right-4 z-50">
    {/* Toast notifications */}
  </div>
</Portal>
```

## Technical Details

### Portal Creation
- Uses Preact's `createPortal` function
- Renders children into specified DOM node
- Maintains component tree context (React context, etc.)

### SSR Compatibility
The component handles server-side rendering by:
- Returning `null` when `mountNode` is not available
- Setting mount node in `useEffect` (client-side only)
- Avoiding hydration mismatches

### Lifecycle Management
- Automatically cleans up when component unmounts
- Updates container when `container` prop changes
- Safe handling of dynamic containers

## Styling and Positioning

### Fixed Positioning
```tsx
<Portal>
  <div className="fixed inset-0 z-50">
    {/* Full screen overlay */}
  </div>
</Portal>
```

### Absolute Positioning
```tsx
<Portal>
  <div 
    className="absolute z-50"
    style={{ left: position.x, top: position.y }}
  >
    {/* Positioned content */}
  </div>
</Portal>
```

### Z-Index Management
Use appropriate z-index values:
- Modals: `z-50` (50)
- Tooltips: `z-40` (40) 
- Dropdowns: `z-30` (30)
- Notifications: `z-50` (50)

## Accessibility Considerations

### Focus Management
```tsx
import { useEffect, useRef } from 'preact/hooks'

function AccessiblePortal({ isOpen, onClose }) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      // Focus first focusable element
      const focusableElement = modalRef.current.querySelector('[tabindex], button, input, select, textarea')
      focusableElement?.focus()
    }
  }, [isOpen])

  return isOpen ? (
    <Portal>
      <div 
        ref={modalRef}
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        role="dialog"
        aria-modal="true"
      >
        {/* Accessible modal content */}
      </div>
    </Portal>
  ) : null
}
```

### ARIA Attributes
- Use `role="dialog"` for modals
- Add `aria-modal="true"` for modal dialogs
- Include proper `aria-label` or `aria-labelledby`
- Ensure keyboard navigation works

### Screen Reader Support
- Announce modal opening/closing
- Provide clear navigation instructions
- Maintain logical tab order

## Testing

### Basic Testing
```tsx
import { render, screen } from '@testing-library/preact'
import { Portal } from '@nebula-ui/components'

test('renders children in portal', () => {
  render(
    <div>
      <div data-testid="main">Main content</div>
      <Portal>
        <div data-testid="portal-content">Portal content</div>
      </Portal>
    </div>
  )

  expect(screen.getByTestId('main')).toBeInTheDocument()
  expect(screen.getByTestId('portal-content')).toBeInTheDocument()
})
```

### Custom Container Testing
```tsx
test('renders in custom container', () => {
  const customContainer = document.createElement('div')
  document.body.appendChild(customContainer)

  render(
    <Portal container={customContainer}>
      <div data-testid="custom-portal">Custom portal content</div>
    </Portal>
  )

  expect(customContainer).toContainElement(
    screen.getByTestId('custom-portal')
  )
})
```

### Event Testing
```tsx
import { fireEvent } from '@testing-library/preact'

test('closes portal on escape key', () => {
  const onClose = jest.fn()
  
  render(<PortalWithEvents isOpen={true} onClose={onClose} />)
  
  fireEvent.keyDown(document, { key: 'Escape' })
  expect(onClose).toHaveBeenCalled()
})
```

## Best Practices

### Performance
```tsx
// ✅ Good: Conditional rendering
{showModal && (
  <Portal>
    <ModalContent />
  </Portal>
)}

// ❌ Avoid: Always rendering portal
<Portal>
  {showModal ? <ModalContent /> : null}
</Portal>
```

### Memory Management
```tsx
// ✅ Good: Clean up event listeners
useEffect(() => {
  const handleKeyDown = (event) => {
    // Handle key
  }
  
  if (isOpen) {
    document.addEventListener('keydown', handleKeyDown)
  }
  
  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
}, [isOpen])
```

### Container Selection
```tsx
// ✅ Good: Use document.body for full-page overlays
<Portal>
  <div className="fixed inset-0">Modal overlay</div>
</Portal>

// ✅ Good: Use custom container for localized portals
<Portal container={localContainerRef.current}>
  <div className="absolute">Localized content</div>
</Portal>
```

### Error Handling
```tsx
// ✅ Good: Handle missing containers gracefully
const [container, setContainer] = useState<Element | null>(null)

useEffect(() => {
  const element = document.getElementById('portal-root')
  if (element) {
    setContainer(element)
  } else {
    console.warn('Portal container not found, using document.body')
    setContainer(document.body)
  }
}, [])

return container ? (
  <Portal container={container}>
    {children}
  </Portal>
) : null
```

## Common Patterns

### Modal Pattern
```tsx
function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  
  const Modal = ({ children }) => (
    isOpen ? (
      <Portal>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="flex items-center justify-center min-h-full p-4">
            <div className="bg-white rounded-lg max-w-md w-full">
              {children}
            </div>
          </div>
        </div>
      </Portal>
    ) : null
  )
  
  return { isOpen, setIsOpen, Modal }
}
```

### Toast Pattern
```tsx
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])
  
  return (
    <>
      {children}
      <Portal>
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {toasts.map(toast => (
            <div key={toast.id} className="bg-white shadow-lg rounded p-4">
              {toast.message}
            </div>
          ))}
        </div>
      </Portal>
    </>
  )
}
```

### Dropdown Pattern
```tsx
function useDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  
  const Dropdown = ({ children }) => (
    isOpen ? (
      <Portal>
        <div 
          className="absolute bg-white shadow-lg border rounded z-30"
          style={{ left: position.x, top: position.y }}
        >
          {children}
        </div>
      </Portal>
    ) : null
  )
  
  return { isOpen, setIsOpen, position, setPosition, Dropdown }
}
```
