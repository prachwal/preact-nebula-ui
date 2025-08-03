import '@testing-library/jest-dom'

// Konfiguracja dla automatycznego JSX w Preact
declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any
    }
  }
}
