jQuery(document).ready(function ($) {
    const modal = $('#ezych-checkout-modal');
    const closeBtn = $('.ezych-close');
    const form = $('#ezych-checkout-form');
    const escapeHtml = (value) => String(value || '').replace(/[&<>"']/g, function (char) {
        return ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        })[char];
    });
    const safeImageUrl = (value) => {
        const raw = String(value || '').trim();
        if (!raw) return '';
        try {
            const url = new URL(raw, window.location.origin);
            return (url.protocol === 'http:' || url.protocol === 'https:') ? url.href : '';
        } catch (e) {
            return '';
        }
    };
    const getOrCreateRequestToken = () => {
        let token = $('#ezych-request-token').val();
        if (!token) {
            token = 'ezycheckout_' + Date.now().toString(36) + '_' + Math.random().toString(36).slice(2, 10);
            $('#ezych-request-token').val(token);
        }
        return token;
    };
    const resetRequestToken = () => {
        $('#ezych-request-token').val('');
        getOrCreateRequestToken();
    };
    const renderShippingMethods = (methods) => {
        const $container = $('.ezych-shipping-methods');
        if (!$container.length) {
            return;
        }
        $container.empty();
        if (!Array.isArray(methods) || methods.length === 0) {
            $container.append('<p class="ezych-no-shipping">No shipping method available for this address.</p>');
            updateTotals();
            return;
        }
        const currentValue = $('input[name="shipping_method"]:checked').val() || '';
        methods.forEach(function (method, index) {
            const methodValue = String(method.value || '');
            const methodCost = parseFloat(method.cost) || 0;
            const methodLabel = escapeHtml(method.label || 'Shipping');
            const checked = currentValue ? (currentValue === methodValue) : (index === 0);
            const rowHtml = `
                <label class="ezych-radio-label">
                    <input type="radio" name="shipping_method" value="${escapeHtml(methodValue)}" data-cost="${methodCost}" ${checked ? 'checked' : ''}>
                    <span class="ezych-radio-text">${methodLabel}</span>
                    <span class="ezych-price">Tk ${methodCost.toFixed(2)}</span>
                </label>
            `;
            $container.append(rowHtml);
        });
        updateTotals();
    };
    const refreshShippingMethods = () => {
        const payload = {
            action: 'ezycheckout_get_shipping_methods',
            security: ezyCheckout.nonce,
            is_cart: $('#ezych-is-cart').val() === '1' ? '1' : '0',
            product_id: $('#ezych-product-id').val() || '',
            variation_id: $('#ezych-variation-id').val() || '',
            quantity: $('#ezych-quantity').val() || 1,
            billing_address: $('#ezych-address').val() || ''
        };
        $.ajax({
            url: ezyCheckout.ajax_url,
            type: 'POST',
            data: payload,
            success: function (response) {
                if (response && response.success && response.data && Array.isArray(response.data.methods)) {
                    renderShippingMethods(response.data.methods);
                } else {
                    renderShippingMethods([]);
                }
            },
            error: function () {
                renderShippingMethods([]);
            }
        });
    };
    getOrCreateRequestToken();

    // Check for #ezych-checkout hash on load to open Cart Mode
    if (window.location.hash === '#ezych-checkout') {
        openCartModal();
    }

    // Store original coupon button text
    var originalCouponText = $('#ezych-apply-coupon').text();
    $('#ezych-apply-coupon').data('original-text', originalCouponText);

    // Open Modal on Button Click (Single Product & Archive)
    $(document).on('click', '.order-now-btn', function (e) {
        e.preventDefault();
        resetRequestToken();

        // Single Product Mode
        const productId = $(this).data('product-id');
        const productName = $(this).data('product-name') || 'Product';
        const productPrice = parseFloat($(this).data('product-price')) || 0;
        const productImage = $(this).data('product-image') || '';

        // Populate Hidden Fields and UI
        $('#ezych-product-id').val(productId);
        $('#ezych-is-cart').val('0'); // Not cart
        $('#ezych-quantity').val(1); // Reset quantity

        // Render Single Product with new structure
        const safeProductName = escapeHtml(productName);
        const safeProductImage = safeImageUrl(productImage);
        const summaryHtml = `
            <div class="ezych-product-item">
                <div class="ezych-product-thumb">
                    <img src="${safeProductImage}" alt="">
                    <span class="ezych-qty-badge" id="ezych-product-qty">1</span>
                </div>
                <div class="ezych-product-info">
                    <div class="ezych-product-left">
                        <div class="ezych-product-name">${safeProductName}</div>
                        <div class="ezych-product-actions">
                            <div class="ezych-quantity-selector" id="ezych-qty-selector">
                                <button type="button" class="ezych-qty-btn" data-action="decrease">−</button>
                                <input type="number" id="ezych-qty-display" value="1" min="1" readonly>
                                <button type="button" class="ezych-qty-btn" data-action="increase">+</button>
                            </div>
                            <a href="#" class="ezych-remove-item" style="display:none;">Remove</a>
                        </div>
                    </div>
                    <div class="ezych-product-right">
                        <div class="ezych-product-price" id="ezych-product-price-display">Tk ${productPrice.toFixed(2)}</div>
                    </div>
                </div>
            </div>
        `;
        $('#ezych-order-summary').html(summaryHtml);

        // Store base price and current quantity
        modal.data('base-price', productPrice);
        modal.data('unit-price', productPrice);
        modal.data('current-qty', 1);
        updateTotals();
        refreshShippingMethods();

        modal.fadeIn();
    });

    // Quantity Selector Logic
    $(document).on('click', '.ezych-qty-btn', function () {
        const action = $(this).data('action');
        const qtyInput = $('#ezych-qty-display');
        const hiddenQty = $('#ezych-quantity');
        let currentQty = parseInt(qtyInput.val()) || 1;

        if (action === 'increase') {
            currentQty++;
        } else if (action === 'decrease' && currentQty > 1) {
            currentQty--;
        }

        qtyInput.val(currentQty);
        hiddenQty.val(currentQty);
        $('.ezych-qty-badge').text(currentQty);

        // Update price display and totals
        const unitPrice = modal.data('unit-price') || 0;
        const newTotal = unitPrice * currentQty;
        modal.data('base-price', newTotal);
        modal.data('current-qty', currentQty);
        $('#ezych-product-price-display').text('Tk ' + newTotal.toFixed(2));

        updateTotals();
        refreshShippingMethods();
    });

    function openCartModal() {
        // Set Cart Mode
        $('#ezych-product-id').val('');
        $('#ezych-is-cart').val('1');
        resetRequestToken();
        $('#ezych-order-summary').html('<p style="text-align:center;">Loading cart...</p>');

        modal.fadeIn();

        // Fetch Cart Details
        $.ajax({
            url: ezyCheckout.ajax_url,
            type: 'POST',
            data: {
                action: 'ezycheckout_get_cart_details',
                security: ezyCheckout.nonce
            },
            success: function (response) {
                if (response.success && response.data.items.length > 0) {
                    let html = '';
                    response.data.items.forEach(function (item) {
                        const safeItemName = escapeHtml(item.name);
                        const safeItemPrice = escapeHtml(item.price);
                        const safeItemImage = safeImageUrl(item.image);
                        html += `
                        <div class="ezych-product-item">
                            <div class="ezych-product-thumb">
                                <img src="${safeItemImage}" alt="">
                                <span class="ezych-qty-badge">${item.qty}</span>
                            </div>
                            <div class="ezych-product-info">
                                <div class="ezych-product-left">
                                    <div class="ezych-product-name">${safeItemName}</div>
                                </div>
                                <div class="ezych-product-right">
                                    <div class="ezych-product-price">${safeItemPrice}</div>
                                </div>
                            </div>
                        </div>
                       `;
                    });
                    $('#ezych-order-summary').html(html);

                    // Hide quantity selector for cart mode
                    $('#ezych-qty-selector').hide();

                    // Set base price from cart total (raw)
                    modal.data('base-price', parseFloat(response.data.subtotal_raw));
                    updateTotals();
                    refreshShippingMethods();
                } else {
                    $('#ezych-order-summary').html('<p>Your cart is empty.</p>');
                    modal.data('base-price', 0);
                    updateTotals();
                    refreshShippingMethods();
                }
            }
        });
    }

    // Close Modal
    closeBtn.on('click', function () {
        modal.fadeOut();
        // Clear hash if present to avoid reopening on refresh
        if (window.location.hash === '#ezych-checkout') {
            history.pushState("", document.title, window.location.pathname + window.location.search);
        }
    });

    $(window).on('click', function (e) {
        if ($(e.target).is(modal)) {
            modal.fadeOut();
        }
    });

    let addressDebounce;
    $(document).on('input', '#ezych-address', function () {
        clearTimeout(addressDebounce);
        addressDebounce = setTimeout(function () {
            refreshShippingMethods();
        }, 400);
    });

    // Handle Shipping Change
    $(document).on('change', 'input[name="shipping_method"]', function () {
        updateTotals();
    });

    // Coupon Application
    let appliedDiscount = 0;

    $('#ezych-apply-coupon').on('click', function () {
        const couponCode = $('#ezych-coupon').val().trim();
        const isCart = $('#ezych-is-cart').val() === '1';
        const msgDiv = $('#ezych-coupon-msg');

        if (!couponCode) {
            msgDiv.text('Please enter a coupon code').css('color', 'red');
            return;
        }

        $(this).prop('disabled', true).text('Applying...');

        $.ajax({
            url: ezyCheckout.ajax_url,
            type: 'POST',
            data: {
                action: 'ezycheckout_apply_coupon',
                security: ezyCheckout.nonce,
                coupon: couponCode,
                is_cart: isCart ? '1' : '0'
            },
            success: function (response) {
                if (response.success) {
                    appliedDiscount = parseFloat(response.data.discount) || 0;
                    $('#ezych-coupon-code-input').val(couponCode);
                    msgDiv.text(String(response.data.message || '')).css('color', 'green');

                    if (appliedDiscount > 0) {
                        $('#ezych-discount-row').show();
                        $('#ezych-discount-amount').text('- Tk ' + appliedDiscount.toFixed(2));
                    }
                    updateTotals();
                } else {
                    msgDiv.text(String((response.data && response.data.message) || 'Invalid coupon.')).css('color', 'red');
                }
                $('#ezych-apply-coupon').prop('disabled', false).text($('#ezych-apply-coupon').data('original-text') || 'Apply');
            },
            error: function () {
                msgDiv.text('Error applying coupon').css('color', 'red');
                $('#ezych-apply-coupon').prop('disabled', false).text($('#ezych-apply-coupon').data('original-text') || 'Apply');
            }
        });
    });

    function updateTotals() {
        const basePrice = parseFloat(modal.data('base-price')) || 0;
        const shippingCost = parseFloat($('input[name="shipping_method"]:checked').data('cost')) || 0;
        const discount = appliedDiscount;

        $('#ezych-subtotal').text('Tk ' + basePrice.toFixed(2));
        $('#ezych-shipping-cost').text('Tk ' + shippingCost.toFixed(2));

        const grandTotal = basePrice + shippingCost - discount;
        $('#ezych-total').text('Tk ' + grandTotal.toFixed(2));
    }

    // Form Submission
    form.on('submit', function (e) {
        e.preventDefault();
        getOrCreateRequestToken();

        const submitBtn = $(this).find('.ezych-submit-btn');
        const originalText = submitBtn.html();

        submitBtn.prop('disabled', true).html('Processing...');

        $.ajax({
            url: ezyCheckout.ajax_url,
            type: 'POST',
            data: form.serialize() + '&action=ezycheckout_place_order&security=' + ezyCheckout.nonce,
            success: function (response) {
                if (response.success) {
                    // Redirect to thank you page or show success
                    window.location.href = response.data.redirect;
                } else {
                    alert('Error: ' + response.data.message);
                    resetRequestToken();
                    submitBtn.prop('disabled', false).html(originalText);
                }
            },
            error: function (xhr) {
                let message = 'An error occurred. Please try again.';
                if (xhr && xhr.responseJSON && xhr.responseJSON.data && xhr.responseJSON.data.message) {
                    message = String(xhr.responseJSON.data.message);
                } else if (xhr && xhr.responseJSON && xhr.responseJSON.message) {
                    message = String(xhr.responseJSON.message);
                } else if (xhr && xhr.responseText) {
                    try {
                        const parsed = JSON.parse(xhr.responseText);
                        if (parsed && parsed.data && parsed.data.message) {
                            message = String(parsed.data.message);
                        } else if (parsed && parsed.message) {
                            message = String(parsed.message);
                        }
                    } catch (e) {
                        // Keep fallback message for non-JSON responses.
                    }
                }
                alert(message);
                resetRequestToken();
                submitBtn.prop('disabled', false).html(originalText);
            }
        });
    });
});
