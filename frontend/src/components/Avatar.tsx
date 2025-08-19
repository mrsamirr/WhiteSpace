interface AvatarProps {
    name: string;
    size?: "small" | "medium" | "big";
    src?: string;
    className?: string;
}

export function Avatar({ name, size = "small", src, className = "" }: AvatarProps) {
    const sizeClasses = {
        small: "w-6 h-6 text-xs",
        medium: "w-8 h-8 text-sm",
        big: "w-10 h-10 text-base"
    };

    if (src) {
        return (
            <img 
                src={src} 
                alt={name}
                className={`rounded-full object-cover ${sizeClasses[size]} ${className}`}
            />
        );
    }

    return (
        <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-700 rounded-full ${sizeClasses[size]} ${className}`}>
            <span className="font-bold text-white">
                {getInitials(name)}
            </span>
        </div>
    );
}

export function getInitials(name: string): string {
    if (!name) return "?";
    const words = name.split(' ');
    return words.map(word => word[0]).join('').toUpperCase().slice(0, 2);
}