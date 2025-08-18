import axios from "axios"
import { Appbar } from "../components/Appbar"
import { BACKEND_URL } from "../config"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [excerpt, setExcerpt] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [category, setCategory] = useState("");
    const [tags, setTags] = useState("");
    const [published, setPublished] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const categories = [
        { name: "Technology", value: "technology" },
        { name: "Design", value: "design" },
        { name: "Business", value: "business" },
        { name: "Writing", value: "writing" },
        { name: "Productivity", value: "productivity" },
        { name: "Lifestyle", value: "lifestyle" }
    ];

    const handleSubmit = async () => {
        if (!title.trim() || !content.trim()) {
            alert("Please fill in the title and content");
            return;
        }

        setIsSubmitting(true);
        try {
            const tagArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
            
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content,
                excerpt: excerpt || content.substring(0, 150) + '...',
                coverImage: coverImage || null,
                categoryId: category || null,
                tags: tagArray,
                published
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error('Failed to publish blog:', error);
            alert('Failed to publish blog. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Appbar />
            
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-white rounded-lg shadow-sm p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-8">Write a story</h1>
                    
                    {/* Title */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Title
                        </label>
                        <input 
                            type="text" 
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg"
                            placeholder="Your story title..."
                        />
                    </div>

                    {/* Cover Image */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Cover Image URL (optional)
                        </label>
                        <input 
                            type="url" 
                            value={coverImage}
                            onChange={(e) => setCoverImage(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category (optional)
                        </label>
                        <select 
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {categories.map((cat) => (
                                <option key={cat.value} value={cat.value}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Tags */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tags (optional)
                        </label>
                        <input 
                            type="text" 
                            value={tags}
                            onChange={(e) => setTags(e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="tag1, tag2, tag3"
                        />
                        <p className="text-sm text-gray-500 mt-1">Separate tags with commas</p>
                    </div>

                    {/* Excerpt */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Excerpt (optional)
                        </label>
                        <textarea 
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="A brief summary of your story..."
                        />
                    </div>

                    {/* Content */}
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Story
                        </label>
                        <TextEditor 
                            value={content}
                            onChange={(e) => setContent(e.target.value)} 
                        />
                    </div>

                    {/* Publish Options */}
                    <div className="mb-8">
                        <div className="flex items-center mb-4">
                            <input
                                type="checkbox"
                                id="published"
                                checked={published}
                                onChange={(e) => setPublished(e.target.checked)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="published" className="ml-2 block text-sm text-gray-900">
                                Publish immediately
                            </label>
                        </div>
                        <p className="text-sm text-gray-500">
                            {published 
                                ? "Your story will be published and visible to all readers."
                                : "Your story will be saved as a draft. You can publish it later from your dashboard."
                            }
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button 
                            onClick={handleSubmit}
                            disabled={isSubmitting || !title.trim() || !content.trim()}
                            className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                        >
                            {isSubmitting ? 'Publishing...' : (published ? 'Publish Story' : 'Save as Draft')}
                        </button>
                        
                        <button 
                            onClick={() => navigate('/dashboard')}
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function TextEditor({ value, onChange }: { 
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void 
}) {
    return (
        <div className="border border-gray-300 rounded-lg bg-white">
            <div className="px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span className="font-medium">Story Editor</span>
                    <span className="text-gray-400">|</span>
                    <span>{value.length} characters</span>
                </div>
            </div>
            <div className="p-4">
                <textarea 
                    value={value}
                    onChange={onChange}
                    rows={12}
                    className="w-full focus:outline-none text-gray-800 bg-white resize-none text-base leading-relaxed"
                    placeholder="Tell your story..."
                />
            </div>
        </div>
    );
}