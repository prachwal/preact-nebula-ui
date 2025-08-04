import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock scrollIntoView for tests
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

// Konfiguracja dla automatycznego JSX w Preact
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
