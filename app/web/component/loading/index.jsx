import React from 'react'
import classNames from 'classnames'
import styles from './index.module.scss'

const Loading = () => (
	<div className={styles.loaderWrapper}>
		<div className={styles.loader}></div>
		
		{/* <div className={classNames[styles.loaderSection, styles.sectionLeft]}></div>
		<div className={classNames[styles.loaderSection, styles.sectionRight]}></div> */}
	</div>	
)

export default Loading