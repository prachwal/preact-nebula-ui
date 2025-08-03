// Unified size mapping for all components
// This ensures consistent sizing across the entire component library

/**
 * Standard size tokens used across all components
 */
export type StandardSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Size mappings for different component types
 */
export const sizeTokens = {
  // Spacing units (padding, margin, gaps)
  spacing: {
    'none': '0',
    'xs': '0.25rem',    // 4px
    'sm': '0.5rem',     // 8px  
    'md': '1rem',       // 16px
    'lg': '1.5rem',     // 24px
    'xl': '2rem',       // 32px
    '2xl': '3rem'       // 48px
  },

  // Text sizes
  text: {
    'xs': 'text-xs',    // 12px
    'sm': 'text-sm',    // 14px
    'md': 'text-base',  // 16px
    'lg': 'text-lg',    // 18px
    'xl': 'text-xl',    // 20px
    '2xl': 'text-2xl'   // 24px
  },

  // Icon sizes (width x height)
  icon: {
    'xs': 'w-3 h-3',    // 12px × 12px
    'sm': 'w-4 h-4',    // 16px × 16px
    'md': 'w-5 h-5',    // 20px × 20px
    'lg': 'w-6 h-6',    // 24px × 24px
    'xl': 'w-8 h-8',    // 32px × 32px
    '2xl': 'w-10 h-10'  // 40px × 40px
  },

  // Spinner specific sizes (smaller than icons)
  spinner: {
    'xs': 'w-2.5 h-2.5', // 10px × 10px - Extra small for inline text
    'sm': 'w-3 h-3',     // 12px × 12px - Small for compact components
    'md': 'w-4 h-4',     // 16px × 16px - Medium (default)
    'lg': 'w-5 h-5',     // 20px × 20px - Large
    'xl': 'w-6 h-6',     // 24px × 24px - Extra large
    '2xl': 'w-8 h-8'     // 32px × 32px - Largest
  },

  // Button padding combinations
  button: {
    'xs': 'px-2 py-1 text-xs',    // Very compact
    'sm': 'px-2.5 py-1.5 text-sm', // Small
    'md': 'px-4 py-2 text-base',   // Medium (default)
    'lg': 'px-6 py-3 text-lg',     // Large
    'xl': 'px-8 py-4 text-xl',     // Extra large
    '2xl': 'px-10 py-5 text-2xl'   // Largest
  },

  // Input padding combinations
  input: {
    'xs': 'px-2 py-1 text-xs',     // Very compact
    'sm': 'px-3 py-1.5 text-sm',   // Small
    'md': 'px-3 py-2 text-base',   // Medium (default)
    'lg': 'px-4 py-3 text-lg',     // Large
    'xl': 'px-5 py-4 text-xl',     // Extra large
    '2xl': 'px-6 py-5 text-2xl'    // Largest
  },

  // Container max-widths
  container: {
    'xs': 'max-w-xs',    // 320px (20rem)
    'sm': 'max-w-sm',    // 384px (24rem)
    'md': 'max-w-md',    // 448px (28rem)
    'lg': 'max-w-2xl',   // 672px (42rem)
    'xl': 'max-w-4xl',   // 896px (56rem)
    '2xl': 'max-w-6xl'   // 1152px (72rem)
  },

  // Border thickness
  border: {
    'xs': 'border',      // 1px
    'sm': 'border',      // 1px
    'md': 'border-2',    // 2px
    'lg': 'border-4',    // 4px
    'xl': 'border-8',    // 8px
    '2xl': 'border'      // 1px (avoid too thick borders)
  },

  // Rounded corners
  rounded: {
    'xs': 'rounded-sm',  // 2px
    'sm': 'rounded',     // 4px  
    'md': 'rounded-md',  // 6px
    'lg': 'rounded-lg',  // 8px
    'xl': 'rounded-xl',  // 12px
    '2xl': 'rounded-2xl' // 16px
  }
}

/**
 * Helper function to get consistent size classes
 */
export function getSizeClasses(component: keyof typeof sizeTokens, size: StandardSize): string {
  return sizeTokens[component][size] || sizeTokens[component]['md']
}

/**
 * Component-specific size mappings that extend the standard sizes
 */
export const componentSizes = {
  // Spinner uses smaller base sizes
  spinner: {
    'xs': sizeTokens.spinner.xs,
    'sm': sizeTokens.spinner.sm, 
    'md': sizeTokens.spinner.md,
    'lg': sizeTokens.spinner.lg,
    'xl': sizeTokens.spinner.xl,
    '2xl': sizeTokens.spinner['2xl']
  },

  // Button combines padding and text
  button: {
    'xs': sizeTokens.button.xs,
    'sm': sizeTokens.button.sm,
    'md': sizeTokens.button.md,
    'lg': sizeTokens.button.lg,
    'xl': sizeTokens.button.xl,
    '2xl': sizeTokens.button['2xl']
  },

  // Input combines padding and text  
  input: {
    'xs': sizeTokens.input.xs,
    'sm': sizeTokens.input.sm,
    'md': sizeTokens.input.md,
    'lg': sizeTokens.input.lg,
    'xl': sizeTokens.input.xl,
    '2xl': sizeTokens.input['2xl']
  }
}
