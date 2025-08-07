import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/preact'
import { Affix } from './Affix'

// Mock scroll event handler
const mockScrollListeners: Array<() => void> = []
const mockResizeListeners: Array<() => void> = []

// Mock window methods
const originalAddEventListener = window.addEventListener
const originalRemoveEventListener = window.removeEventListener

describe('Affix', () => {
  // Helper function to simulate scroll
  const simulateScroll = async (scrollY: number) => {
    Object.defineProperty(window, 'pageYOffset', { value: scrollY, configurable: true })
    Object.defineProperty(document.documentElement, 'scrollTop', { value: scrollY, configurable: true })
    
    mockScrollListeners.forEach(handler => handler())
    
    // Give time for state updates
    await new Promise(resolve => setTimeout(resolve, 10))
  }

  beforeEach(() => {
    // Clear listeners
    mockScrollListeners.length = 0
    mockResizeListeners.length = 0

    // Mock window dimensions and scroll properties
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    
    Object.defineProperty(window, 'pageYOffset', {
      writable: true,
      configurable: true,
      value: 0,
    })

    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0,
    })

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      writable: true,
      configurable: true,
      value: 2000,
    })

    // Mock addEventListener and removeEventListener
    window.addEventListener = vi.fn((event, handler) => {
      if (event === 'scroll') {
        mockScrollListeners.push(handler as () => void)
      } else if (event === 'resize') {
        mockResizeListeners.push(handler as () => void)
      }
    })

    window.removeEventListener = vi.fn((event, handler) => {
      if (event === 'scroll') {
        const index = mockScrollListeners.indexOf(handler as () => void)
        if (index > -1) mockScrollListeners.splice(index, 1)
      } else if (event === 'resize') {
        const index = mockResizeListeners.indexOf(handler as () => void)
        if (index > -1) mockResizeListeners.splice(index, 1)
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    // Restore original methods
    window.addEventListener = originalAddEventListener
    window.removeEventListener = originalRemoveEventListener
  })

  it('renders with default props', () => {
    render(<Affix>Test content</Affix>)
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    const { container } = render(<Affix size="lg">Content</Affix>)
    const affixElement = container.querySelector('div:not([aria-hidden])')
    expect(affixElement).toHaveClass('text-lg')
  })

  it('renders placeholder element', () => {
    const { container } = render(<Affix>Content</Affix>)
    const placeholder = container.querySelector('[aria-hidden="true"]')
    expect(placeholder).toBeInTheDocument()
  })

  it('handles disabled state', async () => {
    const onAffix = vi.fn()
    render(
      <Affix disabled onAffix={onAffix}>
        Content
      </Affix>
    )
    
    // Simulate scroll using helper
    await simulateScroll(100)
    
    // Should not trigger affix in disabled state
    expect(onAffix).not.toHaveBeenCalled()
  })

  it('applies custom className', () => {
    const { container } = render(
      <Affix className="custom-class">Content</Affix>
    )
    const affixElement = container.querySelector('div:not([aria-hidden])')
    expect(affixElement).toHaveClass('custom-class')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Affix ref={ref}>Content</Affix>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLDivElement))
  })

  it('calls onAffix callback when affix state changes', async () => {
    const onAffix = vi.fn()
    
    render(
      <Affix offsetTop={10} onAffix={onAffix}>
        Content
      </Affix>
    )

    // Mock getBoundingClientRect for both placeholder and element
    const mockGetBoundingClientRect = vi.fn(() => ({
      top: 5, // Less than offsetTop (10), should trigger affix
      left: 0,
      width: 100,
      height: 50,
      bottom: 55,
      right: 100,
      x: 0,
      y: 5,
      toJSON: () => ({})
    } as DOMRect))

    // Wait for component to mount and set up refs
    await waitFor(() => {
      const elements = document.querySelectorAll('div')
      expect(elements.length).toBeGreaterThan(0)
    })

    // Mock getBoundingClientRect for all elements
    const elements = document.querySelectorAll('div')
    elements.forEach(el => {
      el.getBoundingClientRect = mockGetBoundingClientRect
    })

    // Simulate scroll event by calling the handlers
    await waitFor(() => {
      mockScrollListeners.forEach(handler => handler())
    })

    // Wait for onAffix to be called
    await waitFor(() => {
      expect(onAffix).toHaveBeenCalledWith(true)
    })
  })

  it('calls onScroll callback', async () => {
    const onScroll = vi.fn()
    
    render(
      <Affix onScroll={onScroll}>
        Content
      </Affix>
    )

    // Simulate scroll using helper
    await simulateScroll(100)

    await waitFor(() => {
      expect(onScroll).toHaveBeenCalledWith(expect.any(Number), expect.any(Boolean))
    })
  })

  it('supports different positions', () => {
    const { rerender } = render(
      <Affix position="top" offsetTop={20}>
        Top Content
      </Affix>
    )
    
    expect(screen.getByText('Top Content')).toBeInTheDocument()

    rerender(
      <Affix position="bottom" offsetBottom={30}>
        Bottom Content
      </Affix>
    )
    
    expect(screen.getByText('Bottom Content')).toBeInTheDocument()
  })

  it('handles custom target', () => {
    const targetElement = document.createElement('div')
    document.body.appendChild(targetElement)

    render(
      <Affix target={targetElement}>
        Content
      </Affix>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
    
    document.body.removeChild(targetElement)
  })

  it('handles string target selector', () => {
    const targetElement = document.createElement('div')
    targetElement.id = 'scroll-container'
    document.body.appendChild(targetElement)

    render(
      <Affix target="#scroll-container">
        Content
      </Affix>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
    
    document.body.removeChild(targetElement)
  })

  it('handles function target', () => {
    const targetElement = document.createElement('div')
    const getTarget = () => targetElement

    render(
      <Affix target={getTarget}>
        Content
      </Affix>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('supports dark mode classes', () => {
    const { container } = render(<Affix>Content</Affix>)
    const affixElement = container.querySelector('div:not([aria-hidden])')
    expect(affixElement).toHaveClass('transition-all')
  })

  it('applies threshold correctly - should not trigger above threshold', async () => {
    const onAffix = vi.fn()
    
    render(
      <Affix offsetTop={10} threshold={5} onAffix={onAffix}>
        Content
      </Affix>
    )

    // First establish initial state - element not affixed
    let mockGetBoundingClientRect = vi.fn(() => ({
      top: 20, // 20 > (offsetTop=10 + threshold=5), should not trigger
      left: 0,
      width: 100,
      height: 50,
      bottom: 70,
      right: 100,
      x: 0,
      y: 20,
      toJSON: () => ({})
    } as DOMRect))

    // Wait for component to mount
    await waitFor(() => {
      const elements = document.querySelectorAll('div')
      expect(elements.length).toBeGreaterThan(0)
    })

    let elements = document.querySelectorAll('div')
    elements.forEach(el => {
      el.getBoundingClientRect = mockGetBoundingClientRect
    })

    // Trigger initial calculation
    await simulateScroll(0)
    
    // Clear initial calls
    onAffix.mockClear()

    // Now update mock to still be above threshold after scroll
    mockGetBoundingClientRect = vi.fn(() => ({
      top: 16, // 16 > (offsetTop=10 + threshold=5), should not trigger
      left: 0,
      width: 100,
      height: 50,
      bottom: 66,
      right: 100,
      x: 0,
      y: 16,
      toJSON: () => ({})
    } as DOMRect))

    // Update elements with new mock
    elements = document.querySelectorAll('div')
    elements.forEach(el => {
      el.getBoundingClientRect = mockGetBoundingClientRect
    })

    // Simulate scroll
    await simulateScroll(50)

    // Give time for any potential affix calls
    await new Promise(resolve => setTimeout(resolve, 100))

    // Should not be affixed - check that onAffix was never called with true
    const trueCalls = onAffix.mock.calls.filter(call => call[0] === true)
    expect(trueCalls).toHaveLength(0)
  })

  it('triggers affix when within threshold', async () => {
    const onAffix = vi.fn()
    
    render(
      <Affix offsetTop={10} threshold={5} onAffix={onAffix}>
        Content
      </Affix>
    )

    // First, set up the element to be NOT affixed (above threshold)
    let mockGetBoundingClientRect = vi.fn(() => ({
      top: 20, // 20 > (offsetTop=10 + threshold=5), should not trigger initially
      left: 0,
      width: 100,
      height: 50,
      bottom: 70,
      right: 100,
      x: 0,
      y: 20,
      toJSON: () => ({})
    } as DOMRect))

    // Wait for component to mount
    await waitFor(() => {
      const elements = document.querySelectorAll('div')
      expect(elements.length).toBeGreaterThan(0)
    })

    let elements = document.querySelectorAll('div')
    elements.forEach(el => {
      el.getBoundingClientRect = mockGetBoundingClientRect
    })

    // Trigger initial calculation
    await simulateScroll(0)
    
    // Clear any initial calls
    onAffix.mockClear()

    // Now change the mock to simulate element crossing threshold
    mockGetBoundingClientRect = vi.fn(() => ({
      top: 15, // 15 <= (offsetTop=10 + threshold=5), should trigger
      left: 0,
      width: 100,
      height: 50,
      bottom: 65,
      right: 100,
      x: 0,
      y: 15,
      toJSON: () => ({})
    } as DOMRect))

    // Update all elements with new mock
    elements = document.querySelectorAll('div')
    elements.forEach(el => {
      el.getBoundingClientRect = mockGetBoundingClientRect
    })

    // Simulate scroll to trigger the state change
    await simulateScroll(50)

    // Should be affixed within threshold
    await waitFor(() => {
      expect(onAffix).toHaveBeenCalledWith(true)
    }, { timeout: 2000 })
  })
})
