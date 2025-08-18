import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Post {
    "id": number;
    "title": string;
    "content": string;
    "excerpt"?: string;
    "coverImage"?: string;
    "published": boolean;
    "publishedAt"?: string;
    "readTime"?: number;
    "viewCount"?: number;
    "createdAt": string;
    "author": {
        "id"?: number;
        "name": string;
        "username"?: string;
        "avatar"?: string;
        "bio"?: string;
        "website"?: string;
    };
    "category"?: {
        "name": string;
        "color": string;
    };
    "tags"?: Array<{
        "name": string;
    }>;
    "_count"?: {
        "likes": number;
        "comments": number;
    };
}

export interface User {
    "id": number;
    "name": string;
    "email": string;
    "username"?: string;
    "bio"?: string;
    "avatar"?: string;
    "website"?: string;
    "location"?: string;
    "createdAt": string;
    "_count"?: {
        "posts": number;
        "followers": number;
        "following": number;
    };
}

export interface Comment {
    "id": number;
    "content": string;
    "createdAt": string;
    "author": {
        "id": number;
        "name": string;
        "username"?: string;
        "avatar"?: string;
    };
    "replies"?: Comment[];
}

export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Post>();
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
                headers: {
                    Authorization: localStorage.getItem('token'),
                },
            })
            .then((response) => {
                setBlog(response.data.post);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response?.status === 403) {
                    navigate('/signin');
                } else {
                    console.error('Failed to fetch blog:', error);
                    setLoading(false);
                }
            });
    }, [id, navigate])

    return {
        loading,
        blog
    }
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        axios
            .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setBlogs(response.data.posts);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response?.status === 403) {
                    navigate('/signin');
                } else {
                    console.error('Failed to fetch blogs:', error);
                    setLoading(false);
                }
            });
    }, [navigate])

    return {
        loading,
        blogs
    }
}

export const useUserProfile = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/signin');
            return;
        }

        axios
            .get(`${BACKEND_URL}/api/v1/user/profile`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setUser(response.data.user);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response?.status === 403) {
                    navigate('/signin');
                } else {
                    console.error('Failed to fetch user profile:', error);
                    setLoading(false);
                }
            });
    }, [navigate])

    return {
        loading,
        user
    }
}

export const useUserPosts = () => {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/signin');
            return;
        }

        axios
            .get(`${BACKEND_URL}/api/v1/user/posts`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setPosts(response.data.posts);
                setLoading(false);
            })
            .catch((error) => {
                if (error.response?.status === 403) {
                    navigate('/signin');
                } else {
                    console.error('Failed to fetch user posts:', error);
                    setLoading(false);
                }
            });
    }, [navigate])

    return {
        loading,
        posts
    }
}

export const useComments = (postId: string) => {
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<Comment[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        axios
            .get(`${BACKEND_URL}/api/v1/comment/post/${postId}`, {
                headers: {
                    Authorization: token,
                },
            })
            .then((response) => {
                setComments(response.data.comments);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Failed to fetch comments:', error);
                setLoading(false);
            });
    }, [postId, navigate])

    return {
        loading,
        comments
    }
}

export const useLikePost = () => {
    const navigate = useNavigate();

    const likePost = async (postId: number) => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate('/signin');
            return;
        }

        try {
            const response = await axios.post(
                `${BACKEND_URL}/api/v1/blog/${postId}/like`,
                {},
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            return response.data.liked;
        } catch (error) {
            console.error('Failed to like post:', error);
            throw error;
        }
    };

    return { likePost };
};

export const useLogout = () => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
    }
    return logout;
}