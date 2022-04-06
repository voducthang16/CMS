const getAllSubs = async (id: string) => {
    const data = await fetch('http://localhost:3000/api/subjects/')
    data.json()
        .then(data => {
            const renderData = document.querySelector('.render-data') as HTMLElement;
            let result = '';
            let count = 1;
            data.map((item: any) => {
                if (!item.students.includes(id) && item.students.length <= 5) {
                    result += `
                    <tr>
                        <td>${count++}</td>
                        <td class="bold">${item.name} - ${item.code}</td>
                        <td>${item.lecturer.lastName} ${item.lecturer.firstName}</td>
                        <td>${item.startDay} <br> ${item.endDay}</td>
                        <td>${item.startTime} <br> ${item.endTime} <br>${weekdayR(item.weekdays)}</td>
                        <td>${item.students.length} / 5</td>
                        <td>
                            <button style="margin-bottom: 0 !important" data-subject-id="${item._id}" data-user-id="${id}" class="btn size-s registration-subject">Đăng ký</button>
                        </td>
                    </tr>
                    `
                }
            })
            renderData.innerHTML = result;
            registrationUserModal()
        })
}

const registrationUserModal = () => {
    const registrationSubject = document.querySelectorAll('.registration-subject') as NodeList;
    const userRegistrationModal = document.querySelector('.user-registration') as HTMLElement;
    const submit = document.querySelector('.user-save') as HTMLElement;
    registrationSubject.forEach(button => {
        button.addEventListener('click', e => {
            const target = e.target as HTMLElement;
            const subjectId = target.dataset.subjectId;
            const userId = target.dataset.userId;
            submit.dataset.subjectId = subjectId;
            submit.dataset.userId = userId;
            userRegistrationModal.classList.add('active');
        })
    })
    submit.addEventListener('click', e => {
        const target = e.target as HTMLElement;
        const subjectId = target.dataset.subjectId;
        const userId = target.dataset.userId;
        registrationUser(subjectId, userId)
            .then(() => {
                userRegistrationModal.classList.remove('active');
            })
            .then(() => {
                alert('Registration successfully');
            })
            .then(() => {
                window.location.reload();
            })
    })
    document.addEventListener('click', e => {
        const target = e.target as HTMLElement;
        if (target.matches('.user-registration .overlay-close') || target.matches('.user-registration.modal.overlay.active')) {
            userRegistrationModal.classList.toggle('active');
        }
    })
}

const registrationUser = async (subjectId?: string, userId?: string) => {
    const data = await fetch(`http://localhost:3000/api/subjects/${subjectId}/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subjectId: subjectId,
            userId: userId
        })
    })
    return data.json()
}

const weekdayR = (value: number) => {
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