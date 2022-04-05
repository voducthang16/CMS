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
    const data = yield fetch(`http://localhost:3000/api/subjects/${id}`);
    data.json()
        .then(data => {
        const renderData = document.querySelector('.render-data');
        let result = '';
        let tr = ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>'];
        let f = [];
        let s = [];
        let t = [];
        let f4 = [];
        data.map((item) => {
            console.log(new Date(item.startDay) > new Date());
            if (item.startTime === '07:30') {
                f.push({
                    weekday: item.weekdays,
                    name: item.name,
                    startTime: item.startTime,
                    endTime: item.endTime
                });
            }
            else if (item.startTime === '09:45') {
                s.push({
                    weekday: item.weekdays,
                    name: item.name,
                    startTime: item.startTime,
                    endTime: item.endTime
                });
            }
            else if (item.startTime === '13:00') {
                t.push({
                    weekday: item.weekdays,
                    name: item.name,
                    startTime: item.startTime,
                    endTime: item.endTime
                });
            }
            else {
                f4.push({
                    weekday: item.weekdays,
                    name: item.name,
                    startTime: item.startTime,
                    endTime: item.endTime
                });
            }
        });
        f.map(item => {
            tr[item.weekday] = `
                    <td>
                        <span style="text-transform: capitalize" class="bold">${item.name}</span> <br>
                        ${item.startTime} - ${item.endTime}
                    </td>
                `;
        });
        result += tr.join('');
        tr = ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>'];
        s.map(item => {
            tr[item.weekday] = `
                    <td>
                        <span style="text-transform: capitalize" class="bold">${item.name}</span> <br>
                        ${item.startTime} - ${item.endTime} 
                    </td>
                `;
        });
        result += tr.join('');
        tr = ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>'];
        t.map(item => {
            tr[item.weekday] = `
                    <td>
                        <span style="text-transform: capitalize" class="bold">${item.name}</span> <br>
                        ${item.startTime} - ${item.endTime} 
                    </td>
                `;
        });
        result += tr.join('');
        tr = ['<tr>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '<td></td>', '</tr>'];
        f4.map(item => {
            tr[item.weekday] = `
                    <td>
                        <span style="text-transform: capitalize" class="bold">${item.name}</span> <br>
                        ${item.startTime} - ${item.endTime} 
                    </td>
                `;
        });
        result += tr.join('');
        renderData.innerHTML = result;
    });
});
const renderDate = () => {
    const renderData = document.querySelector('.render-header');
    const data = getDateRangeOfWeek(getCurrentWeek());
    let result = '';
    let monday = data.monday;
    let day = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu'];
    let count = 0;
    let date = new Date(monday);
    do {
        result += `
            <th width="20%">${day[count]} - ${date.toLocaleDateString("vi-VI")}</th>
        `;
        count++;
        date.setDate(date.getDate() + 1);
    } while (new Date(date) <= new Date(data.friday));
    renderData.innerHTML = result;
    // let m = +data.monday.charAt(2)
    // let f = +data.friday.charAt(2)
    // let result = '';
    // let count = 0
    // for (let i = m; i <= f; i++) {
    //     result += `
    //         <th width="20%">${day[count]} <br> </th>
    //     `
    // }
};
const getCurrentWeek = () => {
    var currentDate = new Date();
    var oneJan = new Date(currentDate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentDate - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil((currentDate.getDay() + 1 + numberOfDays) / 7);
    return result;
};
renderDate();
function getDateRangeOfWeek(weekNo) {
    var day = new Date();
    var numOfDaysPastSinceLastMonday = eval(`${day.getDay() - 1}`);
    day.setDate(day.getDate() - numOfDaysPastSinceLastMonday);
    var weekNoToday = getCurrentWeek();
    var weeksInTheFuture = eval(`${weekNo - weekNoToday}`);
    day.setDate(day.getDate() + eval(`${7 * weeksInTheFuture}`));
    var monday = eval(day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear();
    day.setDate(day.getDate() + 4);
    var friday = eval(day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear();
    return {
        monday,
        friday
    };
}
;
