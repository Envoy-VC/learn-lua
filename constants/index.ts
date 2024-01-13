import { v4 as uuid } from 'uuid';
import { FolderType } from '../stores/file-system';

export const defaultValue = `function factorial(n)
    if (n == 0) then
        return 1
    else
        return n * factorial(n - 1)
    end
end

print(factorial(5))
`;

export const initialState: FolderType = {
	id: uuid(),
	type: 'folder',
	name: 'root',
	files: [
		{
			id: uuid(),
			type: 'folder',
			name: 'src',
			files: [
				{
					id: uuid(),
					type: 'folder',
					name: 'lib',
					files: [
						{
							id: uuid(),
							type: 'file',
							name: 'account.lua',
							content: `accounts file`,
						},
					],
				},
				{
					id: uuid(),
					type: 'file',
					name: 'utils.lua',
					content: `utils file`,
				},
			],
		},
		{
			id: uuid(),
			type: 'file',
			name: 'main.lua',
			content: defaultValue,
		},
	],
};
