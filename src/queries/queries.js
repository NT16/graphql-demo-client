import {gql} from '@apollo/client';

//getAuthorsQuery
const GET_ALL_AUTHORS = gql`
{
    authors{
        name
        id 
    }
}`;

//getBooksQuery
const GET_ALL_BOOKS = gql`
{
    books{
        name
        genre
        id
        author{
            name
        }
    }
}`;

//addBookMutation
const ADD_BOOK_MUTATION = gql`
mutation($name:String!, $genre:String!, $authorId:ID!){
    addBook(name: $name, genre: $genre, authorId: $authorId){
        name
        id
    }
}
`;

//getBookQuery
const GET_BOOK_QUERY = gql`
    query($id:ID){
        book(id:$id){
            id
            name
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;

export {
    GET_ALL_BOOKS,
    GET_ALL_AUTHORS,
    ADD_BOOK_MUTATION,
    GET_BOOK_QUERY
};