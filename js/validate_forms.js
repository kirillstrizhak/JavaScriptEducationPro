function checkName() {
    let name = document.querySelector('#firstname');
    let regex = /^[A-Za-zА-Яа-яё]{3,10}$/;
    let message = document.querySelector('.msg-name');
    message.classList.add('enabled')
    if (regex.test(name.value)) {
        message.classList.remove('enabled')
        name.style.border = '2px solid rgb(11, 166, 27)'
        return true;
    } else {
        message.style.cssText = `
        color:red;`
        name.style.border = '2px solid red'
        message.innerHTML = `Введите имя, состоящее только из <strong>букв</strong>, не менее 3-х символов`
        return false
    }
}

function checkPhone() {
    let phone = document.querySelector('#phone');
    let regex = /^\+?[78][-\(]?\d{3}\)?-?\d{3}-?\d{2}-?\d{2}$/;
    let message = document.querySelector('.msg-phone');
    message.classList.add('enabled')
    if (regex.test(phone.value)) {
        message.classList.remove('enabled')
        phone.style.border = '2px solid rgb(11, 166, 27)'
        return true;
    } else {
        message.style.cssText = `
        color:red;`
        phone.style.border = '2px solid red'
        message.innerHTML = `
        \nВведите номер телефона вида +7(000)000-0000`
        return false
    }
}

function checkEmail() {
    let phone = document.querySelector('#email');
    let regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    let message = document.querySelector('.msg-email');
    message.classList.add('enabled')
    if (regex.test(phone.value)) {
        message.classList.remove('enabled')
        phone.style.border = '2px solid rgb(11, 166, 27)'
        return true;
    } else {
        message.style.cssText = `
        color:red;`
        phone.style.border = '2px solid red'
        message.innerHTML = `
        \nВведите корректный E-mail`
        return false
    }
}

document.querySelector('#feedback-sbmt').addEventListener('click', (e) => checkName());
document.querySelector('#feedback-sbmt').addEventListener('click', (e) => checkPhone());
document.querySelector('#feedback-sbmt').addEventListener('click', (e) => checkEmail());