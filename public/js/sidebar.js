"use strict";
const title = document.querySelectorAll('.title-dropdown');
const dropdown = document.querySelectorAll('.dropdown');
function removeActiveItem() {
    const titleActive = document.querySelector('.title-dropdown.active');
    const dropdownActive = document.querySelector('.dropdown.active');
    titleActive.classList.remove('active');
    dropdownActive.style.maxHeight = '0';
    dropdownActive.classList.remove('active');
}
title.forEach((item, index) => {
    const pane = dropdown[index];
    item.onclick = (_e) => {
        const height = pane.scrollHeight;
        if (!!document.querySelector('.title-dropdown.active')) {
            if (document.querySelector('.title-dropdown.active') === _e.target) {
                removeActiveItem();
                return;
            }
            removeActiveItem();
        }
        item.classList.add('active');
        pane.style.maxHeight = `${height}px`;
        pane.classList.add('active');
    };
});
