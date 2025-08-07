import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { vi } from 'vitest'
import { Carousel } from './Carousel'

describe('Carousel', () => {
  const slides = [
    <div key="1">Slide 1</div>,
    <div key="2">Slide 2</div>,
    <div key="3">Slide 3</div>
  ]

  it('renders carousel with slides', () => {
    render(<Carousel>{slides}</Carousel>)
    
    expect(screen.getByText('Slide 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Image carousel')).toBeInTheDocument()
  })

  it('supports size variants', () => {
    const { rerender } = render(<Carousel size="sm">{slides}</Carousel>)
    expect(screen.getByLabelText('Image carousel')).toHaveClass('h-48')

    rerender(<Carousel size="md">{slides}</Carousel>)
    expect(screen.getByLabelText('Image carousel')).toHaveClass('h-64')

    rerender(<Carousel size="lg">{slides}</Carousel>)
    expect(screen.getByLabelText('Image carousel')).toHaveClass('h-80')
  })

  it('shows navigation arrows by default', () => {
    render(<Carousel>{slides}</Carousel>)
    
    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument()
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument()
  })

  it('hides navigation arrows when showArrows is false', () => {
    render(<Carousel showArrows={false}>{slides}</Carousel>)
    
    expect(screen.queryByLabelText('Previous slide')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Next slide')).not.toBeInTheDocument()
  })

  it('shows dots indicator by default', () => {
    render(<Carousel>{slides}</Carousel>)
    
    const dots = screen.getAllByRole('button').filter(button => 
      button.getAttribute('aria-label')?.includes('Go to slide')
    )
    expect(dots).toHaveLength(3)
  })

  it('hides dots when showDots is false', () => {
    render(<Carousel showDots={false}>{slides}</Carousel>)
    
    const dots = screen.queryAllByRole('button').filter(button => 
      button.getAttribute('aria-label')?.includes('Go to slide')
    )
    expect(dots).toHaveLength(0)
  })

  it('navigates to next slide when next button is clicked', async () => {
    const handleSlideChange = vi.fn()
    render(<Carousel onSlideChange={handleSlideChange}>{slides}</Carousel>)
    
    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)
    
    await waitFor(() => {
      expect(handleSlideChange).toHaveBeenCalledWith(1)
    })
  })

  it('navigates to previous slide when prev button is clicked', async () => {
    const handleSlideChange = vi.fn()
    render(<Carousel onSlideChange={handleSlideChange}>{slides}</Carousel>)
    
    // First navigate to slide 2
    const nextButton = screen.getByLabelText('Next slide')
    fireEvent.click(nextButton)
    
    await waitFor(() => {
      expect(handleSlideChange).toHaveBeenCalledWith(1)
    })
    
    // Then navigate back to slide 1
    const prevButton = screen.getByLabelText('Previous slide')
    fireEvent.click(prevButton)
    
    await waitFor(() => {
      expect(handleSlideChange).toHaveBeenCalledWith(0)
    })
  })

  it('navigates to specific slide when dot is clicked', async () => {
    const handleSlideChange = vi.fn()
    render(<Carousel onSlideChange={handleSlideChange}>{slides}</Carousel>)
    
    const thirdDot = screen.getByLabelText('Go to slide 3')
    fireEvent.click(thirdDot)
    
    await waitFor(() => {
      expect(handleSlideChange).toHaveBeenCalledWith(2)
    })
  })

  it('supports keyboard navigation', async () => {
    const handleSlideChange = vi.fn()
    render(<Carousel onSlideChange={handleSlideChange}>{slides}</Carousel>)
    
    // Navigate right with arrow key
    fireEvent.keyDown(document, { key: 'ArrowRight' })
    
    await waitFor(() => {
      expect(handleSlideChange).toHaveBeenCalledWith(1)
    })
    
    // Navigate left with arrow key
    fireEvent.keyDown(document, { key: 'ArrowLeft' })
    
    await waitFor(() => {
      expect(handleSlideChange).toHaveBeenCalledWith(0)
    })
  })

  it('supports infinite scroll', async () => {
    const handleSlideChange = vi.fn()
    render(<Carousel infinite onSlideChange={handleSlideChange}>{slides}</Carousel>)
    
    // Should be able to go from last slide to first
    const nextButton = screen.getByLabelText('Next slide')
    
    // Go to slide 2
    fireEvent.click(nextButton)
    await waitFor(() => expect(handleSlideChange).toHaveBeenCalledWith(1))
    
    // Go to slide 3 
    fireEvent.click(nextButton)
    await waitFor(() => expect(handleSlideChange).toHaveBeenCalledWith(2))
    
    // Go back to slide 1 (infinite)
    fireEvent.click(nextButton)
    await waitFor(() => expect(handleSlideChange).toHaveBeenCalledWith(0))
  })

  it('supports autoplay', async () => {
    vi.useFakeTimers()
    const handleSlideChange = vi.fn()
    
    render(
      <Carousel 
        autoplay 
        interval={1000} 
        onSlideChange={handleSlideChange}
      >
        {slides}
      </Carousel>
    )
    
    // Should show play/pause button
    expect(screen.getByLabelText('Pause autoplay')).toBeInTheDocument()
    
    // Advance time and check if slide changes
    vi.advanceTimersByTime(1000)
    
    await waitFor(() => {
      expect(handleSlideChange).toHaveBeenCalledWith(1)
    })
    
    vi.useRealTimers()
  })

  it('supports multiple slides to show', () => {
    render(<Carousel slidesToShow={2}>{slides}</Carousel>)
    
    // Should still show dots but fewer of them
    const dots = screen.getAllByRole('button').filter(button => 
      button.getAttribute('aria-label')?.includes('Go to slide')
    )
    expect(dots).toHaveLength(2) // Math.ceil(3/2) = 2
  })

  it('applies custom className', () => {
    render(
      <Carousel className="custom-carousel">{slides}</Carousel>
    )
    
    expect(screen.getByLabelText('Image carousel')).toHaveClass('custom-carousel')
  })

  it('forwards ref correctly', () => {
    const ref = vi.fn()
    render(<Carousel ref={ref}>{slides}</Carousel>)
    
    expect(ref).toHaveBeenCalled()
  })
})
