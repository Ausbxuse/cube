import { useState } from 'react';
import styles from './nav.module.css'
import Info from './info'
import Help from './help'
// import utilStyles from '../styles/utils.module.css'
import Link from 'next/link'
import Image from 'next/image'

// import Burger from '@animated-burgers/burger-squeeze'
// don't forget the styles
// import '@animated-burgers/burger-squeeze/dist/styles.css'
import styled from "@emotion/styled";
// import ThemeToggle from "../components/themeToggler";


function help_info_content() {
  return (
    <>
      <kbd>K</kbd> / <kbd>L</kbd> = R/R' <br />
      <kbd>J</kbd> / <kbd>F</kbd> = U/U' <br />
      <kbd>M</kbd> / <kbd>V</kbd> = F/F' <br />
      <kbd>S</kbd> / <kbd>D</kbd> = L/L' <br />
      <kbd>B</kbd> / <kbd>N</kbd> = B/B' <br />
      <kbd>A</kbd> / <kbd>;</kbd> = D/D' <br />
      <kbd>i</kbd> = Scramble cube <br />
      <kbd>Tab</kbd> = Reset cube <br />
      <kbd>R</kbd> = Solve cube using 3-blind method<br />
      <kbd>X</kbd> = y <br /> <br /> <br />
      You could also use the provided keypad to turn the cube <br />  <br />
      Click anywhere to escape out of this help menu
    </>
  )
}

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
            {showHelp ? <button onClick={toggle}><Help title="How To Use">{help_info_content()}</Help></button> : null}
            {showHelp ? null :
              <button type="button" onClick={toggle}>
                <Image
                  src="/images/question_mark.png"
                  className={styles.logo}
                  width={36}
                  height={36}
                />
              </button>
            }
            <Link href="https://github.com/ausbxuse/cube">
              <Image
                src="/images/github-mark.png"
                width={36}
                height={36}
              />
            </Link>
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
