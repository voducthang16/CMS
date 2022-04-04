const createSubjectButton = document.querySelector('.create-subject') as HTMLButtonElement;
const createSubjectModal = document.querySelector('.add-subject') as HTMLElement;
const renderRoom = document.querySelector('#room') as any;
const renderLecturer = document.querySelector('#lecturer') as any;
const addSubject = document.querySelector('.subject-save') as HTMLElement;
addSubject.addEventListener('click', async e => {
    e.preventDefault();
    const name = document.querySelector('#name') as HTMLInputElement;
    let code = acronym(vn_to_en(name.value.toLocaleLowerCase()));
    const room = document.querySelector('#room') as HTMLSelectElement;
    const lecturer = document.querySelector('#lecturer') as HTMLSelectElement;
    const startTime = document.querySelector('#start-time') as HTMLInputElement;
    const endTime = document.querySelector('#end-time') as HTMLInputElement;
    const startDay = document.querySelector('#start-day') as HTMLInputElement;
    const endDay = document.querySelector('#end-day') as HTMLInputElement;
    const weekday = (new Date(startDay.value)).getDay();
    const status =  document.querySelector('input[name="status"]:checked') as HTMLInputElement;
    const quantity = await fetch(`http://localhost:3000/api/subjects/name/${name.value.toLocaleLowerCase()}`);
    quantity.json()
    .then(async quantity => {
        code = `${code}_${++quantity.data}`
        const data = await fetch('http://localhost:3000/api/subjects', {
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
        })
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
                status.value = '';
                modal?.classList.remove('active');
            })
            .then(() => {
                getAllSubjects();
            })
    })
})

createSubjectButton.addEventListener('click', async e => {
    let room: string = '';
    room += `<option hidden>Chọn phòng học</option>`;
    await getRoom().then(data => {
        data.map((item: any) => {
            room += `
                <option value="${item._id}">${item.name}</option>
            `
        })
        renderRoom.innerHTML = room;
    })
    let lecturers: string = '';
    lecturers += `<option hidden>Chọn giảng viên</option>`
    await getLecturer().then(data => {
        data.map((item: any) => {
            lecturers += `
                <option value="${item._id}">${item.lastName} ${item.firstName}</option>
            `
        })
        renderLecturer.innerHTML = lecturers;
    })

    createSubjectModal.classList.add('active');
})

const weekday = (value: number) => {
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

const getAllSubjects = async () => {
    const data = await fetch('http://localhost:3000/api/subjects')
    data.json()
    .then(subject => {
        const renderData = document.querySelector('.render-data') as HTMLElement;
        let result = '';
        let count = 1;
        subject.forEach((item: any) => {
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
        })
        renderData.innerHTML = result;
    })
}
getAllSubjects()

const createSchedule = (start: string, end: string) => {
    let result = [];
    let startDay = new Date(start) as any;
    do {
        result.push({
            day: new Date(startDay)
        })
        startDay.setDate(startDay.getDate() + 7);
    } while(new Date(startDay) < new Date(end));
    return result;
}

console.log(createSchedule('2022-04-05', '2022-06-06'))

const getRoom = async () => {
    const data = await fetch('http://localhost:3000/api/rooms');
    return data.json()
}

const getLecturer = async () => {
    const data = await fetch('http://localhost:3000/api/users/role/2');
    return data.json()
}

document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.matches('.add-subject .overlay-close') || target.matches('.add-subject.modal.overlay.active')) {
        createSubjectModal.classList.toggle('active');
    }
})


function vn_to_en(string: string) {
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

function acronym(string: string) {
    var matches = string.match(/\b(\w)/g);
    return matches?.join('');
}