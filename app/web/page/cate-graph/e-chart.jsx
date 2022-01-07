import React, { useEffect, useRef } from 'react'
import { isEmpty } from 'lodash'
import * as echarts from 'echarts'
import styles from './index.module.scss'

function EChart(props) {
	const ref = useRef(null)
	const chart = useRef(null)

	useEffect(() => {
		if (!ref.current || isEmpty(props.options)) return

		if (!chart.current) {
			chart.current = echarts.init(ref.current)
			console.log(chart.current)
		}

		chart.current.setOption(props.options)
	}, [props.options])

	return (
		<div id="main" ref={ref} className={styles.echarts} />
	)
}

export default EChart