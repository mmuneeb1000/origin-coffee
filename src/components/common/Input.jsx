import { forwardRef } from "react";

const Input = forwardRef(
  (
    { label, error, helperText, required = false, className = "", ...props },
    ref,
  ) => {
    return (
      <div className="space-y-1">
        {label && (
          <label className="block text-sm font-medium text-gray-700">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <input
          ref={ref}
          className={`w-full rounded-xl border bg-white px-4 py-2.5 transition-all duration-200
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-700/20"
            }
            focus:outline-none
            ${className}`}
          {...props}
        />

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          helperText && <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
