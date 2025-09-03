import { screen } from '@testing-library/react'
import ue from '@testing-library/user-event'
import { NotifierContainer } from 'src/modules/NotifierContainer'
import { TaskList } from 'src/modules/TaskList'
import { renderWithProviders } from '../utils/RenderWithProviders'

const userEvent = ue.setup({ advanceTimers: jest.advanceTimersByTime })

describe('Оповещение при выполнении задачи', () => {
	const preloaded = {
		taskList: {
			list: [
				{ id: '1', header: 'T1', done: false },
				{ id: '2', header: 'T2', done: false },
			],
			notification: '',
			showOnlyActive: false,
		},
	}

	it('появляется и содержит заголовок задачи', async () => {
		renderWithProviders(
			<>
				<TaskList />
				<NotifierContainer />
			</>,
			{ preloadedState: preloaded }
		)

		const [firstCheckbox] = screen.getAllByRole('checkbox')
		await userEvent.click(firstCheckbox)

		expect(screen.getByText(/Задача "T1" завершена/i)).toBeInTheDocument()
	})

	it('одновременно может отображаться только одно', async () => {
		renderWithProviders(
			<>
				<TaskList />
				<NotifierContainer />
			</>,
			{ preloadedState: preloaded }
		)

		const [cb1, cb2] = screen.getAllByRole('checkbox')

		await userEvent.click(cb1)
		await userEvent.click(cb2)

		expect(screen.queryByText(/"T1" завершена/i)).not.toBeInTheDocument()

		const notes = screen.getAllByText(/Задача ".*" завершена/i)
		expect(notes).toHaveLength(1)
		expect(notes[0].textContent).toMatch(/"T2" завершена/i)
	})

	it('уведомление авто-скрывается через 2 секунды', async () => {
		renderWithProviders(
			<>
				<TaskList />
				<NotifierContainer />
			</>,
			{
				preloadedState: {
					taskList: {
						list: [{ id: '1', header: 'T1', done: false }],
						notification: '',
						showOnlyActive: false,
					},
				},
			}
		)

		await userEvent.click(screen.getByRole('checkbox'))
		expect(screen.getByText(/"T1" завершена/i)).toBeInTheDocument()

		jest.advanceTimersByTime(2000)
		expect(screen.queryByText(/"T1" завершена/i)).not.toBeInTheDocument()
	})
})
