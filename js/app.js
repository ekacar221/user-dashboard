document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("userForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const adSoyad = form.querySelector("input[type='text']").value;
    const email = form.querySelector("input[type='email']").value;
    const telefon = form.querySelector("input[type='tel']").value;

    const yeniKullanici = {
      adSoyad,
      email,
      telefon
    };

    // Mevcut kullanıcıları al
    let kullanicilar = JSON.parse(localStorage.getItem("kullanicilar")) || [];

    // Yeni kullanıcıyı ekle
    kullanicilar.push(yeniKullanici);

    // Güncellenmiş listeyi kaydet
    localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));

    // Temizle ve yönlendir
    form.reset();
    alert("Kullanıcı kaydedildi!");
    window.location.href = "users.html";
  });
});
// Kullanıcı listesi sayfası için
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.pathname.includes("users.html")) {
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
            <button class="sil-btn" data-index="${index}">Sil</button>
          </td>
        `;

        tbody.appendChild(tr);
      });

      // Sil butonlarına tıklama olayı
      const silButonlari = document.querySelectorAll(".sil-btn");
      silButonlari.forEach(button => {
        button.addEventListener("click", function () {
          const i = this.getAttribute("data-index");
          kullanicilar.splice(i, 1); // diziden sil
          localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar));
          listeyiGoster(); // tabloyu yenile
        });
      });
    }

    listeyiGoster();
  }
});
