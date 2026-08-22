jQuery(document).ready(function($) {
    
    // 1. Services Section: Tab Switching
    $('.tab-btn').on('click', function() {
        var targetTab = $(this).data('tab');
        
        // Update active class on buttons
        $('.tab-btn').removeClass('active');
        $(this).addClass('active');
        
        // Update active class on contents
        $('.tab-content').removeClass('active');
        $('#' + targetTab).addClass('active');
    });

    // 2. Projects Section: Filtering
    $('.filter-btn').on('click', function() {
        var filterVal = $(this).data('filter');
        
        // Update active class on buttons
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        if (filterVal === 'all') {
            $('.project-item').show(300);
        } else {
            $('.project-item').hide();
            $('.project-item[data-category="' + filterVal + '"]').show(300);
        }
    });

    // 3. Stats Section: Counter Animation
    var animateCounters = function() {
        $('.stat-number').each(function() {
            var $this = $(this);
            var target = parseInt($this.data('target'));
            var current = 0;
            var duration = 2000; // 2 seconds
            var stepTime = Math.abs(Math.floor(duration / target));
            
            var timer = setInterval(function() {
                current += 1;
                $this.text(current + '+');
                if (current >= target) {
                    $this.text(target + '+');
                    clearInterval(timer);
                }
            }, stepTime);
        });
    };

    // Trigger counter animation when stats section is visible in viewport
    var statsSection = $('.poweraim-stats');
    if (statsSection.length) {
        var animated = false;
        $(window).on('scroll', function() {
            var oTop = statsSection.offset().top - window.innerHeight;
            if (!animated && $(window).scrollTop() > oTop) {
                animateCounters();
                animated = true;
            }
        });
    }

    // 4. Contact Form Submission (Mockup Feedback)
    $('#poweraim-quote-form').on('submit', function(e) {
        e.preventDefault();
        var feedback = $('#form-feedback');
        feedback.removeClass('success error').text('Submitting your quote request...');
        
        setTimeout(function() {
            feedback.addClass('success').text('Thank you! Your engineering inquiry has been submitted successfully. We will get back to you shortly.');
            $('#poweraim-quote-form')[0].reset();
        }, 1500);
    });

    // 5. Language Switcher Dropdown & Translation Engine
    var $langSwitcher = $('#poweraimLangSwitcher');
    var $langDropdownBtn = $('#langDropdownBtn');
    var $langDropdownMenu = $('#langDropdownMenu');
    var $langSearchInput = $('#langSearchInput');

    function setGoogleTranslateCookie(lang) {
        var host = window.location.hostname;
        document.cookie = "googtrans=/en/" + lang + "; path=/;";
        document.cookie = "googtrans=/en/" + lang + "; path=/; domain=" + host + ";";
        document.cookie = "googtrans=/auto/" + lang + "; path=/;";
        document.cookie = "googtrans=/auto/" + lang + "; path=/; domain=" + host + ";";
        
        var hostParts = host.split('.');
        if (hostParts.length > 1) {
            var rootDomain = "." + hostParts.slice(-2).join('.');
            document.cookie = "googtrans=/en/" + lang + "; path=/; domain=" + rootDomain + ";";
            document.cookie = "googtrans=/auto/" + lang + "; path=/; domain=" + rootDomain + ";";
        }
    }

    function clearGoogleTranslateCookie() {
        var host = window.location.hostname;
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + host + ";";
        var hostParts = host.split('.');
        if (hostParts.length > 1) {
            var rootDomain = "." + hostParts.slice(-2).join('.');
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + rootDomain + ";";
        }
    }

    // Sync active language code from cookie on load
    var cookieMatch = document.cookie.match(/googtrans=\/[^/]+\/([a-zA-Z\-]+)/);
    if (cookieMatch && cookieMatch[1]) {
        var activeLang = cookieMatch[1];
        var $matchItem = $('.lang-item[data-lang="' + activeLang + '"]');
        if ($matchItem.length) {
            $('.lang-item').removeClass('active');
            $matchItem.addClass('active');
            $('.current-lang-code').text($matchItem.find('.lang-code').text());
        }
    }

    $langDropdownBtn.on('click', function(e) {
        e.stopPropagation();
        $langSwitcher.toggleClass('open');
        if ($langSwitcher.hasClass('open')) {
            $langSearchInput.val('').trigger('input').focus();
        }
    });

    $(document).on('click', function(e) {
        if (!$(e.target).closest('#poweraimLangSwitcher').length) {
            $langSwitcher.removeClass('open');
        }
    });

    // Language Search Filter
    $langSearchInput.on('input', function() {
        var query = $(this).val().toLowerCase();
        $('.lang-grid-list .lang-item').each(function() {
            var text = $(this).find('.lang-name').text().toLowerCase();
            var code = $(this).find('.lang-code').text().toLowerCase();
            if (text.indexOf(query) !== -1 || code.indexOf(query) !== -1) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });

    // Language Selection Click & Instant Translation
    $(document).on('click', '.lang-item', function(e) {
        e.preventDefault();
        e.stopPropagation();
        var lang = $(this).data('lang');
        var langCode = $(this).find('.lang-code').text();
        
        $('.lang-item').removeClass('active');
        $(this).addClass('active');
        $('.current-lang-code').text(langCode);
        $langSwitcher.removeClass('open');

        if (lang === 'en') {
            clearGoogleTranslateCookie();
            var select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = 'en';
                select.dispatchEvent(new Event('change'));
            }
            setTimeout(function() { location.reload(); }, 200);
        } else {
            setGoogleTranslateCookie(lang);
            var select = document.querySelector('.goog-te-combo');
            if (select) {
                select.value = lang;
                select.dispatchEvent(new Event('change'));
            } else {
                location.reload();
            }
        }
    });

    // 6. Mobile Navbar Toggle
    $('#poweraimMobileToggle').on('click', function() {
        $('.poweraim-nav-menu').toggleClass('open');
    });

    // 7. Projects Page Category "Learn More" Expand Toggle
    $(document).on('click', '.btn-category-toggle', function(e) {
        e.preventDefault();
        var $block = $(this).closest('.project-category-block');
        $block.toggleClass('is-expanded');
        
        if ($block.hasClass('is-expanded')) {
            $(this).find('.toggle-text').text('Show Less');
            $(this).attr('aria-expanded', 'true');
        } else {
            $(this).find('.toggle-text').text('Learn More');
            $(this).attr('aria-expanded', 'false');
        }
    });

    // 8. Subproject "Learn More" Modal Open Handler
    $(document).on('click', '.btn-subproject-details', function(e) {
        e.preventDefault();
        var title = $(this).data('title');
        var client = $(this).data('client');
        var category = $(this).data('category') || 'ENGINEERING PROJECT';
        var scope = $(this).data('scope');
        var img = $(this).data('img');

        $('#modalProjectTitle').text(title);
        $('#modalProjectClient').text(client);
        $('#modalProjectCategory').text(category);
        $('#modalProjectScope').text(scope);
        $('#modalProjectImg').attr('src', img);

        $('#projectDetailsModal').addClass('open');
        $('body').css('overflow', 'hidden');
    });

    // Modal Close Handlers
    $(document).on('click', '#modalCloseBtn, #projectDetailsModal', function(e) {
        if (e.target === this) {
            $('#projectDetailsModal').removeClass('open');
            $('body').css('overflow', 'auto');
        }
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#projectDetailsModal').hasClass('open')) {
            $('#projectDetailsModal').removeClass('open');
            $('body').css('overflow', 'auto');
        }
    });

});
