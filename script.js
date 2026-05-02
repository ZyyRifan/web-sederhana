// Jalankan fungsi Splash Screen saat halaman pertama kali dimuat
window.addEventListener('load', () => {
    // Pastikan hanya layar splash yang aktif di awal
    const splash = document.getElementById('splash');
    
    // Tunggu 3 detik (simulasi loading) lalu pindah ke Home
    setTimeout(() => {
        splash.style.opacity = '0';
        splash.style.transition = '0.5s';
        
        setTimeout(() => {
            splash.classList.remove('active');
            document.getElementById('home').classList.add('active');
        }, 500);
    }, 3000); 
});

// Fungsi Pusat Navigasi
// 1. Fungsi Navigasi Utama
function navigateTo(screenId) {
    console.log("Mencoba pindah ke: " + screenId); // Untuk cek di inspect element
    
    // Sembunyikan semua layar
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Tampilkan layar tujuan
    const target = document.getElementById(screenId);
    if (target) {
        target.classList.add('active');
    }
}

// 2. Splash Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        const splash = document.getElementById('splash');
        splash.classList.add('hidden'); // Menggunakan class hidden agar bisa diklik layarnya
        
        // Pindah ke home
        navigateTo('home');
    }, 3000); 
});


function select(element, name, price) {
    // 1. Reset state
    document.querySelectorAll('.service-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // 2. Set active
    element.classList.add('active');

    // 3. Update Text with Animation
    const nameEl = document.getElementById('selected-name');
    const priceEl = document.getElementById('selected-price');

    // Fade out
    nameEl.style.opacity = "0";
    priceEl.style.opacity = "0";

    setTimeout(() => {
        nameEl.innerText = name;
        priceEl.innerText = `Rp ${price.toLocaleString('id-ID')} / 3 Jam`;
        
        // Fade in
        nameEl.style.opacity = "1";
        priceEl.style.opacity = "1";
    }, 200);
}

// Untuk booking form
// 1. Variabel Global untuk menyimpan pilihan
let selectedService = {
    name: 'Deep Cleaning',
    price: 'Rp 150.000'
};

// 2. Fungsi saat memilih kartu jasa di Home
function selectService(element, name, price) {
    // Hilangkan active dari semua kartu
    document.querySelectorAll('.service-card').forEach(card => card.classList.remove('active'));
    // Tambahkan active ke yang diklik
    element.classList.add('active');

    // Simpan ke variabel global
    selectedService.name = name;
    selectedService.price = `Rp ${price.toLocaleString('id-ID')}`;

    // Update tampilan ringkasan di bawah (floating card)
    document.getElementById('home-selected-name').innerText = name;
    document.getElementById('home-selected-price').innerText = selectedService.price + " / 3 Jam";
}

// 3. Fungsi saat menekan tombol "PESAN SEKARANG"
function goToBooking() {
    // SEBELUM pindah layar, update teks di layar Detail Pesanan
    const bookName = document.getElementById('book-service-name');
    const bookPrice = document.getElementById('book-service-price');

    if (bookName && bookPrice) {
        bookName.innerText = selectedService.name;
        bookPrice.innerText = selectedService.price;
    }

    // Pindah ke layar booking menggunakan sistem navigasi terpusat
    navigateTo('booking');
}

// 3. Fungsi Kembali
function goBack() {
    navigateTo('home');
}

// 4. Simulasi GPS Micro-interaction[cite: 1]
function simulateGPS(btn) {
    btn.innerText = "Mencari...";
    setTimeout(() => {
        btn.innerText = "Lokasi Berhasil Diambil!";
        btn.style.color = "#22c55e";
    }, 1000);
}

// Fungsi Lanjut ke Tracking dari Booking
function processToTracking() {
    alert("Pembayaran Berhasil!");
    navigateTo('tracking');
    moveHelper(); // Jalankan animasi pin
}

function moveHelper() {
    const marker = document.getElementById('helper-marker');
    const eta = document.getElementById('eta-text');
    let minutes = 8;
    
    // Simulasi pergerakan pin di peta
    const movement = setInterval(() => {
        let top = parseInt(marker.style.top) || 20;
        let left = parseInt(marker.style.left) || 20;
        
        if (minutes <= 1) {
            clearInterval(movement);
            document.getElementById('tracking-status').innerText = "Mbak Yuni sudah sampai!";
            eta.innerText = "Tiba di lokasi";
        } else {
            marker.style.top = (top + 2) + "%";
            marker.style.left = (left + 3) + "%";
            minutes--;
            eta.innerText = `${minutes} menit lagi (1.${minutes} km)`;
        }
    }, 3000); // Bergerak setiap 3 detik
}

// SCREEN 4
// Tambahkan fungsi pindah ke monitoring
function startMonitoring() {
    document.getElementById('tracking').classList.remove('active');
    document.getElementById('monitoring').classList.add('active');
    
    // Simulasi peningkatan progress
    let prog = 65;
    const bar = document.querySelector('.track-fill');
    const text = document.getElementById('mon-percent');
    
    const interval = setInterval(() => {
        if(prog >= 90) clearInterval(interval);
        prog++;
        bar.style.width = prog + '%';
        text.innerText = prog + '%';
    }, 5000);
}

// Di layar Tracking, buat helper otomatis masuk ke monitoring setelah tiba
// (Update fungsi moveHelper sebelumnya)
function moveHelper() {
    const marker = document.getElementById('helper-marker');
    let minutes = 1;
    
    const movement = setInterval(() => {
        if (minutes <= 1) {
            clearInterval(movement);
            // Otomatis pindah ke monitoring setelah beberapa detik "sampai"
            setTimeout(startMonitoring, 2000);
        } else {
            // ... (logika gerak marker) ...
            minutes--;
        }
    }, 2000);
}

// SCREEN 5
// Navigasi ke layar Selesai
function finishOrder() {
    document.getElementById('monitoring').classList.remove('active');
    document.getElementById('complete').classList.add('active');
    
    // Update nama layanan terakhir
    document.getElementById('final-service-name').innerText = selectedService.name;
    
    // Inisialisasi Rating Bintang
    initRating();
}

function initRating() {
    const stars = document.querySelectorAll('#final-stars i');
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const val = star.getAttribute('data-val');
            stars.forEach(s => {
                s.classList.toggle('active', s.getAttribute('data-val') <= val);
            });
        });
    });
}

// Update tombol di layar Monitoring sebelumnya agar memanggil finishOrder()
// Ganti: onclick="alert('Layanan Selesai! ...')" 
// Menjadi: onclick="finishOrder()"