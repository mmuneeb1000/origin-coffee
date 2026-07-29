import { forwardRef } from "react";
import { FiChevronDown } from "react-icons/fi";

const Select = forwardRef(
  (
    {
      label,
      options = [],
      placeholder = "Select an option",
      error,
      helperText,
      required = false,
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

        <div className="relative">
          <select
            ref={ref}
            className={`w-full appearance-none rounded-xl border bg-white px-4 py-2.5 pr-10 transition-all duration-200
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                : "border-gray-300 focus:border-amber-800 focus:ring-2 focus:ring-amber-700/20"
            }
            focus:outline-none
            ${className}`}
            {...props}
          >
            <option value="">{placeholder}</option>

            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>

        {error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : (
          helperText && <p className="text-sm text-gray-500">{helperText}</p>
        )}
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
