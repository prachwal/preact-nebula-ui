import type { ComponentChildren } from 'preact'
import { Header } from './Header'
import { ToastContainer } from '../../../nebula/components'

interface LayoutProps {
  children: ComponentChildren
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main>
        {children}
      </main>
      <ToastContainer position="top-right" />
    </div>
  )
}
