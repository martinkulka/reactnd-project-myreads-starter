import React from 'react'
import Book from "./Book"

const BookShelf = (props) => {
  return (
    <div className="bookshelf-books">
      <ol className="books-grid">
        {props.books.filter((book) => (book.shelf === props.shelf))
          .map((book) => (
            <li key={book.id}>
              <Book book={book} onMove={props.onMove}/>
            </li>
          ))
        }
      </ol>
    </div>
  )
};

export default BookShelf