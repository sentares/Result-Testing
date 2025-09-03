import { screen } from '@testing-library/react'
import ue from '@testing-library/user-event'
import { NewTaskBar } from 'src/modules/NewTaskBar'
import { TaskList } from 'src/modules/TaskList'
import { renderWithProviders } from '../utils/RenderWithProviders'

const userEvent = ue.setup({ advanceTimers: jest.advanceTimersByTime })

describe('Не больше 10 невыполненных задач — интеграция', () => {
	const preloaded = {
		taskList: {
			list: Array.from({ length: 10 }).map((_, i) => ({
				id: String(i + 1),
				header: `T${i + 1}`,
				done: false,
			})),
			notification: '',
			showOnlyActive: false,
		},
	}

	it('при 10 невыполненных инпут и кнопка заблокированы, есть подсказка', () => {
		renderWithProviders(
			<>
				<NewTaskBar />
				<TaskList />
			</>,
			{ preloadedState: preloaded }
		)

		const input = screen.getByRole('textbox')
		const addBtn = screen.getByRole('button', { name: /добавить/i })
		expect(input).toBeDisabled()
		expect(addBtn).toBeDisabled()
		expect(input).toHaveAttribute('placeholder', expect.stringMatching(/10/i))
	})

	it('после завершения одной задачи можно добавить новую; снова ровно 10 невыполненных', async () => {
		const { store } = renderWithProviders(
			<>
				<NewTaskBar />
				<TaskList />
			</>,
			{ preloadedState: preloaded }
		)

		const [firstCheckbox] = screen.getAllByRole('checkbox')
		await userEvent.click(firstCheckbox)

		const input = screen.getByRole('textbox') as HTMLInputElement
		const addBtn = screen.getByRole('button', { name: /добавить/i })
		expect(input).not.toBeDisabled()
		expect(addBtn).toBeDisabled()

		await userEvent.clear(input)
		await userEvent.type(input, 'NEW')
		expect(addBtn).not.toBeDisabled()

		await userEvent.click(addBtn)
		expect(input).toBeDisabled()
		expect(addBtn).toBeDisabled()

		const { taskList } = store.getState()
		const incomplete = taskList.list.filter(t => !t.done).length
		expect(incomplete).toBe(10)
	})
})
