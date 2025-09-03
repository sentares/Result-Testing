import { render, screen } from '@testing-library/react'
import { List } from 'src/components/List'

it('отображение списка задач', () => {
	const onDelete = jest.fn()
	const onToggle = jest.fn()

	const items: Task[] = [
		{ id: '1', header: 'купить хлеб', done: false },
		{ id: '2', header: 'купить молоко', done: false },
		{ id: '3', header: 'выгулять собаку', done: true },
	]

	const { rerender, asFragment } = render(
		<List items={items} onDelete={onDelete} onToggle={onToggle} />
	)
	const firstRender = asFragment()

	items.pop()

	rerender(<List items={items} onDelete={onDelete} onToggle={onToggle} />)
	const secondRender = asFragment()

	expect(firstRender).toMatchDiffSnapshot(secondRender)
})

it('Список содержит не больше 10 невыполненных задач', () => {
	const onDelete = jest.fn()
	const onToggle = jest.fn()

	const items: Task[] = [
		...Array.from({ length: 12 }, (_, i) => ({
			id: `u${i + 1}`,
			header: `U${i + 1}`,
			done: false,
		})),
		{ id: 'd1', header: 'Done 1', done: true },
		{ id: 'd2', header: 'Done 2', done: true },
	]

	render(<List items={items} onDelete={onDelete} onToggle={onToggle} />)

	const list = screen.getByRole('list')
	const all = screen.getAllByRole('listitem')
	expect(all).toHaveLength(12)

	expect(screen.queryByText('U11')).not.toBeInTheDocument()
	expect(screen.queryByText('U12')).not.toBeInTheDocument()

	expect(screen.getByText('Done 1')).toBeInTheDocument()
	expect(screen.getByText('Done 2')).toBeInTheDocument()
})
