import { Link, useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import style from "./Navbar.module.scss"
import styles from "./Navbar.module.scss"
import Person from "../Person/Person"
import { toggleActive } from "../../store//activeSlice"
import { signOutUser } from "../../store/signInSlice"
import { IActive, ISignIn } from "../../types/types"

const Navbar = () => {
  const location = useLocation()
  const btnIsActive = (path: string) => location.pathname === path

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isActive } = useSelector((state: IActive) => state.active)
  const { auth } = useSelector((state: ISignIn) => state.signIn)

  const logOutHandler = () => {
    dispatch(signOutUser())
    dispatch(toggleActive())
    navigate("/sign-in")
  }

  return (
    <div
      className={
        !isActive ? styles.navbar : `${styles.navbar} ${styles.active}`
      }
    >
      <div className={style.navbarBtnsWrap}>
        <div className={style.navbarBtn}>
          <Person />
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
      </div>
      <div className={style.themeAndLogOutWrap}>
        {auth ? (
          <button onClick={logOutHandler} className={style.logOutBtn}>
            Log Out
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(toggleActive())
              navigate("/sign-in")
            }}
            className={style.logOutBtn}
          >
            Log In
          </button>
        )}
      </div>
    </div>
  )
}
export default Navbar
