import React from 'react'
import { cateColorMap } from 'app/web/utils/color'
import DoneStatusIcon from './icons/done_problem_status.svg'
import AttemptedStatusIcon from './icons/attempted_problem_status.svg'
import styles from './index.module.scss'

const CateTag = ({ cate, color }) => {
  const cateStr = cate[0].toUpperCase() + cate.slice(1)
  return (
    <div className={styles.cateTag}>
      <p className={styles.tag} style={{ color }}>{cateStr}</p>
    </div>
  )
}

const OrderWithStatusTag = ({ order, status }) => (
  <div className={styles.orderTag}>
    <img src={status === 'pending' ? AttemptedStatusIcon : DoneStatusIcon} alt="" />
    <div className={styles.orderNum}>NO.{order}</div>
  </div>
)

function ProblemList({ items }) {
  return (
    <div className={styles.list}>
      {
        items.map((item, index) => {
          const cateColor = cateColorMap[item.cate]
          return (
            <div key={item.key || index} className={styles.listItem}>
              <OrderWithStatusTag order={index + 1} status={item.status} />
              <a href={item.url}>{item.title}</a>
              <CateTag cate={item.cate} color={cateColor} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ProblemList