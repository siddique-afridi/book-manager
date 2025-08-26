
const books = document.getElementById("books");

const newBookDiv = document.getElementById("new-books");//parent

const addInput = document.getElementById("add");

const addBtn = document.getElementById("add-btn");

function addBook(){

    const title = addInput.value.trim();
    
    if(title===""){
        alert("Please enter book title");
        return;
    }
    
    const newbooks = document.createElement("div");
    newbooks.classList.add("new-books");
    newbooks.innerHTML = `
     
        <h3>Book Title: ${title}</h3>
        <p>Author: </p>
    `
    ;
    newBookDiv.appendChild(newbooks);
addInput.value = "";

}


// addInput;


books.append(booklist, newBookDiv);

