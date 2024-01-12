import React from 'react';

import { useEditor } from '../../stores/editor';
import { useOutputStore } from '../../stores/run-code';

import { createRunner } from '../../services';

import { FaPlay, FaSpinner } from 'react-icons/fa6';
import OpenTabs from './open-tabs';

const TabList = () => {
	const { editor } = useEditor();
	const { output, isRunning, setOutput, setRunning, appendOutput, setError } =
		useOutputStore();

	const onRun = async () => {
		try {
			setRunning(true);
			setError(null);
			const code = editor.getValue();
			console.log(code);
			createRunner({ setOutput, setRunning, appendOutput, setError }).postMessage({
				type: 'execute',
				data: code,
			});
			console.log(output);
		} catch (error) {
			console.log(error);
		} finally {
			setRunning(false);
		}
	};

	return (
		<div className='borderColor nx-flex nx-w-full nx-flex-row nx-items-center nx-justify-between nx-border-b-[1px] nx-pb-1'>
			<OpenTabs />
			<button
				className='nx-flex nx-flex-row nx-items-center nx-gap-2 nx-rounded-md nx-bg-blue-600 nx-px-4 nx-py-[6px] nx-font-medium nx-text-white'
				onClick={onRun}
			>
				{isRunning ? <FaSpinner className='nx-animate-spin' /> : <FaPlay />}
				<div>Run</div>
			</button>
		</div>
	);
};

export default TabList;
