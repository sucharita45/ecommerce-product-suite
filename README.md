# Product Discovery & Filters - Angular 20

A runnable Angular 20 portfolio demonstration for Sucharita Swarnakar.

## Run
Open a terminal in `D:\Suchi Project`, then run:
```powershell
npm start
```
Visit http://127.0.0.1:4200. This is an Angular application: use its local server instead of opening an HTML file directly.

Dependencies are installed. On a fresh machine use `npm ci` first. Node.js 24 is used for this project.

## Commands
- `npm start`: Angular development server with live reload.
- `npm run build`: optimized production build in `dist/discovery/browser`.
- `npm test`: catalog/filter and cart-validation tests using Node 24's TypeScript support.

## Structure
- `src/app/app.component.*`: Angular template, page controls, and cart dialog.
- `src/app/product-card.component.ts`: reusable product card with typed input/output.
- `src/app/store.service.ts`: injectable service; signals, computed state, cart persistence.
- `src/app/catalog.ts`: typed filtering, sorting, and persisted-cart validation.
- `src/app/products.data.ts`: 18 fictional demo products.
- `public/products/`: local SVG illustrations, lazy-loaded in product cards.
- `tests/catalog.test.ts`: behavior tests.

## Features
Live search; multiple category filters; maximum-price and availability filters; featured/price/rating/name sorts; six products per page; cart quantities, removal, subtotal, and localStorage persistence; responsive layouts and mobile filters; keyboard-accessible native modal and live status messages.

## Scope
Uses Angular 20 standalone components, TypeScript, Angular Forms, signals/computed state, and zoneless change detection. It is a new demonstration inspired by the resume, not the original source project. It uses local sample data rather than a live REST API. Prices and ratings are illustrative. No checkout, payment, authentication, or real orders. Browser storage may be restricted; cart still works for the current visit. The old plain-HTML demo is retained separately as `standalone-demo.html` for reference.
