const Library = document.querySelector('.library')
const Form = document.querySelector('.book-form')
const Overlay = document.getElementById('overlay')
const newBookBtn = document.querySelector('.new-book-btn')
const closePopupBtn = document.getElementById('close')
const formElement = document.querySelector('form')
const submitBtn = document.querySelector('.submit-btn')
let myLibrary = []
let haveRead;

function Book(titleOfTheBook, authorName, numberOfPages, readStatus, readBoolean){
    this.titleOfTheBook = titleOfTheBook
    this.authorName = authorName 
    this.numberOfPages = numberOfPages
    this.readStatus = readStatus
    this.readBoolean = readBoolean
}

function addBookToLibrary(book){
    myLibrary.push(book)
}

function displayBook(){
    const ItemDivs = document.querySelectorAll('.items')
    ItemDivs.forEach((ItemDiv) => {
        Library.removeChild(ItemDiv)
    })

    let index = 0

    myLibrary.forEach((book) => {
        let Title = book.titleOfTheBook
        let Author = book.authorName
        let Pages = book.numberOfPages
        let Status = book.readStatus
        
        const Item = document.createElement('div')
        Item.classList.add('items')
        Library.appendChild(Item)

        const cardElement = document.createElement('div')
        cardElement.classList.add('card')
        cardElement.setAttribute('data-number', index)
        Item.appendChild(cardElement)

        const titleElement = document.createElement('p')
        titleElement.classList.add('card-item')
        titleElement.classList.add('title')
        titleElement.textContent = Title
        cardElement.appendChild(titleElement)

        const authorElement = document.createElement('p')
        authorElement.classList.add('card-item')
        authorElement.classList.add('author')
        authorElement.textContent = `by ${Author}`
        cardElement.appendChild(authorElement)

        const pagesElement = document.createElement('p')
        pagesElement.classList.add('card-item')
        pagesElement.classList.add('pages')
        pagesElement.textContent = Pages
        cardElement.appendChild(pagesElement)

        const statusElement = document.createElement('button')
        statusElement.classList.add('card-item')
        statusElement.classList.add('status')
        statusElement.textContent = Status
        statusElement.addEventListener('click', () => {
            toggleReadStatus(cardElement);
        });      
        cardElement.appendChild(statusElement)
        statusElement.textContent = book.readBoolean ? 'Read' : 'Not read';
        let currentCard = statusElement.parentNode
        let indexNum = currentCard.getAttribute('data-number')
        let currentBook = myLibrary[indexNum]
        let className = currentBook.readBoolean
        if (className){
            statusElement.classList.add(true)
            if (statusElement.classList.contains(false)){
                statusElement.classList.remove(false)
            }
        }
        else if (!className){
            statusElement.classList.add(false)
            if (statusElement.classList.contains(true)){
                statusElement.classList.remove(true)
            }
        }
        console.log(currentBook)
        console.log(indexNum)
        console.log(className)
        console.log(myLibrary)
        

        const removeBtn = document.createElement('button')
        removeBtn.classList.add('remove')
        removeBtn.setAttribute('data-index', index)
        removeBtn.textContent = "Remove book"
        Item.appendChild(removeBtn)
        removeBtn.addEventListener('click', (event) => {
            const button = event.target 
            removeBook(button)          
        })

        index++
    })
    resetForm()
}

function toggleReadStatus(cardElement) {
    const index = cardElement.getAttribute('data-number');
    const book = myLibrary[index];
    book.readBoolean = !(book.readBoolean);
    let statusBtn = cardElement.querySelector('.status') 
    statusBtn.textContent = book.readBoolean ? 'Read' : 'Not read';
    statusBtn.classList.add(`${book.readBoolean}`)
    if (statusBtn.classList.contains(`${!book.readBoolean}`)){
        statusBtn.classList.remove(`${!book.readBoolean}`)
    }
}  

function removeBook(target){
    const bookToRemove =  target.getAttribute('data-index')
    myLibrary.splice(bookToRemove, 1)
    const Cards = document.querySelectorAll('.card')
    Cards.forEach((card) => {
        let currentBook = card.getAttribute('data-number')
        if (currentBook === bookToRemove){
            let parentItem = card.parentNode
            Library.removeChild(parentItem)
        }
    })
    displayBook()
}

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

function resetForm(){
    document.querySelector('form').reset()
}

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
    let haveRead;

    if (checkbox.checked){
        statusValue = 'Read'
        haveRead = true;
    }
    else {
        statusValue = 'Not read'
        haveRead = false;
    }
    
    const book = new Book(titleValue,authorValue,pagesValue,statusValue, haveRead)
    addBookToLibrary(book)
    displayBook()
})

submitBtn.addEventListener('click', () => {
    Form.classList.remove('active')
    Overlay.classList.remove('active')
})

showPopups()
removePopups()
