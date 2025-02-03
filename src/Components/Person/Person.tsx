import { useMemo } from "react"
import style from "./Peson.module.scss"
import { useSelector } from "react-redux"
import { ReactComponent as PersonIcon } from "../../assets/person.svg"
import { ISignIn } from "../../types/types"

const Person = () => {
  const { username } = useSelector((state: ISignIn) => state.signIn)

  const initials = useMemo(() => {
    if (!username)
      return (
        <div className={style.personIcon}>
          <PersonIcon />
        </div>
      )
    return username
      .split(" ")
      .map((letter: string) => letter[0])
      .join("")
  }, [username])
  return (
    <div className={style.personFIO}>
      <div className={style.personFIOWrap}>
        <div className={style.personInitials}>
          <span>{initials}</span>
        </div>
        <div className={style.personName}>
          <span>{username || "Guest"}</span>
        </div>
      </div>
    </div>
  )
}

export default Person
