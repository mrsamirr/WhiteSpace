import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface BlogCardProps {
    id: number;
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    excerpt?: string;
    readTime?: number;
    coverImage?: string;
    category?: {
        name: string;
        color: string;
    };
    tags?: Array<{
        name: string;
    }>;
    likeCount?: number;
    commentCount?: number;
}

export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate,
    excerpt,
    readTime,
    coverImage,
    category,
    tags,
    likeCount = 0,
    commentCount = 0
}: BlogCardProps) => {
    return (
        <Link to={`/blog/${id}`}>
            <article className="group py-8 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex gap-6">
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-3">
                            <Avatar name={authorName} size="small" />
                            <span className="text-sm text-gray-600">{authorName}</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm text-gray-500">{publishedDate}</span>
                            {category && (
                                <>
                                    <span className="text-gray-400">•</span>
                                    <span 
                                        className="text-xs px-2 py-1 rounded-full text-white font-medium"
                                        style={{ backgroundColor: category.color }}
                                    >
                                        {category.name}
                                    </span>
                                </>
                            )}
                        </div>
                        
                        <h2 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors mb-2 line-clamp-2">
                            {title}
                        </h2>
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">
                            {excerpt || content.substring(0, 150) + '...'}
                        </p>
                        
                        {/* Tags */}
                        {tags && tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {tags.slice(0, 3).map((tag, index) => (
                                    <span 
                                        key={index}
                                        className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                                    >
                                        #{tag.name}
                                    </span>
                                ))}
                            </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{readTime || Math.ceil(content.length / 200)} min read</span>
                                <span>•</span>
                                <span>{likeCount} likes</span>
                                <span>•</span>
                                <span>{commentCount} comments</span>
                            </div>
                            
                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                    </svg>
                                </button>
                                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Cover Image */}
                    {coverImage && (
                        <div className="flex-shrink-0 w-32 h-24 bg-gray-200 rounded-lg overflow-hidden">
                            <img 
                                src={coverImage} 
                                alt={title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                    )}
                </div>
            </article>
        </Link>
    );
};

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500"></div>
}

export function getInitials(name: string): string {
    const words = name.split(' ');
    return words.map(word => word[0]).join('');
}