import React from 'react';
import { useFileSystem } from '../../stores/file-system';

// Icons
import { LuaIcon, FolderIcon } from '../assets';
import { FaFileCirclePlus } from 'react-icons/fa6';
import { FaFolderPlus, FaCaretRight } from 'react-icons/fa6';

// Types
import { FileType, FolderType } from '../../stores/file-system';
import clsx from 'clsx';

const FileSystem = () => {
	const {
		content: { files },
		openFile,
		expandedFolders,
		expandFolder,
		collapseFolder,
		findFilePath,
		currentFileId,
	} = useFileSystem();

	// filter files to bring folders to start and then files recursively
	const sortedFiles = files
		.filter((file) => file.type === 'folder')
		.concat(files.filter((file) => file.type === 'file'));

	const onNewFile = () => {
		console.log(findFilePath(currentFileId));
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
						<FaFolderPlus className='textColor nx-cursor-pointer' />
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
									openFile
								);
						}
					})}
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
	openFile: (id: string) => void
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
									openFile
								);
						}
					})}
				</div>
			)}
		</div>
	);
};

export default FileSystem;
