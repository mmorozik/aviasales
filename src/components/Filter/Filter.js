import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { toggleCheck } from '../../store/filterSlice'

import classes from './Filter.module.scss'

const Filter = () => {
  let filtersState = useSelector((state) => state.filter.check)
  const dispatch = useDispatch()
  const dataFilter = [
    { key: 'all', label: 'Все' },
    { key: 'no-transfer', label: 'Без пересадок' },
    { key: 'one-transfer', label: '1 пересадка' },
    { key: 'two-transfer', label: '2 пересадки' },
    { key: 'three-transfer', label: '3 Пересадки' },
  ]
  const filter = dataFilter.map((el) => {
    return (
      <label key={el.key}>
        <input
          className={classes.input}
          type="checkbox"
          checked={filtersState[el.key]}
          onChange={() => dispatch(toggleCheck({ key: el.key }))}
        />
        <span className={classes.checkbox}></span>
        <span>{el.label}</span>
      </label>
    )
  })
  return (
    <div className={classes.filter}>
      <span className={classes.title}>Количество пересадок</span>
      {filter}
    </div>
  )
}

export default Filter
