import type { ComponentChild, JSX } from 'preact'

export type GridBreakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type GridSpan = 
  | number 
  | 'auto' 
  | 'full'
  | Partial<Record<GridBreakpoint, number | 'auto' | 'full'>>

export interface GridProps {
  /** Grid container with responsive columns */
  cols?: number | Partial<Record<GridBreakpoint, number>>
  /** Gap between grid items */
  gap?: number | string | Partial<Record<GridBreakpoint, number | string>>
  /** Horizontal gap between columns */
  gapX?: number | string | Partial<Record<GridBreakpoint, number | string>>
  /** Vertical gap between rows */
  gapY?: number | string | Partial<Record<GridBreakpoint, number | string>>
  /** Auto-fit columns with min-max sizing */
  autoFit?: {
    min: number | string
    max?: number | string
  }
  /** Auto-fill columns with min-max sizing */
  autoFill?: {
    min: number | string
    max?: number | string
  }
  /** Align items within grid cells */
  alignItems?: 'start' | 'end' | 'center' | 'stretch'
  /** Justify items within grid cells */
  justifyItems?: 'start' | 'end' | 'center' | 'stretch'
  /** Align grid content within container */
  alignContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'
  /** Justify grid content within container */
  justifyContent?: 'start' | 'end' | 'center' | 'stretch' | 'space-between' | 'space-around' | 'space-evenly'
  /** Auto-flow direction */
  autoFlow?: 'row' | 'column' | 'row dense' | 'column dense'
  /** Children elements */
  children?: ComponentChild
  /** Additional CSS class */
  className?: string
  /** Additional CSS styles */
  style?: JSX.CSSProperties
}

export interface GridItemProps {
  /** Column span */
  colSpan?: GridSpan
  /** Row span */
  rowSpan?: GridSpan
  /** Column start position */
  colStart?: number | Partial<Record<GridBreakpoint, number>>
  /** Column end position */
  colEnd?: number | Partial<Record<GridBreakpoint, number>>
  /** Row start position */
  rowStart?: number | Partial<Record<GridBreakpoint, number>>
  /** Row end position */
  rowEnd?: number | Partial<Record<GridBreakpoint, number>>
  /** Order of the item */
  order?: number | Partial<Record<GridBreakpoint, number>>
  /** Align this item */
  alignSelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch'
  /** Justify this item */
  justifySelf?: 'auto' | 'start' | 'end' | 'center' | 'stretch'
  /** Children elements */
  children?: ComponentChild
  /** Additional CSS class */
  className?: string
  /** Additional CSS styles */
  style?: JSX.CSSProperties
}
