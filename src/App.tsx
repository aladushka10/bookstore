import "./App.css"
import { Route, Routes } from "react-router-dom"
import "./scss/_fonts.scss"
import Layout from "./Pages/Layout/Layout"
import SearchPage from "./Pages/SearchPage/SearchPage"
import NewRelease from "./Pages/NewRelease/NewRelease"
import Bookmarks from "./Pages/Bookmarks/Bookmarks"
import SelectedBook from "./Pages/SelectedBook/SelectedBook"
import CartPage from "./Pages/CartPage/CartPage"
import SignIn from "./Pages/SignIn/SignIn"
import SignUp from "./Pages/SignUp/SignUp"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<NewRelease />} />
          <Route path="/books" element={<NewRelease />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/books/:isbn13" element={<SelectedBook />} />
          <Route path="/:isbn13" element={<SelectedBook />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
