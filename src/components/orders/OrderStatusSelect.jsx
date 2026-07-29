import { Select } from "../common";

const statuses = [
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "preparing",
    label: "Preparing",
  },
  {
    value: "ready",
    label: "Ready",
  },
  {
    value: "completed",
    label: "Completed",
  },
  {
    value: "cancelled",
    label: "Cancelled",
  },
];

export default function OrderStatusSelect({
  value,
  onChange,
  disabled = false,
}) {
  return (
    <Select
      label="Order Status"
      value={value}
      disabled={disabled}
      options={statuses}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
