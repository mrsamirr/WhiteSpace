import { Link } from "react-router-dom";

interface CategoryCardProps {
    category: {
        name: string;
        slug: string;
        color: string;
        count: number;
    };
}

export const CategoryCard = ({ category }: CategoryCardProps) => {
    return (
        <Link 
            to={`/category/${category.slug}`}
            className="group block p-6 bg-white rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
        >
            <div className="flex items-center justify-between mb-3">
                <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ backgroundColor: category.color }}
                >
                    {category.name.charAt(0)}
                </div>
                <span className="text-sm text-gray-500">{category.count}</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
                {category.name}
            </h3>
        </Link>
    );
};