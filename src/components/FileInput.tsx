import React from 'react';

import styles from './FileInput.module.scss';

interface FileInputProps {
  inputText?: string;
  buttonText?: string;
  buttonClass?: string;
  multiple?: boolean;
  onChange(e: React.FormEvent<HTMLInputElement>): void;
}

export default function FileInput({
  inputText = 'Choose file...',
  buttonText = 'Browse',
  buttonClass = 'mm-btn-default',
  multiple = false,
  onChange,
}: FileInputProps) {
  return (
    <div className={styles.container}>
      <span>{inputText}</span>
      <button className={buttonClass}>
        {buttonText}
        <input hidden multiple={multiple} type="file" onChange={onChange} />
      </button>
    </div>
  );
}
