const createRoomButton = document.querySelector('.create-room') as HTMLElement;
const createRoomModal = document.querySelector('.add-room.modal') as HTMLElement;

createRoomButton.addEventListener('click', e => {
    createRoomModal.classList.add('active');
})

document.addEventListener('click', e => {
    const target = e.target as HTMLElement;
    if (target.matches('.add-room .overlay-close') || target.matches('.add-room.modal.overlay.active')) {
        createRoomModal.classList.toggle('active');
    }
})

const getAllRooms = async () => {
    const data = await fetch('http://localhost:3000/api/rooms');
    data.json()
        .then(data => {
            const renderData = document.querySelector('.render-data') as HTMLElement;
            let result = '';
            let count = 1;
            data.forEach((item: any) => {
                result += `
                <tr>
                    <td>${count++}</td>
                    <td class="bold">${item.name}</td>
                    <td>${item.link}</td>
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
getAllRooms()

const addRoom = document.querySelector('.room-save') as HTMLElement;
addRoom.addEventListener('click', async e => {
    e.preventDefault();
    const name = <HTMLInputElement>document.querySelector('#name');
    const link = <HTMLInputElement>document.querySelector('#link');
    const status =  <HTMLInputElement>document.querySelector('input[name="status"]:checked');
    const quantity = await 
    fetch(`http://localhost:3000/api/rooms/subject/${name.value.toLocaleLowerCase()}/${encodeURIComponent(link.value.toLocaleLowerCase())}`, {
        method: 'GET',
    })
    quantity.json()
        .then(async data => {
            if (data.rowName > 0) {
                alert('Room name already exists')
            } else if (data.rowLink > 0) {
                alert('Room link already exists')
            } else {
                const data = await fetch('http://localhost:3000/api/rooms', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name.value.toLocaleLowerCase(),
                        link: link.value,
                        status: status.value,
                    })
                })
                data.json()
                    .then(() => {
                        alert('Create Room Successfully');
                    })
                    .then(() => {
                        const modal = document.querySelector('.modal.overlay.active');
                        name.value = '';
                        link.value = '';
                        status.checked = false;
                        modal?.classList.remove('active');
                    })
                    .then(() => {
                        getAllRooms()
                    })
            }
        })
})