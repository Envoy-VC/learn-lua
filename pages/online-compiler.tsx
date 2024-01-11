import React from 'react';
import clsx from 'clsx';
import { CodeEditor, FileSystem, Navbar, Output } from '../components';
import { useResizable } from 'react-resizable-layout';
import Splitter from '../components/splitter';

const Compiler = () => {
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
		isDragging: isOutputDragging,
		position: outputW,
		separatorProps: outputDragBarProps,
	} = useResizable({
		axis: 'x',
		initial: 500,
		min: 300,
		reverse: true,
	});

	return (
		<div className='compilerContainer'>
			<Navbar />
			<div className='nx-flex nx-h-[100vh] nx-flex-grow'>
				<div
					className={clsx('contents shadow nx-shrink-0')}
					style={{ width: fileW }}
				>
					<FileSystem />
				</div>
				<Splitter isDragging={isFileDragging} {...fileDragBarProps} />
				<div className={'nx-flex nx-grow'}>
					<CodeEditor />
					<Splitter isDragging={isOutputDragging} {...outputDragBarProps} />
					<div
						className={clsx('contents shadow nx-shrink-0')}
						style={{ width: outputW }}
					>
						<Output />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Compiler;
