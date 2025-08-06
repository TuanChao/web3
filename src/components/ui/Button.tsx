import React from 'react'
import { cn } from '../../utils'
import './Button.css'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'btn btn-primary',
      secondary: 'btn btn-secondary',
      outline: 'btn btn-outline',
      ghost: 'btn btn-ghost',
    }
    const sizes = {
      sm: 'btn-sm',
      md: 'btn-md',
      lg: 'btn-lg',
    }
    return (
      <button
        className={[
          variants[variant],
          sizes[size],
          className
        ].filter(Boolean).join(' ')}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
