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
		/>
	);
};

export default Splitter;
