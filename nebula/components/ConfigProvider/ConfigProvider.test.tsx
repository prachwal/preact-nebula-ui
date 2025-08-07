import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { ConfigProvider, useConfig, useTheme, useLocale } from './ConfigProvider'

// Test component to access contexts
function TestComponent() {
  const config = useConfig()
  const theme = useTheme()
  const locale = useLocale()
  
  return (
    <div>
      <span data-testid="theme-primary">{theme.token?.colorPrimary || 'default'}</span>
      <span data-testid="locale">{locale.locale}</span>
      <span data-testid="prefix">{config.prefixCls}</span>
    </div>
  )
}

describe('ConfigProvider', () => {
  it('renders children correctly', () => {
    render(
      <ConfigProvider>
        <div data-testid="child">Child content</div>
      </ConfigProvider>
    )
    
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child content')).toBeInTheDocument()
  })

  it('provides default configuration', () => {
    render(
      <ConfigProvider>
        <TestComponent />
      </ConfigProvider>
    )
    
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#1677ff')
    expect(screen.getByTestId('locale')).toHaveTextContent('en')
    expect(screen.getByTestId('prefix')).toHaveTextContent('nebula')
  })

  it('accepts custom theme configuration', () => {
    const customTheme = {
      token: {
        colorPrimary: '#ff6b35',
        borderRadius: 8
      }
    }
    
    render(
      <ConfigProvider theme={customTheme}>
        <TestComponent />
      </ConfigProvider>
    )
    
    expect(screen.getByTestId('theme-primary')).toHaveTextContent('#ff6b35')
  })

  it('accepts custom locale configuration', () => {
    const customLocale = {
      locale: 'pl',
      messages: {
        'common.ok': 'OK',
        'common.cancel': 'Anuluj'
      }
    }
    
    render(
      <ConfigProvider locale={customLocale}>
        <TestComponent />
      </ConfigProvider>
    )
    
    expect(screen.getByTestId('locale')).toHaveTextContent('pl')
  })

  it('accepts custom prefix class', () => {
    render(
      <ConfigProvider prefixCls="custom">
        <TestComponent />
      </ConfigProvider>
    )
    
    expect(screen.getByTestId('prefix')).toHaveTextContent('custom')
  })

  it('supports nested providers with theme inheritance', () => {
    const parentTheme = {
      token: {
        colorPrimary: '#1890ff',
        borderRadius: 6
      }
    }
    
    const childTheme = {
      token: {
        colorPrimary: '#ff6b35'
        // borderRadius should inherit from parent
      }
    }
    
    function NestedTestComponent() {
      const theme = useTheme()
      return (
        <div>
          <span data-testid="nested-primary">{theme.token?.colorPrimary}</span>
          <span data-testid="nested-radius">{theme.token?.borderRadius}</span>
        </div>
      )
    }
    
    render(
      <ConfigProvider theme={parentTheme}>
        <ConfigProvider theme={childTheme}>
          <NestedTestComponent />
        </ConfigProvider>
      </ConfigProvider>
    )
    
    expect(screen.getByTestId('nested-primary')).toHaveTextContent('#ff6b35')
    expect(screen.getByTestId('nested-radius')).toHaveTextContent('6')
  })

  it('throws error when hooks are used outside provider', () => {
    // Suppress console.error for this test
    const originalError = console.error
    console.error = () => {}
    
    function ComponentOutsideProvider() {
      try {
        useConfig()
        return <div>Should not render</div>
      } catch (error) {
        return <div data-testid="error">{(error as Error).message}</div>
      }
    }
    
    render(<ComponentOutsideProvider />)
    
    expect(screen.getByTestId('error')).toHaveTextContent('useConfig must be used within ConfigProvider')
    
    console.error = originalError
  })

  it('supports component defaults', () => {
    const componentDefaults = {
      Button: {
        size: 'large' as const
      },
      Input: {
        variant: 'outlined' as const
      }
    }
    
    function DefaultsTestComponent() {
      const { componentDefaults: defaults } = useConfig()
      return (
        <div>
          <span data-testid="button-size">{defaults.Button?.size || 'none'}</span>
          <span data-testid="input-variant">{defaults.Input?.variant || 'none'}</span>
        </div>
      )
    }
    
    render(
      <ConfigProvider componentDefaults={componentDefaults}>
        <DefaultsTestComponent />
      </ConfigProvider>
    )
    
    expect(screen.getByTestId('button-size')).toHaveTextContent('large')
    expect(screen.getByTestId('input-variant')).toHaveTextContent('outlined')
  })

  it('handles theme algorithm correctly', () => {
    const darkAlgorithm = (seed: any) => ({
      ...seed,
      colorBg: '#000000',
      colorText: '#ffffff'
    })
    
    const algorithmTheme = {
      algorithm: darkAlgorithm,
      token: {
        colorPrimary: '#1890ff'
      }
    }
    
    function AlgorithmTestComponent() {
      const theme = useTheme()
      return (
        <div>
          <span data-testid="has-algorithm">{theme.algorithm ? 'yes' : 'no'}</span>
        </div>
      )
    }
    
    render(
      <ConfigProvider theme={algorithmTheme}>
        <AlgorithmTestComponent />
      </ConfigProvider>
    )
    
    expect(screen.getByTestId('has-algorithm')).toHaveTextContent('yes')
  })
})
