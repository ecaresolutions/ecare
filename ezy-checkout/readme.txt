=== Ezy Checkout ===
Contributors: goecares
Tags: woocommerce, checkout, popup checkout, cash on delivery, order form
Requires at least: 6.5
Tested up to: 6.9
Requires PHP: 8.0
Requires Plugins: woocommerce
Stable tag: 1.0.0
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A popup checkout plugin for WooCommerce with customizable styling and texts.

== Description ==

Ezy Checkout adds a popup-based checkout flow for WooCommerce products and cart checkout links.

Key features:

* Popup checkout modal with configurable labels and placeholders
* Single product and archive "Order Now" buttons
* Shipping method selection with server-side validation
* Coupon handling with abuse protections
* Admin settings page with AJAX save and sanitization
* Styling controls (colors, animations, typography)

== Installation ==

1. Upload the plugin folder to the `/wp-content/plugins/` directory.
2. Activate the plugin through the `Plugins` menu in WordPress.
3. Go to `Ezy Checkout` in wp-admin and configure settings.
4. Ensure WooCommerce is active.

== Privacy ==

Ezy Checkout creates WooCommerce orders from the popup checkout form. Customer name, phone number, address, order notes, selected products, coupon code, and shipping method are processed by WooCommerce on the site where the plugin is installed.

The plugin does not send order/customer checkout data to an external service. Google Fonts may be requested by the visitor's browser when a non-default font is selected.

Privacy policy: https://ecare.com.bd/privacy-and-policy/
Support: support@ecare.com.bd

== Frequently Asked Questions ==

= Does this plugin require WooCommerce? =

Yes. WooCommerce must be installed and active.

= Does this plugin replace the default WooCommerce checkout? =

It can, depending on the plugin setting `Replace Default Checkout`.

= Is the plugin translation-ready? =

It includes a text domain (`ezy-checkout`) and can be localized.

== External Services ==

This plugin can load Google Fonts on the frontend when a non-default font is selected in plugin settings.

Service used: Google Fonts
* URL: https://fonts.googleapis.com/
* Purpose: Load selected frontend typography
* Data sent: Visitor IP address and user agent may be processed by Google when font files are requested by the browser
* Terms: https://policies.google.com/terms
* Privacy: https://policies.google.com/privacy

No order/customer checkout data is sent to Google Fonts by this plugin.

== Changelog ==

= 1.0.0 =
* Initial public release.

== Upgrade Notice ==

= 1.0.0 =
Initial release.
