import { useState } from "react";
import { useUserProfile } from "../hooks";
import { Appbar } from "../components/Appbar";
import { Avatar } from "../components/Avatar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useUserPosts } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Profile = () => {
    const { loading, user } = useUserProfile();
    const { loading: postsLoading, posts } = useUserPosts();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || "",
        username: user?.username || "",
        bio: user?.bio || "",
        website: user?.website || "",
        location: user?.location || ""
    });

    const handleSave = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.put(
                `${BACKEND_URL}/api/v1/user/profile`,
                formData,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setIsEditing(false);
            window.location.reload(); // Refresh to get updated data
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    if (loading) {
        return (
            <div>
                <Appbar />
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <BlogSkeleton />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div>
                <Appbar />
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <p>User not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                {/* Profile Header */}
                <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                    <div className="flex items-start gap-6">
                        <Avatar 
                            name={user.name} 
                            size="big" 
                            src={user.avatar}
                            className="w-20 h-20"
                        />
                        
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                        {user.name}
                                    </h1>
                                    <p className="text-gray-600">
                                        @{user.username || 'username'}
                                    </p>
                                </div>
                                
                                <button
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-50 transition-colors"
                                >
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </button>
                            </div>
                            
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Username
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.username}
                                            onChange={(e) => setFormData({...formData, username: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Bio
                                        </label>
                                        <textarea
                                            value={formData.bio}
                                            onChange={(e) => setFormData({...formData, bio: e.target.value})}
                                            rows={3}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Website
                                        </label>
                                        <input
                                            type="url"
                                            value={formData.website}
                                            onChange={(e) => setFormData({...formData, website: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.location}
                                            onChange={(e) => setFormData({...formData, location: e.target.value})}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleSave}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {user.bio && (
                                        <p className="text-gray-700">{user.bio}</p>
                                    )}
                                    
                                    <div className="flex items-center gap-6 text-sm text-gray-600">
                                        {user.website && (
                                            <a 
                                                href={user.website} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                🌐 {user.website}
                                            </a>
                                        )}
                                        {user.location && (
                                            <span>📍 {user.location}</span>
                                        )}
                                        <span>📅 Joined {new Date(user.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-6 text-sm">
                                        <span className="text-gray-900 font-medium">{user._count?.posts || 0} stories</span>
                                        <span className="text-gray-900 font-medium">{user._count?.followers || 0} followers</span>
                                        <span className="text-gray-900 font-medium">{user._count?.following || 0} following</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* User's Posts */}
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Stories</h2>
                    
                    {postsLoading ? (
                        <div className="space-y-6">
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </div>
                    ) : posts.length > 0 ? (
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
                            <p className="text-gray-500 mb-4">You haven't written any stories yet.</p>
                            <a 
                                href="/publish"
                                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                            >
                                Write your first story
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};