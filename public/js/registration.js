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
const getAllSubs = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('http://localhost:3000/api/subjects/');
    data.json()
        .then(data => {
        const renderData = document.querySelector('.render-data');
        let result = '';
        let count = 1;
        data.map((item) => {
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
                    `;
            }
        });
        renderData.innerHTML = result;
        registrationUserModal();
    });
});
const registrationUserModal = () => {
    const registrationSubject = document.querySelectorAll('.registration-subject');
    const userRegistrationModal = document.querySelector('.user-registration');
    const submit = document.querySelector('.user-save');
    registrationSubject.forEach(button => {
        button.addEventListener('click', e => {
            const target = e.target;
            const subjectId = target.dataset.subjectId;
            const userId = target.dataset.userId;
            submit.dataset.subjectId = subjectId;
            submit.dataset.userId = userId;
            userRegistrationModal.classList.add('active');
        });
    });
    submit.addEventListener('click', e => {
        const target = e.target;
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
            getAllSubs(userId);
        });
    });
    document.addEventListener('click', e => {
        const target = e.target;
        if (target.matches('.user-registration .overlay-close') || target.matches('.user-registration.modal.overlay.active')) {
            userRegistrationModal.classList.toggle('active');
        }
    });
};
const registrationUser = (subjectId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:3000/api/subjects/${subjectId}/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            subjectId: subjectId,
            userId: userId
        })
    });
    return data.json();
});
const weekdayR = (value) => {
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
