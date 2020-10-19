import React, {useState} from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ALL_AUTHORS, ADD_BOOK_MUTATION, GET_ALL_BOOKS } from '../queries/queries';

function AddBook(){
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorId, setAuthorId] = useState("");
  
    const { loading, data } = useQuery(GET_ALL_AUTHORS);
    const [ addBook ] = useMutation(ADD_BOOK_MUTATION);
  
    function displayAuthors(){
        if(loading){
            return( <option disabled>Loading Authors</option>);
        }else{
            return data.authors.map( author => (
                <option key={author.id} value={author.id}>{author.name}</option>
            ));
        }
    };

    function submitForm(e){
        e.preventDefault();
       
        addBook({ 
            variables: {
                name,
                genre,
                authorId
            }, 
            refetchQueries: [ { query: GET_ALL_BOOKS }]
        });

        setAuthorId('');
        setGenre('');
        setName('');
    }

    return (
        <form id='add-book' onSubmit={submitForm}>
            <div className='field'>
                <label>Book name :</label>
                <input type='text' value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className='field'>
                <label>Genre :</label>
                <input type='text' value={genre} onChange={(e) => setGenre(e.target.value)} />
            </div>
            <div className='field'>
                <label>Author :</label>
                <select onChange={(e) => setAuthorId(e.target.value)} >
                    <option>Select author</option>
                    {displayAuthors()}
                </select>
            </div>
            <button>+</button>
        </form>
    );
}

export default AddBook;