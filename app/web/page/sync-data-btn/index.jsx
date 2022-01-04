import React from 'react'
import axios from 'axios'
import styles from './index.module.scss'

function SyncDataBtn() {
	function handleSyncData() {
		const [startTime, endTime] = [1641225600, 1641308400]
		const result = axios.get(`/api/sync?startTime=${startTime}&endTime=${endTime}`)
		console.log('result', result)
	}
	return (
		<div onClick={handleSyncData}>SyncData</div>
	)
}

export default SyncDataBtn