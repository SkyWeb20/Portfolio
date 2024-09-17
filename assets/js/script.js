// title marquee **************************************************

document.addEventListener("DOMContentLoaded", function () {
  let titleText = " عباس بیک مداح | Front-End Developer ";
  let index = 0;
  let delay = 500;

  function scrollTitle() {
    document.title = titleText.substring(index) + titleText.substring(0, index);
    index = (index + 1) % titleText.length;
    setTimeout(scrollTitle, delay);
  }

  scrollTitle();
});

// rotate word in home section ************************************

let words = document.querySelectorAll(".word");

words.forEach((word) => {
  let letters = word.textContent.split("");
  word.textContent = "";
  letters.forEach((letter) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.className = "letter";
    word.append(span);
  });
});

let currentWordIndex = 0;
let maxWordIndex = words.length - 1;
words[currentWordIndex].style.opacity = "1";

let changeText = () => {
  let currentWord = words[currentWordIndex];
  let nextWord =
    currentWordIndex === maxWordIndex ? words[0] : words[currentWordIndex + 1];

  Array.from(currentWord.children).forEach((letter, i) => {
    setTimeout(() => {
      letter.className = "letter out";
    }, (currentWord.children.length - i - 1) * 80);
  });

  nextWord.style.opacity = "1";

  Array.from(nextWord.children).forEach((letter, i) => {
    letter.className = "letter behind";
    setTimeout(() => {
      letter.className = "letter in";
    }, 340 + (currentWord.children.length - i - 1) * 80);
  });

  currentWordIndex =
    currentWordIndex === maxWordIndex ? 0 : currentWordIndex + 1;
};

changeText();
setInterval(changeText, 3000);

// liner skill ************************************

document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.getElementById("skills");
  const skillBars = document.querySelectorAll(".skill-bar .bar span");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillBars.forEach((bar) => {
            const percentage = parseInt(
              bar.parentElement.previousElementSibling.querySelector(
                "p:last-child"
              ).innerText
            );
            bar.style.width = `${percentage}%`;
          });

          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillsSection);
});

// circles skill ************************************

document.addEventListener("DOMContentLoaded", function () {
  const skillsSection = document.getElementById("skills");
  const circles = document.querySelectorAll(".circle");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          circles.forEach((elem) => {
            const dots = elem.getAttribute("data-dots");
            const marked = elem.getAttribute("data-percent");
            const percent = Math.floor((dots * marked) / 100);
            const rotate = 360 / dots;

            let points = "";
            for (let i = 0; i < dots; i++) {
              points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
            }
            elem.innerHTML = points;

            const pointsMarked = elem.querySelectorAll(".points");
            for (let i = 0; i < percent; i++) {
              pointsMarked[i].classList.add("marked");
            }
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(skillsSection);
});

// mix it up portfolio section ************************************

var mixer = mixitup(".portfolio-gallery");

// transition show portfoilo section ************************************

document.addEventListener("DOMContentLoaded", function () {
  const portfolioSection = document.getElementById("portfolio");
  const portBoxes = document.querySelectorAll(".port-box");

  const observer = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          portBoxes.forEach((box, index) => {
            setTimeout(() => {
              box.classList.add("visible");
            }, index * 500);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(portfolioSection);
});

// active menu ************************************
let menuli = document.querySelectorAll("header ul li a");
let section = document.querySelectorAll("section");

function activeMenu() {
  let len = section.length;
  while (--len && window.scrollY + 97 < section[len].offsetTop) {}
  menuli.forEach((sec) => sec.classList.remove("active"));
  menuli[len].classList.add("active");
}

activeMenu();
window.addEventListener("scroll", activeMenu);

// stiky navbar ************************************

const header = document.querySelector("header");
window.addEventListener("scroll", function () {
  header.classList.toggle("sticky", window.scrollY > 50);
});

// toggle icon navbar ************************************

let menuIcon = document.querySelector("#menu-icon");
let navlist = document.querySelector(".navlist");
menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navlist.classList.toggle("open");
};

window.onscroll = () => {
  menuIcon.classList.remove("bx-x");
  navlist.classList.remove("open");
};

// parallax ************************************

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show-items");
    } else {
      entry.target.classList.remove("show-items");
    }
  });
});

const scrollScale = document.querySelectorAll(".scroll-scale");
scrollScale.forEach((el) => observer.observe(el));

const scrollBottom = document.querySelectorAll(".scroll-bottom");
scrollBottom.forEach((el) => observer.observe(el));

const scrollTop = document.querySelectorAll(".scroll-top");
scrollTop.forEach((el) => observer.observe(el));

// logos icon copy ************************************

var numberOfCopies = 3;
var logosSlids = document.querySelector(".logos-slids");
for (var i = 0; i < numberOfCopies; i++) {
  var clone = logosSlids.cloneNode(true);
  logosSlids.parentNode.appendChild(clone);
}

// content form to google sheet ************************************
document.addEventListener("DOMContentLoaded", function () {
  const form = document.forms["submit-to-google-sheet"];
  const msg = document.querySelector(".msg");
  const submitButton = form.querySelector('button[type="submit"]');
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbzMrOjpkDaIreWDM5JXcVS1ApcG8K-YBAc6uR1DAhv8xi2wgdBdA407o3TxIlxSxY2rKg/exec";

  function showErrorMessage(input, message, duration = 3000) {
    clearErrorMessage(input);
    const errorSpan = document.createElement("span");
    errorSpan.classList.add("error-message");
    errorSpan.style.color = "red";
    errorSpan.style.fontSize = "12px";
    errorSpan.textContent = message;
    input.parentNode.insertBefore(errorSpan, input.nextSibling);

    setTimeout(() => {
      errorSpan.remove();
    }, duration);
  }

  function clearErrorMessage(input) {
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains("error-message")) {
      existingError.remove();
    }
  }

  const phoneInput = form.querySelector('input[name="Number"]');
  phoneInput.addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
    if (e.inputType === "insertText" && !/^\d+$/.test(e.data)) {
      showErrorMessage(this, "لطفاً فقط عدد وارد کنید");
    }
  });

  const emailInput = form.querySelector('input[name="Email"]');
  emailInput.addEventListener("input", validateEmail);

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.value === "") {
      showErrorMessage(this, "لطفاً آدرس ایمیل را وارد کنید");
      return false;
    } else if (!emailRegex.test(this.value)) {
      showErrorMessage(this, "لطفاً یک آدرس ایمیل معتبر وارد کنید");
      return false;
    } else {
      clearErrorMessage(this);
      return true;
    }
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!validateForm()) return;

    submitButton.disabled = true;
    submitButton.classList.add("disabled");
    submitButton.innerHTML = "در حال ارسال...";

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        showMessage(
          "پیغام شما با موفقیت ارسال شد! <br> من در اسرع وقت جواب خواهم داد.",
          "success"
        );
        form.reset();
      })
      .catch((error) => {
        console.error("Error!", error.message);
        showMessage("خطایی رخ داده است!<br> لطفا دوباره تلاش کنید.", "error");
      })
      .finally(() => {
        submitButton.disabled = false;
        submitButton.classList.remove("disabled");
        submitButton.innerHTML = "ارسال پیام";
      });
  });

  function validateForm() {
    let isValid = true;
    form.querySelectorAll("input, textarea").forEach((input) => {
      if (input.value.trim() === "") {
        showMessage("لطفا همه موارد را کامل پر کنید", "error");
        isValid = false;
      } else if (input.name === "Email" && !validateEmail.call(input)) {
        isValid = false;
      }
    });
    return isValid;
  }

  const messageContainer = document.getElementById("message-container");
  const msgElement = messageContainer.querySelector(".msg");

  function showMessage(message, type) {
    msgElement.innerHTML = message;
    msgElement.className = "msg " + type;

    setTimeout(() => {
      msgElement.classList.add("show");
    }, 10);

    setTimeout(() => {
      msgElement.classList.remove("show");
      setTimeout(() => {
        msgElement.innerHTML = "";
        msgElement.className = "msg";
      }, 300);
    }, 3000);
  }
});

// change mode ****************************************

const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle.querySelector("i");
const blobPaths = document.querySelectorAll(".blobPath");

const darkColor = "#12f7ff";
const lightColor = "#025fc4";

const savedTheme = localStorage.getItem("theme") || "dark";
document.body.dataset.theme = savedTheme;

function updateThemeIcon() {
  if (document.body.dataset.theme === "dark") {
    themeIcon.classList.replace("bx-sun", "bx-moon");

    blobPaths.forEach((path) => {
      path.setAttribute("fill", darkColor);
    });
  } else {
    themeIcon.classList.replace("bx-moon", "bx-sun");

    blobPaths.forEach((path) => {
      path.setAttribute("fill", lightColor);
    });
  }
}

themeToggle.addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("theme", document.body.dataset.theme);
  updateThemeIcon();
});

updateThemeIcon();
