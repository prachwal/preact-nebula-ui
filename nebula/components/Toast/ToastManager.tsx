import { Portal } from '../Portal/Portal'
import { useToast } from './ToastContext'
import { Toast } from './Toast'
import type { ToastManagerProps } from './Toast.types'
import { cn } from '../../utils/cn'

export const ToastManager = ({
  position = 'top-right',
  maxToasts = 5,
  gap = 8,
  className,
  'data-testid': dataTestId
}: ToastManagerProps) => {
  const { toasts, removeToast, position: contextPosition } = useToast()
  
  // Use context position if available, otherwise use prop
  const actualPosition = contextPosition || position
  
  // Position classes for the container
  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4'
  }

  if (toasts.length === 0) {
    return null
  }

  // Limit toasts to maxToasts
  const visibleToasts = toasts.slice(-maxToasts)

  return (
    <Portal>
      <div
        className={cn(
          'fixed z-[9999] pointer-events-none',
          positionClasses[actualPosition],
          className
        )}
        data-testid={dataTestId}
        style={{ zIndex: 9999 }}
      >
        <div 
          className="flex flex-col space-y-2"
          style={{ gap: `${gap}px` }}
        >
          {visibleToasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <Toast
                {...toast}
                isOpen={true}
                onDismiss={() => removeToast(toast.id)}
                data-testid={`toast-${toast.id}`}
              />
            </div>
          ))}
        </div>
      </div>
    </Portal>
  )
}
