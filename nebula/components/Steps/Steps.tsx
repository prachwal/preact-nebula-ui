import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'preact/compat';
import { cn } from '../../utils/cn';
import { Step } from './Step';
import { useSteps } from './useSteps';
import type { StepsProps, StepsRef, StepItem, StepStatus } from './types';
import './Steps.css'

// Debug flag - set to true to enable debugging
const DEBUG_STEPS = false

// Debug utility
const debug = (...args: any[]) => {
  if (DEBUG_STEPS) {
    console.log('[STEPS DEBUG]', ...args)
  }
}

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

  // Refs for dynamic line calculation
  const stepsContainerRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLElement | null)[]>([])
  const [stepPositions, setStepPositions] = useState<{ x: number; width: number }[]>([])

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

  // Calculate step positions for dynamic line drawing
  useEffect(() => {
    const calculatePositions = () => {
      if (stepRefs.current.length === totalSteps && direction === 'horizontal') {
        const positions = stepRefs.current.map((ref, index) => {
          if (ref) {
            // Tak jak w React przykładzie - bierzemy pozycję całego Step komponentu
            const rect = ref.getBoundingClientRect()
            const containerRect = stepsContainerRef.current?.getBoundingClientRect()

            if (containerRect) {
              // Pozycja X to środek Step komponentu (tak jak w React przykładzie)
              const x = rect.left - containerRect.left + rect.width / 2
              debug(`Step ${index}: Using step center at x=${x}`)
              return {
                x,
                width: rect.width
              }
            }
          }
          return { x: 0, width: 0 }
        })
        debug('Final positions:', positions)
        setStepPositions(positions)
      }
    }

    calculatePositions()

    // Dodajemy opóźnione wywołanie na wypadek, gdyby DOM nie był jeszcze gotowy
    const timeoutId = setTimeout(calculatePositions, 100)

    window.addEventListener('resize', calculatePositions)

    return () => {
      window.removeEventListener('resize', calculatePositions)
      clearTimeout(timeoutId)
    }
  }, [totalSteps, direction])

  // Dodatkowy useEffect który reaguje na zmiany refs
  useEffect(() => {
    if (stepRefs.current.length === totalSteps) {
      // Przelicz pozycje gdy wszystkie refs są ustawione
      const calculatePositions = () => {
        if (direction === 'horizontal') {
          const positions = stepRefs.current.map((ref) => {
            if (ref) {
              const rect = ref.getBoundingClientRect()
              const containerRect = stepsContainerRef.current?.getBoundingClientRect()

              if (containerRect) {
                const x = rect.left - containerRect.left + rect.width / 2
                return { x, width: rect.width }
              }
            }
            return { x: 0, width: 0 }
          })
          setStepPositions(positions)
        }
      }

      setTimeout(calculatePositions, 50)
    }
  }, [stepRefs.current.length, totalSteps, direction])

  // Set step reference
  const setStepRef = (index: number) => (el: HTMLElement | null) => {
    stepRefs.current[index] = el
  }

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
    // Allow navigation to any step by default
    return stepIndex >= 0 && stepIndex < totalSteps
  }

  const handleStepClick = (stepIndex: number) => {
    if (canNavigateToStep(stepIndex)) {
      goTo(stepIndex)
    }
  }

  const stepsClasses = cn(
    'nebula-steps',
    'flex w-full relative',
    {
      'flex-row items-start justify-between': direction === 'horizontal',
      'flex-col items-start space-y-4': direction === 'vertical',
    },
    className
  )

  return (
    <div
      ref={stepsContainerRef}
      className={stepsClasses}
      role="progressbar"
      aria-label={`Step ${current + 1} of ${totalSteps}: ${stepsData[current]?.title || ''}`}
      {...rest}
    >
      {/* Dynamic connecting lines */}
      {direction === 'horizontal' && stepPositions.length > 1 && stepPositions.map((position, index) => {
        if (index < stepPositions.length - 1) {
          const nextPosition = stepPositions[index + 1]
          const lineLeft = position.x
          const lineWidth = nextPosition.x - position.x
          const stepStatus = stepsData[index]?.status || getStepStatus(index)
          const isCompleted = stepStatus === 'finish'

          return (
            <div
              key={`line-${index}`}
              className="steps-dynamic-line"
              style={{
                '--line-left': `${lineLeft}px`,
                '--line-width': `${lineWidth}px`,
                '--line-color': isCompleted ? '#10b981' : '#d1d5db',
                '--line-progress': isCompleted ? '100%' : '0%'
              } as any}
            />
          )
        }
        return null
      })}

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
            totalSteps={totalSteps}
            direction={direction}
            size={size}
            progressDot={progressDot}
            onClick={onChange ? () => handleStepClick(index) : undefined}
            ref={setStepRef(index)}
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
