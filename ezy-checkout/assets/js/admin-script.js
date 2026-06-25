jQuery(document).ready(function ($) {
    // Tab Switching
    $('.ezych-nav-tab').on('click', function (e) {
        e.preventDefault();

        // Remove active class from all tabs
        $('.ezych-nav-tab').removeClass('nav-tab-active ezych-nav-tab-active');

        // Add active class to clicked tab
        $(this).addClass('nav-tab-active ezych-nav-tab-active');

        // Hide all tab content
        $('.ezych-tab-content').hide();

        // Show target tab content
        var target = $(this).attr('href'); // #basic, #style, #fields
        $(target).fadeIn(200);
    });

    // Auto-click first tab or hash
    if (window.location.hash) {
        $('a[href="' + window.location.hash + '"]').click();
    } else {
        $('.ezych-nav-tab').first().click();
    }

    // AJAX Saving
    $('#ezych-settings-form').on('submit', function (e) {
        e.preventDefault();

        var $form = $(this);
        var $btn = $form.find('.button-primary');
        var originalText = $btn.text() || $btn.val(); // Support both button and input

        // Maintain button width during state change
        var btnWidth = $btn.outerWidth();
        $btn.css('min-width', btnWidth + 'px');

        $btn.text('Saving...').prop('disabled', true);

        var formData = $form.serialize();
        formData += '&action=ezycheckout_save_settings';
        formData += '&security=' + ezyCheckoutAdmin.nonce;

        $.post(ezyCheckoutAdmin.ajax_url, formData, function (response) {
            $btn.text(originalText).prop('disabled', false);

            if (response.success) {
                showNotification('Settings saved successfully!', 'success');
            } else {
                showNotification('Error saving settings.', 'error');
            }
        }).fail(function () {
            $btn.text(originalText).prop('disabled', false);
            showNotification('Server error.', 'error');
        });
    });

    function showNotification(message, type) {
        var bgColor = type === 'success' ? '#46b450' : '#dc3232';
        var $notification = $('<div class="ezych-notification">' + message + '</div>');

        $('body').append($notification);

        $notification.css({
            'position': 'fixed',
            'top': '60px', // Account for WordPress admin bar (32px) + padding
            'right': '20px',
            'background': bgColor,
            'color': '#fff',
            'padding': '15px 25px',
            'border-radius': '5px',
            'box-shadow': '0 4px 10px rgba(0,0,0,0.2)',
            'z-index': '999999', // Above admin bar
            'display': 'none',
            'font-weight': 'bold',
            'font-size': '14px'
        });

        $notification.slideDown().delay(3000).slideUp(function () {
            $(this).remove();
        });
    }
});
