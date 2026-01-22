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
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/chef/Senanguni-chamanthi.mp4', link: 'https://www.instagram.com/p/DSALDvVCWUM/', label: 'Chennanguni Chammanthi' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/chef/Masala%20chakli.mp4', link: 'https://www.instagram.com/p/DSPhzuQiQl0/', label: 'Masala chakli' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/chef/Egg%20Chutney.mp4', link: 'https://www.instagram.com/p/DSFTa8Kiffe/', label: 'Egg Chutney' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/chef/Kokarako%20Chammanthi.mp4', link: 'https://www.instagram.com/p/DSkM6ieiUxH/', label: 'Kokarako Chammanthi' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/chef/Egg%20Raita.mp4', link: 'https://www.instagram.com/p/DS97wtuCZ33/', label: 'Egg Raita' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/chef/Capsicum%20thovayal.mp4', link: 'https://www.instagram.com/p/DTDA2aUCUpz/', label: 'Capsicum thovayal' }
  ],
  ads: [
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Varsha/Daily%20Products.mp4', link: 'https://www.instagram.com/p/DSC5YQZDScH/', label: 'Daily Products' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Varsha/Women%20Car%20Benefits.mp4', link: 'https://www.instagram.com/p/DSIFROnjSGq/', label: 'Women Car Benefits' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Varsha/Online%20Loans.mp4', link: 'https://www.instagram.com/p/DSNHzQkjBcQ/', label: 'Online Loans' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Varsha/McD%20&%20KFC.mp4', link: 'https://www.instagram.com/p/DSSMb8Fj2MS/', label: 'McD & KFC' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Varsha/Car%20Insurance.mp4', link: 'https://www.instagram.com/p/DS2KoxxDVg9/', label: 'Car Insurance' }
  ],
  product: [
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Anand/First%20Investment.mp4', link: 'https://www.instagram.com/p/DR2KiF8CkJB/', label: 'First Investment' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Anand/Silver%20Investment.mp4', link: 'https://www.instagram.com/p/DSFYKQyirel/', label: 'Silver Investment' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Anand/Midnight%20Chaos.mp4', link: 'https://www.instagram.com/p/DSK1rw-itv5/', label: 'Midnight Chaos' }
  ],
  events: [
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Appu/3%20Haircut%20for%20Boys.mp4', link: 'https://www.instagram.com/p/DScpRkIDfAl/', label: '3 Haircut for Boys' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Appu/Heroine%20Hair%20Story.mp4', link: 'https://www.instagram.com/p/DShl6uhjYcd/', label: 'Heroine Hair Story' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Appu/Celebrity%20Cuts%202026.mp4', link: 'https://www.instagram.com/p/DTAge0XDYvX/', label: 'Celebrity Cuts 2026' }
  ],
  motion: [
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Sandra/HK%20Vitals.mp4', link: 'https://www.instagram.com/p/DSupv7lEeF-/', label: 'HK Vitals' }
  ],
  experimental: [
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/First%20time.mp4', link: 'https://www.instagram.com/p/DRzqHpnj5kj/', label: 'First time' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/PCOS.mp4', link: 'https://www.instagram.com/p/DSFjhsIDx5n/', label: 'PCOS' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/Period%20pain.mp4', link: 'https://www.instagram.com/p/DSSgdGCjwbJ/', label: 'Period pain' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/Pregnancy.mp4', link: 'https://www.instagram.com/p/DSaLtojjzYW/', label: 'Pregnancy' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/Work%20from%20Home.mp4', link: 'https://www.instagram.com/p/DSh2CfnE6E8/', label: 'Work from Home' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/Arrange%20Marriage%20.mp4', link: 'https://www.instagram.com/p/DSkaoKUDyst/', label: 'Arrange Marriage' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/Menstrual%20Fears.mp4', link: 'https://www.instagram.com/p/DSpZnDVj0Cm/', label: 'Menstrual Fears' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/Pregnancy%20Myths.mp4', link: 'https://www.instagram.com/p/DSujQ2PD-_Z/', label: 'Pregnancy Myths' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/Health%20Signs.mp4', link: 'https://www.instagram.com/p/DSzq1RYjwS2/', label: 'Health Signs' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/4%20Friends.mp4', link: 'https://www.instagram.com/p/DS49MkDj9VK/', label: '4 Friends' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/AMH.mp4', link: 'https://www.instagram.com/p/DS-INjaDxaU/', label: 'AMH' },
    { src: 'https://ik.imagekit.io/2gmny0aig/Portfolio/assets/reels/Niveditha/Not%20Ready.mp4', link: 'https://www.instagram.com/p/DTDY-mBD0wN/', label: 'Not Ready' }
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