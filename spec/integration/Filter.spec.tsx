import { screen, within } from '@testing-library/react'
import ue from '@testing-library/user-event'
import { FilterSwitch } from 'src/components/FilterSwitch'
import { TaskList } from 'src/modules/TaskList'
import { renderWithProviders } from '../utils/RenderWithProviders'

const userEvent = ue.setup({
	advanceTimers: jest.advanceTimersByTime,
})

/**
 * BDD:
 * Как пользователь,
 * Я хочу включить переключатель "Только невыполненные",
 * Чтобы в списке не отображались выполненные задачи.
 */

describe('Список задач — фильтрация', () => {
	const initialState = {
		taskList: {
			list: [
				{ id: '1', header: 'A', done: false },
				{ id: '2', header: 'B', done: true },
				{ id: '3', header: 'C', done: false },
			],
			notification: '',
			showOnlyActive: false,
		},
	}

	const setup = (state = initialState) =>
		renderWithProviders(
			<>
				<FilterSwitch />
				<TaskList />
			</>,
			{ preloadedState: state }
		)

	it('с включенным фильтром', async () => {
		setup()

		await userEvent.click(screen.getByLabelText(/только невыполненные/i))

		const list = screen.getByRole('list')
		const items = within(list).getAllByRole('listitem')
		expect(items).toHaveLength(2)
		expect(within(list).queryByText('B')).not.toBeInTheDocument()
		expect(within(list).getByText('A')).toBeInTheDocument()
		expect(within(list).getByText('C')).toBeInTheDocument()
	})

	it('с выключенным фильтром', async () => {
		setup()

		const checkbox = screen.getByLabelText(/только невыполненные/i)
		await userEvent.click(checkbox) // on
		await userEvent.click(checkbox) // off

		const list = screen.getByRole('list')
		const items = within(list).getAllByRole('listitem')
		expect(items).toHaveLength(3)
		expect(within(list).getByText('A')).toBeInTheDocument()
		expect(within(list).getByText('B')).toBeInTheDocument()
		expect(within(list).getByText('C')).toBeInTheDocument()
	})

	it('свитчер меняет checked при клике', async () => {
		setup()

		const checkbox = screen.getByLabelText(
			/только невыполненные/i
		) as HTMLInputElement

		expect(checkbox.checked).toBe(false)
		await userEvent.click(checkbox)
		expect(checkbox.checked).toBe(true)
		await userEvent.click(checkbox)
		expect(checkbox.checked).toBe(false)
	})
})
