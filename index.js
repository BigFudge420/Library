document.addEventListener('DOMContentLoaded', function () {

    const LibraryIndex = document.querySelector('.library')
    const Form = document.querySelector('.book-form')
    const Overlay = document.getElementById('overlay')
    const newBookBtn = document.querySelector('.new-book-btn')
    const closePopupBtn = document.getElementById('close')
    const formElement = document.querySelector('form')
    const submitBtn = document.querySelector('.submit-btn')
    let haveRead;
    
    class book{
        constructor(
            titleOfTheBook = "Unknown",
            authorName = "Unknown",
            numberOfPages = 0,
            readStatus = "Not read",
            readBoolean = false,
            bookIndex
        ){
            this.titleOfTheBook = titleOfTheBook
            this.authorName = authorName 
            this.numberOfPages = numberOfPages
            this.readStatus = readStatus
            this.readBoolean = readBoolean
            this.bookIndex = bookIndex
        }
    }
    
    
    
    class Library{
        constructor(){
            this.books = []
        }
    
        isInLibrary(newBook){
            return this.books.some((book) => book.titleOfTheBook === newBook.title)
        }
    
        addBook(newBook){
            if(!this.isInLibrary(newBook)){
                this.books.push(newBook)
            }
        }
    
        removeBookFromArray(title){
            this.books = this.books.filter((book) => book.titleOfTheBook !== title)
        }
    
        getBook(title){
            return this.books.find((book) => book.titleOfTheBook === title)
        }
    
    }
    
    const myLibrary = new Library
    
    function displayBook(){
        const ItemDivs = document.querySelectorAll('.items')
        ItemDivs.forEach((ItemDiv) => {
            LibraryIndex.removeChild(ItemDiv)
        })
    
        let index = 0
    
        myLibrary.books.forEach((book) => {
            let Title = book.titleOfTheBook
            let Author = book.authorName
            let Pages = book.numberOfPages
            let Status = book.readStatus
            
            const Item = document.createElement('div')
            Item.classList.add('items')
            LibraryIndex.appendChild(Item)
    
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
            let currentBook = myLibrary.books[indexNum]
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
        const book = myLibrary.books[index];
        book.readBoolean = !(book.readBoolean);
        let statusBtn = cardElement.querySelector('.status') 
        statusBtn.textContent = book.readBoolean ? 'Read' : 'Not read';
        statusBtn.classList.add(`${book.readBoolean}`)
        book.readStatus = book.readBoolean ? 'Read' : 'Not read';
        if (statusBtn.classList.contains(`${!book.readBoolean}`)){
            statusBtn.classList.remove(`${!book.readBoolean}`)
        }
    }  
    
    function removeBook(target){
        const bookToRemoveIndex =  target.getAttribute('data-index')
        const bookToRemove = myLibrary.books[bookToRemoveIndex]
        myLibrary.removeBookFromArray(bookToRemove.titleOfTheBook)
        const Cards = document.querySelectorAll('.card')
        Cards.forEach((card) => {
            let currentBookIndex = card.getAttribute('data-number')
            if (currentBookIndex === bookToRemoveIndex){
                let parentItem = card.parentNode
                LibraryIndex.removeChild(parentItem)
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
        let index = 0;
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
        
        const theBook = new book(titleValue, authorValue, pagesValue, statusValue, haveRead, index)
        myLibrary.addBook(theBook)
        displayBook()
        index++
    })
    
    submitBtn.addEventListener('click', () => {
        Form.classList.remove('active')
        Overlay.classList.remove('active')
    })
    
    showPopups()
    removePopups()
})

