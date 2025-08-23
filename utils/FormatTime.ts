export default function formatTime(timeString: string): string {
    if (!timeString) return '';
    
    try {
        const date = new Date(timeString);
        
        // Validasi apakah date valid
        if (isNaN(date.getTime())) {
            return '';
        }
        
        const now = new Date();
        
        const isSameDay = date.toDateString() === now.toDateString();
        
        if (isSameDay) {
            // Perbaikan: hapus 'day' dari options karena hanya ingin menampilkan waktu
            return date.toLocaleTimeString('id-ID', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            });
        } else {
            const yesterday = new Date(now);
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (date.toDateString() === yesterday.toDateString()) {
                return 'Kemarin';
            } else {
                return date.toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                });
            }
        }
    } catch (error) {
        return '';
    }
}