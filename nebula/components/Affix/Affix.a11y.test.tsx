import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/preact'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Affix } from '../Affix'

expect.extend(toHaveNoViolations)

describe('Affix Accessibility', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(
      <Affix aria-label="Floating navigation">
        <nav>
          <ul>
            <li><a href="#section1">Section 1</a></li>
            <li><a href="#section2">Section 2</a></li>
          </ul>
        </nav>
      </Affix>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should support aria-label', () => {
    const { container } = render(
      <Affix aria-label="Sticky sidebar">
        Content
      </Affix>
    )
    
    const affixElement = container.querySelector('div:not([aria-hidden])')
    expect(affixElement).toHaveAttribute('aria-label', 'Sticky sidebar')
  })

  it('should support aria-describedby', () => {
    const { getByText } = render(
      <div>
        <p id="description">This content sticks to the top when scrolling</p>
        <Affix aria-describedby="description">
          Sticky content
        </Affix>
      </div>
    )
    
    // Use getByText to find the element with the content
    const affixElement = getByText('Sticky content')
    expect(affixElement).toHaveAttribute('aria-describedby', 'description')
  })

  it('should hide placeholder from screen readers', () => {
    const { container } = render(
      <Affix>Content</Affix>
    )
    
    const placeholder = container.querySelector('[aria-hidden="true"]')
    expect(placeholder).toHaveAttribute('aria-hidden', 'true')
  })

  it('should maintain focus management', async () => {
    const { container } = render(
      <Affix>
        <button>Focusable button</button>
      </Affix>
    )
    
    const button = container.querySelector('button')
    expect(button).toBeInTheDocument()
    
    // Test that button can receive focus
    button?.focus()
    expect(document.activeElement).toBe(button)
  })

  it('should work with keyboard navigation', () => {
    const { container } = render(
      <Affix>
        <nav>
          <a href="#link1" tabIndex={0}>Link 1</a>
          <a href="#link2" tabIndex={0}>Link 2</a>
        </nav>
      </Affix>
    )
    
    const links = container.querySelectorAll('a')
    expect(links).toHaveLength(2)
    
    links.forEach(link => {
      expect(link).toHaveAttribute('tabIndex', '0')
    })
  })

  it('should support role attribute', () => {
    const { container } = render(
      <Affix role="banner">
        Header content
      </Affix>
    )
    
    const affixElement = container.querySelector('div:not([aria-hidden])')
    expect(affixElement).toHaveAttribute('role', 'banner')
  })

  it('should work with screen readers when affixed', async () => {
    const { container } = render(
      <Affix aria-label="Navigation menu">
        <nav role="navigation">
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
          </ul>
        </nav>
      </Affix>
    )
    
    const results = await axe(container)
    expect(results).toHaveNoViolations()
    
    const nav = container.querySelector('nav')
    expect(nav).toHaveAttribute('role', 'navigation')
  })

  it('should announce content changes appropriately', () => {
    const { container, rerender } = render(
      <Affix aria-live="polite">
        Initial content
      </Affix>
    )
    
    let affixElement = container.querySelector('div:not([aria-hidden])')
    expect(affixElement).toHaveAttribute('aria-live', 'polite')
    
    rerender(
      <Affix aria-live="polite">
        Updated content
      </Affix>
    )
    
    affixElement = container.querySelector('div:not([aria-hidden])')
    expect(affixElement).toHaveTextContent('Updated content')
  })
})
