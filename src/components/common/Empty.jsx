import Button from "./Button";
import { FiInbox } from "react-icons/fi";

export default function Empty({
  title = "Nothing Here",
  description = "No data available.",
  actionText,
  onAction,
  icon: Icon = FiInbox,
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-dashed border-gray-300 bg-white px-8 py-16 text-center">
      <div className="mb-6 rounded-full bg-amber-100 p-5 text-amber-800">
        <Icon size={34} />
      </div>

      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>

      <p className="mt-2 max-w-md text-gray-500">{description}</p>

      {actionText && (
        <Button className="mt-8" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
