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

});
