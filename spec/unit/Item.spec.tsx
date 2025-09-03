import { render, screen } from '@testing-library/react'
import ue from '@testing-library/user-event'
import { Item } from 'src/components/Item'

const userEvent = ue.setup({ advanceTimers: jest.advanceTimersByTime })

describe('Элемент списка задач', () => {
	it('название не должно быть больше 32 символов', () => {
		const long =
			'Очень длинный заголовок который определённо длиннее тридцати двух символов'
		const expected = long.trim().slice(0, 32).trimEnd()

		render(
			<ul>
				<Item
					id='1'
					header={long}
					done={false}
					onDelete={jest.fn()}
					onToggle={jest.fn()}
				/>
			</ul>
		)

		expect(screen.getByText(expected)).toBeInTheDocument()

		expect(screen.queryByText(long)).not.toBeInTheDocument()
	})

	it('название не должно быть пустым', () => {
		render(
			<ul>
				<Item
					id='2'
					header={'   '}
					done={false}
					onDelete={jest.fn()}
					onToggle={jest.fn()}
				/>
			</ul>
		)
		expect(screen.getByText(/\(без названия\)/i)).toBeInTheDocument()
	})

	it('нельзя удалять невыполненные задачи', async () => {
		const onDelete = jest.fn()
		render(
			<ul>
				<Item
					id='3'
					header='Невыполненная'
					done={false}
					onDelete={onDelete}
					onToggle={jest.fn()}
				/>
			</ul>
		)
		const delBtn = screen.getByRole('button', { name: /удалить/i })
		expect(delBtn).toBeDisabled()
		await userEvent.click(delBtn)
		expect(onDelete).not.toHaveBeenCalled()
	})

	it('можно удалять выполненные задачи', async () => {
		const onDelete = jest.fn()
		render(
			<ul>
				<Item
					id='4'
					header='Готово'
					done={true}
					onDelete={onDelete}
					onToggle={jest.fn()}
				/>
			</ul>
		)
		const delBtn = screen.getByRole('button', { name: /удалить/i })
		expect(delBtn).not.toBeDisabled()
		await userEvent.click(delBtn)
		expect(onDelete).toHaveBeenCalledWith('4')
	})

	it('клик по чекбоксу и по заголовку вызывает onToggle', async () => {
		const onToggle = jest.fn()
		render(
			<ul>
				<Item
					id='5'
					header='Переключаемая'
					done={false}
					onDelete={jest.fn()}
					onToggle={onToggle}
				/>
			</ul>
		)
		const cb = screen.getByRole('checkbox', { name: /переключаемая/i })
		await userEvent.click(cb)
		expect(onToggle).toHaveBeenCalledWith('5')

		const label = screen.getByText(/переключаемая/i)
		await userEvent.click(label)
		expect(onToggle).toHaveBeenCalledWith('5')
	})
})
