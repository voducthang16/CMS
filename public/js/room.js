"use strict";
const createRoomButton = document.querySelector('.create-room');
const creteRoomModal = document.querySelector('.add-room.modal');
createRoomButton.addEventListener('click', e => {
    creteRoomModal.classList.add('active');
});
document.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.add-room .overlay-close') || target.matches('.add-room.modal.overlay.active')) {
        creteRoomModal.classList.toggle('active');
    }
});
