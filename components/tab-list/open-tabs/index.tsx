import React from 'react';
import { FaX } from 'react-icons/fa6';

import { useFileSystem } from '../../../stores/file-system';

const OpenTabs = () => {
	const { openFiles, getFile, closeFile, openFile, currentFileId } =
		useFileSystem();
	return (
		<div className='nx-flex'>
			{openFiles.map((id) => {
				const file = getFile(id);
				return (
					<div
						key={id}
						className='borderColor nx-min-h-full nx-cursor-pointer nx-border-[1px] nx-px-2 nx-py-1'
					>
						<div className='nx-flex nx-flex-row nx-items-center nx-justify-between nx-gap-2'>
							<div
								className=''
								onClick={() => {
									openFile(id);
								}}
							>
								{file?.name}
							</div>
							<FaX className='nx-mt-[2px] nx-text-xs' onClick={() => closeFile(id)} />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default OpenTabs;
