interface IBookCard {
  title: string
  subtitle: string
  isbn13: string
  price: string
  image: string
  url: string
}

interface IPagination {
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
interface ISelectedBook extends IBookCard {
  error: string
  authors: string
  publisher: string
  pages: string
  year: string
  rating: string
  desc: string
}

interface ISelectedPage {
  selectedBook: {
    book: ISelectedBook
    previousBook: null
    loading: boolean
    error: string | null
  }
}
