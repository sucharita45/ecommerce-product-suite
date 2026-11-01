import { Injectable, computed, signal } from '@angular/core';
import { PRODUCTS } from './products.data';
import { filterProducts, normalizeCart } from './catalog';
import type { Product, Filters } from './product.model';
@Injectable({providedIn:'root'})
export class StoreService {
 readonly products=PRODUCTS;
 readonly categories=[...new Set(PRODUCTS.map(p=>p.category))];
 readonly filters=signal<Filters>({query:'',categories:[],max:6000,inStock:false,sort:'featured'});
 readonly page=signal(1); readonly pageSize=6;
 readonly filtered=computed(()=>filterProducts(PRODUCTS,this.filters()));
 readonly pageCount=computed(()=>Math.ceil(this.filtered().length/this.pageSize));
 readonly pages=computed(()=>Array.from({length:this.pageCount()},(_,i)=>i+1));
 readonly visible=computed(()=>this.filtered().slice((this.page()-1)*this.pageSize,this.page()*this.pageSize));
 readonly cart=signal<Record<number,number>>(this.load());
 readonly lines=computed(()=>PRODUCTS.filter(p=>this.cart()[p.id]).map(product=>({product,quantity:this.cart()[product.id]})));
 readonly count=computed(()=>this.lines().reduce((sum,l)=>sum+l.quantity,0));
 readonly total=computed(()=>this.lines().reduce((sum,l)=>sum+l.product.price*l.quantity,0));
 readonly message=signal(''); private timer: ReturnType<typeof setTimeout>|undefined;
 update(patch:Partial<Filters>){this.filters.update(f=>({...f,...patch}));this.page.set(1);}
 toggleCategory(category:string){const cats=this.filters().categories;this.update({categories:cats.includes(category)?cats.filter(c=>c!==category):[...cats,category]});}
 reset(){this.update({query:'',categories:[],max:6000,inStock:false,sort:'featured'});}
 setPage(page:number){this.page.set(Math.max(1,Math.min(page,this.pageCount()||1)));}
 categoryCount(category:string){return PRODUCTS.filter(p=>p.category===category).length;}
 add(product:Product){if(!product.stock)return;const q=this.cart()[product.id]||0;if(q>=99){this.notify('Maximum quantity is 99 per product.');return;}this.changeQuantity(product.id,1);this.notify(product.name+' added to your bag.');}
 changeQuantity(id:number,delta:number){const p=PRODUCTS.find(p=>p.id===id);if(!p?.stock)return;const next={...this.cart()},q=(next[id]||0)+delta;if(q>99)return;if(q<=0)delete next[id];else next[id]=q;this.cart.set(next);this.persist();}
 remove(id:number){const next={...this.cart()};delete next[id];this.cart.set(next);this.persist();}
 clear(){this.cart.set({});this.persist();this.notify('Your bag has been cleared.');}
 notify(text:string){this.message.set(text);clearTimeout(this.timer);this.timer=setTimeout(()=>this.message.set(''),2600);}
 private load(){try{return normalizeCart(JSON.parse(localStorage.getItem('suchi-angular20-cart')||'{}'),PRODUCTS);}catch{return {};}}
 private persist(){try{localStorage.setItem('suchi-angular20-cart',JSON.stringify(this.cart()));}catch{this.notify('Bag updated for this visit. Browser storage is unavailable.');}}
}
