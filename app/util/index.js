const moment = require('moment')

const formatTime = (hour = 0) => {
  return moment()
    .set('hour', hour)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
}

const nextTime = (t, unit = 'millisecond', increase = 1) => {
  const time = moment(t)
  const methodName = `${unit}s`
  return time.set(unit, time[methodName]() + increase)
}

const getTimestamp = (date) => {
  return moment(date).unix()
}

const getSliceTimestamp = (date, end = 'month') => {
  const time = moment(date)
  const units = ['year', 'month', 'day', 'hour', 'minute', 'second', 'millisecond']
  const endIndex = units.findIndex(unit => unit === end)

  return units.reduce((sliceTime, unit, index) => {
    if (index <= endIndex) {
      sliceTime.set(unit, time[unit]())
    } else {
      sliceTime.set(unit, 0)
    }
    return sliceTime
  }, moment())
}

module.exports = {
  formatTime,
  nextTime,
  getTimestamp,
  getSliceTimestamp
}