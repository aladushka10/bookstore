import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCartShopping, faBookmark } from "@fortawesome/free-solid-svg-icons"
import style from "./BookCard.module.scss"
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toggleBookmark } from "../../store/bookSlice"

const BookCard = ({
  title,
  subtitle,
  isbn13,
  price,
  image,
  url,
}: IBookCard) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const bookmarks = useSelector((state: any) => state.books.bookmarks)
  const isBookmarked = bookmarks.some(
    (book: IBookCard) => book.isbn13 === isbn13
  )

  return (
    <div className={style.bookCardWrap}>
      <div className={style.bookCardWrapUp}>
        <div className={style.imgWrap}>
          <img
            onClick={() => {
              navigate(`/${isbn13}`)
            }}
            className={style.bookCardImg}
            src={image}
          />
        </div>

        <div className={style.bookCardPrice}>{price}</div>
        <h2 className={style.bookCardTitle}>
          <div
            onClick={() => {
              navigate(`/${isbn13}`)
            }}
            className={style.bookCardTitleLink}
          >
            {title}
          </div>
        </h2>
      </div>

      <div className={style.saveDotsWrap}>
        <div className={style.interactivePart}>
          <button
            className={style.faBookmark}
            onClick={() => {
              dispatch(
                toggleBookmark({
                  title,
                  subtitle,
                  isbn13,
                  price,
                  image,
                  url,
                })
              )
            }}
          >
            <FontAwesomeIcon
              icon={faBookmark}
              style={{
                fontSize: "25px",
                color: isBookmarked ? "9c66c1" : "black",
              }}
              cursor={"pointer"}
            />
          </button>
          <button className={style.faCartShopping}>
            <FontAwesomeIcon
              icon={faCartShopping}
              style={{ fontSize: "25px" }}
              cursor={"pointer"}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default BookCard
