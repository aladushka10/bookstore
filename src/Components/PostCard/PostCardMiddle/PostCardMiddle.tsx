import { useNavigate } from "react-router-dom"
import style from "./PostCardMiddle.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH, faBookmark } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux"
import { toggleFavorite } from "../../../store/bookSlice"

interface IPostCard {
  id: number
  image?: string
  text?: string
  date: string
  title: string
  isFavorite: boolean
}

const PostCardMiddle = ({
  id,
  image,
  text,
  date,
  title,
  isFavorite,
}: IPostCard) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <div className={style.postCardWrapMiddle}>
      <div className={style.postCardWrapUp}>
        <div className={style.postCardWrapLeft}>
          <div className={style.postCardDate}>{date}</div>
          <h2 className={style.postCardTitle}>
            <a
              className={style.postCardTitleLink}
              onClick={() => {
                navigate(`${id}`)
              }}
            >
              {title}
            </a>
          </h2>
        </div>
        <div className={style.postCardWrapRight}>
          <div className={style.imgWrap}>
            <img className={style.postCardImg} src={image} />
          </div>
        </div>
      </div>

      <div className={style.postCardWrapDown}>
        <div className={style.saveDotsWrap}>
          <div className={style.saveDots}>
            <button
              className={style.faBookmark}
              onClick={() => {
                dispatch(
                  toggleFavorite({
                    id,
                    image,
                    text,
                    date,
                    title,
                    isFavorite,
                  })
                )
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ fontSize: "25px" }}
                cursor={"pointer"}
              />
            </button>
            <FontAwesomeIcon
              icon={faEllipsisH}
              style={{ fontSize: "25px" }}
              cursor={"pointer"}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostCardMiddle
