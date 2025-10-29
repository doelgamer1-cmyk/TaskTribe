export const formatDistanceToNow = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    return "just now";
};

export const formatTimeLeft = (deadline: Date): string => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();

    if (diff <= 0) return "Deadline passed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days > 1) return `${days} days left`;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
     if (hours > 1) return `${hours} hours left`;

    const minutes = Math.floor(diff / (1000 * 60));
    return `${minutes} minutes left`;
};