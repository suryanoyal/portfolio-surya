// TAB SWITCHING WITH ANIMATION
document.querySelectorAll(".tab").forEach(tab => {
  tab.onclick = () => {
    const activeContent = document.querySelector(".tab-content.active");
    const newContent = document.getElementById(tab.dataset.tab);
    
    // Prevent clicking the same tab
    if (activeContent === newContent) return;
    
    // Remove active state from tabs
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    
    // Fade out current content
    if (activeContent) {
      activeContent.classList.add("fade-out");
      setTimeout(() => {
        activeContent.classList.remove("active", "fade-out");
      }, 300);
    }
    
    // Add active state to new tab and fade in new content
    tab.classList.add("active");
    newContent.classList.add("active");
  };
});

// INSTAGRAM STYLE OVERLAY (For Graphic Design Tab)
const overlay = document.getElementById("igOverlay");
const igMedia = document.getElementById("igMedia");
const igTitle = document.getElementById("igTitle");

document.querySelectorAll(".post").forEach(post => {
  post.onclick = () => {
    // Ignore if it's a horizontal video (those play inline)
    if (post.classList.contains('horizontal')) return;

    overlay.style.display = "flex";

    const original = post.querySelector("img, video, iframe");
    const media = original.cloneNode(true);

    if (media.tagName === "VIDEO") {
      media.removeAttribute("muted");
      media.setAttribute("controls", true);
    }

    igMedia.innerHTML = "";
    igMedia.appendChild(media);
    igTitle.innerText = post.dataset.title || "";
  };
});

if (document.querySelector(".ig-close")) {
  document.querySelector(".ig-close").onclick = closeOverlay;
}

if (overlay) {
  overlay.onclick = e => {
    if (e.target === overlay) closeOverlay();
  };
}

function closeOverlay() {
  overlay.style.display = "none";
  igMedia.innerHTML = "";
}

// --- REELS FOLDER LOGIC (WITH AUDIO) ---

const folderData = {
  brand: [
    { src: 'assets/reels/chef/Senanguni-chamanthi.mp4', link: 'https://www.instagram.com/p/DSALDvVCWUM/', label: 'Chennanguni Chammanthi' },
    { src: 'assets/reels/chef/Masala chakli.mp4', link: 'https://www.instagram.com/p/DSPhzuQiQl0/', label: 'Masala chakli' },
    { src: 'assets/reels/chef/Egg Chutney.mp4', link: 'https://www.instagram.com/p/DSFTa8Kiffe/', label: 'Egg Chutney' },
    { src: 'assets/reels/chef/Kokarako Chammanthi.mp4', link: 'https://www.instagram.com/p/DSkM6ieiUxH/', label: 'Kokarako Chammanthi' },
    { src: 'assets/reels/chef/Egg Raita.mp4', link: 'https://www.instagram.com/p/DS97wtuCZ33/', label: 'Egg Raita' },
    { src: 'assets/reels/chef/Capsicum thovayal.mp4', link: 'https://www.instagram.com/p/DTDA2aUCUpz/', label: 'Capsicum thovayal' }
  ],
  ads: [
    { src: 'assets/reels/Varsha/Daily Products.mp4', link: 'https://www.instagram.com/p/DSC5YQZDScH/', label: 'Daily Products' },
    { src: 'assets/reels/Varsha/Women Car Benefits.mp4', link: 'https://www.instagram.com/p/DSIFROnjSGq/', label: 'Women Car Benefits' },
    { src: 'assets/reels/Varsha/Online Loans.mp4', link: 'https://www.instagram.com/p/DSNHzQkjBcQ/', label: 'Online Loans' },
    { src: 'assets/reels/Varsha/McD & KFC.mp4', link: 'https://www.instagram.com/p/DSSMb8Fj2MS/', label: 'McD & KFC' },
    { src: 'assets/reels/Varsha/Car Insurance.mp4', link: 'https://www.instagram.com/p/DS2KoxxDVg9/', label: 'Car Insurance' }
  ],
  product: [
    { src: 'assets/reels/Anand/First Investment.mp4', link: 'https://www.instagram.com/p/DR2KiF8CkJB/', label: 'First Investment' },
    { src: 'assets/reels/Anand/Silver Investment.mp4', link: 'https://www.instagram.com/p/DSFYKQyirel/', label: 'Silver Investment' },
    { src: 'assets/reels/Anand/Midnight Chaos.mp4', link: 'https://www.instagram.com/p/DSK1rw-itv5/', label: 'Midnight Chaos' }
  ],
  events: [
    { src: 'assets/reels/Appu/3 Haircut for Boys.mp4', link: 'https://www.instagram.com/p/DScpRkIDfAl/', label: '3 Haircut for Boys' },
    { src: 'assets/reels/Appu/Heroine Hair Story.mp4', link: 'https://www.instagram.com/p/DShl6uhjYcd/', label: 'Heroine Hair Story' },
    { src: 'assets/reels/Appu/Celebrity Cuts 2026.mp4', link: 'https://www.instagram.com/p/DTAge0XDYvX/', label: 'Celebrity Cuts 2026' }
  ],
  motion: [
    { src: 'assets/reels/Sandra/HK Vitals.mp4', link: 'https://www.instagram.com/p/DSupv7lEeF-/', label: 'HK Vitals' }
  ],
  experimental: [
    { src: 'assets/reels/Niveditha/First time.mp4', link: 'https://www.instagram.com/p/DRzqHpnj5kj/', label: 'First time' },
    { src: 'assets/reels/Niveditha/PCOS.mp4', link: 'https://www.instagram.com/p/DSFjhsIDx5n/', label: 'PCOS' },
    { src: 'assets/reels/Niveditha/Period pain.mp4', link: 'https://www.instagram.com/p/DSSgdGCjwbJ/', label: 'Period pain' },
    { src: 'assets/reels/Niveditha/Pregnancy.mp4', link: 'https://www.instagram.com/p/DSaLtojjzYW/', label: 'Pregnancy' },
    { src: 'assets/reels/Niveditha/Work from Home.mp4', link: 'https://www.instagram.com/p/DSh2CfnE6E8/', label: 'Work from Home' },
    { src: 'assets/reels/Niveditha/Arrange Marriage .mp4', link: 'https://www.instagram.com/p/DSkaoKUDyst/', label: 'Arrange Marriage' },
    { src: 'assets/reels/Niveditha/Menstrual Fears.mp4', link: 'https://www.instagram.com/p/DSpZnDVj0Cm/', label: 'Menstrual Fears' },
    { src: 'assets/reels/Niveditha/Pregnancy Myths.mp4', link: 'https://www.instagram.com/p/DSujQ2PD-_Z/', label: 'Pregnancy Myths' },
    { src: 'assets/reels/Niveditha/Health Signs.mp4', link: 'https://www.instagram.com/p/DSzq1RYjwS2/', label: 'Health Signs' },
    { src: 'assets/reels/Niveditha/4 Friends.mp4', link: 'https://www.instagram.com/p/DS49MkDj9VK/', label: '4 Friends' },
    { src: 'assets/reels/Niveditha/AMH.mp4', link: 'https://www.instagram.com/p/DS-INjaDxaU/', label: 'AMH' },
    { src: 'assets/reels/Niveditha/Not Ready.mp4', link: 'https://www.instagram.com/p/DTDY-mBD0wN/', label: 'Not Ready' }
  ]
};

function loadReels(category) {
  const grid = document.getElementById('videoGrid');
  const data = folderData[category];

  grid.innerHTML = '';

  if (!data || data.length === 0) {
    grid.innerHTML = '<div style="color:#aaa; width:100%; text-align:center; padding:20px;">No reels found in this folder.</div>';
    return;
  }

  data.forEach(item => {
    const card = document.createElement('div');
    card.className = 'reel-item';
    
    // Create Video
    const video = document.createElement('video');
    video.src = item.src;
    video.loop = true;
    video.preload = "metadata";
    video.playsInline = true; 
    
    // Note: We do NOT set muted=true here, so we can try to play with sound first.

    // HOVER: Attempt to play with Audio
    card.addEventListener('mouseenter', async () => {
      try {
        video.currentTime = 0;
        video.muted = false; // Try to unmute
        await video.play();
      } catch (err) {
        console.warn("Browser blocked audio. Playing muted fallback.");
        // Fallback: If browser blocks audio, play muted
        video.muted = true;
        await video.play();
      }
    });
    
    // LEAVE: Pause and Reset
    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });

    // CLICK: Open Link
    card.addEventListener('click', () => {
      if (item.link && item.link !== '#') {
        window.open(item.link, '_blank');
      }
    });

    // Label
    const label = document.createElement('p');
    label.innerText = item.label;

    card.appendChild(video);
    card.appendChild(label);
    grid.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const folders = document.querySelectorAll('.folder');
  
  if(folders.length > 0) {
    folders.forEach(folder => {
      folder.addEventListener('click', function() {
        folders.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        const category = this.getAttribute('data-folder');
        loadReels(category);
      });
    });

    // Load default category
    loadReels('brand');
  }
});