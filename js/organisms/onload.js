import { handleAuthRedirect,  } from "../api.js";

onPageLoad();

function onPageLoad() {
    const query = window.location.search;
    if (query.length > 0) {
        handleAuthRedirect(query);
    }
}



