import { useEffect, useState } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import OrderDetails from "./OrderDetails";
import OrderStatusSelect from "./OrderStatusSelect";

export default function OrderModal({ open, onClose, order, updateStatus }) {
  const [status, setStatus] = useState(order?.status || "pending");

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setStatus(order?.status || "pending");
  }, [order]);

  if (!order) return null;

  const handleStatusUpdate = async () => {
    if (status === order.status) return;

    try {
      setSaving(true);

      await updateStatus(order.id, status);

      onClose();
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={`Order #${order.id.slice(0, 8)}`}
      size="lg"
    >
      <div className="space-y-6">
        <OrderDetails order={order} />

        <div className="border-t pt-6">
          <OrderStatusSelect
            value={status}
            onChange={setStatus}
            disabled={saving}
          />

          <div className="mt-5 flex justify-end gap-3">
            <Button variant="secondary" onClick={onClose} disabled={saving}>
              Close
            </Button>

            <Button onClick={handleStatusUpdate} loading={saving}>
              Update Status
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
