import React, { useMemo } from 'react'
import moment from 'moment'
import { isEmpty } from 'lodash'
import Progress from 'web/component/progress'
import styles from './index.module.scss'

const TargetModule = ({
  format = 'YYYY.MM.DD',
  data = null
}) => {
  const info = useMemo(() => {
    if (!data) return {}
    const { start_time: startTime, end_time: endTime } = data
    const [start, end] = [startTime, endTime].map((t) =>
      moment(t).format(format)
    );

    return {
      start,
      end,
      targetProblemLen: data.target,
      resolvedProblemLen: data.cur
    }
  }, [data])

  return (
    <div className={styles.target}>
      {
        isEmpty(data) ? '' : (
         <React.Fragment>
            <p className={styles.desc}>
              <span className={styles.time}>「{info.start}」</span>到
              <span className={styles.time}>「{info.end}」</span>
              累计<span className={styles.total}>{info.targetProblemLen}</span>题
            </p>
            <Progress target={info.targetProblemLen} cur={info.resolvedProblemLen} />
          </React.Fragment>
        )
      }
    </div>
  );
};

export default TargetModule;
