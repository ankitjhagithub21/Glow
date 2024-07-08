import React, { useState, useEffect } from 'react';
import { FaRegHeart, FaRegComment, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { useSelector } from "react-redux";
import Comment from "../components/Comment";
import formateDate from '../helpers/formateDate';
import toast from 'react-hot-toast';

const Post = ({ post, handleDelete, handleLikeUnlike }) => {
    const currUser = useSelector(state => state.auth.user);
    const [showComment, setShowComment] = useState(false);
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [commentLoading, setCommentLoading] = useState(false);

    useEffect(() => {
        if (showComment) {
            fetchComments();
        }
    }, [showComment]);

    const fetchComments = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${post._id}`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                setComments(data.comments);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddComment = async (postId, content) => {
        if (!content.trim()) return;
        setCommentLoading(true);
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({ postId, content })
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setComments([...comments, data.comment]);
                setContent('');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        } finally {
            setCommentLoading(false);
        }
    };

    const handleDeleteComment = async (postId, commentId) => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comment/${commentId}/post/${postId}`, {
                method: "DELETE",
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);
                setComments(comments.filter(comment => comment._id !== commentId));
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className='w-full flex flex-col p-3 border-b relative'>
            <div className='flex items-center gap-1 '>
                <img src={post.user.profileImg} alt="user" className='w-10 rounded-full' />
                <div className='flex flex-col items-start '>
                    <div className='flex items-center gap-1 text-sm'>
                        <span>{post.user.fullName}</span>
                        <LuDot />
                        <span>{formateDate(post.createdAt)}</span>
                    </div>
                    <span className='text-sm'>@{post.user.username}</span>
                </div>
            </div>
            <p className='mt-2'>{post?.title}</p>
            <img src={post.image.url} alt="post" className='max-h-96 my-3 object-cover rounded-lg' loading='lazy' />
            <div className='flex items-center justify-between'>
                <button className='flex items-center gap-1' onClick={() => handleLikeUnlike(post._id)}>
                    <span className='text-lg'>{post.likes.length}</span>
                    <FaRegHeart />
                </button>
                <button onClick={() => setShowComment(!showComment)} className='flex items-center gap-1 '>
                    <span className='text-lg'>{comments.length}</span>
                    <FaRegComment />
                </button >
                {
                    post.user._id === currUser._id && <button className= 'text-red-500 absolute top-2 right-2' onClick={() => handleDelete(post._id)}>
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
                        <input
                            type="text"
                            className='w-full bg-transparent pl-3'
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder='Leave a comment...'
                            required
                        />
                        <button
                            type='submit'
                            className='bg-green-500 rounded-full text-white py-2 px-4 text-sm flex items-center justify-center'
                            onClick={() => handleAddComment(post._id, content)}
                        >
                            {commentLoading ? 'Sending...' : 'Send'}
                        </button>
                    </div>
                    {
                        comments.length > 0 && comments.map((comment) => (
                            <Comment
                                key={comment._id}
                                postId={post._id}
                                comment={comment}
                                handleDeleteComment={handleDeleteComment}
                            />
                        ))
                    }
                </div>
            }
        </div>
    );
};

export default Post;
