/**
* Template Name: UpConstruction
* Updated: Jan 29 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/upconstruction-bootstrap-construction-website-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
document.addEventListener('DOMContentLoaded', () => {
  "use strict";

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Mobile nav toggle
   */

  const mobileNavShow = document.querySelector('.mobile-nav-show');
  const mobileNavHide = document.querySelector('.mobile-nav-hide');

  document.querySelectorAll('.mobile-nav-toggle').forEach(el => {
    el.addEventListener('click', function(event) {
      event.preventDefault();
      mobileNavToogle();
    })
  });

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavShow.classList.toggle('d-none');
    mobileNavHide.classList.toggle('d-none');
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navbar a').forEach(navbarlink => {

    if (!navbarlink.hash) return;

    let section = document.querySelector(navbarlink.hash);
    if (!section) return;

    navbarlink.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  const navDropdowns = document.querySelectorAll('.navbar .dropdown > a');

  navDropdowns.forEach(el => {
    el.addEventListener('click', function(event) {
      if (document.querySelector('.mobile-nav-active')) {
        event.preventDefault();
        this.classList.toggle('active');
        this.nextElementSibling.classList.toggle('dropdown-active');

        let dropDownIndicator = this.querySelector('.dropdown-indicator');
        dropDownIndicator.classList.toggle('bi-chevron-up');
        dropDownIndicator.classList.toggle('bi-chevron-down');
      }
    })
  });

  /**
   * Scroll top button
   */
  const scrollTop = document.querySelector('.scroll-top');
  if (scrollTop) {
    const togglescrollTop = function() {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
    window.addEventListener('load', togglescrollTop);
    document.addEventListener('scroll', togglescrollTop);
    scrollTop.addEventListener('click', window.scrollTo({
      top: 0,
      behavior: 'smooth'
    }));
  }

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Porfolio isotope and filter
   */
  let portfolionIsotope = document.querySelector('.portfolio-isotope');

  if (portfolionIsotope) {

    let portfolioFilter = portfolionIsotope.getAttribute('data-portfolio-filter') ? portfolionIsotope.getAttribute('data-portfolio-filter') : '*';
    let portfolioLayout = portfolionIsotope.getAttribute('data-portfolio-layout') ? portfolionIsotope.getAttribute('data-portfolio-layout') : 'masonry';
    let portfolioSort = portfolionIsotope.getAttribute('data-portfolio-sort') ? portfolionIsotope.getAttribute('data-portfolio-sort') : 'original-order';

    window.addEventListener('load', () => {
      let portfolioIsotope = new Isotope(document.querySelector('.portfolio-container'), {
        itemSelector: '.portfolio-item',
        layoutMode: portfolioLayout,
        filter: portfolioFilter,
        sortBy: portfolioSort
      });

      let menuFilters = document.querySelectorAll('.portfolio-isotope .portfolio-flters li');
      menuFilters.forEach(function(el) {
        el.addEventListener('click', function() {
          document.querySelector('.portfolio-isotope .portfolio-flters .filter-active').classList.remove('filter-active');
          this.classList.add('filter-active');
          portfolioIsotope.arrange({
            filter: this.getAttribute('data-filter')
          });
          if (typeof aos_init === 'function') {
            aos_init();
          }
        }, false);
      });

    });

  }

  /**
   * Init swiper slider with 1 slide at once in desktop view
   */
  new Swiper('.slides-1', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    }
  });

  /**
   * Init swiper slider with 2 slides at once in desktop view
   */
  new Swiper('.slides-2', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 2,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate pURE cOUNTER
   */
  new PureCounter();

  /**
   * Animation on scroll function and init
   */
  function aos_init() {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', () => {
    aos_init();
  });

});


window.onload = function() {
  const words = ["COMPUTADORAS", "IMPRESORAS", "CELULARES","CAMARAS DE SEGURIDAD",];
  
  const boxTL = gsap.timeline();
  const masterTL = gsap.timeline({repeat: -1}).pause();
  
  let cursor = gsap.to('#hero .cursor', {
    opacity: 0,
    ease: "power2.inOut",
    repeat: -1
  });
  
  boxTL.to('#hero .box', {
    duration: 1, 
    width: "17vw", // Cambié "with" a "width"
    delay: 0.5,
    ease: "power4.inOut"
  })
  .from('#hero .hi', {
    duration: 1,
    height: "7vw", // Ajusté la altura para que coincida con la anchura de la caja
    ease: "power3.out", 
    onComplete: () => masterTL.play()
  })
  .to('#hero .box', {
    duration: 1, 
    height: "7vw", 
    ease: "elastic.out" 
  })
  .to('#hero .box', {
    duration: 2, 
    autoAlpha: 0.5, 
    yoyo: true, 
    repeat: -1
  });
  
  words.forEach(word => {
    let tl = gsap.timeline({repeat: 1, yoyo: true, repeatDelay: 1});
    tl.to('.text', {duration: 1, text: word});
    masterTL.add(tl);
  });
};

	// tienda 



  $(document).ready(function(){
	
    $(".largeGrid").click(function(){											
      $(this).find('a').addClass('active');
      $('.smallGrid a').removeClass('active');
      
      $('.product').addClass('large').each(function(){											
      });						
      setTimeout(function(){
        $('.info-large').show();	
      }, 200);
      setTimeout(function(){
  
        $('.view_gallery').trigger("click");	
      }, 400);								
      
      return false;				
    });
    
    $(".smallGrid").click(function(){		        
      $(this).find('a').addClass('active');
      $('.largeGrid a').removeClass('active');
      
      $('div.product').removeClass('large');
      $(".make3D").removeClass('animate');	
      $('.info-large').fadeOut("fast");
      setTimeout(function(){								
          $('div.flip-back').trigger("click");
      }, 400);
      return false;
    });		
    
    $(".smallGrid").click(function(){
      $('.product').removeClass('large');			
      return false;
    });
    
  
    
    
    $('.product').each(function(i, el){					
  
      // Lift card and show stats on Mouseover
      $(el).find('.make3D').hover(function(){
          $(this).parent().css('z-index', "20");
          $(this).addClass('animate');
          $(this).find('div.carouselNext, div.carouselPrev').addClass('visible');			
         }, function(){
          $(this).removeClass('animate');			
          $(this).parent().css('z-index', "1");
          $(this).find('div.carouselNext, div.carouselPrev').removeClass('visible');
      });	
      
      // Flip card to the back side
      $(el).find('.view_gallery').click(function(){	
        
        $(el).find('div.carouselNext, div.carouselPrev').removeClass('visible');
        $(el).find('.make3D').addClass('flip-10');			
        setTimeout(function(){					
        $(el).find('.make3D').removeClass('flip-10').addClass('flip90').find('div.shadow').show().fadeTo( 80 , 1, function(){
            $(el).find('.product-front, .product-front div.shadow').hide();															
          });
        }, 50);
        
        setTimeout(function(){
          $(el).find('.make3D').removeClass('flip90').addClass('flip190');
          $(el).find('.product-back').show().find('div.shadow').show().fadeTo( 90 , 0);
          setTimeout(function(){				
            $(el).find('.make3D').removeClass('flip190').addClass('flip180').find('div.shadow').hide();						
            setTimeout(function(){
              $(el).find('.make3D').css('transition', '100ms ease-out');			
              $(el).find('.cx, .cy').addClass('s1');
              setTimeout(function(){$(el).find('.cx, .cy').addClass('s2');}, 100);
              setTimeout(function(){$(el).find('.cx, .cy').addClass('s3');}, 200);				
              $(el).find('div.carouselNext, div.carouselPrev').addClass('visible');				
            }, 100);
          }, 100);			
        }, 150);			
      });			
      
      // Flip card back to the front side
      $(el).find('.flip-back').click(function(){		
        
        $(el).find('.make3D').removeClass('flip180').addClass('flip190');
        setTimeout(function(){
          $(el).find('.make3D').removeClass('flip190').addClass('flip90');
      
          $(el).find('.product-back div.shadow').css('opacity', 0).fadeTo( 100 , 1, function(){
            $(el).find('.product-back, .product-back div.shadow').hide();
            $(el).find('.product-front, .product-front div.shadow').show();
          });
        }, 50);
        
        setTimeout(function(){
          $(el).find('.make3D').removeClass('flip90').addClass('flip-10');
          $(el).find('.product-front div.shadow').show().fadeTo( 100 , 0);
          setTimeout(function(){						
            $(el).find('.product-front div.shadow').hide();
            $(el).find('.make3D').removeClass('flip-10').css('transition', '100ms ease-out');		
            $(el).find('.cx, .cy').removeClass('s1 s2 s3');			
          }, 100);			
        }, 150);			
        
      });				
    
      makeCarousel(el);
    });
    
    $('.add-cart-large').each(function(i, el){
      $(el).click(function(){
        var carousel = $(this).parent().parent().find(".carousel-container");
        var img = carousel.find('img').eq(carousel.attr("rel"))[0];						
        var position = $(img).offset();	
  
        var productName = $(this).parent().find('h4').get(0).innerHTML;				
    
        $("body").append('<div class="floating-cart"></div>');		
        var cart = $('div.floating-cart');		
        $("<img src='"+img.src+"' class='floating-image-large' />").appendTo(cart);
        
        $(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');		
        setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
        
        setTimeout(function(){
        $('div.floating-cart').remove();
        $("body").removeClass("MakeFloatingCart");
  
  
        var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+img.src+"' alt='' /></div><span>"+productName+"</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";			
  
        $("#cart .empty").hide();			
        $("#cart").append(cartItem);
        $("#checkout").fadeIn(500);
        
        $("#cart .cart-item").last()
          .addClass("flash")
          .find(".delete-item").click(function(){
            $(this).parent().fadeOut(300, function(){
              $(this).remove();
              if($("#cart .cart-item").size() == 0){
                $("#cart .empty").fadeIn(500);
                $("#checkout").fadeOut(500);
              }
            })
          });
           setTimeout(function(){
          $("#cart .cart-item").last().removeClass("flash");
        }, 10 );
        
      }, 1000);
        
        
      });
    })
    
    /* ----  Image Gallery Carousel   ---- */
    function makeCarousel(el){
    
      
      var carousel = $(el).find('.carousel ul');
      var carouselSlideWidth = 315;
      var carouselWidth = 0;	
      var isAnimating = false;
      var currSlide = 0;
      $(carousel).attr('rel', currSlide);
      
      // building the width of the casousel
      $(carousel).find('li').each(function(){
        carouselWidth += carouselSlideWidth;
      });
      $(carousel).css('width', carouselWidth);
      
      // Load Next Image
      $(el).find('div.carouselNext').on('click', function(){
        var currentLeft = Math.abs(parseInt($(carousel).css("left")));
        var newLeft = currentLeft + carouselSlideWidth;
        if(newLeft == carouselWidth || isAnimating === true){return;}
        $(carousel).css({'left': "-" + newLeft + "px",
                     "transition": "300ms ease-out"
                   });
        isAnimating = true;
        currSlide++;
        $(carousel).attr('rel', currSlide);
        setTimeout(function(){isAnimating = false;}, 300);			
      });
      
      // Load Previous Image
      $(el).find('div.carouselPrev').on('click', function(){
        var currentLeft = Math.abs(parseInt($(carousel).css("left")));
        var newLeft = currentLeft - carouselSlideWidth;
        if(newLeft < 0  || isAnimating === true){return;}
        $(carousel).css({'left': "-" + newLeft + "px",
                     "transition": "300ms ease-out"
                   });
        isAnimating = true;
        currSlide--;
        $(carousel).attr('rel', currSlide);
        setTimeout(function(){isAnimating = false;}, 300);						
      });
    }
    
   
    
    $('.add_to_cart').click(function(){
      var productCard = $(this).parent();
      var position = productCard.offset();
      var productImage = $(productCard).find('img').get(0).src;
      var productName = $(productCard).find('.product_name').get(0).innerHTML;				
  
      $("body").append('<div class="floating-cart"></div>');		
      var cart = $('div.floating-cart');		
      productCard.clone().appendTo(cart);
      $(cart).css({'top' : position.top + 'px', "left" : position.left + 'px'}).fadeIn("slow").addClass('moveToCart');		
      setTimeout(function(){$("body").addClass("MakeFloatingCart");}, 800);
      setTimeout(function(){
        $('div.floating-cart').remove();
        $("body").removeClass("MakeFloatingCart");
  
  
        var cartItem = "<div class='cart-item'><div class='img-wrap'><img src='"+productImage+"' alt='' /></div><span>"+productName+"</span><strong>$39</strong><div class='cart-item-border'></div><div class='delete-item'></div></div>";			
  
        $("#cart .empty").hide();			
        $("#cart").append(cartItem);
        $("#checkout").fadeIn(500);
        
        $("#cart .cart-item").last()
          .addClass("flash")
          .find(".delete-item").click(function(){
            $(this).parent().fadeOut(300, function(){
              $(this).remove();
              if($("#cart .cart-item").size() == 0){
                $("#cart .empty").fadeIn(500);
                $("#checkout").fadeOut(500);
              }
            })
          });
           setTimeout(function(){
          $("#cart .cart-item").last().removeClass("flash");
        }, 10 );
        
      }, 1000);
    });
  });

 