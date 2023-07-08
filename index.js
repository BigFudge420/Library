let myLibrary = []

function Book(titleOfTheBook, authorName, numberOfPages, readStatus){
    this.titleOfTheBook = titleOfTheBook
    this.authorName = authorName 
    this.numberOfPages = numberOfPages
    this.readStatus = readStatus
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

const Library = document.querySelector('.library')
function displayBook(){
    
    const Cards = document.querySelectorAll('.card')
    Cards.forEach((Card) => {
        Library.removeChild(Card)
    })

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
    resetForm()
}

const Form = document.querySelector('.book-form')
const Overlay = document.getElementById('overlay')
const newBookBtn = document.querySelector('.new-book-btn')
const closePopupBtn = document.getElementById('close')

function showPopups(){
    newBookBtn.addEventListener('click', () => {
        Form.classList.add('active')
        Overlay.classList.add('active')
    })
}

function removePopups(){
    closePopupBtn.addEventListener('click', () => {
        Form.classList.remove('active')
        Overlay.classList.remove('active')
    })
}

showPopups()
removePopups()

const formElement = document.querySelector('form')


formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    
    const titleInput = document.querySelector('.title-input')
    const titleValue = titleInput.value  
    const authorInput = document.querySelector('.author-input')  
    const authorValue = authorInput.value
    const pagesInput = document.querySelector('.pages-input')
    const pagesValue = pagesInput.value  
    const checkbox = document.getElementById('status')
    let statusValue;

    if (checkbox.checked){
        statusValue = 'Read'
    }
    else {
        statusValue = 'Not read'
    }

    const book = new Book(titleValue,authorValue,pagesValue,statusValue)
    addBookToLibrary(book)
    displayBook()
})

const submitBtn = document.querySelector('.submit-btn')

function resetForm(){
    document.querySelector('form').reset()
}

submitBtn.addEventListener('click', () => {
    Form.classList.remove('active')
    Overlay.classList.remove('active')
})
