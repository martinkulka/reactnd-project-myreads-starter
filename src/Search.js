import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Link } from "react-router-dom";
import Book from "./Book";

class Search extends React.Component {
  state = {
    query: '',
    search: []
  };

  handleQuery = (event) => {
    event.preventDefault();
    const { value } = event.target;

    if (value === '' || value === null) {
      this.setState(() => ({
        query: value,
        search: []
      }))
    } else {
      this.setState(() => ({
        query: value
      }));

      this.handleSearch(value)
    }
  };

  handleSearch = (query) => {
    BooksAPI.search(query)
      .then((data) => {
        if (data.error !== 'empty query') {
          const filteredBooks = data.filter((book) => (
            book.hasOwnProperty("imageLinks") &&
            book.imageLinks.hasOwnProperty('thumbnail') &&
            book.hasOwnProperty("title") &&
            book.hasOwnProperty('authors')
          ));

          if (filteredBooks.length !== 0) {
            this.setState(() => ({
              search: filteredBooks
            }))
          } else {
            this.setState(() => ({
              search: []
            }))
          }
        } else {
          this.setState(() => ({
            search: []
          }))
        }
      });
  };

  handleShelves = (allBooks) => {
    const { searched } = this.state;
    searched.map((book) => book.shelf="none");

    const shelvedBooks = allBooks.forEach((book) => {
      searched.map((b) => {
        if (b.id === book.id) {
          b.shelf = book.shelf;
        }
      })
    });

    this.setState(() => ({
      search: shelvedBooks
    }))
  };

  render() {
    const { query, search } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/"/>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleQuery}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {search && search.length !== 0 && search.map((book) => (
              <li key={book.id}>
                <Book book={book} onMove={this.props.onMove}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search