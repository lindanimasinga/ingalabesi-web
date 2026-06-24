import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage-service.service';
import { IzingaOrderManagementService } from '../service/izinga-order-management.service';
import { SeoService } from '../service/seo.service';
import { StoreProfile, Stock, Promotion } from '../model/models';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { Utils } from '../utils/utils';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  images: string[]
  promotions: Promotion[] = []
  categories: Set<string> = new Set<string>()
  shop: StoreProfile;
  startOrder = false;
  searchItems: Stock[] = [];
  searchTerm = '';
  isLoadingStock = true;

  constructor(
    protected izingaService: IzingaOrderManagementService, 
    protected storage: StorageService, 
    protected activatedRoute: ActivatedRoute, 
    private router: Router, 
    private sanitizer: DomSanitizer,
    private seoService: SeoService
  ) {
  }

  ngOnInit() {
    // Set SEO for home page
    this.seoService.setHomePageSEO();

    // Prefer route store id when present, otherwise fall back to cached/current single-store config.
    const routeStoreId = this.activatedRoute.snapshot.paramMap.get('shortname');
    const resolvedStoreId = routeStoreId || this.storage.currentStoreId || environment.storeId;

    if (resolvedStoreId != this.storage.basket?.storeId) {
      this.storage.clearOrder()
    }

    this.izingaService.getStoreById(resolvedStoreId)
    .subscribe(shop => {
      this.shop = shop;
      this.storage.shop = shop;
      this.storage.currentStoreId = shop?.id || resolvedStoreId;

      const stockList = [...(this.shop?.stockList || [])]
        .sort((a, b) => this.isPromotion(a) ? -1 : 1);
      this.shop.stockList = stockList;
      
      // Update SEO with store-specific information
      this.seoService.updateMetaTags({
        title: `${shop.name} - Food Delivery`,
        description: `Order from ${shop.name} through iZinga Food Market. Fresh meals, fast delivery across South Africa. Browse menu and order online now.`,
        keywords: `${shop.name}, food delivery, restaurant delivery, ${shop.name} menu, South Africa, order online, fast food`
      });
      
      this.categories = new Set(stockList.map(stk => stk.group).filter(group => !!group));
      this.isLoadingStock = false;
      
      //get promotions
      this.izingaService.getAllPromotionsByStoreId(this.shop.id)
          .subscribe(promotions => {
            this.promotions = promotions
          })
    }, () => {
      this.isLoadingStock = false;
      this.storage.errorMessage = 'Unable to load menu items right now. Please try again.';
    })
  }

  ngAfterViewInit() {
    //this.initCarousel()
  }

  get store(): StoreProfile {
    return this.shop
  }

  get cssImageUrl(): string {
    var image = this.sanitizer.bypassSecurityTrustStyle(this.store.imageUrl)
    return `url('${this.store.imageUrl}')`
  }

  shopItems(category?: string): Stock[] {
    return this.shop?.stockList.filter(item => item.group?.toLowerCase() == category?.toLowerCase()) || []
  }

  shopItemsByName(name?: string) {
    this.searchTerm = (name || '').trim();
    if (!this.searchTerm) {
      this.searchItems = [];
      return;
    }

    const normalizedName = this.searchTerm.toLowerCase();
    this.searchItems = this.shop?.stockList.filter(item => item.name?.toLowerCase().includes(normalizedName)) || []
  }

  get hasStockItems(): boolean {
    return (this.shop?.stockList?.length || 0) > 0;
  }

  get hasSearchTerm(): boolean {
    return this.searchTerm.length > 0;
  }

  get showNoSearchResults(): boolean {
    return this.hasSearchTerm && this.searchItems.length === 0;
  }

  get showNoStockItems(): boolean {
    return !this.hasSearchTerm && !this.isLoadingStock && !this.hasStockItems;
  }

  hasItemsInCart(): boolean {
    return this.storage.basket != null && 
      this.storage.basket.storeName == this.shop?.name &&
      this.storage.basket.items.length > 0;
  }

  get cartNumberOfItems() { 
    return this.storage.basket != null? this.storage.basket.items?.length : 0;
  }

  isPromotion(stock: Stock): boolean {
    return this.isPromotionCategory(stock.group)
  }

  isPromotionCategory(category?: string): boolean {
    var promoTags = ["deal", "special", "promotion", "promotions", "deals", "specials", "family meals", "featured items"]
    return promoTags.includes(category?.toLowerCase())
  }

  replaceSpecialChars(input?: string): string {
    return input?.replace(/[^a-zA-Z0-9]/g, '_');
  }

  expandedCategories: Set<string> = new Set();

  toggleCategory(cat: string): void {
    if (this.expandedCategories.has(cat)) {
      this.expandedCategories.delete(cat);
    } else {
      this.expandedCategories.add(cat);
    }
  }

  isCategoryExpanded(cat: string): boolean {
    if (this.isPromotionCategory(cat)) return true;
    return this.expandedCategories.has(cat);
  }

}
