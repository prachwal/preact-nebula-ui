import { forwardRef } from 'preact/compat'
import { useState } from 'preact/hooks'
import { Button } from '../Button'
import { TransferList } from './TransferList'
import { useTransfer } from './useTransfer'
import { cn } from '../../utils/cn'
import type { TransferProps } from './types'

export const Transfer = forwardRef<HTMLDivElement, TransferProps>(({
  dataSource,
  targetKeys: controlledTargetKeys,
  defaultTargetKeys,
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys,
  searchable = true,
  leftTitle = 'Source',
  rightTitle = 'Target',
  render,
  filterOption,
  showSelectAll = true,
  pagination = false,
  height = 300,
  size = 'md',
  disabled = false,
  loading = false,
  operations = ['>', '<'],
  showSearch = true,
  searchPlaceholder,
  footer,
  onChange,
  onSelectChange,
  onSearch,
  onScroll,
  className,
  style,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
  ...props
}, ref) => {
  const [leftSearchValue, setLeftSearchValue] = useState('')
  const [rightSearchValue, setRightSearchValue] = useState('')

  const {
    leftItems,
    rightItems,
    leftSelectedKeys,
    rightSelectedKeys,
    moveToRight,
    moveToLeft,
    selectLeft,
    selectRight,
    selectAllLeft,
    selectAllRight,
    canMoveToRight,
    canMoveToLeft
  } = useTransfer({
    dataSource,
    targetKeys: controlledTargetKeys,
    defaultTargetKeys,
    selectedKeys: controlledSelectedKeys,
    defaultSelectedKeys,
    onChange,
    onSelectChange
  })

  // Transfer list configuration
  const listConfig = {
    searchable: searchable && showSearch,
    showSelectAll,
    render,
    filterOption,
    height,
    size,
    disabled,
    loading,
    searchPlaceholder,
    footer
  }

  // Handle search
  const handleLeftSearch = (value: string) => {
    setLeftSearchValue(value)
    onSearch?.('left', value)
  }

  const handleRightSearch = (value: string) => {
    setRightSearchValue(value)
    onSearch?.('right', value)
  }

  // Handle scroll
  const handleLeftScroll = (e: Event) => {
    onScroll?.('left', e)
  }

  const handleRightScroll = (e: Event) => {
    onScroll?.('right', e)
  }

  // Size-based button sizes
  const buttonSize = size === 'lg' ? 'md' : 'sm'

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-start gap-4',
        className
      )}
      style={style}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      {...props}
    >
      {/* Left List */}
      <div className="flex-1">
        <TransferList
          direction="left"
          items={leftItems}
          selectedKeys={leftSelectedKeys}
          config={listConfig}
          title={leftTitle}
          searchValue={leftSearchValue}
          onSelect={selectLeft}
          onSelectAll={selectAllLeft}
          onSearch={handleLeftSearch}
          onScroll={handleLeftScroll}
        />
      </div>

      {/* Operations */}
      <div className="flex flex-col items-center justify-center gap-2 px-2">
        <Button
          size={buttonSize}
          onClick={moveToRight}
          disabled={disabled || !canMoveToRight}
          aria-label={`Move ${leftSelectedKeys.length} items to target`}
          className="min-w-[2.5rem]"
        >
          {operations[0]}
        </Button>
        <Button
          size={buttonSize}
          onClick={moveToLeft}
          disabled={disabled || !canMoveToLeft}
          aria-label={`Move ${rightSelectedKeys.length} items to source`}
          className="min-w-[2.5rem]"
        >
          {operations[1]}
        </Button>
      </div>

      {/* Right List */}
      <div className="flex-1">
        <TransferList
          direction="right"
          items={rightItems}
          selectedKeys={rightSelectedKeys}
          config={listConfig}
          title={rightTitle}
          searchValue={rightSearchValue}
          onSelect={selectRight}
          onSelectAll={selectAllRight}
          onSearch={handleRightSearch}
          onScroll={handleRightScroll}
        />
      </div>
    </div>
  )
})

Transfer.displayName = 'Transfer'
