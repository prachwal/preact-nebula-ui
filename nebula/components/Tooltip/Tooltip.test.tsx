import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { vi } from 'vitest'
import { Tooltip } from './Tooltip'

// Mock createPortal since we're testing in Node environment
vi.mock('preact/compat', async () => {
  const actual = await vi.importActual('preact/compat')
  return {
    ...actual,
    createPortal: (element: any, _container: any) => element
  }
})

// Helper function to trigger hover events on the tooltip wrapper
const triggerTooltipHover = (button: HTMLElement) => {
  const wrapper = button.parentElement!
  fireEvent.mouseEnter(wrapper)
}

const triggerTooltipLeave = (button: HTMLElement) => {
  const wrapper = button.parentElement!
  fireEvent.mouseLeave(wrapper)
}

describe('Tooltip', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Basic Functionality', () => {
    it('renders trigger element', () => {
      render(
        <Tooltip content="Test tooltip">
          <button>Trigger</button>
        </Tooltip>
      )
      
      expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
    })

    it('shows tooltip on hover after delay', async () => {
      render(
        <Tooltip content="Test tooltip" delay={100}>
          <button>Trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      
      // Tooltip should not be visible immediately
      expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
      
      // Fast-forward ALL timers including nested setTimeout
      vi.runAllTimers()
      
      await waitFor(() => {
        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
      }, { timeout: 1000 })
    })

    it('hides tooltip on mouse leave after close delay', async () => {
      render(
        <Tooltip content="Test tooltip" delay={0} closeDelay={100}>
          <button>Trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      
      // Show tooltip
      triggerTooltipHover(trigger)
      vi.runAllTimers()
      
      await waitFor(() => {
        expect(screen.getByText('Test tooltip')).toBeInTheDocument()
      })
      
      // Hide tooltip
      triggerTooltipLeave(trigger)
      vi.runAllTimers()
      
      await waitFor(() => {
        expect(screen.queryByText('Test tooltip')).not.toBeInTheDocument()
      })
    })
  })

  describe('Trigger Types', () => {
    it('shows tooltip on hover trigger', async () => {
      render(
        <Tooltip content="Hover tooltip" trigger="hover" delay={0}>
          <button>Hover me</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.runAllTimers()
      
      await waitFor(() => {
        expect(screen.getByText('Hover tooltip')).toBeInTheDocument()
      })
    })

    it('shows tooltip on focus trigger', async () => {
      render(
        <Tooltip content="Focus tooltip" trigger="focus" delay={0}>
          <button>Focus me</button>
        </Tooltip>
      )
      
      const button = screen.getByRole('button')
      const wrapper = button.parentElement!
      
      // Focus the wrapper element
      wrapper.focus()
      fireEvent.focus(wrapper)
      vi.runAllTimers()
      
      await waitFor(() => {
        expect(screen.getByText('Focus tooltip')).toBeInTheDocument()
      })
    })

    it('shows tooltip on click trigger', async () => {
      render(
        <Tooltip content="Click tooltip" trigger="click" delay={0}>
          <button>Click me</button>
        </Tooltip>
      )
      
      fireEvent.click(screen.getByRole('button'))
      vi.runAllTimers()
      
      await waitFor(() => {
        expect(screen.getByText('Click tooltip')).toBeInTheDocument()
      })
    })

    it('toggles tooltip on repeated clicks', async () => {
      render(
        <Tooltip content="Toggle tooltip" trigger="click" delay={0} closeDelay={0}>
          <button>Toggle me</button>
        </Tooltip>
      )
      
      const button = screen.getByRole('button')
      
      // First click - show
      fireEvent.click(button)
      vi.runAllTimers()
      
      await waitFor(() => {
        expect(screen.getByText('Toggle tooltip')).toBeInTheDocument()
      })
      
      // Second click - hide
      fireEvent.click(button)
      vi.runAllTimers()
      
      await waitFor(() => {
        expect(screen.queryByText('Toggle tooltip')).not.toBeInTheDocument()
      })
    })
  })

  describe('Positioning', () => {
    it('applies correct position classes', async () => {
      render(
        <Tooltip content="Top tooltip" position="top" delay={0}>
          <button>Top trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toBeInTheDocument()
        expect(tooltip).toHaveStyle({ position: 'absolute' })
      })
    })

    it('supports all position variants', () => {
      const positions = [
        'top', 'top-start', 'top-end',
        'bottom', 'bottom-start', 'bottom-end',
        'left', 'left-start', 'left-end',
        'right', 'right-start', 'right-end'
      ]
      
      positions.forEach(position => {
        const { unmount } = render(
          <Tooltip content="Test" position={position as any} delay={0}>
            <button>Test</button>
          </Tooltip>
        )
        unmount()
      })
    })
  })

  describe('Size Variants', () => {
    it('applies small size classes', async () => {
      render(
        <Tooltip content="Small tooltip" size="sm" delay={0}>
          <button>Small trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveClass('px-2', 'py-1', 'text-xs')
      })
    })

    it('applies medium size classes', async () => {
      render(
        <Tooltip content="Medium tooltip" size="md" delay={0}>
          <button>Medium trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveClass('px-3', 'py-2', 'text-sm')
      })
    })

    it('applies large size classes', async () => {
      render(
        <Tooltip content="Large tooltip" size="lg" delay={0}>
          <button>Large trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveClass('px-4', 'py-3', 'text-base')
      })
    })
  })

  describe('Color Schemes', () => {
    it('applies gray color scheme', async () => {
      render(
        <Tooltip content="Gray tooltip" colorScheme="gray" delay={0}>
          <button>Gray trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveClass('bg-gray-900', 'text-white')
      })
    })

    it('applies primary color scheme', async () => {
      render(
        <Tooltip content="Primary tooltip" colorScheme="primary" delay={0}>
          <button>Primary trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveClass('bg-blue-600', 'text-white')
      })
    })

    it('applies success color scheme', async () => {
      render(
        <Tooltip content="Success tooltip" colorScheme="success" delay={0}>
          <button>Success trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveClass('bg-green-600', 'text-white')
      })
    })
  })

  describe('Arrow', () => {
    it('shows arrow by default', async () => {
      render(
        <Tooltip content="Tooltip with arrow" delay={0}>
          <button>Trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toBeInTheDocument()
        // Arrow is rendered as a child div
        expect(tooltip.querySelector('div')).toBeInTheDocument()
      })
    })

    it('hides arrow when hasArrow is false', async () => {
      render(
        <Tooltip content="Tooltip without arrow" hasArrow={false} delay={0}>
          <button>Trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toBeInTheDocument()
        // No arrow div should be present
        expect(tooltip.querySelector('div')).not.toBeInTheDocument()
      })
    })
  })

  describe('Disabled State', () => {
    it('does not show tooltip when disabled', () => {
      render(
        <Tooltip content="Disabled tooltip" disabled delay={0}>
          <button>Disabled trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('hides tooltip on Escape key', async () => {
      render(
        <Tooltip content="Escapable tooltip" delay={0} closeDelay={0}>
          <button>Trigger</button>
        </Tooltip>
      )
      
      const button = screen.getByRole('button')
      
      // Show tooltip
      triggerTooltipHover(button)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
      })
      
      // Press Escape - this should be on the wrapper, not the button
      const wrapper = button.parentElement!
      fireEvent.keyDown(wrapper, { key: 'Escape' })
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('sets proper ARIA attributes', async () => {
      render(
        <Tooltip content="Accessible tooltip" delay={0}>
          <button>Accessible trigger</button>
        </Tooltip>
      )
      
      const button = screen.getByRole('button')
      const wrapper = button.parentElement!
      
      // Initially no aria-describedby
      expect(wrapper).not.toHaveAttribute('aria-describedby')
      
      // Show tooltip
      triggerTooltipHover(button)
      vi.runAllTimers()
      
      await waitFor(() => {
        const tooltip = screen.getByText('Accessible tooltip')
        expect(tooltip).toBeInTheDocument()
        expect(tooltip).toHaveAttribute('role', 'tooltip')
        expect(wrapper).toHaveAttribute('aria-describedby')
      }, { timeout: 1000 })
    })

    it('makes focus trigger focusable', () => {
      render(
        <Tooltip content="Focus tooltip" trigger="focus">
          <span>Focus trigger</span>
        </Tooltip>
      )
      
      const trigger = screen.getByText('Focus trigger').parentElement
      expect(trigger).toHaveAttribute('tabIndex', '0')
    })

    it('does not make non-focus triggers focusable', () => {
      render(
        <Tooltip content="Hover tooltip" trigger="hover">
          <span>Hover trigger</span>
        </Tooltip>
      )
      
      const trigger = screen.getByText('Hover trigger').parentElement
      expect(trigger).not.toHaveAttribute('tabIndex')
    })
  })

  describe('Custom Props', () => {
    it('applies custom className', async () => {
      render(
        <Tooltip content="Custom tooltip" className="custom-tooltip" delay={0}>
          <button>Custom trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveClass('custom-tooltip')
      })
    })

    it('applies data-testid', async () => {
      render(
        <Tooltip content="Test tooltip" data-testid="test-tooltip" delay={0}>
          <button>Test trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        expect(screen.getByTestId('test-tooltip')).toBeInTheDocument()
      })
    })

    it('applies custom max width', async () => {
      render(
        <Tooltip content="Wide tooltip content" maxWidth="500px" delay={0}>
          <button>Wide trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        const tooltip = screen.getByRole('tooltip')
        expect(tooltip).toHaveStyle({ maxWidth: '500px' })
      })
    })
  })

  describe('Complex Content', () => {
    it('renders JSX content', async () => {
      render(
        <Tooltip 
          content={
            <div>
              <strong>Rich content</strong>
              <p>With multiple elements</p>
            </div>
          } 
          delay={0}
        >
          <button>Rich trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      vi.advanceTimersByTime(0)
      
      await waitFor(() => {
        expect(screen.getByText('Rich content')).toBeInTheDocument()
        expect(screen.getByText('With multiple elements')).toBeInTheDocument()
      })
    })
  })

  describe('Edge Cases', () => {
    it('handles rapid hover in/out', async () => {
      render(
        <Tooltip content="Rapid tooltip" delay={100} closeDelay={100}>
          <button>Rapid trigger</button>
        </Tooltip>
      )
      
      const button = screen.getByRole('button')
      
      // Rapid mouse enter/leave
      triggerTooltipHover(button)
      triggerTooltipLeave(button)
      triggerTooltipHover(button)
      
      vi.advanceTimersByTime(100)
      
      await waitFor(() => {
        expect(screen.getByRole('tooltip')).toBeInTheDocument()
      })
    })

    it('cleans up timeouts on unmount', () => {
      const { unmount } = render(
        <Tooltip content="Cleanup tooltip" delay={1000}>
          <button>Cleanup trigger</button>
        </Tooltip>
      )
      
      const trigger = screen.getByRole('button')
      triggerTooltipHover(trigger)
      unmount()
      
      // Should not throw errors
      vi.advanceTimersByTime(1000)
    })
  })
})