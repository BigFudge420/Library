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

addBookToLibrary(book2)
addBookToLibrary(book1)
console.log(myLibrary)

const Library = document.querySelector('.library')
function displayBook(){
    myLibrary.forEach((book) => {
        let Title = book.titleOfTheBook
        let Author = book.authorName
        let Pages = book.numberOfPages
        let Status = book.readStatus
        
        const cardElement = document.createElement('div')
        cardElement.classList.add('card')
        Library.appendChild(cardElement)

        const titleElement = document.createElement('p')
        titleElement.classList.add('card-item')
        titleElement.classList.add('title')
        titleElement.textContent = Title
        cardElement.appendChild(titleElement)

        const authorElement = document.createElement('p')
        authorElement.classList.add('card-item')
        authorElement.classList.add('author')
        authorElement.textContent = Author
        cardElement.appendChild(authorElement)

        const pagesElement = document.createElement('p')
        pagesElement.classList.add('card-item')
        pagesElement.classList.add('pages')
        pagesElement.textContent = Pages
        cardElement.appendChild(pagesElement)

        const statusElement = document.createElement('p')
        statusElement.classList.add('card-item')
        statusElement.classList.add('status')
        statusElement.textContent = Status
        cardElement.appendChild(statusElement)
    })
}


