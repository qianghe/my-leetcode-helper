import React from 'react'
import { syncDBRequest } from 'web/page/api'
import LogoutIcon from './icons/logout.svg'
import SyncIcon from './icons/sync.svg'
import styles from './index.module.scss'

function Header(props) {
  async function handleSyncData() {
    props.notifySyncStatus(true)
		
    try {
      await syncDBRequest('CheeryQ')
    } catch(e) {
      console.log('同步数据失败', e)
    } finally {
      props.notifySyncStatus(false)
    }
	}

  return (
    <div className={styles.header}>
      <div className={styles.user}>
        <p>My Leetcode Helper</p>
        <ul className={styles.actions}>
          <li onClick={handleSyncData}>
            <img src={SyncIcon} />
            <p>sync data</p>
          </li>
          <li onClick={handleSyncData}>
            <img src={LogoutIcon} />
            <p>log out</p>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Header