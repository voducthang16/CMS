const getData = async (url: string) => {
    const data = await fetch(`${url}`);
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

function getAllUsers(getData: Function, url: string) {
    getData(url).then((data: any) => {
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
}

const roleTab = document.querySelectorAll('.role-tab') as NodeList;
roleTab.forEach((item: any) => {
    item.addEventListener('click', (_e: any) => {
        const targetElement = _e.target as HTMLElement;
        const role = targetElement.dataset.role;
        const roleActive = document.querySelector('.role-tab.active') as HTMLElement;

        roleActive.classList.remove('active');

        targetElement.classList.add('active');
        if(role === 'all') {
            getAllUsers(getData, 'http://localhost:3000/api/users/');
        } else {
            getAllUsers(getData, `http://localhost:3000/api/users/role/${role}`);
        }
    })
})