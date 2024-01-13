import React from 'react';

import { FileType } from '../../../stores/file-system';

import { FaFileCirclePlus } from 'react-icons/fa6';

const CreateFile = ({
	setIsCreatingFile,
	findFilePath,
	currentFileId,
	addFileUnderFolder,
	getFilesInFolder,
}: {
	setIsCreatingFile: React.Dispatch<React.SetStateAction<boolean>>;
	findFilePath: (id: string) => string[];
	currentFileId: string;
	addFileUnderFolder: (id: string, name: string) => void;
	getFilesInFolder: (id: string) => FileType[];
}) => {
	const ref = React.useRef<HTMLInputElement | null>();
	const [value, setValue] = React.useState<string>('');
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, []);

	const onNewFile = () => {
		setError(null);
		if (value === '') {
			setError('File name cannot be empty');
			return;
		}
		if (!value.endsWith('.lua')) {
			setError('File name must end with .lua');
			return;
		}
		const path = findFilePath(currentFileId);
		const dir = path.at(path.length - 1);
		const files = getFilesInFolder(dir);
		const file = files.find((file) => file.name === value);
		if (file) {
			setError('File with same name already exists');
			return;
		}
		addFileUnderFolder(dir, value);
		setValue('');
		setIsCreatingFile(false);
	};

	return (
		<div className='nx-px-2'>
			<div className='nx-flex nx-flex-col'>
				<div className='nx-flex nx-flex-row nx-items-center nx-gap-2'>
					<FaFileCirclePlus className='textColor nx-cursor-pointer' />
					<input
						ref={ref}
						type='text'
						placeholder='New File'
						onChange={(e) => {
							setValue(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								onNewFile();
							} else if (e.key === 'Escape') {
								setIsCreatingFile(false);
							}
						}}
						className='nx-w-full nx-rounded-md nx-border-[1px] nx-border-gray-300 nx-px-2 nx-py-[1px] nx-text-sm'
					/>
				</div>
				{error && <div className='nx-text-xs nx-text-red-500'>{error}</div>}
			</div>
		</div>
	);
};

export default CreateFile;
