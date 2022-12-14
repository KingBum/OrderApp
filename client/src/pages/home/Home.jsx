import React from 'react'
import styles from './home.module.scss';

export default function Home() {
  return (
    <div className={styles.home}>
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <span className={styles.logoFront}>KAY</span>
                <span className={styles.logoEnd}>B</span>
            </div>
            <form className={styles.form}>
                <div className={styles.field}>
                    <i className={`fa-solid fa-user ${styles.iconFrom}`}></i>
                    <input className={styles.textField} placeholder="Username" type="text" />
                </div>
                <div className={styles.field}>
                    <i className={`fa-sharp fa-solid fa-shield ${styles.iconFrom}`}></i>
                    <input className={styles.textField} placeholder="Password" type="password" />
                </div>
                <div className={styles.keepLogin}>
                    <i className={`fa-regular fa-circle-check ${styles.icon}`}></i>
                    <span className={styles.subText}>Keep me logged in</span>
                </div>
            </form>
            <div className={styles.boxLogin}>
                <button className={styles.btnPrimary}>Login</button>
                <span className={styles.subText}>Forgot passwords ?</span>
                <span className={styles.recover}>Recover here</span>
            </div>
            <div className={styles.or}>Or</div>
            <button className={styles.btnSecond}>Login with Guest</button>
        </div>
        
    </div>
  )
}
