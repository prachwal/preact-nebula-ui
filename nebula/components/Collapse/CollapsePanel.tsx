import { forwardRef } from 'preact/compat'
import { cn } from '../../utils/cn'
import { CollapsePanelProps } from './types'

const ChevronRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="transition-transform duration-200"
  >
    <path
      d="M6 12L10 8L6 4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const CollapsePanel = forwardRef<HTMLDivElement, CollapsePanelProps>(
  ({
    header,
    children,
    disabled = false,
    showArrow = true,
    extra,
    className,
    isActive = false,
    isAnimating = false,
    onToggle,
    expandIcon,
    ...props
  }, ref) => {
    const handleHeaderClick = () => {
      if (!disabled && onToggle) {
        onToggle()
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!disabled && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        if (onToggle) {
          onToggle()
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'border border-gray-200 dark:border-gray-700',
          'first:rounded-t-lg last:rounded-b-lg',
          '[&:not(:first-child)]:border-t-0',
          className
        )}
        {...props}
      >
        {/* Header */}
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          aria-expanded={isActive}
          aria-disabled={disabled}
          className={cn(
            'flex items-center justify-between px-4 py-3',
            'bg-gray-50 dark:bg-gray-800',
            'transition-colors duration-200',
            !disabled && [
              'cursor-pointer',
              'hover:bg-gray-100 dark:hover:bg-gray-700',
              'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'dark:focus:ring-offset-gray-800'
            ],
            disabled && [
              'cursor-not-allowed',
              'opacity-60',
              'bg-gray-100 dark:bg-gray-700'
            ]
          )}
          onClick={disabled ? undefined : handleHeaderClick}
          onKeyDown={disabled ? undefined : handleKeyDown}
        >
          <div className="flex items-center space-x-3">
            {showArrow && (
              <div
                className={cn(
                  'flex-shrink-0 transition-transform duration-200',
                  isActive ? 'rotate-90' : 'rotate-0',
                  disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'
                )}
              >
                {/* Custom expand icon support */}
                {typeof expandIcon === 'function'
                  ? expandIcon({ isActive })
                  : <ChevronRightIcon />}
              </div>
            )}
            <div className={cn(
              'font-medium text-gray-900 dark:text-white',
              disabled && 'text-gray-500 dark:text-gray-400'
            )}>
              {header}
            </div>
          </div>
          {extra && (
            <div className="flex-shrink-0">
              {extra}
            </div>
          )}
        </div>

        {/* Content: only render when active */}
        {isActive && (
          <div
            className={cn(
              'overflow-hidden transition-all duration-300 ease-in-out',
              isAnimating && 'transition-all duration-300'
            )}
          >
            <div className="px-4 py-3 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              {children}
            </div>
          </div>
        )}
      </div>
    )
  }
)

CollapsePanel.displayName = 'CollapsePanel'
