import React from 'react'
import styles from './index.module.scss'

const float2Percent = (f, precision = 2) => {
  return `${parseFloat(f) * 100}`.toFix(precision)
}
const BarScatter = ({
  items,
  per,
  colorMap
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
            <>
              <span>{count}(${cate[0].toUpperCase()})</span>
              {
                index !== scatterCate.length - 1 ? <span>&nbsp;+&nbsp;</span> : ''
              }
            </>
          ))
        }
        <span className={styles.total}>&nbsp;=&nbsp;${total}</span>
      </p>
      <div className={styles.bar} style={{ width: float2Percent(per)}}>
        {
          widthInfo.map(({ width, cate }, index) => {
            const styles = {
              width,
              color: colorMap[cate]
            }
            return (
              <div key={index} style={style}></div>
            )
          })
        }
      </d>
    </div>
  )
}

export default BarScatter