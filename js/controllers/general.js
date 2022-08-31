import "../organisms/music-search.js";
import "../organisms/footer.js";
import "../organisms/track-container.js";

import "../organisms/logout.js";

import { setListenersForCover } from "../organisms/album__cover.js";
import { setPopupListeners } from "../controllers/selected_playlist.js";

import { getRecomendations } from "../api.js";
import { fillHtmlTemplate } from "../organisms/album__cover.js";
import { changeClass } from "../utils.js";

const root = document.querySelector('.general-container');
document.querySelectorAll('.one-line-playlists').forEach(element => element.remove());

(async () => {
    await getRecomendations(10, category => {
        root.innerHTML += fillCategoryHtmlTemplate(category);

        setTimeout(
            () => {
                category.playlists.forEach(playlist => {
                    setListenersForCover(playlist.id, true);
                });
            },
            100
        );
    });

    setTimeout(
        () => {
            setPopupListeners(true);
            setButtonListeners();
        },
        2000
    );
})();

function fillCategoryHtmlTemplate(category) {
    const res = `
        <div class="one-line-playlists">
            <div class="one-line-playlists__tools">
                <h3 class="primary-text">${category.name}</h3>
                <button class="ref-text expand-btn">Expand</button>
            </div>
            <div class="one-line-playlists__container">
                ${(() => {
            const res = [];

            category.playlists.forEach(playlist => {
                res.push(fillHtmlTemplate(playlist));
            });

            return res.join('');
        })()}
            </div>
        </div>
    `;

    return res;
}

function setButtonListeners() {
    const categoriesContainers = document.querySelectorAll('.one-line-playlists');
    categoriesContainers.forEach(element => {
        const container = element.querySelector('.one-line-playlists__container');
        const btnValues = ['Expand', 'Collapse'];
        const btn = element.querySelector('.expand-btn');
        let btnState = 0;

        btn.addEventListener('click', (e) => {
            btnState ^= 1;
            btn.innerHTML = btnValues[btnState];
            changeClass(container, 'expanded');
        });
    });
}