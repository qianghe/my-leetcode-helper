import React from 'react'
import 'web/asset/css/global.css'
import Card from 'web/component/card'
import TargetModule from './target'
import CalendarModule from './calendar'
import styles from './index.module.scss'

const App = () => (
  <div className={styles.page}>
    {/* header */}
    <div className={styles.pageHeader}>
      <div className={styles.user}>
        <p>My Leetcode Helper</p>
        <i>logOut</i>
      </div>
    </div>
    {/* content */}
    <div className={styles.content}>
      <div className={styles.left}>
        {/* 目标设定*/}
        <Card title="目标" level={1} corner={30}>
          <TargetModule
            startTime={1636646400000}
            endTime={1640611343000}
            targetProblemLen={180}
            resolvedProblemLen={170}
          />
        </Card>
        {/* 日历 */}
        <CalendarModule />
      </div>
      <div className={styles.right}></div>
    </div>
  </div>
)

export default App