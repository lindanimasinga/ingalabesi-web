---
name: cs-lifestyle-food-delivery-developer
description: >
  Angular food delivery web app developer skill for cs-lifestyle. Use when building features,
  fixing bugs, or understanding flows across store browsing, cart, checkout, shipping, payment,
  order tracking, login/OTP, Firebase auth, push notifications, Ukheshe wallet, Ozow/PayFast/Yoco
  payment gateways, shopping lists, promotions, and the Izinga backend API.
  Includes architecture, data models, service contracts, routing, and design patterns.
argument-hint: "Describe the feature, bug, screen, or flow you are working on"
---

# CS-Lifestyle Food Delivery Developer Skill

## Project Location
`/Users/lindanimasinga/Documents/GitHub/cs-lifestyle`

## Tech Stack
- **Framework**: Angular (template-driven forms, NgRx-free, localStorage state)
- **Language**: TypeScript
- **Styling**: CSS (component-scoped), no CSS framework
- **Backend**: iZinga REST API (`environment.izingaUrl`)
- **Auth**: Firebase Authentication (phone OTP)
- **Push Notifications**: Firebase Cloud Messaging (FCM)
- **Payment Gateways**: Yoco (primary), Ozow, PayFast, Ukheshe wallet
- **Maps**: Google Places API (address autocomplete)
- **Hosting**: Firebase Hosting

---

## 1. App Architecture

### Module Structure
All components declared in `AppModule` (`src/app/app.module.ts`). No lazy loading — all routes are eagerly loaded.

### State Management
**No NgRx or BehaviorSubject store.** All shared state lives in `StorageService` backed by `localStorage`. Components inject `StorageService` directly to read/write state.

### Key localStorage Keys (obfuscated)
```typescript
USER_PROFILE_KEY   = "sdfwefdsfsd"      // UserProfile
STORE_PROFILE_KEY  = "mbasdrtyw"        // Current StoreProfile
BASKET_KEY         = "sdfsdfljsdf"      // Basket (cart)
ORDER_KEY          = "fuiwerfbsk"       // Current Order
CURRENT_LOCATION   = "kfjhdyrbvsl"     // CurrentLocation (lat/long)
TOKEN_KEY          = "vm1xcnvfoiwerw"  // FCM push token
PHONE_VERIFIED_KEY = "lkjhsdbvskd"    // boolean
PHONE_NUMBER_KEY   = "knsdevwruweildkf"
SHOPPINGLIST_KEY   = "knsdev34w4ei5ldkf"
```

---

## 2. Routing

File: `src/app/app-routing.module.ts`

The app supports two top-level route patterns:
- `/` → `IzingaHomeComponent` (marketplace / all stores)
- `/:shortname` → `MainComponent` wrapping store-specific routes

### All Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `IzingaHomeComponent` | Multi-store marketplace landing |
| `/:shortname` | `MainComponent` | Store-specific shell |
| `/login` | `LoginComponent` | OTP phone verification |
| `/dashboard` | `DashboardComponent` | User profile hub |
| `/user/:id` | `UserProfileComponent` | Account settings |
| `/item/:id` | `ShopItemDescrComponent` | Menu item detail & add to cart |
| `/cart` | `CheckoutComponent` | Shopping cart review |
| `/shipping` | `ShippingComponent` | Delivery address & order creation |
| `/payment` | `PaymentComponent` | Payment callback handler |
| `/orders` | `OrdersComponent` | Order history list |
| `/order/:id` | `OrderItemHistoryComponent` | Order tracking detail |
| `/stores` | `StoresComponent` | All stores (marketplace) |
| `/recurring` | `RecurringShoppingComponent` | Saved shopping lists |
| `/recurring-form` | `RecurringShoppingFormComponent` | Create recurring order |
| `/recurring-form/:id` | `RecurringShoppingFormComponent` | Edit recurring order |
| `/contact` | `ContactUsComponent` | Contact info |
| `/terms-conditions` | `TermsConditionsComponent` | Legal terms |
| `/printable` | `PrintableMenuComponent` | Print-friendly menu |

**Router config:** `scrollPositionRestoration: 'enabled'` — page auto-scrolls to top on navigation.

---

## 3. Key Services

### `IzingaOrderManagementService`
File: `src/app/service/izinga-order-management.service.ts`

**Base URL:** `environment.izingaUrl`

**Default Headers:**
```typescript
{
  "Content-type": "application/json",
  "app-version": environment.appVersion  // e.g. "2.1.2"
}
```

**Store API methods:**
```typescript
getStoreById(id: string)                                 // GET /store/{id}
getAllStores(lat, long, range)                            // GET /store?storeType=FOOD&range=...
getAllStoresNamesAndLogos(lat, long, range)               // GET /store/names?storeType=FOOD&...
getAllShopsStock(lat, long, range)                        // GET /store/stock-flattened?storeType=FOOD&...
```

**Order API methods:**
```typescript
startOrder(order: Order)                                 // POST /order
finishOrder(order: Order)                                // PATCH /order/{id}
getOrderById(orderId: string)                            // GET /order/{id}
getAllOrdersByMobileNumber(mobileNumber)                  // GET /order?phone={mobileNumber}
getAllOrdersByCustomer(customerId)                        // GET /order?userId={customerId}
```

**User API methods:**
```typescript
registerCustomer(userProfile: UserProfile)               // POST /user
getCustomerByPhoneNumber(mobileNumber)                   // GET /user/{mobileNumber}
getCustomerById(customerId)                              // GET /user/{customerId}
findNearbyMessangers(lat, long, range)                   // GET /user?latitude=...&longitude=...&role=MESSENGER
```

**Promotion API methods:**
```typescript
getAllPromotionsByStoreId(storeId)                       // GET /promotion?storeId={storeId}
getAllPromotions(lat, long, range)                        // GET /promotion?storeType=FOOD
```

**Shopping List API methods:**
```typescript
createShoppingList(shoppingList: ShoppingList)           // POST /shopping-list
findShoppingLists(userId)                                // GET /shopping-list?userId={userId}
findShoppingList(id)                                     // GET /shopping-list/{id}
deleteShoppingList(listId)                               // DELETE /shopping-list/{listId}
```

**Error handling:** All calls pipe through `catchError()`, storing the message in `StorageService.errorMessage`.

---

### `StorageService`
File: `src/app/service/storage-service.service.ts`

**Inject this service** to read/write shared app state. Do not use `localStorage` directly.

**Key methods:**
```typescript
addToCart(basketItem: BasketItem)         // Adds item; creates basket if null
removeFromCart(name: string)              // Removes by name
clearOrder()                              // Clears basket + order
logout()                                  // Clears all user session data
addToShoppingList(item: ShoppingItem)     // Adds to recurring list
clearShoppingList()                       // Resets shopping list
```

**Key properties:**
```typescript
userProfile: UserProfile        // get/set current user
shop: StoreProfile              // get/set current store
basket: Basket                  // get/set cart
order: Order                    // get/set active order
currentLocation: CurrentLocation // { lat, long }
fcmToken: string                // Firebase push token
errorMessage: string            // Last API error
jwt: string                     // Ukheshe auth token
ukhesheUser: UkhesheUser        // Ukheshe wallet account
```

---

### `FirebaseService`
File: `src/app/service/firebase.service.ts`

**Firebase project:** `ijudi-d19bd`

**Key methods:**
```typescript
createCapture()                           // Init reCAPTCHA in #recaptcha-container
requestVerification(phoneNumber: string)  // OTP → firebase.auth().signInWithPhoneNumber()
confirmCode(code: string)                 // Verify OTP → ConfirmationResult.confirm(code)
requestPermission()                       // Get FCM token (VAPID key required)
listen()                                  // Foreground push message listener
```

**VAPID Key:** `BBTAcjDdxSYob_-MRhZiBbrzOaW4qvyLQjHiZEsmVq8S3LXHZMrXBvsixmiIs8VYVFrlRaaZUeEPEGuUc-pM39A`

**DOM requirement:** HTML must have `<div id="recaptcha-container"></div>` for phone auth.

---

### `PaymentService`
File: `src/app/service/payment.service.ts`

**Ozow gateway:**
```typescript
generatePaymentUrl(order: Order, shopName: string)
// POST https://api.ozow.com/PostPaymentRequest
// Hash: SHA-512(all fields + privateKey) via crypto-js
// SiteCode: "CUR-CEL-001"
```

**Static helper:**
```typescript
PaymentService.generateReference(orderId, userId)
// Returns "{orderId}:{userId}"
```

**Callback URLs pattern:**
```
success/cancel/error → {window.location.origin}/payment
notify → https://h1eub1c3w8.execute-api.af-south-1.amazonaws.com/default
```

---

### `UkhesheService`
File: `src/app/service/ukheshe.service.ts`

**Base URL:** `https://api.ukheshe.co.za`

```typescript
login(username, password)      // POST /authentication/login → stores JWT
userInfo(mobileNumber)         // GET /customers?username={mobileNumber}
payForOrder(order: Order)      // Transfer from customer to store main account
// toAccountId: environment.ukhesheMainShopAccount (store's phone e.g. "0812815707")
```

---

## 4. Data Models

### `Order`
File: `src/app/model/order.ts`

```typescript
{
  id?: string
  basket: Basket
  customerId: string
  shopId: string
  stage: Order.StageEnum          // STAGE_0_CUSTOMER_NOT_PAID ... STAGE_7_ALL_PAID
  orderType: Order.OrderTypeEnum  // ONLINE | INSTORE
  paymentType?: string            // UKHESHE | CASH | OZOW | PAYFAST | YOCO
  shippingData: ShippingData
  basketAmount?: number
  serviceFee?: number
  totalAmount?: number
  description?: string            // "ord-{phone}" before payment; "{provider}-{txId}" after
  freeDelivery?: boolean
  hasVat?: boolean
}
```

**Order Stages (in sequence):**
```
STAGE_0_CUSTOMER_NOT_PAID      → Not Paid (teal)
STAGE_1_WAITING_STORE_CONFIRM  → Waiting Confirmation (red-orange)
STAGE_2_STORE_PROCESSING       → Processing (orange)
STAGE_3_READY_FOR_COLLECTION   → Driver Collecting (blue)
STAGE_4_ON_THE_ROAD            → Arriving (gray)
STAGE_5_ARRIVED                → Arrived (light gray)
STAGE_6_WITH_CUSTOMER          → Delivered (orange)
STAGE_7_ALL_PAID               → Completed (light gray)
CANCELLED                      → Cancelled (red-orange)
```

---

### `UserProfile`
File: `src/app/model/userProfile.ts`

```typescript
{
  id?: string
  mobileNumber?: string           // Primary key (from Firebase OTP)
  name?: string
  surname?: string
  emailAddress?: string
  address?: string                // Default delivery address
  latitude?: number
  longitude?: number
  role: 'CUSTOMER' | 'STORE_ADMIN' | 'STORE' | 'MESSENGER'
  bank?: Bank                     // Payout details
  imageUrl?: string
}
```

---

### `StoreProfile`
File: `src/app/model/storeProfile.ts`

```typescript
{
  id?: string
  shortName?: string              // Used in URL /:shortname routing
  name?: string
  storeType: 'FOOD' | 'CLOTHING' | 'SALON' | 'CAR_WASH'
  stockList?: Stock[]             // Menu items
  businessHours?: BusinessHours[]
  storeOffline?: boolean
  brandPrimaryColor?: string
  brandSecondaryColor?: string
  imageUrl?: string
  latitude?: number
  longitude?: number
  bank?: Bank
  hasVat?: boolean
  featured?: boolean
}
```

---

### `Basket` & `BasketItem`
```typescript
Basket {
  id?: string
  storeName?: string
  storeId?: string
  items?: BasketItem[]
}

BasketItem {
  name?: string
  price?: number        // unit price × quantity
  quantity?: number
  discountPerc?: number
  image?: string        // Stock.images[0]
  options?: SelectionOption[]
}
```

---

### `ShippingData`
```typescript
{
  fromAddress: string             // Store pickup address
  toAddress: string               // Customer delivery address
  buildingType: 'HOUSE' | 'OFFICE' | 'APARTMENT'
  buildingName?: string
  unitNumber?: string
  type: 'DELIVERY' | 'COLLECTION' | 'SCHEDULED_DELIVERY'
  fee?: number
  distance?: number
  additionalInstructions: string
  messengerId?: string
  pickUpTime?: Date               // For SCHEDULED_DELIVERY
}
```

---

### `Stock` (Menu Item)
```typescript
{
  id?: string
  name?: string
  price?: number
  quantity?: number
  group?: string                  // Category (e.g. "Mains", "Desserts")
  description?: string
  images?: string[]
  mandatorySelection?: SelectionOption[]   // Required choices (e.g. Size)
  optionalSelection?: SelectionOption[]    // Optional add-ons
  discountPerc?: number
}

SelectionOption {
  name?: string       // "Size"
  values?: string[]   // ["Small", "Medium", "Large"]
  selected?: string   // Current user choice
  price?: number      // Price adjustment
}
```

---

## 5. Core User Flows

### Login / OTP Flow

1. User visits `/login` → `LoginComponent`
2. HTML has `<div id="recaptcha-container"></div>`
3. On init: `FirebaseService.createCapture()` 
4. User enters phone number → `FirebaseService.requestVerification("+27xxxxxxxxx")`
5. Firebase sends SMS OTP
6. User enters code → `FirebaseService.confirmCode(code)` 
7. On success: `IzingaOrderManagementService.getCustomerByPhoneNumber(phone)`
   - If found: store in `StorageService.userProfile`
   - If not found: create via `registerCustomer()`
8. Redirect to `/dashboard` or previous route

---

### Cart Flow

1. **Browse**: `HomeComponent` loads store via `getStoreById(shortName)`, stores in `StorageService.shop`
2. **Item detail**: `/item/:id` → `ShopItemDescrComponent`
   - User selects quantity + `mandatorySelection` options
   - Clicks "Add to Cart"
3. **Add to cart**: 
   ```typescript
   storageService.addToCart({ name, price: price * qty, quantity, options, image })
   ```
   Basket is created on first add with `storeId` and `storeName`.
4. **Cart guard**: If user switches to a different store, `clearOrder()` is called — cart is store-scoped.
5. **View cart**: `/cart` → `CheckoutComponent`
   - Shows items, quantities, totals
   - `remove(item)` → `storageService.removeFromCart(item.name)`
6. **Proceed**: Navigate to `/shipping`

---

### Shipping & Order Creation Flow

Route: `/shipping` → `ShippingComponent`

1. Load nearby messengers: `findNearbyMessangers(lat, long, range)`
2. Collect address fields (building type, unit, additional instructions)
3. User selects delivery type: `DELIVERY` (now) or `SCHEDULED_DELIVERY` (pick date/time)
4. On "Start Order":
   ```typescript
   // Build order
   order = {
     basket: storageService.basket,
     customerId: userProfile.id,
     shopId: storageService.shop.id,
     orderType: 'ONLINE',
     stage: 'STAGE_0_CUSTOMER_NOT_PAID',
     description: `ord-${userProfile.mobileNumber}`,
     shippingData: { fromAddress, toAddress, buildingType, type, additionalInstructions, pickUpTime }
   }
   // POST /order
   startOrder(order).subscribe(order => {
     storageService.order = order
     // Redirect to payment gateway
     window.location.href = `${izingaPayUrl}?Status=init&type=yoco&TransactionReference=${order.id}&callback=...`
   })
   ```

---

### Payment Callback Flow

Route: `/payment` → `PaymentComponent`

Payment providers redirect back with query params:
```
?TransactionId=xxx
&TransactionReference={orderId}
&Amount=xxx
&Status=Complete|Cancelled
&type=yoco|ozow|payfast
```

**Processing logic:**
```typescript
if (status == 'COMPLETE' && order.stage == 'STAGE_0_CUSTOMER_NOT_PAID') {
  order.description = `${type}-${transactionId}`  // "yoco-xxx" / "ozow-xxx"
  order.paymentType = type.toUpperCase()           // YOCO / OZOW
  finishOrder(order).subscribe(updated => {
    storageService.clearOrder()
    router.navigate(['../order', updated.id])       // → order tracking
  })
}
```

---

### Order Tracking Flow

Route: `/order/:id` → `OrderItemHistoryComponent`

1. Load order: `getOrderById(orderId)`
2. Display current `stage` with color badge
3. Show basket items, shipping address, amounts
4. Poll or refresh on user action for stage updates

---

## 6. Component Inventory

| Component | File | What It Shows |
|-----------|------|---------------|
| `IzingaHomeComponent` | `izinga-home/` | All-stores marketplace landing page |
| `HomeComponent` | `home/` | Single store menu (grouped by Stock.group) |
| `ShopItemDescrComponent` | `shop-item-descr/` | Item detail, quantity picker, option selection, add-to-cart |
| `CheckoutComponent` | `checkout/` | Cart review, item list, totals, remove items |
| `ShippingComponent` | `shipping/` | Delivery address form, nearby messengers, order creation |
| `PaymentComponent` | `payment/` | Payment gateway callback handler, order finalization |
| `OrdersComponent` | `orders/` | Order history list |
| `OrderItemHistoryComponent` | `order-item-history/` | Single order detail & tracking |
| `LoginComponent` | `login/` | Phone OTP verification |
| `DashboardComponent` | `dashboard/` | User profile hub, navigation menu |
| `UserProfileComponent` | `user-profile/` | Edit account details |
| `StoresComponent` | `stores/` | All stores listing (marketplace) |
| `StoreCardComponent` | `store-card/` | Store summary card (reusable) |
| `OrderCardComponent` | `order-card/` | Order summary card (reusable) |
| `RecurringShoppingComponent` | `recurring-shopping/` | Saved shopping lists |
| `RecurringShoppingFormComponent` | `recurring-shopping-form/` | Create/edit recurring order template |
| `PlaceAutocompleteComponent` | `place-autocomplete/` | Google Places address picker |
| `PromotionComponent` + `PromoSliderComponent` | `promotion/` | Promotions carousel |
| `PrintableMenuComponent` | `home/printable-menu/` | Print-friendly store menu |

---

## 7. Environment Configuration

File: `src/environments/environment.ts`

```typescript
{
  production: false,
  izingaUrl: "https://...",         // Izinga REST API base URL
  izingaPayUrl: "https://...",      // Payment gateway redirect base
  appVersion: "2.1.2",
  range: 10,                        // km radius for store/messenger lookups
  messengerId: "...",               // Default messenger assignment
  ukhesheMainShopAccount: "0812815707",  // Ukheshe transfer target
  firebase: {
    apiKey: "AIzaSyB1KhGf_VDF8VDUT0pNddLXB1Hls_dtR0U",
    authDomain: "ijudi-d19bd.firebaseapp.com",
    projectId: "ijudi-d19bd",
    messagingSenderId: "315529266651",
    appId: "1:315529266651:web:b28ea03f57c4d432ed53fe"
  }
}
```

---

## 8. Design & UI Conventions

- **No CSS framework** — all custom CSS in component `.css` files
- **Template-driven forms** — use `[(ngModel)]`, not `ReactiveFormsModule`
- **No Angular Material** — custom buttons, inputs, cards
- **Brand colors** come from `StoreProfile.brandPrimaryColor` / `brandSecondaryColor` — apply dynamically with `[ngStyle]` or CSS variables
- **Order stage badge colors** are hardcoded by stage enum — see Order model above
- **Images**: Use `StoreProfile.imageUrl` for store logo, `Stock.images[0]` for item thumbnails
- **Google Places**: Use `PlaceAutocompleteComponent` for any address input — do not build custom geocoding

---

## 9. Common Patterns

### Adding a new API call
1. Add method to `IzingaOrderManagementService` using `this.http.get/post/patch/delete`
2. Include `headers: this.headers` (pre-built in the service)
3. Pipe through `.pipe(catchError(err => { this.storageService.errorMessage = ...; throw err; }))`
4. Subscribe in the component — do not use async/await

### Navigating between routes
```typescript
// From a store-context route
this.router.navigate(['../cart'], { relativeTo: this.route });

// From root
this.router.navigate(['/orders']);
```

### Displaying error messages
Read `storageService.errorMessage` in the template. The service sets it automatically on API errors.

### Checking login state
```typescript
if (!this.storageService.userProfile) {
  this.router.navigate(['/login']);
}
```

### Adding a cart item
```typescript
const item: BasketItem = {
  name: stock.name,
  price: stock.price * quantity,
  quantity,
  image: stock.images?.[0],
  options: stock.mandatorySelection
};
this.storageService.addToCart(item);
```

---

## 10. Verified Commands

```bash
# Start dev server
npm start

# Build production
npm run build -- --configuration production

# Deploy to Firebase
firebase deploy
```
