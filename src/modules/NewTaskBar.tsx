import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AddButton } from 'src/components/AddButton'
import { Input } from 'src/components/Input'
import {
	addTask,
	canAddTaskSelector,
	uncompleteCount,
} from 'src/store/taskSlice'
import { validateHeaderMax, validateHeaderMin } from 'src/utils/helpers'
import './styles.css'

export const NewTaskBar = () => {
	const [value, setValue] = useState('')
	const dispatch = useDispatch()
	const uncomplete = useSelector(uncompleteCount)
	const canAdd = useSelector(canAddTaskSelector)

	const handleAdd = () => {
		if (validateHeaderMax(value)) {
			dispatch(addTask(value))
			setValue('')
		}
	}

	const disabled =
		!validateHeaderMin(value) || !validateHeaderMax(value) || !canAdd

	return (
		<div className='new-task-bar'>
			<Input
				value={value}
				onChange={val => setValue(val)}
				disabled={uncomplete >= 10}
				disabledMessage='Нельзя завести больше 10 невыполненных задач'
			/>
			<AddButton onClick={handleAdd} disabled={disabled} />
		</div>
	)
}
