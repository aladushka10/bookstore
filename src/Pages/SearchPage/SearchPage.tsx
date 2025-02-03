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
import Pagination from "../../Components/Pagination/Pagination"
import { IBookCard, IPagination, ISearch } from "../../types/types"

const SearchPage = () => {
  const dispatch = useDispatch()

  const {
    books,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    searchQuery,
  } = useSelector((state: IPagination) => state.search)

  const searchQueryTitle = useSelector(
    (state: ISearch) => state.search.searchQueryTitle
  )

  useEffect(() => {
    dispatch(
      searchBooks({
        query: searchQuery,
      })
    )
  }, [])

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>Error...</div>
  }

  const paginatedBooks = books.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )
  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber))
  }

  return (
    <div className={style.searchWrap}>
      <div className={style.container}>
        <Title title={`Search results "${searchQueryTitle}"`} />
        <div className={style.booksCardWrap}>
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
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export default SearchPage
