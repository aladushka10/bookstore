import { useEffect } from "react"
import style from "./CartPage.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { fetchBooks, setPage } from "../../store/paginationSlice"
import Title from "../../Components/Title/Title"
import BookCard from "../../Components/BookCard/BookCard"
import Pagination from "../../Components/Pagination/Pagination"
import { IBook, IBookCard, IPagination } from "../../types/types"

const CartPage = () => {
  const dispatch = useDispatch()

  const { cart } = useSelector((state: IBook) => state.books)

  const { loading, error, currentPage, itemsPerPage } = useSelector(
    (state: IPagination) => state.pagination
  )

  useEffect(() => {
    dispatch(fetchBooks())
  }, [currentPage])

  if (loading) {
    return <div>loading...</div>
  }
  if (error) {
    return <div>Error...</div>
  }

  const totalItems = cart.length

  const paginatedBooks = cart.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (pageNumber: number) => {
    dispatch(setPage(pageNumber))
  }

  return (
    <div className={style.cartWrap}>
      <div className={style.container}>
        <Title title={`My cart`} />
        <div className={style.booksCardWrap}>
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
            <div>No books in cart yet!</div>
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

export default CartPage
