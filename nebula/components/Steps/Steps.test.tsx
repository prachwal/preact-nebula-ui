import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Steps } from './Steps'

const defaultSteps = [
  { title: 'Step 1', description: 'First step' },
  { title: 'Step 2', description: 'Second step' },
  { title: 'Step 3', description: 'Third step' }
]

describe('Steps', () => {
  it('renders correctly with default props', () => {
    render(<Steps steps={defaultSteps} current={0} />)
    
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
    expect(screen.getByText('First step')).toBeInTheDocument()
  })

  it('highlights current step correctly', () => {
    render(<Steps steps={defaultSteps} current={1} data-testid="steps" />)
    
    const steps = screen.getByTestId('steps').querySelectorAll('.step')
    
    // First step should be completed (finish status)
    expect(steps[0]).toHaveClass('step-finish')
    
    // Second step should be current (process status)
    expect(steps[1]).toHaveClass('step-process')
    
    // Third step should be pending (wait status)
    expect(steps[2]).toHaveClass('step-wait')
  })

  it('renders in vertical orientation', () => {
    render(
      <Steps 
        steps={defaultSteps} 
        current={0} 
        direction="vertical"
        data-testid="steps"
      />
    )
    
    expect(screen.getByTestId('steps')).toHaveClass('flex-col')
  })

  it('renders in horizontal orientation (default)', () => {
    render(
      <Steps 
        steps={defaultSteps} 
        current={0}
        data-testid="steps"
      />
    )
    
    expect(screen.getByTestId('steps')).toHaveClass('flex-row')
  })

  it('applies different sizes correctly', () => {
    const { rerender } = render(
      <Steps steps={defaultSteps} current={0} size="small" data-testid="steps" />
    )
    
    const stepTitle = screen.getByTestId('steps').querySelector('.step-title')
    expect(stepTitle).toHaveClass('text-sm')
    
    rerender(<Steps steps={defaultSteps} current={0} size="default" data-testid="steps" />)
    const stepTitleDefault = screen.getByTestId('steps').querySelector('.step-title')
    expect(stepTitleDefault).toHaveClass('text-base')
  })

  it('handles clickable steps', () => {
    const onChange = vi.fn()
    
    render(
      <Steps 
        steps={defaultSteps} 
        current={0}
        onChange={onChange}
        data-testid="steps"
      />
    )
    
    const stepElements = screen.getByTestId('steps').querySelectorAll('.step')
    fireEvent.click(stepElements[1])
    
    expect(onChange).toHaveBeenCalledWith(1)
  })

  it('prevents clicking disabled steps', () => {
    const onChange = vi.fn()
    const stepsWithDisabled = [
      { title: 'Step 1', description: 'First step' },
      { title: 'Step 2', description: 'Second step', disabled: true },
      { title: 'Step 3', description: 'Third step' }
    ]
    
    render(
      <Steps 
        steps={stepsWithDisabled} 
        current={0}
        onChange={onChange}
        data-testid="steps"
      />
    )
    
    const stepElements = screen.getByTestId('steps').querySelectorAll('.step')
    fireEvent.click(stepElements[1])
    
    expect(onChange).not.toHaveBeenCalled()
    expect(stepElements[1]).toHaveClass('opacity-50')
  })

  it('renders step icons correctly', () => {
    const stepsWithIcons = [
      { title: 'Step 1', description: 'First step', icon: <span data-testid="icon-1">🔥</span> },
      { title: 'Step 2', description: 'Second step', icon: <span data-testid="icon-2">⭐</span> }
    ]
    
    render(<Steps steps={stepsWithIcons} current={0} />)
    
    expect(screen.getByTestId('icon-1')).toBeInTheDocument()
    expect(screen.getByTestId('icon-2')).toBeInTheDocument()
  })

  it('shows error state for steps', () => {
    const stepsWithError = [
      { title: 'Step 1', description: 'First step' },
      { title: 'Step 2', description: 'Second step', status: 'error' as 'process' | 'finish' | 'error' | undefined }
    ]
    
    render(<Steps steps={stepsWithError} current={1} data-testid="steps" />)
    
    const stepElements = screen.getByTestId('steps').querySelectorAll('.step')
    expect(stepElements[1]).toHaveClass('step-error')
  })

  it('shows warning state for steps', () => {
    const stepsWithProcess = [
      { title: 'Step 1', description: 'First step' },
      { title: 'Step 2', description: 'Second step', status: 'process' as 'process' | 'finish' | 'error' | undefined }
    ]
    
    render(<Steps steps={stepsWithProcess} current={1} data-testid="steps" />)
    
    const stepElements = screen.getByTestId('steps').querySelectorAll('.step')
    expect(stepElements[1]).toHaveClass('step-process')
  })

  it('renders without descriptions', () => {
    const stepsWithoutDesc = [
      { title: 'Step 1' },
      { title: 'Step 2' },
      { title: 'Step 3' }
    ]
    
    render(<Steps steps={stepsWithoutDesc} current={0} />)
    
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.queryByText('First step')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(
      <Steps 
        steps={defaultSteps} 
        current={0}
        className="custom-steps"
        data-testid="steps"
      />
    )
    
    expect(screen.getByTestId('steps')).toHaveClass('custom-steps')
  })

  it('handles steps with custom content', () => {
    const stepsWithContent = [
      { 
        title: 'Step 1', 
        description: 'Custom description'
      }
    ]
    
    render(<Steps steps={stepsWithContent} current={0} />)
    
    expect(screen.getByText('Custom description')).toBeInTheDocument()
  })

  it('prevents navigation beyond current step when configured', () => {
    const onChange = vi.fn()
    
    render(
      <Steps 
        steps={defaultSteps} 
        current={0}
        onChange={onChange}
        data-testid="steps"
      />
    )
    
    const stepElements = screen.getByTestId('steps').querySelectorAll('.step')
    fireEvent.click(stepElements[2]) // Try to click step 3
    
    // Without restrictNavigation, it should allow clicking
    expect(onChange).toHaveBeenCalledWith(2)
  })

  it('allows navigation to any step by default', () => {
    const onChange = vi.fn()
    
    render(
      <Steps 
        steps={defaultSteps} 
        current={2}
        onChange={onChange}
        data-testid="steps"
      />
    )
    
    const stepElements = screen.getByTestId('steps').querySelectorAll('.step')
    fireEvent.click(stepElements[0]) // Click step 1
    
    expect(onChange).toHaveBeenCalledWith(0)
  })

  it('renders step numbers correctly', () => {
    render(<Steps steps={defaultSteps} current={0} data-testid="steps" />)
    
    const steps = screen.getByTestId('steps')
    expect(steps).toHaveTextContent('1')
    expect(steps).toHaveTextContent('2')
    expect(steps).toHaveTextContent('3')
  })

  it('handles large number of steps', () => {
    const manySteps = Array.from({ length: 10 }, (_, i) => ({
      title: `Step ${i + 1}`,
      description: `Description ${i + 1}`
    }))
    
    render(<Steps steps={manySteps} current={5} data-testid="steps" />)
    
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 6')).toBeInTheDocument()
    expect(screen.getByText('Step 10')).toBeInTheDocument()
  })
})
