import { useState } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "../hooks";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CommentSectionProps {
    postId: string;
    comments: Comment[];
    loading: boolean;
}

export const CommentSection = ({ postId, comments, loading }: CommentSectionProps) => {
    const [newComment, setNewComment] = useState("");
    const [replyingTo, setReplyingTo] = useState<number | null>(null);
    const [replyContent, setReplyContent] = useState("");
    const [submitting, setSubmitting] = useState(false);

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;
        
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${BACKEND_URL}/api/v1/comment`,
                {
                    content: newComment,
                    postId: postId
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setNewComment("");
            window.location.reload(); // Refresh to get new comment
        } catch (error) {
            console.error('Failed to post comment:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitReply = async (parentId: number) => {
        if (!replyContent.trim()) return;
        
        setSubmitting(true);
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${BACKEND_URL}/api/v1/comment`,
                {
                    content: replyContent,
                    postId: postId,
                    parentId: parentId
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setReplyContent("");
            setReplyingTo(null);
            window.location.reload(); // Refresh to get new reply
        } catch (error) {
            console.error('Failed to post reply:', error);
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="animate-pulse">
                    <div className="flex space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
                <div className="animate-pulse">
                    <div className="flex space-x-3">
                        <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                        <div className="flex-1">
                            <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Comment Form */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex space-x-3">
                    <Avatar name="You" size="medium" />
                    <div className="flex-1">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Add a comment..."
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                            rows={3}
                        />
                        <div className="flex justify-end mt-3">
                            <button
                                onClick={handleSubmitComment}
                                disabled={submitting || !newComment.trim()}
                                className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {submitting ? 'Posting...' : 'Post Comment'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Comments List */}
            {comments.length > 0 ? (
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <div className="flex space-x-3">
                                <Avatar 
                                    name={comment.author.name} 
                                    size="medium" 
                                    src={comment.author.avatar}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-medium text-gray-900">
                                            {comment.author.name}
                                        </span>
                                        <span className="text-sm text-gray-500">
                                            {new Date(comment.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="text-gray-800 mb-3">{comment.content}</p>
                                    
                                    <button
                                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                                        className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
                                    >
                                        Reply
                                    </button>

                                    {/* Reply Form */}
                                    {replyingTo === comment.id && (
                                        <div className="mt-4 bg-gray-50 rounded-lg p-4">
                                            <div className="flex space-x-3">
                                                <Avatar name="You" size="small" />
                                                <div className="flex-1">
                                                    <textarea
                                                        value={replyContent}
                                                        onChange={(e) => setReplyContent(e.target.value)}
                                                        placeholder="Write a reply..."
                                                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                                                        rows={2}
                                                    />
                                                    <div className="flex justify-end gap-2 mt-3">
                                                        <button
                                                            onClick={() => {
                                                                setReplyingTo(null);
                                                                setReplyContent("");
                                                            }}
                                                            className="px-3 py-1 text-gray-600 hover:text-gray-800 transition-colors"
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => handleSubmitReply(comment.id)}
                                                            disabled={submitting || !replyContent.trim()}
                                                            className="px-4 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                                                        >
                                                            {submitting ? 'Posting...' : 'Reply'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Replies */}
                                    {comment.replies && comment.replies.length > 0 && (
                                        <div className="mt-4 ml-8 space-y-4">
                                            {comment.replies.map((reply) => (
                                                <div key={reply.id} className="border-l-2 border-gray-200 pl-4">
                                                    <div className="flex space-x-3">
                                                        <Avatar 
                                                            name={reply.author.name} 
                                                            size="small" 
                                                            src={reply.author.avatar}
                                                        />
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2 mb-1">
                                                                <span className="font-medium text-gray-900 text-sm">
                                                                    {reply.author.name}
                                                                </span>
                                                                <span className="text-xs text-gray-500">
                                                                    {new Date(reply.createdAt).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                            <p className="text-gray-800 text-sm">{reply.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                </div>
            )}
        </div>
    );
};