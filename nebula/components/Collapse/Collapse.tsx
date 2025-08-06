import { forwardRef, cloneElement } from 'preact/compat'
import { VNode, isValidElement } from 'preact'
import { cn } from '../../utils/cn'
import { CollapseProps } from './types'
import { CollapsePanel } from './CollapsePanel'
import { useCollapseAnimation } from './useCollapseAnimation'

const CollapseComponent = forwardRef<HTMLDivElement, CollapseProps>(
  ({
    children,
    activeKey,
    defaultActiveKey,
    accordion = false,
    bordered = true,
    expandIcon,
    onChange,
    className,
    size = 'md',
    disabled = false,
    ...props
  }, ref) => {
    const { activeKeys, isAnimating, togglePanel } = useCollapseAnimation(
      accordion,
      defaultActiveKey,
      activeKey,
      onChange
    )

    const sizeClasses = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg'
    }

    const renderChildren = () => {
      const childArray = Array.isArray(children) ? children : [children]
      
      return childArray.map((child, index) => {
        if (!isValidElement(child)) {
          return child
        }

        const childVNode = child as VNode<any>
        const panelKey = child.key ?? String(index)
        const isActive = activeKeys.includes(panelKey)
        const isDisabled = disabled || childVNode.props?.disabled

        return cloneElement(childVNode, {
          panelKey,
          isActive,
          isAnimating: isAnimating(panelKey),
          onToggle: () => !isDisabled && togglePanel(panelKey),
          showArrow: childVNode.props?.showArrow ?? true,
          expandIcon,
          disabled: isDisabled,
        })
      })
    }

    return (
      <div
        ref={ref}
        className={cn(
          'collapse-container',
          sizeClasses[size],
          !bordered && '[&>*]:border-none [&>*]:shadow-none',
          className
        )}
        {...props}
      >
        {renderChildren()}
      </div>
    )
  }
)

CollapseComponent.displayName = 'Collapse'

// Create compound component
export const Collapse = CollapseComponent as typeof CollapseComponent & {
  Panel: typeof CollapsePanel
}

// Attach Panel as static property
Collapse.Panel = CollapsePanel
