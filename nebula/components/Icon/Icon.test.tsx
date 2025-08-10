import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/preact'
import { Icon } from './Icon'

describe('Icon', () => {
    it('renders with default props', () => {
        render(<Icon data-testid="icon"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" /></Icon>)
        const icon = screen.getByTestId('icon')
        expect(icon).toBeInTheDocument()
        expect(icon).toHaveClass('w-5', 'h-5', 'text-current')
        expect(icon.tagName).toBe('svg')
    })

    it('applies size classes correctly', () => {
        const sizes = [
            { size: 'xs', class: 'w-3 h-3' },
            { size: 'sm', class: 'w-4 h-4' },
            { size: 'md', class: 'w-5 h-5' },
            { size: 'lg', class: 'w-6 h-6' },
            { size: 'xl', class: 'w-8 h-8' },
            { size: '2xl', class: 'w-10 h-10' }
        ] as const

        sizes.forEach(({ size, class: expectedClass }) => {
            const { container } = render(<Icon size={size} data-testid={`icon-${size}`} />)
            const icon = container.querySelector('svg')
            expect(icon).toHaveClass(expectedClass.split(' ')[0], expectedClass.split(' ')[1])
        })
    })

    it('applies color classes correctly', () => {
        const colors = [
            { color: 'inherit', class: 'text-inherit' },
            { color: 'current', class: 'text-current' },
            { color: 'primary', class: 'text-blue-600' },
            { color: 'secondary', class: 'text-gray-600' },
            { color: 'success', class: 'text-green-600' },
            { color: 'warning', class: 'text-yellow-600' },
            { color: 'error', class: 'text-red-600' },
            { color: 'muted', class: 'text-gray-500' }
        ] as const

        colors.forEach(({ color, class: expectedClass }) => {
            const { container } = render(<Icon color={color} />)
            const icon = container.querySelector('svg')
            expect(icon).toHaveClass(expectedClass)
        })
    })

    it('renders built-in icons correctly', () => {
        render(<Icon name="star" data-testid="star-icon" />)
        const icon = screen.getByTestId('star-icon')
        expect(icon).toBeInTheDocument()

        const path = icon.querySelector('path')
        expect(path).toBeInTheDocument()
        expect(path).toHaveAttribute('d', 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z')
    })

    it('renders custom SVG children', () => {
        render(
            <Icon data-testid="custom-icon">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12l2 2 4-4" />
            </Icon>
        )

        const icon = screen.getByTestId('custom-icon')
        expect(icon.querySelector('circle')).toBeInTheDocument()
        expect(icon.querySelector('path')).toBeInTheDocument()
    })

    it('handles spin animation', () => {
        render(<Icon spin data-testid="spinning-icon" />)
        const icon = screen.getByTestId('spinning-icon')
        expect(icon).toHaveClass('animate-spin')
    })

    it('handles filled vs outlined icons', () => {
        const { rerender } = render(<Icon filled data-testid="filled-icon" />)
        let icon = screen.getByTestId('filled-icon')
        expect(icon).toHaveClass('fill-current')
        expect(icon).not.toHaveClass('fill-none')
        expect(icon).toHaveAttribute('stroke-width', '0')

        rerender(<Icon filled={false} data-testid="filled-icon" />)
        icon = screen.getByTestId('filled-icon')
        expect(icon).toHaveClass('fill-none', 'stroke-current')
        expect(icon).toHaveAttribute('stroke-width', '2')
    })

    it('supports custom viewBox and strokeWidth', () => {
        render(
            <Icon
                viewBox="0 0 16 16"
                strokeWidth={3}
                data-testid="custom-icon"
            />
        )

        const icon = screen.getByTestId('custom-icon')
        expect(icon).toHaveAttribute('viewBox', '0 0 16 16')
        expect(icon).toHaveAttribute('stroke-width', '3')
    })

    it('applies custom className', () => {
        render(<Icon className="custom-class" data-testid="icon" />)
        const icon = screen.getByTestId('icon')
        expect(icon).toHaveClass('custom-class')
    })

    it('forwards ref correctly', () => {
        const ref = vi.fn()
        render(<Icon ref={ref} />)
        expect(ref).toHaveBeenCalled()
    })

    it('has proper accessibility attributes', () => {
        render(<Icon data-testid="icon" />)
        const icon = screen.getByTestId('icon')
        expect(icon).toHaveAttribute('aria-hidden', 'true')
        expect(icon).toHaveAttribute('focusable', 'false')
    })

    describe('Built-in icons', () => {
        const builtInIconNames = [
            'chevron-up', 'chevron-down', 'chevron-left', 'chevron-right',
            'plus', 'minus', 'x', 'check', 'star', 'heart', 'home', 'user',
            'search', 'settings', 'info', 'warning', 'error', 'success'
        ]

        builtInIconNames.forEach((iconName) => {
            it(`renders ${iconName} icon`, () => {
                render(<Icon name={iconName} data-testid={`${iconName}-icon`} />)
                const icon = screen.getByTestId(`${iconName}-icon`)
                expect(icon).toBeInTheDocument()

                const path = icon.querySelector('path')
                expect(path).toBeInTheDocument()
                expect(path).toHaveAttribute('d')
            })
        })
    })

    describe('Edge cases', () => {
        it('handles unknown icon names gracefully', () => {
            render(<Icon name="non-existent-icon" data-testid="icon" />)
            const icon = screen.getByTestId('icon')
            expect(icon).toBeInTheDocument()

            // Should render empty SVG with no path when icon name doesn't exist
            const path = icon.querySelector('path')
            expect(path).toBeNull()
        })

        it('prioritizes children over name prop', () => {
            render(
                <Icon name="star" data-testid="icon">
                    <circle cx="12" cy="12" r="5" />
                </Icon>
            )

            const icon = screen.getByTestId('icon')
            const circle = icon.querySelector('circle')
            const path = icon.querySelector('path')

            expect(circle).toBeInTheDocument()
            // Should not render the star path when children are provided
            expect(path).toBeNull()
        })
    })
})
