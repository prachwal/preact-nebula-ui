import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock scrollIntoView for tests
Object.defineProperty(HTMLElement.prototype, 'scrollIntoView', {
  value: vi.fn(),
  writable: true,
});

// Mock IntersectionObserver for tests
const mockIntersectionObserver = vi.fn()
const mockObserve = vi.fn()
const mockUnobserve = vi.fn()
const mockDisconnect = vi.fn()

mockIntersectionObserver.mockImplementation((callback) => ({
  observe: mockObserve.mockImplementation((element) => {
    // Simulate element being in view immediately
    callback([{ target: element, isIntersecting: true }])
  }),
  unobserve: mockUnobserve,
  disconnect: mockDisconnect,
}))

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
})

Object.defineProperty(global, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: mockIntersectionObserver,
})

// Konfiguracja dla automatycznego JSX w Preact
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
