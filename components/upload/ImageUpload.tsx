'use client';

import Image from 'next/image';
import { memo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageUploadProps {
  type?: 'profile';
  value?: string;
  onChange: (base64: string) => void;
  disabled: boolean;
}

const ImageUpload = ({ type, value, onChange, disabled }: ImageUploadProps) => {
  const handleDrop = useCallback(
    (files: File[]) => {
      const file = files[0];

      const reader = new FileReader();

      reader.onload = (e: any) => {
        onChange(e.target.result);
      };

      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    onDrop: handleDrop,
    accept: {
      'image/jpg': ['.jpg'],
      'image/jpeg': ['.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    disabled,
  });

  return (
    <div
      {...getRootProps({
        className:
          'w-full p-4 flex items-center justify-center border-2 border-dotted border-neutral-700 rounded-md',
      })}
    >
      <input {...getInputProps()} />
      {value ? (
        type === 'profile' ? (
          <div className='relative h-24 w-24'>
            <Image
              src={value}
              alt='profile'
              className='rounded-full object-cover'
              fill
            />
          </div>
        ) : (
          <div className='relative h-60 w-full'>
            <Image
              src={value}
              alt='image'
              className='rounded-sm object-cover'
              fill
            />
          </div>
        )
      ) : (
        <p>Please upload an image file!</p>
      )}
    </div>
  );
};

export default memo(ImageUpload);
