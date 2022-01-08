import React, { useMemo } from 'react'
import { useRequest } from '@umijs/hooks'
import Loading from 'web/component/loading'
import { getGroupedSet } from 'app/web/page/api'
import EChart from './e-chart'
import styles from './index.module.scss'

function CateGraph() {
	const { data, loading } = useRequest(getGroupedSet, {
    formatResult: res => res.data
  })
	const getSize = useMemo(() => {
		if (!data) return () => void 0

		const cateCounts = Object.values(data).map(i => i.length)
		const [min, max] = [Math.min(...cateCounts), Math.max(...cateCounts)]
		const [minSize, maxSize] = [20, 80]
		
		return len => {
			return Math.floor(len * (maxSize - minSize) / (max - min))
		}
	}, [data])

	const graph = useMemo(() => {
		if (!data) return
		
		return Object.keys(data).reduce((g, cate, index) => {
			const items = data[cate]
			const size = getSize(items.length)
			g.nodes.push({
				name: cate,
				value: items.length,
				category: index,
				symbolSize: size,
				label: {
					show: size >= 20
				}
			})
	
			g.categories.push({
				name: cate,
			})
	
			return g
		}, { nodes: [], categories: []})
	}, [data])

	const options = useMemo(() => {
		if (!graph) return {}
	
		return {
			// darkMode: true,
			tooltip: {},
			// backgroundColor: 'rgba(0, 0, 0, 0.2)',
			series: [
				{
					type: 'graph',
					layout: 'force',
					data: graph.nodes,
					categories: graph.categories,
					roam: true,
					label: {
						show: true,
						position: 'right',
						formatter: '{b}'
					},
					labelLayout: {
						hideOverlap: true
					},
					scaleLimit: {
						min: 1,
						max: 2
					}
				}
			]
		}
	})

	return (
    <div className={styles.cate}>
      {
        loading ? <Loading /> : (
         <EChart options={options} />
        )
      }
    </div>
  );
}

export default CateGraph