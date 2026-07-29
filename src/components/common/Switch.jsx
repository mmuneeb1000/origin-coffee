const Switch = ({
  checked = false,
  onChange,
  label,
  description,
  disabled = false,
}) => {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4">
      <div>
        {label && <p className="font-medium text-gray-800">{label}</p>}

        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>

      <button
        type="button"
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 rounded-full transition-all duration-200
        ${checked ? "bg-amber-800" : "bg-gray-300"}
        disabled:cursor-not-allowed disabled:opacity-50`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200
          ${checked ? "left-6" : "left-1"}`}
        />
      </button>
    </label>
  );
};

export default Switch;
