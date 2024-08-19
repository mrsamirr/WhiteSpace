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
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            },
        })
            .then(response => {
             setBlogs(response.data);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response.status === 403) {
                  // Redirect to login page if unauthorized
                } else {
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