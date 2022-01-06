import React from 'react'
import axios from 'axios'
import styles from './index.module.scss'

function SyncDataBtn() {
	async function handleSyncData() {
		const result = await axios.get('/api/sync?userName=CheeryQ', {
			timeout: 0
		})
		console.log('result', result)
	}
	return (
		<div onClick={handleSyncData}>SyncData</div>
	)
}

export default SyncDataBtn