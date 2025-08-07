import { createContext, forwardRef, useContext, useMemo } from 'preact/compat'
import type { 
  ConfigProviderProps, 
  ConfigContextValue,
  ThemeContextValue, 
  LocaleContextValue,
  ComponentDefaultsContextValue,
  GlobalToken,
  ThemeConfig
} from './ConfigProvider.types'
import { defaultTheme, defaultLocale } from './ConfigProvider.types'

// Contexts
export const ConfigContext = createContext<ConfigContextValue | undefined>(undefined)
export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)
export const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)
export const ComponentDefaultsContext = createContext<ComponentDefaultsContextValue>({})

// Hook to access config
export function useConfig(): ConfigContextValue {
  const context = useContext(ConfigContext)
  if (!context) {
    throw new Error('useConfig must be used within ConfigProvider')
  }
  return context
}

// Hook to access theme
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext)
  if (!context) {
    // Return default theme if no provider
    return {
      token: defaultTheme,
      components: {},
      hashId: 'nebula-default'
    }
  }
  return context
}

// Hook to access locale
export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    // Return default locale if no provider
    return {
      locale: defaultLocale.locale,
      direction: defaultLocale.direction || 'ltr',
      messages: defaultLocale.messages || {}
    }
  }
  return context
}

// Hook to access component defaults
export function useComponentDefaults<T extends Record<string, any>>(
  componentName: string,
  props: T
): T {
  const defaults = useContext(ComponentDefaultsContext)
  const componentDefaults = defaults[componentName] || {}
  
  return useMemo(() => ({
    ...componentDefaults,
    ...props
  }), [componentDefaults, props])
}

// Main ConfigProvider component
export const ConfigProvider = forwardRef<HTMLDivElement, ConfigProviderProps>((props, ref) => {
  const {
    theme,
    locale,
    componentDefaults = {},
    prefixCls = 'nebula',
    iconPrefixCls = 'nebulaicon',
    cssVar = false,
    algorithm,
    autoInsertCss = true,
    children,
    ...rest
  } = props

  // Memoize theme context value
  const themeContextValue = useMemo((): ThemeContextValue => {
    const compiledTheme = compileTheme(theme || { token: defaultTheme }, algorithm)
    const hashId = generateHashId(compiledTheme.token)
    
    // Generate CSS variables if enabled
    if (cssVar && autoInsertCss) {
      const cssVarConfig = typeof cssVar === 'object' ? cssVar : { prefix: 'nebula' }
      // TODO: Implement CSS variables generation
      console.log('CSS variables would be generated with config:', cssVarConfig)
    }
    
    // Get final algorithm from theme or prop
    const finalAlgorithm = algorithm || (theme && theme.algorithm)
    
    return {
      token: compiledTheme.token,
      components: compiledTheme.components || {},
      hashId,
      cssVar: typeof cssVar === 'object' ? cssVar : undefined,
      algorithm: finalAlgorithm
    }
  }, [theme, algorithm, cssVar, autoInsertCss])

  // Memoize locale context value
  const localeContextValue = useMemo((): LocaleContextValue => {
    const currentLocale = locale || defaultLocale
    
    return {
      locale: currentLocale.locale,
      direction: currentLocale.direction || 'ltr',
      messages: currentLocale.messages || {},
      formatDate: currentLocale.dateFormat ? 
        (date: Date, format?: string) => formatDate(date, format || currentLocale.dateFormat!) :
        undefined,
      formatNumber: currentLocale.numberFormat ? 
        (num: number, options?: Intl.NumberFormatOptions) => 
          num.toLocaleString(currentLocale.locale, { ...currentLocale.numberFormat, ...options }) :
        undefined,
      formatCurrency: currentLocale.currency ? 
        (amount: number, currency?: string) => 
          amount.toLocaleString(currentLocale.locale, { 
            style: 'currency', 
            currency: currency || currentLocale.currency 
          }) :
        undefined
    }
  }, [locale])

  // Memoize component defaults context value
  const componentDefaultsValue = useMemo(() => componentDefaults, [componentDefaults])

  // Generate prefix class helper
  const getPrefixCls = useMemo(() => {
    return (suffixCls?: string, customizePrefixCls?: string): string => {
      if (customizePrefixCls) return customizePrefixCls
      return suffixCls ? `${prefixCls}-${suffixCls}` : prefixCls
    }
  }, [prefixCls])

  // Memoize config context value
  const configContextValue = useMemo((): ConfigContextValue => ({
    theme: themeContextValue,
    locale: localeContextValue,
    componentDefaults: componentDefaultsValue,
    prefixCls,
    iconPrefixCls,
    getPrefixCls,
    cssVar: typeof cssVar === 'object' ? cssVar : undefined
  }), [themeContextValue, localeContextValue, componentDefaultsValue, prefixCls, iconPrefixCls, getPrefixCls, cssVar])

  return (
    <ConfigContext.Provider value={configContextValue}>
      <ThemeContext.Provider value={themeContextValue}>
        <LocaleContext.Provider value={localeContextValue}>
          <ComponentDefaultsContext.Provider value={componentDefaultsValue}>
            <div
              ref={ref}
              className={`${prefixCls}-config-provider`}
              dir={localeContextValue.direction}
              {...rest}
            >
              {children}
            </div>
          </ComponentDefaultsContext.Provider>
        </LocaleContext.Provider>
      </ThemeContext.Provider>
    </ConfigContext.Provider>
  )
})

ConfigProvider.displayName = 'ConfigProvider'

// Utility functions
function compileTheme(themeConfig: ThemeConfig, algorithm?: any): { token: GlobalToken; components?: any } {
  const { token = {}, components = {}, algorithm: themeAlgorithm } = themeConfig
  
  // Merge with default theme
  const mergedToken = { ...defaultTheme, ...token }
  
  // Apply algorithm if provided
  const finalAlgorithm = algorithm || themeAlgorithm
  if (finalAlgorithm) {
    const algorithms = Array.isArray(finalAlgorithm) ? finalAlgorithm : [finalAlgorithm]
    const processedToken = algorithms.reduce((acc, alg) => alg(acc), mergedToken)
    return { token: processedToken, components }
  }
  
  return { token: mergedToken, components }
}

function generateHashId(token: GlobalToken): string {
  // Simple hash generation based on primary color
  const hash = token.colorPrimary ? 
    token.colorPrimary.replace('#', '').slice(0, 6) : 
    'default'
  return `nebula-${hash}`
}

function formatDate(date: Date, format: string): string {
  // Simple date formatting - in real implementation would use a date library
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
}
