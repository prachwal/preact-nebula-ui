import { render, screen, fireEvent } from '@testing-library/preact'
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

describe('Tooltip Basic Tests', () => {
  beforeEach(() => {
    vi.clearAllTimers()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders trigger element', () => {
    render(
      <Tooltip content="Test tooltip">
        <button>Trigger</button>
      </Tooltip>
    )
    
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument()
  })

  it('does not show tooltip when disabled', () => {
    render(
      <Tooltip content="Disabled tooltip" disabled delay={0}>
        <button>Disabled trigger</button>
      </Tooltip>
    )
    
    fireEvent.mouseEnter(screen.getByRole('button'))
    vi.runAllTimers()
    
    expect(screen.queryByText('Disabled tooltip')).not.toBeInTheDocument()
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

  it('cleans up timeouts on unmount', () => {
    const { unmount } = render(
      <Tooltip content="Cleanup tooltip" delay={1000}>
        <button>Cleanup trigger</button>
      </Tooltip>
    )
    
    fireEvent.mouseEnter(screen.getByRole('button'))
    unmount()
    
    // Should not throw errors
    vi.runAllTimers()
  })
})
