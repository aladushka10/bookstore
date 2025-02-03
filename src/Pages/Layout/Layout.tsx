import { Outlet } from "react-router-dom"
import Header from "../../Components/Header/Header"
import { ActiveContext } from "../../Сontext/Context"
import { useState } from "react"
import Navbar from "../../Components/Navbar/Navbar"
import Footer from "../../Components/Footer/Footer"
import style from "./Layout.module.scss"

const Layout = () => {
  const [active, setActive] = useState(false)

  return (
    <ActiveContext.Provider
      value={{ isActive: active, SetIsActive: setActive }}
    >
      <Header />
      <Navbar />
      <div className={style.layoutWrap}>
        <main className={style.content}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </ActiveContext.Provider>
  )
}
export default Layout
