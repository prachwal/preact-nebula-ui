import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { Popover } from './Popover'

// Mock getBoundingClientRect for positioning tests
const mockGetBoundingClientRect = (rect: Partial<DOMRect>) => ({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: 0,
  height: 0,
  x: 0,
  y: 0,
  toJSON: () => ({}),
  ...rect
})

describe('Popover', () => {
  beforeEach(() => {
    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true })
    Object.defineProperty(window, 'innerHeight', { value: 768, writable: true })
    Object.defineProperty(window, 'scrollX', { value: 0, writable: true })
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true })
  })

  afterEach(() => {
    vi.clearAllTimers()
  })

  describe('Basic Functionality', () => {
    it('renders trigger element', () => {
      render(
        <Popover trigger={<button>Open Popover</button>}>
          <div>Popover content</div>
        </Popover>
      )

      expect(screen.getByRole('button', { name: 'Open Popover' })).toBeInTheDocument()
    })

    it('shows popover content when triggered (click)', async () => {
      render(
        <Popover trigger={<button>Open Popover</button>}>
          <div>Popover content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Open Popover' })
      
      // Mock getBoundingClientRect for positioning
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.click(trigger)

      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
        expect(screen.getByText('Popover content')).toBeInTheDocument()
      })
    })

    it('hides popover when clicking trigger again', async () => {
      render(
        <Popover trigger={<button>Toggle Popover</button>}>
          <div>Popover content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Toggle Popover' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      // Open popover
      fireEvent.click(trigger)
      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      // Close popover
      fireEvent.click(trigger)
      await waitFor(() => {
        expect(screen.queryByTestId('popover')).not.toBeInTheDocument()
      })
    })
  })

  describe('Controlled Mode', () => {
    it('works in controlled mode', async () => {
      const onClose = vi.fn()
      const onOpen = vi.fn()

      render(
        <Popover
          isOpen={true}
          onClose={onClose}
          onOpen={onOpen}
          trigger={<button>Controlled Trigger</button>}
        >
          <div>Controlled content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Controlled Trigger' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      // Should show popover because isOpen=true
      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      // Click should call onClose but popover stays open (controlled)
      fireEvent.click(trigger)
      expect(onClose).toHaveBeenCalled()
      expect(screen.getByTestId('popover')).toBeInTheDocument()
    })
  })

  describe('Trigger Types', () => {
    it('works with hover trigger', async () => {
      vi.useFakeTimers()

      render(
        <Popover
          trigger={<button>Hover Trigger</button>}
          triggerOn="hover"
        >
          <div>Hover content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Hover Trigger' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.mouseEnter(trigger)

      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      fireEvent.mouseLeave(trigger)

      await waitFor(() => {
        expect(screen.queryByTestId('popover')).not.toBeInTheDocument()
      })

      vi.useRealTimers()
    })

    it('works with focus trigger', async () => {
      render(
        <Popover
          trigger={<input placeholder="Focus Trigger" />}
          triggerOn="focus"
        >
          <div>Focus content</div>
        </Popover>
      )

      const trigger = screen.getByPlaceholderText('Focus Trigger')
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 200,
        height: 32
      }))

      fireEvent.focus(trigger)

      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      fireEvent.blur(trigger)

      await waitFor(() => {
        expect(screen.queryByTestId('popover')).not.toBeInTheDocument()
      })
    })
  })

  describe('Positioning', () => {
    it('positions popover at bottom by default', async () => {
      render(
        <Popover trigger={<button>Bottom Popover</button>}>
          <div>Bottom content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Bottom Popover' })
      
      // Mock getBoundingClientRect on the trigger button
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32,
        bottom: 132,
        right: 180
      }))

      // We also need to mock the wrapper div (trigger's parent)
      const triggerWrapper = trigger.parentElement
      if (triggerWrapper) {
        triggerWrapper.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
          top: 100,
          left: 100,
          width: 80,
          height: 32,
          bottom: 132,
          right: 180
        }))
      }

      fireEvent.click(trigger)

      await waitFor(() => {
        const popover = screen.getByTestId('popover')
        expect(popover).toBeInTheDocument()
        
        // Mock popover getBoundingClientRect for content dimensions
        popover.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
          top: 0,
          left: 0,
          width: 200,
          height: 50
        }))
        
        // Should be positioned below trigger (top > 132)
        // Expected position should be trigger.bottom + offset = 132 + 8 = 140
        const style = window.getComputedStyle(popover)
        const topValue = parseFloat(style.top.replace('px', ''))
        expect(topValue).toBeCloseTo(140, 0) // Allow for small rounding differences
      })
    })

    it('supports different position variants', async () => {
      const positions = ['top', 'bottom', 'left', 'right'] as const

      for (const position of positions) {
        const { unmount } = render(
          <Popover
            position={position}
            trigger={<button>{position} trigger</button>}
          >
            <div>{position} content</div>
          </Popover>
        )

        const trigger = screen.getByRole('button', { name: `${position} trigger` })
        trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
          top: 300,
          left: 300,
          width: 80,
          height: 32,
          bottom: 332,
          right: 380
        }))

        fireEvent.click(trigger)

        await waitFor(() => {
          expect(screen.getByTestId('popover')).toBeInTheDocument()
        })

        unmount()
      }
    })
  })

  describe('Arrow', () => {
    it('shows arrow by default', async () => {
      render(
        <Popover trigger={<button>Arrow Trigger</button>}>
          <div>Content with arrow</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Arrow Trigger' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.click(trigger)

      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
        expect(screen.getByTestId('popover-arrow')).toBeInTheDocument()
      })
    })

    it('hides arrow when withArrow is false', async () => {
      render(
        <Popover
          trigger={<button>No Arrow</button>}
          withArrow={false}
        >
          <div>Content without arrow</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'No Arrow' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.click(trigger)

      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
        expect(screen.queryByTestId('popover-arrow')).not.toBeInTheDocument()
      })
    })
  })

  describe('Close Behaviors', () => {
    it('closes on click outside', async () => {
      render(
        <div>
          <Popover trigger={<button>Click Outside Test</button>}>
            <div>Content</div>
          </Popover>
          <div data-testid="outside">Outside element</div>
        </div>
      )

      const trigger = screen.getByRole('button', { name: 'Click Outside Test' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      // Open popover
      fireEvent.click(trigger)
      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      // Click outside
      fireEvent.mouseDown(screen.getByTestId('outside'))

      await waitFor(() => {
        expect(screen.queryByTestId('popover')).not.toBeInTheDocument()
      })
    })

    it('closes on escape key', async () => {
      render(
        <Popover trigger={<button>Escape Test</button>}>
          <div>Content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Escape Test' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      // Open popover
      fireEvent.click(trigger)
      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      // Press escape
      fireEvent.keyDown(document, { key: 'Escape' })

      await waitFor(() => {
        expect(screen.queryByTestId('popover')).not.toBeInTheDocument()
      })
    })

    it('respects closeOnClickOutside=false', async () => {
      render(
        <div>
          <Popover
            trigger={<button>No Close Outside</button>}
            closeOnClickOutside={false}
          >
            <div>Content</div>
          </Popover>
          <div data-testid="outside">Outside element</div>
        </div>
      )

      const trigger = screen.getByRole('button', { name: 'No Close Outside' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      // Open popover
      fireEvent.click(trigger)
      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      // Click outside
      fireEvent.mouseDown(screen.getByTestId('outside'))

      // Should still be open
      expect(screen.getByTestId('popover')).toBeInTheDocument()
    })
  })

  describe('Delays', () => {
    it('respects open delay', async () => {
      vi.useFakeTimers()

      render(
        <Popover
          trigger={<button>Delayed Open</button>}
          triggerOn="hover"
          openDelay={100}
        >
          <div>Delayed content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Delayed Open' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.mouseEnter(trigger)

      // Should not be visible immediately
      expect(screen.queryByTestId('popover')).not.toBeInTheDocument()

      // Advance timers
      vi.advanceTimersByTime(100)

      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      vi.useRealTimers()
    })

    it('respects close delay', async () => {
      vi.useFakeTimers()

      render(
        <Popover
          trigger={<button>Delayed Close</button>}
          triggerOn="hover"
          closeDelay={100}
        >
          <div>Delayed content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Delayed Close' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      // Open popover
      fireEvent.mouseEnter(trigger)
      await waitFor(() => {
        expect(screen.getByTestId('popover')).toBeInTheDocument()
      })

      // Start leave
      fireEvent.mouseLeave(trigger)

      // Should still be visible
      expect(screen.getByTestId('popover')).toBeInTheDocument()

      // Advance timers
      vi.advanceTimersByTime(100)

      await waitFor(() => {
        expect(screen.queryByTestId('popover')).not.toBeInTheDocument()
      })

      vi.useRealTimers()
    })
  })

  describe('Accessibility', () => {
    it('supports custom test IDs', async () => {
      render(
        <Popover
          trigger={<button>Custom Test ID</button>}
          testId="custom-popover"
        >
          <div>Custom content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Custom Test ID' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.click(trigger)

      await waitFor(() => {
        expect(screen.getByTestId('custom-popover')).toBeInTheDocument()
        expect(screen.getByTestId('custom-popover-arrow')).toBeInTheDocument()
      })
    })

    it('can be disabled', () => {
      render(
        <Popover
          trigger={<button>Disabled Popover</button>}
          disabled={true}
        >
          <div>Should not show</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Disabled Popover' })
      fireEvent.click(trigger)

      expect(screen.queryByTestId('popover')).not.toBeInTheDocument()
    })
  })

  describe('Styling', () => {
    it('applies custom className', async () => {
      render(
        <Popover
          trigger={<button>Custom Class</button>}
          className="custom-popover-class"
        >
          <div>Custom styled content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Custom Class' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.click(trigger)

      await waitFor(() => {
        const popover = screen.getByTestId('popover')
        expect(popover).toHaveClass('custom-popover-class')
      })
    })

    it('applies custom arrow className', async () => {
      render(
        <Popover
          trigger={<button>Custom Arrow Class</button>}
          arrowClassName="custom-arrow-class"
        >
          <div>Content with custom arrow</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Custom Arrow Class' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.click(trigger)

      await waitFor(() => {
        const arrow = screen.getByTestId('popover-arrow')
        expect(arrow).toHaveClass('custom-arrow-class')
      })
    })

    it('supports custom z-index', async () => {
      render(
        <Popover
          trigger={<button>Custom Z-Index</button>}
          zIndex={9999}
        >
          <div>High z-index content</div>
        </Popover>
      )

      const trigger = screen.getByRole('button', { name: 'Custom Z-Index' })
      trigger.getBoundingClientRect = vi.fn(() => mockGetBoundingClientRect({
        top: 100,
        left: 100,
        width: 80,
        height: 32
      }))

      fireEvent.click(trigger)

      await waitFor(() => {
        const popover = screen.getByTestId('popover')
        expect(popover.style.zIndex).toBe('9999')
      })
    })
  })
})
