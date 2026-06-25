import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  updateTitle(title: string) {
    this.titleService.setTitle(title);
  }

  updateMetaTags(config: {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    keywords?: string;
    type?: string;
  }) {
    // Update title if provided
    if (config.title) {
      this.updateTitle(`${config.title} | iZinga Food Market`);
      this.metaService.updateTag({ property: 'og:title', content: config.title });
      this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    }

    // Update description
    if (config.description) {
      this.metaService.updateTag({ name: 'description', content: config.description });
      this.metaService.updateTag({ property: 'og:description', content: config.description });
      this.metaService.updateTag({ name: 'twitter:description', content: config.description });
    }

    // Update image
    if (config.image) {
      this.metaService.updateTag({ property: 'og:image', content: config.image });
      this.metaService.updateTag({ name: 'twitter:image', content: config.image });
    }

    // Update URL
    if (config.url) {
      this.metaService.updateTag({ property: 'og:url', content: config.url });
      this.metaService.updateTag({ name: 'twitter:url', content: config.url });
      this.metaService.updateTag({ rel: 'canonical', href: config.url });
    }

    // Update keywords
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Update Open Graph type
    if (config.type) {
      this.metaService.updateTag({ property: 'og:type', content: config.type });
    }
  }

  updateStructuredData(data: any) {
    // Remove existing structured data
    const existingScript = document.querySelector('script[type="application/ld+json"]#dynamic-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'dynamic-schema';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  // Page-specific SEO configurations
  setHomePageSEO() {
    this.titleService.setTitle('Ingalabesi The Chicken King | Order Flame Grilled Chicken Online');
    this.metaService.updateTag({ name: 'description', content: 'Order flame grilled chicken online from Ingalabesi The Chicken King. Collect from our store. Book a braai master for your next event in Durban.' });
    this.metaService.updateTag({ name: 'keywords', content: 'Ingalabesi, flame grilled chicken, order online, collect online order, braai master Durban, event catering Durban, chicken Umlazi, order online Nsimbini, chicken Folweni, chicken Mkhazini, chicken Durban South' });
    this.metaService.updateTag({ property: 'og:title', content: 'Ingalabesi The Chicken King | Order Online' });
    this.metaService.updateTag({ property: 'og:description', content: 'Order flame grilled chicken online and collect from our store. Book a braai master for your next event in Durban.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://www.ingalabesi.co.za' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }

  setMenuSEO() {
    this.titleService.setTitle('Menu | Ingalabesi The Chicken King');
    this.metaService.updateTag({ name: 'description', content: 'Browse our full menu of flame grilled chicken, wings, burgers and more. Order online and collect from our store.' });
  }

  setItemSEO(itemName: string, price: number) {
    this.titleService.setTitle(`${itemName} | Ingalabesi The Chicken King`);
    this.metaService.updateTag({ name: 'description', content: `Order ${itemName} for R${price.toFixed(2)} from Ingalabesi The Chicken King. Order online and collect from our store.` });
  }

  setProductPageSEO(productName: string, productDescription: string, productImage?: string) {
    this.updateMetaTags({
      title: productName,
      description: productDescription,
      image: productImage || 'https://www.ingalabesi.co.za/assets/images/ingalabesi-hero.jpg',
      keywords: `${productName}, order online, collect online order, Ingalabesi, South Africa`,
      type: 'product'
    });
  }

  setCategoryPageSEO(categoryName: string) {
    this.updateMetaTags({
      title: `${categoryName} | Ingalabesi The Chicken King`,
      description: `Order ${categoryName.toLowerCase()} from Ingalabesi The Chicken King. Order online and collect from our store in Durban South.`,
      keywords: `${categoryName}, order online, collect online order, Ingalabesi, Durban South`,
      type: 'website'
    });
  }

  setCheckoutPageSEO() {
    this.updateMetaTags({
      title: 'Checkout | Ingalabesi The Chicken King',
      description: 'Complete your order from Ingalabesi The Chicken King with secure payment. Collect from our store.',
      keywords: 'checkout, secure payment, order online, collect, Ingalabesi',
      type: 'website'
    });
  }

  setOrderPageSEO() {
    this.updateMetaTags({
      title: 'My Orders | Ingalabesi The Chicken King',
      description: 'Track your orders and view your order history at Ingalabesi The Chicken King.',
      keywords: 'order tracking, order history, Ingalabesi, collect online order',
      type: 'website'
    });
  }

  setRestaurantPageSEO(restaurantName: string, cuisine?: string) {
    this.updateMetaTags({
      title: `${restaurantName} | Ingalabesi The Chicken King`,
      description: `Order ${cuisine ? `${cuisine} ` : ''}from ${restaurantName}. Order online and collect from our store.`,
      keywords: `${restaurantName}, order online, ${cuisine || 'restaurant'}, collect, Durban South`,
      type: 'website'
    });
  }

  setMenuPageSEO(restaurantName: string, itemCount?: number) {
    this.updateMetaTags({
      title: `${restaurantName} Menu | Order Online`,
      description: `Browse ${restaurantName}'s menu${itemCount ? ` with ${itemCount}+ items` : ''}. Order online and collect from our store.`,
      keywords: `${restaurantName} menu, order online, collect online order, Ingalabesi`,
      type: 'website'
    });
  }
}