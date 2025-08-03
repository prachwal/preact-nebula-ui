import { createContext } from 'preact'
import { useContext, useState } from 'preact/hooks'
import { forwardRef } from 'preact/compat'
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

// Context for sharing tabs state
interface TabsContextValue {
  selectedValue: string
  onTabChange: (value: string) => void
  orientation: TabsOrientation
  variant: TabsVariant
  size: TabsSize
  colorScheme: TabsColorScheme
}

const TabsContext = createContext<TabsContextValue | null>(null)

const useTabsContext = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component')
  }
  return context
}

// Size styles
const tabSizes: Record<TabsSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg'
}

// Variant styles
const getTabVariantStyles = (
  variant: TabsVariant, 
  colorScheme: TabsColorScheme, 
  isSelected: boolean, 
  isDisabled: boolean
) => {
  const colorSchemes = {
    primary: {
      selected: 'text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400',
      unselected: 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
    },
    secondary: {
      selected: 'text-gray-900 dark:text-white border-gray-900 dark:border-white',
      unselected: 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    },
    success: {
      selected: 'text-green-600 dark:text-green-400 border-green-600 dark:border-green-400',
      unselected: 'text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400'
    },
    warning: {
      selected: 'text-yellow-600 dark:text-yellow-400 border-yellow-600 dark:border-yellow-400',
      unselected: 'text-gray-600 dark:text-gray-400 hover:text-yellow-600 dark:hover:text-yellow-400'
    },
    error: {
      selected: 'text-red-600 dark:text-red-400 border-red-600 dark:border-red-400',
      unselected: 'text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400'
    }
  }

  const colors = colorSchemes[colorScheme]
  
  if (isDisabled) {
    return 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
  }

  const baseStyle = 'font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  switch (variant) {
    case 'line':
      return cn(
        baseStyle,
        'border-b-2 border-transparent',
        isSelected ? colors.selected : colors.unselected
      )
    case 'enclosed':
      return cn(
        baseStyle,
        'border border-transparent rounded-t-lg',
        isSelected 
          ? cn(colors.selected, 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 border-b-transparent')
          : colors.unselected
      )
    case 'soft-rounded':
      return cn(
        baseStyle,
        'rounded-lg',
        isSelected 
          ? cn(colors.selected, 'bg-blue-50 dark:bg-blue-900/20')
          : colors.unselected
      )
    default:
      return cn(baseStyle, colors.unselected)
  }
}

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ 
    defaultValue,
    value,
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
    const isControlled = value !== undefined
    const selectedValue = isControlled ? value : internalValue

    const handleTabChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue)
      }
      onChange?.(newValue)
    }

    const contextValue: TabsContextValue = {
      selectedValue,
      onTabChange: handleTabChange,
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
            orientation === 'vertical' ? 'flex' : 'block',
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

export const TabList = forwardRef<HTMLDivElement, TabListProps>(
  ({ children, className, 'data-testid': testId, ...props }, ref) => {
    const { orientation, variant } = useTabsContext()

    return (
      <div
        ref={ref}
        role="tablist"
        aria-orientation={orientation}
        className={cn(
          'flex',
          orientation === 'horizontal' ? 'flex-row' : 'flex-col',
          variant === 'line' && orientation === 'horizontal' ? 'border-b border-gray-200 dark:border-gray-700' : '',
          variant === 'enclosed' ? 'mb-0' : 'mb-4',
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

export const Tab = forwardRef<HTMLButtonElement, TabProps>(
  ({ 
    value, 
    disabled = false, 
    children, 
    className, 
    'data-testid': testId, 
    ...props 
  }, ref) => {
    const { selectedValue, onTabChange, size, variant, colorScheme } = useTabsContext()
    const isSelected = selectedValue === value

    const handleClick = () => {
      if (!disabled) {
        onTabChange(value)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick()
      }
    }

    return (
      <button
        ref={ref}
        role="tab"
        aria-selected={isSelected}
        aria-disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          tabSizes[size],
          getTabVariantStyles(variant, colorScheme, isSelected, disabled),
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

export const TabPanels = forwardRef<HTMLDivElement, TabPanelsProps>(
  ({ children, className, 'data-testid': testId, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('flex-1', className)}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    )
  }
)

export const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>(
  ({ 
    value, 
    children, 
    className, 
    'data-testid': testId, 
    ...props 
  }, ref) => {
    const { selectedValue } = useTabsContext()
    const isSelected = selectedValue === value

    if (!isSelected) {
      return null
    }

    return (
      <div
        ref={ref}
        role="tabpanel"
        aria-hidden={!isSelected}
        className={cn(className)}
        data-testid={testId}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Tabs.displayName = 'Tabs'
TabList.displayName = 'TabList'
Tab.displayName = 'Tab'
TabPanels.displayName = 'TabPanels'
TabPanel.displayName = 'TabPanel'
