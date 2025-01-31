import Title from "../../Components/Title/Title"
import style from "../Home/Home.module.scss"
// import TabContent from "../../Components/Tabs/TabContent/TabContent"
// import Tabs from "../../Components/Tabs/Tabs"

const Home = () => {
  return (
    <div className={style.blog}>
      <div className={style.container}>
        <Title title={"Blog"} />
        {/* <Tabs /> */}
      </div>
    </div>
  )
}
export default Home
