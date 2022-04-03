const createRoomButton = document.querySelector('.create-room') as HTMLElement;
const creteRoomModal = document.querySelector('.add-room.modal') as HTMLElement;

createRoomButton.addEventListener('click', e => {
    creteRoomModal.classList.add('active');
})

document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.matches('.add-room .overlay-close') || target.matches('.add-room.modal.overlay.active')) {
        creteRoomModal.classList.toggle('active');
    }
})