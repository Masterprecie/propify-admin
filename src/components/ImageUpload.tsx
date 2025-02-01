import axios from "axios";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { IoCloudUploadOutline } from "react-icons/io5";
import { MdCancel } from "react-icons/md";

interface ImageUploadProps {
  labelName: string;
  required?: boolean;
  onFilesChange: (urls: string[]) => void;
  existingImages?: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  labelName,
  required,
  onFilesChange,
  existingImages = [],
}) => {
  useEffect(() => {
    setImageUrls(existingImages);
  }, [existingImages]);

  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const maxSize = 1 * 1024 * 1024; // 1MB in bytes
      const validFiles = acceptedFiles.filter(
        (file: File) => file.size <= maxSize
      );

      if (validFiles.length < acceptedFiles.length) {
        setError(
          "Some files were rejected because they exceed the 1MB size limit."
        );
      } else {
        setError(null); // Clear error if all files are valid
      }

      const uploadedUrls = await Promise.all(
        validFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", uploadPreset);

          const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${cloudinaryCloudName}/upload`,
            formData
          );

          return response.data.secure_url;
        })
      );

      setSelectedImages((prevImages) => [...prevImages, ...validFiles]);
      setImageUrls((prevUrls) => [...prevUrls, ...uploadedUrls]);
      onFilesChange([...imageUrls, ...uploadedUrls]); // Update parent with new URLs
    },
    [onFilesChange, imageUrls, uploadPreset, cloudinaryCloudName]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  // Handle removing an image from the list
  const handleRemoveImage = (index: number) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    const updatedUrls = imageUrls.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
    setImageUrls(updatedUrls);
    onFilesChange(updatedUrls);
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 items-center pb-2">
        <p className="block text-black text-sm font-medium ">
          {labelName}
          {required && <span className="text-red-500">*</span>}
        </p>
      </div>
      <div
        {...getRootProps()}
        className={`border p-4 rounded-md text-center cursor-pointer ${
          isDragActive ? "border-blue-500" : "border-gray-300"
        }`}
      >
        <input {...getInputProps()} className="file-input" />
        {isDragActive ? (
          <p className="text-blue-500">Drop the files here...</p>
        ) : (
          <p className="text-gray-500 flex flex-col justify-center items-center">
            <IoCloudUploadOutline />
            Click here to upload or drag and drop
          </p>
        )}
      </div>
      {error && <p className="text-red-500 text-xs  mt-2">{error}</p>}{" "}
      {/* Display error message */}
      <div className="preview-container mt-4">
        {imageUrls.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {imageUrls.map((url, index) => (
              <div key={index} className="relative border rounded p-1">
                <img
                  src={url}
                  alt={`Preview ${index}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  className="absolute top-1 right-1 text-red-500 cursor-pointer"
                  onClick={() => handleRemoveImage(index)}
                >
                  <MdCancel />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No images uploaded yet</p>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
