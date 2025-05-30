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
