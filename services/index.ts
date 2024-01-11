interface Props {
	setRunning: (running: boolean) => void;
	setOutput: (output: any[]) => void;
	appendOutput: (output: any[]) => void;
	setError: (error: any) => void;
}

export const createRunner = ({
	setOutput,
	setRunning,
	appendOutput,
	setError,
}: Props) => {
	setOutput([]);
	const runner = new Worker(new URL('../constants/runner.js', import.meta.url), {
		name: 'Lua runner',
	});

	runner.onmessage = ({ data: { type, data } }) => {
		if (type === 'finished') {
			setRunning(false);
		} else if (type === 'log') {
			appendOutput(data);
		} else if (type === 'error') {
			setError(data);
		} else if (type === 'clear') {
			setOutput([]);
		}
	};

	return runner;
};
