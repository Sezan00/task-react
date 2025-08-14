import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";


const createBlog = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [message, setMessage] = useState("");

const handleSubmiter = async (e) => {
        e.preventDefault();
        setMessage("");
        try{
            const res = await axios.post('http://localhost:8000/api/blog-upload', {
                title,
                description,
             });

            setMessage(res.data.message);
            setTitle("");
            setDescription("");
        } catch(err){
            if(err.response.data.errors){
                setMessage(
                    Object.values(err.response.data.errors).flat().join(",")
                );
            } else{
                setMessage("something went wrong");
            }
        }
    };

    return(
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
  <div className="bg-white rounded-2xl shadow-md w-full max-w-lg p-6">
    <h1 className="text-2xl font-bold text-gray-800 mb-4">Create Blog Post</h1>

    <form 
        onSubmit={handleSubmiter}
    >
      
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          placeholder="Enter blog title"
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e)=>setTitle(e.target.value)}
          required
        />
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          rows="5"
          value={description}
          placeholder="Write your blog description..."
          className="mt-1 w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e)=>setDescription(e.target.value)}
          required
        ></textarea>
      </div>

    
      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-xl transition"
      >
        Post Blog
      </button>
    </form>
  </div>
</div>
    )


};

    

export default createBlog;