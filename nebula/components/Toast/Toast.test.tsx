import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { Toast } from './Toast'
import type { ToastProps } from './Toast.types'

// Mock createPortal since we're testing in Node environment
vi.mock('preact/compat', () => ({
  forwardRef: (fn: any) => fn,
  createPortal: (element: any, _container: any) => element
}))

describe('Toast', () => {
  let mockOnDismiss: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockOnDismiss = vi.fn()
    // Clear any existing timers
    vi.clearAllTimers()
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  const createDefaultProps = (): ToastProps => ({
    children: 'Test toast message',
    onDismiss: mockOnDismiss
  })

  describe('Basic Functionality', () => {
    it('renders toast with default props', () => {
      render(<Toast {...createDefaultProps()} />)
      
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByText('Test toast message')).toBeInTheDocument()
    })

    it('renders with title and content', () => {
      render(
        <Toast {...createDefaultProps()} title="Toast Title">
          Toast content
        </Toast>
      )
      
      expect(screen.getByText('Toast Title')).toBeInTheDocument()
      expect(screen.getByText('Toast content')).toBeInTheDocument()
    })

    it('shows dismissible button by default', () => {
      render(<Toast {...createDefaultProps()} />)
      
      const dismissButton = screen.getByRole('button', { name: /dismiss notification/i })
      expect(dismissButton).toBeInTheDocument()
    })

    it('hides dismissible button when dismissible is false', () => {
      render(<Toast {...createDefaultProps()} dismissible={false} />)
      
      const dismissButton = screen.queryByRole('button', { name: /dismiss notification/i })
      expect(dismissButton).not.toBeInTheDocument()
    })

    it('calls onDismiss when dismiss button is clicked', () => {
      render(<Toast {...createDefaultProps()} />)
      
      const dismissButton = screen.getByRole('button', { name: /dismiss notification/i })
      fireEvent.click(dismissButton)
      
      expect(mockOnDismiss).toHaveBeenCalledTimes(1)
    })
  })

  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<Toast {...createDefaultProps()} variant="default" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('border-l-gray-400')
    })

    it('applies success variant classes', () => {
      render(<Toast {...createDefaultProps()} variant="success" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('border-l-green-500', 'text-green-800')
    })

    it('applies warning variant classes', () => {
      render(<Toast {...createDefaultProps()} variant="warning" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('border-l-yellow-500', 'text-yellow-800')
    })

    it('applies error variant classes', () => {
      render(<Toast {...createDefaultProps()} variant="error" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('border-l-red-500', 'text-red-800')
    })

    it('applies info variant classes', () => {
      render(<Toast {...createDefaultProps()} variant="info" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('border-l-blue-500', 'text-blue-800')
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(<Toast {...createDefaultProps()} size="sm" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('text-sm')
    })

    it('applies medium size classes', () => {
      render(<Toast {...createDefaultProps()} size="md" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('text-base')
    })

    it('applies large size classes', () => {
      render(<Toast {...createDefaultProps()} size="lg" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('text-lg')
    })
  })

  describe('Icons', () => {
    it('shows variant-appropriate icon by default', () => {
      render(<Toast {...createDefaultProps()} variant="success" />)
      
      // Success icon should be present
      const iconContainer = screen.getByRole('alert').querySelector('svg')
      expect(iconContainer).toBeInTheDocument()
    })

    it('hides icon when icon is false', () => {
      render(<Toast {...createDefaultProps()} icon={false} />)
      
      const iconContainer = screen.getByRole('alert').querySelector('svg')
      expect(iconContainer).not.toBeInTheDocument()
    })

    it('shows custom icon when provided', () => {
      const customIcon = <span data-testid="custom-icon">Custom</span>
      render(<Toast {...createDefaultProps()} icon={customIcon} />)
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })
  })

  describe('Actions', () => {
    it('renders action buttons', () => {
      const actions = (
        <div>
          <button>Action 1</button>
          <button>Action 2</button>
        </div>
      )
      
      render(<Toast {...createDefaultProps()} actions={actions} />)
      
      expect(screen.getByText('Action 1')).toBeInTheDocument()
      expect(screen.getByText('Action 2')).toBeInTheDocument()
    })
  })

  describe('Auto-dismiss', () => {
    beforeEach(() => {
      vi.useFakeTimers()
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('auto-dismisses after duration', async () => {
      render(<Toast {...createDefaultProps()} duration={1000} />)
      
      // Fast-forward time
      vi.advanceTimersByTime(1000)
      
      await waitFor(() => {
        expect(mockOnDismiss).toHaveBeenCalledTimes(1)
      })
    })

    it('does not auto-dismiss when duration is 0', async () => {
      render(<Toast {...createDefaultProps()} duration={0} />)
      
      // Fast-forward time
      vi.advanceTimersByTime(10000)
      
      expect(mockOnDismiss).not.toHaveBeenCalled()
    })

    it('does not auto-dismiss when not visible', async () => {
      render(<Toast {...createDefaultProps()} duration={1000} isOpen={false} />)
      
      // Fast-forward time
      vi.advanceTimersByTime(1000)
      
      expect(mockOnDismiss).not.toHaveBeenCalled()
    })
  })

  describe('Keyboard Navigation', () => {
    it('dismisses toast on Escape key when dismissible', () => {
      render(<Toast {...createDefaultProps()} dismissible={true} />)
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(mockOnDismiss).toHaveBeenCalledTimes(1)
    })

    it('does not dismiss on Escape when not dismissible', () => {
      render(<Toast {...createDefaultProps()} dismissible={false} />)
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(mockOnDismiss).not.toHaveBeenCalled()
    })

    it('does not dismiss on other keys', () => {
      render(<Toast {...createDefaultProps()} />)
      
      fireEvent.keyDown(document, { key: 'Enter' })
      fireEvent.keyDown(document, { key: 'Space' })
      
      expect(mockOnDismiss).not.toHaveBeenCalled()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes for error variant', () => {
      render(<Toast {...createDefaultProps()} variant="error" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveAttribute('aria-live', 'assertive')
      expect(toast).toHaveAttribute('aria-atomic', 'true')
    })

    it('has proper ARIA attributes for non-error variants', () => {
      render(<Toast {...createDefaultProps()} variant="success" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveAttribute('aria-live', 'polite')
      expect(toast).toHaveAttribute('aria-atomic', 'true')
    })

    it('dismiss button has proper aria-label', () => {
      render(<Toast {...createDefaultProps()} />)
      
      const dismissButton = screen.getByRole('button', { name: /dismiss notification/i })
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss notification')
    })
  })

  describe('Visibility Control', () => {
    it('renders when isOpen is true', () => {
      render(<Toast {...createDefaultProps()} isOpen={true} />)
      
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
      render(<Toast {...createDefaultProps()} isOpen={false} />)
      
      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(<Toast {...createDefaultProps()} className="custom-toast" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveClass('custom-toast')
    })

    it('applies data-testid', () => {
      render(<Toast {...createDefaultProps()} data-testid="toast-component" />)
      
      expect(screen.getByTestId('toast-component')).toBeInTheDocument()
    })

    it('forwards other props to the div element', () => {
      render(<Toast {...createDefaultProps()} id="toast-id" />)
      
      const toast = screen.getByRole('alert')
      expect(toast).toHaveAttribute('id', 'toast-id')
    })
  })

  describe('Complex Content', () => {
    it('renders JSX content', () => {
      const content = (
        <div>
          <strong>Bold text</strong>
          <span>Regular text</span>
        </div>
      )
      
      render(<Toast {...createDefaultProps()}>{content}</Toast>)
      
      expect(screen.getByText('Bold text')).toBeInTheDocument()
      expect(screen.getByText('Regular text')).toBeInTheDocument()
    })

    it('renders both title and complex content', () => {
      const content = (
        <div>
          <p>First paragraph</p>
          <p>Second paragraph</p>
        </div>
      )
      
      render(
        <Toast {...createDefaultProps()} title="Complex Toast">
          {content}
        </Toast>
      )
      
      expect(screen.getByText('Complex Toast')).toBeInTheDocument()
      expect(screen.getByText('First paragraph')).toBeInTheDocument()
      expect(screen.getByText('Second paragraph')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('handles missing onDismiss callback gracefully', () => {
      render(<Toast {...createDefaultProps()} onDismiss={undefined} />)
      
      const dismissButton = screen.getByRole('button', { name: /dismiss notification/i })
      
      // Should not throw error
      expect(() => fireEvent.click(dismissButton)).not.toThrow()
    })

    it('handles empty content', () => {
      render(<Toast {...createDefaultProps()} children={undefined} />)
      
      expect(screen.getByRole('alert')).toBeInTheDocument()
    })

    it('handles only title without content', () => {
      render(<Toast {...createDefaultProps()} title="Title Only" children={undefined} />)
      
      expect(screen.getByText('Title Only')).toBeInTheDocument()
    })
  })
})
