import { forwardRef } from "react";

const Textarea = forwardRef(
  (
    {
      label,
      error,
      helperText,
      required = false,
      rows = 5,
      className = "",
      ...props
    },
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

        <textarea
          ref={ref}
          rows={rows}
          className={`w-full resize-none rounded-xl border bg-white px-4 py-3 transition-all duration-200
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

Textarea.displayName = "Textarea";

export default Textarea;
