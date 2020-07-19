import React from 'react'

const Book = (props) => {
  const { book, onMove } = props;

  const handleMove = event => {
    const shelf = event.target.value;

    onMove(book, shelf);
  };

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
        ></div>
        <div className="book-shelf-changer">
          <select value={props.book.shelf} onChange={handleMove}>
            <option value="move" disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors.join(', ')}</div>
    </div>
  )
};

export default Book