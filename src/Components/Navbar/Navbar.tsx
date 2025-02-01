import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import { ReactComponent as Light } from "../../assets/light.svg"
import { ReactComponent as Dark } from "../../assets/dark.svg"
import { useDispatch, useSelector } from "react-redux"
import style from "./Navbar.module.scss"
import styles from "./Navbar.module.scss"
import Person from "../Person/Person"
import { toggleActive } from "../../store//activeSlice"

const Navbar = () => {
  const location = useLocation()
  const btnIsActive = (path: string) => location.pathname === path

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isActive } = useSelector((state) => state.active)
  // const { auth } = useSelector((state: any) => state.signIn)

  return (
    <div
      className={
        !isActive ? styles.navbar : `${styles.navbar} ${styles.active}`
      }
    >
      <div className={style.navbarBtnsWrap}>
        <div className={style.navbarBtn}>
          <Person username={"Artem Malkin"} />
        </div>

        <div
          className={`${style.navbarBtn} ${
            btnIsActive("/") ? style.active : ""
          }`}
        >
          <Link
            to="/"
            className={style.navbarLink}
            onClick={() => dispatch(toggleActive())}
          >
            <p>New Release</p>
          </Link>
        </div>

        <div
          className={`${style.navbarBtn} ${
            btnIsActive("/bookmarks") ? style.active : ""
          }`}
        >
          <Link
            to="/bookmarks"
            className={style.navbarLink}
            onClick={() => dispatch(toggleActive())}
          >
            <p>Bookmarks</p>
          </Link>
        </div>

        {/* {auth && (
          <div
            className={`${style.navbarBtn} ${
              btnIsActive("/my-posts") ? style.active : ""
            }`}
          >
            <Link
              to="/my-posts"
              className={style.navbarLink}
              onClick={() => dispatch(toggleActive())}
            >
              <p>My Posts</p>
            </Link>
          </div>
        )} */}
      </div>
      <div className={style.themeAndLogOutWrap}>
        <button
          onClick={() => dispatch(toggleActive(), navigate("/sign-in"))}
          className={style.logOutBtn}
        >
          Log In
        </button>
      </div>
    </div>
  )
}
export default Navbar
