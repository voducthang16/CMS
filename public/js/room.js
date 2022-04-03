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
const createRoomModel = document.querySelector('.add-room.modal');
createRoomButton.addEventListener('click', e => {
    createRoomModel.classList.add('active');
});
document.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.add-room .overlay-close') || target.matches('.add-room.modal.overlay.active')) {
        createRoomModel.classList.toggle('active');
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
// function vn_to_en(string: string) {
//     string = string.replace(/\s+/g, ' ');
//     string = string.trim();
//     string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
//     string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
//     string = string.replace(/ì|í|ị|ỉ|ĩ/g, "i");
//     string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
//     string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
//     string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
//     string = string.replace(/đ/g, "d");
//     string = string.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
//     string = string.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
//     string = string.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
//     string = string.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
//     string = string.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
//     string = string.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
//     string = string.replace(/Đ/g, "D");
//     return string;
// }
// function acronym(string: string) {
//     var matches = string.match(/\b(\w)/g);
//     return matches?.join('');
// }
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
