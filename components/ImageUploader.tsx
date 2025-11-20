import React, { useCallback, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { ImageFile } from '../types';

interface ImageUploaderProps {
  onImageSelected: (image: ImageFile | null) => void;
  selectedImage: ImageFile | null;
  isAnalyzing: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, selectedImage, isAnalyzing }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    processFile(file);
  }, []);

  const processFile = (file: File | undefined) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        onImageSelected({
          file,
          previewUrl: URL.createObjectURL(file),
          base64
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    onImageSelected(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto mb-8">
      <div
        className={`
          relative w-full min-h-[300px] border-4 border-pop-black rounded-3xl
          flex flex-col items-center justify-center p-6
          transition-all duration-300 cursor-pointer overflow-hidden
          ${isDragging ? 'bg-pop-cyan/20 scale-105' : 'bg-white hover:shadow-hard'}
          ${selectedImage ? 'shadow-hard' : 'border-dashed'}
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        onClick={() => document.getElementById('fileInput')?.click()}
      >
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isAnalyzing}
        />

        {selectedImage ? (
          <div className="relative w-full h-full flex items-center justify-center group">
             <img
              src={selectedImage.previewUrl}
              alt="Preview"
              className="max-h-[400px] w-auto object-contain rounded-xl border-2 border-pop-black"
            />
            {!isAnalyzing && (
              <button
                onClick={clearImage}
                className="absolute top-2 right-2 bg-pop-pink text-white p-2 rounded-full border-2 border-pop-black hover:scale-110 transition-transform shadow-hard-sm"
              >
                <X size={20} strokeWidth={3} />
              </button>
            )}
          </div>
        ) : (
          <div className="text-center space-y-4">
            <div className="bg-pop-cyan w-20 h-20 mx-auto rounded-full flex items-center justify-center border-4 border-pop-black shadow-hard-sm">
              <Upload size={32} className="text-pop-black" strokeWidth={3} />
            </div>
            <div className="font-pop text-pop-black">
              <p className="text-xl mb-2">画像をドロップ！</p>
              <p className="text-sm opacity-70 font-sans">またはクリックして選択</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
