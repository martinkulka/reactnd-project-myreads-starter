import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookCase from "./BookCase";
import Search from "./Search";
import { Route, Link } from 'react-router-dom'

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
        <Route exact path="/" render={() => (
          <div>
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <BookCase books={this.state.allBooks} onMove={this.handleMove} />
              <div className="open-search">
                <Link to="/search" />
              </div>
            </div>
          </div>
        )} />
        <Route path="/search" render={() => (
          <Search books={this.state.allBooks} onMove={this.handleMove} />
        )} />
      </div>
    )
  }
}

export default BooksApp
