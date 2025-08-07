// Re-export all providers for easy importing
export { ConfigProvider, useConfig, useTheme, useLocale, useComponentDefaults } from '../components/ConfigProvider'
export type { 
  ConfigProviderProps, 
  ThemeConfig, 
  GlobalToken, 
  LocaleConfig 
} from '../components/ConfigProvider/ConfigProvider.types'

// Simple theme provider for basic dark/light switching
export { SimpleThemeProvider, useSimpleTheme } from './SimpleThemeProvider'
export type { SimpleTheme, SimpleThemeProviderProps } from './SimpleThemeProvider'
