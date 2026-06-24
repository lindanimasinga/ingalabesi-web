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
    this.updateMetaTags({
      title: 'Food Delivery & Restaurant Marketplace',
      description: 'Order food from your favorite restaurants and local vendors. iZinga Food Market delivers fresh meals, groceries, and specialty foods across South Africa.',
      keywords: 'food delivery, restaurant delivery, online ordering, South Africa, groceries, local vendors, fast food, meals',
      url: 'https://izinga.co.za',
      type: 'website'
    });
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