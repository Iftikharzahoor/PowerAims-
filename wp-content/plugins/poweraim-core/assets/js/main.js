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

    // 5. Language Switcher Dropdown & Filtering
    var $langSwitcher = $('#poweraimLangSwitcher');
    var $langDropdownBtn = $('#langDropdownBtn');
    var $langDropdownMenu = $('#langDropdownMenu');
    var $langSearchInput = $('#langSearchInput');

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

    // Language Selection Click
    $(document).on('click', '.lang-item', function() {
        var lang = $(this).data('lang');
        var langCode = $(this).find('.lang-code').text();
        
        $('.lang-item').removeClass('active');
        $(this).addClass('active');
        $('.current-lang-code').text(langCode);
        $langSwitcher.removeClass('open');

        // Trigger Google Translate
        var select = document.querySelector('.goog-te-combo');
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change'));
        }
    });

    // 6. Mobile Navbar Toggle
    $('#poweraimMobileToggle').on('click', function() {
        $('.poweraim-nav-menu').toggleClass('open');
    });

});
