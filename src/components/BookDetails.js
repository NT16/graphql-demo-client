import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_BOOK_QUERY } from '../queries/queries';

function BookDetails({bookId}) {
    const { data } = useQuery(GET_BOOK_QUERY, {
        variables: {
            id: bookId
        }
    });

    function displayBookDetails(){
        if(data){
            const { book } = data;
            if(book){
                return <div>
                    <h2>{book.name}</h2>
                    <p>Genre  : {book.genre}</p>
                    <p>Author : {book.author.name}</p>
                    <p>All books by this author :</p>
                    <ul className='other-books'>
                        {
                        book.author.books.map( item => <li key={item.id}>{item.name}</li> )
                        }
                    </ul>
                </div>
            }
        }
        return <div>No book selected</div>
    }

    return <div id='book-details'>
        {
            displayBookDetails()
        }
    </div>
}

export default BookDetails;