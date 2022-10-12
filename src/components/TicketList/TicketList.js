/* eslint-disable indent */
import React from 'react'
import { useSelector } from 'react-redux'
import { LoadingOutlined, WarningTwoTone } from '@ant-design/icons'
import { Spin } from 'antd'

import Ticket from '../Ticket'

import classes from './TicketList.module.scss'

const TicketList = () => {
  let key = 1000
  let viewContent = []
  let filterData = []
  const err = useSelector((state) => state.tickets.err)
  const loading = useSelector((state) => state.tickets.loading)
  const counter = useSelector((state) => state.filter.counter)
  const data = useSelector((state) => state.tickets.tickets)
  const tabsStatus = useSelector((state) => state.filter.tabs)
  const filterStatus = useSelector((state) => state.filter.check)

  function sortTabs(tabsStatus, data) {
    const copyData = [...data]
    switch (tabsStatus) {
      case 'cheap':
        return copyData.sort((a, b) => a.price - b.price)
      case 'faster':
        return copyData.sort((a, b) => a.segments[0].duration - b.segments[0].duration)
      case 'optimal':
        return copyData.sort((a, b) => a.segments[0].duration + a.pice / 10 - b.segments[0].duration - b.price / 10)
    }
  }

  function sortFilter(filterStatus, data) {
    if (filterStatus.all) return data
    let copyData = [...data]
    const filter = (status) =>
      copyData.filter((el) => el.segments[0].stops.length !== status && el.segments[1].stops.length !== status)
    if (!filterStatus['no-transfer']) copyData = filter(0)
    if (!filterStatus['one-transfer']) copyData = filter(1)
    if (!filterStatus['two-transfer']) copyData = filter(2)
    if (!filterStatus['three-transfer']) copyData = filter(3)
    return copyData
  }

  if (data.length) {
    filterData = sortFilter(filterStatus, data)
    filterData = sortTabs(tabsStatus, filterData)
    viewContent = filterData.slice(0, counter)
  }
  const antIcon = <LoadingOutlined style={{ fontSize: 100, alignItems: 'center' }} spin />
  const spiner = (
    <div className={classes.center}>
      <Spin indicator={antIcon} />
    </div>
  )
  const tickets = viewContent.map((ticket) => {
    return <Ticket key={key++} ticket={ticket} />
  })
  const content = loading ? (
    spiner
  ) : err ? (
    <div className={classes.error}>
      <WarningTwoTone style={{ fontSize: 70 }} />
      <span>Что-то пошло не так, сервер не отвечает, повторите попытку позже</span>
    </div>
  ) : tickets.length ? (
    tickets
  ) : (
    <div className={classes.error}>
      <WarningTwoTone style={{ fontSize: 70 }} />
      <span>Что-то пошло не так, скорее всего вы не указали количество пересадок!</span>
    </div>
  )
  return <div className={classes['ticket-list']}>{content}</div>
}

export default TicketList
