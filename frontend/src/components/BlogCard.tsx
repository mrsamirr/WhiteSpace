
interface BlogCardProps {
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
    id: number
    
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <div className="p-4 border-b border-slate-200 pb-4">
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
    

}

function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
export function Avatar({ name, size = 5 }: { name: string, size?: number }) {
    return <div className={`relative inline-flex items-center justify-center w-${size} h-${size} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
        <span className="font-sx font-extralight text-gray-600 dark:text-gray-300">{name[0]}</span>
    </div>
    
}