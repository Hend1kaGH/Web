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
    window.scrollTo(0, 0);
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
function submitFlag() {
    const userInput = document.getElementById('flag-input').value;
    
    // Gunakan variabel 'challenges' (bukan 'missions')
    // Dan cari berdasarkan 'currentChallengeId' yang sedang aktif
    const currentMission = challenges.find(m => m.id === currentChallengeId);

    if (currentMission && userInput === currentMission.flag) {
        // Mainkan suara sukses (pastikan fungsi playSuccess sudah dibuat atau gunakan sfxSuccess)
        if (sfxSuccess) sfxSuccess.play();
        
        alert("CONGRATULATIONS! FLAG ACCEPTED.");
        
        closeModal();
        renderMissions(); 
    } else {
        alert("WRONG FLAG. TRY AGAIN!");
    }
}

function showHint() {
    playClick();
    const data = challenges.find(x => x.id === currentChallengeId);

    if (data && data.hint) {
        alert("HINT: " + data.hint);
    } else {
        alert("Tidak ada petunjuk untuk misi ini.");
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

