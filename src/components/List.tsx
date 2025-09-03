import { Item } from './Item'

type Props = {
	items: Task[]
	onDelete: (id: Task['id']) => void
	onToggle: (id: Task['id']) => void
}

export const List = ({ items, onDelete, onToggle }: Props) => {
	let incomplete = 0
	const capped = items.filter(t => {
		if (t.done) return true
		if (incomplete < 10) {
			incomplete += 1
			return true
		}
		return false
	})

	return (
		<ul className='task-list tasks'>
			{capped.map(item => (
				<Item {...item} key={item.id} onDelete={onDelete} onToggle={onToggle} />
			))}
		</ul>
	)
}
