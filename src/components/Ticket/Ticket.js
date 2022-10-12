import React from 'react'
import { format, addMinutes } from 'date-fns'

import classes from './Ticket.module.scss'

const Ticket = (props) => {
  const { ticket } = props
  const info = ticket.segments.map((el) => {
    const dateStart = format(new Date(el.date), 'HH:mm')
    const dateFinish = format(addMinutes(new Date(el.date), el.duration), 'HH:mm')
    const time = `${Math.floor(el.duration / 60)}ч ${el.duration % 60}м`
    const transfer = el.stops.length ? (
      <>
        <span>{`${el.stops.length} пересадки`}</span>
        <p>{el.stops.join(', ')}</p>
      </>
    ) : (
      <span>Без пересадок</span>
    )
    return (
      <div key={el.origin + el.destination} className={classes.route}>
        <div className={classes.column}>
          <span>{`${el.origin}-${el.destination}`}</span>
          <p>{`${dateStart}-${dateFinish}`}</p>
        </div>
        <div className={classes.column}>
          <span>В пути</span>
          <p>{time}</p>
        </div>
        <div className={classes.column}>{transfer}</div>
      </div>
    )
  })
  const logo = `https://pics.avs.io/99/36/${ticket.carrier}.png`
  return (
    <div className={classes.ticket}>
      <div className={classes.header}>
        <span className={classes.price}>{ticket.price.toLocaleString() + ' Р'}</span>
        <img src={logo} className={classes.logo} />
      </div>
      {info}
    </div>
  )
}

export default Ticket
