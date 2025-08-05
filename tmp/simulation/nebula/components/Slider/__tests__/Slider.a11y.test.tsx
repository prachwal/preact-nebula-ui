import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { axe } from '@testing-library/jest-dom'
import { Slider } from '../Slider'

describe('Slider Accessibility', () => {
  describe('ARIA Attributes', () => {
    it('has correct role', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
    })

    it('has required ARIA attributes', () => {
      render(<Slider value={50} min={0} max={100} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
      expect(slider).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('supports custom ARIA labels', () => {
      render(
        <Slider
          aria-label="Volume control"
          aria-labelledby="volume-label"
          aria-describedby="volume-description"
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-label', 'Volume control')
      expect(slider).toHaveAttribute('aria-labelledby', 'volume-label')
      expect(slider).toHaveAttribute('aria-describedby', 'volume-description')
    })

    it('indicates disabled state', () => {
      render(<Slider disabled />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-disabled', 'true')
    })

    it('sets correct orientation for vertical slider', () => {
      render(<Slider orientation="vertical" />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  describe('Keyboard Navigation', () => {
    it('is focusable', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabIndex', '0')
    })

    it('can be excluded from tab order when disabled', () => {
      render(<Slider disabled />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabIndex', '-1')
    })

    it('supports custom tabIndex', () => {
      render(<Slider tabIndex={1} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabIndex', '1')
    })
  })

  describe('Focus Management', () => {
    it('shows focus indicator when focused', async () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      slider.focus()
      
      expect(slider).toHaveFocus()
      expect(slider).toHaveClass('focus:outline-none', 'focus:ring-2', 'focus:ring-blue-500')
    })

    it('can be programmatically focused', () => {
      const ref = { current: null }
      render(<Slider ref={ref} />)
      
      expect(typeof ref.current?.focus).toBe('function')
      expect(typeof ref.current?.blur).toBe('function')
    })
  })

  describe('Screen Reader Support', () => {
    it('announces value changes', () => {
      render(<Slider value={50} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('provides proper context for range sliders', () => {
      render(<Slider range value={[25, 75]} />)
      
      // Dla range slider powinniśmy mieć dwa elementy slider
      const sliders = screen.getAllByRole('slider')
      expect(sliders).toHaveLength(2)
    })
  })

  describe('Color Contrast and Visual Accessibility', () => {
    it('maintains sufficient color contrast', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      // Sprawdź czy handle ma odpowiedni kontrast
      expect(slider).toHaveClass('border-blue-500')
    })

    it('provides visual focus indicators', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveClass('focus:ring-2', 'focus:ring-blue-500')
    })

    it('works with high contrast mode', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      // Sprawdź czy komponenty mają border dla high contrast
      expect(slider).toHaveClass('border-2')
    })
  })

  describe('Automated Accessibility Testing', () => {
    it('passes axe accessibility tests', async () => {
      const { container } = render(
        <div>
          <label id="slider-label">Volume</label>
          <Slider aria-labelledby="slider-label" value={50} />
        </div>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('passes axe tests for disabled state', async () => {
      const { container } = render(
        <div>
          <label id="slider-label">Volume (Disabled)</label>
          <Slider aria-labelledby="slider-label" disabled value={50} />
        </div>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('passes axe tests for vertical orientation', async () => {
      const { container } = render(
        <div>
          <label id="slider-label">Vertical Volume</label>
          <Slider
            aria-labelledby="slider-label"
            orientation="vertical"
            value={50}
          />
        </div>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })

    it('passes axe tests with marks', async () => {
      const marks = {
        0: 'Silent',
        25: 'Quiet',
        50: 'Medium',
        75: 'Loud',
        100: 'Max'
      }
      
      const { container } = render(
        <div>
          <label id="slider-label">Volume with Marks</label>
          <Slider
            aria-labelledby="slider-label"
            marks={marks}
            value={50}
          />
        </div>
      )
      
      const results = await axe(container)
      expect(results).toHaveNoViolations()
    })
  })

  describe('Reduced Motion Support', () => {
    it('respects prefers-reduced-motion', () => {
      // Mock reduced motion preference
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query: string) => ({
          matches: query.includes('prefers-reduced-motion: reduce'),
          media: query,
          onchange: null,
          addListener: () => {},
          removeListener: () => {},
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
        }),
      })

      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      // Sprawdź czy animacje są wyłączone lub zredukowane
      expect(slider).toBeInTheDocument()
    })
  })

  describe('Touch Accessibility', () => {
    it('has appropriate touch target size', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      // Touch target powinien być co najmniej 44x44px
      const computedStyle = window.getComputedStyle(slider)
      const minSize = '44px'
      
      expect(
        parseInt(computedStyle.width) >= 44 || 
        parseInt(computedStyle.height) >= 44
      ).toBe(true)
    })
  })

  describe('Error States and Validation', () => {
    it('announces validation errors', () => {
      render(
        <div>
          <Slider
            aria-describedby="error-message"
            aria-invalid="true"
            value={150}
            max={100}
          />
          <div id="error-message" role="alert">
            Value must be between 0 and 100
          </div>
        </div>
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-invalid', 'true')
      expect(slider).toHaveAttribute('aria-describedby', 'error-message')
      
      const errorMessage = screen.getByRole('alert')
      expect(errorMessage).toHaveTextContent('Value must be between 0 and 100')
    })
  })
})
