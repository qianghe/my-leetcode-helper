import React from 'react'
import styles from './index.module.scss'
import { float2Percent } from 'app/web/utils/convert'

const BarScatter = ({
  items,
  colorMap,
  per,
  total
}) => {
  const widthInfo = items.map(item => {
    item.cate = item[0]
    item.width = float2Percent(item[1] / total)
    return item
  })
  return (
    <div className={styles.scatter}>
      <p className={styles.desc}>
        {
          items.map(([cate, count], index) => (
            <React.Fragment key={index}>
              <span>{count}({cate[0].toUpperCase()})</span>
              {
                index !== items.length - 1 ? <span>&nbsp;+&nbsp;</span> : ''
              }
            </React.Fragment>
          ))
        }
        &nbsp;=&nbsp;<span className={styles.total}>{total}</span>
      </p>
      <div className={styles.barLine} style={{ width: float2Percent(per)}}>
        {
          widthInfo.map(({ width, cate }, index) => {
            const styles = {
              width,
              backgroundColor: colorMap[cate]
            }
            return (
              <div key={index} style={styles}></div>
            )
          })
        }
      </div>
    </div>
  )
}

export default BarScatter