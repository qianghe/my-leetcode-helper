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

module.exports = {
  formatTime,
  nextTime,
  getTimestamp
}