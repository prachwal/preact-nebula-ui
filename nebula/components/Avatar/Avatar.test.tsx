import { render, screen, fireEvent } from '@testing-library/preact'
import { describe, it, expect, vi } from 'vitest'
import { Avatar, AvatarGroup, AvatarBadge } from './index'

describe('Avatar', () => {
  describe('Image Avatar', () => {
    it('should render with image source', () => {
      render(<Avatar src="https://example.com/avatar.jpg" alt="User Avatar" />)
      
      const img = screen.getByRole('img')
      expect(img).toBeInTheDocument()
      expect(img).toHaveAttribute('src', 'https://example.com/avatar.jpg')
      expect(img).toHaveAttribute('alt', 'User Avatar')
    })

    it('should handle image load error', () => {
      const onError = vi.fn()
      render(
        <Avatar 
          src="https://example.com/invalid.jpg" 
          name="John Doe" 
          onError={onError}
        />
      )
      
      const img = screen.getByRole('img')
      fireEvent.error(img)
      
      expect(onError).toHaveBeenCalled()
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should show loading placeholder initially', () => {
      render(<Avatar src="https://example.com/avatar.jpg" />)
      
      const placeholder = screen.getByRole('img').parentElement?.querySelector('.animate-pulse')
      expect(placeholder).toBeInTheDocument()
    })

    it('should hide loading placeholder when image loads', () => {
      render(<Avatar src="https://example.com/avatar.jpg" />)
      
      const img = screen.getByRole('img')
      fireEvent.load(img)
      
      expect(img).toHaveClass('opacity-100')
    })
  })

  describe('Initials Avatar', () => {
    it('should generate initials from name', () => {
      render(<Avatar name="John Doe" />)
      
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should generate initials from first and last name only', () => {
      render(<Avatar name="John Michael Doe Smith" />)
      
      expect(screen.getByText('JM')).toBeInTheDocument()
    })

    it('should handle single name', () => {
      render(<Avatar name="John" />)
      
      expect(screen.getByText('J')).toBeInTheDocument()
    })

    it('should handle empty name', () => {
      const { container } = render(<Avatar name="" />)
      
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
    })

    it('should use alt as fallback for name', () => {
      render(<Avatar alt="John Doe" />)
      
      expect(screen.getByText('JD')).toBeInTheDocument()
    })
  })

  describe('Custom Content Avatar', () => {
    it('should render custom children', () => {
      render(
        <Avatar>
          <span>🎭</span>
        </Avatar>
      )
      
      expect(screen.getByText('🎭')).toBeInTheDocument()
    })

    it('should prioritize custom children over initials', () => {
      render(
        <Avatar name="John Doe">
          <span>Custom</span>
        </Avatar>
      )
      
      expect(screen.getByText('Custom')).toBeInTheDocument()
      expect(screen.queryByText('JD')).not.toBeInTheDocument()
    })
  })

  describe('Default Avatar', () => {
    it('should render default person icon when no content', () => {
      const { container } = render(<Avatar />)
      
      const svg = container.querySelector('svg')
      expect(svg).toBeInTheDocument()
      expect(svg).toHaveAttribute('fill', 'currentColor')
    })
  })

  describe('Size Variants', () => {
    it('should apply size classes correctly', () => {
      const { rerender, container } = render(<Avatar size="xs" name="John" />)
      expect(container.firstChild).toHaveClass('w-6', 'h-6', 'text-xs')

      rerender(<Avatar size="sm" name="John" />)
      expect(container.firstChild).toHaveClass('w-8', 'h-8', 'text-sm')

      rerender(<Avatar size="md" name="John" />)
      expect(container.firstChild).toHaveClass('w-10', 'h-10', 'text-base')

      rerender(<Avatar size="lg" name="John" />)
      expect(container.firstChild).toHaveClass('w-12', 'h-12', 'text-lg')

      rerender(<Avatar size="xl" name="John" />)
      expect(container.firstChild).toHaveClass('w-16', 'h-16', 'text-xl')

      rerender(<Avatar size="2xl" name="John" />)
      expect(container.firstChild).toHaveClass('w-20', 'h-20', 'text-2xl')
    })

    it('should default to md size', () => {
      const { container } = render(<Avatar name="John" />)
      
      expect(container.firstChild).toHaveClass('w-10', 'h-10', 'text-base')
    })
  })

  describe('Shape Variants', () => {
    it('should apply shape classes correctly', () => {
      const { rerender, container } = render(<Avatar shape="circle" name="John" />)
      expect(container.firstChild).toHaveClass('rounded-full')

      rerender(<Avatar shape="square" name="John" />)
      expect(container.firstChild).toHaveClass('rounded-none')

      rerender(<Avatar shape="rounded" name="John" />)
      expect(container.firstChild).toHaveClass('rounded-lg')
    })

    it('should default to circle shape', () => {
      const { container } = render(<Avatar name="John" />)
      
      expect(container.firstChild).toHaveClass('rounded-full')
    })
  })

  describe('Loading Behavior', () => {
    it('should set loading attribute on image', () => {
      const { rerender } = render(<Avatar src="test.jpg" loading="eager" />)
      expect(screen.getByRole('img')).toHaveAttribute('loading', 'eager')

      rerender(<Avatar src="test.jpg" loading="lazy" />)
      expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')
    })

    it('should default to lazy loading', () => {
      render(<Avatar src="test.jpg" />)
      
      expect(screen.getByRole('img')).toHaveAttribute('loading', 'lazy')
    })
  })

  describe('Accessibility', () => {
    it('should have proper img attributes', () => {
      render(<Avatar src="test.jpg" alt="User profile" />)
      
      const img = screen.getByRole('img')
      expect(img).toHaveAttribute('alt', 'User profile')
      expect(img).toHaveAttribute('draggable', 'false')
    })

    it('should use name as alt fallback', () => {
      render(<Avatar src="test.jpg" name="John Doe" />)
      
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'John Doe')
    })

    it('should have default alt for image without name/alt', () => {
      render(<Avatar src="test.jpg" />)
      
      expect(screen.getByRole('img')).toHaveAttribute('alt', 'Avatar')
    })

    it('should hide decorative SVG from screen readers', () => {
      const { container } = render(<Avatar />)
      
      const svg = container.querySelector('svg')
      expect(svg).toHaveAttribute('aria-hidden', 'true')
    })
  })

  describe('Custom Props', () => {
    it('should accept custom className', () => {
      const { container } = render(<Avatar className="custom-class" name="John" />)
      
      expect(container.firstChild).toHaveClass('custom-class')
    })

    it('should accept data-testid', () => {
      render(<Avatar data-testid="custom-avatar" name="John" />)
      
      expect(screen.getByTestId('custom-avatar')).toBeInTheDocument()
    })

    it('should forward other props', () => {
      const { container } = render(<Avatar title="User Avatar" name="John" />)
      
      expect(container.firstChild).toHaveAttribute('title', 'User Avatar')
    })
  })
})

describe('AvatarGroup', () => {
  it('should render multiple avatars', () => {
    render(
      <AvatarGroup>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
      </AvatarGroup>
    )
    
    expect(screen.getByText('JD')).toBeInTheDocument()
    expect(screen.getByText('JS')).toBeInTheDocument()
    expect(screen.getByText('BJ')).toBeInTheDocument()
  })

  it('should limit avatars based on max prop', () => {
    render(
      <AvatarGroup max={2}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
        <Avatar name="Alice Brown" />
      </AvatarGroup>
    )
    
    expect(screen.getByText('JD')).toBeInTheDocument()
    expect(screen.getByText('JS')).toBeInTheDocument()
    expect(screen.queryByText('BJ')).not.toBeInTheDocument()
    expect(screen.queryByText('AB')).not.toBeInTheDocument()
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('should show correct overflow count', () => {
    render(
      <AvatarGroup max={1}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
        <Avatar name="Bob Johnson" />
      </AvatarGroup>
    )
    
    expect(screen.getByText('+2')).toBeInTheDocument()
  })

  it('should not show overflow when within limit', () => {
    render(
      <AvatarGroup max={5}>
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
      </AvatarGroup>
    )
    
    expect(screen.queryByText(/^\+/)).not.toBeInTheDocument()
  })

  it('should apply size and shape to all children', () => {
    const { container } = render(
      <AvatarGroup size="lg" shape="square">
        <Avatar name="John Doe" />
        <Avatar name="Jane Smith" />
      </AvatarGroup>
    )
    
    const avatars = container.querySelectorAll('[class*="w-12"]')
    expect(avatars).toHaveLength(2)
    avatars.forEach(avatar => {
      expect(avatar).toHaveClass('w-12', 'h-12', 'text-lg', 'rounded-none')
    })
  })

  it('should apply spacing classes', () => {
    const { rerender, container } = render(
      <AvatarGroup spacing="tight">
        <Avatar name="John Doe" />
      </AvatarGroup>
    )
    expect(container.firstChild).toHaveClass('-space-x-1')

    rerender(
      <AvatarGroup spacing="normal">
        <Avatar name="John Doe" />
      </AvatarGroup>
    )
    expect(container.firstChild).toHaveClass('-space-x-2')

    rerender(
      <AvatarGroup spacing="loose">
        <Avatar name="John Doe" />
      </AvatarGroup>
    )
    expect(container.firstChild).toHaveClass('-space-x-3')
  })

  it('should add ring styles to avatars', () => {
    const { container } = render(
      <AvatarGroup>
        <Avatar name="John Doe" />
      </AvatarGroup>
    )
    
    const avatar = container.querySelector('[class*="ring-2"]')
    expect(avatar).toHaveClass('ring-2', 'ring-white', 'dark:ring-gray-800')
  })
})

describe('AvatarBadge', () => {
  it('should render badge content', () => {
    render(
      <div className="relative">
        <Avatar name="John Doe" />
        <AvatarBadge>5</AvatarBadge>
      </div>
    )
    
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should apply placement classes correctly', () => {
    const { rerender } = render(
      <AvatarBadge placement="top-start">Badge</AvatarBadge>
    )
    expect(screen.getByText('Badge')).toHaveClass('top-0', 'left-0', '-translate-x-1/2', '-translate-y-1/2')

    rerender(<AvatarBadge placement="top-end">Badge</AvatarBadge>)
    expect(screen.getByText('Badge')).toHaveClass('top-0', 'right-0', 'translate-x-1/2', '-translate-y-1/2')

    rerender(<AvatarBadge placement="bottom-start">Badge</AvatarBadge>)
    expect(screen.getByText('Badge')).toHaveClass('bottom-0', 'left-0', '-translate-x-1/2', 'translate-y-1/2')

    rerender(<AvatarBadge placement="bottom-end">Badge</AvatarBadge>)
    expect(screen.getByText('Badge')).toHaveClass('bottom-0', 'right-0', 'translate-x-1/2', 'translate-y-1/2')
  })

  it('should default to bottom-end placement', () => {
    render(<AvatarBadge>Badge</AvatarBadge>)
    
    expect(screen.getByText('Badge')).toHaveClass('bottom-0', 'right-0', 'translate-x-1/2', 'translate-y-1/2')
  })

  it('should have badge styling', () => {
    render(<AvatarBadge>5</AvatarBadge>)
    
    const badge = screen.getByText('5')
    expect(badge).toHaveClass(
      'absolute',
      'inline-flex',
      'items-center',
      'justify-center',
      'px-1.5',
      'py-0.5',
      'text-xs',
      'font-medium',
      'text-white',
      'bg-red-500',
      'border-2',
      'border-white',
      'dark:border-gray-800',
      'rounded-full',
      'min-w-[1.25rem]',
      'h-5'
    )
  })
})
