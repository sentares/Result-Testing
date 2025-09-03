import { DeleteButton } from './DeleteButton'

type Props = Task & {
	onDelete: (id: Task['id']) => void
	onToggle: (id: Task['id']) => void
}

export const Item = (props: Props) => {
	const raw = (props.header ?? '').trim()
	const display =
		raw.length === 0
			? '(без названия)'
			: raw.length > 32
			? raw.slice(0, 32).trimEnd()
			: raw

	return (
		<li className='item-wrapper'>
			<input
				type='checkbox'
				id={props.id}
				defaultChecked={props.done}
				onChange={() => props.onToggle(props.id)}
			/>
			<label htmlFor={props.id} onClick={() => props.onToggle(props.id)}>
				{props.done ? <s>{display}</s> : display}
			</label>
			<DeleteButton
				disabled={!props.done}
				onClick={() => props.onDelete(props.id)}
			/>
		</li>
	)
}
