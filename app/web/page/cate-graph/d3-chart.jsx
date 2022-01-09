import React, { useRef, useEffect, useMemo } from 'react'
import { renderBubbleChart } from './BubbleChart'
import styles from './index.module.scss'

function D3BubbleChart({ data }) {
	const ref = useRef(null)
	const bubbles = useMemo(() => {
		if (!data) return []
		// 按照数量分类
		return Object.keys(data).map(cate => {
			const count = data[cate].length
			// const value = getSizeVal(count)
			return {
				label: `${cate.split(' ').join('\n')}\n${count} problems`,
				value: count,
				group: count,
				refs: data[cate]
			}
		})
	}, [])

	useEffect(() => {
		if (!bubbles) return ''
		
		renderBubbleChart(bubbles, ref.current, {
			label: d => d.label,
			value: d => d.value,
			group: d => d.value
		})
	}, [bubbles])

	return (
		<div classNmae={styles.bubble}>
			<svg ref={ref} />
		</div>
	)
}

export default D3BubbleChart