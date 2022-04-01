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
const getData = () => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield fetch('http://localhost:3000/api/users');
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
getData().then(data => {
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
                <i data-id="${item._id}" class="fal fa-pencil"></i>
                <i data-id="${item._id}" class="fal fa-times"></i>
            </td>
        </tr>
        `;
    });
    renderData.innerHTML = result;
});
