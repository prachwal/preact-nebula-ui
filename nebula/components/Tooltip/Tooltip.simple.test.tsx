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

// Simple test to check basic rendering
describe('Tooltip Simple Test', () => {
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

  it('shows tooltip immediately with delay 0', async () => {
    render(
      <Tooltip content="Test tooltip" delay={0}>
        <button>Trigger</button>
      </Tooltip>
    )
    
    const trigger = screen.getByRole('button')
    fireEvent.mouseEnter(trigger)
    
    // No delay, advance timers by 0
    vi.advanceTimersByTime(0)
    
    // Try to find tooltip by content instead of role
    await waitFor(() => {
      expect(screen.getByText('Test tooltip')).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('disabled tooltip does not show', () => {
    render(
      <Tooltip content="Disabled tooltip" disabled delay={0}>
        <button>Disabled trigger</button>
      </Tooltip>
    )
    
    fireEvent.mouseEnter(screen.getByRole('button'))
    vi.advanceTimersByTime(0)
    
    expect(screen.queryByText('Disabled tooltip')).not.toBeInTheDocument()
  })
})
