import React from 'react'
import styles from './index.module.scss'

const CateTag = ({ cate }) => ()

const OrderWithStatusTag = ({ order, status }) => (

)

function ProblemList({ items }) {
  return (
    <div className={styles.list}>
      {
        items.map((item, index) => {
          return (
            <div key={item.key || index}>
              <OrderWithStatusTag order={index + 1} status={item.status}>
              <a href={item.url}>{item.title}</a>
              <CateTag cate={item.cate} />
            </div>
          )
        })
      }
    </div>
  )
}

export default ProblemList