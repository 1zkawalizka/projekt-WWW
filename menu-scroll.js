let prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  const navbar = document.getElementById("navbar");
  let currentScrollPos = window.pageYOffset;

  if (prevScrollpos > currentScrollPos) {
    navbar.style.top = "0";
  } else {
    navbar.style.top = "-80px";
  }

  prevScrollpos = currentScrollPos;
};

