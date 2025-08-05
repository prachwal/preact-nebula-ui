import { render, screen, fireEvent } from '@testing-library/preact'
import { expect, describe, it, vi } from 'vitest'
import { Slider } from './Slider'

describe('Slider', () => {
  describe('Basic Functionality', () => {
    it('renders with default props', () => {
      render(<Slider onChange={() => {}} />)
      const sliders = screen.getAllByRole('slider')
      expect(sliders).toHaveLength(1) // Only thumb element
    })

    it('displays initial value correctly', () => {
      render(<Slider value={50} onChange={() => {}} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('calls onChange when value changes', () => {
      const handleChange = vi.fn()
      render(<Slider value={25} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).toHaveBeenCalledWith(26)
    })

    it('respects min and max bounds', () => {
      const handleChange = vi.fn()
      render(<Slider value={0} min={0} max={100} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowLeft' })
      
      // Should not go below min
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('applies step increments correctly', () => {
      const handleChange = vi.fn()
      render(<Slider value={0} step={5} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).toHaveBeenCalledWith(5)
    })
  })

  describe('Range Mode', () => {
    it('renders two thumbs in range mode', () => {
      render(<Slider range value={[25, 75]} onChange={() => {}} />)
      const sliders = screen.getAllByRole('slider')
      expect(sliders).toHaveLength(2) // Two thumbs
    })

    it('handles range value updates', () => {
      const handleChange = vi.fn()
      render(<Slider range value={[25, 75]} onChange={handleChange} />)
      
      const sliders = screen.getAllByRole('slider')
      const lowerThumb = sliders[0] // First thumb
      
      fireEvent.keyDown(lowerThumb, { key: 'ArrowRight' })
      
      expect(handleChange).toHaveBeenCalledWith([26, 75])
    })

    it('respects minimum distance in range mode', () => {
      const handleChange = vi.fn()
      render(
        <Slider 
          range 
          value={[25, 30]} 
          minDistance={10} 
          onChange={handleChange} 
        />
      )
      
      const sliders = screen.getAllByRole('slider')
      const lowerThumb = sliders[0]
      
      // Try to move lower thumb too close to upper thumb
      fireEvent.keyDown(lowerThumb, { key: 'ArrowRight' })
      fireEvent.keyDown(lowerThumb, { key: 'ArrowRight' })
      fireEvent.keyDown(lowerThumb, { key: 'ArrowRight' })
      fireEvent.keyDown(lowerThumb, { key: 'ArrowRight' })
      fireEvent.keyDown(lowerThumb, { key: 'ArrowRight' })
      
      // Should be constrained by minDistance
      expect(handleChange).toHaveBeenLastCalledWith([20, 30])
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      const { container } = render(<Slider size="sm" onChange={() => {}} />)
      expect(container.firstChild).toHaveClass('h-6')
    })

    it('applies medium size classes (default)', () => {
      const { container } = render(<Slider size="md" onChange={() => {}} />)
      expect(container.firstChild).toHaveClass('h-8')
    })

    it('applies large size classes', () => {
      const { container } = render(<Slider size="lg" onChange={() => {}} />)
      expect(container.firstChild).toHaveClass('h-10')
    })
  })

  describe('Orientation', () => {
    it('applies horizontal orientation (default)', () => {
      render(<Slider onChange={() => {}} />)
      const slider = screen.getByRole('slider')
      // Check that it has correct ARIA attribute through the thumb
      expect(slider).toHaveAttribute('aria-valuemin', '0')
    })

    it('applies vertical orientation', () => {
      render(<Slider orientation="vertical" onChange={() => {}} />)
      const slider = screen.getByRole('slider')
      // Check that it renders without errors
      expect(slider).toHaveAttribute('aria-valuemin', '0')
    })

    it('applies vertical layout classes', () => {
      const { container } = render(<Slider orientation="vertical" onChange={() => {}} />)
      expect(container.firstChild).toHaveClass('flex-col')
    })
  })

  describe('Disabled State', () => {
    it('applies disabled styling', () => {
      const { container } = render(<Slider disabled onChange={() => {}} />)
      expect(container.firstChild).toHaveClass('opacity-50', 'cursor-not-allowed')
    })

    it('ignores keyboard events when disabled', () => {
      const handleChange = vi.fn()
      render(<Slider disabled value={50} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).not.toHaveBeenCalled()
    })

    it('sets tabIndex to -1 when disabled', () => {
      render(<Slider disabled onChange={() => {}} />)
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabIndex', '-1')
    })
  })

  describe('Error State', () => {
    it('applies error styling', () => {
      const { container } = render(<Slider error onChange={() => {}} />)
      expect(container.firstChild).toHaveClass('text-red-600')
    })

    it('displays error message', () => {
      render(<Slider error errorMessage="Invalid value" onChange={() => {}} />)
      expect(screen.getByText('Invalid value')).toBeInTheDocument()
    })
  })

  describe('Marks', () => {
    it('renders simple marks', () => {
      const { container } = render(
        <Slider marks={[0, 25, 50, 75, 100]} onChange={() => {}} />
      )
      
      // Should render 5 mark dots
      const marks = container.querySelectorAll('.bg-gray-400.rounded-full')
      expect(marks).toHaveLength(5)
    })

    it('renders marks with labels', () => {
      const marks = [
        { value: 0, label: 'Min' },
        { value: 100, label: 'Max' }
      ]
      
      render(<Slider marks={marks} onChange={() => {}} />)
      
      expect(screen.getByText('Min')).toBeInTheDocument()
      expect(screen.getByText('Max')).toBeInTheDocument()
    })
  })

  describe('Keyboard Navigation', () => {
    it('handles arrow key navigation', () => {
      const handleChange = vi.fn()
      render(<Slider value={50} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      expect(handleChange).toHaveBeenCalledWith(51)
      
      fireEvent.keyDown(slider, { key: 'ArrowLeft' })
      expect(handleChange).toHaveBeenCalledWith(49)
    })

    it('handles page up/down for larger increments', () => {
      const handleChange = vi.fn()
      render(<Slider value={50} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      
      fireEvent.keyDown(slider, { key: 'PageUp' })
      expect(handleChange).toHaveBeenCalledWith(60)
      
      fireEvent.keyDown(slider, { key: 'PageDown' })
      expect(handleChange).toHaveBeenCalledWith(40)
    })

    it('handles home/end keys', () => {
      const handleChange = vi.fn()
      render(<Slider value={50} min={0} max={100} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      
      fireEvent.keyDown(slider, { key: 'Home' })
      expect(handleChange).toHaveBeenCalledWith(0)
      
      fireEvent.keyDown(slider, { key: 'End' })
      expect(handleChange).toHaveBeenCalledWith(100)
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Slider 
          value={50}
          min={0}
          max={100}
          aria-label="Volume control"
          onChange={() => {}}
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-label', 'Volume control')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('has proper aria-valuetext for range sliders', () => {
      render(<Slider range value={[25, 75]} onChange={() => {}} />)
      
      const sliders = screen.getAllByRole('slider')
      expect(sliders).toHaveLength(2)
      
      // Check that both thumbs have proper labels
      expect(sliders[0]).toHaveAttribute('aria-label', 'Lower value: 25')
      expect(sliders[1]).toHaveAttribute('aria-label', 'Upper value: 75')
    })

    it('sets proper attributes when disabled', () => {
      render(<Slider disabled onChange={() => {}} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabIndex', '-1')
    })
  })

  describe('Uncontrolled Mode', () => {
    it('works with defaultValue', () => {
      render(<Slider defaultValue={30} onChange={() => {}} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '30')
    })

    it('updates internal state in uncontrolled mode', () => {
      const handleChange = vi.fn()
      render(<Slider defaultValue={30} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      fireEvent.keyDown(slider, { key: 'ArrowRight' })
      
      expect(handleChange).toHaveBeenCalledWith(31)
      expect(slider).toHaveAttribute('aria-valuenow', '31')
    })
  })
})
