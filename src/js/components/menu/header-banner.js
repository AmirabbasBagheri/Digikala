let adsBanner = document.querySelector(".adsBanner");
let banner = "";
async function GetBabnner(params) {
    try {
        let respone = await fetch("http://localhost:3000/adsBanner");
        let result = await respone.json();
        banner = result
            .map((b) => {
                return `
            <a src="${b.link}">
            <img src="${b.img}" alt="" class="w-full h-full object-cover">
            </a>
        `;
            })
            .join("");
        adsBanner.innerHTML = banner;
    } catch (error) {
        console.log(error);
    }
}
GetBabnner();
