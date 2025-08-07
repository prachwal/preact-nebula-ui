import { render, screen } from '@testing-library/preact'
import { describe, it, expect } from 'vitest'
import { Grid, GridItem } from './Grid'

describe('Grid', () => {
  it('renders correctly with default props', () => {
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toBeInTheDocument()
    expect(grid).toHaveClass('grid')
    expect(grid).toHaveClass('grid-cols-12') // default cols
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('applies column count correctly', () => {
    render(
      <Grid cols={6} data-testid="grid">
        <div>Item</div>
      </Grid>
    )
    
    expect(screen.getByTestId('grid')).toHaveClass('grid-cols-6')
  })

  it('applies responsive column counts', () => {
    render(
      <Grid 
        cols={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 6, '2xl': 12 }}
        data-testid="grid"
      >
        <div>Item</div>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveClass('grid-cols-1')
    expect(grid).toHaveClass('sm:grid-cols-2')
    expect(grid).toHaveClass('md:grid-cols-3')
    expect(grid).toHaveClass('lg:grid-cols-4')
    expect(grid).toHaveClass('xl:grid-cols-6')
    expect(grid).toHaveClass('2xl:grid-cols-12')
  })

  it('applies gap correctly', () => {
    render(
      <Grid gap={4} data-testid="grid">
        <div>Item</div>
      </Grid>
    )
    
    expect(screen.getByTestId('grid')).toHaveClass('gap-4')
  })

  it('applies responsive gap', () => {
    render(
      <Grid 
        gap={{ xs: 2, sm: 4, lg: 8 }}
        data-testid="grid"
      >
        <div>Item</div>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveClass('gap-2')
    expect(grid).toHaveClass('sm:gap-4')
    expect(grid).toHaveClass('lg:gap-8')
  })

  it('applies separate gapX and gapY', () => {
    render(
      <Grid 
        gapX={4}
        gapY={2}
        data-testid="grid"
      >
        <div>Item</div>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveClass('gap-x-4')
    expect(grid).toHaveClass('gap-y-2')
  })

  it('applies auto-fit correctly', () => {
    render(
      <Grid autoFit={{ min: 250 }} data-testid="grid">
        <div>Item</div>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveClass('grid-cols-[repeat(auto-fit,minmax(250px,1fr))]')
  })

  it('applies auto-fill correctly', () => {
    render(
      <Grid autoFill={{ min: 200, max: '1fr' }} data-testid="grid">
        <div>Item</div>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveClass('grid-cols-[repeat(auto-fill,minmax(200px,1fr))]')
  })

  it('applies alignment properties', () => {
    render(
      <Grid 
        alignItems="center"
        justifyItems="end"
        alignContent="start"
        justifyContent="space-between"
        data-testid="grid"
      >
        <div>Item</div>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveClass('items-center')
    expect(grid).toHaveClass('justify-items-end')
    expect(grid).toHaveClass('content-start')
    expect(grid).toHaveClass('justify-between')
  })

  it('applies custom className', () => {
    render(
      <Grid className="custom-grid" data-testid="grid">
        <div>Item</div>
      </Grid>
    )
    
    expect(screen.getByTestId('grid')).toHaveClass('custom-grid')
  })

  it('prefers autoFit over autoFill when both are provided', () => {
    render(
      <Grid 
        autoFit={{ min: 250 }} 
        autoFill={{ min: 200 }} 
        data-testid="grid"
      >
        <div>Item</div>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveClass('grid-cols-[repeat(auto-fit,minmax(250px,1fr))]')
  })
})

describe('GridItem', () => {
  it('renders correctly with default props', () => {
    render(
      <GridItem data-testid="grid-item">
        Item content
      </GridItem>
    )
    
    expect(screen.getByTestId('grid-item')).toBeInTheDocument()
    expect(screen.getByText('Item content')).toBeInTheDocument()
  })

  it('applies column span correctly', () => {
    render(
      <GridItem colSpan={3} data-testid="grid-item">
        Item
      </GridItem>
    )
    
    expect(screen.getByTestId('grid-item')).toHaveClass('col-span-3')
  })

  it('applies responsive column span', () => {
    render(
      <GridItem 
        colSpan={{ xs: 1, sm: 2, lg: 4 }}
        data-testid="grid-item"
      >
        Item
      </GridItem>
    )
    
    const item = screen.getByTestId('grid-item')
    expect(item).toHaveClass('col-span-1')
    expect(item).toHaveClass('sm:col-span-2')
    expect(item).toHaveClass('lg:col-span-4')
  })

  it('applies row span correctly', () => {
    render(
      <GridItem rowSpan={2} data-testid="grid-item">
        Item
      </GridItem>
    )
    
    expect(screen.getByTestId('grid-item')).toHaveClass('row-span-2')
  })

  it('applies column start and end', () => {
    render(
      <GridItem 
        colStart={2}
        colEnd={5}
        data-testid="grid-item"
      >
        Item
      </GridItem>
    )
    
    const item = screen.getByTestId('grid-item')
    expect(item).toHaveClass('col-start-2')
    expect(item).toHaveClass('col-end-5')
  })

  it('applies row start and end', () => {
    render(
      <GridItem 
        rowStart={1}
        rowEnd={3}
        data-testid="grid-item"
      >
        Item
      </GridItem>
    )
    
    const item = screen.getByTestId('grid-item')
    expect(item).toHaveClass('row-start-1')
    expect(item).toHaveClass('row-end-3')
  })

  it('applies self-alignment properties', () => {
    render(
      <GridItem 
        alignSelf="center"
        justifySelf="end"
        data-testid="grid-item"
      >
        Item
      </GridItem>
    )
    
    const item = screen.getByTestId('grid-item')
    expect(item).toHaveClass('self-center')
    expect(item).toHaveClass('justify-self-end')
  })

  it('applies custom className', () => {
    render(
      <GridItem className="custom-item" data-testid="grid-item">
        Item
      </GridItem>
    )
    
    expect(screen.getByTestId('grid-item')).toHaveClass('custom-item')
  })

  it('supports string span values', () => {
    render(
      <GridItem colSpan="full" data-testid="grid-item">
        Item
      </GridItem>
    )
    
    expect(screen.getByTestId('grid-item')).toHaveClass('col-span-full')
  })

  it('supports responsive positioning', () => {
    render(
      <GridItem 
        colStart={{ xs: 1, lg: 3 }}
        rowStart={{ sm: 2, xl: 1 }}
        data-testid="grid-item"
      >
        Item
      </GridItem>
    )
    
    const item = screen.getByTestId('grid-item')
    expect(item).toHaveClass('col-start-1')
    expect(item).toHaveClass('lg:col-start-3')
    expect(item).toHaveClass('sm:row-start-2')
    expect(item).toHaveClass('xl:row-start-1')
  })
})

describe('Grid Integration', () => {
  it('works correctly with Grid and GridItem together', () => {
    render(
      <Grid cols={4} gap={4} data-testid="grid">
        <GridItem colSpan={2} data-testid="item-1">
          Item 1 (spans 2 columns)
        </GridItem>
        <GridItem data-testid="item-2">
          Item 2
        </GridItem>
        <GridItem data-testid="item-3">
          Item 3
        </GridItem>
      </Grid>
    )
    
    const grid = screen.getByTestId('grid')
    expect(grid).toHaveClass('grid-cols-4', 'gap-4')
    
    const item1 = screen.getByTestId('item-1')
    expect(item1).toHaveClass('col-span-2')
    
    expect(screen.getByTestId('item-2')).toBeInTheDocument()
    expect(screen.getByTestId('item-3')).toBeInTheDocument()
  })
})
