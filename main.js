
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });
});


function removeLoader() {
    setTimeout(() => {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            preloader.style.opacity = '0';
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }
    }, 800);
}


function router() {
    const hash = window.location.hash.replace('#', '') || 'home';

    // Tüm sayfaları gizle
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });

    // Tüm navigasyon linklerini pasif yap
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Aktif sayfayı göster
    const activePage = document.getElementById(hash);
    const activeLink = document.getElementById('nav-' + hash);

    if (activePage) {
        activePage.classList.add('active');
    }

    if (activeLink) {
        activeLink.classList.add('active');
    }


    window.scrollTo({ top: 0, behavior: 'smooth' });
}


window.addEventListener('hashchange', router);
window.addEventListener('load', router);

async function fetchServerStats() {
    try {

        const mcRes = await fetch('https://api.mcstatus.io/v2/status/java/angelnetwork.mcsh.io');
        const mcData = await mcRes.json();

        const playerCount = mcData.online 
            ? `${mcData.players.online} / ${mcData.players.max || 200}` 
            : "0 / 200";

        const mcElement = document.getElementById('mc-count-text');
        if (mcElement) mcElement.innerText = playerCount;

        // Discord Aktif Üye (Örnek)
        const dsRes = await fetch('https://discord.com/api/guilds/1481264975153467516/widget.json');
        const dsData = await dsRes.json();

        const discordElement = document.getElementById('real-discord-members');
        if (discordElement) discordElement.innerText = `${dsData.presence_count || 0} AKTİF`;

    } catch (error) {
        console.log("Canlı veri alınamadı.");
    }
}


fetchServerStats();
setInterval(fetchServerStats, 60000);


function toast(msg) {
    const toastEl = document.getElementById('mainToast');
    if (!toastEl) return;

    toastEl.innerText = msg;
    toastEl.style.transform = 'translate(-50%, 0)';

    setTimeout(() => {
        toastEl.style.transform = 'translate(-50%, 100px)';
    }, 3000);
}

function copyIP() {
    navigator.clipboard.writeText("angelnetwork.mcsh.io")
        .then(() => toast("IP KOPYALANDI! 🚀"))
        .catch(() => toast("IP kopyalanamadı!"));
}