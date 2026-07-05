const searchInput = document.querySelector(".searchInput");
const searchModalOverlay = document.querySelector(".searchModalOverlay");
const searchModal = document.querySelector(".searchModal");
const headerMenu = document.querySelector(".headerMenu");
const rect = searchInput.getBoundingClientRect();
const parentRect = headerMenu.getBoundingClientRect();
searchInput.addEventListener("click", () => {
    document.body.classList.add("overflow-hidden");
    searchModalOverlay.classList.remove("opacity-0", "max-h-0", "pointer-events-none");
    searchModalOverlay.classList.add("opacity-100");
    searchModal.classList.remove("max-h-0", "opacity-0");
    searchModal.classList.add("max-h-125", "opacity-100");
    searchModal.style.left = `${rect.left - parentRect.left}px`;
    searchModal.style.top = `${rect.top - 2}px`;
    document.querySelector(".searchModalInput").querySelector("input").focus();
});
searchModalOverlay.addEventListener("click", (e) => {
    if (e.target === searchModalOverlay) {
        searchModal.classList.remove("max-h-125", "opacity-100");
        searchModal.classList.add("max-h-0", "opacity-0");
        searchModalOverlay.classList.remove("opacity-100");
        searchModalOverlay.classList.add("opacity-0", "pointer-events-none");
        document.body.classList.remove("overflow-hidden");
    }
});
searchModal.addEventListener("click", (e) => {
    e.stopPropagation();
});

async function TrendSearch() {
    let respone = await fetch("http://localhost:3000/trend-search");
    let result = await respone.json();
    let data = result.sort((a, b) => b.title.length - a.title.length);
    document.querySelector(".trendSearchItems").innerHTML = data
        .map((item) => {
            return `    
                <a href="${item.link}" class="trendSearchItem flex ">
                <div class="w-fit px-1 py-1 border border-black/15 rounded-4xl flex gap-1">
                  <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g id="Interface / Trending_Up">
                    <path id="Vector" d="M20.0005 7L14.1543 12.9375C14.0493 13.0441 13.9962 13.0976 13.9492 13.1396C13.1899 13.8193 12.0416 13.8193 11.2822 13.1396C11.2352 13.0976 11.1817 13.0442 11.0767 12.9375C10.9716 12.8308 10.9191 12.7774 10.8721 12.7354C10.1127 12.0557 8.96397 12.0557 8.20461 12.7354C8.15771 12.7773 8.10532 12.8305 8.00078 12.9367L4 17M20.0005 7L20 13M20.0005 7H14" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    </svg>
                    <p class="text-black/70 text-xs line-clamp-1">${item.title}</p>
                </div>
              </a>
 
        `;
        })
        .join("");
}
TrendSearch();
