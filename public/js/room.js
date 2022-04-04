"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const createRoomButton = document.querySelector('.create-room');
const createRoomModal = document.querySelector('.add-room.modal');
createRoomButton.addEventListener('click', e => {
    createRoomModal.classList.add('active');
});
document.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.add-room .overlay-close') || target.matches('.add-room.modal.overlay.active')) {
        createRoomModal.classList.toggle('active');
    }
});
const getAllRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('http://localhost:3000/api/rooms');
    data.json()
        .then(data => {
        const renderData = document.querySelector('.render-data');
        let result = '';
        let count = 1;
        data.forEach((item) => {
            result += `
                <tr>
                    <td>${count++}</td>
                    <td class="bold">${item.name}</td>
                    <td>${item.link}</td>
                    <td class="bold">${+item.status === 0 ? 'Active' : 'Inactive'}</td>
                    <td>
                        <i data-id="${item._id}" class="fal fa-info"></i>
                        <i data-id="${item._id}" class="role-button fal fa-pencil"></i>
                        <i data-id="${item._id}" class="delete-button fal fa-times"></i>
                    </td>
                </tr>
                `;
        });
        renderData.innerHTML = result;
    });
});
getAllRooms();
const addRoom = document.querySelector('.room-save');
addRoom.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = document.querySelector('#name');
    const link = document.querySelector('#link');
    const status = document.querySelector('input[name="status"]:checked');
    const quantity = yield fetch(`http://localhost:3000/api/rooms/subject/${name.value.toLocaleLowerCase()}/${encodeURIComponent(link.value.toLocaleLowerCase())}`, {
        method: 'GET',
    });
    quantity.json()
        .then((data) => __awaiter(void 0, void 0, void 0, function* () {
        if (data.rowName > 0) {
            alert('Room name already exists');
        }
        else if (data.rowLink > 0) {
            alert('Room link already exists');
        }
        else {
            const data = yield fetch('http://localhost:3000/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name.value.toLocaleLowerCase(),
                    link: link.value,
                    status: status.value,
                })
            });
            data.json()
                .then(() => {
                alert('Create Room Successfully');
            })
                .then(() => {
                const modal = document.querySelector('.modal.overlay.active');
                name.value = '';
                link.value = '';
                status.checked = false;
                modal === null || modal === void 0 ? void 0 : modal.classList.remove('active');
            })
                .then(() => {
                getAllRooms();
            });
        }
    }));
}));
