import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import React from 'react';
import { MappingConfigView } from './components/mapping-config-view';
import { MidiFilesView } from './components/midi-files-view';
import { DEFAULT_MAPPING_TEXT } from './services/mappingConfig';
import { MappingService } from './services/mappingService';
import { storageService } from './services/storageService';

const LOWEST_OCTAVE_STORAGE_KEY = 'lowest-octave';

export const App = () => {
	const [midiFiles, setMidiFiles] = React.useState<File[]>([]);
	const [lowestOctave, setLowestOctave] = React.useState(-1);
	const [mappingText, setMappingText] = React.useState(DEFAULT_MAPPING_TEXT);
	const [isLoading, setLoading] = React.useState(false);
	const [error, setError] = React.useState<string>();

	React.useEffect(() => {
		const storedLowestOctave = storageService.getInt(LOWEST_OCTAVE_STORAGE_KEY);
		if (storedLowestOctave) {
			setLowestOctave(storedLowestOctave);
		}
	}, []);

	const onMidiFilesSelected = (files: File[]) => {
		setMidiFiles([...midiFiles, ...files]);
	};

	const onFileDeleteClick = (deleteFile: File) => {
		const updatedFiles = midiFiles.filter((file) => file !== deleteFile);
		setMidiFiles(updatedFiles);
	};

	const onLowestOctaveChange = (value: number) => {
		setLowestOctave(value);
	};

	const onMappingTextChange = (text: string) => {
		setMappingText(text);
	};

	const onMapClick = async () => {
		try {
			setLoading(true);

			const mappingService = new MappingService(mappingText, lowestOctave);
			await mappingService.mapAndDownload(midiFiles);

			storageService.setItem(LOWEST_OCTAVE_STORAGE_KEY, lowestOctave);
			setError(undefined);
		} catch (e) {
			setError((e as Error).message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<div className="flex items-center justify-between p-4 bg-primary">
				<h1 className="text-primary-foreground text-2xl">MIDI Mapper</h1>
				<Button asChild className="text-primary-foreground" variant="link">
					<a
						href="https://github.com/mbise1993/midi-mapper/blob/master/README.md"
						target="_blank"
						title="View on GitHub"
						rel="noopener noreferrer"
					>
						Documentation
						{/* <GithubIcon className="h-6 bg-primary-foreground" /> */}
					</a>
				</Button>
			</div>

			<div className="flex flex-col items-center p-4 md:p-8 h-full">
				<div className="flex h-full gap-4 w-full">
					<MidiFilesView
						className="flex-1"
						files={midiFiles}
						onFilesSelected={onMidiFilesSelected}
						onDeleteClick={onFileDeleteClick}
					/>
					<MappingConfigView
						className="flex-1"
						lowestOctave={lowestOctave}
						text={mappingText}
						onLowestOctaveChange={onLowestOctaveChange}
						onTextChange={onMappingTextChange}
					/>
				</div>
				<Button
					className="mt-4 min-w-[200px]"
					disabled={isLoading || midiFiles.length === 0}
					onClick={onMapClick}
				>
					Map it!
				</Button>
			</div>

			<AlertDialog open={!!error} onOpenChange={(isOpen) => !isOpen && setError(undefined)}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Mapping Error :(</AlertDialogTitle>
						<AlertDialogDescription>{error}</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction onClick={() => setError(undefined)}>OK</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};
