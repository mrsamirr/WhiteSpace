import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="font-bold text-xl">
                Medium
        </div>
        <div>
             <Avatar name="Md Samerr Ansari" size={6} />
        </div>
    </div>
}