import React from 'react';
import { useDropzone } from 'react-dropzone';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { TrashIcon } from 'lucide-react';
import FileInput from './file-input';
import { PageSection } from './page-section';

interface MidiFilesViewProps {
	className?: string;
	files: File[];
	onFilesSelected(files: File[]): void;
	onDeleteClick(file: File): void;
}

export const MidiFilesView = ({
	className,
	files,
	onFilesSelected,
	onDeleteClick,
}: MidiFilesViewProps) => {
	const { getRootProps } = useDropzone({
		onDropAccepted: (files: File[]) => {
			onFilesSelected(files);
		},
	});

	const onMidiFilesChange = (e: React.FormEvent<HTMLInputElement>) => {
		if (!e.currentTarget.files) {
			return;
		}

		const updatedFiles: File[] = [];
		for (let i = 0; i < e.currentTarget.files.length; ++i) {
			const file = e.currentTarget.files.item(i);
			if (file) {
				updatedFiles.push(file);
			}
		}

		onFilesSelected(updatedFiles);
	};

	const renderPlaceholder = () => {
		return (
			<div className="flex items-center justify-center w-full p-4 mt-16">
				<h5 className="text-muted-foreground">Drag and drop or select MIDI files to map</h5>
			</div>
		);
	};

	const renderList = () => {
		return (
			<ul>
				{files.map((file) => (
					<li key={file.name} className="flex items-center justify-between px-4 py-2">
						<div>{file.name}</div>
						<div>
							<Button variant="ghost" size="icon" onClick={() => onDeleteClick(file)}>
								<TrashIcon />
							</Button>
						</div>
					</li>
				))}
			</ul>
		);
	};

	return (
		<PageSection
			className={cn('h-full', className)}
			{...getRootProps()}
			title="MIDI Files"
			headerRight={
				<FileInput
					multiple
					inputText=""
					buttonText="Select MIDI Files"
					onChange={onMidiFilesChange}
				/>
			}
		>
			{files.length === 0 ? renderPlaceholder() : renderList()}
		</PageSection>
	);
};
