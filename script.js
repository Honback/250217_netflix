// API
// import { API_KEY } from "./env.js";

const tmdbCommand = "https://api.themoviedb.org/3";

const fetchMoives1 = async () => {
  // const url = `${tmdbCommand}/movie/now_playing?api_key=${API_KEY}&language=ko-kr&page=1`;
  const url = `${tmdbCommand}/movie/now_playing?api_key=b95d81b88e2e3b752d3af2380e4a6e16&language=ko-kr&page=1`;
  const response = await fetch(url);
  const { results } = await response.json();
  return results;
};
const fetchMoives2 = async () => {
  const url = `${tmdbCommand}/movie/upcoming?api_key=b95d81b88e2e3b752d3af2380e4a6e16&language=ko-kr&page=1`;
  const response = await fetch(url);
  const { results } = await response.json();
  console.log(results);
  return results;
};
const getMovies = async () => {
  const [movies1, movies2] = await Promise.all([
    fetchMoives1(),
    fetchMoives2(),
  ]);
  const mainSlider = document.querySelector(".mainSlider");

  movies1.forEach((movie) => {
    console.log(movie);
    const figure = document.createElement("figure");
    figure.innerHTML = `<img src="https://image.tmdb.org/t/p/original/${movie.backdrop_path}" alt="img">`;
    mainSlider.appendChild(figure);
  });

  const figures = mainSlider.querySelectorAll("figure");
  let currentIndex = 0;

  const showNextSlide = () => {
    figures[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % figures.length;
    figures[currentIndex].classList.add("active");
  };

  figures[currentIndex].classList.add("active");

  setInterval(showNextSlide, 3000);
};

getMovies();

// GNB
const naviLis = document.querySelectorAll(".gnb > ul > li");

naviLis.forEach((naviLi) => {
  naviLi.addEventListener("mouseover", () => {
    const submenus = document.querySelectorAll(".submenu");
    const menuBg = document.querySelector(".menu_bg");
    submenus.forEach((submenu) => {
      submenu.style.maxHeight = "270px";
      submenu.style.opacity = "1";
      menuBg.style.maxHeight = "420px";
      menuBg.style.opacity = "1";
    });
  });
  naviLi.addEventListener("mouseout", () => {
    const submenus = document.querySelectorAll(".submenu");
    const menuBg = document.querySelector(".menu_bg");
    submenus.forEach((submenu) => {
      submenu.style.maxHeight = "0";
      submenu.style.opacity = "0";
      menuBg.style.maxHeight = "0";
      menuBg.style.opacity = "0";
    });
  });
});
