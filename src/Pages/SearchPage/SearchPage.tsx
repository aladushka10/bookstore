import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import style from "./SearchPage.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faThumbsUp,
  faThumbsDown,
  faEllipsisH,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons"
import { ReactComponent as LeftArrow } from "../../assets/left_arrow.svg"
import { ReactComponent as RightArrow } from "../../assets/right_arrow.svg"
import {
  fetchBooks,
  setOrdering,
  setPage,
  setSearchQuery,
} from "../../store/paginationSlice"
import Title from "../../Components/Title/Title"
import { toggleBookmark } from "../../store/bookSlice"

interface IPostCard {
  id: number
  image?: string
  text?: string
  date: string
  title: string
  index: number
  isFavorite: boolean
}

const Search = () => {
  const dispatch = useDispatch()

  const {
    books,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    searchQuery,
    ordering,
  } = useSelector((state) => state.pagination)

  const searchQueryTitle = useSelector(
    (state) => state.pagination.searchQueryTitle
  )

  useEffect(() => {
    dispatch(
      fetchBooks({
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        searchQuery: searchQuery,
        ordering: ordering,
      })
    )
  }, [currentPage, ordering])
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>Error...</div>
  }
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber))
  }
  const handlePrevious = () => {
    if (currentPage > 1) {
      dispatch(setPage(currentPage - 1))
    }
  }
  const handleNext = () => {
    if (currentPage < totalPages) {
      dispatch(setPage(currentPage + 1))
    }
  }

  const renderPageNumber = () => {
    const pageNumber = []
    const maxPageNumber = 10
    const startPage = Math.max(currentPage - Math.floor(maxPageNumber / 2), 1)
    const endPage = Math.min(startPage + maxPageNumber - 1, totalPages)
    for (let i = startPage; i <= endPage; i++) {
      pageNumber.push(
        <button
          className={style.numbers}
          style={{ color: i === currentPage ? "rgba(83, 96, 205, 1)" : "" }}
          key={i}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>
      )
    }
    return pageNumber
  }

  return (
    <div className={style.searchWrap}>
      <div className={style.container}>
        <Title title={`Search results "${searchQueryTitle}"`} />
        <div className={style.postsCardWrap}>
          {books.map(
            ({ id, image, date, text, title, isFavorite }: IPostCard) => (
              <div key={id}>
                <div className={style.postCardWrap}>
                  <div className={style.imgTitleWrap}>
                    <div className={style.imgWrap}>
                      <img className={style.postCardImg} src={image} />
                    </div>
                    <div className={style.dateTitleWrap}>
                      <div className={style.postCardDate}>{date}</div>
                      <div className={style.postCardTitle}>{title}</div>
                    </div>
                  </div>
                  <div className={style.postCardWrapDown}>
                    <div className={style.saveDotsWrap}>
                      <div className={style.saveDots}>
                        <button
                          className={style.faBookmark}
                          onClick={() => {
                            dispatch(
                              toggleBookmark({
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
              </div>
            )
          )}
        </div>
        <div className={style.numbersWrapper}>
          <div className={style.leftArrowWrap}>
            <button
              className={style.leftArrow}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <LeftArrow className={style.leftArrowSvg} />
            </button>
            <button
              className={style.prevWrap}
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </div>
          <div className={style.pageNubmers}>{renderPageNumber()}</div>
          <div className={style.rightArrowWrap}>
            <button
              className={style.nextWrap}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className={style.rightArrow}
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <RightArrow className={style.rightArrowSvg} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
