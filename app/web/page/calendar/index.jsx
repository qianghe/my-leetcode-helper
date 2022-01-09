import React, { useMemo } from 'react'
import moment from 'moment'
import { pick, toPairs } from 'lodash'
import { cateColorMap } from 'app/web/utils/color'
import TimeLabel from './time-label'
import DotSeparator from './dot-separator'
import BarScatter from './bar-scatter'
import styles from './index.module.scss'

const Calendar = ({ data }) => {
  // 基于problems进行计算
  const cateByMonth = useMemo(() =>{
    if (!data) return []

    const items = data.map(item => {
      // 对题目进行排序
      const scatterCate = toPairs(pick(item, ['easy', 'medium', 'hard']))
      scatterCate.sort(([, val1], [, val2]) => val2 - val1)
      item.scatters = scatterCate
      item.total = scatterCate.reduce((sum, cur) => sum + cur[1], 0)
      item.times = moment(item.time).format('YYYY.MM').split('.')
      
      return item
    })

    // 获取隔年时间
    const years = items.map(item => item.times[0])
    let diffYearIndex = 0
    
    for (let i = 1; i < years.length; i++) {
      const [pre, cur] = [years[i - 1], years[i]]
      if (pre !== cur) {
        diffYearIndex = i - 1
        break
      }
    }

    items.forEach((item, index) => {
      index !== diffYearIndex && (item.times = [item.times[1]])
    })

    return items
  }, [data])

  const maxScatterTotal = cateByMonth.reduce((max, cur) => Math.max(max, cur.total), 0)

  return (
    <div className={styles.header}>
      <p>日历</p>
      {
        !data ? '' : (
          <div className={styles.content}>
            {
              cateByMonth.map((item, index) => {
                const { times, total, scatters } = item
                const per = parseFloat((total / maxScatterTotal).toFixed(2))
                return (
                  <div key={index} className={styles.unit}>
                    <TimeLabel times={times} />
                    <DotSeparator size={16} color="#696464" />
                    <BarScatter
                      items={scatters}
                      per={per}
                      total={total}
                      colorMap={cateColorMap}
                    />
                  </div>
                )
              })
            }
          </div>
        )
      }
    </div>
  )
}

export default Calendar