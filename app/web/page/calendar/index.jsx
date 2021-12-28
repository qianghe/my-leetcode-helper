import React, { useMemo } from 'react'
import moment from 'moment'
import { pick } from 'lodash'
import Card from 'web/component/card'
import styles from './index.module.scss'

const mockData = [
  {
    time: 1644508800000,
    hard: 9,
    medium: 10,
    esay: 6
  },
  {
    time: 1640966400000,
    hard: 2,
    medium: 32,
    esay: 10
  }, {
    time: 1639152000000,
    hard: 0,
    medium: 34,
    esay: 2
  },
  {
    time: 1636560000000,
    hard: 0,
    medium: 64,
    esay: 0
  }
]

const Calendar = () => {
  // 基于problems进行计算
  const cateByMonth = useMemo(() =>{
    const data = mockData.map(item => {
      // 对题目进行排序
      const scatterCate = toPairs(pick(props, ['easy', 'medium', 'hard']))
      scatterCate.sort(([_, val1], [_, val2]) => val2 - val1)
      item.scatters = scatterCate
      item.total = scatterCate.reduce((sum, cur) => sum + cur[1], 0)
      item.times = moment(item.time).format('YYYY.MM').split('.')
      return item
    })
    // 获取隔年时间
    const years = data.map(item => item.times[0])
    let diffYearIndex = 0
    
    for (let i = 1; i < years.length; i++) {
      const [pre, cur] = [years[i - 1], years[i]]
      if (pre !== cur) {
        diffYearIndex = i - 1
        break
      }
    }

    data.forEach((item, index) => {
      index !== diffYearIndex && (item.times = [item.times[1]])
    })

    return data
  }, [])

  const maxScatterTotal = cateByMonth.reduce((max, cur) => Math.max(max, cur.total), 0)

  return (
    <div className={styles.calendar}>
      <Card corner={30}>
        <div className={styles.header}>
          <p>日历</p>
          <div className={styles.content}>
            {
              cateByMonth.map((item, index) => {
                const { time, total, scatters } = item
                const per = parseFloat((total / maxScatterTotal).toFixed(2))
                return (
                  <div key={index}>
                    <TimeLabel time={time} />
                    <DotSeparator size={16} color="#696464" />
                    <BarScatter
                      items={scatters}
                      per={per}
                      total={total}
                      colorMap={{
                        hard: '#AB1010',
                        medium: '#E3AC1D',
                        easy: '#71A14A'
                      }}
                    />
                  </div>
                )
              })
            }
          </div>
        </div>
      </Card>
    </div>
  )
}

export default Calendar