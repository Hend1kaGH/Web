const aboutText = `
CTF (Capture The Flag) adalah kompetisi keamanan siber
di mana peserta memecahkan berbagai tantangan seperti
cryptography, web exploitation, forensics, dan reverse engineering.

Setiap tantangan memiliki sebuah "FLAG"
yang harus ditemukan untuk mendapatkan poin.

Think like a hacker.
Learn by breaking.
Have fun.
`;

// --- 1. DATA CHALLENGES (Termasuk Flag, File, dan Hint) ---
const challenges = [
    { 
        id: 1, 
        title: "Base64", 
        cat: "CRYPTOGRAPHY", 
        desc: "Kami menemukan sebuah pesan rahasia yang diubah menjadi kode Base64. Kamu hanya perlu mengembalikannya menjadi teks biasa.\nPesan rahasia = SENURntiNHNlNjRfaXNfdG8wXzNhc3l9", 
        pts: 200,
        flag: "HCTF{b4se64_is_to0_3asy}",
        hint: "Gunakan tool 'Base64 Decoder' online."
    },
    { 
        id: 2, 
        title: "soar", 
        cat: "CRYPTOGRAPHY", 
        desc: "rolling xor.\npassword ada di hints", 
        pts: 300,
        flag: "HCTF{xss_injection_success}",
        file: "assets/SOAR.zip",
        hint: "i6db}Brg*u&3iBnh=FgF=?fD@P1E!G"
    },
    { 
        id: 3, 
        title: "mapz", 
        cat: "CRYPTOGRAPHY", 
        desc: "Let's learn about mapping and symmetric encryption.\npassword ada di hints", 
        pts: 300,
        flag: "HCTF{aes_256_bit_encrypted}",
        file: "assets/MAPZ.zip",
        hint: "t}/n)5d#qT(?Vt%HD4WRY5@DRkKRZd"
    },
    {
        id: 4, 
        title: "silent metadata", 
        cat: "Digital Forensics", 
        desc: "uncover a hidden message stored inside image details.\npassword ada di hints", 
        pts: 300,
        flag: "HCTF{aes_256_bit_encrypted}",
        file: "assets/SILENT_METADATA.zip",
        hint: "S=GGZ:xxBpg)edP4+Zg6J?cwi0h,f3"
    },
    {
        id: 5, 
        title: "packet trail", 
        cat: "Digital Forensics", 
        desc: "basic artifact extraction from captured network activity.\npassword ada di hints", 
        pts: 300,
        flag: "HCTF{aes_256_bit_encrypted}",
        file: "assets/PACKET_TRAIL.zip",
        hint: "h/k.abp0![UWD?rW{5#044.Tg5QXpV"
    },
    {
        id: 6, 
        title: "what is it", 
        cat: "Reverse Engineering", 
        desc: "apa ini?\npassword ada di hints", 
        pts: 300,
        flag: "HCTF{aes_256_bit_encrypted}",
        file: "assets/WHAT_IS_IT.zip",
        hint: "c+VGV%Bg)Hgf!HTLvzF-%Z}3VUv5:6"
    },
    {
        id: 7, 
        title: "orion checker", 
        cat: "Reverse Engineering", 
        desc: "very simple flag checker.\npassword ada di hints", 
        pts: 300,
        flag: "HCTF{aes_256_bit_encrypted}",
        file: "assets/ORION_CHECKER.zip",
        hint: "G)/)D::K!G@1e7/z*#=@_pr;u=AQ:p"
    },
    {
        id: 8, 
        title: "JANGAN LUPA BERDOA (/≧▽≦)/", 
        cat: "welcome", 
        desc: "HCTF{GO0D_G4M3_H4V3_FUN}", 
        pts: 300,
        flag: "HCTF{GO0D_G4M3_H4V3_FUN}",
    }
];

// --- 2. SISTEM AUDIO ---
const sfxHover = document.getElementById('sfx-hover');
const sfxClick = document.getElementById('sfx-click');
const sfxSuccess = document.getElementById('sfx-success');


function playHover() {
    if (sfxHover) {
        sfxHover.currentTime = 0;
        sfxHover.play().catch(() => {});
    }
}

function playClick() {
    if (sfxClick) {
        sfxClick.currentTime = 0;
        sfxClick.play().catch(() => {});
    }
}

// --- 3. LOGIKA NAVIGASI HALAMAN ---
let currentChallengeId = null;

function changePage(pageId) {
    playClick();

    
    document.querySelectorAll('.page').forEach(p => {
        p.classList.remove('active');
        p.classList.add('hidden');
    });

    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    const target = document.getElementById(pageId);
    if (target) {
        target.classList.remove('hidden');
        setTimeout(() => target.classList.add('active'), 10);
    }

    const navBtn = document.getElementById('nav-' + pageId);
    if (navBtn) navBtn.classList.add('active');

    if (pageId === 'missions') renderMissions();

if (pageId === 'about') {
    setTimeout(() => {
        startAboutTyping();
    }, 300); // delay dikit biar animasi page selesai
}

}

// --- 4. RENDER KARTU TANTANGAN ---
function renderMissions() {
    const container = document.getElementById('mission-content');
    if (!container) return;

    container.innerHTML = "";
    const categories = [...new Set(challenges.map(c => c.cat))];

    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = "category-group";

        section.innerHTML = `
            <span class="category-label">> ${cat}</span>
            <div class="mission-grid">
                ${challenges.filter(c => c.cat === cat).map(c => `
                    <div class="card" onclick="openModal(${c.id})" onmouseenter="playHover()">
                        <span class="card-id">ID:0${c.id}</span>
                        <h4 class="card-title">${c.title}</h4>

                        <div class="coin-box">
                            <img src="assets/coin.png" class="coin-icon">
                            <span class="coin-value">${c.pts}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
        container.appendChild(section);
    });
}

// --- 5. LOGIKA MODAL ---
function openModal(id) {
    playClick();
    currentChallengeId = id;

    const data = challenges.find(x => x.id === id);
    if (!data) return;

    document.getElementById('m-title').innerText = data.title;
    document.getElementById('m-cat').innerText = data.cat;
    document.getElementById('m-desc').innerText = data.desc;
    document.getElementById('m-pts').innerText = data.pts;

    const downloadBtn = document.getElementById('m-link');
    if (data.file) {
        downloadBtn.href = data.file;
        downloadBtn.style.display = "inline-block";
    } else {
        downloadBtn.style.display = "none";
    }

    document.getElementById('flag-input').value = "";
    document.getElementById('modal').classList.remove('hidden');
}

function closeModal() {
    playClick();
    document.getElementById('modal').classList.add('hidden');
}

// --- 6. LOGIKA SUBMIT FLAG & HINT ---
// --- FUNGSI KONTROL ALERT CUSTOM ---
function showAlert(title, message, isSuccess = false) {
    const alertModal = document.getElementById('custom-alert');
    const titleEl = document.getElementById('alert-title');
    const contentEl = document.getElementById('alert-content');
    
    titleEl.innerText = title;
    contentEl.innerText = message;
    
    // Ganti warna border berdasarkan sukses atau hint
    const card = alertModal.querySelector('.modal-card');
    if (isSuccess) {
        card.style.borderColor = "var(--pink)";
        card.style.boxShadow = "0 0 20px var(--pink)";
        document.getElementById('m-title').style.color = "var(--pink)";
    } else {
        card.style.borderColor = "var(--cyan)";
        card.style.boxShadow = "0 0 20px var(--cyan)";
    }

    alertModal.classList.remove('hidden');
}

function closeAlert() {
    playClick();
    document.getElementById('custom-alert').classList.add('hidden');
}

// --- UPDATE LOGIKA SUBMIT FLAG ---
function submitFlag() {
    const userInput = document.getElementById('flag-input').value;
    
    // Mencari data tantangan berdasarkan ID yang disimpan saat modal dibuka
    const currentMission = challenges.find(m => m.id === currentChallengeId);

    if (currentMission && userInput === currentMission.flag) {
        if (sfxSuccess) sfxSuccess.play();
        
        // Panggil Custom Alert yang kita buat sebelumnya
        showAlert("ACCESS GRANTED", "CONGRATULATIONS! FLAG ACCEPTED.", true);
        
        closeModal();
        renderMissions(); 
    } else {
        // Tampilkan pesan salah lewat Custom Alert
        showAlert("ACCESS DENIED", "WRONG FLAG. TRY AGAIN!");
    }
}

// --- UPDATE LOGIKA HINT ---
function showHint() {
    playClick();
    const data = challenges.find(x => x.id === currentChallengeId);

    if (data && data.hint) {
        showAlert("DECRYPTED HINT", data.hint);
    } else {
        showAlert("SYSTEM ERROR", "No hint available for this mission.");
    }
}

// --- 7. INIT ---
window.onload = () => {
    changePage('home');
};

// Update Jam Digital
setInterval(() => {
    const clockEl = document.getElementById('clock');
    if (clockEl) {
        clockEl.innerText = new Date().toLocaleTimeString('en-GB');
    }
}, 1000);

function updateHeroDate() {
    const dateEl = document.querySelector('.hero-date'); // Mengambil elemen di HTML
    if (!dateEl) return;

    const sekarang = new Date();
    
    // Opsi format Indonesia
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    
    // Mengubah tanggal ke string format Indonesia (ID)
    const tanggalFormatted = sekarang.toLocaleDateString('id-ID', options).toUpperCase();
    
    dateEl.innerText = tanggalFormatted;
}

// Panggil fungsi ini saat window di-load
window.addEventListener('load', () => {
    updateHeroDate();
    // ... fungsi init lainnya
});

// Variabel untuk menyimpan interval typing agar bisa dihentikan jika perlu
let typingInterval;

function showAlert(title, message, isSuccess = false) {
    const alertModal = document.getElementById('custom-alert');
    const titleEl = document.getElementById('alert-title');
    const contentEl = document.getElementById('alert-content');
    const card = alertModal.querySelector('.modal-card');

    // Reset konten dan hentikan typing sebelumnya
    clearInterval(typingInterval);
    contentEl.innerText = "";
    
    titleEl.innerText = title;

    // Pengaturan warna tema (Pink untuk sukses, Cyan untuk hint)
    if (isSuccess) {
        card.style.borderColor = "var(--pink)";
        card.style.boxShadow = "0 0 20px var(--pink)";
        titleEl.parentElement.style.backgroundColor = "var(--pink)";
    } else {
        card.style.borderColor = "var(--cyan)";
        card.style.boxShadow = "0 0 20px var(--cyan)";
        titleEl.parentElement.style.backgroundColor = "var(--cyan)";
    }

    alertModal.classList.remove('hidden');

    // Efek Mengetik Otomatis
    let i = 0;
    typingInterval = setInterval(() => {
        if (i < message.length) {
            contentEl.innerText += message.charAt(i);
            i++;
        } else {
            clearInterval(typingInterval);
        }
    }, 30); // Kecepatan mengetik (30ms per karakter)
}

let aboutTypingInterval;

function startAboutTyping() {
    const textEl = document.getElementById("about-text-typing");
    if (!textEl) return;

    // Reset typing sebelumnya
    clearInterval(aboutTypingInterval);
    textEl.innerText = "";

    const voice = document.getElementById("sfx-char-voice");
    if (voice) {
        voice.currentTime = 0;
        voice.play().catch(() => {});
    }

    let i = 0;
    aboutTypingInterval = setInterval(() => {
        if (i < aboutText.length) {
            textEl.innerText += aboutText.charAt(i);
            i++;
        } else {
            clearInterval(aboutTypingInterval);
            if (voice) voice.pause();
        }
    }, 35); // kecepatan typing (ms)
}
