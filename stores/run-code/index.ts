import { create } from 'zustand';

interface State {
	isRunning: boolean;
	output: any[];
	error: any;
}

interface Actions {
	setRunning: (running: boolean) => void;
	setOutput: (output: any[]) => void;
	appendOutput: (output: any) => void;
	setError: (error: any) => void;
}

export const useOutputStore = create<State & Actions>((set) => ({
	isRunning: false,
	output: [],
	error: null,
	setRunning: (running) => set({ isRunning: running }),
	setOutput: (output) => set({ output }),
	appendOutput: (output) =>
		set((state) => ({ output: [...state.output, output] })),
	setError: (error) => set({ error }),
}));
