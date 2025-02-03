import { ITitle } from "../../types/types"
import style from "../Title/Title.module.scss"

const Title = ({ title, children }: ITitle) => {
  if (title === undefined) {
    return <h1>{children}</h1>
  }
  return <h1 className={style.title}>{title}</h1>
}
export default Title
