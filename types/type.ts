export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
}

export interface ErrorResponse {
    message: string;
    errors?: {
            field: string;
            message: string;
    }[];
}

export interface DetectionResult {
    message: String;
    colors: {
        hex: string;
        rgb: string;
        hsl: string;
        name: string;
    }[]
}

export interface History {
    id : string;
    _id?: string;
    colors: 
        {
        hex: string;
        rgb: string;
        hsl: string;
        name: string;
    }[];
    image?: string;
    detectedAt: string | Date;
    user?: number;
    onDelete: (id: string) => Promise<void>;
    loading?: boolean;
}

export interface Message {
    id?: string;
    text?: string;
    sender?: 'user' | 'bot';
    reply?: string;
    colors?: string[];
}

export interface FAQItem {
    id: number;
    question: string;
    answer: string;
    icon: keyof typeof MaterialIcons.glyphMap;
}

export interface HistoryDetailData {
    _id: string;
    colors: {
        hex: string;
        rgb: string;
        hsl: string;
        name: string;
    }[];
    image?: string;
    detectedAt: string;
    user?: string;
}