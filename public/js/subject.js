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
    const startDay = document.querySelector('#start-day');
    const endDay = document.querySelector('#end-day');
    const weekday = (new Date(startDay.value)).getDay();
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
                weekdays: weekday,
                status: status.value,
            })
        });
        data.json()
            .then(() => {
            alert('Create Subject Successfully');
        })
            .then(() => {
            const modal = document.querySelector('.modal.overlay.active');
            name.value = '';
            room.options.length = 0;
            lecturer.options.length = 0;
            startTime.value = '';
            endTime.value = '';
            startDay.value = '';
            endDay.value = '';
            status.checked = false;
            modal === null || modal === void 0 ? void 0 : modal.classList.remove('active');
        })
            .then(() => __awaiter(void 0, void 0, void 0, function* () {
            yield getNewestId()
                .then((data) => __awaiter(void 0, void 0, void 0, function* () {
                const schedule = createSchedule(data._id, data.startDay, data.endDay);
                const detail = yield fetch('http://localhost:3000/api/details', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        subject_id: data._id,
                        scores: [],
                        rollUps: schedule
                    })
                });
                detail.json()
                    .then(data => {
                    console.log(data);
                });
            }));
        }))
            .then(() => {
            getAllSubjects();
        });
    }));
}));
createSubjectButton.addEventListener('click', (e) => __awaiter(void 0, void 0, void 0, function* () {
    let room = '';
    room += `<option hidden>Ch???n ph??ng h???c</option>`;
    yield getRoom().then(data => {
        data.map((item) => {
            room += `
                <option value="${item._id}">${item.name}</option>
            `;
        });
        renderRoom.innerHTML = room;
    });
    let lecturers = '';
    lecturers += `<option hidden>Ch???n gi???ng vi??n</option>`;
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
        return 'Ch??? nh???t';
    }
    else if (value === 1) {
        return 'Th??? hai';
    }
    else if (value === 2) {
        return 'Th??? ba';
    }
    else if (value === 3) {
        return 'Th??? t??';
    }
    else if (value === 4) {
        return 'Th??? n??m';
    }
    else if (value === 5) {
        return 'Th??? s??u';
    }
    else {
        return 'Th??? b???y';
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
const createSchedule = (id, start, end) => {
    let result = [];
    let startDay = new Date(start);
    do {
        result.push({
            id: `${id}_${JSON.stringify(new Date(startDay)).slice(1, 11)}`,
            day: JSON.stringify(new Date(startDay)).slice(1, 11)
        });
        startDay.setDate(startDay.getDate() + 7);
    } while (new Date(startDay) <= new Date(end));
    return result;
};
const getNewestId = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('http://localhost:3000/api/subjects/one/latest');
    return data.json();
});
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
    string = string.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "a");
    string = string.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "e");
    string = string.replace(/??|??|???|???|??/g, "i");
    string = string.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "o");
    string = string.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "u");
    string = string.replace(/???|??|???|???|???/g, "y");
    string = string.replace(/??/g, "d");
    string = string.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "A");
    string = string.replace(/??|??|???|???|???|??|???|???|???|???|???/g, "E");
    string = string.replace(/??|??|???|???|??/g, "I");
    string = string.replace(/??|??|???|???|??|??|???|???|???|???|???|??|???|???|???|???|???/g, "O");
    string = string.replace(/??|??|???|???|??|??|???|???|???|???|???/g, "U");
    string = string.replace(/???|??|???|???|???/g, "Y");
    string = string.replace(/??/g, "D");
    return string;
}
function acronym(string) {
    var matches = string.match(/\b(\w)/g);
    return matches === null || matches === void 0 ? void 0 : matches.join('');
}
