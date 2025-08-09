import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/preact'
import { Collapse } from '../Collapse'

describe('Collapse Component', () => {
  beforeEach(() => {
    // Reset any global state before each test
  })

  describe('Basic Functionality', () => {
    it('renders basic collapse with panels', () => {
      render(
        <Collapse>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Panel 2">
            Content 2
          </Collapse.Panel>
        </Collapse>
      )

      expect(screen.getByText('Panel 1')).toBeInTheDocument()
      expect(screen.getByText('Panel 2')).toBeInTheDocument()
    })

    it('shows default active panel content', () => {
      render(
        <Collapse defaultActiveKey="1">
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Panel 2">
            Content 2
          </Collapse.Panel>
        </Collapse>
      )

      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()
    })

    it('toggles panel on header click', () => {
      render(
        <Collapse>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
        </Collapse>
      )

      const header = screen.getByText('Panel 1')
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()

      fireEvent.click(header)
      expect(screen.getByText('Content 1')).toBeInTheDocument()

      fireEvent.click(header)
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })
  })

  describe('Accordion Mode', () => {
    it('only allows one panel open in accordion mode', () => {
      render(
        <Collapse accordion>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Panel 2">
            Content 2
          </Collapse.Panel>
        </Collapse>
      )

      const header1 = screen.getByText('Panel 1')
      const header2 = screen.getByText('Panel 2')

      fireEvent.click(header1)
      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()

      fireEvent.click(header2)
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })
  })

  describe('Controlled Mode', () => {
    it('works in controlled mode', () => {
      const handleChange = vi.fn()

      render(
        <Collapse activeKey="1" onChange={handleChange}>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Panel 2">
            Content 2
          </Collapse.Panel>
        </Collapse>
      )

      expect(screen.getByText('Content 1')).toBeInTheDocument()
      expect(screen.queryByText('Content 2')).not.toBeInTheDocument()

      const header2 = screen.getByText('Panel 2')
      fireEvent.click(header2)
      expect(handleChange).toHaveBeenCalledWith(['1', '2'])
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Collapse>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
        </Collapse>
      )

      const header = screen.getByRole('button')
      expect(header).toHaveAttribute('aria-expanded', 'false')
      expect(header).toHaveAttribute('tabIndex', '0')
    })

    it('updates aria-expanded when panel is opened', () => {
      render(
        <Collapse>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
        </Collapse>
      )

      const header = screen.getByRole('button')
      fireEvent.click(header)
      expect(header).toHaveAttribute('aria-expanded', 'true')
    })

    it('supports keyboard navigation', () => {
      render(
        <Collapse>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
        </Collapse>
      )

      const header = screen.getByRole('button')
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()

      fireEvent.keyDown(header, { key: 'Enter' })
      expect(screen.getByText('Content 1')).toBeInTheDocument()

      fireEvent.keyDown(header, { key: ' ' })
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })
  })

  describe('Customization', () => {
    it('renders custom expand icon', () => {
      const CustomIcon = ({ isActive }: { isActive: boolean }) => (
        <span data-testid="custom-icon">{isActive ? '−' : '+'}</span>
      )

      render(
        <Collapse expandIcon={CustomIcon}>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
        </Collapse>
      )

      expect(screen.getByTestId('custom-icon')).toHaveTextContent('+')

      const header = screen.getByText('Panel 1')
      fireEvent.click(header)
      expect(screen.getByTestId('custom-icon')).toHaveTextContent('−')
    })

    it('applies size classes correctly', () => {
      const { container } = render(
        <Collapse size="lg">
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
        </Collapse>
      )

      expect(container.firstChild).toHaveClass('text-lg')
    })

    it('can be borderless', () => {
      const { container } = render(
        <Collapse bordered={false}>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
        </Collapse>
      )

      expect(container.firstChild).toHaveClass('[&>*]:border-none')
    })
  })

  describe('Disabled State', () => {
    it('disables interaction when disabled prop is true', () => {
      render(
        <Collapse disabled>
          <Collapse.Panel key="1" header="Panel 1">
            Content 1
          </Collapse.Panel>
        </Collapse>
      )

      const header = screen.getByRole('button')
      expect(header).toHaveAttribute('aria-disabled', 'true')
      expect(header).toHaveAttribute('tabIndex', '-1')

      fireEvent.click(header)
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()
    })

    it('disables individual panels', () => {
      render(
        <Collapse>
          <Collapse.Panel key="1" header="Panel 1" disabled>
            Content 1
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Panel 2">
            Content 2
          </Collapse.Panel>
        </Collapse>
      )

      const buttons = screen.getAllByRole('button')
      const disabledButton = buttons[0]
      const enabledButton = buttons[1]

      expect(disabledButton).toHaveAttribute('aria-disabled', 'true')
      expect(enabledButton).not.toHaveAttribute('aria-disabled', 'true')

      fireEvent.click(disabledButton)
      expect(screen.queryByText('Content 1')).not.toBeInTheDocument()

      fireEvent.click(enabledButton)
      expect(screen.getByText('Content 2')).toBeInTheDocument()
    })
  })
})
