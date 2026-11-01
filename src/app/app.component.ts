import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CurrencyPipe, registerLocaleData } from '@angular/common';
import localeIn from '@angular/common/locales/en-IN';
import { FormsModule } from '@angular/forms';
import { StoreService } from './store.service';
import { ProductCardComponent } from './product-card.component';
registerLocaleData(localeIn);
@Component({selector:'app-root',standalone:true,imports:[CurrencyPipe,FormsModule,ProductCardComponent],changeDetection:ChangeDetectionStrategy.OnPush,templateUrl:'./app.component.html'})
export class AppComponent {readonly store=inject(StoreService);readonly filtersOpen=signal(false);closeOnBackdrop(event:MouseEvent,dialog:HTMLDialogElement){if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}}
