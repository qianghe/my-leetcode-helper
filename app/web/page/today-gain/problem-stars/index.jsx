import React, { useMemo } from 'react'
import HardStartIcon from './icons/hard_star.svg'
import MediumStartIcon from './icons/medium_star.svg'
import EasyStartIcon from './icons/easy_star.svg'
import AttemptedStartIcon from './icons/attempted_star.svg'
import styles from './index.module.scss'

const ShadowCircle = ({
  shadowColor,
  size,
  count
}) => (
  <div
    style={{
      '--shadowColor': shadowColor,
      '--size': `${size}px`,
      // width: size,
      // height: size,
      // top: -size/1.6,
    }}
    className={styles.shadowCircle}
  ><span>{count}</span></div>
)

const defaultCateInfo = [
  [0, HardStartIcon, '#da2a12cf'],
  [0, MediumStartIcon, '#dd9529cf'],
  [0, EasyStartIcon, '#0d833ccf'],
  [0, AttemptedStartIcon, '#c4c4c4']
]

function ProblemStars({
  countMap
}) {
  const starInfos = useMemo(() => {
    return ['hard', 'medium', 'easy', 'attempted'].reduce((sInfos, cate, index) => {
      const num = countMap[cate] || 0
      sInfos[index][0] = num
      
      return sInfos
    }, [...defaultCateInfo])
  }, [countMap])

  const minStartCount = starInfos.map(info => info[0]).reduce((max, cur) => Math.min(max, cur),0)
  const baseCircle = 16
  
  return (
    <div className={styles.stars}>
      {
        starInfos.map((starInfo, index) => {
          const [count, icon, color] = starInfo
          return (
            <div key={index} className={styles.star}>
              <img src={icon}></img>
              <ShadowCircle
                shadowColor={color}
                count={count}
                size={baseCircle + (count - minStartCount) * 2}
              />
            </div>
          )
        })
      }
    </div>
  )
}

export default ProblemStars