import { cn } from '../../utils/cn'
import type { BreadcrumbProps, BreadcrumbSeparatorType } from './Breadcrumb.types'

const separatorMap: Record<BreadcrumbSeparatorType, string> = {
  arrow: '→',
  slash: '/',
  chevron: '›'
}

const HomeIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    />
  </svg>
)

export function Breadcrumb({
  items,
  separator = 'arrow',
  maxItems = 0,
  showHome = false,
  homeHref = '/',
  className
}: BreadcrumbProps) {
  // Handle responsive collapse
  const shouldCollapse = maxItems > 0 && items.length > maxItems
  const displayItems = shouldCollapse 
    ? maxItems === 2 
      ? [items[0], { label: '...', current: false }] // Special case for maxItems=2
      : [
          items[0], // First item
          { label: '...', current: false }, // Ellipsis
          ...items.slice(-(maxItems - 2)) // Last items
        ]
    : items

  // Render separator
  const renderSeparator = () => {
    if (typeof separator === 'string' && separator in separatorMap) {
      return (
        <span className="text-gray-400 dark:text-gray-500 select-none" aria-hidden="true">
          {separatorMap[separator as BreadcrumbSeparatorType]}
        </span>
      )
    }
    return <span className="text-gray-400 dark:text-gray-500" aria-hidden="true">{separator}</span>
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn(
        'flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300',
        'lg:space-x-3 lg:text-base',
        className
      )}
    >
      <ol className="flex items-center space-x-2 lg:space-x-3">
        {/* Home icon */}
        {showHome && (
          <li>
            <a
              href={homeHref}
              className={cn(
                'inline-flex items-center text-gray-500 hover:text-gray-700',
                'dark:text-gray-400 dark:hover:text-gray-200',
                'transition-colors duration-200'
              )}
              aria-label="Home"
            >
              <HomeIcon />
            </a>
          </li>
        )}

        {/* Breadcrumb items */}
        {displayItems.map((item, index) => {
          const key = `item-${index}-${item.label}`
          return (
            <li key={key} className="flex items-center space-x-2 lg:space-x-3">
              {/* Separator */}
              {(index > 0 || showHome) && renderSeparator()}
              
              {/* Breadcrumb item */}
              {item.current || !item.href || item.label === '...' ? (
                <span
                  className={cn(
                    'inline-flex items-center space-x-1',
                    item.current 
                      ? 'font-medium text-gray-900 dark:text-gray-100' 
                      : 'text-gray-500 dark:text-gray-400',
                    item.label === '...' && 'cursor-default'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </span>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    'inline-flex items-center space-x-1',
                    'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200',
                    'transition-colors duration-200',
                    'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                    'dark:focus:ring-offset-gray-900 rounded-sm'
                  )}
                >
                  {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                  <span>{item.label}</span>
                </a>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
