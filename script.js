document.addEventListener("DOMContentLoaded", () => {

  /* menu hamburger*/
  const menuBtn = document.getElementById("menuBtn");
  const menu = document.getElementById("menu");

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("open");
  });

  // đóng menu khi bấm 1 link (trên mobile)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
    });
  });

  /*dark / light mode */
  const themeBtn = document.getElementById("themeBtn");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeBtn.textContent = "☀️ Light mode";
  }

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    themeBtn.textContent = isDark ? "☀️ Light mode" : "🌙 Dark mode";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });

  /* Smooth scroll */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /*Đếm ký tự nội dung liên hệ */
  const message = document.getElementById("message");
  const charCount = document.getElementById("charCount");
  const MAX_LENGTH = message.getAttribute("maxlength");

  message.addEventListener("input", () => {
    charCount.textContent = `${message.value.length}/${MAX_LENGTH}`;
  });

  /*5. Validate form liên hệ */
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const formSuccess = document.getElementById("formSuccess");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const phoneError = document.getElementById("phoneError");
  const messageError = document.getElementById("messageError");

  function showError(input, errorEl, msg) {
    input.classList.add("invalid");
    errorEl.textContent = msg;
  }

  function clearError(input, errorEl) {
    input.classList.remove("invalid");
    errorEl.textContent = "";
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formSuccess.hidden = true;

    let isValid = true;

    // Họ tên
    if (nameInput.value.trim().length < 2) {
      showError(nameInput, nameError, "Vui lòng nhập họ tên (ít nhất 2 ký tự).");
      isValid = false;
    } else {
      clearError(nameInput, nameError);
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      showError(emailInput, emailError, "Email không hợp lệ.");
      isValid = false;
    } else {
      clearError(emailInput, emailError);
    }

    // Số điện thoại
    const phonePattern = /^[0-9]{9,11}$/;
    if (!phonePattern.test(phoneInput.value.trim())) {
      showError(phoneInput, phoneError, "Số điện thoại phải gồm 9-11 chữ số.");
      isValid = false;
    } else {
      clearError(phoneInput, phoneError);
    }

    // Nội dung
    if (message.value.trim().length < 5) {
      showError(message, messageError, "Nội dung cần ít nhất 5 ký tự.");
      isValid = false;
    } else {
      clearError(message, messageError);
    }

    if (isValid) {
      formSuccess.hidden = false;
      form.reset();
      charCount.textContent = `0/${MAX_LENGTH}`;
    }
  });

  /*năm hiện tại ở footer*/
  document.getElementById("currentYear").textContent = new Date().getFullYear();

});