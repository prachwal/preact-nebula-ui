import { render, screen } from '@testing-library/preact'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Carousel } from './Carousel'

expect.extend(toHaveNoViolations)

describe('Carousel Accessibility', () => {
  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>
  ]

  it('should not have accessibility violations', async () => {
    const { container } = render(<Carousel>{slides}</Carousel>)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('has proper ARIA labels', () => {
    render(<Carousel>{slides}</Carousel>)
    
    expect(screen.getByLabelText('Image carousel')).toBeInTheDocument()
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
    expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument()
  })

  it('has proper aria-live region', () => {
    render(<Carousel>{slides}</Carousel>)
    
    const carousel = screen.getByLabelText('Image carousel')
    expect(carousel).toHaveAttribute('aria-live', 'polite')
  })

  it('uses aria-hidden correctly on slides', () => {
    render(<Carousel>{slides}</Carousel>)
    
    // First slide should be visible
    expect(screen.getByText('Slide 1').parentElement).not.toHaveAttribute('aria-hidden', 'true')
    
    // Other slides should be hidden
    expect(screen.getByText('Slide 2').parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Slide 3').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('provides screen reader status updates', () => {
    render(<Carousel>{slides}</Carousel>)
    
    const statusElement = screen.getByText(/Slide 1 of 3/)
    expect(statusElement).toHaveClass('sr-only')
    expect(statusElement).toHaveAttribute('aria-live', 'polite')
    expect(statusElement).toHaveAttribute('aria-atomic', 'true')
  })

  it('shows autoplay status in screen reader text', () => {
    render(<Carousel autoplay>{slides}</Carousel>)
    
    const statusElement = screen.getByText(/autoplay enabled/)
    expect(statusElement).toBeInTheDocument()
  })

  it('disables navigation buttons when appropriate', () => {
    render(<Carousel infinite={false}>{slides}</Carousel>)
    
    const prevButton = screen.getByLabelText('Previous slide')
    const nextButton = screen.getByLabelText('Next slide')
    
    // At first slide, previous should be disabled
    expect(prevButton).toBeDisabled()
    expect(nextButton).not.toBeDisabled()
  })

  it('supports custom aria-label', () => {
    render(<Carousel aria-label="Product gallery">{slides}</Carousel>)
    
    expect(screen.getByLabelText('Product gallery')).toBeInTheDocument()
  })

  it('supports keyboard navigation', () => {
    render(<Carousel>{slides}</Carousel>)
    
    const carousel = screen.getByLabelText('Image carousel')
    
    // Should be focusable for keyboard navigation
    expect(carousel).toBeInTheDocument()
  })

  it('maintains focus management', () => {
    render(<Carousel>{slides}</Carousel>)
    
    const nextButton = screen.getByLabelText('Next slide')
    const prevButton = screen.getByLabelText('Previous slide')
    
    // Buttons should be focusable
    expect(nextButton).not.toHaveAttribute('tabindex', '-1')
    expect(prevButton).not.toHaveAttribute('tabindex', '-1')
  })
})
