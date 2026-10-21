# ShopSquare

A React Native mobile app for browsing an online clothing store. The app currently includes a product catalog, product details, and separate Shop, Bag, and Wishlist tabs.

## Features

- Browse clothing by category, search the catalog, filter by size, and sort by price.
- Open a product details screen with size and color selection, description, size guide, and product imagery.
- Navigate between Shop, Bag, and Wishlist using bottom tabs.
- Product data and shared store options are local for now, ready to be replaced by API data later.

The Bag and Wishlist screens are placeholders at this stage. Cart and wishlist state are not persisted or shared across screens.

## Tech stack

- React Native `0.87`
- React `19`
- TypeScript
- React Navigation (native stack and bottom tabs)
- Redux Toolkit and React Redux
- React Native Safe Area Context
- Lucide icons

## Project structure

```text
src/
  app/navigation/        Root stack and bottom-tab navigation
  app/store/             Redux store, typed hooks, and slices
  features/
    cart/                Bag screen, model, and view model
    home/                Shop catalog, model, and view model
    productDetails/      Product details screen, model, and view model
    wishlist/            Wishlist screen, model, and view model
  service/               API client
  shared/
    components/          Reusable UI components
    constants/           API endpoint and shared store options
    models/              Shared TypeScript models
```

Feature code follows an MVVM-style organization with `model`, `viewModel`, and `view` folders. Reusable components and cross-feature constants belong in `src/shared`.

## Requirements

- Node.js `>= 22.11.0`
- npm
- Xcode and CocoaPods for iOS development
- Android Studio and Android SDK for Android development

Install JavaScript dependencies from the project root:

```sh
npm install
```

For iOS, install the native CocoaPods dependencies:

```sh
cd ios
bundle install
bundle exec pod install
cd ..
```

## Run the app

Start Metro in one terminal:

```sh
npm start
```

In another terminal, launch the app:

```sh
npm run ios
# or
npm run android
```

## Quality checks

```sh
npm run lint
npm test -- --runInBand
```

## Product data

The Shop screen fetches the product catalog from the API configured in [`src/shared/constants/api.ts`](./src/shared/constants/api.ts) when it mounts. It stores the response in Redux using the existing `Product[]` shape; Shop filtering and Product Details read their data from Redux. Shared categories, departments, and apparel sizes are in [`src/shared/constants/storeOptions.ts`](./src/shared/constants/storeOptions.ts).

If the product API is unavailable, the request is retried and the Shop screen shows an error with an option to retry.
