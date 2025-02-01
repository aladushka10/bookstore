import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
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
import { searchBooks, setPage, setSearchQuery } from "../../store/searchSlice"
import Title from "../../Components/Title/Title"
import { toggleBookmark } from "../../store/bookSlice"
import BookCard from "../../Components/BookCard/BookCard"

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

  // const { books } = useSelector((state) => state.books)

  const {
    books,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    searchQuery,
  } = useSelector((state) => state.search)
  console.log(books)
  const searchQueryTitle = useSelector((state) => state.search.searchQueryTitle)

  useEffect(() => {
    dispatch(
      searchBooks({
        query: searchQuery,
        page: currentPage,
      })
    )
  }, [currentPage])
  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>Error...</div>
  }

  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber))
  }

  const renderPageNumber = () => {
    const pageNumber = []
    const maxPageNumber = 5 // Максимальное количество отображаемых страниц
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
          {paginatedBooks.map(
            ({ title, subtitle, isbn13, price, image, url }: IBookCard) => {
              return (
                <div key={isbn13} className={style.bookWrap}>
                  <BookCard
                    title={title}
                    subtitle={subtitle}
                    isbn13={isbn13}
                    price={price}
                    image={image}
                    url={url}
                  />
                </div>
              )
            }
          )}
        </div>
        <div className={style.numbersWrapper}>
          <div className={style.leftArrowWrap}>
            <button
              className={style.leftArrow}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <LeftArrow className={style.leftArrowSvg} />
            </button>
            <button
              className={style.prevWrap}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Prev
            </button>
          </div>
          <div className={style.pageNubmers}>{renderPageNumber()}</div>
          <div className={style.rightArrowWrap}>
            <button
              className={style.nextWrap}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button
              className={style.rightArrow}
              onClick={() => handlePageChange(currentPage + 1)}
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
