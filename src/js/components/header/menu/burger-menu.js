let burgurMenuBtn = document.querySelector(".burgerMenuBtn");
let burgerMenu = document.querySelector(".burgerMenu");
let burgerMenuItemsContainer = document.querySelector(".burgerMenuItemsContainer");
let subMenuItemsContainer = document.querySelector(".subMenuItemsContainer");
let burgerMenuOverlay = document.querySelector(".burgerMenuOverlay");
let secondbilbilak = document.querySelector(".secondbilbilak");
let headerSearch = document.querySelector(".headerSearchLogin");
import { navbarItemsContainer } from "./nvbar";

headerSearch.addEventListener("mouseenter", () => {
    CloseBurgerMenu();
});
navbarItemsContainer.addEventListener("mouseenter", () => {
    CloseBurgerMenu();
});
function OpenBurgerMenu() {
    burgerMenuOverlay.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
}
function CloseBurgerMenu() {
    burgerMenuOverlay.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
}
burgurMenuBtn.addEventListener("mouseenter", () => {
    secondbilbilak.classList.add("w-full");
    OpenBurgerMenu();
});
burgurMenuBtn.addEventListener("mouseleave", (e) => {
    secondbilbilak.classList.remove("w-full");
});
burgerMenuOverlay.addEventListener("mouseleave", () => {
    CloseBurgerMenu();
});
burgerMenuOverlay.addEventListener("click", () => {
    CloseBurgerMenu();
});
burgerMenu.addEventListener("click", (e) => {
    e.stopPropagation();
});
async function GetMenu(params) {
    let respone = await fetch("http://localhost:3000/burger-menu");
    let result = await respone.json();
    let items = result
        .map((i) => {
            return `
        <a dir="rtl" href="${i.link}" class="burgerMenuItem  **:fill-black/80 hover:**:fill-red-500 *:text-xs hover:*:text-red-500">
        ${i.svg}
        <p>${i.title}</p>
        </a>`;
        })
        .join("");
    burgerMenuItemsContainer.innerHTML += items;
    burgerMenuItemsContainer.querySelectorAll("a").forEach((i) => {
        i.addEventListener("mouseenter", () => {
            result.forEach((element) => {
                if (element.title === i.querySelector("p").innerHTML) {
                    const result = [[], [], [], []];
                    element.subMenu.forEach((item, index) => {
                        result[index % 4].push(item);
                    });
                    subMenuItemsContainer.innerHTML = `
                <div dir="rtl" class="subMenuMainLink flex gap-1 items-center *:text-indigo-800 *:text-sm">
                <a href="${element.link}">همه محصولات ${element.title}</a>
                  <svg class=" *:fill-indigo-600" style="width: 16px; height: 16px;" width="24" height="24">
                      <defs>
                       <symbol id="chevronLeft" viewBox="0 0 24 24">
                        <path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414 12z"></path>
                        </symbol>
                      </defs>
                     <use xlink:href="#chevronLeft"></use>
                  </svg>
                </div>
                 <div dir="rtl" class="subMenuItems flex gap-5">
                ${result
                    .map((sc) => {
                        return `<div class="w-fit h-fit mb-5 flex flex-col gap-4">
                        ${sc
                            .map((s) => {
                                return ` <a href="${s.link}" class="flex gap-2 items-center group/sm">
                              <span class="w-0.5 h-3 bg-black group-hover/sm:bg-red-500"></span>
                              <p class="text-sm group-hover/sm:text-red-500">${s.title}</p>
                              <svg class="group-hover/sm:fill-red-500" style="width: 16px; height: 16px;" width="24" height="24">
                               <defs>
                                 <symbol id="chevronLeft" viewBox="0 0 24 24">
                                  <path d="M11.414 12l4.293 4.293-1.414 1.414-5-5a1 1 0 010-1.414l5-5 1.414 1.414L11.414  12z"></path>
                                 </symbol>
                               </defs>
                               <use xlink:href="#chevronLeft"></use>
                               </svg>
                             </a>
                              <div class="flex flex-col gap-3 **:text-sm text-black/50">
                                ${s.subLinks
                                    .map((sl) => {
                                        return `<a class="hover:text-red-500" href="${sl.link}">${sl.title}</a>`;
                                    })
                                    .join("")}
                             </div>
                             `;
                            })
                            .join("")}
                        </div>`;
                    })
                    .join("")}

            `;
                }
            });
        });
    });
}
GetMenu();
