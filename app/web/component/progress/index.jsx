import React from 'react'
import classNames from 'classnames'
import { float2Percent } from 'app/web/utils/convert'
import LightIcon from 'web/asset/icons/lamp_duotone_line.svg'
import styles from './index.module.scss'

const ProgressBar = ({ target = 100, cur = 1 }) => {
  const activeWidthPer = parseFloat(cur / target) * 100
  const innerWidthRate = float2Percent(cur / target)

  return (
    <div className={styles.bg}>
      <div
        className={styles.active}
        style={{
          width:innerWidthRate
        }}
      >
        <div className={styles.line}>
          <img src={LightIcon} />
          <span
            className={
              classNames(
                styles.rate,
                styles[`rate${activeWidthPer >= 50 ? '--left': '--right'}`]
              )
            }
          >{innerWidthRate}</span>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;
