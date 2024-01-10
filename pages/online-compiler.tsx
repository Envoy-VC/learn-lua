import React from 'react';
import clsx from 'clsx';
import { CodeEditor, FileSystem, Output } from '../components';
import Resizable, { useResizable } from 'react-resizable-layout';
import Splitter from '../components/splitter';

import { useEditor } from '../stores/editor';

import { LuaFactory } from 'wasmoon';

const Compiler = () => {
	const { editor } = useEditor();

	const [running, setRunning] = React.useState<boolean>(false);
	const [output, setOutput] = React.useState<any[]>([]);

	const createRunner = () => {
		setOutput([]);
		const runner = new Worker(new URL('./runner.js', import.meta.url), {
			name: 'Lua runner',
		});

		runner.onmessage = ({ data: { type, data } }) => {
			if (type === 'finished') {
				setRunning(false);
			} else if (type === 'log') {
				setOutput((prev) => [...prev, data]);
			} else if (type === 'error') {
				// TODO
			} else if (type === 'clear') {
				setOutput([]);
			}
		};

		return runner;
	};

	const onRun = async () => {
		try {
			setRunning(true);
			const code = editor.getValue();

			createRunner().postMessage({
				type: 'execute',
				data: code,
			});
		} catch (error) {
			console.log(error);
		} finally {
			setRunning(false);
		}
	};

	const {
		isDragging: isFileDragging,
		position: fileW,
		separatorProps: fileDragBarProps,
	} = useResizable({
		axis: 'x',
		initial: 300,
		min: 250,
	});
	const {
		isDragging: isPluginDragging,
		position: pluginW,
		separatorProps: pluginDragBarProps,
	} = useResizable({
		axis: 'x',
		initial: 500,
		min: 300,
		reverse: true,
	});

	return (
		<div className=''>
			<div className='nx-h-[7vh] nx-w-full nx-border-2'></div>
			<div className='nx-flex nx-h-[100vh] nx-flex-grow'>
				<div
					className={clsx('contents shadow nx-shrink-0')}
					style={{ width: fileW }}
				>
					<FileSystem />
				</div>
				<Splitter isDragging={isFileDragging} {...fileDragBarProps} />
				<div className={'nx-flex nx-grow'}>
					<div className={'contents shadow nx-grow'}>
						<CodeEditor />
					</div>
					<Splitter isDragging={isPluginDragging} {...pluginDragBarProps} />
					<div
						className={clsx('contents shadow nx-shrink-0')}
						style={{ width: pluginW }}
					>
						<Output />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Compiler;
