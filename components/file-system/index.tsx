import React from 'react';
import { useFileSystem } from '../../stores/file-system';
import CreateFile from './create-file';
import CreateFolder from './create-folder';

// Icons
import { LuaIcon, FolderIcon } from '../assets';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { FaFolderPlus, FaCaretRight } from 'react-icons/fa6';

// Types
import { FileType, FolderType } from '../../stores/file-system';
import clsx from 'clsx';

const FileSystem = () => {
	const {
		content,
		openFile,
		expandedFolders,
		expandFolder,
		collapseFolder,
		findFilePath,
		currentFileId,
		addFileUnderFolder,
		getFilesInFolder,
		addFolderUnderFolder,
		getFoldersInFolder,
	} = useFileSystem();

	const [isCreatingFile, setIsCreatingFile] = React.useState<boolean>(false);
	const [isCreatingFolder, setIsCreatingFolder] = React.useState<boolean>(false);

	const sortedFiles = content.files
		.filter((file) => file.type === 'folder')
		.concat(content.files.filter((file) => file.type === 'file'));

	const onNewFile = () => {
		setIsCreatingFile(true);
	};

	const onNewFolder = () => {
		setIsCreatingFolder(true);
	};

	return (
		<div className='borderColor nx-flex nx-h-full nx-w-full nx-select-none nx-flex-col nx-border-r-[1px]'>
			<div className='nx-flex nx-flex-col'>
				<div className='borderColor nx-flex nx-flex-row nx-items-center nx-justify-between nx-border-b-[1px]  nx-p-2'>
					<div className='nx-tex-lg nx-font-bold'>Lua</div>
					<div className='nx-flex nx-flex-row nx-items-center nx-gap-2'>
						<FaFileCirclePlus
							className='textColor nx-cursor-pointer'
							onClick={onNewFile}
						/>
						<FaFolderPlus
							className='textColor nx-cursor-pointer'
							onClick={onNewFolder}
						/>
					</div>
				</div>
				<div>
					{sortedFiles.map((file) => {
						switch (file.type) {
							case 'file':
								return FilePill(file, openFile);
							case 'folder':
								return FolderPill(
									file,
									expandedFolders,
									expandFolder,
									collapseFolder,
									openFile,
									isCreatingFile,
									setIsCreatingFile,
									findFilePath,
									currentFileId,
									addFileUnderFolder,
									getFilesInFolder,
									isCreatingFolder,
									setIsCreatingFolder,
									addFolderUnderFolder,
									getFoldersInFolder
								);
						}
					})}
					{/* Create new File  input box like vs code and create on enter */}
					{isCreatingFile && findFilePath(currentFileId).at(-1) === content.id && (
						<CreateFile
							setIsCreatingFile={setIsCreatingFile}
							findFilePath={findFilePath}
							currentFileId={currentFileId}
							addFileUnderFolder={addFileUnderFolder}
							getFilesInFolder={getFilesInFolder}
						/>
					)}
					{isCreatingFolder && findFilePath(currentFileId).at(-1) === content.id && (
						<CreateFolder
							setIsCreatingFolder={setIsCreatingFolder}
							findFilePath={findFilePath}
							currentFileId={currentFileId}
							addFolderUnderFolder={addFolderUnderFolder}
							getFoldersUnderFolder={getFoldersInFolder}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

const FilePill = (file: FileType, openFile: (id: string) => void) => {
	return (
		<div
			key={file.id}
			className='hoverFile nx-flex nx-w-full nx-cursor-pointer nx-flex-row nx-items-center nx-justify-between nx-px-2 nx-py-[0px]'
			onClick={() => {
				openFile(file.id);
			}}
		>
			<div className='nx-flex nx-flex-row nx-items-center nx-gap-2'>
				<img src={LuaIcon.src} alt='Lua Icon' className='nx-h-4 nx-w-4' />
				<div>{file.name}</div>
			</div>
		</div>
	);
};

const FolderPill = (
	folder: FolderType,
	expandedFolders: string[],
	expandFolder: (id: string) => void,
	collapseFolder: (id: string) => void,
	openFile: (id: string) => void,
	isCreatingFile: boolean,
	setIsCreatingFile: React.Dispatch<React.SetStateAction<boolean>>,
	findFilePath: (id: string) => string[],
	currentFileId: string,
	addFileUnderFolder: (id: string, name: string) => void,
	getFilesInFolder: (id: string) => FileType[],
	isCreatingFolder: boolean,
	setIsCreatingFolder: React.Dispatch<React.SetStateAction<boolean>>,
	addFolderUnderFolder: (id: string, name: string) => void,
	getFoldersInFolder: (id: string) => FolderType[]
) => {
	const files = folder.files
		.filter((file) => file.type === 'folder')
		.concat(folder.files.filter((file) => file.type === 'file'));
	return (
		<div
			key={folder.id}
			className='nx-flex nx-cursor-pointer nx-flex-col nx-items-start nx-justify-between nx-px-2 nx-py-[0px]'
		>
			<div
				className='hoverFile nx-flex nx-w-full nx-flex-row nx-items-center nx-gap-2'
				onClick={() => {
					if (expandedFolders.includes(folder.id)) {
						collapseFolder(folder.id);
					} else {
						expandFolder(folder.id);
					}
				}}
			>
				<div className=''>
					<FaCaretRight
						className={clsx(
							'nx-text-xs nx-transition-all nx-duration-200 nx-ease-in-out',
							expandedFolders.includes(folder.id) ? 'nx-rotate-90' : ''
						)}
					/>
				</div>
				<img src={FolderIcon.src} alt='Folder Icon' className='nx-h-4 nx-w-4' />
				<div>{folder.name}</div>
			</div>
			{expandedFolders.includes(folder.id) && (
				<div className='nx-flex nx-w-full nx-flex-col nx-pl-3'>
					{files.map((file) => {
						switch (file.type) {
							case 'file':
								return FilePill(file, openFile);
							case 'folder':
								return FolderPill(
									file,
									expandedFolders,
									expandFolder,
									collapseFolder,
									openFile,
									isCreatingFile,
									setIsCreatingFile,
									findFilePath,
									currentFileId,
									addFileUnderFolder,
									getFilesInFolder,
									isCreatingFolder,
									setIsCreatingFolder,
									addFolderUnderFolder,
									getFoldersInFolder
								);
						}
					})}
				</div>
			)}
			{isCreatingFile && findFilePath(currentFileId).at(-1) === folder.id && (
				<CreateFile
					setIsCreatingFile={setIsCreatingFile}
					findFilePath={findFilePath}
					currentFileId={currentFileId}
					addFileUnderFolder={addFileUnderFolder}
					getFilesInFolder={getFilesInFolder}
				/>
			)}
			{isCreatingFolder && findFilePath(currentFileId).at(-1) === folder.id && (
				<CreateFolder
					setIsCreatingFolder={setIsCreatingFolder}
					findFilePath={findFilePath}
					currentFileId={currentFileId}
					addFolderUnderFolder={addFolderUnderFolder}
					getFoldersUnderFolder={getFoldersInFolder}
				/>
			)}
		</div>
	);
};

export default FileSystem;
