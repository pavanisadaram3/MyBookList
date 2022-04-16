//Book Class:Represents a Book
class Book{
    constructor(title,author,isbn){
        this.title =title;
        this.author=author;
        this.isbn=isbn;
    }
}




//UI Class:Handle UI Task
class UI{
    static displayBook(){
       
        const Books = Store.getBooks;
        Books.forEach((book)=>UI.addBookToList(book));

    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');
        row.innerHTML =`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }


    static deleteBook(el){
        if(el.classList.contains('delete')){
           el.parentElement.parentElement.remove();
        }

    }
    static showAlert(message,className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container =document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);

        //vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(),3000);
    }
    static clearFields(){
        document.querySelector('#title').value ='';
        document.querySelector('#author').value ='';
        document.querySelector('#isbn').value ='';

    }
}


//Store Class:Handle Storage
class store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
    
        const books = store.getBooks();
        books.push(book);
        localStorage.setItem('books',books);

    } 
    static removeBook(isbn){
        const books =store.getBooks();
        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}


//Event:Display Book
document.addEventListener('DOMContentLoaded',UI.displayBook);


//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit',(e)=>{

    //prevent actual submit
    e.preventDefault();
    //Get form Values
    const title = document.querySelector('#title').value ;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //Validate

    if(title === '' || author === '' || isbn === ''){
        UI.showAlert('Please fill in all fileds','success');
    }else{
         //Instatiate Book
    const book = new Book(title,author,isbn);
    //Add Book to UI
    UI.addBookToList(book);
    //add book to store
    store.addBook(book);
    //Show success message
    UI.showAlert('Book Added','success');

    //Clear fileds
    UI.clearFields();

    }


});


//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click',(e)=>{
    //removeBook from UI
    UI.deleteBook(e.target);

    //remove book from store
    store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    //show success message
    UI.showAlert('Book Removed','success');
})