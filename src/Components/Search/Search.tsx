import { useLocation, useNavigate } from "react-router-dom"
import { ReactComponent as SearchBtn } from "../../assets/search.svg"
import style from "./Search.module.scss"
import { useDispatch, useSelector } from "react-redux"
import {
  fetchBooks,
  setPage,
  // setSearchQuery,
  // setSearchQueryTitle,
} from "../../store/paginationSlice"
import { ReactComponent as Cancel } from "../../assets/cancelIcon.svg"
import { useEffect, useState } from "react"

interface IPagination {
  pagination: {
    itemsPerPage: number
    searchQuery: string
    ordering: string
  }
}

const Search = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname !== "/search") {
      setFormOpen(false)
    }
  }, [location.pathname])

  const { itemsPerPage, searchQuery, ordering } = useSelector(
    (state: IPagination) => state.pagination
  )

  const [form, setFormOpen] = useState(false)
  const handlerSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      fetchBooks({
        limit: itemsPerPage,
        offset: 0,
        searchQuery: searchQuery,
        ordering: ordering,
      })
    )
    dispatch(setPage(1))
    // dispatch(setSearchQueryTitle(searchQuery))
    // dispatch(setSearchQuery(""))
  }
  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    // dispatch(setSearchQuery(value))
  }
  return (
    <div className={style.searchWrap}>
      {form && (
        <form className={style.searchForm} onSubmit={handlerSubmit}>
          <input
            className={style.searchInput}
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handlerInput}
          />
          <Cancel
            onClick={() => setFormOpen(false)}
            className={style.searchCancel}
          />
        </form>
      )}
      <button
        onClick={() => {
          setFormOpen(true)
          navigate("/search")
        }}
        className={style.searchBtn}
      >
        <SearchBtn />
      </button>
    </div>
  )
}
export default Search
