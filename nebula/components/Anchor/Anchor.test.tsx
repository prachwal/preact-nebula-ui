import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { Anchor } from './Anchor'
import type { AnchorItem } from './Anchor.types'

// Mock scrollTo for tests
const mockScrollTo = vi.fn()
Object.defineProperty(window, 'scrollTo', {
  value: mockScrollTo,
  writable: true
})

// Mock querySelector
const mockQuerySelector = vi.fn()
Object.defineProperty(document, 'querySelector', {
  value: mockQuerySelector,
  writable: true
})

describe('Anchor', () => {
  const defaultItems: AnchorItem[] = [
    { key: 'section1', href: '#section1', title: 'Section 1' },
    { key: 'section2', href: '#section2', title: 'Section 2' },
    { key: 'section3', href: '#section3', title: 'Section 3' }
  ]

  beforeEach(() => {
    mockScrollTo.mockClear()
    mockQuerySelector.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with items', () => {
    render(<Anchor items={defaultItems} />)
    
    expect(screen.getByText('Section 1')).toBeInTheDocument()
    expect(screen.getByText('Section 2')).toBeInTheDocument()
    expect(screen.getByText('Section 3')).toBeInTheDocument()
  })

  it('renders anchor links with correct href attributes', () => {
    render(<Anchor items={defaultItems} />)
    
    const link1 = screen.getByText('Section 1').closest('a')
    const link2 = screen.getByText('Section 2').closest('a')
    
    expect(link1).toHaveAttribute('href', '#section1')
    expect(link2).toHaveAttribute('href', '#section2')
  })

  it('handles click events and scrolls to target', () => {
    const mockElement = {
      getBoundingClientRect: () => ({ top: 100 }),
      scrollIntoView: vi.fn()
    }
    
    mockQuerySelector.mockReturnValue(mockElement)
    Object.defineProperty(window, 'pageYOffset', { value: 50, writable: true })
    Object.defineProperty(document.documentElement, 'scrollTop', { value: 50, writable: true })

    render(<Anchor items={defaultItems} offsetTop={20} />)
    
    const link = screen.getByText('Section 1')
    fireEvent.click(link)
    
    expect(mockQuerySelector).toHaveBeenCalledWith('#section1')
    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 130, // 100 + 50 - 20
      behavior: 'smooth'
    })
  })

  it('calls onClick callback when provided', () => {
    const handleClick = vi.fn()
    const mockElement = {
      getBoundingClientRect: () => ({ top: 100 }),
      scrollIntoView: vi.fn()
    }
    
    mockQuerySelector.mockReturnValue(mockElement)
    
    render(<Anchor items={defaultItems} onClick={handleClick} />)
    
    const link = screen.getByText('Section 1')
    fireEvent.click(link)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
    expect(handleClick).toHaveBeenCalledWith(
      expect.any(Object),
      defaultItems[0]
    )
  })

  it('does not scroll when clickable is false', () => {
    render(<Anchor items={defaultItems} clickable={false} />)
    
    const link = screen.getByText('Section 1')
    fireEvent.click(link)
    
    expect(mockScrollTo).not.toHaveBeenCalled()
  })

  it('applies vertical direction classes', () => {
    render(<Anchor items={defaultItems} direction="vertical" />)
    
    const anchorContainer = screen.getByLabelText(/page navigation/i)
    expect(anchorContainer).toHaveClass('anchor-vertical')
  })

  it('applies horizontal direction classes', () => {
    render(<Anchor items={defaultItems} direction="horizontal" />)
    
    const anchorContainer = screen.getByLabelText(/page navigation/i)
    expect(anchorContainer).toHaveClass('anchor-horizontal')
  })

  it('shows active indicator for vertical layout', () => {
    render(
      <Anchor 
        items={defaultItems} 
        direction="vertical" 
        activeKey="section2" 
      />
    )
    
    // Check if indicator element exists with the proper classes
    const container = screen.getByLabelText(/page navigation/i)
    const indicator = container.querySelector('.absolute.left-0')
    expect(indicator).toBeInTheDocument()
    expect(indicator).toHaveClass('w-0.5', 'bg-blue-500')
  })

  it('calls onChange when active key changes', () => {
    const handleChange = vi.fn()
    const mockElement = {
      getBoundingClientRect: () => ({ top: 100 }),
      scrollIntoView: vi.fn()
    }
    
    mockQuerySelector.mockReturnValue(mockElement)
    
    render(<Anchor items={defaultItems} onChange={handleChange} />)
    
    const link = screen.getByText('Section 2')
    fireEvent.click(link)
    
    expect(handleChange).toHaveBeenCalledWith('section2')
  })

  it('handles controlled activeKey prop', () => {
    const { rerender } = render(
      <Anchor items={defaultItems} activeKey="section1" />
    )
    
    // Test that the activeKey is controlled
    rerender(<Anchor items={defaultItems} activeKey="section3" />)
    
    // The component should use the provided activeKey
    const activeLink = screen.getByText('Section 3').closest('a')
    expect(activeLink).toHaveClass('text-blue-600')
  })

  it('renders nested items correctly', () => {
    const nestedItems: AnchorItem[] = [
      {
        key: 'parent1',
        href: '#parent1',
        title: 'Parent 1',
        children: [
          { key: 'child1', href: '#child1', title: 'Child 1' },
          { key: 'child2', href: '#child2', title: 'Child 2' }
        ]
      }
    ]
    
    render(<Anchor items={nestedItems} />)
    
    expect(screen.getByText('Parent 1')).toBeInTheDocument()
    expect(screen.getByText('Child 1')).toBeInTheDocument()
    expect(screen.getByText('Child 2')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<Anchor items={defaultItems} className="custom-anchor" />)
    
    const container = screen.getByText('Section 1').closest('.custom-anchor')
    expect(container).toBeInTheDocument()
  })

  it('renders with affix wrapper when affix prop is true', () => {
    render(<Anchor items={defaultItems} affix />)
    
    // Check if the affix wrapper exists
    const container = screen.getByText('Section 1').closest('.relative')
    expect(container).toBeInTheDocument()
  })
})
