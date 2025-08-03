import { createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
import { Children, isValidElement } from 'preact/compat'
import { cn } from '../../utils/cn'
import type { 
  TabsProps, 
  TabListProps, 
  TabProps, 
  TabPanelsProps, 
  TabPanelProps,
  TabsOrientation,
  TabsVariant,
  TabsSize,
  TabsColorScheme
} from './Tabs.types'

// Context for Tabs communication
interface TabsContextType {
  selectedValue: string
  setSelectedValue: (value: string) => void
  orientation: TabsOrientation
  variant: TabsVariant
  size: TabsSize
  colorScheme: TabsColorScheme
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs compound components must be used within Tabs')
  }
  return context
}

// Style variants
const tabVariants: Record<TabsVariant, { base: string; active: string; inactive: string }> = {
  line: {
    base: 'border-b-2 pb-2',
    active: 'border-blue-500 text-blue-600 dark:text-blue-400',
    inactive: 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
  },
  enclosed: {
    base: 'border border-b-0 rounded-t-md',
    active: 'border-gray-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-white',
    inactive: 'border-transparent bg-gray-50 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
  },
  'soft-rounded': {
    base: 'rounded-md',
    active: 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300',
    inactive: 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
  }
}

const tabSizes: Record<TabsSize, string> = {
  sm: 'px-3 py-1 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

// Main Tabs component
export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    defaultValue,
    value: controlledValue,
    orientation = 'horizontal',
    variant = 'line',
    size = 'md',
    colorScheme = 'primary',
    onChange,
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '')
    const selectedValue = controlledValue !== undefined ? controlledValue : internalValue
    
    const setSelectedValue = (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const contextValue: TabsContextType = {
      selectedValue,
      setSelectedValue,
      orientation,
      variant,
      size,
      colorScheme
    }

    return (
      <TabsContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            'tabs',
            orientation === 'vertical' && 'flex gap-4',
            className
          )}
          data-testid={testId}
          {...props}
        >
          {children}
        </div>
      </TabsContext.Provider>
    )
  }
)

// TabList component
export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className, ...props }, ref) => {
    const { orientation, variant } = useTabsContext()

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          'tab-list flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          variant === 'line' && orientation === 'horizontal' && 'border-b border-gray-200 dark:border-gray-700',
          variant === 'line' && orientation === 'vertical' && 'border-r border-gray-200 dark:border-gray-700',
          variant === 'enclosed' && 'bg-gray-50 dark:bg-gray-800 p-1 rounded-lg',
          variant === 'soft-rounded' && 'bg-gray-100 dark:bg-gray-800 p-1 rounded-lg gap-1',
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Tab component
export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ value, disabled = false, children, className, 'data-testid': testId, ...props }, ref) => {
    const { selectedValue, setSelectedValue, variant, size } = useTabsContext()
    const isSelected = selectedValue === value

    const handleClick = () => {
      if (!disabled) {
        setSelectedValue(value)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick()
      }
    }

    const variantStyles = tabVariants[variant]

    return (
      <button
        ref={ref}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        aria-selected={isSelected}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          'tab transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          variantStyles.base,
          tabSizes[size],
          isSelected ? variantStyles.active : variantStyles.inactive,
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        data-testid={testId}
        {...props}
      >
        {children}
      </button>
    )
  }
)

// TabPanels component
export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ children, className, ...props }, ref) => {
    const { orientation } = useTabsContext()

    return (
      <div
        ref={ref}
        className={cn(
          'tab-panels',
          orientation === 'vertical' && 'flex-1',
          className
        )}
        {...props}
      >
        {Children.toArray(children).map((child) => {
          if (isValidElement(child)) {
            return child
          }
          return child
        })}
      </div>
    )
  }
)

// TabPanel component
export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ value, children, className, 'data-testid': testId, ...props }, ref) => {
    const { selectedValue } = useTabsContext()
    const isSelected = selectedValue === value

    if (!isSelected) {
      return null
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        tabIndex={0}
        className={cn(
          'tab-panel focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
          'min-h-0 w-full', // Prevent content jumping
          className
        )}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    )
  }
)

// Set display names
Tabs.displayName = 'Tabs'
TabList.displayName = 'TabList'
Tab.displayName = 'Tab'
TabPanels.displayName = 'TabPanels'
TabPanel.displayName = 'TabPanel'
