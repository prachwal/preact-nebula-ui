import type { ComponentChildren } from 'preact'
import { Header } from './Header'

interface LayoutProps {
  children: ComponentChildren
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main class="min-h-screen bg-gray-50 dark:bg-gray-900">
        {children}
      </main>
    </>
  )
}
