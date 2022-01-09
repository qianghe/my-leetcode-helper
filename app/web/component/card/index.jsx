import React from 'react'
import { isEmpty } from 'lodash'
import { useRequest } from '@umijs/hooks'
import Loading from 'web/component/loading'
import EmptyImg from 'web/asset/images/empty.png'
import styles from './index.module.scss'

const Card = ({
  corner = 5,
  title = '',
  level = 1,
  bg,
  emptyType = 'txt',
  children = [],
  request = null,
  format = res => res.data
}) => {
  const { data, loading } = useRequest(() => {
    if (!request) return Promise.resolve()
    return request()
  }, {
    formatResult: res => res && format(res)
  })
  const divStyles = {
    '--bg': bg,
    borderTopLeftRadius: corner
  }
  const EmptyComponent = (
    <div className={styles.empty}>
      <p>暂无数据哦...</p>
      {
        emptyType === 'img' ?  <img src={EmptyImg} style={{ width: 300 }}/> : ''
      }
    </div>
  )

  return (
    <div className={styles.card} style={divStyles}>
      <p style={{ '--level': level }} className={styles.title}>{title}</p>
      {
        !request ? children : (
          loading ? <Loading /> : (
           isEmpty(data) ? EmptyComponent : React.Children.map(children, (child) => {
             return <child.type {...child.props} data={data} />
           })
          )
        )
      }
    </div>
  )
}
export default Card