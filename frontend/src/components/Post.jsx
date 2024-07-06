import React from 'react'
import { FaRegHeart, FaRegComment, FaRegBookmark, FaRegTrashAlt } from "react-icons/fa";
import { LuDot } from "react-icons/lu";

const Post = () => {
    return (
        <div className='w-full flex flex-col p-3 border-b'>
            <div className='flex items-center gap-1'>
                <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="user" className='w-10 rounded-full' />
                <div className='flex flex-col items-start'>
                  <div className='flex items-center gap-1 text-sm'>
                  <span>Ankit Jha</span>
                  <LuDot/>
                  <span>24 July</span>
                  </div>

                    <span className='text-sm'>@its.ankitjha</span>
                </div>
            </div>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis numquam sequi dolorum voluptatem ex repudiandae aspernatur inventore, a eligendi, modi reprehenderit dolores ea expedita dolorem adipisci, distinctio possimus aliquam! Ut.</p>
            <div className='flex items-center justify-between mt-2'>
                <button>
                    <FaRegHeart />
                </button>
                <button>
                    <FaRegComment />
                </button>
                <button>
                    <FaRegTrashAlt />
                </button>
                <button>
                <FaRegBookmark />
            </button>
            </div>
          
        </div>

    )
}

export default Post
