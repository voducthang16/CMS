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
const getSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:3000/api/details/lecturer/${id}`);
    data.json()
        .then(data => {
        const renderData = document.querySelector('.render-data');
        let result = '';
        let day = [];
        let currentDay = new Date();
        currentDay = currentDay.toISOString().split('T')[0];
        data.forEach((item) => {
            item.rollUps.forEach((roll) => {
                if (new Date(roll.day) >= new Date(currentDay)) {
                    day.push({
                        id: roll.id,
                        name: item.subject_id.name,
                        startTime: item.subject_id.startTime,
                        endTime: item.subject_id.endTime,
                        day: roll.day,
                        link: item.subject_id.room,
                        weekday: item.subject_id.weekdays,
                        code: item.subject_id.code
                    });
                }
            });
        });
        day.sort(function compare(a, b) {
            var dateA = new Date(a.day);
            var dateB = new Date(b.day);
            return dateA - dateB;
        });
        let count = 1;
        day.map(item => {
            result += `
                    <tr>
                        <td>${count++}</td>
                        <td>${item.day} <br> ${weekday2(item.weekday)}</td>
                        <td><span style="text-transform: capitalize" class="bold">${item.name}</span> <br> ${item.code}</td>
                        <td>${item.startTime} - ${item.endTime}</td>
                        <td class="a${item.link}"></td>
                        <td>${rollUp(item.day, item.startTime, item.endTime)}</td>
                    </tr>
                `;
        });
        renderData.innerHTML = result;
        renderLink();
        roll();
    });
});
const rollUp = (day, start, end) => {
    const currentDay = new Date();
    const today = currentDay.toISOString().split('T')[0];
    const currentHour = currentDay.getHours();
    const currentMinute = currentDay.getMinutes();
    const hourStart = +start.substring(0, 2);
    const hourEnd = +end.substring(0, 2);
    const minute = +start.substring(3, 5);
    const button = `<button style="margin-bottom: 0 !important" class="btn size-s roll">Điểm danh</button>`;
    if (today == day) {
        if (hourStart <= currentHour && currentHour <= hourEnd) {
            if ((hourStart === currentHour || hourEnd === currentHour) && currentMinute <= minute) {
                return button;
            }
            return button;
        }
    }
    return '';
};
const roll = () => __awaiter(void 0, void 0, void 0, function* () {
    document.addEventListener('click', e => {
        const target = e.target;
        const rollUp = document.querySelector('.roll-up');
        const render = document.querySelector('.form-render');
        if (target.classList.contains('roll')) {
            rollUp.classList.add('active');
        }
    });
});
const getLink = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:3000/api/rooms`);
    return data.json();
});
const renderLink = () => {
    getLink().then(data => {
        data.forEach((item) => {
            document.querySelectorAll(`.a${item._id}`).forEach((tag) => {
                tag.innerHTML = item.link;
            });
        });
    });
};
const getLecturers = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:3000/api/users/role/2`);
    return data.json();
});
const renderLecturers = () => {
    getLecturers().then(data => {
        data.forEach((item) => {
            document.querySelectorAll(`.a${item._id}`).forEach((tag) => {
                tag.innerHTML = `${item.lastName} ${item.firstName}`;
            });
        });
    });
};
const weekday2 = (value) => {
    if (value === 0) {
        return 'Chủ nhật';
    }
    else if (value === 1) {
        return 'Thứ hai';
    }
    else if (value === 2) {
        return 'Thứ ba';
    }
    else if (value === 3) {
        return 'Thứ tư';
    }
    else if (value === 4) {
        return 'Thứ năm';
    }
    else if (value === 5) {
        return 'Thứ sáu';
    }
    else {
        return 'Thứ bảy';
    }
};
const getStudentSchedule = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:3000/api/details/student/${id}`);
    data.json()
        .then(data => {
        const renderData = document.querySelector('.render-data');
        let result = '';
        let day = [];
        let currentDay = new Date();
        currentDay = currentDay.toISOString().split('T')[0];
        data.forEach((item) => {
            if (new Date(item.day) >= new Date(currentDay)) {
                item.rollUps.forEach((roll) => {
                    day.push({
                        id: roll.id,
                        name: item.subject_id.name,
                        startTime: item.subject_id.startTime,
                        endTime: item.subject_id.endTime,
                        day: roll.day,
                        link: item.subject_id.room,
                        weekday: item.subject_id.weekdays,
                        lecturer: item.subject_id.lecturer
                    });
                });
            }
        });
        day.sort(function compare(a, b) {
            var dateA = new Date(a.day);
            var dateB = new Date(b.day);
            return dateA - dateB;
        });
        let count = 1;
        day.map(item => {
            result += `
                    <tr>
                        <td>${count++}</td>
                        <td>${item.day} <br> ${weekday2(item.weekday)}</td>
                        <td style="text-transform: capitalize" class="bold">${item.name}</td>
                        <td>${item.startTime} - ${item.endTime}</td>
                        <td class="a${item.link}"></td>
                        <td style="text-align: center !important" class="a${item.lecturer}"></td>
                    </tr>
                `;
        });
        renderData.innerHTML = result;
        renderLink();
        renderLecturers();
    });
});
// const renderDate = () => {
//     const renderData = document.querySelector('.render-header') as HTMLElement;
//     const data = getDateRangeOfWeek(getCurrentWeek());
//     let result = '';
//     let monday = data.monday;
//     let day = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu']
//     let count = 0;
//     let date = new Date(monday)
//     do {
//         result += `
//             <th width="20%">${day[count]} - ${date.toLocaleDateString("vi-VI")}</th>
//         `
//         count++
//         date.setDate(date.getDate() + 1);
//     } while(new Date(date) <= new Date(data.friday))
//     renderData.innerHTML = result;
//     // let m = +data.monday.charAt(2)
//     // let f = +data.friday.charAt(2)
//     // let result = '';
//     // let count = 0
//     // for (let i = m; i <= f; i++) {
//     //     result += `
//     //         <th width="20%">${day[count]} <br> </th>
//     //     `
//     // }
// }
// const getCurrentWeek = () => {
//     var currentDate = new Date() as any;
//     var oneJan = new Date(currentDate.getFullYear(), 0, 1) as any;
//     var numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
//     var result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
//     return result;
// }
// // renderDate()
// function getDateRangeOfWeek(weekNo: any){
//     var day = new Date() as any;
//     var numOfDaysPastSinceLastMonday = eval(`${day.getDay() - 1}`) as any;
//     day.setDate(day.getDate() - numOfDaysPastSinceLastMonday);
//     var weekNoToday = getCurrentWeek()
//     var weeksInTheFuture = eval(`${weekNo - weekNoToday}`);
//     day.setDate(day.getDate() + eval(`${7 * weeksInTheFuture}`));
//     var monday = eval(day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear();
//     day.setDate(day.getDate() + 4);
//     var friday = eval(day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear() ;
//     return {
//         monday,
//         friday
//     }
// };
