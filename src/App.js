import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from "./BookShelf";

class BooksApp extends React.Component {
  state = {
    allBooks: []
  };

  componentDidMount() {
    BooksAPI.getAll()
      .then(books => {
        this.setState(() => ({
          allBooks: books
        }))
      })
  }

  handleMove = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        if (shelf === 'none') {
          this.setState((oldState) => ({
            allBooks: oldState.allBooks.filter((b) => b.id !== book.id)
          }))
        } else {
          const updatedBook = book;
          updatedBook.shelf = shelf;

          this.setState((oldState) => ({
            allBooks: oldState.allBooks.filter((b) => b.id !== book.id).concat(updatedBook)
          }))
        }
      })
  };

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <BookShelf books={this.state.allBooks} onMove={this.handleMove} shelf={'currentlyReading'} />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <BookShelf books={this.state.allBooks} onMove={this.handleMove} shelf={'wantToRead'} />
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <BookShelf books={this.state.allBooks} onMove={this.handleMove} shelf={'read'} />
            </div>
          </div>
          <div className="open-search">
            <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
          </div>
        </div>
      </div>
    )
  }
}

export default BooksApp
