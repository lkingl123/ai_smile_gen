'use client';

import { useState } from 'react';

export default function PhotoUpload() {
  const [image, setImage] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Upload Your Photo
      </h2>
      <div className="flex flex-col items-center">
        <label
          htmlFor="photo-upload"
          className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
        >
          Choose File
        </label>
        <input
          id="photo-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />
      </div>

      {image && (
        <div className="mt-6">
          <p className="text-center text-gray-600 mb-2">Preview:</p>
          <div className="flex justify-center items-center border border-gray-300 p-4 rounded-lg shadow-md">
            <img
              src={image}
              alt="Uploaded Preview"
              className="max-w-full max-h-64 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
