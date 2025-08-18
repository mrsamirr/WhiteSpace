import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Post } from "../hooks";

export const Category = () => {
    const { slug } = useParams();
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        const fetchCategoryPosts = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                    `${BACKEND_URL}/api/v1/blog/category/${slug}`,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                setPosts(response.data.posts);
                // Extract category name from first post or use slug
                if (response.data.posts.length > 0 && response.data.posts[0].category) {
                    setCategoryName(response.data.posts[0].category.name);
                } else {
                    setCategoryName(slug?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || '');
                }
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch category posts:', error);
                setLoading(false);
            }
        };

        if (slug) {
            fetchCategoryPosts();
        }
    }, [slug]);

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div className="mb-8">
                        <BlogSkeleton />
                    </div>
                    <div className="space-y-6">
                        <BlogSkeleton />
                        <BlogSkeleton />
                        <BlogSkeleton />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Category Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {categoryName}
                    </h1>
                    <p className="text-gray-600">
                        {posts.length} {posts.length === 1 ? 'story' : 'stories'} in {categoryName}
                    </p>
                </div>
                
                {/* Posts */}
                {posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map((post) => (
                            <BlogCard
                                key={post.id}
                                id={post.id}
                                authorName={post.author.name || "Anonymous"}
                                title={post.title}
                                content={post.content}
                                publishedDate={new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                })}
                                excerpt={post.excerpt}
                                readTime={post.readTime}
                                coverImage={post.coverImage}
                                category={post.category}
                                tags={post.tags}
                                likeCount={post._count?.likes || 0}
                                commentCount={post._count?.comments || 0}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-gray-500 mb-4">No stories found in this category.</p>
                        <a 
                            href="/blogs"
                            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                            Explore all stories
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};