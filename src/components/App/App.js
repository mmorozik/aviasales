import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { fetchTickets, fetchSearchId } from '../../store/ticketsSlice'
import { count } from '../../store/filterSlice'
import logo from '../img/Logo.png'
import Filter from '../Filter'
import Tabs from '../Tabs'
import TicketList from '../TicketList'

import classes from './App.module.scss'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchSearchId())
  }, [])
  dispatch(fetchTickets())
  const showMore = (
    <button className={classes['show-button']} onClick={() => dispatch(count())}>
      <span>Показать еще 5 билетов</span>
    </button>
  )
  return (
    <div className={classes.app}>
      <img src={logo} className={classes.logo} />
      <div className={classes.wrapper}>
        <div className={classes.filter}>
          <Filter />
        </div>
        <div className={classes.main}>
          <Tabs />
          <TicketList />
          {showMore}
        </div>
      </div>
    </div>
  )
}

export default App
