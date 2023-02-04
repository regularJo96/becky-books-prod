import React, { useState, useEffect} from "react";
import "../shared/assets/style.css"

function InfoBar(){
  var defaultTab = "btn bg-color-1 text-center pointer";
  var activeTab = "btn btn-clicked bg-color-1 text-center pointer";

  const setActive = (e) => {

    document.getElementById("to-read").className = defaultTab;
    document.getElementById("am-reading").className = defaultTab;
    document.getElementById("have-read").className = defaultTab;

    e.target.className = activeTab;
  }

  return (
    <>
        <div id="menu" className="menu bg-dark-blue">
          
          <div className="name text-green">
            <h2>
              Becky Books
            </h2>
          </div>

          <div className="shelf-buttons">
            <div id="to-read" className={activeTab} onClick={setActive}>To Read</div>
            <div id="am-reading" className={defaultTab} onClick={setActive}>Am Reading</div>
            <div id="have-read" className={defaultTab} onClick={setActive}>Have Read</div>
          </div>

        </div>
    </>
  );
}

function Shelf(){

  const [books, setBooks] = useState()
  const [searchStr, setSearchStr] = useState()

  function findBooks(str){
    fetch(`https://openlibrary.org/search.json?q=${str}&limit=20`)
      .then(response => response.json())
      .then(json => setBooks(json))
  }

  console.log(books)

  if(books == null){
    return(
      <>
          <div className="search-bar">
            <form>
              <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
            </form>
            <div className="btn-sm bg-color-1 text-center pointer" onClick={(() => findBooks(searchStr))}>Retrieve Books</div>
          </div>
        <div>
            no books
        </div>
      </>
    );
  } else {
    return(
      <>
          <div className="search-bar">
            <form>
              <input type="text" value={searchStr} onChange={e => setSearchStr(e.target.value)}/>
            </form>
            <div className="btn-sm bg-color-1 text-center pointer" onClick={(() => findBooks(searchStr))}>Retrieve Books</div>
          </div>
          <div className="shelf">
            {
              (books.docs).map(function(book){
                return <Book book={book}/>
              })
            }
          </div>
        
      </>
    );
  }
}

function Book(props){

  const [book, setBook] = useState([])

  useEffect (() => {
    fetch('https://openlibrary.org'+props.book.key+".json")
    .then(response => response.json())
    .then(json => setBook(json))
  }, [])

  let title = "";
  let isbn = "";
  let author = "";
  let cover_id = "";
  let description = ""

  if(book.description == undefined){
    description = "No Description Found"
  } else if (book.description.value == undefined){
    description = book.description
  } else {
    description = book.description.value
  }

  if(props.book.cover_i != undefined){
    cover_id = props.book.cover_i
  } else{
    cover_id = "No Cover Found"
  }

  if(props.book.isbn != undefined){
    isbn = props.book.isbn[0]
  } else{
    isbn = "No ISBN Found"
  }

  if(props.book.title != undefined){
    title = props.book.title
  } else{
    title = "No Title Found"
  }

  if(props.book.author_name != undefined){
    author = props.book.author_name
  } else{
    author = "No Author Found"
  }

  if(cover_id == "No Cover Found"){
    return(
      <>
        <div class="book pointer">
          <div className="book-item text-bold default-image border-gold text-green">{title}</div>
          
          <div id="title" className="book-item text-bold overflow-title">{title}
            <div className="tooltip">{title}</div>
          </div>
          {/* <p>{description}</p> */}
          <div id="author" className="book-item overflow-title">{author}</div>
          {/* <div className="book-item">ISBN: {isbn}</div> */}
        </div>
      </>
    );
  } else{
    return(
      <>
        <div class="book pointer">
          <img className="book-item border-gold" src={`https://covers.openlibrary.org/b/id/${cover_id}-M.jpg`} alt={`${title}`} height="209px;" width="140px;"></img>
          <div id="title" className="book-item text-bold overflow-title">{title}
            <div className="tooltip">{title}</div>
          </div>
          {/* <p>{description}</p> */}
          <div className="book-item overflow-title">{author}</div>
          {/* <div className="book-item">ISBN: {isbn}</div> */}
        </div>
      </>
    );
  }
}

function BookShelf() {
  return (
  <div>
    <div>

      <InfoBar/>
      
      <Shelf/>
    </div>
  </div>
  );
}

export default BookShelf;