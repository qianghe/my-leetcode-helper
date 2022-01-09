import React, { useState } from 'react'
import 'web/asset/css/global.css'
import * as API from './api'
import Loading from 'web/component/loading'
import Card from 'web/component/card'
import FavoriteFillIcon from 'app/web/asset/icons/favorite_fill.svg'
import Header from './header'
import TargetModule from './target'
import CalendarModule from './calendar'
import TodayGainModule from './today-gain'
import CateGraphModule from './cate-graph'
import styles from './index.module.scss'

function App() {
  const [loading, setLoading] = useState(false)

  function notifySyncStatus(isLoading) {
    setLoading(isLoading)
  }

  return (
    <div className={styles.page}>
      {/* header */}
      <Header notifySyncStatus={notifySyncStatus}/>
      {/* content */}
      {
        loading ? <Loading /> : (
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
                request={() => API.getUserGoalRequest('CheeryQ')}
              >
                <TargetModule />
              </Card>
              {/* 日历 */}
              <div className={styles.calendar}>
                <Card
                  corner={30}
                  request={API.getGroupedQuesByMonthRequest}
                >
                  <CalendarModule />
                </Card>
              </div>
            </div>
            <div className={styles.right}>
              {/* 今日成果 */}
              <Card
                title="今日成果"
                bg="transparent"
                emptyType="img"
                request={() => {
                  return Promise.all([
                    API.getTodayCommitRequest(),
                    API.getTodayProblemRequest()
                  ])
                }}
                format={res => [res[0].data, res[1].data]}
              >
                <TodayGainModule />
              </Card>
              {/* 已完成题目分类 */}
              <Card
                title="完成题目分类"
                bg="transparent"
                level={2}
                corner={60}
                request={API.getGroupedSetRequest}
              >
                <CateGraphModule />
              </Card>
            </div>
          </div>
        )
      }
    </div>
  )
}
export default App