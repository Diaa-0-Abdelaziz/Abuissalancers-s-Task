"use client";
import React, { useEffect, useState } from 'react'
import { Api } from '../mainApiLink/MainApiLink';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
export default function Blogs() {
  // MainData and BlogData include the data from api but the MainData will but data in BlogData if input value == ' '
    const [BlogData, setBlogData]= useState([]);
    const [MainData, setMainData] = useState([]); 
    const [currentPage, setCurrentPage] = useState(0);
    const [FilterById, setFilterById] = useState('');
    // postsPerPage is the number of posts in the one page
  const postsPerPage = 7; 

    useEffect(()=>{
        getBlogsData_();
    }, [])
    
    useEffect(() => {
      // FilterById mean the value of the number that the user write it in input and compare it with id of post
      if (FilterById) {
        const filteredPosts = MainData.filter(
          (post) => post.id === parseInt(FilterById) 
        );
        setBlogData(filteredPosts); 
      } else {
        setBlogData(MainData);
      }
    }, [FilterById, MainData]);
    
  // function that get data from api
    async function getBlogsData_() {
      try {
        const { data } = await axios.get(`${Api}/posts`);
        if (data) {
          setBlogData(data); 
          setMainData(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
    const displayedPosts = BlogData.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage);
  
  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const searchId = (e) => {
    setFilterById(e.target.value)
    }
  return (
    <>
    <input type="number" name="Name" value={FilterById} className="block w-auto outline-none m-auto mt-5 rounded-md border-2 border-gray-900 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-orane-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:text-sm sm:leading-6" placeholder="Search By ID" onChange={searchId}/>
   <section className='sm:px-20 mt-10'>
   {displayedPosts.length > 0 ? (
   <>
    {/* Table will display in large screen and will disappear in small screen */}
   <table className="border-collapse border border-slate-500 md:block hidden ">
   <caption className="caption-top">
    This table is display jsonplaceholder's posts
  </caption>
        <thead className=" bg-zinc-800 text-orange-600 w-full">
          <tr className=' '>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          
            {displayedPosts.map((item) => (
              <tr key={item.id} className='border-b-1 border border-zinc-800'>
                <td className=' font-extrabold p-5 '>{item.id}</td>
                <td className=' font-medium p-2'>{item.title}</td>
                <td className=' font-medium p-2'>{item.body}</td>
              </tr>
            ))}
          
        </tbody>
      </table>
      {/* Article will display in small screen and will disappear in large screen */}
      {displayedPosts.map((item) => (
        <article key={item.id}  className=' md:hidden block relative shadow-md overflow-hidden rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer m-5 p-5'>
            <span className=' absolute left-0 top-0 p-1 text-orange-600 font-medium  bg-slate-900'>{item.id}</span>
            <h2 className=' text-slate-900 font-medium text-lg mt-3 text-center'> <span className='text-orange-600 font-bold'>Title:</span> {item.title} </h2>
            <h3 className=' flex items-center gap-2 text-orange-600 font-extrabold'> <span className='text-orange-600 font-bold'>Body:</span> {item.body}</h3>
        </article>
      ))}
    <ReactPaginate
        // previousLabel={'<<'}
        // nextLabel={'>>'}
        pageCount={Math.ceil(BlogData.length / postsPerPage)}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        activeClassName=" bg-slate-900 px-2 text-white "
        marginPagesDisplayed={1} 
        pageRangeDisplayed={0}
        className="my-10 text-slate-900 font-medium text-lg flex flex-wrap justify-center gap-10 w-fit m-auto"
        nextClassName="bg-slate-900 px-3 rounded text-white hover:text-orange-600 "
        previousClassName="bg-slate-900 px-3 rounded text-white hover:text-orange-600"
      />
   </>
    ) : (
        
      <p className=' font-bold text-center text-red-600 bg-gray-900 p-5 rounded-md text-3xl mt-10'>Sorry.... No Data To Show Here</p>
    
)}
   </section>
    </>
  )
}
