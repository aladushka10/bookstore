import { useState } from "react"
import reactLogo from "./assets/react.svg"
import viteLogo from "/vite.svg"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import "./scss/_fonts.scss"
import Layout from "./Pages/Layout/Layout"
import Home from "./Pages/Home/Home"
import SearchPage from "./Pages/SearchPage/SearchPage"
import SelectedPost from "./Pages/SelectedPost/SelectedPost"
import NewRelease from "./Pages/NewRelease/NewRelease"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/new_release" element={<NewRelease />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/posts/:id" element={<SelectedPost />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
