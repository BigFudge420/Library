let myLibrary = []

function Book(titleOfTheBook, authorName, numberOfPages, readStatus){
    this.titleOfTheBook = titleOfTheBook
    this.authorName = authorName 
    this.numberOfPages = numberOfPages
    this.readStatus = readStatus
}

const book1 = new Book("kjsndkjsn", "ksndkjns", 655, "jknsdkjn")
const book2 = new Book('skjsdn', 'jsndkjs', 343, 'skdnsn')

function addBookToLibrary(book){
    myLibrary.push(book)
}


