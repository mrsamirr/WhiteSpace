import { Link } from "react-router-dom";
import { useBlogs } from "../hooks";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";
import { CategoryCard } from "../components/CategoryCard";
import { TrendingCard } from "../components/TrendingCard";

export default function Home() {
    const { loading, blogs } = useBlogs();

    const featuredPosts = blogs.slice(0, 3);
    const trendingPosts = blogs.slice(3, 6);
    const recentPosts = blogs.slice(6, 12);

    const categories = [
        { name: "Technology", slug: "technology", color: "#3B82F6", count: 45 },
        { name: "Design", slug: "design", color: "#10B981", count: 32 },
        { name: "Business", slug: "business", color: "#F59E0B", count: 28 },
        { name: "Writing", slug: "writing", color: "#EF4444", count: 23 },
        { name: "Productivity", slug: "productivity", color: "#8B5CF6", count: 19 },
        { name: "Lifestyle", slug: "lifestyle", color: "#EC4899", count: 15 }
    ];

    return (
        <div className="min-h-screen bg-white">
            <Appbar />
            
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-gray-50 to-white py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                            Stay curious.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
                            Discover stories, thinking, and expertise from writers on any topic.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link 
                                to="/blogs"
                                className="bg-black hover:bg-gray-800 text-white font-medium px-8 py-4 rounded-full text-lg transition-colors"
                            >
                                Start reading
                            </Link>
                            <Link 
                                to="/publish"
                                className="border border-gray-300 hover:border-gray-400 text-gray-700 font-medium px-8 py-4 rounded-full text-lg transition-colors"
                            >
                                Write a story
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Posts */}
            {!loading && featuredPosts.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured stories</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredPosts.map((post, index) => (
                                <div key={post.id} className="group">
                                    <div className="aspect-[4/3] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                                        {post.coverImage ? (
                                            <img 
                                                src={post.coverImage} 
                                                alt={post.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                                                <span className="text-gray-500 text-2xl font-light">📝</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <span className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                                                {post.author.name?.charAt(0) || 'A'}
                                            </span>
                                            <span>{post.author.name || 'Anonymous'}</span>
                                            <span>•</span>
                                            <span>{post.readTime || 5} min read</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                                            <Link to={`/blog/${post.id}`}>
                                                {post.title}
                                            </Link>
                                        </h3>
                                        <p className="text-gray-600 line-clamp-2">
                                            {post.excerpt || post.content.substring(0, 120) + '...'}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Categories */}
            <section className="py-16 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Explore topics</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {categories.map((category) => (
                            <CategoryCard key={category.slug} category={category} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trending Posts */}
            {!loading && trendingPosts.length > 0 && (
                <section className="py-16 bg-white">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending on Medium</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {trendingPosts.map((post, index) => (
                                <TrendingCard key={post.id} post={post} rank={index + 1} />
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Recent Posts */}
            {!loading && recentPosts.length > 0 && (
                <section className="py-16 bg-gray-50">
                    <div className="container mx-auto px-4">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest stories</h2>
                        <div className="max-w-4xl mx-auto">
                            {recentPosts.map((post) => (
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
                    </div>
                </section>
            )}

            {/* Loading State */}
            {loading && (
                <div className="py-16">
                    <div className="container mx-auto px-4">
                        <div className="max-w-4xl mx-auto">
                            <BlogSkeleton />
                            <BlogSkeleton />
                            <BlogSkeleton />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
