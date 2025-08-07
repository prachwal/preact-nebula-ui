import type { ComponentChild } from 'preact'

export interface GlobalToken {
  // Color tokens
  colorPrimary?: string
  colorSuccess?: string
  colorWarning?: string
  colorError?: string
  colorInfo?: string
  colorText?: string
  colorTextSecondary?: string
  colorTextTertiary?: string
  colorTextQuaternary?: string
  colorBg?: string
  colorBgContainer?: string
  colorBgElevated?: string
  colorBgLayout?: string
  colorBgMask?: string
  
  // Border tokens
  colorBorder?: string
  colorBorderSecondary?: string
  colorFill?: string
  colorFillSecondary?: string
  colorFillTertiary?: string
  colorFillQuaternary?: string
  
  // Typography tokens
  fontFamily?: string
  fontFamilyCode?: string
  fontSize?: number
  fontSizeHeading1?: number
  fontSizeHeading2?: number
  fontSizeHeading3?: number
  fontSizeHeading4?: number
  fontSizeHeading5?: number
  fontSizeSM?: number
  fontSizeLG?: number
  fontSizeXL?: number
  lineHeight?: number
  lineHeightLG?: number
  lineHeightSM?: number
  
  // Spacing tokens
  padding?: number
  paddingXS?: number
  paddingSM?: number
  paddingMD?: number
  paddingLG?: number
  paddingXL?: number
  margin?: number
  marginXS?: number
  marginSM?: number
  marginMD?: number
  marginLG?: number
  marginXL?: number
  
  // Size tokens
  sizeUnit?: number
  sizeStep?: number
  sizePopupArrow?: number
  
  // Border radius tokens
  borderRadius?: number
  borderRadiusXS?: number
  borderRadiusSM?: number
  borderRadiusLG?: number
  borderRadiusOuter?: number
  
  // Control tokens
  controlHeight?: number
  controlHeightSM?: number
  controlHeightLG?: number
  controlHeightXS?: number
  
  // Motion tokens
  motionDurationFast?: string
  motionDurationMid?: string
  motionDurationSlow?: string
  motionEaseInOut?: string
  motionEaseOut?: string
  motionEaseIn?: string
  motionEaseOutBack?: string
  motionEaseInBack?: string
  motionEaseInQuint?: string
  motionEaseOutQuint?: string
  
  // Z-index tokens
  zIndexBase?: number
  zIndexPopupBase?: number
  zIndexTooltip?: number
  zIndexModal?: number
  zIndexDrawer?: number
  zIndexPopover?: number
  zIndexDropdown?: number
  zIndexMessage?: number
  zIndexNotification?: number
  
  // Shadow tokens
  boxShadow?: string
  boxShadowSecondary?: string
  boxShadowTertiary?: string
  boxShadowPopover?: string
  boxShadowDrawer?: string
  boxShadowModal?: string
  boxShadowTooltip?: string
}

export interface ComponentToken {
  [key: string]: any
}

export interface ComponentTokenMap {
  Button?: ComponentToken
  Input?: ComponentToken
  Select?: ComponentToken
  Modal?: ComponentToken
  Drawer?: ComponentToken
  Alert?: ComponentToken
  Badge?: ComponentToken
  Card?: ComponentToken
  Checkbox?: ComponentToken
  Radio?: ComponentToken
  Slider?: ComponentToken
  Switch?: ComponentToken
  Table?: ComponentToken
  Tabs?: ComponentToken
  Tag?: ComponentToken
  Tooltip?: ComponentToken
  [componentName: string]: ComponentToken | undefined
}

export interface ThemeAlgorithm {
  (seed: GlobalToken, mapToken?: GlobalToken): GlobalToken
}

export interface ThemeConfig {
  token?: GlobalToken
  components?: ComponentTokenMap
  algorithm?: ThemeAlgorithm | ThemeAlgorithm[]
  hashed?: boolean
  inherit?: boolean
}

export interface CSSVarConfig {
  prefix?: string
  key?: string
  suffix?: string
}

export interface LocaleConfig {
  locale: string
  direction?: 'ltr' | 'rtl'
  messages?: Record<string, string>
  dateFormat?: string
  timeFormat?: string
  numberFormat?: Intl.NumberFormatOptions
  currency?: string
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6
}

export interface ComponentDefaultsConfig {
  [componentName: string]: Record<string, any>
}

export interface ConfigProviderProps {
  // Theme configuration
  theme?: ThemeConfig
  
  // Locale configuration
  locale?: LocaleConfig
  
  // Component defaults
  componentDefaults?: ComponentDefaultsConfig
  
  // CSS class prefix
  prefixCls?: string
  iconPrefixCls?: string
  
  // CSS Variables
  cssVar?: boolean | CSSVarConfig
  
  // Theme switching
  algorithm?: ThemeAlgorithm | ThemeAlgorithm[]
  
  // Auto insert CSS in head
  autoInsertCss?: boolean
  
  // Wave effect
  wave?: {
    disabled?: boolean
    showEffect?: (node: HTMLElement, info: { className: string; token: GlobalToken }) => void
  }
  
  children: ComponentChild
}

export interface ThemeContextValue {
  token: GlobalToken
  components: ComponentTokenMap
  hashId: string
  cssVar?: CSSVarConfig
  algorithm?: ThemeAlgorithm | ThemeAlgorithm[]
}

export interface LocaleContextValue {
  locale: string
  direction: 'ltr' | 'rtl'
  messages: Record<string, string>
  formatDate?: (date: Date, format?: string) => string
  formatNumber?: (num: number, options?: Intl.NumberFormatOptions) => string
  formatCurrency?: (amount: number, currency?: string) => string
}

export interface ComponentDefaultsContextValue {
  [componentName: string]: Record<string, any>
}

export interface ConfigContextValue {
  theme: ThemeContextValue
  locale: LocaleContextValue
  componentDefaults: ComponentDefaultsContextValue
  prefixCls: string
  iconPrefixCls: string
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string
  cssVar?: CSSVarConfig
}

// Default theme tokens
export const defaultTheme: GlobalToken = {
  // Primary colors
  colorPrimary: '#1677ff',
  colorSuccess: '#52c41a',
  colorWarning: '#faad14',
  colorError: '#ff4d4f',
  colorInfo: '#1677ff',
  
  // Text colors
  colorText: 'rgba(0, 0, 0, 0.88)',
  colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
  colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
  colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
  
  // Background colors
  colorBg: '#ffffff',
  colorBgContainer: '#ffffff',
  colorBgElevated: '#ffffff',
  colorBgLayout: '#f5f5f5',
  colorBgMask: 'rgba(0, 0, 0, 0.45)',
  
  // Border colors
  colorBorder: '#d9d9d9',
  colorBorderSecondary: '#f0f0f0',
  
  // Typography
  fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'`,
  fontFamilyCode: `'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace`,
  fontSize: 14,
  lineHeight: 1.5714285714285714,
  
  // Spacing
  padding: 16,
  paddingXS: 8,
  paddingSM: 12,
  paddingLG: 24,
  paddingXL: 32,
  margin: 16,
  
  // Border radius
  borderRadius: 6,
  borderRadiusXS: 2,
  borderRadiusSM: 4,
  borderRadiusLG: 8,
  
  // Control heights
  controlHeight: 32,
  controlHeightSM: 24,
  controlHeightLG: 40,
  
  // Motion
  motionDurationFast: '0.1s',
  motionDurationMid: '0.2s',
  motionDurationSlow: '0.3s',
  motionEaseInOut: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  motionEaseOut: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
  motionEaseIn: 'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
  
  // Z-index
  zIndexBase: 0,
  zIndexPopupBase: 1000,
  zIndexTooltip: 1060,
  zIndexModal: 1050,
  zIndexDrawer: 1040,
  zIndexPopover: 1030,
  zIndexDropdown: 1020,
  zIndexMessage: 1070,
  zIndexNotification: 1080,
  
  // Shadows
  boxShadow: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
  boxShadowSecondary: '0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05)'
}

// Default locale
export const defaultLocale: LocaleConfig = {
  locale: 'en-US',
  direction: 'ltr',
  messages: {},
  dateFormat: 'YYYY-MM-DD',
  timeFormat: 'HH:mm:ss',
  firstDayOfWeek: 0
}
