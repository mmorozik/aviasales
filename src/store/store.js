import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './filterSlice'
import ticketsReducer from './ticketsSlice'

export default configureStore({
  reducer: {
    filter: filterReducer,
    tickets: ticketsReducer,
  },
})
