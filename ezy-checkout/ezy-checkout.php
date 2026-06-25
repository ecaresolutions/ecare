<?php

/**
 * Plugin Name: Ezy Checkout
 * Description: A popup checkout plugin for WooCommerce with customizable styling and texts.
 * Version: 1.0.0
 * Author: Ecare Solutions
 * Author URI: https://ecare.com.bd/
 * Requires Plugins: woocommerce
 * Requires at least: 6.5
 * Requires PHP: 8.0
 * License: GPLv2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: ezy-checkout
 */

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Ezycheckout_Plugin
{

    public function __construct()
    {
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'admin_enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_popup_html'));
        add_action('wp_ajax_ezycheckout_place_order', array($this, 'handle_order_placement'));
        add_action('wp_ajax_nopriv_ezycheckout_place_order', array($this, 'handle_order_placement'));
        add_action('wp_ajax_ezycheckout_get_cart_details', array($this, 'get_cart_details'));
        add_action('wp_ajax_nopriv_ezycheckout_get_cart_details', array($this, 'get_cart_details'));
        add_action('wp_ajax_ezycheckout_get_variable_data', array($this, 'get_variable_product_data'));
        add_action('wp_ajax_nopriv_ezycheckout_get_variable_data', array($this, 'get_variable_product_data'));
        add_action('wp_ajax_ezycheckout_apply_coupon', array($this, 'apply_coupon_check'));
        add_action('wp_ajax_nopriv_ezycheckout_apply_coupon', array($this, 'apply_coupon_check'));
        add_action('wp_ajax_ezycheckout_get_shipping_methods', array($this, 'get_shipping_methods_ajax'));
        add_action('wp_ajax_nopriv_ezycheckout_get_shipping_methods', array($this, 'get_shipping_methods_ajax'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('admin_init', array($this, 'register_settings'));
        add_filter('woocommerce_get_checkout_url', array($this, 'replace_checkout_url'), 10, 1);
        add_action('woocommerce_after_add_to_cart_button', array($this, 'inject_buy_now_button'));
        add_action('woocommerce_after_shop_loop_item', array($this, 'inject_buy_now_button_loop'), 15);
        add_action('wp_ajax_ezycheckout_save_settings', array($this, 'save_settings_ajax'));
    }

    private function log_security_event($event, $context = array())
    {
        if (!defined('WP_DEBUG_LOG') || !WP_DEBUG_LOG) {
            return;
        }
        $payload = array(
            'event' => $event,
            'ip' => isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : '',
            'ua' => isset($_SERVER['HTTP_USER_AGENT']) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_USER_AGENT'])) : '',
            'uri' => isset($_SERVER['REQUEST_URI']) ? sanitize_text_field(wp_unslash($_SERVER['REQUEST_URI'])) : '',
            'time' => gmdate('c'),
            'context' => $context,
        );
        if (function_exists('wc_get_logger')) {
            wc_get_logger()->warning('Ezy Checkout Security: ' . wp_json_encode($payload), array('source' => 'ezy-checkout'));
        }
    }

    private function get_rate_limit_fingerprint($extra = '')
    {
        $ip = isset($_SERVER['REMOTE_ADDR']) ? sanitize_text_field(wp_unslash($_SERVER['REMOTE_ADDR'])) : 'unknown';
        $ua = isset($_SERVER['HTTP_USER_AGENT']) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_USER_AGENT'])) : 'unknown';
        $session_token = function_exists('wp_get_session_token') ? (string) wp_get_session_token() : '';
        return md5($ip . '|' . $ua . '|' . $session_token . '|' . (string) $extra);
    }

    private function rate_limit_hit($prefix, $max, $window_seconds, $extra = '')
    {
        $fingerprint = $this->get_rate_limit_fingerprint($extra);
        $key = 'ezych_rt_' . $prefix . '_' . $fingerprint;
        $lock_key = 'ezych_lock_' . $prefix . '_' . $fingerprint;

        $locked_until = (int) get_transient($lock_key);
        if ($locked_until > time()) {
            return true;
        }

        $count = (int) get_transient($key);
        if ($count >= $max) {
            // Adaptive lockout window for repeated bursts.
            set_transient($lock_key, time() + (5 * $window_seconds), 5 * $window_seconds);
            return true;
        }
        set_transient($key, $count + 1, $window_seconds);
        return false;
    }

    private function get_option_sanitizers()
    {
        return array(
            'ezycheckout_replace_checkout' => 'sanitize_bool_flag',
            'ezycheckout_cartflows_support' => 'sanitize_bool_flag',
            'ezycheckout_enable_single_product' => 'sanitize_bool_flag',
            'ezycheckout_enable_archive' => 'sanitize_bool_flag',
            'ezycheckout_enable_quantity' => 'sanitize_bool_flag',
            'ezycheckout_enable_coupon' => 'sanitize_bool_flag',
            'ezycheckout_enable_notes' => 'sanitize_bool_flag',
            'ezycheckout_btn_separate' => 'sanitize_bool_flag',

            'ezycheckout_buy_now_pos' => 'sanitize_buy_now_position',
            'ezycheckout_buy_now_label' => 'sanitize_plain_text',
            'ezycheckout_submit_text' => 'sanitize_plain_text',
            'ezycheckout_primary_color' => 'sanitize_hex_color_safe',
            'ezycheckout_secondary_color' => 'sanitize_hex_color_safe',
            'ezycheckout_btn_bg' => 'sanitize_hex_color_safe',
            'ezycheckout_btn_color' => 'sanitize_hex_color_safe',
            'ezycheckout_modal_content_bg' => 'sanitize_hex_color_safe',
            'ezycheckout_modal_overlay_color' => 'sanitize_hex_color_safe',
            'ezycheckout_modal_overlay_opacity' => 'sanitize_opacity_value',
            'ezycheckout_font_family' => 'sanitize_font_family',
            'ezycheckout_btn_anim' => 'sanitize_animation_value',
            'ezycheckout_archive_btn_anim' => 'sanitize_animation_value',
            'ezycheckout_single_btn_anim' => 'sanitize_animation_value',
            'ezycheckout_archive_btn_layout' => 'sanitize_archive_layout',
            'ezycheckout_submit_alignment' => 'sanitize_alignment',

            'ezycheckout_name_label' => 'sanitize_plain_text',
            'ezycheckout_name_placeholder' => 'sanitize_plain_text',
            'ezycheckout_phone_label' => 'sanitize_plain_text',
            'ezycheckout_phone_placeholder' => 'sanitize_plain_text',
            'ezycheckout_address_label' => 'sanitize_plain_text',
            'ezycheckout_address_placeholder' => 'sanitize_plain_text',
            'ezycheckout_note_label' => 'sanitize_plain_text',
            'ezycheckout_note_placeholder' => 'sanitize_plain_text',
            'ezycheckout_lbl_notes' => 'sanitize_plain_text',

            'ezycheckout_header_title' => 'sanitize_plain_text',
            'ezycheckout_shipping_title' => 'sanitize_plain_text',
            'ezycheckout_coupon_placeholder' => 'sanitize_plain_text',
            'ezycheckout_coupon_btn_text' => 'sanitize_plain_text',
            'ezycheckout_subtotal_label' => 'sanitize_plain_text',
            'ezycheckout_shipping_label' => 'sanitize_plain_text',
            'ezycheckout_total_label' => 'sanitize_plain_text',
            'ezycheckout_discount_label' => 'sanitize_plain_text',
            'ezycheckout_btn_disclaimer' => 'sanitize_plain_text',
            'ezycheckout_lbl_submit' => 'sanitize_plain_text',
        );
    }

    public function sanitize_plain_text($value)
    {
        return sanitize_text_field((string) $value);
    }

    public function sanitize_bool_flag($value)
    {
        return ('1' === (string) $value || 1 === (int) $value) ? 1 : 0;
    }

    public function sanitize_hex_color_safe($value)
    {
        $value = sanitize_hex_color((string) $value);
        return $value ? $value : '#000000';
    }

    public function sanitize_opacity_value($value)
    {
        $value = (float) $value;
        if ($value < 0) {
            $value = 0;
        }
        if ($value > 1) {
            $value = 1;
        }
        return (string) $value;
    }

    public function sanitize_buy_now_position($value)
    {
        $allowed = array('', 'after', 'replace');
        return in_array((string) $value, $allowed, true) ? (string) $value : '';
    }

    public function sanitize_animation_value($value)
    {
        $allowed = array('none', 'shake', 'pulse', 'bounce', 'swing', 'tada', 'wobble', 'flip', 'rubberband', 'jello');
        return in_array((string) $value, $allowed, true) ? (string) $value : 'none';
    }

    public function sanitize_archive_layout($value)
    {
        $allowed = array('inline', 'fullwidth');
        return in_array((string) $value, $allowed, true) ? (string) $value : 'inline';
    }

    public function sanitize_alignment($value)
    {
        $allowed = array('center', 'left', 'right');
        return in_array((string) $value, $allowed, true) ? (string) $value : 'center';
    }

    public function sanitize_font_family($value)
    {
        $allowed = array('Inherit', 'Hind Siliguri', 'Noto Serif Bengali', 'Roboto', 'Open Sans', 'Poppins');
        return in_array((string) $value, $allowed, true) ? (string) $value : 'Inherit';
    }


    public function enqueue_scripts()
    {
        wp_enqueue_style('ezy-checkout-style', plugin_dir_url(__FILE__) . 'assets/css/style.css', array(), '1.0.0');
        wp_enqueue_script('ezy-checkout-script', plugin_dir_url(__FILE__) . 'assets/js/script.js', array('jquery'), '1.0.0', true);
        $this->inject_custom_styles();

        wp_localize_script('ezy-checkout-script', 'ezyCheckout', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ezycheckout_checkout_nonce'),
        ));

        // Google Fonts Enqueue
        $font = $this->sanitize_font_family(get_option('ezycheckout_font_family', 'Inherit'));
        if (!empty($font) && 'Inherit' !== $font) {
            $font_url = 'https://fonts.googleapis.com/css2?family=' . rawurlencode($font) . ':wght@400;500;600;700&display=swap';
            wp_enqueue_style('ezy-checkout-google-fonts', esc_url_raw($font_url), array(), '1.0.0');
        }
    }

    public function admin_enqueue_scripts()
    {
        wp_enqueue_style('ezy-checkout-admin-style', plugin_dir_url(__FILE__) . 'assets/css/admin-style.css', array(), '1.0.0');
        wp_enqueue_script('ezy-checkout-admin-script', plugin_dir_url(__FILE__) . 'assets/js/admin-script.js', array('jquery'), '1.0.0', true);
        wp_localize_script('ezy-checkout-admin-script', 'ezyCheckoutAdmin', array(
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('ezycheckout_admin_nonce')
        ));
    }

    public function inject_custom_styles()
    {
        $font = get_option('ezycheckout_font_family', 'Inherit');

        // New color options
        $primary = get_option('ezycheckout_primary_color', '#ff6b6b');
        $secondary = get_option('ezycheckout_secondary_color', '#f39c12');
        $btn_separate = (int) get_option('ezycheckout_btn_separate', 1);
        $btn_bg_opt = get_option('ezycheckout_btn_bg', $primary);
        $btn_color_opt = get_option('ezycheckout_btn_color', '#ffffff');
        $final_btn_bg = $btn_separate ? $btn_bg_opt : $primary;
        $final_btn_color = $btn_separate ? $btn_color_opt : '#ffffff';

        $modal_content_bg = get_option('ezycheckout_modal_content_bg', '#ffffff');
        $overlay_hex = get_option('ezycheckout_modal_overlay_color', '#000000');
        $overlay_opacity = floatval(get_option('ezycheckout_modal_overlay_opacity', 0.6));
        if ($overlay_opacity < 0) $overlay_opacity = 0;
        if ($overlay_opacity > 1) $overlay_opacity = 1;

        // Convert hex to rgba string
        $hex = ltrim($overlay_hex, '#');
        if (strlen($hex) === 3) {
            $hex = $hex[0] . $hex[0] . $hex[1] . $hex[1] . $hex[2] . $hex[2];
        }
        $r = hexdec(substr($hex, 0, 2));
        $g = hexdec(substr($hex, 2, 2));
        $b = hexdec(substr($hex, 4, 2));
        $overlay_rgba = 'rgba(' . $r . ',' . $g . ',' . $b . ',' . $overlay_opacity . ')';

        $font_family = ('Inherit' === $font) ? 'inherit' : "'" . str_replace("'", "\\'", $this->sanitize_font_family($font)) . "', sans-serif";
        $inline_css = sprintf(
            ':root {
                --ezych-primary: %1$s;
                --ezych-secondary: %2$s;
                --ezych-btn-bg: %3$s;
                --ezych-btn-color: %4$s;
                --ezych-font-family: %5$s;
                --ezych-modal-content-bg: %6$s;
                --ezych-overlay-bg: %7$s;
            }

            .ezych-modal,
            .ezych-modal * {
                font-family: var(--ezych-font-family);
            }

            .ezych-submit-btn,
            .order-now-btn {
                background-color: var(--ezych-btn-bg) !important;
                color: var(--ezych-btn-color) !important;
            }',
            esc_attr($primary),
            esc_attr($secondary),
            esc_attr($final_btn_bg),
            esc_attr($final_btn_color),
            $font_family,
            esc_attr($modal_content_bg),
            esc_attr($overlay_rgba)
        );


        if (
            get_option('ezycheckout_enable_single_product', 1)
            && 'replace' === get_option('ezycheckout_buy_now_pos')
            && function_exists('is_product')
            && is_product()
        ) {
            $inline_css .= "\n.single_add_to_cart_button { display: none !important; }";
        }

        wp_add_inline_style('ezy-checkout-style', $inline_css);
    }

    public function add_admin_menu()
    {
        add_menu_page('Ezy Checkout', 'Ezy Checkout', 'manage_options', 'ezy-checkout', array($this, 'settings_page_html'), 'dashicons-cart', 56);
        // Submenu pages merged into tabs
    }

    public function register_settings()
    {
        $group = 'ezycheckout_options';

        // Booleans / Flags
        $bool_settings = array(
            'ezycheckout_replace_checkout',
            'ezycheckout_cartflows_support',
            'ezycheckout_enable_single_product',
            'ezycheckout_enable_archive',
            'ezycheckout_enable_quantity',
            'ezycheckout_enable_coupon',
            'ezycheckout_enable_notes',
            'ezycheckout_btn_separate'
        );

        foreach ($bool_settings as $setting) {
            register_setting($group, $setting, array(
                'type'              => 'integer',
                'sanitize_callback' => array($this, 'sanitize_bool_flag'),
                'default'           => 1
            ));
        }

        // Colors
        $color_settings = array(
            'ezycheckout_primary_color',
            'ezycheckout_secondary_color',
            'ezycheckout_btn_bg',
            'ezycheckout_btn_color',
            'ezycheckout_modal_content_bg',
            'ezycheckout_modal_overlay_color'
        );

        foreach ($color_settings as $setting) {
            register_setting($group, $setting, array(
                'type'              => 'string',
                'sanitize_callback' => array($this, 'sanitize_hex_color_safe')
            ));
        }

        // Texts
        $text_settings = array(
            'ezycheckout_buy_now_label',
            'ezycheckout_submit_text',
            'ezycheckout_name_label',
            'ezycheckout_name_placeholder',
            'ezycheckout_phone_label',
            'ezycheckout_phone_placeholder',
            'ezycheckout_address_label',
            'ezycheckout_address_placeholder',
            'ezycheckout_note_label',
            'ezycheckout_note_placeholder',
            'ezycheckout_lbl_notes',
            'ezycheckout_header_title',
            'ezycheckout_shipping_title',
            'ezycheckout_coupon_placeholder',
            'ezycheckout_coupon_btn_text',
            'ezycheckout_subtotal_label',
            'ezycheckout_shipping_label',
            'ezycheckout_total_label',
            'ezycheckout_discount_label',
            'ezycheckout_btn_disclaimer',
            'ezycheckout_lbl_submit'
        );

        foreach ($text_settings as $setting) {
            register_setting($group, $setting, array(
                'type'              => 'string',
                'sanitize_callback' => 'sanitize_text_field'
            ));
        }

        // Specific Sanitizers
        register_setting($group, 'ezycheckout_modal_overlay_opacity', array(
            'type'              => 'string',
            'sanitize_callback' => array($this, 'sanitize_opacity_value')
        ));

        register_setting($group, 'ezycheckout_buy_now_pos', array(
            'type'              => 'string',
            'sanitize_callback' => array($this, 'sanitize_buy_now_position')
        ));

        register_setting($group, 'ezycheckout_font_family', array(
            'type'              => 'string',
            'sanitize_callback' => array($this, 'sanitize_font_family')
        ));

        register_setting($group, 'ezycheckout_btn_anim', array(
            'type'              => 'string',
            'sanitize_callback' => array($this, 'sanitize_animation_value')
        ));

        register_setting($group, 'ezycheckout_archive_btn_anim', array(
            'type'              => 'string',
            'sanitize_callback' => array($this, 'sanitize_animation_value')
        ));

        register_setting($group, 'ezycheckout_single_btn_anim', array(
            'type'              => 'string',
            'sanitize_callback' => array($this, 'sanitize_animation_value')
        ));

        register_setting($group, 'ezycheckout_archive_btn_layout', array(
            'type'              => 'string',
            'sanitize_callback' => array($this, 'sanitize_archive_layout')
        ));

        register_setting($group, 'ezycheckout_submit_alignment', array(
            'type'              => 'string',
            'sanitize_callback' => array($this, 'sanitize_alignment')
        ));
    }

    public function settings_page_html()
    {
    ?>
        <div class="wrap ezych-admin-wrap">
            <div class="ezych-admin-header">
                <h1>Ezy Checkout Settings</h1>
            </div>

            <h2 class="nav-tab-wrapper ezych-nav-tab-wrapper">
                <a href="#basic" class="nav-tab ezych-nav-tab nav-tab-active ezych-nav-tab-active">Basic Settings</a>
                <a href="#style" class="nav-tab ezych-nav-tab">Style Settings</a>
                <a href="#texts" class="nav-tab ezych-nav-tab">Texts</a>
                <a href="#support" class="nav-tab ezych-nav-tab">Support</a>
            </h2>

            <form id="ezych-settings-form" method="post">
                <?php wp_nonce_field('ezycheckout_admin_nonce', 'ezycheckout_admin_nonce_field'); ?>

                <div id="basic" class="ezych-tab-content">
                    <?php $this->render_basic_settings_tab(); ?>
                </div>

                <div id="style" class="ezych-tab-content" style="display:none;">
                    <?php $this->render_style_settings_tab(); ?>
                </div>

                <div id="texts" class="ezych-tab-content" style="display:none;">
                    <?php $this->render_texts_tab(); ?>
                </div>

                <div id="support" class="ezych-tab-content" style="display:none;">
                    <?php $this->render_support_tab(); ?>
                </div>

                <div class="ezych-submit-wrap">
                    <?php submit_button('Save Changes', 'primary', 'submit', false); ?>
                </div>
            </form>
        </div>
    <?php
    }

    private function render_basic_settings_tab()
    {
    ?>
        <div class="ezych-card">
            <h3>General Configuration</h3>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Enable on Single Product</th>
                    <td>
                        <label class="switch">
                            <input type="checkbox" name="ezycheckout_enable_single_product" value="1" <?php checked(1, get_option('ezycheckout_enable_single_product', 1), true); ?> />
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Enable on Shop/Archive</th>
                    <td>
                        <label class="switch">
                            <input type="checkbox" name="ezycheckout_enable_archive" value="1" <?php checked(1, get_option('ezycheckout_enable_archive', 1), true); ?> />
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Replace Default Checkout</th>
                    <td>
                        <label class="switch">
                            <input type="checkbox" name="ezycheckout_replace_checkout" value="1" <?php checked(1, get_option('ezycheckout_replace_checkout'), true); ?> />
                            <span class="slider round"></span>
                        </label>
                        <span class="description" style="vertical-align: super; margin-left: 10px;">Replace WooCommerce Checkout Page with Popup</span>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">CartFlows Support</th>
                    <td>
                        <input type="checkbox" name="ezycheckout_cartflows_support" value="1" <?php checked(1, get_option('ezycheckout_cartflows_support'), true); ?> />
                        <label>Disable Popup on CartFlows Pages</label>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">Buy Now Button Position</th>
                    <td>
                        <select name="ezycheckout_buy_now_pos">
                            <option value="" <?php selected('', get_option('ezycheckout_buy_now_pos')); ?>>Disabled</option>
                            <option value="after" <?php selected('after', get_option('ezycheckout_buy_now_pos')); ?>>After Add to Cart Button</option>
                            <option value="replace" <?php selected('replace', get_option('ezycheckout_buy_now_pos')); ?>>Replace Add to Cart Button</option>
                        </select>
                    </td>
                </tr>

                <tr valign="top">
                    <th scope="row">Enable Coupon Field</th>
                    <td>
                        <label class="switch">
                            <input type="checkbox" name="ezycheckout_enable_coupon" value="1" <?php checked(1, get_option('ezycheckout_enable_coupon', 1), true); ?> />
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Enable Order Notes</th>
                    <td>
                        <label class="switch">
                            <input type="checkbox" name="ezycheckout_enable_notes" value="1" <?php checked(1, get_option('ezycheckout_enable_notes', 1), true); ?> />
                            <span class="slider round"></span>
                        </label>
                    </td>
                </tr>


            </table>
        </div>
    <?php
    }

    private function render_style_settings_tab()
    {
    ?>
        <!-- Colors & Typography -->
        <div class="ezych-card">
            <h3>Colors & Typography</h3>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Primary Color</th>
                    <td>
                        <input type="color" name="ezycheckout_primary_color"
                            value="<?php echo esc_attr(get_option('ezycheckout_primary_color', '#ff6b6b')); ?>">
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Secondary Color</th>
                    <td>
                        <input type="color" name="ezycheckout_secondary_color"
                            value="<?php echo esc_attr(get_option('ezycheckout_secondary_color', '#f39c12')); ?>">
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Separate Button Colors</th>
                    <td>
                        <label class="switch">
                            <input type="checkbox" name="ezycheckout_btn_separate" value="1" <?php checked(1, get_option('ezycheckout_btn_separate', 1), true); ?> />
                            <span class="slider round"></span>
                        </label>
                        <span class="description" style="vertical-align: super; margin-left: 10px;">If disabled, buttons will use the Primary color.</span>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Button Background Color</th>
                    <td>
                        <input type="color" name="ezycheckout_btn_bg"
                            value="<?php echo esc_attr(get_option('ezycheckout_btn_bg', '#ff6b6b')); ?>">
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Button Text Color</th>
                    <td>
                        <input type="color" name="ezycheckout_btn_color"
                            value="<?php echo esc_attr(get_option('ezycheckout_btn_color', '#ffffff')); ?>">
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Modal Content Background</th>
                    <td>
                        <input type="color" name="ezycheckout_modal_content_bg"
                            value="<?php echo esc_attr(get_option('ezycheckout_modal_content_bg', '#ffffff')); ?>">
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Modal Overlay Color</th>
                    <td>
                        <input type="color" name="ezycheckout_modal_overlay_color"
                            value="<?php echo esc_attr(get_option('ezycheckout_modal_overlay_color', '#000000')); ?>">
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Modal Overlay Opacity</th>
                    <td>
                        <input type="number" step="0.05" min="0" max="1" name="ezycheckout_modal_overlay_opacity"
                            value="<?php echo esc_attr(get_option('ezycheckout_modal_overlay_opacity', '0.6')); ?>">
                        <p class="description">Value from 0 to 1 (e.g., 0.6)</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Font Family</th>
                    <td>
                        <select name="ezycheckout_font_family">
                            <option value="Inherit" <?php selected('Inherit', get_option('ezycheckout_font_family', 'Inherit')); ?>>Inherit (Theme Default)</option>
                            <option value="Hind Siliguri" <?php selected('Hind Siliguri', get_option('ezycheckout_font_family')); ?>>Hind Siliguri (Bengali)</option>
                            <option value="Noto Serif Bengali" <?php selected('Noto Serif Bengali', get_option('ezycheckout_font_family')); ?>>Noto Serif Bengali</option>
                            <option value="Roboto" <?php selected('Roboto', get_option('ezycheckout_font_family')); ?>>Roboto</option>
                            <option value="Open Sans" <?php selected('Open Sans', get_option('ezycheckout_font_family')); ?>>Open Sans</option>
                            <option value="Poppins" <?php selected('Poppins', get_option('ezycheckout_font_family')); ?>>Poppins</option>
                        </select>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Animations -->
        <div class="ezych-card">
            <h3>Animations</h3>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Submit Button Animation (Popup)</th>
                    <td>
                        <select name="ezycheckout_btn_anim">
                            <option value="none" <?php selected('none', get_option('ezycheckout_btn_anim', 'none')); ?>>None</option>
                            <option value="shake" <?php selected('shake', get_option('ezycheckout_btn_anim')); ?>>Shake</option>
                            <option value="pulse" <?php selected('pulse', get_option('ezycheckout_btn_anim')); ?>>Pulse</option>
                            <option value="bounce" <?php selected('bounce', get_option('ezycheckout_btn_anim')); ?>>Bounce</option>
                            <option value="swing" <?php selected('swing', get_option('ezycheckout_btn_anim')); ?>>Swing</option>
                            <option value="tada" <?php selected('tada', get_option('ezycheckout_btn_anim')); ?>>Tada</option>
                            <option value="wobble" <?php selected('wobble', get_option('ezycheckout_btn_anim')); ?>>Wobble</option>
                            <option value="flip" <?php selected('flip', get_option('ezycheckout_btn_anim')); ?>>Flip</option>
                            <option value="rubberband" <?php selected('rubberband', get_option('ezycheckout_btn_anim')); ?>>Rubber Band</option>
                            <option value="jello" <?php selected('jello', get_option('ezycheckout_btn_anim')); ?>>Jello</option>
                        </select>
                        <p class="description">Animation for the submit button in the order popup</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Single Product Button Animation</th>
                    <td>
                        <select name="ezycheckout_single_btn_anim">
                            <option value="none" <?php selected('none', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>None</option>
                            <option value="shake" <?php selected('shake', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Shake</option>
                            <option value="pulse" <?php selected('pulse', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Pulse</option>
                            <option value="bounce" <?php selected('bounce', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Bounce</option>
                            <option value="swing" <?php selected('swing', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Swing</option>
                            <option value="tada" <?php selected('tada', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Tada</option>
                            <option value="wobble" <?php selected('wobble', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Wobble</option>
                            <option value="flip" <?php selected('flip', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Flip</option>
                            <option value="rubberband" <?php selected('rubberband', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Rubber Band</option>
                            <option value="jello" <?php selected('jello', get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'))); ?>>Jello</option>
                        </select>
                        <p class="description">Animation for Order Now button on single product pages</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Archive/Shop Button Animation</th>
                    <td>
                        <select name="ezycheckout_archive_btn_anim">
                            <option value="none" <?php selected('none', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>None</option>
                            <option value="shake" <?php selected('shake', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Shake</option>
                            <option value="pulse" <?php selected('pulse', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Pulse</option>
                            <option value="bounce" <?php selected('bounce', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Bounce</option>
                            <option value="swing" <?php selected('swing', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Swing</option>
                            <option value="tada" <?php selected('tada', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Tada</option>
                            <option value="wobble" <?php selected('wobble', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Wobble</option>
                            <option value="flip" <?php selected('flip', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Flip</option>
                            <option value="rubberband" <?php selected('rubberband', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Rubber Band</option>
                            <option value="jello" <?php selected('jello', get_option('ezycheckout_archive_btn_anim', 'none')); ?>>Jello</option>
                        </select>
                        <p class="description">Animation for Order Now button on shop/archive pages</p>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Layout -->
        <div class="ezych-card">
            <h3>Layout</h3>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Submit Button Alignment</th>
                    <td>
                        <select name="ezycheckout_submit_alignment">
                            <option value="center" <?php selected('center', get_option('ezycheckout_submit_alignment', 'center')); ?>>Center</option>
                            <option value="left" <?php selected('left', get_option('ezycheckout_submit_alignment')); ?>>Left</option>
                            <option value="right" <?php selected('right', get_option('ezycheckout_submit_alignment')); ?>>Right</option>
                        </select>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Archive Button Layout</th>
                    <td>
                        <select name="ezycheckout_archive_btn_layout">
                            <option value="inline" <?php selected('inline', get_option('ezycheckout_archive_btn_layout', 'inline')); ?>>Inline (Next to Add to Cart)</option>
                            <option value="fullwidth" <?php selected('fullwidth', get_option('ezycheckout_archive_btn_layout', 'inline')); ?>>Full Width (Below Add to Cart)</option>
                        </select>
                        <p class="description">Choose how the Order Now button appears on shop/archive pages</p>
                    </td>
                </tr>
            </table>
        </div>

    <?php
    }

    private function render_texts_tab()
    {
    ?>
        <!-- Button Labels -->
        <div class="ezych-card">
            <h3>Button Labels</h3>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Buy Now Button Label</th>
                    <td>
                        <input type="text" name="ezycheckout_buy_now_label"
                            value="<?php echo esc_attr(get_option('ezycheckout_buy_now_label', 'Order Now')); ?>"
                            class="regular-text">
                        <p class="description">Text displayed on the "Order Now" button on product pages</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Submit Button Label</th>
                    <td>
                        <input type="text" name="ezycheckout_lbl_submit"
                            value="<?php echo esc_attr(get_option('ezycheckout_lbl_submit', 'Place Order')); ?>"
                            class="regular-text">
                        <p class="description">Text displayed on the submit button in the order popup</p>
                    </td>
                </tr>
            </table>
        </div>

        <!-- Popup Texts -->
        <div class="ezych-card">
            <h3>Popup Texts</h3>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Popup Header Title</th>
                    <td>
                        <input type="text" name="ezycheckout_header_title"
                            value="<?php echo esc_attr(get_option('ezycheckout_header_title', 'ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন')); ?>"
                            class="large-text">
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Shipping Section Title</th>
                    <td>
                        <input type="text" name="ezycheckout_shipping_title"
                            value="<?php echo esc_attr(get_option('ezycheckout_shipping_title', 'শিপিং মেথড')); ?>"
                            class="regular-text">
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Button Disclaimer</th>
                    <td>
                        <input type="text" name="ezycheckout_btn_disclaimer"
                            value="<?php echo esc_attr(get_option('ezycheckout_btn_disclaimer', 'উপরের বাটনে ক্লিক করলে আপনার অর্ডারটি সাথে সাথে কনফার্ম হয়ে যাবে!')); ?>"
                            class="large-text">
                    </td>
                </tr>
            </table>
        </div>

        <!-- Form Field Labels & Placeholders -->
        <div class="ezych-card">
            <h3>Form Field Labels & Placeholders</h3>
            <p class="description" style="margin-bottom: 15px;">Configure the labels and placeholder text for each form field in the order popup.</p>

            <table class="ezych-labels-table widefat fixed striped">
                <thead>
                    <tr>
                        <th style="width: 25%;">Field</th>
                        <th style="width: 37.5%;">Label</th>
                        <th style="width: 37.5%;">Placeholder</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Name Field</strong></td>
                        <td><input type="text" name="ezycheckout_name_label" value="<?php echo esc_attr(get_option('ezycheckout_name_label', 'আপনার নাম')); ?>" class="regular-text" style="width: 100%;"></td>
                        <td><input type="text" name="ezycheckout_name_placeholder" value="<?php echo esc_attr(get_option('ezycheckout_name_placeholder', 'আপনার নাম')); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <td><strong>Phone Field</strong></td>
                        <td><input type="text" name="ezycheckout_phone_label" value="<?php echo esc_attr(get_option('ezycheckout_phone_label', 'ফোন নাম্বার')); ?>" class="regular-text" style="width: 100%;"></td>
                        <td><input type="text" name="ezycheckout_phone_placeholder" value="<?php echo esc_attr(get_option('ezycheckout_phone_placeholder', 'ফোন নাম্বার')); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <td><strong>Address Field</strong></td>
                        <td><input type="text" name="ezycheckout_address_label" value="<?php echo esc_attr(get_option('ezycheckout_address_label', 'এড্রেস')); ?>" class="regular-text" style="width: 100%;"></td>
                        <td><input type="text" name="ezycheckout_address_placeholder" value="<?php echo esc_attr(get_option('ezycheckout_address_placeholder', 'এড্রেস')); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <td><strong>Order Notes</strong></td>
                        <td><input type="text" name="ezycheckout_note_label" value="<?php echo esc_attr(get_option('ezycheckout_note_label', 'Order note')); ?>" class="regular-text" style="width: 100%;"></td>
                        <td><input type="text" name="ezycheckout_note_placeholder" value="<?php echo esc_attr(get_option('ezycheckout_note_placeholder', 'Order note')); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Order Summary Labels -->
        <div class="ezych-card">
            <h3>Order Summary Labels</h3>
            <p class="description" style="margin-bottom: 15px;">Configure the labels displayed in the order summary section.</p>

            <table class="ezych-labels-table widefat fixed striped">
                <thead>
                    <tr>
                        <th style="width: 40%;">Field / Context</th>
                        <th style="width: 60%;">Label Text</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Subtotal</strong><br><small>Displayed in order summary</small></td>
                        <td><input type="text" name="ezycheckout_subtotal_label" value="<?php echo esc_attr(get_option('ezycheckout_subtotal_label', 'সাব টোটাল')); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <td><strong>Shipping</strong><br><small>Shipping cost line item</small></td>
                        <td><input type="text" name="ezycheckout_shipping_label" value="<?php echo esc_attr(get_option('ezycheckout_shipping_label', 'ডেলিভারি চার্জ')); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <td><strong>Total</strong><br><small>Grand total amount</small></td>
                        <td><input type="text" name="ezycheckout_total_label" value="<?php echo esc_attr(get_option('ezycheckout_total_label', 'সর্বমোট')); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                    <tr>
                        <td><strong>Discount</strong><br><small>Displayed when coupon applied</small></td>
                        <td><input type="text" name="ezycheckout_discount_label" value="<?php echo esc_attr(get_option('ezycheckout_discount_label', 'ডিসকাউন্ট')); ?>" class="regular-text" style="width: 100%;"></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Coupon Field Labels -->
        <div class="ezych-card">
            <h3>Coupon Field Labels</h3>
            <table class="form-table">
                <tr valign="top">
                    <th scope="row">Coupon Placeholder</th>
                    <td>
                        <input type="text" name="ezycheckout_coupon_placeholder"
                            value="<?php echo esc_attr(get_option('ezycheckout_coupon_placeholder', 'কুপন কোড')); ?>"
                            class="regular-text">
                        <p class="description">Placeholder text for the coupon input field</p>
                    </td>
                </tr>
                <tr valign="top">
                    <th scope="row">Coupon Button Text</th>
                    <td>
                        <input type="text" name="ezycheckout_coupon_btn_text"
                            value="<?php echo esc_attr(get_option('ezycheckout_coupon_btn_text', 'এপ্লাই')); ?>"
                            class="regular-text">
                        <p class="description">Text displayed on the apply coupon button</p>
                    </td>
                </tr>
            </table>
        </div>
    <?php
    }

    private function render_support_tab()
    {
    ?>
        <div class="ezych-card ezych-support-hero">
            <h1>Need Help?</h1>
            <p>We are here to assist you with any issues or questions.</p>
            <div class="ezych-support-links">
                <a href="<?php echo esc_url('mailto:support@ecare.com.bd'); ?>" class="button button-primary ezych-btn-link">Contact Support</a>
            </div>
        </div>

        <div class="ezych-support-grid">
            <div class="ezych-support-box">
                <span class="dashicons dashicons-video-alt3"></span>
                <h3>Video Tutorials</h3>
                <p>Watch step-by-step guides.</p>
                <a href="<?php echo esc_url('https://ecare.com.bd/'); ?>" target="_blank" rel="noopener noreferrer">Watch Videos</a>
            </div>
            <div class="ezych-support-box">
                <span class="dashicons dashicons-book"></span>
                <h3>Documentation</h3>
                <p>Read detailed documentation.</p>
                <a href="<?php echo esc_url('https://ecare.com.bd/'); ?>" target="_blank" rel="noopener noreferrer">Read Docs</a>
            </div>
        </div>

        <div class="ezych-author-info" style="margin-top: 30px; text-align: center; border-top: 1px solid #eee; padding-top: 20px;">
            <p>Plugin Developed by <strong>Ecare Solutions</strong></p>
        </div>
    <?php
    }

    // support_page_html removed as it is now a tab


    public function save_settings_ajax()
    {
        check_ajax_referer('ezycheckout_admin_nonce', 'security');

        if (!current_user_can('manage_options')) {
            wp_send_json_error('Permission denied');
        }

        $sanitizers = $this->get_option_sanitizers();
        $checkboxes = array('ezycheckout_replace_checkout', 'ezycheckout_cartflows_support', 'ezycheckout_enable_single_product', 'ezycheckout_enable_archive', 'ezycheckout_enable_quantity', 'ezycheckout_enable_coupon', 'ezycheckout_enable_notes', 'ezycheckout_btn_separate');

        $posted_data = wp_unslash($_POST);
        foreach ($sanitizers as $key => $callback) {
            if (isset($posted_data[$key])) {
                $raw_value = $posted_data[$key];
                $clean_value = call_user_func(array($this, $callback), $raw_value);
                update_option($key, $clean_value);
                continue;
            }

            if (in_array($key, $checkboxes, true)) {
                update_option($key, 0);
            }
        }

        $posted_keys = array_keys($posted_data);
        foreach ($posted_keys as $key) {
            if ('ezycheckout_admin_nonce_field' === (string) $key) {
                continue;
            }
            if (0 === strpos((string) $key, 'ezycheckout_') && !isset($sanitizers[$key])) {
                $this->log_security_event('unexpected_option_key_blocked', array('key' => sanitize_text_field((string) $key)));
            }
        }

        wp_send_json_success();
    }


    public function inject_buy_now_button()
    {
        if (!get_option('ezycheckout_enable_single_product', 1)) {
            return; // Disabled on single product
        }

        global $product;
        if (!$product)
            return;

        $pos = get_option('ezycheckout_buy_now_pos');
        if (!$pos)
            return;

        $label = get_option('ezycheckout_buy_now_label', 'Order Now');

        // Determine animation class for single product button
        $anim_setting = get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'));
        $anim_class = $this->get_animation_class($anim_setting);

        if ($product->is_type('variable')) {
            echo '<button type="button" class="order-now-btn button alt ' . esc_attr($anim_class) . '" data-product-type="variable" data-product-id="' . esc_attr($product->get_id()) . '">' . esc_html($label) . '</button>';
        } else {
            echo '<button type="button" class="order-now-btn button alt ' . esc_attr($anim_class) . '" data-product-id="' . esc_attr($product->get_id()) . '" data-product-name="' . esc_attr($product->get_name()) . '" data-product-price="' . esc_attr($product->get_price()) . '" data-product-image="' . esc_url(get_the_post_thumbnail_url($product->get_id(), 'thumbnail')) . '">' . esc_html($label) . '</button>';
        }
    }

    public function replace_checkout_url($url)
    {
        if (!get_option('ezycheckout_replace_checkout'))
            return $url;
        if (get_option('ezycheckout_cartflows_support')) {
            if (function_exists('_is_wcf_checkout_type') && _is_wcf_checkout_type())
                return $url;
            if (isset($GLOBALS['wcf_step']))
                return $url;
        }
        if (is_admin() || wp_doing_ajax())
            return $url;
        return '#ezych-checkout';
    }

    public function get_shipping_methods()
    {
        if (!class_exists('WC_Shipping_Zones')) {
            return array();
        }

        $methods = array();
        $zones = WC_Shipping_Zones::get_zones();

        // Add "Rest of the World" zone (ID 0)
        $zone0 = new WC_Shipping_Zone(0);
        $zones[] = array(
            'zone_id' => 0,
            'zone_name' => $zone0->get_zone_name(),
            'formatted_zone_location' => $zone0->get_formatted_location(),
            'shipping_methods' => $zone0->get_shipping_methods()
        );

        foreach ($zones as $zone_data) {
            $shipping_methods = $zone_data['shipping_methods'];
            foreach ($shipping_methods as $method) {
                if ('yes' === $method->enabled) {
                    $cost = 0;
                    // Try getting cost from various possible locations
                    if (isset($method->settings['cost'])) {
                        $cost = floatval($method->settings['cost']);
                    } elseif (isset($method->instance_settings['cost'])) {
                        $cost = floatval($method->instance_settings['cost']);
                    } elseif (method_exists($method, 'get_cost')) {
                        $cost = floatval($method->get_cost());
                    } elseif (isset($method->cost)) {
                        $cost = floatval($method->cost);
                    }

                    // Fallback: If cost is still 0, try fetching from the options table directly
                    if ($cost == 0 && isset($method->instance_id) && $method->instance_id) {
                        $option_key = 'woocommerce_flat_rate_' . $method->instance_id . '_settings';
                        $option = get_option($option_key);
                        if ($option && isset($option['cost'])) {
                            $cost = floatval($option['cost']);
                        }
                    }

                    // Use Zone Name as the label as requested
                    $label = $zone_data['zone_name'];
                    // If multiple methods in same zone, maybe append method title? 
                    // User said: "shipping zone name will be shown".

                    $methods[] = array(
                        'label' => $label,
                        'cost'  => $cost,
                        'value' => $method->instance_id
                    );
                }
            }
        }

        return $methods;
    }

    /**
     * Build valid shipping rates for current order context and return normalized map.
     * Keys include both full rate_id (e.g. flat_rate:3) and instance_id for backward compatibility.
     */
    private function get_context_shipping_rates($is_cart, $product_id = 0, $variation_id = 0, $qty = 1, $destination = array())
    {
        if (!class_exists('WooCommerce')) {
            return array();
        }

        $packages = array();

        if ($is_cart) {
            if (!WC()->cart) {
                return array();
            }
            $packages = WC()->cart->get_shipping_packages();
        } else {
            $product = wc_get_product($variation_id ? $variation_id : $product_id);
            if (!$product) {
                return array();
            }

            $item_total = (float) wc_get_price_to_display($product) * max(1, (int) $qty);
            $packages[] = array(
                'contents' => array(
                    'ezycheckout_single_item' => array(
                        'key' => 'ezycheckout_single_item',
                        'product_id' => $product->get_id(),
                        'variation_id' => $variation_id ? $variation_id : 0,
                        'variation' => array(),
                        'quantity' => max(1, (int) $qty),
                        'data' => $product,
                        'line_total' => $item_total,
                        'line_tax' => 0,
                        'line_subtotal' => $item_total,
                        'line_subtotal_tax' => 0,
                    ),
                ),
                'contents_cost' => $item_total,
                'applied_coupons' => array(),
                'user' => array(
                    'ID' => get_current_user_id(),
                ),
                'destination' => array(
                    'country' => isset($destination['country']) ? $destination['country'] : 'BD',
                    'state' => isset($destination['state']) ? $destination['state'] : '',
                    'postcode' => isset($destination['postcode']) ? $destination['postcode'] : '',
                    'city' => isset($destination['city']) ? $destination['city'] : '',
                    'address' => isset($destination['address']) ? $destination['address'] : '',
                    'address_2' => isset($destination['address_2']) ? $destination['address_2'] : '',
                ),
            );
        }

        if (empty($packages)) {
            return array();
        }

        // Ensure destination is present for all packages before calculating rates.
        foreach ($packages as &$package) {
            if (!isset($package['destination']) || !is_array($package['destination'])) {
                $package['destination'] = array();
            }
            $package['destination'] = wp_parse_args($package['destination'], array(
                'country' => isset($destination['country']) ? $destination['country'] : 'BD',
                'state' => isset($destination['state']) ? $destination['state'] : '',
                'postcode' => isset($destination['postcode']) ? $destination['postcode'] : '',
                'city' => isset($destination['city']) ? $destination['city'] : '',
                'address' => isset($destination['address']) ? $destination['address'] : '',
                'address_2' => isset($destination['address_2']) ? $destination['address_2'] : '',
            ));
        }
        unset($package);

        $calculated_packages = WC()->shipping()->calculate_shipping($packages);
        $valid_rates = array();

        if (is_array($calculated_packages)) {
            foreach ($calculated_packages as $package) {
                if (empty($package['rates']) || !is_array($package['rates'])) {
                    continue;
                }
                foreach ($package['rates'] as $rate_id => $rate) {
                    $rate_id_str = (string) $rate_id;
                    $instance_id = method_exists($rate, 'get_instance_id') ? (string) $rate->get_instance_id() : '';
                    $method_id = method_exists($rate, 'get_method_id') ? (string) $rate->get_method_id() : '';
                    $label = method_exists($rate, 'get_label') ? (string) $rate->get_label() : 'Shipping';
                    $cost = method_exists($rate, 'get_cost') ? (float) $rate->get_cost() : 0.0;

                    $entry = array(
                        'rate_id' => $rate_id_str,
                        'method_id' => $method_id,
                        'instance_id' => $instance_id,
                        'label' => $label,
                        'cost' => $cost,
                    );

                    $valid_rates[$rate_id_str] = $entry;
                    if ('' !== $instance_id) {
                        $valid_rates[$instance_id] = $entry; // Backward-compatible match.
                    }
                }
            }
        }

        return $valid_rates;
    }

    private function map_rates_to_list($rates_map)
    {
        $result = array();
        $seen = array();
        foreach ($rates_map as $key => $rate) {
            if (!is_array($rate) || empty($rate['rate_id'])) {
                continue;
            }
            $rate_id = (string) $rate['rate_id'];
            if (isset($seen[$rate_id])) {
                continue;
            }
            $seen[$rate_id] = true;
            $result[] = array(
                'value' => $rate_id,
                'cost' => isset($rate['cost']) ? (float) $rate['cost'] : 0,
                'label' => isset($rate['label']) ? (string) $rate['label'] : 'Shipping',
            );
        }
        return $result;
    }

    public function get_shipping_methods_ajax()
    {
        check_ajax_referer('ezycheckout_checkout_nonce', 'security');
        if (!class_exists('WooCommerce')) {
            wp_send_json_error(array('message' => 'WooCommerce missing.'), 500);
        }

        $is_cart = isset($_POST['is_cart']) && '1' === sanitize_text_field(wp_unslash($_POST['is_cart']));
        $product_id = isset($_POST['product_id']) ? absint(wp_unslash($_POST['product_id'])) : 0;
        $variation_id = isset($_POST['variation_id']) ? absint(wp_unslash($_POST['variation_id'])) : 0;
        $qty = isset($_POST['quantity']) ? absint(wp_unslash($_POST['quantity'])) : 1;
        if ($qty < 1) {
            $qty = 1;
        }
        $destination = array(
            'country' => 'BD',
            'address' => isset($_POST['billing_address']) ? sanitize_textarea_field(wp_unslash($_POST['billing_address'])) : '',
            'address_2' => '',
            'city' => '',
            'state' => '',
            'postcode' => '',
        );

        if (!$is_cart) {
            $target_product = wc_get_product($variation_id ? $variation_id : $product_id);
            if (!$target_product || !$target_product->is_purchasable() || !$target_product->is_in_stock() || !$target_product->is_visible()) {
                $this->log_security_event('shipping_methods_invalid_product', array('product_id' => $product_id, 'variation_id' => $variation_id));
                wp_send_json_error(array('message' => 'Invalid product.'), 400);
            }
        }

        $rates_map = $this->get_context_shipping_rates($is_cart, $product_id, $variation_id, $qty, $destination);
        $methods = $this->map_rates_to_list($rates_map);
        wp_send_json_success(array('methods' => $methods));
    }

    public function render_popup_html()
    {
        if (!class_exists('WooCommerce'))
            return;
        $shipping_rates_map = $this->get_context_shipping_rates(true, 0, 0, 1, array('country' => 'BD'));
        $shipping_methods = $this->map_rates_to_list($shipping_rates_map);
        $first_method_cost = !empty($shipping_methods) ? $shipping_methods[0]['cost'] : 0;

        // Load Text Options
        $txt_header = get_option('ezycheckout_header_title', 'ক্যাশ অন ডেলিভারিতে অর্ডার করতে আপনার তথ্য দিন');
        $txt_shipping = get_option('ezycheckout_shipping_title', 'শিপিং মেথড');
        $txt_disclaimer = get_option('ezycheckout_btn_disclaimer', 'উপরের বাটনে ক্লিক করলে আপনার অর্ডারটি সাথে সাথে কনফার্ম হয়ে যাবে!');

        $enable_qty = get_option('ezycheckout_enable_quantity', 1);
        $enable_coupon = get_option('ezycheckout_enable_coupon', 1);
        $enable_notes = get_option('ezycheckout_enable_notes', 1);
        $lbl_name = get_option('ezycheckout_name_label', 'আপনার নাম');
        $lbl_phone = get_option('ezycheckout_phone_label', 'ফোন নাম্বার');
        $lbl_address = get_option('ezycheckout_address_label', 'এড্রেস');
        $lbl_notes = get_option('ezycheckout_note_label', 'Order note');
        $lbl_subtotal = get_option('ezycheckout_subtotal_label', 'সাব টোটাল');
        $lbl_discount = get_option('ezycheckout_discount_label', 'ডিসকাউন্ট');
        $lbl_shipping = get_option('ezycheckout_shipping_label', 'ডেলিভারি চার্জ');
        $lbl_total = get_option('ezycheckout_total_label', 'সর্বমোট');
        $lbl_submit = get_option('ezycheckout_lbl_submit', 'Place Order');

        $ph_name = get_option('ezycheckout_name_placeholder', 'আপনার নাম');
        $ph_phone = get_option('ezycheckout_phone_placeholder', 'ফোন নাম্বার');
        $ph_address = get_option('ezycheckout_address_placeholder', 'এড্রেস');
        $ph_notes = get_option('ezycheckout_note_placeholder', 'Order note');
        $ph_coupon = get_option('ezycheckout_coupon_placeholder', 'কুপন কোড');

        $btn_bg = get_option('ezycheckout_btn_bg', '#ff6b6b');
        $btn_color = get_option('ezycheckout_btn_color', '#ffffff');
        $submit_align = get_option('ezycheckout_submit_alignment', 'center');
        $btn_apply = get_option('ezycheckout_coupon_btn_text', 'এপ্লাই');
        $btn_remove = get_option('ezycheckout_btn_remove', 'Remove');
        $anim_class = get_option('ezycheckout_btn_anim', 'none');
        if ('none' !== $anim_class) {
            $anim_class = 'ezych-anim-' . $anim_class;
        } else {
            $anim_class = '';
        }

    ?>
        <div id="ezych-checkout-modal" class="ezych-modal" style="display:none;">
            <div class="ezych-modal-content">
                <span class="ezych-close">&times;</span>
                <div class="ezych-modal-header">
                    <h2><?php echo esc_html($txt_header); ?></h2>
                </div>
                <form id="ezych-checkout-form">
                    <input type="hidden" name="product_id" id="ezych-product-id" value="">
                    <input type="hidden" name="variation_id" id="ezych-variation-id" value="">
                    <input type="hidden" name="quantity" id="ezych-quantity" value="1">
                    <input type="hidden" name="ezycheckout_is_cart" id="ezych-is-cart" value="0">
                    <input type="hidden" name="coupon_code" id="ezych-coupon-code-input" value="">
                    <input type="hidden" name="ezycheckout_request_token" id="ezych-request-token" value="">

                    <!-- Variation Selector Container -->
                    <div id="ezych-variation-selector"
                        style="display:none; margin-bottom: 15px; border-bottom:1px solid #eee; padding-bottom:10px;"></div>

                    <div class="ezych-form-group">
                        <label for="ezych-name"><?php echo esc_html($lbl_name); ?><span>*</span></label>
                        <div class="ezych-input-group">
                            <span class="ezych-input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            </span>
                            <input type="text" id="ezych-name" name="billing_name" placeholder="<?php echo esc_attr($ph_name); ?>" required>
                        </div>
                    </div>
                    <div class="ezych-form-group">
                        <label for="ezych-phone"><?php echo esc_html($lbl_phone); ?><span>*</span></label>
                        <div class="ezych-input-group">
                            <span class="ezych-input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 1.25 0 2.45.2 3.57.57.35.13.74.04 1.02-.24l2.2-2.2z" />
                                </svg>
                            </span>
                            <input type="tel" id="ezych-phone" name="billing_phone" placeholder="<?php echo esc_attr($ph_phone); ?>" required>
                        </div>
                    </div>
                    <div class="ezych-form-group">
                        <label for="ezych-address"><?php echo esc_html($lbl_address); ?><span>*</span></label>
                        <div class="ezych-input-group">
                            <span class="ezych-input-icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                </svg>
                            </span>
                            <input type="text" id="ezych-address" name="billing_address" placeholder="<?php echo esc_attr($ph_address); ?>" required>
                        </div>
                    </div>
                    <div class="ezych-section-title"><?php echo esc_html($txt_shipping); ?></div>
                    <div class="ezych-shipping-methods">
                        <?php foreach ($shipping_methods as $index => $method): ?>
                            <label class="ezych-radio-label">
                                <input type="radio" name="shipping_method" value="<?php echo esc_attr($method['value']); ?>"
                                    data-cost="<?php echo esc_attr($method['cost']); ?>" <?php checked($index, 0); ?>>
                                <span class="ezych-radio-text"><?php echo esc_html($method['label']); ?></span>
                                <span class="ezych-price">Tk <?php echo number_format($method['cost'], 2); ?></span>
                            </label>
                        <?php endforeach; ?>
                    </div>
                    <?php if ($enable_coupon): ?>
                        <div class="ezych-coupon-section">
                            <div class="ezych-coupon-row">
                                <input type="text" id="ezych-coupon" placeholder="<?php echo esc_attr($ph_coupon); ?>">
                                <button type="button" id="ezych-apply-coupon"><?php echo esc_html($btn_apply); ?></button>
                            </div>
                            <div id="ezych-coupon-msg" style="margin-top:5px; font-size:12px;"></div>
                        </div>
                    <?php endif; ?>
                    <div class="ezych-order-summary" id="ezych-order-summary">
                        <!-- Content populated by JS -->
                        <div class="ezych-product-item">
                            <div class="ezych-product-thumb">
                                <img src="" alt="" id="ezych-product-image">
                            </div>
                            <div class="ezych-product-info">
                                <div class="ezych-product-name" id="ezych-product-name">Product Name</div>
                                <div class="ezych-product-price" id="ezych-product-price">Tk 0.00</div>
                                <?php if ($enable_qty): ?>
                                    <div class="ezych-product-actions">
                                        <div class="ezych-quantity-selector" id="ezych-qty-selector" style="display:none;">
                                            <button type="button" class="ezych-qty-btn" data-action="decrease">−</button>
                                            <input type="number" id="ezych-qty-display" value="1" min="1" readonly>
                                            <button type="button" class="ezych-qty-btn" data-action="increase">+</button>
                                        </div>
                                        <a href="#" class="ezych-remove-item" style="display:none;">Remove</a>
                                    </div>
                                <?php endif; ?>
                            </div>
                        </div>
                    </div>
                    <div class="ezych-totals">
                        <div class="ezych-row">
                            <span><?php echo esc_html($lbl_subtotal); ?></span>
                            <span id="ezych-subtotal">Tk 0.00</span>
                        </div>
                        <div class="ezych-row" id="ezych-discount-row" style="display:none;">
                            <span><?php echo esc_html($lbl_discount); ?></span>
                            <span id="ezych-discount-amount">- Tk 0.00</span>
                        </div>
                        <div class="ezych-row">
                            <span><?php echo esc_html($lbl_shipping); ?></span>
                            <span id="ezych-shipping-cost">Tk <?php echo number_format($first_method_cost, 2); ?></span>
                        </div>
                        <div class="ezych-row ezych-grand-total">
                            <span><?php echo esc_html($lbl_total); ?></span>
                            <span id="ezych-total">Tk <?php echo number_format($first_method_cost, 2); ?></span>
                        </div>
                    </div>
                    <?php if ($enable_notes): ?>
                        <div class="ezych-form-group">
                            <div class="ezych-section-title" style="margin-bottom:5px; font-size:14px;"><?php echo esc_html($lbl_notes); ?></div>
                            <div class="ezych-input-group">
                                <input type="text" id="ezych-notes" name="order_notes" placeholder="<?php echo esc_attr($ph_notes); ?>">
                            </div>
                        </div>
                    <?php endif; ?>
                    <div class="ezych-submit-wrapper" style="text-align: <?php echo esc_attr($submit_align); ?>;">
                        <button type="submit" class="ezych-submit-btn <?php echo esc_attr($anim_class); ?>">
                            <?php echo esc_html($lbl_submit); ?>
                        </button>
                        <div class="ezych-disclaimer-text"><?php echo esc_html($txt_disclaimer); ?></div>
                    </div>
                </form>
            </div>
        </div>
<?php
    }

    public function get_cart_details()
    {
        check_ajax_referer('ezycheckout_checkout_nonce', 'security');
        if (!class_exists('WooCommerce'))
            wp_send_json_error();
        $cart = WC()->cart;
        $items = array();
        foreach ($cart->get_cart() as $cart_item_key => $cart_item) {
            $product = $cart_item['data'];
            $items[] = array(
                'name' => $product->get_name(),
                'price' => wc_price($cart_item['line_total']),
                'raw_price' => $cart_item['line_total'],
                'qty' => $cart_item['quantity'],
                'image' => get_the_post_thumbnail_url($product->get_id(), 'thumbnail'),
            );
        }
        wp_send_json_success(array(
            'items' => $items,
            'subtotal' => $cart->get_cart_contents_total(),
            'subtotal_raw' => $cart->get_subtotal(),
        ));
    }

    public function get_variable_product_data()
    {
        check_ajax_referer('ezycheckout_checkout_nonce', 'security');
        $product_id = isset($_POST['product_id']) ? absint(wp_unslash($_POST['product_id'])) : 0;
        if (!$product_id)
            wp_send_json_error();

        $product = wc_get_product($product_id);
        if (!$product || !$product->is_type('variable') || !$product->is_purchasable() || !$product->is_in_stock() || !$product->is_visible())
            wp_send_json_error();

        $available_variations = $product->get_available_variations();
        $attributes = $product->get_variation_attributes();

        wp_send_json_success(array(
            'variations' => $available_variations,
            'attributes' => $attributes,
            'base_name' => $product->get_name(),
            'base_image' => get_the_post_thumbnail_url($product->get_id(), 'thumbnail')
        ));
    }

    public function apply_coupon_check()
    {
        check_ajax_referer('ezycheckout_checkout_nonce', 'security');

        $code = isset($_POST['coupon']) ? sanitize_text_field(wp_unslash($_POST['coupon'])) : '';
        $is_cart = isset($_POST['is_cart']) && '1' === sanitize_text_field(wp_unslash($_POST['is_cart']));

        if ($this->rate_limit_hit('ezycheckout_coupon_check', 15, MINUTE_IN_SECONDS, $code)) {
            $this->log_security_event('coupon_rate_limited');
            wp_send_json_error(array('message' => 'Coupon check failed.'), 429);
        }

        if (empty($code))
            wp_send_json_error(array('message' => 'Coupon check failed.'));

        $coupon = new WC_Coupon($code);
        if (!$coupon->get_id()) {
            $this->log_security_event('coupon_invalid_id', array('is_cart' => $is_cart ? 1 : 0));
            wp_send_json_error(array('message' => 'Coupon check failed.'));
        }

        if ($is_cart) {
            if (WC()->cart->has_discount($code)) {
                wp_send_json_error(array('message' => 'Coupon processed.'));
            }
            $result = WC()->cart->apply_coupon($code);
            if ($result === true) {
                $discount = WC()->cart->get_coupon_discount_amount($code);
                WC()->cart->remove_coupon($code);
                wp_send_json_success(array(
                    'discount' => $discount,
                    'message' => 'Coupon processed.'
                ));
            } else {
                $this->log_security_event('coupon_rejected_for_cart');
                wp_send_json_error(array('message' => 'Coupon processed.'));
            }
        } else {
            // Avoid acting as an oracle for non-cart coupons in public context.
            wp_send_json_success(array(
                'discount' => 0,
                'message' => 'Coupon will be verified at checkout.'
            ));
        }
    }

    public function inject_buy_now_button_single()
    {
        if (!get_option('ezycheckout_enable_single_product', 1)) {
            return; // Disabled on single product
        }

        global $product;
        if (!$product || !$product->is_purchasable() || !$product->is_in_stock()) {
            return;
        }

        $btn_bg = get_option('ezycheckout_btn_bg', '#ff6b6b');
        $btn_color = get_option('ezycheckout_btn_color', '#ffffff');
        $btn_text = get_option('ezycheckout_buy_now_label', 'Order Now');
        $anim_setting = get_option('ezycheckout_single_btn_anim', get_option('ezycheckout_btn_anim', 'none'));

        // Map animation setting to CSS class
        $anim_class = $this->get_animation_class($anim_setting);

        echo '<button type="button" class="button order-now-btn ' . esc_attr($anim_class) . '" data-product-id="' . esc_attr($product->get_id()) . '" data-product-image="' . esc_url(get_the_post_thumbnail_url($product->get_id(), 'thumbnail')) . '" style="width: 100%; margin-top: 10px;">' .
            esc_html($btn_text) .
            '</button>';
    }

    // Helper function to map animation settings to CSS classes
    private function get_animation_class($anim_setting)
    {
        $animation_map = array(
            'shake' => 'ezych-anim-shake',
            'pulse' => 'ezych-anim-pulse',
            'bounce' => 'ezych-anim-bounce',
            'swing' => 'ezych-anim-swing',
            'tada' => 'ezych-anim-tada',
            'wobble' => 'ezych-anim-wobble',
            'flip' => 'ezych-anim-flip',
            'rubberband' => 'ezych-anim-rubberband',
            'jello' => 'ezych-anim-jello',
        );

        return isset($animation_map[$anim_setting]) ? $animation_map[$anim_setting] : '';
    }

    public function should_show_popup()
    {
        if (!get_option('ezycheckout_enable_single_product', 1)) {
            return false;
        }

        $buy_now_pos = get_option('ezycheckout_buy_now_pos', '');
        if (function_exists('_is_wcf_checkout_type') && _is_wcf_checkout_type()) {
            return false;
        }

        // Only show if not in admin or doing AJAX
        if (is_admin() || wp_doing_ajax()) {
            return false;
        }

        return true;
    }

    public function inject_buy_now_button_loop()
    {
        if (!get_option('ezycheckout_enable_archive', 1)) {
            return; // Disabled on archive/shop
        }

        global $product;
        if (!$product || !$product->is_purchasable() || !$product->is_in_stock()) {
            return;
        }

        $btn_bg = get_option('ezycheckout_btn_bg', '#ff6b6b');
        $btn_color = get_option('ezycheckout_btn_color', '#ffffff');
        $btn_text = get_option('ezycheckout_buy_now_label', 'Order Now');
        $layout = get_option('ezycheckout_archive_btn_layout', 'inline');
        $anim_setting = get_option('ezycheckout_archive_btn_anim', 'none');

        // Map animation setting to CSS class
        $anim_class = $this->get_animation_class($anim_setting);

        // Determine button style based on layout setting
        if ($layout === 'inline') {
            // Inline: next to Add to Cart button
            $button_style = 'margin-left: 5px; display: inline-block;';
        } else {
            // Full width: below Add to Cart button
            $button_style = 'margin-top: 10px; width: 100%; display: block;';
        }

        echo '<button type="button" class="button order-now-btn ' . esc_attr($anim_class) . '" data-product-id="' . esc_attr($product->get_id()) . '" data-product-name="' . esc_attr($product->get_name()) . '" data-product-price="' . esc_attr($product->get_price()) . '" data-product-image="' . esc_url(get_the_post_thumbnail_url($product->get_id(), 'thumbnail')) . '"
                style="' . esc_attr($button_style) . '">' .
            esc_html($btn_text) .
            '</button>';
    }

    public function handle_order_placement()
    {
        check_ajax_referer('ezycheckout_checkout_nonce', 'security');
        try {

            $request_token = isset($_POST['ezycheckout_request_token']) ? sanitize_text_field(wp_unslash($_POST['ezycheckout_request_token'])) : '';

            if ($this->rate_limit_hit('ezycheckout_place_order', 8, MINUTE_IN_SECONDS, $request_token)) {
                $this->log_security_event('order_rate_limited');
                wp_send_json_error(array('message' => 'Too many requests. Please wait and try again.'), 429);
            }

            $product_id = isset($_POST['product_id']) ? absint(wp_unslash($_POST['product_id'])) : 0;
            $variation_id = isset($_POST['variation_id']) ? absint(wp_unslash($_POST['variation_id'])) : 0;
            $is_cart = isset($_POST['ezycheckout_is_cart']) && '1' === sanitize_text_field(wp_unslash($_POST['ezycheckout_is_cart']));
            $shipping_val = isset($_POST['shipping_method']) ? sanitize_text_field(wp_unslash($_POST['shipping_method'])) : '';
            $coupon_code = isset($_POST['coupon_code']) ? sanitize_text_field(wp_unslash($_POST['coupon_code'])) : '';
            $billing_name = isset($_POST['billing_name']) ? sanitize_text_field(wp_unslash($_POST['billing_name'])) : '';
            $billing_phone = isset($_POST['billing_phone']) ? sanitize_text_field(wp_unslash($_POST['billing_phone'])) : '';
            $billing_address = isset($_POST['billing_address']) ? sanitize_textarea_field(wp_unslash($_POST['billing_address'])) : '';
            $order_notes = isset($_POST['order_notes']) ? sanitize_textarea_field(wp_unslash($_POST['order_notes'])) : '';
            if ('' === $order_notes && isset($_POST['order_note'])) {
                $order_notes = sanitize_textarea_field(wp_unslash($_POST['order_note']));
            }
            $qty = isset($_POST['quantity']) ? absint(wp_unslash($_POST['quantity'])) : 1;

            if ('' === $request_token) {
                $this->log_security_event('missing_idempotency_token');
                wp_send_json_error(array('message' => 'Please refresh and try again.'), 400);
            }
            $idempotency_key = 'ezycheckout_request_token_' . md5($request_token);
            if (get_transient($idempotency_key)) {
                $this->log_security_event('duplicate_order_blocked');
                wp_send_json_error(array('message' => 'Duplicate request blocked. Please wait.'), 409);
            }

            if ('' === $billing_name || '' === $billing_phone || '' === $billing_address) {
                wp_send_json_error(array('message' => 'Please fill all required fields.'), 400);
            }

            if (!preg_match('/^[0-9+\-\s()]{6,20}$/', $billing_phone)) {
                wp_send_json_error(array('message' => 'Invalid phone number.'), 400);
            }

            if ($qty < 1 || $qty > 100) {
                wp_send_json_error(array('message' => 'Invalid quantity.'), 400);
            }

            $destination = array(
                'country' => 'BD',
                'address' => $billing_address,
                'address_2' => '',
                'city' => '',
                'state' => '',
                'postcode' => '',
            );

            $valid_shipping_rates = $this->get_context_shipping_rates($is_cart, $product_id, $variation_id, $qty, $destination);
            if (empty($shipping_val) || !isset($valid_shipping_rates[(string) $shipping_val])) {
                $this->log_security_event('invalid_shipping_selection', array('shipping' => $shipping_val));
                wp_send_json_error(array('message' => 'Invalid shipping method.'), 400);
            }
            $selected_rate = $valid_shipping_rates[(string) $shipping_val];
            $shipping_cost = (float) $selected_rate['cost'];
            $shipping_label = $selected_rate['label'];
            $shipping_method_id = !empty($selected_rate['method_id']) ? $selected_rate['method_id'] : 'flat_rate';

            // Set only after passing critical validations to avoid consuming token on input errors.
            set_transient($idempotency_key, 1, 10 * MINUTE_IN_SECONDS);

            $order = wc_create_order();

            if ($is_cart) {
                if (WC()->cart->is_empty())
                    wp_send_json_error(array('message' => 'Empty cart.'));
                foreach (WC()->cart->get_cart() as $cart_item) {
                    $order->add_product($cart_item['data'], $cart_item['quantity']);
                }
                if (!empty($coupon_code)) {
                    $order->apply_coupon($coupon_code);
                }
            } else {
                if (!$product_id)
                    wp_send_json_error(array('message' => 'Invalid product.'));

                $target_product = wc_get_product($variation_id ? $variation_id : $product_id);
                if (!$target_product || !$target_product->is_purchasable() || !$target_product->is_in_stock() || !$target_product->is_visible()) {
                    $this->log_security_event('order_invalid_product_state', array('product_id' => $product_id, 'variation_id' => $variation_id));
                    wp_send_json_error(array('message' => 'Invalid product.'), 400);
                }

                $args = array();
                if ($variation_id) {
                    $variation_product = wc_get_product($variation_id);
                    if (
                        !$variation_product ||
                        !$variation_product->is_type('variation') ||
                        intval($variation_product->get_parent_id()) !== $product_id
                    ) {
                        wp_send_json_error(array('message' => 'Invalid variation selection.'), 400);
                    }
                    $args['variation_id'] = $variation_id;
                }
                $order->add_product(wc_get_product($variation_id ? $variation_id : $product_id), $qty, $args);

                if (!empty($coupon_code)) {
                    $order->apply_coupon($coupon_code);
                }
            }

            $address_data = array(
                'first_name' => $billing_name,
                'phone' => $billing_phone,
                'address_1' => $billing_address,
                'country' => 'BD',
            );
            $order->set_address($address_data, 'billing');
            $order->set_address($address_data, 'shipping');

            $item = new WC_Order_Item_Shipping();
            $item->set_method_id($shipping_method_id);
            $item->set_method_title($shipping_label);
            $item->set_total($shipping_cost);
            $order->add_item($item);

            $order->calculate_totals();
            $order->set_customer_note($order_notes);
            $order->update_status('processing', 'Order created via Ezy Checkout');

            if ($is_cart) {
                WC()->cart->empty_cart();
            }

            wp_send_json_success(array(
                'message' => 'Order placed successfully!',
                'redirect' => $order->get_checkout_order_received_url()
            ));
        } catch (\Throwable $e) {
            $this->log_security_event('order_exception', array('message' => $e->getMessage()));
            wp_send_json_error(array('message' => 'Order processing failed. Please try again.'), 500);
        }
    }
}

new Ezycheckout_Plugin();
