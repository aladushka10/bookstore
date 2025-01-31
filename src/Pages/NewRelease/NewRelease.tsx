import { useNavigate } from "react-router-dom"
import PostCard from "../../Components/PostCard/PostCard"
import Title from "../../Components/Title/Title"
import style from "./NewRelease.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEllipsisH, faBookmark } from "@fortawesome/free-solid-svg-icons"
import {
    fetchBooks,
    setOrdering,
    setPage,
    setSearchQuery,
  } from "../../store/paginationSlice"
import { useEffect } from "react"

  
interface IPostCard {
  title: string,
  subtitle: string,
  isbn13: string,
  price: string,
  image: string,
  url: string
  }

  interface IPagination {
    pagination: {
      books: IPostCard[]
      totalItems: number
      currentPage: number
      itemsPerPage: number
      searchQueryTitle: string
      searchQuery: string
      ordering: string
      loading: boolean
      error: string | null
    }
  }
  


const NewRelease = ({
    title,
    subtitle,
    isbn13,
    price,
    image,
    url,
  }: IPostCard) => {
    const navigate = useNavigate()
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
      } = useSelector((state: IPagination) => state.pagination)

      useEffect(() => {
        dispatch(
            fetchBooks()
        )
      }, [])
    //   if (loading) {
    //     return <div>Loading...</div>
    //   }
    //   if (error) {
    //     return <div>Error...</div>
    //   }
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
    console.log(books)

  return (
    <div className={style.blog}>
      <div className={style.container}>
        <Title title={"New Release"} />
        {books.map(
          (
            { title,
                subtitle,
                isbn13,
                price,
                image,
                url, }: IPostCard
         
          ) => {
              return <div key={isbn13} className={style.postCardWrap}>
        <div className={style.postCardWrapMiddle}>
      <div className={style.postCardWrapUp}>
        <div className={style.postCardWrapLeft}>
          <div className={style.postCardDate}>{price}</div> 
          <h2 className={style.postCardTitle}>
            <a
              className={style.postCardTitleLink}
              onClick={() => {
                navigate(`${isbn13}`)
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
            {/* <button
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
            > */}
              <FontAwesomeIcon
                icon={faBookmark}
                style={{ fontSize: "25px" }}
                cursor={"pointer"}
              />
            {/* </button> */}
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
})}
      </div>
      </div>
   
  )
}
export default NewRelease
