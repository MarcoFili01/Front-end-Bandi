export interface Bando {
    id: number;
    status: 'Attivo' | 'In arrivo' | 'Chiuso';
    title: string;
    description: string;
    tags: string[];
    closingDate: string;
    financialAllocation: string;
    aidType: string;
    territory: string;
}