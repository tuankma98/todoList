let data;

if (JSON.parse(localStorage.getItem('data') === null)) {
    data = [];
} else {
    data = JSON.parse(localStorage.getItem('data'));
}

//call
let userInput = document.querySelector('form input');
let addBtn = userInput.nextElementSibling;
let searchInput = document.querySelector('#find input');
let searchBtn = searchInput.nextElementSibling;
let checkBtn = document.querySelectorAll('ul li input');
let editBtn = document.querySelectorAll('ul li .edit');
let deleteBtn = document.querySelectorAll('ul li .delete');
let ulTag = document.querySelector('ul');


//render
function render() {
    let contents = data.map(item => {    // (data) get data form localstorage
        var className = "content";
        var checked = "";
        if (item.isCompleted === true) {
            className += " complete";
            checked = "checked";
        }
        return `<li>
            <input type="checkbox" ${checked}>      
            <p class="${className}">${(item.name)}</p>
            <i class="fa fa-edit edit"></i>
            <i class="fa fa-trash delete"></i>
        </li>`;
    }).join('');
    ulTag.innerHTML = contents;
}
render();


// create content
addBtn = userInput.nextElementSibling;
addBtn.addEventListener('click', (e) => {
    // 1. push content to data
    // 2. save data to local
    // 3. call back render
    e.preventDefault();
    data.push(
        {
            name: userInput.value,
            isCompleted: false
        }
    );
    localStorage.setItem('data', JSON.stringify(data)); // save data to localstorage
    render();
    userInput.value = '';
    deleteBtn = document.querySelectorAll('ul li .delete');
    checkBtn = document.querySelectorAll('ul li input');
    deleteItem();
    checkBtn = document.querySelectorAll('ul li input');
    location.reload();
})

//delete content
function deleteItem() {
    deleteBtn = document.querySelectorAll('ul li .delete');
    let arr = Array.from(deleteBtn);

    arr.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            data = JSON.parse(localStorage.getItem('data'));
            data.splice(index, 1);
            localStorage.setItem('data', JSON.stringify(data));
            render();
            deleteBtn = document.querySelectorAll('ul li .delete');
            location.reload();
        })
    })
};
deleteItem();

//checked
checkBtn = document.querySelectorAll('ul li input');  // arr like

Array.from(checkBtn) // convert to array
    .forEach((item, index) => {      
        item.addEventListener('click', (e) => {
            e.preventDefault();
            if (e.target.checked == true) {
                data = JSON.parse(localStorage.getItem('data'));
                data[index].isCompleted = true;
                localStorage.setItem('data', JSON.stringify(data));
                item.ckecked = true;
            }
            else {
                data = JSON.parse(localStorage.getItem('data'));
                data[index].isCompleted = false;
                localStorage.setItem('data', JSON.stringify(data));
                item.ckecked = false;
            }
            render();
            location.reload();
        });
});


//search notes
searchBtn = searchInput.nextElementSibling;
searchBtn.addEventListener('click', () => {
    //get data from localStorage => data
    // filter => map => render => data
    data = JSON.parse(localStorage.getItem('data'));
    let searchContent = data
        .filter(item => {
            return (item.name.indexOf(searchInput.value)) !== -1;
        })
        .map(item => {
            var className = "content";
            var checked = "";
            if (item.isCompleted === true) {
                className += " complete";
                checked = "checked";
            }
            return `<li>
                <input type="checkbox" ${checked}>      
                <p class="${className}">${(item.name)}</p>
                <i class="fa fa-edit edit"></i>
                <i class="fa fa-trash delete"></i>
            </li>`;
        }).join('');

        console.log(searchContent);


        searchInput.value ='';
        ulTag.innerHTML = searchContent; 

        deleteBtn = document.querySelectorAll('ul li .delete');
        checkBtn = document.querySelectorAll('ul li input');
        deleteItem();
        checkBtn = document.querySelectorAll('ul li input');
});