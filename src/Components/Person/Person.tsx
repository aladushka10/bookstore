import { useMemo } from "react"
import style from "./Peson.module.scss"

interface IPerson {
  username: string
}

const Person = ({ username }: IPerson) => {
  const initials = useMemo(() => {
    return username
      .split(" ")
      .map((letter) => letter[0])
      .join("")
  }, [username])
  return (
    <div className={style.personFIO}>
      <div className={style.personFIOWrap}>
        <div className={style.personInitials}>
          <span>{initials}</span>
        </div>
        <div className={style.personName}>
          <span>{username}</span>
        </div>
      </div>
    </div>
  )
}

export default Person
