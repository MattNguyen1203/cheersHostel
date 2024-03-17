document.addEventListener("DOMContentLoaded", () => {
  if (window.innerWidth < 1024) {
    const infoMbBtn = document.querySelector("#tourDetail__infoMb .btn");
    const infoMbContent = document.querySelector(
      "#tourDetail__infoMb .tourDetail__infoMb-container"
    );
    infoMbBtn.addEventListener("click", () => {
      const btnText = infoMbBtn.querySelector("span");
      const btnIcon = infoMbBtn.querySelector("img");

      if (infoMbBtn.className.includes("active")) {
        infoMbContent.style.height = "10rem";
        btnText.textContent = "See More";
        btnIcon.style.transform = "rotate(180deg)";
        infoMbBtn.classList.remove("active");
      } else {
        console.dir(infoMbContent);
        infoMbContent.style.height = infoMbContent.scrollHeight + "px";
        btnText.textContent = "See Less";
        btnIcon.style.transform = "rotate(0deg)";
        infoMbBtn.classList.add("active");
      }
    });
  }

  //video

  const vidBtn = document.querySelector(".tourDetail-vid .vidBtn");

  const vid = document.querySelector(".tourDetail-vid video");
  const thumbnail = document.querySelector(".tourDetail-vid .thumbnail");
  vidBtn.addEventListener("click", function () {
    vid.play();
    thumbnail.style.display = "none";
    vidBtn.style.display = "none";
  });

  // img
  const listSw = document.querySelectorAll(".tourDetail__imgSw");

  listSw.forEach((item, index) => {
    const tourDetailImgSw = new Swiper(`.tourDetail__imgSw${index}`, {
      slidesPerView: 1,
      spaceBetween: (window.innerWidth / 100) * 3.75,
      navigation: {
        nextEl: `.tourDetail__imgSw-next${index}`,
        prevEl: `.tourDetail__imgSw-prev${index}`,
      },
      breakpoints: {
        1024: {
          slidesPerView: 2,
          spaceBetween: (window.innerWidth / 100) * 1.5,
        },
      },
    });
  });

  let listItem = document.querySelectorAll(".tourDetail-main .detail-item");

  listItem.forEach((item, index) => {
    const itemBtn = item.querySelector(".item-header-right");

    itemBtn.addEventListener("click", () => {
      if (item.className.includes("full")) {
        item.classList.remove("full");
      } else {
        item.classList.add("full");
      }
    });
  });
});
