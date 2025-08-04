import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Alert } from './Alert'

describe('Alert', () => {
  describe('Rendering', () => {
    it('renders correctly with default props', () => {
      render(<Alert>Test alert message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
      expect(screen.getByText('Test alert message')).toBeInTheDocument()
    })

    it('renders with custom title', () => {
      render(<Alert title="Alert Title">Test message</Alert>)
      
      expect(screen.getByText('Alert Title')).toBeInTheDocument()
      expect(screen.getByText('Test message')).toBeInTheDocument()
    })

    it('renders with custom className', () => {
      render(<Alert className="custom-alert">Test message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('custom-alert')
    })

    it('accepts data-testid', () => {
      render(<Alert data-testid="test-alert">Test message</Alert>)
      
      expect(screen.getByTestId('test-alert')).toBeInTheDocument()
    })
  })

  describe('Variants', () => {
    it('renders info variant by default', () => {
      render(<Alert>Info message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('bg-blue-50', 'border-blue-200', 'text-blue-800')
    })

    it('renders success variant correctly', () => {
      render(<Alert variant="success">Success message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('bg-green-50', 'border-green-200', 'text-green-800')
    })

    it('renders warning variant correctly', () => {
      render(<Alert variant="warning">Warning message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('bg-yellow-50', 'border-yellow-200', 'text-yellow-800')
    })

    it('renders error variant correctly', () => {
      render(<Alert variant="error">Error message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('bg-red-50', 'border-red-200', 'text-red-800')
    })
  })

  describe('Sizes', () => {
    it('renders medium size by default', () => {
      render(<Alert>Test message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('p-4', 'text-base')
    })

    it('renders small size correctly', () => {
      render(<Alert size="sm">Test message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('p-3', 'text-sm')
    })

    it('renders large size correctly', () => {
      render(<Alert size="lg">Test message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveClass('p-6', 'text-lg')
    })
  })

  describe('Icons', () => {
    it('renders default icon by default', () => {
      render(<Alert>Test message</Alert>)
      
      const icon = screen.getByRole('alert').querySelector('svg')
      expect(icon).toBeInTheDocument()
    })

    it('does not render icon when icon=false', () => {
      render(<Alert icon={false}>Test message</Alert>)
      
      const icon = screen.getByRole('alert').querySelector('svg:not([aria-label])')
      expect(icon).not.toBeInTheDocument()
    })

    it('renders custom icon', () => {
      const CustomIcon = () => <div data-testid="custom-icon">Custom</div>
      render(<Alert icon={<CustomIcon />}>Test message</Alert>)
      
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
    })

    it('renders different default icons for different variants', () => {
      const { rerender } = render(<Alert variant="info">Info</Alert>)
      const infoIcon = screen.getByRole('alert').querySelector('svg')
      const infoIconHTML = infoIcon?.innerHTML
      
      rerender(<Alert variant="success">Success</Alert>)
      const successIcon = screen.getByRole('alert').querySelector('svg')
      const successIconHTML = successIcon?.innerHTML
      
      // Icons should be different (different paths)
      expect(infoIconHTML).not.toBe(successIconHTML)
    })
  })

  describe('Dismissible functionality', () => {
    it('does not render dismiss button by default', () => {
      render(<Alert>Test message</Alert>)
      
      const dismissButton = screen.queryByLabelText('Dismiss alert')
      expect(dismissButton).not.toBeInTheDocument()
    })

    it('renders dismiss button when dismissible=true', () => {
      const onDismiss = vi.fn()
      render(<Alert dismissible onDismiss={onDismiss}>Test message</Alert>)
      
      const dismissButton = screen.getByLabelText('Dismiss alert')
      expect(dismissButton).toBeInTheDocument()
    })

    it('calls onDismiss when dismiss button is clicked', () => {
      const onDismiss = vi.fn()
      render(<Alert dismissible onDismiss={onDismiss}>Test message</Alert>)
      
      const dismissButton = screen.getByLabelText('Dismiss alert')
      fireEvent.click(dismissButton)
      
      expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('calls onDismiss when Escape key is pressed', () => {
      const onDismiss = vi.fn()
      render(<Alert dismissible onDismiss={onDismiss}>Test message</Alert>)
      
      const alert = screen.getByRole('alert')
      fireEvent.keyDown(alert, { key: 'Escape' })
      
      expect(onDismiss).toHaveBeenCalledTimes(1)
    })

    it('does not call onDismiss for other keys', () => {
      const onDismiss = vi.fn()
      render(<Alert dismissible onDismiss={onDismiss}>Test message</Alert>)
      
      const alert = screen.getByRole('alert')
      fireEvent.keyDown(alert, { key: 'Enter' })
      fireEvent.keyDown(alert, { key: 'Space' })
      
      expect(onDismiss).not.toHaveBeenCalled()
    })

    it('does not call onDismiss on Escape if not dismissible', () => {
      const onDismiss = vi.fn()
      render(<Alert onDismiss={onDismiss}>Test message</Alert>)
      
      const alert = screen.getByRole('alert')
      fireEvent.keyDown(alert, { key: 'Escape' })
      
      expect(onDismiss).not.toHaveBeenCalled()
    })
  })

  describe('Actions', () => {
    it('renders actions when provided', () => {
      const actions = (
        <div>
          <button>Action 1</button>
          <button>Action 2</button>
        </div>
      )
      
      render(<Alert actions={actions}>Test message</Alert>)
      
      expect(screen.getByText('Action 1')).toBeInTheDocument()
      expect(screen.getByText('Action 2')).toBeInTheDocument()
    })

    it('does not render actions section when not provided', () => {
      render(<Alert>Test message</Alert>)
      
      // Check that there's no actions container
      const alert = screen.getByRole('alert')
      const actionsContainer = alert.querySelector('.mt-3')
      expect(actionsContainer).not.toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(<Alert>Test message</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toHaveAttribute('aria-live', 'polite')
    })

    it('dismiss button has proper aria-label', () => {
      const onDismiss = vi.fn()
      render(<Alert dismissible onDismiss={onDismiss}>Test message</Alert>)
      
      const dismissButton = screen.getByLabelText('Dismiss alert')
      expect(dismissButton).toHaveAttribute('aria-label', 'Dismiss alert')
    })

    it('has proper focus management', () => {
      const onDismiss = vi.fn()
      render(<Alert dismissible onDismiss={onDismiss}>Test message</Alert>)
      
      const dismissButton = screen.getByLabelText('Dismiss alert')
      dismissButton.focus()
      
      expect(dismissButton).toHaveFocus()
    })
  })

  describe('Edge cases', () => {
    it('handles empty children', () => {
      render(<Alert>{''}</Alert>)
      
      const alert = screen.getByRole('alert')
      expect(alert).toBeInTheDocument()
    })

    it('handles dismissible without onDismiss', () => {
      render(<Alert dismissible>Test message</Alert>)
      
      // Should not render dismiss button without onDismiss
      const dismissButton = screen.queryByLabelText('Dismiss alert')
      expect(dismissButton).not.toBeInTheDocument()
    })

    it('renders correctly with all props', () => {
      const onDismiss = vi.fn()
      const actions = <button>Action</button>
      const customIcon = <div data-testid="custom-icon">Icon</div>
      
      render(
        <Alert
          variant="success"
          size="lg"
          title="Success Title"
          dismissible
          icon={customIcon}
          actions={actions}
          onDismiss={onDismiss}
          className="custom-class"
          data-testid="full-alert"
        >
          Success message
        </Alert>
      )
      
      expect(screen.getByTestId('full-alert')).toBeInTheDocument()
      expect(screen.getByText('Success Title')).toBeInTheDocument()
      expect(screen.getByText('Success message')).toBeInTheDocument()
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument()
      expect(screen.getByText('Action')).toBeInTheDocument()
      expect(screen.getByLabelText('Dismiss alert')).toBeInTheDocument()
    })
  })
})
