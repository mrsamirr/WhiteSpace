import { useState } from "react";
import { useUserProfile } from "../hooks";
import { useUserPosts } from "../hooks";
import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Link } from "react-router-dom";

export const Dashboard = () => {
    const { loading, user } = useUserProfile();
    const { loading: postsLoading, posts } = useUserPosts();
    const [activeTab, setActiveTab] = useState<'published' | 'drafts'>('published');

    const publishedPosts = posts.filter(post => post.published);
    
    const draftPosts = posts.filter(post => !post.published);

    const totalViews = publishedPosts.reduce((sum, post) => sum + (post.viewCount || 0), 0);
    const totalLikes = publishedPosts.reduce((sum, post) => sum + (post._count?.likes || 0), 0);
    // const totalComments = publishedPosts.reduce((sum, post) => sum + (post._count?.comments || 0), 0);

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <BlogSkeleton />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <Appbar />
                <div className="max-w-6xl mx-auto px-4 py-8">
                    <p>User not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* Dashboard Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
                    <p className="text-gray-600">Manage your stories and track your progress</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Stories</p>
                                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Published</p>
                                <p className="text-2xl font-bold text-gray-900">{publishedPosts.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Views</p>
                                <p className="text-2xl font-bold text-gray-900">{totalViews.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg shadow-sm p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                                <p className="text-2xl font-bold text-gray-900">{totalLikes.toLocaleString()}</p>
                            </div>
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="flex flex-wrap gap-4">
                        <Link 
                            to="/publish"
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Write New Story
                        </Link>
                        <Link 
                            to="/profile"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                        >
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Edit Profile
                        </Link>
                    </div>
                </div>

                {/* Posts Tabs */}
                <div className="bg-white rounded-lg shadow-sm">
                    <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('published')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'published'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Published ({publishedPosts.length})
                            </button>
                            <button
                                onClick={() => setActiveTab('drafts')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'drafts'
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                Drafts ({draftPosts.length})
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {postsLoading ? (
                            <div className="space-y-6">
                                <BlogSkeleton />
                                <BlogSkeleton />
                                <BlogSkeleton />
                            </div>
                        ) : activeTab === 'published' ? (
                            publishedPosts.length > 0 ? (
                                <div className="space-y-6">
                                    {publishedPosts.map((post) => {
                                        return (
                                            <BlogCard
                                                key={post.id}
                                                id={post.id}
                                                authorName={post.author?.name || "Anonymous"}
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
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <p className="text-gray-500 mb-4">You haven't published any stories yet.</p>
                                    <Link 
                                        to="/publish"
                                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                    >
                                        Publish your first story
                                    </Link>
                                </div>
                            )
                        ) : (
                            draftPosts.length > 0 ? (
                                <div className="space-y-6">
                                    {draftPosts.map((post) => (
                                        <BlogCard
                                            key={post.id}
                                            id={post.id}
                                            authorName={post.author?.name || "Anonymous"}
                                            title={post.title}
                                            content={post.content}
                                            publishedDate={new Date(post.createdAt).toLocaleDateString('en-US', {
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
                                    <p className="text-gray-500 mb-4">No drafts found.</p>
                                    <Link 
                                        to="/publish"
                                        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                    >
                                        Start writing
                                    </Link>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};