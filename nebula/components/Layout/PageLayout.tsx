import { forwardRef } from 'preact/compat'
import { route } from 'preact-router'
import { cn } from '../../utils/cn'
import { Container } from '../Container'
import { Heading, Text } from '../Typography'
import { Card, CardHeader, CardBody } from '../Card'
import type { PageLayoutProps, SectionProps } from './PageLayout.types'

export const PageLayout = forwardRef<HTMLDivElement, PageLayoutProps>(
  ({ 
    type = 'component-demo',
    title,
    description,
    showBack = true,
    backUrl = '/',
    backLabel = 'Back to Components',
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    const handleBackClick = () => {
      route(backUrl)
    }

    return (
      <div ref={ref} className={cn('min-h-screen bg-gray-50 dark:bg-gray-900', className)} data-testid={testId} {...props}>
        <Container size="2xl" className="py-8">
          {/* Page Header */}
          {(title || description || showBack) && (
            <div className="mb-8">
              {showBack && (
                <button 
                  onClick={handleBackClick}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4 inline-flex items-center transition-colors"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  {backLabel}
                </button>
              )}
              
              {title && (
                <Heading level={1} size="4xl" className="mb-4">
                  {title}
                </Heading>
              )}
              
              {description && (
                <Text size="xl" color="muted" className="max-w-3xl">
                  {description}
                </Text>
              )}
            </div>
          )}

          {/* Page Content */}
          <div className="space-y-8">
            {children}
          </div>
        </Container>
      </div>
    )
  }
)

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ 
    title,
    description,
    children,
    className,
    'data-testid': testId,
    ...props 
  }, ref) => {
    return (
      <Card ref={ref} className={className} data-testid={testId} {...props}>
        {(title || description) && (
          <CardHeader>
            {title && (
              <Heading level={2} size="2xl">
                {title}
              </Heading>
            )}
            {description && (
              <Text color="muted" className="mt-2">
                {description}
              </Text>
            )}
          </CardHeader>
        )}
        <CardBody>
          {children}
        </CardBody>
      </Card>
    )
  }
)

PageLayout.displayName = 'PageLayout'
Section.displayName = 'Section'
