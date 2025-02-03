import style from "./Input.module.scss"
import { IInput } from "../../types/types"

const Input = ({
  title,
  name,
  placeholder = "placeholder",
  type,
  inputEvent,
}: IInput) => {
  return (
    <div className={style.inputWrap}>
      <label className={style.inputLabel}>{title}</label>
      <input
        name={name}
        className={style.input}
        type={type}
        placeholder={placeholder}
        onChange={inputEvent}
      />
    </div>
  )
}

export default Input
