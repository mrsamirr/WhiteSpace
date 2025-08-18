import { Link } from "react-router-dom";
import { Post } from "../hooks";

interface TrendingCardProps {
    post: Post;
    rank: number;
}

export const TrendingCard = ({ post, rank }: TrendingCardProps) => {
    return (
        <div className="group">
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                    <span className="text-3xl font-bold text-gray-200 group-hover:text-gray-300 transition-colors">
                        {rank.toString().padStart(2, '0')}
                    </span>
                </div>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <span className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                            {post.author.name?.charAt(0) || 'A'}
                        </span>
                        <span className="truncate">{post.author.name || 'Anonymous'}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors line-clamp-2 mb-2">
                        <Link to={`/blog/${post.id}`}>
                            {post.title}
                        </Link>
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>{post.readTime || 5} min read</span>
                        <span>•</span>
                        <span>{post._count?.likes || 0} likes</span>
                    </div>
                </div>
            </div>
        </div>
    );
};