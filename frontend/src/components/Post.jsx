import React, { useEffect, useState } from 'react';
import { FaRegHeart, FaRegComment, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { formatDistanceToNow } from 'date-fns';
import { useSelector } from "react-redux"
import Comment from "../components/Comment"


const Post = ({ post, handleDelete, handleLikeUnlike, handleAddComment,comments,setComments,handleDeleteComment }) => {
    const formateDate = (date) => {
        return formatDistanceToNow(new Date(date), { addSuffix: true });
    }

    const currUser = useSelector(state => state.auth.user)
    const [showComment, setShowComment] = useState(false)
    const [content, setContent] = useState('')
    
    const fetchComments = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${post._id}`, {
                credentials: 'include'
            })
            const data = await res.json()
            if (data.success) {

                setComments(data.comments)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='w-full flex flex-col p-3 border-b'>
            <div className='flex items-center gap-1'>
                <img src={post.user.profileImg} alt="user" className='w-10 rounded-full' />
                <div className='flex flex-col items-start'>
                    <div className='flex items-center gap-1 text-sm'>
                        <span>{post.user.fullName}</span>
                        <LuDot />
                        <span>{formateDate(post.createdAt)}</span>
                    </div>
                    <span className='text-sm'>@{post.user.username}</span>
                </div>
            </div>
            <p className='mt-2'>{post?.title}</p>
            <img src={post.image.url} alt="post" className='h-54 my-3 rounded-lg' />
            <div className='flex items-center justify-between'>
                <button className='flex items-center gap-1' onClick={() => handleLikeUnlike(post._id)}>
                    <span className='text-lg'>{post.likes.length}</span>
                    <FaRegHeart />
                </button>
                <button onClick={() => {
                    fetchComments()
                    setShowComment(!showComment)
                }} className='flex items-center gap-1'>
                    <span className='text-lg'>{post.comments.length}</span>
                    <FaRegComment />
                </button>
                {
                    post.user._id === currUser._id && <button onClick={() => handleDelete(post._id)}>
                        <FaRegTrashAlt />
                    </button>
                }
                <button>
                    <FaRegBookmark />
                </button>
            </div>
            {
                showComment && <div className='flex flex-col mt-2'>
                    <div className='flex items-center border rounded-full px-1 py-1'>
                        <input type="text" className='w-full bg-transparent pl-3' value={content} onChange={(e) => setContent(e.target.value)} placeholder='Leave a comment...' required />
                        <button type='submit' className='bg-green-500 rounded-full text-white py-2 px-4 text-sm flex items-center justify-center' onClick={() => {
                            setContent('')
                            handleAddComment(post._id, content)

                        }}>

                            Send
                        </button>
                    </div>
                    {
                        post.comments.length > 0 && comments.map((comment) => {
                            return <Comment key={comment._id} postId = {post._id} comment={comment} formateDate={formateDate} handleDeleteComment={handleDeleteComment} />
                        })
                    }
                </div>
            }
        </div>
    );
}

export default Post;
