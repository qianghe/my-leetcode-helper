import React, { useMemo } from 'react'
import { useRequest } from '@umijs/hooks'
import { getTodayCommitRequest } from 'app/web/page/api'
import Loading from 'web/component/loading'
import ProblemStarsCount from './problem-stars'
import ProblemCommitLog from './problem-commit-log'
import ProblemList from './problem-list'
import styles from './index.module.scss'

const starsCountMockData = {
  hard: 1,
  medium: 2,
  easy: 3,
  attempted: 1
}

const listMockData = new Array(5).fill(false).map((_, index) => ({
  key: index,
  title: '	Fraction to Recurring Decimal',
  status: index === 4 ? 'pending' : 'resolved',
  cate: ['hard', 'medium', 'medium', 'easy', 'easy'][index],
  url: ''
}))

function TodayGain(props) {
  const { data, loading } = useRequest(getTodayCommitRequest, {
    formatResult: res => res.data
  })
  return (
    <div className={styles.todayGain}>
      { loading ? <Loading /> : (
        <React.Fragment>
          <div className={styles.starContainer}>
          {/* <ProblemStarsCount countMap={starsCountMockData} /> */}
          </div>
          <ProblemCommitLog />
          {/* <ProblemList items={listMockData} /> */}
        </React.Fragment>
      )}
    </div>
  )
}

export default TodayGain