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
    getData(url)
        .then((data: any) => {
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
                        <i data-id="${item._id}" class="role-button fal fa-pencil"></i>
                        <i data-id="${item._id}" class="fal fa-times"></i>
                    </td>
                </tr>
                `;
            })
            renderData.innerHTML = result;
        })
        .then(() => {
            showRoleUser(roleModal)
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

const roleModal = document.querySelector('.modal') as HTMLElement;
function showRoleUser(modal: HTMLElement) {
    const roleButton = document.querySelectorAll('.role-button') as NodeList;
    roleButton.forEach((role: any) => {
        role.addEventListener('click', (_e: any) => {
            const id = _e.target.dataset.id;
            modal.classList.add('active');
            getUserInformation(id)
                .then((data: any) => {
                    data.map((item: any) => {
                        if (item.role === 0) {
                            const admin = document.querySelector('#admin') as any;
                            admin.checked = true;
                        } else if (item.role === 1) {
                            const students = document.querySelector('#students') as any;
                            students.checked = true;
                        } else {
                            const lecturers = document.querySelector('#lecturers') as any;
                            lecturers.checked = true;
                        }
                    })
                    const roleSave = document.querySelector('.role-save') as any;
                    roleSave.dataset.id = id;
                })
        })
    })
}

const updateRole = async (id: number, role: number) => {
    const data = await fetch(`http://localhost:3000/api/users/${id}`, {
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
            roleTab?.classList.remove('active');
            modal?.classList.remove('active');
            defaultRoleTab?.classList.add('active');
        })
        .then(() => getAllUsers(getData, 'http://localhost:3000/api/users/'))
}

document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('overlay-close') || target.matches('.modal.overlay.active')) {
        roleModal.classList.toggle('active');
    }
    // Update Role
    if (target.classList.contains('role-save')) {
        // Get Role Selected
        const id = target.dataset.id as any;
        const selectedRole = document.querySelector('input[name="role"]:checked') as HTMLInputElement;
        updateRole(id, +selectedRole.value);
    }
})

const getUserInformation = async (id: number) => {
    const data = await fetch(`http://localhost:3000/api/users/${id}`);
    return data.json();
}