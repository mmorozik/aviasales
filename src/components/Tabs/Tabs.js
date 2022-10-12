import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleTabs } from '../../store/filterSlice'

import classes from './Tabs.module.scss'

const Tabs = () => {
  const tabs = useSelector((state) => state.filter.tabs)
  const dispatch = useDispatch()
  const btn = [
    { key: 'cheap', label: 'Самый дешевый' },
    { key: 'faster', label: 'Самый быстрый' },
    { key: 'optimal', label: 'Оптимальный' },
  ]
  const button = btn.map((bt) => {
    const className = bt.key === tabs ? classes.active : ''
    return (
      <button key={bt.key} className={className} onClick={() => dispatch(toggleTabs({ key: bt.key }))}>
        <span>{bt.label}</span>
      </button>
    )
  })
  return <div className={classes.tabs}>{button}</div>
}

export default Tabs
