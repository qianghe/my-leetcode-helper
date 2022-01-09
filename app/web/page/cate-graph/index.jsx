import React, { useMemo } from 'react'
import EChart from './e-chart'
import BubbleChart from './d3-chart'
import styles from './index.module.scss'

function CateGraph({ data }) {
	const getSize = useMemo(() => {
		if (!data) return () => void 0

		const cateCounts = Object.values(data).map(i => i.length)
		const [min, max] = [Math.min(...cateCounts), Math.max(...cateCounts)]
		const [minSize, maxSize] = [10, 50]
		
		return len => {
			const size = (maxSize - minSize) * (len - min) / (max - min) + minSize
			return Math.floor(size)
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
					show: size >= 16
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
			tooltip: {},
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
						formatter: '{b}',
						color: '#fff'
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
        !data ? '' : <EChart options={options} />
				// (
        //  <div className={styles.row}>
				// 	 <EChart options={options} />
				// 	 <BubbleChart data={data} />
				//  </div>
        // )
      }
    </div>
  );
}

export default CateGraph