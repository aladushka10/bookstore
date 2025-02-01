import "./App.css"
import { Route, Routes } from "react-router-dom"
import "./scss/_fonts.scss"
import Layout from "./Pages/Layout/Layout"
import SearchPage from "./Pages/SearchPage/SearchPage"
import NewRelease from "./Pages/NewRelease/NewRelease"
import Bookmarks from "./Pages/Bookmarks/Bookmarks"
import SelectedBook from "./Pages/SelectedBook/SelectedBook"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<NewRelease />} />
          <Route path="/books" element={<NewRelease />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/books/:isbn13" element={<SelectedBook />} />
          <Route path="/:isbn13" element={<SelectedBook />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
