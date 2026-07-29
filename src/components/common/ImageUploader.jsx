import { useEffect, useRef, useState } from "react";
import { FiImage, FiUploadCloud, FiTrash2 } from "react-icons/fi";
import Button from "./Button";
import Loading from "./Loading";
import useUpload from "../../hooks/useUpload";

export default function ImageUploader({
  value = "",
  onChange,
  label = "Image",
  accept = "image/*",
  maxSize = 5 * 1024 * 1024,
}) {
  const inputRef = useRef(null);

  const { upload, uploading } = useUpload();

  const [preview, setPreview] = useState(value);
  const [error, setError] = useState("");

  useEffect(() => {
    setPreview(value);
  }, [value]);

  const handleUpload = async (file) => {
    if (!file) return;

    setError("");

    if (!file.type.startsWith("image/")) {
      setError("Please select an image.");
      return;
    }

    if (file.size > maxSize) {
      setError("Image must be smaller than 5MB.");
      return;
    }

    try {
      const image = await upload(file);

      setPreview(image.url);

      onChange?.(image);
    } catch (err) {
      setError(err.message || "Upload failed.");
    }
  };

  const handleFile = (e) => {
    handleUpload(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files[0]);
  };

  const removeImage = () => {
    setPreview("");
    setError("");

    onChange?.({
      url: "",
      fileName: "",
    });

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      {preview ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <img
            src={preview}
            alt="Preview"
            className="h-64 w-full object-cover"
          />

          <div className="flex justify-end gap-2 border-t border-gray-200 p-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              Change
            </Button>

            <Button
              type="button"
              variant="danger"
              icon={FiTrash2}
              onClick={removeImage}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 bg-white p-10 transition hover:border-amber-800 hover:bg-amber-50"
        >
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-amber-100 p-4 text-amber-800">
              <FiImage size={30} />
            </div>

            <h3 className="font-semibold text-gray-800">Upload Image</h3>

            <p className="mt-2 text-sm text-gray-500">
              Drag & drop an image here
            </p>

            <p className="text-sm text-gray-500">or click to browse</p>

            <Button type="button" className="mt-6" icon={FiUploadCloud}>
              Choose Image
            </Button>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        hidden
        onChange={handleFile}
      />

      {uploading && <Loading text="Uploading image..." />}

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
