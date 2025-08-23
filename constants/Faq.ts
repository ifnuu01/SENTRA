import { FAQItem } from "@/types/type";

export const faqData: FAQItem[] = [
    {
        id: 1,
        question: "Apa itu SENTRA dan bagaimana cara kerjanya?",
        answer: "SENTRA adalah aplikasi deteksi warna yang menggunakan kecerdasan buatan untuk membantu penyandang tunanetra mengidentifikasi warna objek di sekitar mereka. Arahkan kamera ke objek, dan sistem akan mendeteksi serta menyebutkan nama warna dengan suara.",
        icon: "palette"
    },
    {
        id: 2,
        question: "Bagaimana cara menggunakan deteksi warna?",
        answer: "Buka aplikasi, arahkan kamera ke objek yang ingin diketahui warnanya. Pastikan objek terlihat jelas di layar, lalu ketuk tombol deteksi. Aplikasi akan menganalisis warna dan memberitahu Anda hasilnya melalui suara.",
        icon: "camera-alt"
    },
    {
        id: 3,
        question: "Apakah SENTRA bisa mendeteksi semua jenis warna?",
        answer: "Ya, SENTRA dapat mendeteksi berbagai macam warna termasuk warna dasar (merah, biru, hijau, kuning), warna campuran (ungu, orange, pink), dan bahkan gradasi warna seperti biru muda atau hijau tua.",
        icon: "color-lens"
    },
    {
        id: 4,
        question: "Bagaimana cara menggunakan fitur chatbot?",
        answer: "Fitur chatbot membantu Anda bertanya tentang warna atau meminta bantuan menggunakan aplikasi. Ketik pertanyaan seperti 'Apa warna objek ini?' atau 'Bagaimana cara deteksi warna?' dan chatbot akan membantu Anda.",
        icon: "chat"
    },
    {
        id: 5,
        question: "Dimana saya bisa melihat riwayat deteksi warna?",
        answer: "Semua hasil deteksi warna tersimpan di menu 'Riwayat'. Di sana Anda dapat melihat kembali warna-warna yang pernah dideteksi, beserta waktu dan lokasi deteksinya.",
        icon: "history"
    },
    {
        id: 6,
        question: "Apakah aplikasi ini bekerja dalam kondisi cahaya gelap?",
        answer: "Deteksi warna akan lebih akurat dalam kondisi cahaya yang cukup. Untuk hasil terbaik, gunakan aplikasi di tempat yang memiliki pencahayaan baik atau aktifkan flash pada ponsel Anda.",
        icon: "lightbulb"
    },
    {
        id: 7,
        question: "Bisakah saya mengubah bahasa suara yang digunakan?",
        answer: "Ya, Anda dapat mengatur bahasa dan jenis suara di menu Pengaturan. Tersedia pilihan suara pria/wanita dan beberapa bahasa untuk mempermudah penggunaan sesuai preferensi Anda.",
        icon: "record-voice-over"
    },
    {
        id: 8,
        question: "Apakah data deteksi saya aman dan pribadi?",
        answer: "Ya, kami sangat menjaga privasi Anda. Semua data deteksi warna disimpan secara lokal di perangkat dan tidak dibagikan kepada pihak ketiga. Kami hanya menggunakan data untuk meningkatkan akurasi deteksi.",
        icon: "security"
    },
    {
        id: 9,
        question: "Bagaimana jika hasil deteksi warna tidak akurat?",
        answer: "Pastikan objek terlihat jelas, tidak terlalu gelap atau terlalu terang. Cobalah deteksi dari jarak yang berbeda atau dengan pencahayaan yang lebih baik. Anda juga bisa mengkalibrasi kamera di pengaturan.",
        icon: "tune"
    },
    {
        id: 10,
        question: "Apakah SENTRA dapat digunakan tanpa koneksi internet?",
        answer: "Tidak, SENTRA memerlukan koneksi internet untuk mengakses fitur deteksi warna dan pembaruan data.",
        icon: "wifi-off"
    }
];
