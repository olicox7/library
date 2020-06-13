let myLibrary = [];

render();

const addBookButton = document.querySelector("#addBookButton");
addBookButton.addEventListener("click",addBookToLibrary);

function Book(title,author,pages,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${this.title} by ${this.author}, ${this.pages}, ${read}`;
    }
}

function addBookToLibrary(){
    const title = prompt("What is the book's title?","");
    const author = prompt("Who is the book's author?");
    const pages = parseInt(prompt("How many pages does the book have?"));
    let read = prompt("Have you read the book?");
    read = read.toLowerCase();
    while (read !== "yes" && read !== "no"){
        read = prompt("Have you read this book? Please enter 'Yes' or 'No'");
        read = read.toLowerCase();
    }
    read = capitalise(read);
    const newBook = new Book(title,author,pages,read);
    myLibrary.push(newBook);
    render()
}

function render(){
    const libraryContainer = document.querySelector("#libraryContainer");
    myLibrary.forEach(book => {
        const bookTiles = document.querySelectorAll(".bookTile");
        let titleCheck;
        bookTiles.forEach(div => {
            if(div.getAttribute("id") === book.title){
                titleCheck = true;
            }
        });
        if(titleCheck) return;
        const newTile = document.createElement("div");
        newTile.classList.add("bookTile")
        newTile.setAttribute("id",book.title)
        libraryContainer.appendChild(newTile);
        const newTable = document.createElement("table");
        newTile.appendChild(newTable);
        for (let prop in book){
            if (prop !== "title" && prop !== "author" && prop !== "pages" && prop !== "read") continue;
            const newRow = document.createElement("tr");
            newTable.appendChild(newRow);
            const newHeading = document.createElement("th");
            newHeading.textContent = capitalise(prop);
            if (newHeading.textContent === "Read") newHeading.textContent += "?";
            const newData = document.createElement("td");
            newData.textContent = book[prop];
            newRow.appendChild(newHeading);
            newRow.appendChild(newData);
        }
        
    })
}

function capitalise(str){
    firstLetter = str.slice(0,1);
    capitalised = str.replace(firstLetter,firstLetter.toUpperCase())
    return capitalised
}