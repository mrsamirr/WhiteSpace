import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Post {
    
        "id": number;
        "title": string;
        "content": string;
        "published": false,
        "author": {
            "name" : string
        }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Post[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        console.log("Retrieved token:", token);

            axios
        .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
            Authorization: localStorage.getItem('token'),
            },
        })
        .then((response) => {
            setBlogs(response.data.posts);
            setLoading(false);
        })
            .catch((error) => {
                if (error.response.status === 403) {
                  // Redirect to login page if unauthorized
                } else {
                    console.log(error)
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                    console.log(error.request);
                  console.error('Failed to fetch blog:', error);
                  setLoading(false);
                }
              });
    }, [])

    return {
        loading,
        blogs
    }
}
