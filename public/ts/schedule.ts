const getSchedule = async (id: string) => {
    const data = await fetch(`http://localhost:3000/api/details/lecturer/${id}`)
    data.json()
        .then(data => {
            const renderData = document.querySelector('.render-data') as HTMLElement;
            let result = '';
            let day: any[] = []
            let currentDay = new Date() as any;
            currentDay = currentDay.toISOString().split('T')[0];
            data.forEach((item: any) => {
                item.rollUps.forEach((roll: any) => {
                    if(new Date(roll.day) >= new Date(currentDay)) {
                        day.push({
                            id: roll.id,
                            name: item.subject_id.name,
                            startTime: item.subject_id.startTime,
                            endTime: item.subject_id.endTime,
                            day: roll.day,
                            link: item.subject_id.room,
                            weekday: item.subject_id.weekdays,
                            code: item.subject_id.code,
                            subjectId: item.subject_id._id,
                            rollUp: item.rollUps
                        })
                    }
                })
            })
            day.sort(function compare(a, b): any {
                var dateA = new Date(a.day) as any;
                var dateB = new Date(b.day) as any;
                return dateA - dateB;
            })
            let count = 1;
            day.map(item => {
                result += `
                    <tr>
                        <td>${count++}</td>
                        <td>${item.day} <br> ${weekday2(item.weekday)}</td>
                        <td><span style="text-transform: capitalize" class="bold">${item.name}</span> <br> ${item.code}</td>
                        <td>${item.startTime} - ${item.endTime}</td>
                        <td class="a${item.link}"></td>
                        <td>${rollUp(item.day, item.startTime, item.endTime, item.subjectId, item.rollUp)}</td>
                    </tr>
                `
            })
            renderData.innerHTML = result;
            renderLink();
            roll();
        })
}

const rollUp = (day: string, start: string, end: string, subjectId: string, rollup: any) => {
    const currentDay = new Date();
    const today = currentDay.toISOString().split('T')[0];
    const currentHour = currentDay.getHours();
    const currentMinute = currentDay.getMinutes();
    const hourStart = +start.substring(0, 2);
    const hourEnd = +end.substring(0, 2);
    const minute = +start.substring(3,5);
    const button = `<button data-id="${subjectId}" data-today="${today}" style="margin-bottom: 0 !important" class="btn size-s roll">Điểm danh</button>`;
    const array: any[] = [];
    rollup.forEach((roll: any) => {
        if (roll.day == today) {
            array.push(roll)
        }
    })
    if (array[0]) {
        if (Object.keys(array[0]).length == 3) {
            return '';
        } else {
            if (today == day) {
                if (hourStart <= currentHour && currentHour <= hourEnd) {
                    if ((hourStart === currentHour || hourEnd === currentHour) && currentMinute <= minute) {
                        return button;
                    }
                    return button;
                }
            }
        }
    }
    return '';
}

const roll = () => {
    document.addEventListener('click', async e => {
        const target = e.target as HTMLElement;
        const rollUp = document.querySelector('.roll-up') as HTMLElement;
        const render = document.querySelector('.form-render') as HTMLElement;
        if (target.classList.contains('roll')) {
            const id = target.dataset.id as any;
            const today = target.dataset.today as any;
            const data = await fetch(`http://localhost:3000/api/subjects/students/${id}`);
            let result = '';
            let count = 1;
            let order = 1;
            data.json().then(res => {
                res[0].students.map((student: any) => {
                    result += `
                    <div>
                        <span style="margin-right: 16px">${count++}</span>
                        <span>${student.lastName} ${student.firstName}</span>
                        <label class="switch">
                            <input data-order="${order++}" type="checkbox" name="${student._id}">
                            <span class="slider round"></span>
                        </label>
                    </div>
                    `
                })
                render.innerHTML = result;
            })
            rollUp.classList.add('active');
            rollSave(id, today)
        }
        if (target.matches('.roll-up .overlay-close') || target.matches('.roll-up.modal.overlay.active')) {
            rollUp.classList.toggle('active');
        }
    })
}

const rollSave = (id: string, today: string) => {
    document.addEventListener('click', async e => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('roll-save')) {
            const input = document.querySelectorAll('input[type="checkbox"]');
            let checked: any[] = [];
            let nonChecked: any[] = [];
            let data: any[] = []
            input.forEach((item: any) => {
                if (item.checked) {
                    checked.push(item)
                } else {
                    nonChecked.push(item)
                }
            })
            checked.forEach((item: any) => {
                data.push({
                    id: item.name,
                    present: true,
                    order: item.dataset.order
                })
            })
            nonChecked.forEach((item: any) => {
                data.push({
                    id: item.name,
                    present: false,
                    order: item.dataset.order
                })
            })
            data.sort(function compare(a, b): any {
                return a.order - b.order;
            })
            const result = await fetch(`http://localhost:3000/api/details/rollup/${id}/${today}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    data
                })
            })
            result.json()
            .then(() => {
                alert('Điểm danh thành công')
                window.location.reload();
            })
        }
    })
}

const getLink = async () => {
    const data = await fetch(`http://localhost:3000/api/rooms`)
    return data.json()
}

const renderLink = () => {
    getLink().then(data => {
        data.forEach((item: any) => {
            document.querySelectorAll(`.a${item._id}`).forEach((tag: any) => {
                tag.innerHTML = item.link
            })
        })
    })
}

const getLecturers = async () => {
    const data = await fetch(`http://localhost:3000/api/users/role/2`)
    return data.json()
}

const renderLecturers = () => {
    getLecturers().then(data => {
        data.forEach((item: any) => {
            document.querySelectorAll(`.a${item._id}`).forEach((tag: any) => {
                tag.innerHTML = `${item.lastName} ${item.firstName}`
            })
        })
    })
}

const weekday2 = (value: number) => {
    if (value === 0) {
        return 'Chủ nhật';
    } else if (value === 1) {
        return 'Thứ hai';
    } else if (value === 2) {
        return 'Thứ ba';
    } else if (value === 3) {
        return 'Thứ tư';
    } else if (value === 4) {
        return 'Thứ năm';
    } else if (value === 5) {
        return 'Thứ sáu';
    } else {
        return 'Thứ bảy';
    }
}

const getStudentSchedule = async (id: number) => {
    const data = await fetch(`http://localhost:3000/api/details/student/${id}`);
    data.json()
    .then(data => {
        const renderData = document.querySelector('.render-data') as HTMLElement;
            let result = '';
            let day: any[] = [];
            let currentDay = new Date() as any;
            currentDay = currentDay.toISOString().split('T')[0];
            data.forEach((item: any) => {
                if(new Date(item.day) >= new Date(currentDay)) {
                    item.rollUps.forEach((roll: any) => {
                        day.push({
                            id: roll.id,
                            name: item.subject_id.name,
                            startTime: item.subject_id.startTime,
                            endTime: item.subject_id.endTime,
                            day: roll.day,
                            link: item.subject_id.room,
                            weekday: item.subject_id.weekdays,
                            lecturer: item.subject_id.lecturer
                        })
                    })
                }
            })
            day.sort(function compare(a, b): any {
                var dateA = new Date(a.day) as any;
                var dateB = new Date(b.day) as any;
                return dateA - dateB;
            })
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
                `
            })
            renderData.innerHTML = result;
            renderLink()
            renderLecturers()
    })
}
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