import React, { useMemo, useRef } from 'react'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { useRequest } from '@umijs/hooks'
import { getTodayCommitRequest, getTodayProblemRequest } from 'app/web/page/api'
import EmptyImg from 'web/asset/images/empty.png'
import Loading from 'web/component/loading'
import ProblemStarsCount from './problem-stars'
import ProblemCommitLog from './problem-commit-log'
import ProblemList from './problem-list'
import styles from './index.module.scss'

function TodayGain() {
  const todayProblemMapRef = useRef({})
  const { data, loading } = useRequest(() => {
    return Promise.all([
      getTodayCommitRequest(),
      getTodayProblemRequest()
    ])
  }, {
    formatResult: res => [res[0].data, res[1].data]
  })

  const todayProblems = useMemo(() => {
    if(!data) return
    const [commits, problems] = data
    const map = commits.reduce((tps, commit, index) => {
      const { detail } = commit
      const problem = problems.find((p) => p.title === detail.title)

      if (!tps[detail.title]) {
        tps[detail.title] = {
          rawId: problem['leetcode_id'],
          key: index,
          status: isEmpty(problem) ? 'pending' : 'resolved',
          cate: isEmpty(problem) ? 'easy' : problem.difficulty.toLowerCase(),
          url: `https://leetcode.com/problems/${problem.slug}/`
        }
      }
      return tps
    }, {})

    todayProblemMapRef.current = map
    
    return Object.keys(map).map((title) => {
      const problem = todayProblemMapRef.current[title]
      problem.title = title
      return problem
    })
  }, [data])

  const starCountData = useMemo(() => {
    if (!todayProblems) return {} 
    return todayProblems.reduce((starMap, problem) => {
      const { status, cate } = problem
      let group = cate
      if (status === 'pending') {
        group = 'attempted'
      }

      if (starMap[group] === undefined) {
        starMap[group] = 0
      }

      starMap[group] += 1
      return starMap
    }, {})
  }, [todayProblems])

  const logs = useMemo(() => {
    if (!data) return []
    const commits = data[0]
    return commits.map((commit) => {
      const { commit_time, detail } = commit
      const { title } = detail
      const problem = todayProblemMapRef.current[title]

      return {
        problemId: problem.rawId,
        timestamp: moment(commit_time).unix(),
        cate: problem.cate,
        status: commit.status ? 'accepted': 'wrong',
      }
    })
  }, [data])

  return (
    <div className={styles.todayGain}>
      { loading ? <Loading /> : (
        isEmpty(logs) ? (
          <div className={styles.empty}>
            <p>今天还没有提交记录哦～</p>
            <img src={EmptyImg} style={{ width: 400 }}/>
          </div>
        ) : (
          <React.Fragment>
            <div className={styles.starContainer}>
            <ProblemStarsCount countMap={starCountData} />
            </div>
            <ProblemCommitLog logs={logs}/>
            <ProblemList items={todayProblems} />
          </React.Fragment>
        )
      )}
    </div>
  )
}

export default TodayGain