export interface Product { id: number; name: string; category: string; price: number; rating: number; type: string; color: string; tone: string; desc: string; tag: string; stock: boolean; }
export type SortOrder = 'featured' | 'low' | 'high' | 'rating' | 'name';
export interface Filters { query: string; categories: string[]; max: number; inStock: boolean; sort: SortOrder; }
