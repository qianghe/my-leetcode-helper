import React from 'react'
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

function TodayGain(props) {
  return (
    <div className={styles.todayGain}>
      <ProblemStarsCount countMap={starsCountMockData} />
      <ProblemCommitLog />
      <ProblemList />
    </div>
  )
}

export default TodayGain