import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { category } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_SERVER}/blog`
        );
        const data = response.data;
        // Filter blogs based on the category (case insensitive)
        const filteredBlogs = data.filter(
          (blog) => blog.Category.toLowerCase() === category.toLowerCase()
        );
        setBlogs(filteredBlogs);
        console.log(data);
        console.log(filteredBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, [category]);

  const truncateText = (text, maxLength) => {
    if (text.split(" ").length > maxLength) {
      return text.split(" ").slice(0, maxLength).join(" ") + "...";
    }
    return text;
  };

  return (
    <>
      <div className="container mx-auto p-4 mt-24 md:mt-12 h-screen">
        <h1 className="text-3xl font-bold mb-4 capitalize font-primary text-[#f05225]">
          {category}
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#efefef] dark:bg-[#1e1e1e] hover:shadow-[#F05225]/90 transition-all duration-300 cursor-pointer rounded-lg shadow-sm p-4 mb-4 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-x-2 w-1/2">
                  <div className="w-8 h-8 border-2 border-black dark:border-white rounded-full">
                    <img
                      src="/img/UserProfile.png"
                      alt=""
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  <p className="text-[#101010] dark:text-[#fff] text-sm font-primary font-semibold">
                    {blog.author}
                  </p>
                </div>
                <div className="text-[#101010] dark:text-[#fff] text-xs border-[1px] border-[#F05225] px-2 rounded-full flex items-center justify-center font-medium font-primary">
                  <p>{new Date(blog.timeStamp).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="mb-4 h-48 w-full overflow-hidden rounded">
                <img
                  src={`${import.meta.env.VITE_APP_SERVER}/${blog.thumbnail}`}
                  alt={blog.title}
                  className="w-full h-full object-cover rounded transition duration-300 ease-in-out group-hover:scale-105"
                />
              </div>
              <h2 className="text-xl font-semibold mb-2 text-[#101010] dark:text-[#fff] font-primary group-hover:text-[#F05225] transition-all duration-300">
                {blog.title}
              </h2>
              <p className="text-[#101010] dark:text-[#fff] mb-4 font-secondary">
                {truncateText(blog.content, 20)}
              </p>
              <a
                href={`/blogs/${blog.id}`}
                className="text-[#F05225] group-hover:underline font-secondary font-medium text-sm"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
