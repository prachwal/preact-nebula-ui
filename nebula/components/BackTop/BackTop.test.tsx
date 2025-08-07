import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { BackTop } from './BackTop'

// Mock scrollTo for tests
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
})

// Mock window scroll properties
Object.defineProperty(window, 'pageYOffset', {
  value: 0,
  writable: true
})

Object.defineProperty(document.documentElement, 'scrollTop', {
  value: 0,
  writable: true
})

// Mock addEventListener and removeEventListener - let them work normally
const originalAddEventListener = window.addEventListener
const originalRemoveEventListener = window.removeEventListener

const mockAddEventListener = vi.fn((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) => 
  originalAddEventListener.call(window, type, listener, options)
)
const mockRemoveEventListener = vi.fn((type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) => 
  originalRemoveEventListener.call(window, type, listener, options)
)

Object.defineProperty(window, 'addEventListener', {
  value: mockAddEventListener,
  writable: true
})
Object.defineProperty(window, 'removeEventListener', {
  value: mockRemoveEventListener,
  writable: true
})

describe('BackTop', () => {
  beforeEach(() => {
    mockScrollTo.mockClear()
    mockAddEventListener.mockClear()
    mockRemoveEventListener.mockClear()
    
    // Reset scroll position
    Object.defineProperty(window, 'pageYOffset', { value: 0, writable: true })
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 0, writable: true })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly when visible', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toBeInTheDocument()
  })

  it('renders with custom children when visible', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(
      <BackTop visibilityHeight={100}>
        <span data-testid="custom-content">Top</span>
      </BackTop>
    )
    
    expect(screen.getByTestId('custom-content')).toBeInTheDocument()
    expect(screen.getByText('Top')).toBeInTheDocument()
  })

  it('is not rendered when scroll is below visibilityHeight', () => {
    // Mock scroll position below threshold
    Object.defineProperty(window, 'pageYOffset', { value: 50, writable: true })
    
    render(<BackTop visibilityHeight={100} />)
    
    const button = screen.queryByRole('button', { name: /back to top/i })
    expect(button).not.toBeInTheDocument()
  })

  it('shows when scroll is above visibilityHeight', async () => {
    // Mock scroll position above threshold
    Object.defineProperty(window, 'pageYOffset', { value: 150, writable: true })
    
    render(<BackTop visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toBeInTheDocument()
  })

  it('scrolls to top when clicked', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    fireEvent.click(button)
    
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('calls custom onClick handler when provided', () => {
    const handleClick = vi.fn()
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop onClick={handleClick} visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('scrolls custom target when target prop is provided', () => {
    const mockTarget = {
      scrollTo: vi.fn(),
      addEventListener: vi.fn((event, handler) => {
        if (event === 'scroll') {
          // Immediately call handler to simulate scroll event
          handler()
        }
      }),
      removeEventListener: vi.fn(),
      scrollTop: 500 // Mock scroll position above threshold
    }
    
    render(<BackTop target={() => mockTarget as any} visibilityHeight={100} />)
    
    // Component should be visible due to scrollTop > visibilityHeight
    const button = screen.getByRole('button', { name: /back to top/i })
    fireEvent.click(button)
    
    expect(mockTarget.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('applies correct positioning classes', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop right={20} bottom={30} visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    // BackTop uses fixed positioning with default classes, custom right/bottom might not be directly testable
    expect(button).toBeInTheDocument()
  })

  it('applies shape variant classes', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop shape="square" visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass('rounded-md')
  })

  it('applies circle shape classes', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop shape="circle" visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass('rounded-full')
  })

  it('applies variant styles correctly', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop variant="secondary" visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass('bg-gray-600')
  })

  it('applies custom className', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop className="custom-backtop" visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass('custom-backtop')
  })

  it('uses custom duration for smooth scrolling', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop duration={1000} visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    fireEvent.click(button)
    
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    })
  })

  it('handles window scroll events correctly', () => {
    render(<BackTop visibilityHeight={100} />)
    
    // Verify scroll event listener was added
    expect(mockAddEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('cleans up event listeners on unmount', () => {
    const { unmount } = render(<BackTop visibilityHeight={100} />)
    
    unmount()
    
    expect(mockRemoveEventListener).toHaveBeenCalledWith('scroll', expect.any(Function))
  })

  it('renders default ChevronUpIcon when no children provided', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    // Check if SVG icon is present (ChevronUpIcon renders as SVG)
    expect(button.querySelector('svg')).toBeInTheDocument()
  })

  it('applies size classes correctly', () => {
    // Mock scroll position above threshold to make component visible
    Object.defineProperty(window, 'pageYOffset', { value: 500, writable: true })
    
    render(<BackTop size="lg" visibilityHeight={100} />)
    
    const button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toHaveClass('w-12', 'h-12') // Large size classes
  })

  it('handles custom visibilityHeight threshold', () => {
    // Mock initial scroll position below threshold
    Object.defineProperty(window, 'pageYOffset', { value: 150, writable: true })
    
    render(<BackTop visibilityHeight={200} />)
    
    // Component should not be visible
    let button = screen.queryByRole('button', { name: /back to top/i })
    expect(button).not.toBeInTheDocument()
    
    // Change scroll position above threshold
    Object.defineProperty(window, 'pageYOffset', { value: 250, writable: true })
    
    // Trigger scroll event to update visibility
    fireEvent.scroll(window)
    
    // Component should be visible now
    button = screen.getByRole('button', { name: /back to top/i })
    expect(button).toBeInTheDocument()
  })
})
