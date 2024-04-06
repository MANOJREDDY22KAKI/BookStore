import React, { useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import BackButton  from '../components/BackButton';
import Spinner from '../components/Spinner';



const DeleteBook = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  const handleDeleteBook = () => {
    setLoading(true);
    axios.delete(`http://localhost:5555/books/${id}`)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Book deleted successfully', { variant: 'success' });
      navigate('/');

    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
      alert(error.response.data.message);
    })

  }
  return (
    <div className='p-5'>
      <h1 className='text-3xl my-8 font-bold'>Delete Book</h1>
      {loading ? <Spinner /> : (
        <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
          <p>Are you sure you want to delete this book?</p>
          <button
            className='p-4 bg-red-600 text-white m-8 w-full'
            onClick={handleDeleteBook}
          >
            Delete
          </button>
          <BackButton />  
        </div>

      )}
    </div>
  );
}

export default DeleteBook;
