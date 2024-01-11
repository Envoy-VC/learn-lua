import React from 'react';
import { useOutputStore } from '../../stores/run-code';

const Output = () => {
	const { output, error } = useOutputStore();
	return (
		<div className='borderColor nx-flex nx-h-full nx-w-full nx-flex-col nx-border-l-[1px]'>
			<div className='borderColor nx-border-b-2 nx-p-2 nx-text-lg nx-font-semibold'>
				Output
			</div>
			<div className='nx-font-mono nx-text-sm'>$</div>
			<div className='nx-flex nx-grow nx-flex-col nx-overflow-auto nx-font-mono nx-text-sm'>
				{output.map((line, index) => (
					<div key={index}>{line}</div>
				))}
				{error && <div className='nx-text-red-500'>{error}</div>}
			</div>
		</div>
	);
};

export default Output;
