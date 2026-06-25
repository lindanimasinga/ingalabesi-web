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
    this.metaService.updateTag({ name: 'description', content: 'Order flame grilled chicken online from Ingalabesi The Chicken King. Delivering to Umlazi, Nsimbini, Folweni and Mkhazini. Book a braai master for your next event in Durban.' });
    this.metaService.updateTag({ name: 'keywords', content: 'Ingalabesi, flame grilled chicken, order chicken online, braai master Durban, event catering Durban, food delivery Umlazi, food delivery Nsimbini, food delivery Folweni, food delivery Mkhazini, chicken delivery Durban South' });
    this.metaService.updateTag({ property: 'og:title', content: 'Ingalabesi The Chicken King | Order Online' });
    this.metaService.updateTag({ property: 'og:description', content: 'Order flame grilled chicken online. Delivering to Umlazi, Nsimbini, Folweni and Mkhazini. Book a braai master for events in Durban.' });
    this.metaService.updateTag({ property: 'og:url', content: 'https://www.ingalabesi.co.za' });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
  }

  setMenuSEO() {
    this.titleService.setTitle('Menu | Ingalabesi The Chicken King');
    this.metaService.updateTag({ name: 'description', content: 'Browse our full menu of flame grilled chicken, wings, burgers and more. Order online for delivery to Umlazi, Nsimbini, Folweni and Mkhazini.' });
  }

  setItemSEO(itemName: string, price: number) {
    this.titleService.setTitle(`${itemName} | Ingalabesi The Chicken King`);
    this.metaService.updateTag({ name: 'description', content: `Order ${itemName} for R${price.toFixed(2)} from Ingalabesi The Chicken King. Fast delivery across Durban South.` });
  }

  setProductPageSEO(productName: string, productDescription: string, productImage?: string) {
    this.updateMetaTags({
      title: productName,
      description: productDescription,
      image: productImage || 'https://izinga.co.za/assets/images/default-food.jpg',
      keywords: `${productName}, food delivery, restaurant, South Africa, order online`,
      type: 'product'
    });
  }

  setCategoryPageSEO(categoryName: string) {
    this.updateMetaTags({
      title: `${categoryName} Food Delivery`,
      description: `Order ${categoryName.toLowerCase()} from top restaurants and vendors. Fast delivery across South Africa with iZinga Food Market.`,
      keywords: `${categoryName}, food delivery, restaurants, online ordering, South Africa`,
      type: 'website'
    });
  }

  setCheckoutPageSEO() {
    this.updateMetaTags({
      title: 'Secure Food Order Checkout',
      description: 'Complete your food order with secure payment and fast delivery. Track your order in real-time.',
      keywords: 'food checkout, secure payment, food delivery, order tracking, South Africa',
      type: 'website'
    });
  }

  setOrderPageSEO() {
    this.updateMetaTags({
      title: 'My Food Orders',
      description: 'Track your food orders and view order history. Manage your deliveries with iZinga Food Market.',
      keywords: 'food orders, order tracking, delivery status, restaurant orders, South Africa',
      type: 'website'
    });
  }

  setRestaurantPageSEO(restaurantName: string, cuisine?: string) {
    this.updateMetaTags({
      title: `${restaurantName} - Food Delivery`,
      description: `Order from ${restaurantName}${cuisine ? ` serving ${cuisine} cuisine` : ''} with fast delivery through iZinga Food Market.`,
      keywords: `${restaurantName}, food delivery, ${cuisine || 'restaurant'}, online ordering, South Africa`,
      type: 'website'
    });
  }

  setMenuPageSEO(restaurantName: string, itemCount?: number) {
    this.updateMetaTags({
      title: `${restaurantName} Menu - Order Online`,
      description: `Browse ${restaurantName}'s menu${itemCount ? ` with ${itemCount}+ items` : ''} and order for delivery or pickup through iZinga Food Market.`,
      keywords: `${restaurantName} menu, food delivery, restaurant menu, order online, South Africa`,
      type: 'website'
    });
  }
}