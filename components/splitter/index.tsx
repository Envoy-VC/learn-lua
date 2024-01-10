import React, { useState } from 'react';
import clsx from 'clsx';

const Splitter = ({ id = 'drag-bar', dir, isDragging, ...props }: any) => {
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div
			id={id}
			data-testid={id}
			tabIndex={0}
			className={clsx(
				'sample-drag-bar nx-group',
				dir === 'horizontal' && 'sample-drag-bar--horizontal',
				(isDragging || isFocused) && 'sample-drag-bar--dragging'
			)}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			{...props}
		>
			<div className='nx-h-10 nx-w-[6px] nx-rounded-lg nx-bg-[#d1d1d1] nx-transition-all nx-duration-300 nx-ease-in-out group-hover:nx-bg-[#353535]'></div>
		</div>
	);
};

export default Splitter;
