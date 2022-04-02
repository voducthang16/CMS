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
const getData = (url) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`${url}`);
    return data.json();
});
const getUserInformation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:3000/api/users/${id}`);
    return data.json();
});
function role(role) {
    if (role === 0) {
        return 'Quản trị viên';
    }
    else if (role === 1) {
        return 'Sinh viên';
    }
    else {
        return 'Giảng viên';
    }
}
function getAllUsers(getData, url) {
    getData(url)
        .then((data) => {
        const renderData = document.querySelector('.render-data');
        let result = '';
        let count = 1;
        data.forEach((item) => {
            result += `
                <tr>
                    <td>${count++}</td>
                    <td class="bold">${item.lastName} ${item.firstName}</td>
                    <td>${item.email}</td>
                    <td class="bold">${role(item.role)}</td>
                    <td>
                        <i data-id="${item._id}" class="fal fa-info"></i>
                        <i data-id="${item._id}" class="role-button fal fa-pencil"></i>
                        <i data-id="${item._id}" class="delete-button fal fa-times"></i>
                    </td>
                </tr>
                `;
        });
        renderData.innerHTML = result;
    })
        .then(() => {
        showRoleUser(roleModal);
        showDeleteForm(deleteUserButton);
    });
}
const roleTab = document.querySelectorAll('.role-tab');
roleTab.forEach((item) => {
    item.addEventListener('click', (_e) => {
        const targetElement = _e.target;
        const role = targetElement.dataset.role;
        const roleActive = document.querySelector('.role-tab.active');
        roleActive.classList.remove('active');
        targetElement.classList.add('active');
        if (role === 'all') {
            getAllUsers(getData, 'http://localhost:3000/api/users/');
        }
        else {
            getAllUsers(getData, `http://localhost:3000/api/users/role/${role}`);
        }
    });
});
const roleModal = document.querySelector('.role.modal');
function showRoleUser(modal) {
    const roleButton = document.querySelectorAll('.role-button');
    roleButton.forEach((role) => {
        role.addEventListener('click', (_e) => {
            const id = _e.target.dataset.id;
            modal.classList.add('active');
            getUserInformation(id)
                .then((data) => {
                data.map((item) => {
                    if (item.role === 0) {
                        const admin = document.querySelector('#admin');
                        admin.checked = true;
                    }
                    else if (item.role === 1) {
                        const students = document.querySelector('#students');
                        students.checked = true;
                    }
                    else {
                        const lecturers = document.querySelector('#lecturers');
                        lecturers.checked = true;
                    }
                });
                const roleSave = document.querySelector('.role-save');
                roleSave.dataset.id = id;
            });
        });
    });
}
const updateRole = (id, role) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:3000/api/users/role/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            role: role
        })
    });
    data.json()
        .then(() => {
        alert('Update Successfully');
    })
        .then(() => {
        const modal = document.querySelector('.modal.overlay.active');
        const roleTab = document.querySelector('.role-tab.active');
        const defaultRoleTab = document.querySelector('h4[data-role="all"]');
        roleTab === null || roleTab === void 0 ? void 0 : roleTab.classList.remove('active');
        modal === null || modal === void 0 ? void 0 : modal.classList.remove('active');
        defaultRoleTab === null || defaultRoleTab === void 0 ? void 0 : defaultRoleTab.classList.add('active');
    })
        .then(() => getAllUsers(getData, 'http://localhost:3000/api/users/'));
});
const deleteUserButton = document.querySelector('.delete-user.modal');
const showDeleteForm = (modal) => {
    const deleteButton = document.querySelectorAll('.delete-button');
    deleteButton.forEach((item) => {
        item.addEventListener('click', (_e) => {
            const id = _e.target.dataset.id;
            modal.classList.add('active');
            const deleteUser = document.querySelector('#delete-user');
            deleteUser.dataset.id = id;
        });
    });
};
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch(`http://localhost:3000/api/users/delete/${id}`, {
        method: 'DELETE',
    });
    data.json()
        .then(() => {
        alert('Delete Successfully');
    })
        .then(() => {
        const modal = document.querySelector('.modal.overlay.active');
        const roleTab = document.querySelector('.role-tab.active');
        const defaultRoleTab = document.querySelector('h4[data-role="all"]');
        roleTab === null || roleTab === void 0 ? void 0 : roleTab.classList.remove('active');
        modal === null || modal === void 0 ? void 0 : modal.classList.remove('active');
        defaultRoleTab === null || defaultRoleTab === void 0 ? void 0 : defaultRoleTab.classList.add('active');
    })
        .then(() => getAllUsers(getData, 'http://localhost:3000/api/users/'));
});
document.addEventListener('click', e => {
    const target = e.target;
    if (target.matches('.role .overlay-close') || target.matches('.role.modal.overlay.active')) {
        roleModal.classList.toggle('active');
    }
    if (target.matches('.delete-user .overlay-close') || target.matches('.delete-user.modal.overlay.active') || target.matches('.delete-user .n')) {
        deleteUserButton.classList.toggle('active');
    }
    // Update Role
    if (target.classList.contains('role-save')) {
        // Get Role Selected
        const id = target.dataset.id;
        const selectedRole = document.querySelector('input[name="role"]:checked');
        updateRole(id, +selectedRole.value);
    }
    // Delete User
    if (target.classList.contains('d')) {
        const id = target.dataset.id;
        deleteUser(id);
    }
});
