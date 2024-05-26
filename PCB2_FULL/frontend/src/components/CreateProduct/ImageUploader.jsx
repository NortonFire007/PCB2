import { useState, useEffect } from 'react';
import { FaUpload } from 'react-icons/fa';

const ImageUploader = ({ setFiles, resetUploader, setResetUploader }) => {
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (resetUploader) {
      setPreviewImages([]);
      setFiles([]);
      setResetUploader(false); // Сброс флага после очистки
    }
  }, [resetUploader, setFiles, setResetUploader]);

  const handleImageChange = (event) => {
    if (
      event.target.files &&
      event.target.files[0] &&
      previewImages.length < 5
    ) {
      const file = event.target.files[0];
      const newImages = [...previewImages, URL.createObjectURL(file)];
      setPreviewImages(newImages);
      setFiles((prevFiles) => [...prevFiles, file]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = previewImages.filter((_, i) => i !== index);
    setPreviewImages(newImages);
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Фотографії
      </label>
      <div className="flex items-center mb-2">
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded flex items-center"
        >
          <FaUpload className="mr-2" />
          Завантажити фото
        </label>
      </div>
      <div className="flex space-x-2">
        {previewImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt="Upload preview"
              className="w-20 h-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;

// import { useState } from 'react';

// const ImageUploader = ({ setFiles }) => {
//   const [previewImages, setPreviewImages] = useState([]);

//   const handleImageChange = (event) => {
//     if (
//       event.target.files &&
//       event.target.files[0] &&
//       previewImages.length < 5
//     ) {
//       const file = event.target.files[0];
//       const newImages = [...previewImages, URL.createObjectURL(file)];
//       setPreviewImages(newImages);
//       setFiles((prevFiles) => [...prevFiles, file]);
//     }
//   };

//   const handleRemoveImage = (index) => {
//     const newImages = previewImages.filter((_, i) => i !== index);
//     setPreviewImages(newImages);
//     setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="mb-4">
//       <label className="block text-gray-700 text-sm font-bold mb-2">
//         Фотографии
//       </label>
//       <input
//         name="images"
//         type="file"
//         accept="image/*"
//         onChange={handleImageChange}
//         className="mb-2"
//       />
//       <div className="flex space-x-2">
//         {previewImages.map((image, index) => (
//           <div key={index} className="relative">
//             <img
//               src={image}
//               alt="Upload preview"
//               className="w-20 h-20 object-cover rounded"
//             />
//             <button
//               type="button"
//               onClick={() => handleRemoveImage(index)}
//               className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1"
//             >
//               x
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ImageUploader;
