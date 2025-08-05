import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/preact'
import { userEvent } from '@testing-library/user-event'
import { Slider } from '../Slider'

describe('Slider', () => {
  let user: ReturnType<typeof userEvent.setup>

  beforeEach(() => {
    user = userEvent.setup()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
      expect(slider).toHaveAttribute('aria-valuenow', '0')
    })

    it('renders with custom min, max, and value', () => {
      render(<Slider min={10} max={50} value={25} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuemin', '10')
      expect(slider).toHaveAttribute('aria-valuemax', '50')
      expect(slider).toHaveAttribute('aria-valuenow', '25')
    })

    it('applies custom className', () => {
      render(<Slider className="custom-class" />)
      
      const container = screen.getByRole('slider').closest('div')
      expect(container).toHaveClass('custom-class')
    })

    it('applies custom style', () => {
      const customStyle = { backgroundColor: 'red' }
      render(<Slider style={customStyle} />)
      
      const container = screen.getByRole('slider').closest('div')
      expect(container).toHaveStyle('background-color: red')
    })
  })

  describe('Size Variants', () => {
    it.each(['xs', 'sm', 'md', 'lg', 'xl'] as const)('renders %s size correctly', (size) => {
      render(<Slider size={size} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toBeInTheDocument()
      // Sprawdź czy odpowiednie klasy CSS zostały zastosowane
    })
  })

  describe('Orientation', () => {
    it('renders horizontal orientation by default', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-orientation', 'horizontal')
    })

    it('renders vertical orientation when specified', () => {
      render(<Slider orientation="vertical" />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-orientation', 'vertical')
    })
  })

  describe('Disabled State', () => {
    it('applies disabled state correctly', () => {
      render(<Slider disabled />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-disabled', 'true')
      expect(slider).toHaveAttribute('tabIndex', '-1')
    })

    it('does not respond to interactions when disabled', async () => {
      const handleChange = vi.fn()
      render(<Slider disabled onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      await user.click(slider)
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Value Management', () => {
    it('works as uncontrolled component', () => {
      const handleChange = vi.fn()
      render(<Slider defaultValue={30} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '30')
    })

    it('works as controlled component', () => {
      const handleChange = vi.fn()
      const { rerender } = render(<Slider value={20} onChange={handleChange} />)
      
      let slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '20')
      
      rerender(<Slider value={40} onChange={handleChange} />)
      
      slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-valuenow', '40')
    })

    it('respects min and max boundaries', () => {
      const handleChange = vi.fn()
      render(<Slider min={10} max={90} value={5} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      // Wartość powinna być przycięta do min
      expect(slider).toHaveAttribute('aria-valuenow', '10')
    })
  })

  describe('Keyboard Navigation', () => {
    it('increases value with ArrowRight', async () => {
      const handleChange = vi.fn()
      render(<Slider value={50} step={10} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      slider.focus()
      
      await user.keyboard('{ArrowRight}')
      
      expect(handleChange).toHaveBeenCalledWith(60)
    })

    it('decreases value with ArrowLeft', async () => {
      const handleChange = vi.fn()
      render(<Slider value={50} step={10} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      slider.focus()
      
      await user.keyboard('{ArrowLeft}')
      
      expect(handleChange).toHaveBeenCalledWith(40)
    })

    it('goes to minimum with Home key', async () => {
      const handleChange = vi.fn()
      render(<Slider value={50} min={10} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      slider.focus()
      
      await user.keyboard('{Home}')
      
      expect(handleChange).toHaveBeenCalledWith(10)
    })

    it('goes to maximum with End key', async () => {
      const handleChange = vi.fn()
      render(<Slider value={50} max={90} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      slider.focus()
      
      await user.keyboard('{End}')
      
      expect(handleChange).toHaveBeenCalledWith(90)
    })

    it('can be disabled for keyboard navigation', async () => {
      const handleChange = vi.fn()
      render(<Slider value={50} keyboard={false} onChange={handleChange} />)
      
      const slider = screen.getByRole('slider')
      slider.focus()
      
      await user.keyboard('{ArrowRight}')
      
      expect(handleChange).not.toHaveBeenCalled()
    })
  })

  describe('Mouse Interaction', () => {
    it('changes value on track click', async () => {
      const handleChange = vi.fn()
      render(<Slider onChange={handleChange} />)
      
      const track = screen.getByRole('slider').closest('.relative')
      
      // Symuluj kliknięcie w środek paska
      const rect = { left: 0, top: 0, width: 200, height: 20 }
      vi.spyOn(track!, 'getBoundingClientRect').mockReturnValue(rect as DOMRect)
      
      fireEvent.mouseDown(track!, { clientX: 100, clientY: 10 })
      
      expect(handleChange).toHaveBeenCalled()
    })

    it('calls onBeforeChange when dragging starts', async () => {
      const handleBeforeChange = vi.fn()
      const handleChange = vi.fn()
      render(<Slider onBeforeChange={handleBeforeChange} onChange={handleChange} />)
      
      const track = screen.getByRole('slider').closest('.relative')
      fireEvent.mouseDown(track!, { clientX: 50 })
      
      expect(handleBeforeChange).toHaveBeenCalled()
    })

    it('calls onChangeComplete when dragging ends', async () => {
      const handleChangeComplete = vi.fn()
      render(<Slider onChangeComplete={handleChangeComplete} />)
      
      const track = screen.getByRole('slider').closest('.relative')
      fireEvent.mouseDown(track!, { clientX: 50 })
      fireEvent.mouseUp(document)
      
      expect(handleChangeComplete).toHaveBeenCalled()
    })
  })

  describe('Step Behavior', () => {
    it('snaps to step increments', () => {
      const handleChange = vi.fn()
      render(<Slider step={25} onChange={handleChange} />)
      
      const track = screen.getByRole('slider').closest('.relative')
      const rect = { left: 0, top: 0, width: 100, height: 20 }
      vi.spyOn(track!, 'getBoundingClientRect').mockReturnValue(rect as DOMRect)
      
      // Kliknij w pozycji 30% (powinno snapować do 25)
      fireEvent.mouseDown(track!, { clientX: 30 })
      
      expect(handleChange).toHaveBeenCalledWith(25)
    })
  })

  describe('Marks', () => {
    it('renders marks when provided', () => {
      const marks = { 0: 'Start', 50: 'Middle', 100: 'End' }
      render(<Slider marks={marks} />)
      
      expect(screen.getByText('Start')).toBeInTheDocument()
      expect(screen.getByText('Middle')).toBeInTheDocument()
      expect(screen.getByText('End')).toBeInTheDocument()
    })

    it('renders dots when marks is true', () => {
      render(<Slider marks />)
      
      // Sprawdź czy znaczniki zostały wyrenderowane
      const container = screen.getByRole('slider').closest('div')
      expect(container?.querySelector('.absolute.inset-0')).toBeInTheDocument()
    })
  })

  describe('Tooltip', () => {
    it('shows tooltip when tooltip prop is "always"', () => {
      render(<Slider value={50} tooltip="always" />)
      
      expect(screen.getByText('50')).toBeInTheDocument()
    })

    it('shows tooltip on focus when tooltip is true', async () => {
      render(<Slider value={50} tooltip />)
      
      const slider = screen.getByRole('slider')
      await user.click(slider)
      
      expect(screen.getByText('50')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Slider
          aria-label="Volume"
          aria-describedby="volume-help"
          value={50}
          min={0}
          max={100}
        />
      )
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('aria-label', 'Volume')
      expect(slider).toHaveAttribute('aria-describedby', 'volume-help')
      expect(slider).toHaveAttribute('aria-valuemin', '0')
      expect(slider).toHaveAttribute('aria-valuemax', '100')
      expect(slider).toHaveAttribute('aria-valuenow', '50')
    })

    it('is focusable by default', () => {
      render(<Slider />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabIndex', '0')
    })

    it('can have custom tabIndex', () => {
      render(<Slider tabIndex={1} />)
      
      const slider = screen.getByRole('slider')
      expect(slider).toHaveAttribute('tabIndex', '1')
    })
  })

  describe('Imperative API', () => {
    it('exposes focus and blur methods', () => {
      const ref = { current: null }
      render(<Slider ref={ref} />)
      
      expect(ref.current).toHaveProperty('focus')
      expect(ref.current).toHaveProperty('blur')
      expect(ref.current).toHaveProperty('getValue')
      expect(ref.current).toHaveProperty('setValue')
    })

    it('getValue returns current value', () => {
      const ref = { current: null }
      render(<Slider ref={ref} value={75} />)
      
      expect(ref.current?.getValue()).toBe(75)
    })

    it('setValue updates the value', () => {
      const handleChange = vi.fn()
      const ref = { current: null }
      render(<Slider ref={ref} onChange={handleChange} />)
      
      ref.current?.setValue(60)
      
      expect(handleChange).toHaveBeenCalledWith(60)
    })
  })
})
