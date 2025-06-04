document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;

  // 🌙 Tema geçişi
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");

  if (localStorage.getItem("tema") === "dark") {
    body.classList.add("dark-mode");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode");
      const aktifTema = body.classList.contains("dark-mode") ? "dark" : "light";
      localStorage.setItem("tema", aktifTema);
    });
  }

  // 📄 INDEX.HTML → Giriş kontrolü + şifre göster/gizle
  if (path.includes("index.html")) {
    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;

      if (username === "admin" && password === "1234") {
        alert("Giriş başarılı!");
        window.location.href = "users.html";
      } else {
        alert("Hatalı kullanıcı adı veya şifre!");
      }
    });

    // 👁️ Şifre göster/gizle
    const showPassword = document.getElementById("showPassword");
    const passwordInput = document.getElementById("password");

    if (showPassword && passwordInput) {
      showPassword.addEventListener("change", function () {
        passwordInput.type = this.checked ? "text" : "password";
      });
    }
  }

  // 📄 FORM.HTML → Kullanıcı ekleme/düzenleme
  if (path.includes("form.html")) {
    const form = document.getElementById("userForm");
    const kullanicilar = JSON.parse(localStorage.getItem("kullanicilar")) || [];
    const duzenlenecekIndex = localStorage.getItem("duzenlenecekIndex");

    if (duzenlenecekIndex !== null) {
      const kullanici = kullanicilar[duzenlenecekIndex];
      form.querySelector("input[type='text']").value = kullanici.adSoyad;
      form.querySelector("input[type='email']").value = kullanici.email;
      form.querySelector("input[type='tel']").value = kullanici.telefon;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const adSoyad = form.querySelector("input[type='text']").value;
      const email = form.querySelector("input[type='email']").value;
      const telefon = form.querySelector("input[type='tel']").value;

      const yeniKullanici = { adSoyad, email, telefon };

      if (duzenlenecekIndex !== null) {
        kullanicilar[duzenlenecekIndex] = yeniKullanici;
        localStorage.removeItem("duzenlenecekIndex");
      } else {
        kullanicilar.push(yeniKullanici);
      }

      localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));

      alert("Kullanıcı kaydedildi!");
      window.location.href = "users.html";
    });
  }

  // 📄 USERS.HTML → Listeleme, silme, düzenleme, arama
  if (path.includes("users.html")) {
    const tbody = document.querySelector("tbody");
    const searchInput = document.getElementById("searchInput");
    let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar")) || [];

    function listeyiGoster(liste = kullanicilar) {
      tbody.innerHTML = "";

      liste.forEach((kullanici, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${kullanici.adSoyad}</td>
          <td>${kullanici.email}</td>
          <td>
            <button class="duzenle-btn" data-index="${kullanicilar.indexOf(kullanici)}">Düzenle</button>
            <button class="sil-btn" data-index="${kullanicilar.indexOf(kullanici)}">Sil</button>
          </td>
        `;

        tbody.appendChild(tr);
      });

      // Buton olayları yeniden bağlanmalı:
      aktifEt();
    }

    function aktifEt() {
      document.querySelectorAll(".sil-btn").forEach(button => {
        button.addEventListener("click", function () {
          const i = this.getAttribute("data-index");
          kullanicilar.splice(i, 1);
          localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));
          listeyiGoster();
        });
      });

      document.querySelectorAll(".duzenle-btn").forEach(button => {
        button.addEventListener("click", function () {
          const i = this.getAttribute("data-index");
          localStorage.setItem("duzenlenecekIndex", i);
          window.location.href = "form.html";
        });
      });
    }

    // Arama kutusu dinle
    if (searchInput) {
      searchInput.addEventListener("input", function () {
        const filtre = this.value.toLowerCase();

        const filtrelenmis = kullanicilar.filter(kullanici => {
          return (
            kullanici.adSoyad.toLowerCase().includes(filtre) ||
            kullanici.email.toLowerCase().includes(filtre)
          );
        });

        listeyiGoster(filtrelenmis);
      });
    }

    listeyiGoster(); // ilk yükleme
  }
});
