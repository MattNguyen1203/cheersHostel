let textSw;
if (window.innerWidth > 1024) {
  textSw = new Swiper(".homestay__exp-textSwiper", {
    slidesPerView: 4,
    direction: "vertical",
  });
} else {
  textSw = new Swiper(".homestay__exp-textSwiper", {
    slidesPerView: 1.3,
    spaceBetween: (window.innerWidth / 100) * 2.1333,
  });
}
let imgSwiperSw = new Swiper(".homestay__exp-imgSwiper", {
  slidesPerView: 1,
  thumbs: {
    swiper: textSw,
  },
  navigation: {
    nextEl: ".imgSwiper-next",
    prevEl: ".imgSwiper-prev",
  },
  pagination: {
    el: ".imgSwiper-pagi",
    type: "bullets",
  },
});
