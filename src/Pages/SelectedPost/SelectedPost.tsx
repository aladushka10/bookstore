import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import style from "./SelectedPost.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ReactComponent as LeftArrow } from "../../assets/left_arrow.svg"
import { ReactComponent as RightArrow } from "../../assets/right_arrow.svg"
import {
  faThumbsUp,
  faThumbsDown,
  faBookmark,
} from "@fortawesome/free-solid-svg-icons"
import { useDispatch, useSelector } from "react-redux"

import { getPostInfo } from "../../store/selectedPostSlice"
import { toggleFavorite } from "../../store/postSlice"

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
  }
}

interface ISelectedPost {
  selectedPost: {
    post: IPostCard
    previousPost: null
    loading: boolean
    error: string | null
  }
}
const SelectedPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { post, loading, error } = useSelector(
    (state: ISelectedPost) => state.selectedPost
  )
  const { posts } = useSelector((state: IPagination) => state.pagination)
  const previousPost = posts.find((p: any) => p.id === post.id - 1)
  const nextPost = posts.find((p: any) => p.id === post.id + 1)

  useEffect(() => {
    dispatch(getPostInfo({ id }))
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error...</div>
  }

  return (
    <div className={style.postCard}>
      <div className={style.container}>
        <div className={style.homePostWrap}>
          <button className={style.homeBtn} onClick={() => navigate("/")}>
            Home
          </button>
          <div className={style.postId}>
            <p>Post {id}</p>
          </div>
        </div>
        <div className={style.postCardWrap}>
          <h1 className={style.postCardTitle}>{post.title}</h1>
          <div className={style.postCardInf}>
            <div className={style.imgWrap}>
              <img className={style.postCardImg} src={post.image}></img>
            </div>
            <div className={style.postCardText}>{post.text}</div>
            <div className={style.postCardWrapDown}>
              <div className={style.thumbsWrap}>
                <button className={style.thumbsUpWrap}>
                  <FontAwesomeIcon
                    onClick={() => dispatch(incrementLike())}
                    cursor={"pointer"}
                    icon={faThumbsUp}
                    style={{ fontSize: "25px" }}
                  />
                </button>
                <button className={style.thumbsDownWrap}>
                  <FontAwesomeIcon
                    onClick={() => dispatch(incrementDislike())}
                    cursor={"pointer"}
                    icon={faThumbsDown}
                    style={{ fontSize: "25px" }}
                  />
                </button>
              </div>
              <button
                onClick={() => {
                  dispatch(toggleFavorite(post))
                }}
                className={style.favoriteWrap}
              >
                <FontAwesomeIcon
                  icon={faBookmark}
                  style={{ fontSize: "25px" }}
                  cursor={"pointer"}
                />
              </button>
            </div>
          </div>
          <div className={style.numbersWrapper}>
            <div className={style.leftArrowWrap}>
              <button
                className={style.leftArrow}
                onClick={() => navigate(`/${post.id - 1}`)}
                disabled={!previousPost}
              >
                <LeftArrow className={style.leftArrowSvg} />
              </button>
              <div className={style.prevWrap}>
                <button
                  className={style.prevBtn}
                  onClick={() => navigate(`/${post.id - 1}`)}
                  disabled={!previousPost}
                >
                  Prev
                </button>
                <div className={style.prevTitle}>
                  {previousPost ? previousPost.title : "No previous post"}
                </div>
              </div>
            </div>
            <div className={style.rightArrowWrap}>
              <div className={style.nextWrap}>
                <button
                  className={style.nextBtn}
                  onClick={() => navigate(`/${post.id + 1}`)}
                  disabled={!nextPost}
                >
                  Next
                </button>
                <div className={style.nextTitle}>
                  {nextPost ? nextPost.title : "No next post"}
                </div>
              </div>
              <button
                className={style.rightArrow}
                onClick={() => navigate(`/${post.id + 1}`)}
                disabled={!nextPost}
              >
                <RightArrow className={style.rightArrowSvg} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectedPost
