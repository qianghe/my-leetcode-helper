import React from 'react'
import moment from 'moment'
import Progress from 'web/component/progress'
import styles from './index.module.scss'

const TargetModule = ({
  startTime,
  endTime,
  format = 'YYYY.MM.DD',
  targetProblemLen,
  resolvedProblemLen
}) => {
  const [start, end] = [startTime, endTime].map((t) =>
    moment(t).format(format)
  );

  return (
    <div className={styles.target}>
      <p className={styles.desc}>
        <span className={styles.time}>「{start}」</span>到
        <span className={styles.time}>「{end}」</span>
        累计<span className={styles.total}>{targetProblemLen}</span>题
      </p>
      <Progress target={targetProblemLen} cur={resolvedProblemLen} />
    </div>
  );
};

export default TargetModule;
