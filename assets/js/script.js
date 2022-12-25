$('a').click(function () {
    $('html, body').animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 500);
    return false;
});

// Cache selectors
var topMenu = $("aside,header"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class;
    $("aside,header>span").remove();
    menuItems
        .parent()
        .end().filter("[href='#" + id + "']").parent().append(' <span class="absolute inset-y-0 left-0 w-1 bg-red-600 rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>');
});

function beer() {
    return {
        seconds: '00',
        minutes: '00',
        hours: '00',
        days: '00',
        distance: 0,
        countdown: null,
        beerTime: new Date('January 4, 2023 00:00:00').getTime(),
        now: new Date().getTime(),
        start: function () {
            this.countdown = setInterval(() => {
                // Calculate time
                this.now = new Date().getTime();
                this.distance = this.beerTime - this.now;
                // Set Times
                this.days = this.padNum(Math.floor(this.distance / (1000 * 60 * 60 * 24)));
                this.hours = this.padNum(Math.floor((this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
                this.minutes = this.padNum(Math.floor((this.distance % (1000 * 60 * 60)) / (1000 * 60)));
                this.seconds = this.padNum(Math.floor((this.distance % (1000 * 60)) / 1000));
                // Stop
                if (this.distance < 0) {
                    clearInterval(this.countdown);
                    this.days = '00';
                    this.hours = '00';
                    this.minutes = '00';
                    this.seconds = '00';
                }
            }, 100);
        },
        padNum: function (num) {
            var zero = '';
            for (var i = 0; i < 2; i++) {
                zero += '0';
            }
            return (zero + num).slice(-2);
        }
    }
}