import { forwardRef } from "react";
import { FiLoader } from "react-icons/fi";

const Button = forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      loading = false,
      disabled = false,
      icon: Icon,
      className = "",
      type = "button",
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: "bg-amber-800 text-white hover:bg-amber-900",
      secondary:
        "border border-gray-300 bg-white text-gray-700 hover:bg-gray-100",
      danger: "bg-red-600 text-white hover:bg-red-700",
    };

    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-5",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={`inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-amber-700
          disabled:cursor-not-allowed disabled:opacity-60
          ${variants[variant]}
          ${sizes[size]}
          ${className}`}
        {...props}
      >
        {loading ? (
          <FiLoader className="h-4 w-4 animate-spin" />
        ) : (
          Icon && <Icon className="h-4 w-4" />
        )}

        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
