export let navbarItemsContainer = document.querySelector(".navbarItemsContainer");
async function getNavbarItems(params) {
    let respone = await fetch("http://localhost:3000/nav-items");
    let result = await respone.json();

    let sepratorIndex = result.length - 2;
    let counter = 1;
    let items = result
        .map((i) => {
            if (counter < sepratorIndex) {
                counter++;
                return `
            <a href="${i.link}" class="">
              <img class="w-4.5 h-4.5 opacity-50" src="${i.svg}" alt="">
              <p>${i.title}</p>
            </a>`;
            }
            if (counter == sepratorIndex) {
                counter++;
                return `
            <a href="${i.link}" class="">
              <img class="w-4.5 h-4.5 opacity-50" src="${i.svg}" alt="">
              <p>${i.title}</p>
            </a>
             <span class="w-px h-4 bg-black/20 p-0!"></span>`;
            } else {
                counter++;
                return `
            <a href="${i.link}" class="">
                  <p>${i.title}</p>
            </a>`;
            }
        })
        .join("");
    navbarItemsContainer.innerHTML += items;

    let links = navbarItemsContainer.querySelectorAll("a");
    let bilbilak = document.querySelector(".bilbilak");
    links.forEach((element) => {
        element.addEventListener("mouseenter", () => {
            setTimeout(() => {
                const rect = element.getBoundingClientRect();
                const parentRect = navbarItemsContainer.getBoundingClientRect();
                bilbilak.style.width = `${rect.width}px`;
                bilbilak.style.left = `${rect.left - parentRect.left}px`;
            }, 50);
        });
        element.addEventListener("mouseleave", () => {
            bilbilak.style.width = `0px`;
        });
    });

}
getNavbarItems();
