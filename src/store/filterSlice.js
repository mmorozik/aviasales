/* eslint-disable indent */
import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    tabs: 'cheap',
    check: {
      all: true,
      'no-transfer': true,
      'one-transfer': true,
      'two-transfer': true,
      'three-transfer': true,
    },
    counter: 5,
  },
  reducers: {
    toggleTabs(state, action) {
      state.counter = 5
      state.tabs = action.payload.key
    },
    toggleCheck(state, action) {
      state.counter = 5
      const check = state.check
      switch (action.payload.key) {
        case 'all':
          check.all = !check.all
          for (let key in check) {
            check[key] = check.all
          }
          break
        default:
          check[action.payload.key] = !check[action.payload.key]
          check['no-transfer'] && check['one-transfer'] && check['two-transfer'] && check['three-transfer']
            ? (check.all = true)
            : (check.all = false)
          break
      }
    },
    count(state) {
      state.counter += 5
    },
  },
})

export const { toggleCheck, toggleTabs, count } = filterSlice.actions

export default filterSlice.reducer
