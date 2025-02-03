import { Link, useNavigate } from "react-router-dom"
import Input from "../../Components/Input/Input"
import style from "./SignUp.module.scss"
import { useState } from "react"
import Title from "../../Components/Title/Title"
import { useDispatch } from "react-redux"
import { signUpUser } from "../../store/signUpSlice"

const SignUp = () => {
  const [registrationData, setRegistrationData] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  })

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const formHandler = (e: React.ChangeEvent<HTMLFormElement>) => {
    e?.preventDefault()
    dispatch(signUpUser(registrationData))
    navigate("/sign-in")
  }

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRegistrationData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className={style.SignUp}>
      <div className={style.container}>
        <div className={style.SignUpWrap}>
          <Link className={style.backHomeBtn} to={"/"}>
            Back to Home
          </Link>
          <Title title={"Sign Up"} />
          <div className={style.SignUpFormBorder}>
            <form className={style.SignUpForm} onSubmit={formHandler}>
              <Input
                name={"username"}
                title={"Name"}
                type={"text"}
                placeholder="Your name"
                inputEvent={inputHandler}
              />
              <Input
                name={"email"}
                title={"Email"}
                type={"email"}
                placeholder="Your email"
                inputEvent={inputHandler}
              />
              <Input
                name={"password"}
                title={"Password"}
                type={"password"}
                placeholder="Your password"
                inputEvent={inputHandler}
              />
              <Input
                name={"passwordConfirm"}
                title={"Confirm password"}
                type={"password"}
                placeholder="Confirm password"
                inputEvent={inputHandler}
              />
              <button type="submit" className={style.SignUpBtn}>
                Sign Up
              </button>

              <div className={style.withoutAccWrap}>
                <span>Already have an account?</span>
                <Link to={"/sign-in"} className={style.signInBtn}>
                  Sign In
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUp
