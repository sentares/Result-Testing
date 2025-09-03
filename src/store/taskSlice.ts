import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './configureStore'

export interface taskListState {
	list: Task[]
	notification: string
	showOnlyActive: boolean
}

const initialState: taskListState = {
	list: [],
	notification: '',
	showOnlyActive: false,
}

export const taskListSlice = createSlice({
	name: 'taskList',
	initialState,
	reducers: {
		addTask: (state, action: PayloadAction<Task['header']>) => {
			const incomplete = state.list.reduce(
				(acc, target) => acc + (target.done ? 0 : 1),
				0
			)
			if (incomplete >= 10) {
				return
			}
			state.list.push({
				id: crypto.randomUUID(),
				header: action.payload,
				done: false,
			})
		},

		completeTask: (state, action: PayloadAction<Task['id']>) => {
			const task = state.list.find(x => x.id === action.payload)

			if (task) {
				task.done = true
			}
		},
		toggleTask: (state, action: PayloadAction<Task['id']>) => {
			const task = state.list.find(x => x.id === action.payload)

			if (task) {
				task.done = !task.done

				if (task.done) {
					state.notification = `Задача "${task.header}" завершена`
				}
			}
		},
		deleteTask: (state, action: PayloadAction<Task['id']>) => {
			state.list = state.list.filter(x => x.id !== action.payload)
		},
		setNotification: (state, action: PayloadAction<Task['header']>) => {
			state.notification = `Задача "${action.payload}" завершена`
		},
		clearNotification: state => {
			state.notification = ''
		},
		toggleFilter: state => {
			state.showOnlyActive = !state.showOnlyActive
		},
	},
})

export const {
	addTask,
	completeTask,
	deleteTask,
	toggleTask,
	clearNotification,
	toggleFilter,
} = taskListSlice.actions

export default taskListSlice.reducer

export const tasksSelector = (state: RootState) => state.taskList.list

export const fullCount = (state: RootState) => state.taskList.list.length

export const completeCount = (state: RootState) =>
	state.taskList.list.filter(x => x.done).length

export const uncompleteCount = (state: RootState) =>
	state.taskList.list.filter(x => !x.done).length

export const canAddTaskSelector = (state: RootState) =>
	uncompleteCount(state) < 10

export const getNotification = (state: RootState) => state.taskList.notification

export const showOnlyActiveSelector = (state: RootState) =>
	state.taskList.showOnlyActive

export const visibleTasksSelector = (state: RootState) =>
	state.taskList.showOnlyActive
		? state.taskList.list.filter(x => !x.done)
		: state.taskList.list
