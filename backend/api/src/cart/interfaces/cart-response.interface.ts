export interface CartResponse {
    token: string;
    items: {
        productId: number;
        quantitiy: number;
        product:{ 
            id: number;
            name: string;
            category: string;
            technicalDetails: string;
            annualValue: number;
            photos: string[];
            createdAt: Date;
        }
    }[];
    totalItems: number;
    totalAmount: number;
}