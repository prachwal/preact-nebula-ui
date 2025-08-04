import { ComponentChildren, render } from 'preact'
import { useEffect, useRef } from 'preact/hooks'

interface PortalProps {
  children: ComponentChildren
  container?: HTMLElement
}

/**
 * Portal component for rendering content outside the normal DOM hierarchy
 */
export function Portal({ children, container }: PortalProps) {
  const mountNode = useRef<HTMLElement>()

  useEffect(() => {
    // Use provided container or create default portal container
    if (container) {
      mountNode.current = container
    } else {
      // Create or get existing portal container
      let portalContainer = document.getElementById('modal-portal')
      if (!portalContainer) {
        portalContainer = document.createElement('div')
        portalContainer.id = 'modal-portal'
        portalContainer.style.position = 'fixed'
        portalContainer.style.top = '0'
        portalContainer.style.left = '0'
        portalContainer.style.zIndex = '1000'
        document.body.appendChild(portalContainer)
      }
      mountNode.current = portalContainer
    }
  }, [container])

  useEffect(() => {
    if (mountNode.current) {
      const portalElement = document.createElement('div')
      mountNode.current.appendChild(portalElement)
      
      render(children, portalElement)

      return () => {
        if (mountNode.current && portalElement.parentNode) {
          mountNode.current.removeChild(portalElement)
        }
      }
    }
  }, [children])

  return null
}
