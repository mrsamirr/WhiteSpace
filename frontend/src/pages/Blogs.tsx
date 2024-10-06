import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="mt-20 flex justify-center">
                    <div className="max-w-2xl w-full">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );

    }
    return <>

        <Appbar />
        <h1 className="flex justify-center border-b-1 text-2xl pt-3 font-extralight"> Discover Blogs</h1>
        <div className="flex justify-center">
            <div className="max-w-2xl">
                {blogs.map(blog =>
                    <BlogCard
                        id={blog.id}
                        authorName={blog.author.name || "Anonymous"}
                        title={blog.title}
                        content={blog.content}
                        publishedDate={"18 Aug 2024"}
                    />)}
            </div>
        </div>
    </>
}