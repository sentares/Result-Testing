// spec/utils/renderWithProviders.tsx
import React, { PropsWithChildren, ReactElement } from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import {
	configureStore,
	combineReducers,
	type PreloadedState,
} from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import taskListReducer from 'src/store/taskSlice'
import type { RootState } from 'src/store/configureStore'

const rootReducer = combineReducers({
	taskList: taskListReducer,
})

export const setupTestStore = (preloadedState?: PreloadedState<RootState>) =>
	configureStore({
		reducer: rootReducer,
		preloadedState,
	})

export type AppStore = ReturnType<typeof setupTestStore>
export type AppDispatch = AppStore['dispatch']

type ExtendedRenderOptions = {
	preloadedState?: PreloadedState<RootState>
	store?: AppStore
} & Omit<RenderOptions, 'queries'>

export function renderWithProviders(
	ui: ReactElement,
	{
		preloadedState,
		store = setupTestStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {}
) {
	function Wrapper({ children }: PropsWithChildren) {
		return <Provider store={store}>{children}</Provider>
	}

	return {
		store,
		...render(ui, { wrapper: Wrapper, ...renderOptions }),
	}
}
