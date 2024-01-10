import React from 'react';
import * as monaco from 'monaco-editor';
import Editor, { Monaco } from '@monaco-editor/react';
import { defaultValue } from '../../constants';

import { useEditor } from '../../stores/editor';

const CodeEditor = () => {
	const { setEditor } = useEditor();
	const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(
		null
	);

	const handleMount = (
		editor: monaco.editor.IStandaloneCodeEditor,
		monaco: Monaco
	) => {
		editorRef.current = editor;
		setEditor(editor);
		const currentTheme = localStorage.getItem('theme');
		const newTheme = currentTheme === 'dark' ? 'vs-dark' : 'light';
		editorRef.current.updateOptions({
			theme: newTheme,
		});
	};
	return (
		<div className='nx-flex nx-h-screen nx-w-full nx-flex-row'>
			<Editor
				height='93vh'
				defaultLanguage='lua'
				defaultValue={defaultValue}
				onMount={handleMount}
				options={{
					fontSize: 16,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
