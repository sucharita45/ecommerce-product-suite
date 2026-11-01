import type { Product, Filters } from './product.model.ts';
export function filterProducts(products: readonly Product[], filters: Filters): Product[] {
 const q=filters.query.trim().toLowerCase();
 return products.filter(p=>(!q || `${p.name} ${p.desc} ${p.category}`.toLowerCase().includes(q)) && (!filters.categories.length || filters.categories.includes(p.category)) && p.price<=filters.max && (!filters.inStock || p.stock)).sort((a,b)=>filters.sort==='low'?a.price-b.price:filters.sort==='high'?b.price-a.price:filters.sort==='rating'?b.rating-a.rating:filters.sort==='name'?a.name.localeCompare(b.name):a.id-b.id);
}
export function normalizeCart(value: unknown, products: readonly Product[]): Record<number,number> {
 const result: Record<number,number>={};
 if(!value || typeof value!=='object' || Array.isArray(value)) return result;
 for(const p of products){const q=(value as Record<string,unknown>)[p.id];if(p.stock && typeof q==='number' && Number.isInteger(q) && q>0 && q<=99) result[p.id]=q;}
 return result;
}
