import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import style from "../PostCard/PostCard.module.scss"
import { useDispatch, useSelector } from "react-redux"
import PostCardSmall from "./PostCardSmall/PostCardSmall"
import PostCardMiddle from "./PostCardMiddle/PostCardMiddle"
import PostCardBig from "./PostCardBig/PostCardBig"
import { ReactComponent as LeftArrow } from "../../assets/left_arrow.svg"
import { ReactComponent as RightArrow } from "../../assets/right_arrow.svg"
import {
  fetchPosts,
  setOrdering,
  setPage,
  setSearchQuery,
} from "../../store/paginationSlice"

interface IPostCard {
  id: number
  image?: string
  text?: string
  date: string
  title: string
  isFavorite: boolean
}
interface IPagination {
  pagination: {
    posts: IPostCard[]
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

const PostCard = () => {
  const dispatch = useDispatch()
  const {
    posts,
    loading,
    error,
    currentPage,
    itemsPerPage,
    totalItems,
    searchQuery,
    ordering,
  } = useSelector((state: IPagination) => state.pagination)

  const navigate = useNavigate()
  useEffect(() => {
    dispatch(
      fetchPosts({
        limit: itemsPerPage,
        offset: (currentPage - 1) * itemsPerPage,
        searchQuery: searchQuery,
        ordering: ordering,
      })
    )
  }, [currentPage, ordering])
  if (loading) {
    return <div>Loading...</div>
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
    <>
      <div className={style.postsCardWrap}>
        {posts.map(
          (
            { id, image, date, text, title, isFavorite }: IPostCard,
            index: number
          ) => {
            if (index === 0) {
              return (
                <div key={id} className={style.postCardWrap}>
                  <div className={style.postCardWrapMainandLittle}>
                    <PostCardBig
                      id={id}
                      image={image}
                      date={date}
                      title={title}
                      text={text}
                      isFavorite={isFavorite}
                    />
                    <div className={style.postCardWrapLittles}>
                      {posts
                        .slice(1, 3)
                        .map(
                          ({
                            id,
                            image,
                            date,
                            text,
                            title,
                            isFavorite,
                          }: IPostCard) => (
                            <PostCardSmall
                              key={id}
                              id={id}
                              image={image}
                              date={date}
                              title={title}
                              text={text}
                              isFavorite={isFavorite}
                            />
                          )
                        )}
                    </div>
                  </div>
                </div>
              )
            }

            if (index >= 1 && index % 4 === 1) {
              return (
                <div key={id} className={style.postCardWrap}>
                  <div className={style.postCardWrapMiddleandLittle}>
                    <div className={style.postCardWrapMiddles}>
                      {posts
                        .slice(index, index + 2)
                        .map(
                          ({
                            id,
                            image,
                            date,
                            text,
                            title,
                            isFavorite,
                          }: IPostCard) => (
                            <PostCardMiddle
                              key={id}
                              id={id}
                              image={image}
                              date={date}
                              title={title}
                              text={text}
                              isFavorite={isFavorite}
                            />
                          )
                        )}
                    </div>
                    <div className={style.postCardWrapLittles}>
                      {posts
                        .slice(index + 2, index + 4)
                        .map(
                          ({
                            id,
                            image,
                            date,
                            text,
                            title,
                            isFavorite,
                          }: IPostCard) => (
                            <PostCardSmall
                              key={id}
                              id={id}
                              image={image}
                              date={date}
                              title={title}
                              text={text}
                              isFavorite={isFavorite}
                            />
                          )
                        )}
                    </div>
                  </div>
                </div>
              )
            }
          }
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
    </>
  )
}

export default PostCard
