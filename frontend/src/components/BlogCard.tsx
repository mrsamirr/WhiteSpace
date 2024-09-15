import { Link } from "react-router-dom";

interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number;
    
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="p-4 border-b-[0.01rem] border-slate-200 pb-3  max-w screen-md cursor-pointer">
            <div className="flex">
                    <Avatar name={authorName} />
                <div className="font-extralight pl-2 flex justify-center flex-col text-sm">{authorName}</div>
                <div className="flex justify-center flex-col pl-2">
                    <Circle />
                </div>
            <div className="pl-2 font-thin text-slate-400 flex justify-center flex-col text-sm">
                    {publishedDate}
            </div>
            </div>
            <div className="text-xl font-bold font-sans pt-2">
                {title}
            </div> 
            <div className="text-md font-thin font-serif">
                {content.slice(0, 100)+"..."}
            </div>
            <div className="text-sm  font-thin text-slate-500 pt-4">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
        </div>

    </Link>
    

}

export function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}

export function Avatar({ name, size = "small" }: { name: string, size?: "small" | "big" }) {

    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-600 rounded-full ${size === "small" ? "w-6 h-6" : "w-10 h-10"}`}>
    <span className={`${size === "small" ? "text-xs" : "text-md"} font-extralight text-gray-600 dark:text-gray-300`}>
        {getInitials(name)}
    </span>
    </div>
    
}

export function getInitials(name: string): string {
    const words = name.split(' ');
    return words.map(word => word[0]).join('');
}
