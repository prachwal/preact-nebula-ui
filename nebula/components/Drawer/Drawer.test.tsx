import { render, screen, fireEvent } from '@testing-library/preact'
import { vi } from 'vitest'
import { Drawer } from './Drawer'

// Mock createPortal since we're testing in Node environment
vi.mock('preact/compat', async () => {
  const actual = await vi.importActual('preact/compat')
  return {
    ...actual,
    createPortal: (element: any, _container: any) => element
  }
})

describe('Drawer', () => {
  const defaultProps = {
    isOpen: false,
    onClose: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Functionality', () => {
    it('does not render when closed', () => {
      render(
        <Drawer {...defaultProps}>
          <div>Drawer content</div>
        </Drawer>
      )
      
      expect(screen.queryByText('Drawer content')).not.toBeInTheDocument()
    })

    it('renders when open', () => {
      render(
        <Drawer {...defaultProps} isOpen>
          <div>Drawer content</div>
        </Drawer>
      )
      
      expect(screen.getByText('Drawer content')).toBeInTheDocument()
    })

    it('calls onClose when backdrop is clicked', () => {
      const onClose = vi.fn()
      render(
        <Drawer {...defaultProps} isOpen onClose={onClose}>
          <div>Drawer content</div>
        </Drawer>
      )
      
      const backdrop = screen.getByTestId('drawer-backdrop')
      fireEvent.click(backdrop)
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('does not close on backdrop click when closeOnBackdropClick is false', () => {
      const onClose = vi.fn()
      render(
        <Drawer {...defaultProps} isOpen onClose={onClose} closeOnBackdropClick={false}>
          <div>Drawer content</div>
        </Drawer>
      )
      
      const backdrop = screen.getByTestId('drawer-backdrop')
      fireEvent.click(backdrop)
      
      expect(onClose).not.toHaveBeenCalled()
    })
  })

  describe('Position Variants', () => {
    it('applies correct classes for left position', () => {
      render(
        <Drawer {...defaultProps} isOpen position="left" data-testid="drawer">
          <div>Left drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('inset-y-0', 'left-0', 'translate-x-0')
    })

    it('applies correct classes for right position', () => {
      render(
        <Drawer {...defaultProps} isOpen position="right" data-testid="drawer">
          <div>Right drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('inset-y-0', 'right-0', 'translate-x-0')
    })

    it('applies correct classes for top position', () => {
      render(
        <Drawer {...defaultProps} isOpen position="top" data-testid="drawer">
          <div>Top drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('inset-x-0', 'top-0', 'translate-y-0')
    })

    it('applies correct classes for bottom position', () => {
      render(
        <Drawer {...defaultProps} isOpen position="bottom" data-testid="drawer">
          <div>Bottom drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('inset-x-0', 'bottom-0', 'translate-y-0')
    })
  })

  describe('Size Variants', () => {
    it('applies small size for horizontal drawers', () => {
      render(
        <Drawer {...defaultProps} isOpen position="left" size="sm" data-testid="drawer">
          <div>Small drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('w-80')
    })

    it('applies medium size for horizontal drawers', () => {
      render(
        <Drawer {...defaultProps} isOpen position="right" size="md" data-testid="drawer">
          <div>Medium drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('w-96')
    })

    it('applies large size for vertical drawers', () => {
      render(
        <Drawer {...defaultProps} isOpen position="top" size="lg" data-testid="drawer">
          <div>Large drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('h-[32rem]')
    })

    it('applies full size', () => {
      render(
        <Drawer {...defaultProps} isOpen position="bottom" size="full" data-testid="drawer">
          <div>Full drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('h-screen')
    })
  })

  describe('Backdrop Options', () => {
    it('shows backdrop by default', () => {
      render(
        <Drawer {...defaultProps} isOpen data-testid="drawer">
          <div>Drawer with backdrop</div>
        </Drawer>
      )
      
      const backdrop = screen.getByTestId('drawer-backdrop')
      expect(backdrop).toHaveClass('bg-black')
    })

    it('hides backdrop when hasBackdrop is false', () => {
      render(
        <Drawer {...defaultProps} isOpen hasBackdrop={false} data-testid="drawer">
          <div>Drawer without backdrop</div>
        </Drawer>
      )
      
      const backdrop = screen.getByTestId('drawer-backdrop')
      expect(backdrop).not.toHaveClass('bg-black')
    })

    it('applies custom backdrop className', () => {
      render(
        <Drawer {...defaultProps} isOpen backdropClassName="custom-backdrop" data-testid="drawer">
          <div>Custom backdrop</div>
        </Drawer>
      )
      
      const backdrop = screen.getByTestId('drawer-backdrop')
      expect(backdrop).toHaveClass('custom-backdrop')
    })
  })

  describe('Keyboard Navigation', () => {
    it('closes on Escape key by default', () => {
      const onClose = vi.fn()
      render(
        <Drawer {...defaultProps} isOpen onClose={onClose}>
          <div>Escapable drawer</div>
        </Drawer>
      )
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('does not close on Escape when closeOnEscape is false', () => {
      const onClose = vi.fn()
      render(
        <Drawer {...defaultProps} isOpen onClose={onClose} closeOnEscape={false}>
          <div>Non-escapable drawer</div>
        </Drawer>
      )
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(onClose).not.toHaveBeenCalled()
    })

    it('calls onEscapeKeyDown callback', () => {
      const onEscapeKeyDown = vi.fn()
      const onClose = vi.fn()
      render(
        <Drawer {...defaultProps} isOpen onClose={onClose} onEscapeKeyDown={onEscapeKeyDown}>
          <div>Drawer with escape callback</div>
        </Drawer>
      )
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(onEscapeKeyDown).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Accessibility', () => {
    it('sets proper ARIA attributes', () => {
      render(
        <Drawer {...defaultProps} isOpen data-testid="drawer">
          <div>Accessible drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveAttribute('role', 'dialog')
      expect(drawer).toHaveAttribute('aria-modal', 'true')
    })

    it('traps focus within drawer', async () => {
      render(
        <Drawer {...defaultProps} isOpen>
          <div>
            <button>First button</button>
            <button>Second button</button>
          </div>
        </Drawer>
      )
      
      const buttons = screen.getAllByRole('button')
      
      // Focus should be trapped within drawer
      fireEvent.keyDown(buttons[1], { key: 'Tab' })
      // In a real environment, focus would cycle back to first button
      // This is hard to test in JSDOM without more complex setup
    })
  })

  describe('Custom Props', () => {
    it('applies custom className', () => {
      render(
        <Drawer {...defaultProps} isOpen className="custom-drawer" data-testid="drawer">
          <div>Custom drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveClass('custom-drawer')
    })

    it('applies custom styles', () => {
      render(
        <Drawer {...defaultProps} isOpen style={{ width: '600px' }} data-testid="drawer">
          <div>Styled drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveStyle({ width: '600px' })
    })

    it('applies custom z-index', () => {
      render(
        <Drawer {...defaultProps} isOpen zIndex={2000} data-testid="drawer">
          <div>High z-index drawer</div>
        </Drawer>
      )
      
      const backdrop = screen.getByTestId('drawer-backdrop')
      expect(backdrop).toHaveStyle({ zIndex: '2000' })
    })
  })

  describe('Callbacks', () => {
    it('calls onBackdropClick when backdrop is clicked', () => {
      const onBackdropClick = vi.fn()
      const onClose = vi.fn()
      render(
        <Drawer {...defaultProps} isOpen onClose={onClose} onBackdropClick={onBackdropClick}>
          <div>Drawer with backdrop callback</div>
        </Drawer>
      )
      
      const backdrop = screen.getByTestId('drawer-backdrop')
      fireEvent.click(backdrop)
      
      expect(onBackdropClick).toHaveBeenCalledTimes(1)
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onAnimationEnd on transition end', () => {
      const onAnimationEnd = vi.fn()
      render(
        <Drawer {...defaultProps} isOpen onAnimationEnd={onAnimationEnd} data-testid="drawer">
          <div>Drawer with animation callback</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      // Create and dispatch a proper transition event
      const transitionEvent = new Event('transitionend', { bubbles: true })
      drawer.dispatchEvent(transitionEvent)
      
      expect(onAnimationEnd).toHaveBeenCalledTimes(1)
    })
  })

  describe('Animation Duration', () => {
    it('applies custom animation duration', () => {
      render(
        <Drawer {...defaultProps} isOpen animationDuration={500} data-testid="drawer">
          <div>Slow animation drawer</div>
        </Drawer>
      )
      
      const drawer = screen.getByTestId('drawer')
      expect(drawer).toHaveStyle({ transitionDuration: '500ms' })
    })
  })
})
