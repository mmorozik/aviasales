import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export const fetchSearchId = () => (dispatch) => {
  fetch('https://front-test.dev.aviasales.ru/search')
    .then((body) => {
      if (body.ok) return body.json()
    })
    .then((searchId) => {
      dispatch(addSearchId(searchId.searchId))
    })
    .catch(() => dispatch(onError()))
}

export const fetchTickets = () => (dispatch) => {
  const id = useSelector((state) => state.tickets.id)
  if (id) {
    fetch(`https://front-test.dev.aviasales.ru/tickets?searchId=${id}`)
      .then((tickets) => tickets.json())
      .then((json) => dispatch(addTickets(json)))
      .catch(() => dispatch(onError()))
  }
}

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    id: '',
    loading: true,
    tickets: [],
    stop: false,
    err: false,
  },
  reducers: {
    onError(state) {
      state.loading = false
      state.err = true
    },
    addSearchId(state, actions) {
      state.id = actions.payload
    },
    addTickets(state, actions) {
      state.loading = false
      state.tickets = actions.payload.tickets
      state.stop = actions.payload.stop
    },
  },
})

export const { addSearchId, addTickets, onError } = ticketsSlice.actions

export default ticketsSlice.reducer
