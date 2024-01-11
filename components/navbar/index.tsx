import React from 'react';
import { useTheme } from 'next-themes';
import { FaRegSun, FaRegMoon } from 'react-icons/fa6';
import { IconType } from 'react-icons';

const ThemeIcon = ({ Icon }: { Icon: IconType }) => {
	switch (Icon) {
		case FaRegSun:
			return (
				<div className='nx-rounded-xl nx-bg-[#171717] nx-p-2'>
					<Icon className='nx-text-xl nx-text-gray-300' />
				</div>
			);
		case FaRegMoon:
			return (
				<div className='nx-rounded-xl nx-bg-gray-200 nx-p-2'>
					<Icon className='nx-text-xl nx-text-gray-700' />
				</div>
			);
	}
};

const Navbar = () => {
	const [mounted, setMounted] = React.useState(false);
	const { theme, setTheme } = useTheme();

	React.useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	return (
		<div className='borderColor nx-h-[7vh] nx-w-full nx-border-b-[1px]'>
			<div className='nx-flex nx-h-full nx-flex-row nx-items-center nx-justify-between nx-gap-4 nx-p-4'>
				<div className='nx-flex nx-h-full nx-flex-row nx-items-center'>
					<img
						alt='Lua Logo'
						src='https://download.logo.wine/logo/Lua_(programming_language)/Lua_(programming_language)-Logo.wine.png'
						width={72}
						height={72}
					/>
					<div className='nx-text-xl nx-font-semibold'>Online Compiler</div>
				</div>
				<div>
					<button
						className=''
						onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
					>
						{theme === 'dark' ? (
							<ThemeIcon Icon={FaRegSun} />
						) : (
							<ThemeIcon Icon={FaRegMoon} />
						)}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
