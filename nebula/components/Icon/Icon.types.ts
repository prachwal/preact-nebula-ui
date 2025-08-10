import type { ComponentChildren, ComponentProps } from 'preact'

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type IconColor = 'inherit' | 'current' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'muted'

export interface IconProps extends Omit<ComponentProps<'svg'>, 'size' | 'color'> {
    /** Icon size */
    size?: IconSize
    /** Icon color */
    color?: IconColor
    /** Custom SVG path or children */
    children?: ComponentChildren
    /** Predefined icon name (for built-in icons) */
    name?: string
    /** Whether the icon should spin */
    spin?: boolean
    /** Custom viewBox (default: "0 0 24 24") */
    viewBox?: string
    /** Stroke width for outline icons */
    strokeWidth?: number
    /** Whether icon is filled or outlined */
    filled?: boolean
    /** CSS class name */
    className?: string
    /** Test ID for testing */
    'data-testid'?: string
}
