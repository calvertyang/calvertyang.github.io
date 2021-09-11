(function($) {
  const app = $('.app-body');
  const header = $('.header');
  const banner = document.getElementById('article-banner') || false;
  const about = document.getElementById('about-banner') || false;
  const top = $('.scroll-top');
  const catalog = $('.catalog-container .toc-main');
  let isOpen = false;

  $(document).ready(() => {
    NProgress.start();
    $('#nprogress .bar').css({
      'background': '#42b983',
    });
    $('#nprogress .spinner').hide();
    const fade = {
      transform: 'translateY(0)',
      opacity: 1,
    };
    if (banner) {
      app.css('transition-delay', '0.15s');
      $('#article-banner').children().css(fade);
    }
    if (about) {
      $('.author').children().css(fade);
    }
    app.css(fade);
  });

  window.onload = () => {
    setTimeout(() => {
      NProgress.done();
    }, 200);
  };

  $('.menu').on('click', () => {
    if (!header.hasClass('fixed-header') || isOpen) {
      header.toggleClass('fixed-header');
      isOpen = !isOpen;
    }
    $('.menu-mask').toggleClass('open');
  });

  $('#tag-cloud a').on('click', function () {
    const list = $('.tag-list');
    const name = $(this).data('name').replace(/[\ \'\/\+\#]/gi, "\\$&");
    const maoH = list.find('#' + name).offset().top;
    $('html,body').animate({
      scrollTop: maoH - header.height(),
    }, 500);
  });

  $('#category-cloud a').on('click', function () {
    const list = $('.category-list');
    const name = $(this).data('name').replace(/[\ \'\/\+\#]/gi, "\\$&");
    const maoH = list.find('#' + name).offset().top;
    $('html,body').animate({
      scrollTop: maoH - header.height(),
    }, 500);
  });

  $('.reward-btn').on('click', function () {
    $('.money-code').fadeToggle();
  });

  $('.arrow-down').on('click', function () {
    $('html, body').animate({
      scrollTop: banner.offsetHeight - header.height(),
    }, 500);
  });

  $('.toc-nav a').on('click', function (e) {
    e.preventDefault();
    const catalogTarget = e.currentTarget;
    // var scrollTarget = $(catalogTarget.getAttribute('href'))
    const scrollTarget = $(decodeURIComponent(catalogTarget.getAttribute('href')));
    const top = scrollTarget.offset().top;
    if (top > 0) {
      $('html,body').animate({
        scrollTop: top - 65,
      }, 500);
    }
  });

  top.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
  });

  document.addEventListener('scroll', function () {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const headerH = header.height();
    if (banner) {
      if (scrollTop > headerH) {
        header.addClass('fixed-header');
      } else if (scrollTop === 0) {
        header.removeClass('fixed-header');
      }
    }
    if (scrollTop > 100) {
      top.addClass('opacity');
    } else {
      top.removeClass('opacity');
    }
    if (scrollTop > 190) {
      catalog.addClass('fixed-toc');
    } else {
      catalog.removeClass('fixed-toc');
    }
  });
})(jQuery);
