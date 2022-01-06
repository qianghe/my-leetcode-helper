import React from 'react'
import 'web/asset/css/global.css'
import Card from 'web/component/card'
import FavoriteFillIcon from 'app/web/asset/icons/favorite_fill.svg'
import Header from './header'
import TargetModule from './target'
import CalendarModule from './calendar'
import TodayGainModule from './today-gain'
import CateGraphModule from './cate-graph'
import styles from './index.module.scss'

const App = () => (
  <div className={styles.page}>
    {/* header */}
    <Header />
    {/* content */}
    <div className={styles.content}>
      <div className={styles.left}>
        {/* 目标设定*/}
        <Card
          title={
            <React.Fragment>
              <span>目标</span>&nbsp;
              <img src={FavoriteFillIcon} />
            </React.Fragment>
          }
          level={1}
          corner={30}
        >
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
      <div className={styles.right}>
        {/* 今日成果 */}
        <Card title="今日成果" bg="transparent">
          <TodayGainModule />
        </Card>
        {/* 已完成题目分类 */}
        <Card title="完成题目分类" level={2} corner={60}>
          <CateGraphModule />
        </Card>
      </div>
    </div>
  </div>
)

export default App