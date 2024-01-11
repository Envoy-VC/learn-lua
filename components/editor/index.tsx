import React from 'react';
import * as monaco from 'monaco-editor';
import Editor, { Monaco } from '@monaco-editor/react';
import { defaultValue } from '../../constants';
import { useTheme } from 'next-themes';

import { useEditor } from '../../stores/editor';
import TabList from '../tab-list';

const CodeEditor = () => {
	const { theme } = useTheme();
	const { setEditor } = useEditor();
	const editorRef = React.useRef<monaco.editor.IStandaloneCodeEditor | null>(
		null
	);

	const handleMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
		editorRef.current = editor;
		setEditor(editor);
		const newTheme = theme === 'dark' ? 'vs-dark' : 'light';
		editorRef.current.updateOptions({
			theme: newTheme,
		});
	};

	React.useEffect(() => {
		if (editorRef.current) {
			const newTheme = theme === 'dark' ? 'vs-dark' : 'light';
			editorRef.current.updateOptions({
				theme: newTheme,
			});
		}
	}, [theme]);

	return (
		<div className='contents nx-flex nx-grow nx-flex-col'>
			<TabList />
			<Editor
				height='93vh'
				defaultLanguage='lua'
				className=''
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
