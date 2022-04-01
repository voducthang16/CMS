const getData = async () => {
    const data = await fetch('http://localhost:3000/api/users');
    return data.json();
}

function role(role: number) {
    if (role === 0) {
        return 'Quản trị viên';
    } else if (role === 1) {
        return 'Sinh viên';
    } else {
        return 'Giảng viên';
    }
}

getData().then(data => {
    const renderData = document.querySelector('.render-data') as HTMLElement;
    let result = '';
    let count = 1;
    data.forEach((item: any) => {
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
    })
    renderData.innerHTML = result;
})