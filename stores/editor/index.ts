import { create } from 'zustand';
import * as monaco from 'monaco-editor';

interface State {
	editor: monaco.editor.IStandaloneCodeEditor | null;
}

interface Actions {
	setEditor: (editor: monaco.editor.IStandaloneCodeEditor) => void;
}

export const useEditor = create<State & Actions>((set, get) => ({
	editor: null,
	setEditor: (editor) => set({ editor }),
}));
