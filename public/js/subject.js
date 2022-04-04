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
const createSubjectButton = document.querySelector('.create-subject');
const createSubjectModal = document.querySelector('.add-subject');
const renderRoom = document.querySelector('#room');
const renderLecturer = document.querySelector('#lecturer');
const addSubject = document.querySelector('.subject-save');
addSubject.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = document.querySelector('#name');
    let code = acronym(vn_to_en(name.value.toLocaleLowerCase()));
    const room = document.querySelector('#room');
    const lecturer = document.querySelector('#lecturer');
    const startTime = document.querySelector('#start-time');
    const endTime = document.querySelector('#end-time');
    const weekday = document.querySelector('#weekday');
    const startDay = document.querySelector('#start-day');
    const endDay = document.querySelector('#end-day');
    const status = document.querySelector('input[name="status"]:checked');
    const quantity = yield fetch(`http://localhost:3000/api/subjects/name/${name.value.toLocaleLowerCase()}`);
    quantity.json()
        .then((quantity) => __awaiter(void 0, void 0, void 0, function* () {
        code = `${code}_${++quantity.data}`;
        const data = yield fetch('http://localhost:3000/api/subjects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name.value.toLocaleLowerCase(),
                code: code,
                room: room.value,
                lecturer: lecturer.value,
                startTime: startTime.value,
                endTime: endTime.value,
                startDay: startDay.value,
                endDay: endDay.value,
                weekdays: weekday.value,
                status: status.value,
            })
        });
        data.json()
            .then(() => {
            alert('Create Subject Successfully');
        });
    }));
    // .then(() => {
    //     const modal = document.querySelector('.modal.overlay.active');
    //     name.value = '';
    //     status.checked = false;
    //     modal?.classList.remove('active');
    // })
    // .then(() => {
    //     getAllRooms()
    // })
}));
createSubjectButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    let room = '';
    room += `<option hidden>Chọn phòng học</option>`;
    yield getRoom().then(data => {
        data.map((item) => {
            room += `
                <option value="${item._id}">${item.name}</option>
            `;
        });
        renderRoom.innerHTML = room;
    });
    let lecturers = '';
    lecturers += `<option hidden>Chọn giảng viên</option>`;
    yield getLecturer().then(data => {
        data.map((item) => {
            lecturers += `
                <option value="${item._id}">${item.lastName} ${item.firstName}</option>
            `;
        });
        renderLecturer.innerHTML = lecturers;
    });
    createSubjectModal.classList.add('active');
}));
const weekday = (value) => {
    if (value === 0) {
        return 'Thứ hai';
    }
    else if (value === 1) {
        return 'Thứ ba';
    }
    else if (value === 2) {
        return 'Thứ tư';
    }
    else if (value === 3) {
        return 'Thứ năm';
    }
    else {
        return 'Thứ sáu';
    }
};
const getAllSubjects = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('http://localhost:3000/api/subjects');
    data.json()
        .then(subject => {
        const renderData = document.querySelector('.render-data');
        let result = '';
        let count = 1;
        subject.forEach((item) => {
            result += `
            <tr>
                <td>${count++}</td>
                <td class="bold"><span style="text-transform: capitalize;">${item.name}</span> - ${item.code}</td>
                <td>${item.room.link}</td>
                <td>${item.lecturer.lastName} ${item.lecturer.firstName}</td>
                <td>${item.startDay} <br> ${item.endDay}</td>
                <td>${item.startTime} - ${item.endTime} <br> ${weekday(item.weekdays)}</td>
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
getAllSubjects();
const getRoom = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('http://localhost:3000/api/rooms');
    return data.json();
});
const getLecturer = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('http://localhost:3000/api/users/role/2');
    return data.json();
});
document.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.add-subject .overlay-close') || target.matches('.add-subject.modal.overlay.active')) {
        createSubjectModal.classList.toggle('active');
    }
});
function vn_to_en(string) {
    string = string.replace(/\s+/g, ' ');
    string = string.trim();
    string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    string = string.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    string = string.replace(/đ/g, "d");
    string = string.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    string = string.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    string = string.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    string = string.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    string = string.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    string = string.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    string = string.replace(/Đ/g, "D");
    return string;
}
function acronym(string) {
    var matches = string.match(/\b(\w)/g);
    return matches === null || matches === void 0 ? void 0 : matches.join('');
}
