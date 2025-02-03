import { ChangeEvent, ReactNode } from "react"

export interface IActiveContext {
  isActive: boolean
  SetIsActive: React.Dispatch<React.SetStateAction<boolean>>
}
export interface IThemeContext {
  theme: string
  toggleTheme: () => void
}

export interface IBookCard {
  title: string
  subtitle: string
  isbn13: string
  price: string
  image: string
  url: string
}

export interface IPagination {
  search: ISearch
  pagination: {
    books: IBookCard[]
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
export interface ISelectedBook extends IBookCard {
  error: string
  authors: string
  publisher: string
  pages: string
  year: string
  rating: string
  desc: string
}

export interface ISelectedPage {
  selectedBook: {
    book: ISelectedBook
    previousBook: null
    loading: boolean
    error: string | null
  }
}

export interface IPaginationComponent {
  currentPage: number
  itemsPerPage: number
  totalItems: number
  onPageChange: (pageNumber: number) => void
}

export interface ISignIn {
  signIn: {
    user: string
    auth: boolean
    username: string
  }
}
export interface ISignUp {
  signUp: {
    registrationData: {
      username: string
      email: string
      password: string
      passwordConfirm: string
    }
  }
}
export interface IPerson {
  username: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IActive {
  active: {
    isActive: boolean
  }
}

export interface ITitle {
  title?: string
  children?: ReactNode
}
export interface IInput {
  title: string
  name: string
  type: "text" | "password" | "email"
  placeholder?: string
  value?: string | number | readonly string[] | undefined
  inputEvent?: (inputEvent: ChangeEvent<HTMLInputElement>) => void
}

export interface IBook {
  books: {
    books: IBookCard[]
    loading: false
    error: null
    selectedBook: null
    bookmarks: IBookCard[]
    cart: IBookCard[]
  }
}

export interface ISearch {
  search: {
    books: IBookCard[]
    totalItems: number
    currentPage: number
    itemsPerPage: number
    searchQueryTitle: string
    searchQuery: string
    loading: boolean
    error: string | null
  }
}
