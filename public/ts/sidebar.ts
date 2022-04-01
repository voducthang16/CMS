const title = document.querySelectorAll('.title') as NodeList;
const dropdown = document.querySelectorAll('.dropdown') as NodeList;

function removeActiveItem() {
    const titleActive = document.querySelector('.title.active') as HTMLElement;
    const dropdownActive = document.querySelector('.dropdown.active') as HTMLElement;
    titleActive.classList.remove('active');
    dropdownActive.style.maxHeight = '0';
    dropdownActive.classList.remove('active');
}

title.forEach((item: any, index) => {
    const pane = dropdown[index] as any;

    item.onclick = (_e: any) => {
        const height = pane.scrollHeight;

        if (!!document.querySelector('.title.active')) {
            if (document.querySelector('.title.active') === _e.target) {
                removeActiveItem();
                return;
            }
            removeActiveItem();
        }

        item.classList.add('active');
        pane.style.maxHeight = `${height}px`;
        pane.classList.add('active');
    }
})