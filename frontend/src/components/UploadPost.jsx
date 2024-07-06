import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

const UploadPost = () => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!image) {
      setPreview(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(image);
  }, [image]);

  const uploadPost = async (e) => {
    e.preventDefault();

    if (!image) {
      toast.error("Please upload an image.");
      return;
    }

    const formData = new FormData();
    if (title.length > 0) {
      formData.append('title', title);
    }
    formData.append('image', image);

    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/post/upload`, {
        method: "POST",
        credentials: 'include',
        body: formData
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setTitle('');
        setImage(null);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Post not uploaded.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-full flex flex-col items-center justify-center px-5'>
      <h2 className='mb-5 text-2xl'>Upload a new post</h2>
      <form onSubmit={uploadPost} className='flex flex-col w-full gap-5'>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border-b text-xl pb-1'
          placeholder='Write something...'
        />
        <label htmlFor="image" className='flex flex-col gap-2 cursor-pointer'>
          <p className='text-xl'>Upload Image</p>
          <img
            src={preview ? preview : 'https://www.lifewire.com/thmb/TRGYpWa4KzxUt1Fkgr3FqjOd6VQ=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/cloud-upload-a30f385a928e44e199a62210d578375a.jpg'}
            alt="thumbnail"
            className='h-48 w-full object-contain object-center'
          />
        </label>
        <input
          type="file"
          id='image'
          name='image'  
          className='hidden'
          onChange={(e) => setImage(e.target.files[0])}

        />
        <button type='submit' className='bg-[#01B0F1] text-white rounded-lg p-2'>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}

export default UploadPost;
