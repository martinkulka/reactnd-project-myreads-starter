import React from 'react'
import BookShelf from "./BookShelf";

const BookCase = (props) => {
  const {books, onMove} = props;

  return (
    <div className="list-books-content">
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <BookShelf books={books} onMove={onMove} shelf={'currentlyReading'} />
      </div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Want to Read</h2>
        <BookShelf books={books} onMove={onMove} shelf={'wantToRead'} />
      </div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <BookShelf books={books} onMove={onMove} shelf={'read'} />
      </div>
    </div>
  )
};

export default BookCase