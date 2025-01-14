import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { InfoIcon } from 'lucide-react';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { DEFAULT_MAPPING_TEXT } from '../services/mappingConfig';
import FileInput from './file-input';
import { PageSection } from './page-section';

const LOWEST_OCTAVE_INFO_TEXT = `Set this to the lowest octave that your MIDI editor uses 
to ensure that the notes are mapped correctly`;

interface MappingConfigViewProps {
	className?: string;
	lowestOctave: number;
	text: string;
	onLowestOctaveChange(value: number): void;
	onTextChange(text: string): void;
}

export const MappingConfigView = ({
	className,
	lowestOctave,
	text,
	onLowestOctaveChange,
	onTextChange,
}: MappingConfigViewProps) => {
	const { getRootProps } = useDropzone({
		accept: {
			'text/plain': [],
		},
		onDropAccepted: (files: File[]) => {
			files[0].text().then(onTextChange);
		},
	});

	const onFileSelected = async (e: React.FormEvent<HTMLInputElement>) => {
		const files = e.currentTarget.files;
		if (files?.length) {
			const text = await files.item(0)?.text();
			if (text) {
				onTextChange(text);
			}
		}
	};

	return (
		<PageSection
			className={cn('h-full', className)}
			{...getRootProps()}
			title="Mappings"
			headerRight={
				<div className="flex items-center">
					<div className="flex items-center ml-4">
						<div className="text-sm">Lowest octave</div>
						<Select
							defaultValue={lowestOctave.toString()}
							onValueChange={(value) => onLowestOctaveChange(Number.parseInt(value))}
						>
							<SelectTrigger>
								<SelectValue placeholder="Lowest octave" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="-2">-2</SelectItem>
								<SelectItem value="-1">-1</SelectItem>
								<SelectItem value="0">0</SelectItem>
							</SelectContent>
						</Select>
					</div>
					<div className="ml-4">
						<FileInput inputText="" buttonText="Import Mappings" onChange={onFileSelected} />
					</div>
				</div>
			}
		>
			<Textarea
				className="h-full"
				rows={20}
				placeholder={DEFAULT_MAPPING_TEXT}
				value={text}
				onChange={(e) => onTextChange(e.target.value)}
			/>
		</PageSection>
	);
};
