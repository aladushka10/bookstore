import style from "./Bookmarks.module.scss"
import BookCard from "../../Components/BookCard/BookCard"
import Title from "../../Components/Title/Title"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { fetchBooks, setPage } from "../../store/paginationSlice"
import { ReactComponent as LeftArrow } from "../../assets/left_arrow.svg"
import { ReactComponent as RightArrow } from "../../assets/right_arrow.svg"

const Bookmarks = () => {
  const dispatch = useDispatch()

  const { bookmarks } = useSelector((state: any) => state.books)

  const { loading, error, currentPage, itemsPerPage } = useSelector(
    (state: IPagination) => state.pagination
  )

  useEffect(() => {
    dispatch(fetchBooks())
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error...</div>
  }

  const totalItems = bookmarks.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const paginatedBooks = bookmarks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber))
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
    <div className={style.bookstore}>
      <div className={style.container}>
        <Title title={"Bookmarks"} />
        <div className={style.booksWrap}>
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map(
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
            )
          ) : (
            <div>No bookmarks yet!</div>
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
export default Bookmarks
