import React from 'react';

import { FolderType } from '../../../stores/file-system';

import { FaFolderPlus } from 'react-icons/fa6';

const CreateFolder = ({
	setIsCreatingFolder,
	findFilePath,
	currentFileId,
	addFolderUnderFolder,
	getFoldersUnderFolder,
}: {
	setIsCreatingFolder: React.Dispatch<React.SetStateAction<boolean>>;
	findFilePath: (id: string) => string[];
	currentFileId: string;
	addFolderUnderFolder: (id: string, name: string) => void;
	getFoldersUnderFolder: (id: string) => FolderType[];
}) => {
	const ref = React.useRef<HTMLInputElement | null>();
	const [value, setValue] = React.useState<string>('');
	const [error, setError] = React.useState<string | null>(null);

	React.useEffect(() => {
		if (ref.current) {
			ref.current.focus();
		}
	}, []);

	const onNewFolder = () => {
		setError(null);
		if (value === '') {
			setError('Folder name cannot be empty');
			return;
		}
		const path = findFilePath(currentFileId);
		const dir = path.at(path.length - 1);
		const folders = getFoldersUnderFolder(dir);
		const exists = folders.find((folder) => folder.name === value);
		if (exists) {
			setError('Folder with same name already exists');
			return;
		}
		addFolderUnderFolder(dir, value);
		setValue('');
		setIsCreatingFolder(false);
	};

	return (
		<div className='nx-px-2'>
			<div className='nx-flex nx-flex-col'>
				<div className='nx-flex nx-flex-row nx-items-center nx-gap-2'>
					<FaFolderPlus className='textColor nx-cursor-pointer' />
					<input
						ref={ref}
						type='text'
						placeholder='New Folder'
						onChange={(e) => {
							setValue(e.target.value);
						}}
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								onNewFolder();
							} else if (e.key === 'Escape') {
								setIsCreatingFolder(false);
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

export default CreateFolder;
