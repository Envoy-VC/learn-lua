import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import { initialState } from '../../constants';
export interface FileType {
	id: string;
	type: 'file';
	name: string;
	content: string;
}

export interface FolderType {
	id: string;
	type: 'folder';
	name: string;
	files: (FileType | FolderType)[];
}

interface State {
	content: FolderType;
	currentFileId: string;
	openFiles: string[];
	expandedFolders: string[];
}

interface Actions {
	getFile: (id: string) => FileType;
	setCurrentFileId: (file: string) => void;
	openFile: (id: string) => void;
	closeFile: (id: string) => void;
	expandFolder: (id: string) => void;
	collapseFolder: (fileId: string) => void;
	findFilePath: (fileId: string) => string[];
	getFilesInFolder: (folderId: string) => FileType[];
	getFoldersInFolder: (folderId: string) => FolderType[];
	setFileContent: (id: string, content: string) => void;
	addFolderUnderFolder(folderId: string, name: string): void;
	addFileUnderFolder(folderId: string, name: string): void;
	deleteFileUnderId(fileId: string): void;
	deleteFolderUnderId(folderId: string): void;
	renameFileUnderId(fileId: string, newName: string): void;
	renameFolderUnderId(folderId: string, newName: string): void;
}

const getFileContent = (content: FolderType, id: string): FileType => {
	for (const file of content.files) {
		if (file.id === id && file.type === 'file') {
			return file;
		} else {
			if (file.type === 'folder') {
				const result = getFileContent(file, id);
				if (result) {
					return result;
				}
			}
		}
	}
};

const findFolder = (folder: FolderType, folderId: string): FolderType => {
	if (folder.id === folderId) {
		return folder;
	}
	for (const file of folder.files) {
		if (file.type === 'folder') {
			const result = findFolder(file, folderId);
			if (result) {
				return result;
			}
		}
	}
};

const findFile = (folder: FolderType, id: string): FileType => {
	for (const file of folder.files) {
		if (file.id === id && file.type === 'file') {
			return file;
		} else {
			if (file.type === 'folder') {
				const result = findFile(file, id);
				if (result) {
					return result;
				}
			}
		}
	}
};

export const useFileSystem = create<State & Actions>((set, get) => ({
	content: initialState,
	currentFileId: initialState.files.at(0).id,
	openFiles: [initialState.files.at(0).id],
	expandedFolders: [],
	openFile: (id) => {
		const openFiles = get().openFiles;
		if (!openFiles.includes(id)) {
			set({ openFiles: [...openFiles, id] });
		}
		set({ currentFileId: id });
	},
	closeFile: (id) => {
		const openFiles = get().openFiles;
		const newOpenFiles = openFiles.filter((fileId) => fileId !== id);
		const currentFileId = get().currentFileId;
		if (currentFileId === id) {
			const index = openFiles.indexOf(id);
			console.log(index);
			if (index > 0) {
				set({ currentFileId: openFiles[index - 1] ?? '' });
			} else if (index === 0) {
				set({ currentFileId: openFiles[index + 1] ?? '' });
			}
		}
		set({ openFiles: newOpenFiles });
	},
	expandFolder: (id) => {
		const expandedFolders = get().expandedFolders;
		if (!expandedFolders.includes(id)) {
			set({ expandedFolders: [...expandedFolders, id] });
		}
	},
	collapseFolder: (id) => {
		const expandedFolders = get().expandedFolders;
		const newExpandedFolders = expandedFolders.filter(
			(folderId) => folderId !== id
		);
		set({ expandedFolders: newExpandedFolders });
	},
	findFilePath: (fileId: string) => {
		const content = get().content;
		const file = findFile(content, fileId);
		if (fileId === '') {
			return [content.id];
		}
		if (!file) {
			return;
		}
		const getFileFolder = (folder: FolderType, path: string[]) => {
			const files = folder.files.filter((f) => f.type === 'file') as FileType[];
			const folders = folder.files.filter(
				(f) => f.type === 'folder'
			) as FolderType[];
			if (files.filter((f) => f.id === fileId).length > 0) {
				return path;
			} else {
				for (const f of folders) {
					const result = getFileFolder(f, [...path, f.id]);
					if (result) {
						return result;
					}
				}
			}
		};
		return getFileFolder(content, [content.id]);
	},
	getFilesInFolder: (folderId: string) => {
		const content = get().content;
		const folder = findFolder(content, folderId);
		if (!folder) {
			return;
		}
		return folder.files.filter((file) => file.type === 'file') as FileType[];
	},
	getFoldersInFolder: (folderId: string) => {
		const content = get().content;
		const folder = findFolder(content, folderId);
		if (!folder) {
			return;
		}
		return folder.files.filter((file) => file.type === 'folder') as FolderType[];
	},
	setFileContent: (id: string, content: string) => {
		const file = getFileContent(get().content, id);
		if (file) {
			file.content = content;
		}
	},
	getFile: (id) => {
		const content = get().content;
		return getFileContent(content, id);
	},
	setCurrentFileId: (id) => {
		set({ currentFileId: id });
	},
	addFolderUnderFolder: (folderId, value) => {
		const content = get().content;
		const newFolder: FolderType = {
			id: uuid(),
			type: 'folder',
			name: value,
			files: [],
		};
		const targetFolder = findFolder(content, folderId);
		if (!targetFolder) {
			return;
		}
		const updateFolder = (folder: FolderType): FolderType => {
			if (folder.id === folderId) {
				return {
					...folder,
					files: [...folder.files, newFolder],
				};
			} else {
				return {
					...folder,
					files: folder.files.map((file) => {
						if (file.type === 'folder') {
							return updateFolder(file);
						}
						return file;
					}),
				};
			}
		};
		const newContent = updateFolder(content);
		set({ content: newContent });
	},
	addFileUnderFolder: (folderId, name) => {
		const content = get().content;
		const newFile: FileType = {
			id: uuid(),
			type: 'file',
			name: name,
			content: '',
		};
		const targetFolder = findFolder(content, folderId);
		if (!targetFolder) {
			return;
		}
		const updateFolder = (folder: FolderType): FolderType => {
			if (folder.id === folderId) {
				return {
					...folder,
					files: [...folder.files, newFile],
				};
			} else {
				return {
					...folder,
					files: folder.files.map((file) => {
						if (file.type === 'folder') {
							return updateFolder(file);
						}
						return file;
					}),
				};
			}
		};
		const newContent = updateFolder(content);
		set({ content: newContent });
		set({ currentFileId: newFile.id });
	},
	deleteFileUnderId: (fileId) => {
		const content = get().content;
		const newContent = {
			...content,
			files: content.files.filter((file) => file.id !== fileId),
		};
		set({ content: newContent });
	},
	deleteFolderUnderId: (folderId) => {
		const content = get().content;
		const newContent = {
			...content,
			files: content.files.filter((file) => file.id !== folderId),
		};
		set({ content: newContent });
	},
	renameFileUnderId: (fileId, newName) => {
		const content = get().content;
		const newContent = {
			...content,
			files: content.files.map((file) => {
				if (file.id === fileId) {
					return {
						...file,
						name: newName,
					};
				}
				return file;
			}),
		};
		set({ content: newContent });
	},
	renameFolderUnderId: (folderId, newName) => {
		const content = get().content;
		const newContent = {
			...content,
			files: content.files.map((file) => {
				if (file.id === folderId) {
					return {
						...file,
						name: newName,
					};
				}
				return file;
			}),
		};
		set({ content: newContent });
	},
}));
