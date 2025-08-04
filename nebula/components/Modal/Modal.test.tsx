import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/preact'
import userEvent from '@testing-library/user-event'
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal'
import type { ModalCloseReason } from './Modal.types'

// Mock for createPortal since jsdom doesn't have full DOM support
vi.mock('./Portal', () => ({
  Portal: ({ children }: { children: any }) => children
}))

describe('Modal', () => {
  let onCloseMock: (reason: ModalCloseReason) => void

  beforeEach(() => {
    onCloseMock = vi.fn()
    // Reset any body styles that might persist
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })

  afterEach(() => {
    cleanup()
    // Clean up portal containers
    const portalContainer = document.getElementById('modal-portal')
    if (portalContainer) {
      document.body.removeChild(portalContainer)
    }
  })

  describe('Basic Rendering', () => {
    it('should not render when isOpen is false', () => {
      render(
        <Modal isOpen={false} onClose={onCloseMock}>
          <ModalBody>Modal content</ModalBody>
        </Modal>
      )

      expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument()
    })

    it('should render when isOpen is true', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <ModalBody>Modal content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument()
      expect(screen.getByTestId('modal-content')).toBeInTheDocument()
      expect(screen.getByText('Modal content')).toBeInTheDocument()
    })

    it('should render with custom className', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} className="custom-modal">
          <ModalBody>Modal content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).toHaveClass('custom-modal')
    })

    it('should render with proper ARIA attributes', () => {
      render(
        <Modal 
          isOpen={true} 
          onClose={onCloseMock}
          aria-label="Test modal"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <ModalBody>Modal content</ModalBody>
        </Modal>
      )

      const modalContent = screen.getByTestId('modal-content')
      expect(modalContent).toHaveAttribute('role', 'dialog')
      expect(modalContent).toHaveAttribute('aria-modal', 'true')
      expect(modalContent).toHaveAttribute('aria-label', 'Test modal')
      expect(modalContent).toHaveAttribute('aria-labelledby', 'modal-title')
      expect(modalContent).toHaveAttribute('aria-describedby', 'modal-description')
    })
  })

  describe('Size Variants', () => {
    it('should apply small size classes', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} size="sm">
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).toHaveClass('max-w-sm')
    })

    it('should apply medium size classes (default)', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).toHaveClass('max-w-md')
    })

    it('should apply large size classes', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} size="lg">
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).toHaveClass('max-w-lg')
    })

    it('should apply extra large size classes', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} size="xl">
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).toHaveClass('max-w-xl')
    })

    it('should apply full size classes', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} size="full">
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).toHaveClass('max-w-full')
    })
  })

  describe('Backdrop Behavior', () => {
    it('should render backdrop by default', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-backdrop')).toHaveClass('bg-black', 'bg-opacity-50')
    })

    it('should not render backdrop when backdrop is false', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} backdrop={false}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-backdrop')).not.toHaveClass('bg-black', 'bg-opacity-50')
    })

    it('should close modal on backdrop click when backdrop is true', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} backdrop={true}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      await userEvent.click(screen.getByTestId('modal-backdrop'))
      expect(onCloseMock).toHaveBeenCalledWith('backdrop')
    })

    it('should not close modal on backdrop click when backdrop is static', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} backdrop="static">
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      await userEvent.click(screen.getByTestId('modal-backdrop'))
      expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should not close modal when clicking on modal content', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      await userEvent.click(screen.getByTestId('modal-content'))
      expect(onCloseMock).not.toHaveBeenCalled()
    })
  })

  describe('Keyboard Interaction', () => {
    it('should close modal on Escape key by default', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onCloseMock).toHaveBeenCalledWith('escape')
    })

    it('should not close modal on Escape key when keyboard is false', async () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} keyboard={false}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onCloseMock).not.toHaveBeenCalled()
    })

    it('should not handle Escape when modal is closed', async () => {
      const { rerender } = render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      rerender(
        <Modal isOpen={false} onClose={onCloseMock}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      fireEvent.keyDown(document, { key: 'Escape' })
      expect(onCloseMock).not.toHaveBeenCalled()
    })
  })

  describe('Positioning', () => {
    it('should center modal by default', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-backdrop')).toHaveClass('items-center')
    })

    it('should position modal at top when centered is false', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} centered={false}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-backdrop')).toHaveClass('items-start', 'pt-16')
    })
  })

  describe('Scrollable Behavior', () => {
    it('should apply scrollable classes when scrollable is true', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock} scrollable={true}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).toHaveClass('flex', 'flex-col')
    })

    it('should not apply scrollable classes by default', () => {
      render(
        <Modal isOpen={true} onClose={onCloseMock}>
          <ModalBody>Content</ModalBody>
        </Modal>
      )

      expect(screen.getByTestId('modal-content')).not.toHaveClass('flex', 'flex-col')
    })
  })
})

describe('ModalHeader', () => {
  let onCloseMock: (reason: ModalCloseReason) => void

  beforeEach(() => {
    onCloseMock = vi.fn()
  })

  it('should render header content', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalHeader>Test Header</ModalHeader>
      </Modal>
    )

    expect(screen.getByTestId('modal-header')).toBeInTheDocument()
    expect(screen.getByText('Test Header')).toBeInTheDocument()
  })

  it('should render close button by default', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalHeader>Test Header</ModalHeader>
      </Modal>
    )

    expect(screen.getByTestId('modal-close-button')).toBeInTheDocument()
    expect(screen.getByLabelText('Close modal')).toBeInTheDocument()
  })

  it('should not render close button when showCloseButton is false', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalHeader showCloseButton={false}>Test Header</ModalHeader>
      </Modal>
    )

    expect(screen.queryByTestId('modal-close-button')).not.toBeInTheDocument()
  })

  it('should close modal when close button is clicked', async () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalHeader>Test Header</ModalHeader>
      </Modal>
    )

    await userEvent.click(screen.getByTestId('modal-close-button'))
    expect(onCloseMock).toHaveBeenCalledWith('close-button')
  })

  it('should render with custom className', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalHeader className="custom-header">Test Header</ModalHeader>
      </Modal>
    )

    expect(screen.getByTestId('modal-header')).toHaveClass('custom-header')
  })
})

describe('ModalBody', () => {
  let onCloseMock: (reason: ModalCloseReason) => void

  beforeEach(() => {
    onCloseMock = vi.fn()
  })

  it('should render body content', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalBody>Body content</ModalBody>
      </Modal>
    )

    expect(screen.getByTestId('modal-body')).toBeInTheDocument()
    expect(screen.getByText('Body content')).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalBody className="custom-body">Body content</ModalBody>
      </Modal>
    )

    expect(screen.getByTestId('modal-body')).toHaveClass('custom-body')
  })

  it('should have scrollable classes', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalBody>Body content</ModalBody>
      </Modal>
    )

    expect(screen.getByTestId('modal-body')).toHaveClass('overflow-y-auto')
  })
})

describe('ModalFooter', () => {
  let onCloseMock: (reason: ModalCloseReason) => void

  beforeEach(() => {
    onCloseMock = vi.fn()
  })

  it('should render footer content', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalFooter>Footer content</ModalFooter>
      </Modal>
    )

    expect(screen.getByTestId('modal-footer')).toBeInTheDocument()
    expect(screen.getByText('Footer content')).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalFooter className="custom-footer">Footer content</ModalFooter>
      </Modal>
    )

    expect(screen.getByTestId('modal-footer')).toHaveClass('custom-footer')
  })

  it('should have proper flex layout classes', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalFooter>Footer content</ModalFooter>
      </Modal>
    )

    expect(screen.getByTestId('modal-footer')).toHaveClass('flex', 'items-center', 'justify-end', 'gap-3')
  })
})

describe('Complete Modal Structure', () => {
  let onCloseMock: (reason: ModalCloseReason) => void

  beforeEach(() => {
    onCloseMock = vi.fn()
  })

  it('should render complete modal with all sub-components', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalBody>Modal body content</ModalBody>
        <ModalFooter>Modal footer</ModalFooter>
      </Modal>
    )

    expect(screen.getByText('Modal Title')).toBeInTheDocument()
    expect(screen.getByText('Modal body content')).toBeInTheDocument()
    expect(screen.getByText('Modal footer')).toBeInTheDocument()
  })

  it('should render modal with only body', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalBody>Just body content</ModalBody>
      </Modal>
    )

    expect(screen.getByText('Just body content')).toBeInTheDocument()
    expect(screen.queryByTestId('modal-header')).not.toBeInTheDocument()
    expect(screen.queryByTestId('modal-footer')).not.toBeInTheDocument()
  })

  it('should handle complex nested content', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalHeader>
          <h2>Complex Header</h2>
          <p>Subtitle</p>
        </ModalHeader>
        <ModalBody>
          <div>
            <p>First paragraph</p>
            <p>Second paragraph</p>
            <button>Action Button</button>
          </div>
        </ModalBody>
        <ModalFooter>
          <button>Cancel</button>
          <button>Confirm</button>
        </ModalFooter>
      </Modal>
    )

    expect(screen.getByText('Complex Header')).toBeInTheDocument()
    expect(screen.getByText('Subtitle')).toBeInTheDocument()
    expect(screen.getByText('First paragraph')).toBeInTheDocument()
    expect(screen.getByText('Second paragraph')).toBeInTheDocument()
    expect(screen.getByText('Action Button')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Confirm')).toBeInTheDocument()
  })
})

describe('Accessibility', () => {
  let onCloseMock: (reason: ModalCloseReason) => void

  beforeEach(() => {
    onCloseMock = vi.fn()
  })

  it('should have proper ARIA roles and properties', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalBody>Accessible content</ModalBody>
      </Modal>
    )

    const modalContent = screen.getByTestId('modal-content')
    expect(modalContent).toHaveAttribute('role', 'dialog')
    expect(modalContent).toHaveAttribute('aria-modal', 'true')
  })

  it('should support ARIA labeling', () => {
    render(
      <Modal 
        isOpen={true} 
        onClose={onCloseMock}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalHeader>
          <h2 id="modal-title">Confirmation</h2>
        </ModalHeader>
        <ModalBody>
          <p id="modal-description">Are you sure you want to proceed?</p>
        </ModalBody>
      </Modal>
    )

    const modalContent = screen.getByTestId('modal-content')
    expect(modalContent).toHaveAttribute('aria-labelledby', 'modal-title')
    expect(modalContent).toHaveAttribute('aria-describedby', 'modal-description')
  })

  it('should have accessible close button', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalHeader>Title</ModalHeader>
      </Modal>
    )

    const closeButton = screen.getByTestId('modal-close-button')
    expect(closeButton).toHaveAttribute('aria-label', 'Close modal')
    expect(closeButton).toHaveAttribute('type', 'button')
  })
})

describe('Edge Cases', () => {
  let onCloseMock: (reason: ModalCloseReason) => void

  beforeEach(() => {
    onCloseMock = vi.fn()
  })

  it('should handle rapid open/close state changes', async () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <ModalBody>Content</ModalBody>
      </Modal>
    )

    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument()

    rerender(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalBody>Content</ModalBody>
      </Modal>
    )

    expect(screen.getByTestId('modal-backdrop')).toBeInTheDocument()

    rerender(
      <Modal isOpen={false} onClose={onCloseMock}>
        <ModalBody>Content</ModalBody>
      </Modal>
    )

    expect(screen.queryByTestId('modal-backdrop')).not.toBeInTheDocument()
  })

  it('should handle empty content gracefully', () => {
    render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <ModalBody><></></ModalBody>
      </Modal>
    )

    expect(screen.getByTestId('modal-content')).toBeInTheDocument()
    expect(screen.getByTestId('modal-body')).toBeInTheDocument()
  })

  it('should handle multiple modals (context isolation)', () => {
    const onClose1 = vi.fn()
    const onClose2 = vi.fn()

    render(
      <div>
        <Modal isOpen={true} onClose={onClose1}>
          <ModalHeader>Modal 1</ModalHeader>
        </Modal>
        <Modal isOpen={true} onClose={onClose2}>
          <ModalHeader>Modal 2</ModalHeader>
        </Modal>
      </div>
    )

    const closeButtons = screen.getAllByTestId('modal-close-button')
    expect(closeButtons).toHaveLength(2)
  })
})
