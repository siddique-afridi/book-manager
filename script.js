

class Books{
    constructor(bookName, author){
        this.bookName = bookName;
        this.author = author;

    }

    render(){
       const div = document.createElement("div");
       div.classList.add("books");
       div.innerHTML =`
       <h3>Book Title: ${this.bookName}</h3>
       <p>Author: ${this.author}</p>`

       return div;
       
    }
}

const b1 = new Books("Javascript Essentials", "John Wick");
const b2 = new Books("react", "kane");
const b3 = new Books("controllers", "fredrick");
const b4 = new Books("rules", "robert");
const b5 = new Books("businees", "fing");
const b6 = new Books("businees", "fing");
// const b7 = new Books("businees", "fing");
// const b8 = new Books("busines", "fing");
// const b9 = new Books("businees", "fing");
// const b10 = new Books("ux", "fing");

const booklist = document.getElementById("book-list");

[b1,b2,b3,b4,b5,b6].forEach(books => {
    booklist.appendChild(books.render());
    
});


// Load books from database on refresh
function loadBooks() {
  fetch("http://localhost:5000/books")
    .then(res => res.json())
    .then(data => {
      data.forEach(b => {
        const book = new Books(b.bookName, b.author);
        booklist.appendChild(book.render());
      });
    })
    .catch(err => console.error("Error loading:", err));
}
loadBooks();


document.getElementById("searchBtn").addEventListener("click", () => {
  const query = document.getElementById("searchBox").value;
  if (!query) return;

  fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`)
    .then(response => response.json())
    .then(data => {
      if (data.items && data.items.length > 0) {
        // ✅ use first result safely
        const first = data.items[0];
        const title = first.volumeInfo.title || "No Title";
        const authors = first.volumeInfo.authors
          ? first.volumeInfo.authors.join(", ")
          : "Unknown Author";

        const newBook = new Books(title, authors);

        // ✅ Save to DB first, then append
        return fetch("http://localhost:5000/books", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bookName: newBook.bookName,
            author: newBook.author,
          }),
        });
      } else {
        console.log("No books found");
      }
    })
    .then(res => (res ? res.json() : null))
    .then(savedBook => {
      if (savedBook) {
        booklist.appendChild(
          new Books(savedBook.bookName, savedBook.author).render()
        );
      }
    })
    .catch(err => console.error("Error:", err));
});
