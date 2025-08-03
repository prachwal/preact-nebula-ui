import { clsx, type ClassValue } from 'clsx'

/**
 * Utility function to merge class names using clsx
 * Supports conditional classes and removes duplicates
 */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
