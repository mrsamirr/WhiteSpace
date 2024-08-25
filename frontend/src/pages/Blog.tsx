import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { BlogPost } from "../components/BlogPost";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({
        id: id || ""
    });
    
    if(loading || !blog) {
        return <div>
                <Appbar />
                <div className="flex justify-center p-4">
            <div>
                    <BlogSkeleton />
                    <BlogSkeleton />
                    <BlogSkeleton />
                </div>
            </div>
        </div>
    }

    return (
        <div>
            <BlogPost blog={blog} />
        </div>
    )
}