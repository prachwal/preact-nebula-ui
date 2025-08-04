import type { ComponentChildren } from 'preact'
import { createPortal } from 'preact/compat'
import { useEffect, useState } from 'preact/hooks'

export interface PortalProps {
  /**
   * The content to render in the portal
   */
  children: ComponentChildren
  
  /**
   * The container element to render into. Defaults to document.body
   */
  container?: Element
}

export const Portal = ({ children, container }: PortalProps) => {
  const [mountNode, setMountNode] = useState<Element | null>(null)

  useEffect(() => {
    // Use provided container or fallback to document.body
    const node = container || document.body
    setMountNode(node)
  }, [container])

  if (!mountNode) {
    return null
  }

  return createPortal(children, mountNode)
}
