import { baseLocalUrl } from "./constants.js";

const getToken = () => {
    const cookies = document.cookie;

    if (!cookies.includes("token=")) return null;

    return cookies.split("token=")[1].split(";")[0];
}

const checkAuthorization = () => getToken() ? null : window.location.href = `${baseLocalUrl}`;

const clearCookies = () => document.cookie.split(";").forEach(cookie => document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"));

const closeModal = () => document.querySelector(".modal").style.display = "none";
const openModal = () => {
    document.querySelector(".modal").style.display = "flex";
    document.querySelector(".modal-background").addEventListener("click", closeModal);
}

const buildButton = (className, text, onClick) => {
    const button = document.createElement("button");
    button.classList.add(className);
    button.textContent = text;
    button.addEventListener("click", onClick);
    return button;
}

const buildOption = (text, value, selected) => {
    const option = document.createElement("option");
    option.textContent = text;
    option.value = value;
    option.selected = selected;
    return option;
}

const buildDefaultOption = text => {
    const defaultOption = document.createElement("option");
    defaultOption.textContent = text;
    defaultOption.value = "";
    defaultOption.selected = "true";
    defaultOption.disabled = "true";
    return defaultOption;
}

export {
    getToken,
    checkAuthorization,
    clearCookies,
    closeModal,
    openModal,
    buildButton,
    buildOption,
    buildDefaultOption
};
