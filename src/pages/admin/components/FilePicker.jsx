import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload, X } from 'lucide-react';

const FilePicker = ({ sectionKey, image, onUpload, onRemove }) => {
  const fileInputRef = React.useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(sectionKey, image.id, file);
    }
  };

  const handleRemove = () => {
    onRemove(sectionKey, image.id);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(sectionKey, image.id, file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className='flex flex-col space-y-2'>
      <Label className='text-sm font-medium text-gray-700'>
        {image.placeholder}
      </Label>
      <div className='relative'>
        {image.url ? (
          <div className='relative group'>
            <img
              src={image.url}
              alt={image.placeholder}
              className='w-full h-32 object-cover rounded-lg border border-gray-200'
            />
            <Button
              variant='destructive'
              size='sm'
              className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
              onClick={handleRemove}
            >
              <X className='h-4 w-4' />
            </Button>
          </div>
        ) : (
          <div className='relative'>
            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              onChange={handleFileSelect}
              className='hidden'
            />

            {/* Combined file picker area */}
            <div
              className={`w-full h-32 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragOver
                  ? 'border-blue-400 bg-blue-50'
                  : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleClick}
            >
              <Upload className='h-8 w-8 text-gray-400 mb-2' />
              <Button
                type='button'
                variant='outline'
                className='mb-2 bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick();
                }}
              >
                Choose File
              </Button>
              <span className='text-sm text-gray-500'>or drag & drop here</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilePicker;
