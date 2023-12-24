'use client';

import { memo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

interface AudioUploadProps {
  value?: string;
  onChange: (base64: string) => void;
  disabled: boolean;
}

const AudioUpload = ({ value, onChange, disabled }: AudioUploadProps) => {
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
      'audio/mpeg': ['.mp3'],
    },
    disabled,
  });

  return (
    <div
      {...getRootProps({
        className:
          'cursor-pointer w-full p-4 flex items-center justify-center border-2 border-dotted border-neutral-700 rounded-md',
      })}
    >
      <input {...getInputProps()} />
      {value ? (
        <div className='relative h-full w-full'>
          <audio className='w-full' controls>
            <source src={value} type='audio/mpeg' />
            Your browser does not support the audio tag.
          </audio>
        </div>
      ) : (
        <p>Please upload an audio file!</p>
      )}
    </div>
  );
};

export default memo(AudioUpload);
