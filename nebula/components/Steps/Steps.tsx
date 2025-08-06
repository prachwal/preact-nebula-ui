import { forwardRef, useImperativeHandle } from 'preact/compat'
import { cn } from '../../utils/cn'
import { Step } from './Step'
import { useSteps } from './useSteps'
import type { StepsProps, StepsRef, StepItem, StepStatus } from './types'

export const Steps = forwardRef<StepsRef, StepsProps>((props, ref) => {
  const {
    children,
    steps = [],
    current: controlledCurrent,
    onChange,
    direction = 'horizontal',
    status = 'process',
    size = 'default',
    className,
    progressDot = false,
    ...rest
  } = props

  // Determine steps data from props or children
  const stepsData: StepItem[] = steps.length > 0 ? steps : []
  const totalSteps = stepsData.length

  const {
    current,
    goTo,
    next,
    prev,
  } = useSteps({
    current: controlledCurrent,
    total: totalSteps,
    onChange,
  })

  useImperativeHandle(ref, () => ({
    goTo,
    next,
    prev,
    getCurrentStep: () => current,
    getTotalSteps: () => totalSteps,
  }), [goTo, next, prev, current, totalSteps])

  const getStepStatus = (stepIndex: number): StepStatus => {
    if (stepIndex < current) return 'finish'
    if (stepIndex === current) return status
    return 'wait'
  }

  const canNavigateToStep = (stepIndex: number) => {
    return stepIndex <= current
  }

  const handleStepClick = (stepIndex: number) => {
    if (canNavigateToStep(stepIndex)) {
      goTo(stepIndex)
    }
  }

  const stepsClasses = cn(
    'nebula-steps',
    'flex',
    {
      'flex-row items-center': direction === 'horizontal',
      'flex-col items-start': direction === 'vertical',
    },
    className
  )

  return (
    <div
      className={stepsClasses}
      role="progressbar"
      aria-label={`Step ${current + 1} of ${totalSteps}: ${stepsData[current]?.title || ''}`}
      {...rest}
    >
      {stepsData.map((step, index) => {
        const stepStatus = step.status || getStepStatus(index)
        const isLast = index === totalSteps - 1
        
        return (
          <Step
            key={step.key || `step-${index}`}
            title={step.title}
            description={step.description}
            icon={step.icon}
            status={stepStatus}
            disabled={step.disabled}
            index={index}
            isLast={isLast}
            direction={direction}
            size={size}
            progressDot={progressDot}
            onClick={onChange ? () => handleStepClick(index) : undefined}
          />
        )
      })}
      
      {children && (
        <div className="nebula-steps-content">
          {children}
        </div>
      )}
    </div>
  )
})

Steps.displayName = 'Steps'
