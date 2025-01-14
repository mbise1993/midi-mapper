import { Button } from '@/components/ui/button';
import React, { useId } from 'react';

interface FileInputProps {
	inputText?: string;
	buttonText?: string;
	multiple?: boolean;
	onChange(e: React.FormEvent<HTMLInputElement>): void;
}

export default function FileInput({
	inputText = 'Choose file...',
	buttonText = 'Browse',
	multiple = false,
	onChange,
}: FileInputProps) {
	const fileInputId = useId();

	function handleClick() {
		document.getElementById(fileInputId)?.click();
	}

	return (
		<div className="flex items-center">
			<div>{inputText}</div>
			<Button onClick={handleClick}>
				{buttonText}
				<input hidden id={fileInputId} multiple={multiple} type="file" onChange={onChange} />
			</Button>
		</div>
	);
}
