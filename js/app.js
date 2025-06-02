document.addEventListener("DOMContentLoaded", function () {
  const path = window.location.pathname;

  // 📄 FORM.HTML → Kullanıcı ekleme veya düzenleme
  if (path.includes("form.html")) {
    const form = document.getElementById("userForm");
    const kullanicilar = JSON.parse(localStorage.getItem("kullanicilar")) || [];
    const duzenlenecekIndex = localStorage.getItem("duzenlenecekIndex");

    // Eğer düzenleme modundaysa, formu doldur
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
        // Güncelleme
        kullanicilar[duzenlenecekIndex] = yeniKullanici;
        localStorage.removeItem("duzenlenecekIndex");
      } else {
        // Yeni ekleme
        kullanicilar.push(yeniKullanici);
      }

      localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));

      alert("Kullanıcı kaydedildi!");
      window.location.href = "users.html";
    });
  }

  // 📄 USERS.HTML → Listeleme, silme, düzenlemeye geçiş
  if (path.includes("users.html")) {
    const tbody = document.querySelector("tbody");
    let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar")) || [];

    function listeyiGoster() {
      tbody.innerHTML = "";

      kullanicilar.forEach((kullanici, index) => {
        const tr = document.createElement("tr");

        tr.innerHTML = `
          <td>${index + 1}</td>
          <td>${kullanici.adSoyad}</td>
          <td>${kullanici.email}</td>
          <td>
            <button class="duzenle-btn" data-index="${index}">Düzenle</button>
            <button class="sil-btn" data-index="${index}">Sil</button>
          </td>
        `;

        tbody.appendChild(tr);
      });

      // Silme
      document.querySelectorAll(".sil-btn").forEach(button => {
        button.addEventListener("click", function () {
          const i = this.getAttribute("data-index");
          kullanicilar.splice(i, 1);
          localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));
          listeyiGoster();
        });
      });

      // Düzenleme
      document.querySelectorAll(".duzenle-btn").forEach(button => {
        button.addEventListener("click", function () {
          const i = this.getAttribute("data-index");
          localStorage.setItem("duzenlenecekIndex", i);
          window.location.href = "form.html";
        });
      });
    }

    listeyiGoster();
  }
});
