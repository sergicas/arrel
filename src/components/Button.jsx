import React from 'react';
import { Loader2 } from 'lucide-react';

const Button = ({
    children,
    onClick,
    variant = 'primary',
    size = 'lg',
    className = '',
    isLoading = false,
    disabled = false,
    type = 'button',
    ...props
}) => {
    const baseStyles =
        'rounded-full font-bold transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';

    const variants = {
        primary:
            'bg-gray-900 text-white hover:bg-black shadow-xl hover:scale-105',
        secondary:
            'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm',
        outline:
            'bg-transparent text-gray-900 border border-gray-900 hover:bg-gray-900 hover:text-white',
        ghost:
            'bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100',
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-10 py-5 text-xl min-w-[200px]',
    };

    return (
        <button
            type={type}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            onClick={onClick}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? (
                <>
                    <Loader2 className="animate-spin" size={size === 'lg' ? 24 : 18} />
                    <span>Processant...</span>
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default Button;
