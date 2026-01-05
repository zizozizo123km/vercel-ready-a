export function formatTime(timestamp: number): string {
    const now = new Date();
    const past = new Date(timestamp);
    const diff = now.getTime() - past.getTime();

    // Convert milliseconds to seconds, minutes, hours, days
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30.4375); // Average days in a month
    const years = Math.floor(days / 365.25);  // Average days in a year

    if (seconds < 5) {
        return "Just now";
    }
    if (seconds < 60) {
        return `${seconds}s`;
    }
    if (minutes < 60) {
        return `${minutes}m`;
    }
    if (hours < 24) {
        return `${hours}h`;
    }

    // If less than 7 days, show the day of the week or 'Yesterday'
    if (days < 7) {
        if (days === 1) {
            return 'Yesterday';
        }
        
        // Format as day of the week (e.g., 'Mon', 'Tue')
        const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        return dayNames[past.getDay()];
    }

    // If less than a year, show Month Day (e.g., 'Dec 15')
    if (days < 365) {
        // Facebook often shows the full year if it's not the current year, 
        // but if it's within the current year, it shows Mmm Day (e.g., Jun 5)
        
        const monthNames = ['Jan', 'Feb', 'Mar', 'May', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = monthNames[past.getMonth()];
        const day = past.getDate();
        
        // Check if the current year is the same as the post year
        if (now.getFullYear() === past.getFullYear()) {
             return `${month} ${day}`;
        }
    }

    // Default to Month Day, Year (e.g., 'Dec 15, 2023')
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[past.getMonth()];
    const day = past.getDate();
    const year = past.getFullYear();
    
    return `${month} ${day}, ${year}`;
}