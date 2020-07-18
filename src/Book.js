import React from 'react'

class Book extends React.Component {
  state = {
    shelf: this.props.book.shelf
  };

  handleMove = event => {
    const { book, onMove } = this.props;
    const shelf = event.target.value;

    onMove(book, shelf);
  };

  render() {
    const { book } = this.props;

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks.thumbnail})` }}
          ></div>
          <div className="book-shelf-changer">
            <select value={this.state.shelf} onChange={this.handleMove}>
              <option value="move" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors[0]}</div>
      </div>
    )
  }
}

export default Book