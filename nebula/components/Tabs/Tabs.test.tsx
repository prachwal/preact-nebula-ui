import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Tabs, TabList, Tab, TabPanels, TabPanel } from './Tabs'

describe('Tabs', () => {
  it('renders with default props', () => {
    render(
      <Tabs>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    )
    
    expect(screen.getByRole('tablist')).toBeInTheDocument()
    expect(screen.getAllByRole('tab')).toHaveLength(2)
  })

  it('handles controlled mode', () => {
    const handleChange = vi.fn()
    render(
      <Tabs value="tab2" onChange={handleChange}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    )
    
    const tab1 = screen.getByRole('tab', { name: 'Tab 1' })
    fireEvent.click(tab1)
    
    expect(handleChange).toHaveBeenCalledWith('tab1')
  })

  it('handles uncontrolled mode with defaultValue', () => {
    render(
      <Tabs defaultValue="tab2">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    )
    
    expect(screen.getByText('Panel 2')).toBeInTheDocument()
    expect(screen.queryByText('Panel 1')).not.toBeInTheDocument()
  })

  it('switches panels when tabs are clicked', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Panel 1 Content</TabPanel>
          <TabPanel value="tab2">Panel 2 Content</TabPanel>
        </TabPanels>
      </Tabs>
    )
    
    expect(screen.getByText('Panel 1 Content')).toBeInTheDocument()
    
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    fireEvent.click(tab2)
    
    expect(screen.getByText('Panel 2 Content')).toBeInTheDocument()
    expect(screen.queryByText('Panel 1 Content')).not.toBeInTheDocument()
  })

  it('handles keyboard navigation', () => {
    render(
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2">Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    )
    
    const tab2 = screen.getByRole('tab', { name: 'Tab 2' })
    fireEvent.keyDown(tab2, { key: 'Enter' })
    
    expect(screen.getByText('Panel 2')).toBeInTheDocument()
  })

  it('handles disabled tabs', () => {
    const handleChange = vi.fn()
    render(
      <Tabs defaultValue="tab1" onChange={handleChange}>
        <TabList>
          <Tab value="tab1">Tab 1</Tab>
          <Tab value="tab2" disabled>Tab 2</Tab>
        </TabList>
        <TabPanels>
          <TabPanel value="tab1">Panel 1</TabPanel>
          <TabPanel value="tab2">Panel 2</TabPanel>
        </TabPanels>
      </Tabs>
    )
    
    const disabledTab = screen.getByRole('tab', { name: 'Tab 2' })
    expect(disabledTab).toBeDisabled()
    
    fireEvent.click(disabledTab)
    expect(handleChange).not.toHaveBeenCalled()
  })

  describe('Orientation', () => {
    it('applies horizontal orientation classes', () => {
      render(
        <Tabs orientation="horizontal">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
        </Tabs>
      )
      
      const tablist = screen.getByRole('tablist')
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')
      expect(tablist).toHaveClass('flex-row')
    })

    it('applies vertical orientation classes', () => {
      render(
        <Tabs orientation="vertical">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
        </Tabs>
      )
      
      const tablist = screen.getByRole('tablist')
      expect(tablist).toHaveAttribute('aria-orientation', 'vertical')
      expect(tablist).toHaveClass('flex-col')
    })
  })

  describe('Variants', () => {
    it('applies line variant classes', () => {
      render(
        <Tabs variant="line">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
        </Tabs>
      )
      
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('border-b-2')
    })

    it('applies enclosed variant classes', () => {
      render(
        <Tabs variant="enclosed">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
        </Tabs>
      )
      
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('border', 'border-b-0', 'rounded-t-md')
    })

    it('applies soft-rounded variant classes', () => {
      render(
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
        </Tabs>
      )
      
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('rounded-md')
    })
  })

  describe('Sizes', () => {
    it('applies small size classes', () => {
      render(
        <Tabs size="sm">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
        </Tabs>
      )
      
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('px-3', 'py-1', 'text-sm')
    })

    it('applies medium size classes', () => {
      render(
        <Tabs size="md">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
        </Tabs>
      )
      
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('px-4', 'py-2', 'text-base')
    })

    it('applies large size classes', () => {
      render(
        <Tabs size="lg">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
          </TabList>
        </Tabs>
      )
      
      const tab = screen.getByRole('tab')
      expect(tab).toHaveClass('px-6', 'py-3', 'text-lg')
    })
  })

  describe('Accessibility', () => {
    it('has proper ARIA attributes', () => {
      render(
        <Tabs defaultValue="tab1">
          <TabList>
            <Tab value="tab1">Tab 1</Tab>
            <Tab value="tab2">Tab 2</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="tab1">Panel 1</TabPanel>
            <TabPanel value="tab2">Panel 2</TabPanel>
          </TabPanels>
        </Tabs>
      )
      
      const tablist = screen.getByRole('tablist')
      expect(tablist).toHaveAttribute('aria-orientation', 'horizontal')
      
      const selectedTab = screen.getByRole('tab', { selected: true })
      expect(selectedTab).toHaveAttribute('aria-selected', 'true')
      expect(selectedTab).toHaveAttribute('tabindex', '0')
      
      const unselectedTab = screen.getByRole('tab', { selected: false })
      expect(unselectedTab).toHaveAttribute('aria-selected', 'false')
      expect(unselectedTab).toHaveAttribute('tabindex', '-1')
      
      expect(screen.getByRole('tabpanel')).toBeInTheDocument()
    })
  })

  describe('Custom Props', () => {
    it('accepts custom className', () => {
      render(
        <Tabs className="custom-tabs">
          <TabList className="custom-tablist">
            <Tab value="tab1" className="custom-tab">Tab 1</Tab>
          </TabList>
          <TabPanels className="custom-panels">
            <TabPanel value="tab1" className="custom-panel">Panel 1</TabPanel>
          </TabPanels>
        </Tabs>
      )
      
      expect(screen.getByRole('tablist').parentElement).toHaveClass('custom-tabs')
      expect(screen.getByRole('tablist')).toHaveClass('custom-tablist')
      expect(screen.getByRole('tab')).toHaveClass('custom-tab')
    })

    it('accepts data-testid', () => {
      render(
        <Tabs defaultValue="tab1" data-testid="custom-tabs">
          <TabList>
            <Tab value="tab1" data-testid="custom-tab">Tab 1</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="tab1" data-testid="custom-panel">Panel 1</TabPanel>
          </TabPanels>
        </Tabs>
      )
      
      expect(screen.getByTestId('custom-tabs')).toBeInTheDocument()
      expect(screen.getByTestId('custom-tab')).toBeInTheDocument()
      expect(screen.getByTestId('custom-panel')).toBeInTheDocument()
    })


  })
})
