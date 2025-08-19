import { useState } from "react";
import { Appbar } from "./Appbar"
import { Post } from "./../hooks/index"
import { Avatar } from "./Avatar"
import { useLikePost } from "../hooks";
import { useComments } from "../hooks";
import { CommentSection } from "./CommentSection";

export const BlogPost = ({ blog }: { blog: Post }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(blog._count?.likes || 0);
    const { likePost } = useLikePost();
    const { loading: commentsLoading, comments } = useComments(blog.id.toString());

    const handleLike = async () => {
        try {
            const liked = await likePost(blog.id);
            setIsLiked(liked);
            setLikeCount(prev => liked ? prev + 1 : prev - 1);
        } catch (error) {
            console.error('Failed to like post:', error);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Appbar />
            
            {/* Cover Image */}
            {blog.coverImage && (
                <div className="w-full h-96 bg-gray-200 relative overflow-hidden">
                    <img 
                        src={blog.coverImage} 
                        alt={blog.title}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Article Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                        {blog.title}
                    </h1>
                    
                    <div className="flex items-center gap-4 text-gray-600 mb-6">
                        <Avatar 
                            name={blog.author.name || "Anonymous"} 
                            size="medium" 
                            src={blog.author.avatar}
                        />
                        <div>
                            <p className="font-medium text-gray-900">
                                {blog.author.name || "Anonymous"}
                            </p>
                            <p className="text-sm">
                                {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                                {blog.readTime && ` · ${blog.readTime} min read`}
                            </p>
                        </div>
                    </div>
                    
                    {/* Category and Tags */}
                    <div className="flex items-center gap-3 mb-6">
                        {blog.category && (
                            <span 
                                className="px-3 py-1 rounded-full text-sm font-medium text-white"
                                style={{ backgroundColor: blog.category.color }}
                            >
                                {blog.category.name}
                            </span>
                        )}
                        {blog.tags && blog.tags.map((tag, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 rounded-full text-sm font-medium text-gray-600 bg-gray-100"
                            >
                                #{tag.name}
                            </span>
                        ))}
                    </div>
                </div>
                
                {/* Article Content */}
                <article className="prose prose-lg max-w-none mb-12">
                    <div className="text-gray-800 leading-relaxed text-lg">
                        {blog.content.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-6">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </article>
                
                {/* Engagement Section */}
                <div className="border-t border-gray-200 pt-8 mb-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                                    isLiked 
                                        ? 'bg-red-100 text-red-600' 
                                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                }`}
                            >
                                <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{likeCount} {likeCount === 1 ? 'like' : 'likes'}</span>
                            </button>
                            
                            <div className="flex items-center gap-2 text-gray-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span>{blog.viewCount || 0} views</span>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                </svg>
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Author Bio */}
                <div className="border-t border-gray-200 pt-8 mb-12">
                    <div className="flex items-start gap-4">
                        <Avatar 
                            name={blog.author.name || "Anonymous"} 
                            size="big" 
                            src={blog.author.avatar}
                        />
                        <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {blog.author.name || "Anonymous"}
                            </h3>
                            {blog.author.bio && (
                                <p className="text-gray-600 mb-3">{blog.author.bio}</p>
                            )}
                            {blog.author.website && (
                                <a 
                                    href={blog.author.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    {blog.author.website}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Comments Section */}
                <div className="border-t border-gray-200 pt-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">
                        Comments ({blog._count?.comments || 0})
                    </h3>
                    <CommentSection 
                        postId={blog.id.toString()} 
                        comments={comments} 
                        loading={commentsLoading} 
                    />
                </div>
            </div>
        </div>
    );
};