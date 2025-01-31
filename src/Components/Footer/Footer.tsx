import style from "./Footer.module.scss"

const Footer = () => {
  return (
    <div className={style.footerWrap}>
      <div className={style.сontainer}>
        <div className={style.contentWrap}>
          <div className={style.blogfolio}>@2024 Bookstore</div>
          <div className={style.footerText}>Diplom project</div>
        </div>
      </div>
    </div>
  )
}

export default Footer
