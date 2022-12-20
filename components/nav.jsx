import { useState } from 'react';
import styles from './nav.module.css'
import Info from './info'
// import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Image from 'next/image'

// import Burger from '@animated-burgers/burger-squeeze'
// don't forget the styles
// import '@animated-burgers/burger-squeeze/dist/styles.css'
import styled from "@emotion/styled";
// import ThemeToggle from "../components/themeToggler";


export default function Nav({ children }) {
  const [showHelp, setShowHelp] = useState(false);
  function toggle() {
    setShowHelp(!showHelp);
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <div className={styles.topHint}></div>
        <nav className={styles.navContainer}>
          <ul className={styles.navItems}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="blog">Blog</Link></li>
            <li><Link href="contact">Contact</Link></li>
            <li><Link href="donate">Donate</Link></li>
          </ul>
          <div className={styles.mobileNav}>
            {showHelp ? <Info title="How To Use">K: R, L:R'</Info> : null}
            <button type="button" onClick={toggle}></button>
            <Link href="/">
              <Image
                src="/images/snappy-logo.png"
                className={styles.logo}
                width={36}
                height={36}
              />
            </Link>
            {/* <Burger onClick={toggle} isOpen={showMobileNav} /> */}
          </div>
        </nav>
      </div>

      <main>{children}</main>
    </>
  )
}
