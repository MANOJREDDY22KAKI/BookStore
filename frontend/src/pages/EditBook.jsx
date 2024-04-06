import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
const EditBook = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [Author, setAuthor] = useState('');
  const [PublishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
    .then((response) => {
      setTitle(response.data.title);
      setAuthor(response.data.Author);

      setPublishYear(response.data.PublishYear);
      setLoading(false);
    })
    .catch((error) => {
      console.log(error);
      alert(error.response.data.message);
      setLoading(false);
    });
  }, []);

  const handleEditBook = (e) => {
    e.preventDefault();
    const data = {
      title,
      Author,
      PublishYear
    };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
    .then(() => {
      setLoading(false);
      enqueueSnackbar('Book edited successfully', { variant: 'success' });
      navigate('/');
    })
    .catch((error) => {
      console.log(error);
      setLoading(false);
      enqueueSnackbar(error.response.data.message, { variant: 'error' });
      alert(error.response.data.message);
    });
  
  }
  return (
    <div className='p-5'>
      <BackButton />
      <h1 className='text-3xl my-8 font-bold'>Edit Book</h1>
      {loading ? <Spinner /> : (
        <form onSubmit={handleEditBook}>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Title</label>
            <input

              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='border border-slate-300 rounded-md px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Author</label>
            <input
            type='text'
            name='Author'
            value={Author}
            required
            onChange={(e)=>setAuthor(e.target.value)}
            className='border border-slate-300 rounded-md px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
            <input
            type='number'
            name='PublishYear'
            value={PublishYear}
            required
            onChange={(e)=>setPublishYear(e.target.value)}
            className='border border-slate-300 rounded-md px-4 py-2 w-full'
            />
          </div>
          <div className='my-4'>
            <button
              type='submit'
              className='bg-sky-500 text-white px-3 py-2 rounded-md hover:bg-violet-800'
            >
              Save
            </button>
          </div>
        </form>

      )}
    </div>
  );
}

export default EditBook;
