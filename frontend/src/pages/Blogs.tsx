import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading) {
        return <div>
         loading...
        </div>
    }

    return <div> 
      
             <Appbar />
          <div className="flex justify-center p-4">
          <div className="max-w-xl">
             {blogs.map(blog => <BlogCard 
             id={blog.id}
             authorName={blog.author.name || "Anonymous"}
             title={blog.title}
             content={blog.content}
             publishedDate={"18 Aug 2024"}
             /> )}
                </div>
            </div>
       </div>
}