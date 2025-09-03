import { useDispatch, useSelector } from 'react-redux'
import { showOnlyActiveSelector, toggleFilter } from 'src/store/taskSlice'

export const FilterSwitch = () => {
	const dispatch = useDispatch()
	const on = useSelector(showOnlyActiveSelector)

	return (
		<label className='switch'>
			Только невыполненные
			<input
				type='checkbox'
				checked={on}
				onChange={() => dispatch(toggleFilter())}
			/>
			<span className='slider' />
		</label>
	)
}
