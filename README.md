# Heggee - Shopify Theme

![Heggee Shopify Theme](./image.png)

A modern, responsive, and highly customizable Shopify theme built for e-commerce excellence. Heggee is designed to provide a premium shopping experience with seamless navigation, fast loading times, and a beautiful UI.

## Features

- **Modern & Responsive Design**: Fully responsive layout that looks great on all devices (mobile, tablet, desktop).
- **Customizable Sections**: Highly modular architecture using Shopify's latest section blocks.
- **Optimized Performance**: Fast loading times with optimized assets and minimal dependencies.
- **Enhanced Cart Experience**: Includes a dynamic cart system (drawer/page) for quick checkouts.
- **SEO Friendly**: Built with best SEO practices in mind to help your store rank higher.
- **Rich Product Pages**: Supports product variations, high-quality image galleries, and interactive elements.

## How to Host and Run Locally

To develop or preview this theme locally, you will need the [Shopify CLI](https://shopify.dev/docs/themes/tools/cli) installed.

### 1. Prerequisites
Make sure you have:
- A [Shopify Partner account](https://partners.shopify.com/) (Free).
- A Development Store created within your Partner account.
- [Shopify CLI](https://shopify.dev/docs/themes/tools/cli/install) installed on your system.

### 2. Connect and Run the Theme
Open your terminal, navigate to this project folder, and run the following command. Replace `your-store-name.myshopify.com` with your actual store URL:

```bash
shopify theme dev --store your-store-name.myshopify.com
```

If your development store has a password (which is common for new dev stores), you can pass the password directly:

```bash
shopify theme dev --store your-store-name.myshopify.com --store-password your_store_password
```

### 3. Preview Your Changes
Once the local server is running, Shopify CLI will provide you with a local preview link (typically `http://127.0.0.1:9292`). Any changes you make to the `.liquid`, `.css`, or `.js` files will automatically hot-reload in the browser.

## Deployment

To push this theme to your live Shopify store:

```bash
shopify theme push --store your-store-name.myshopify.com
```
Follow the interactive prompts to either update an existing theme or publish it as a new one.
