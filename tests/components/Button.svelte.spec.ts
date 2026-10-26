import { page } from 'vitest/browser';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import { createRawSnippet } from 'svelte';
import Button from '#lib/components/ui/Button.svelte';

describe('Button', () => {
	it('renders its label', async () => {
		render(Button, {
			children: createRawSnippet(() => ({ render: () => '<span>Save</span>' }))
		});

		await expect.element(page.getByRole('button', { name: 'Save' })).toBeInTheDocument();
	});
});
