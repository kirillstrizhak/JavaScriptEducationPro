const Headings = ['Новое в корзине!',];

function checkName() {
    let name = document.querySelector('#firstname');
    let regex = /^[A-Za-zА-Яа-яё]{3,10}$/;
    let message = document.querySelector('.msg-name');
    message.classList.add('enabled')
    if (regex.test(name.value)) {
        message.style.cssText = `
        position: absolute;
        left: 216px;
        bottom: 185px;
        font-size: 20px;
        color: rgb(11, 166, 27);`;
        name.style.border = '2px solid rgb(11, 166, 27)'
        message.innerHTML = "✔";
        return true;
    } else {
        message.style.cssText = `
        background: rgb(255, 127, 127);
        border: 1px solid red;
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
        message.style.cssText = `
        position: absolute;
        left: 216px;
        bottom: 135px;
        font-size: 20px;
        color: rgb(11, 166, 27);`;
        phone.style.border = '2px solid rgb(11, 166, 27)'
        message.innerHTML = "✔";
        return true;
    } else {
        message.style.cssText = `
        background: rgb(255, 127, 127);
        border: 2px solid red;
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
        message.style.cssText = `
        position: absolute;
        left: 216px;
        bottom: 85px;
        font-size: 20px;
        color: rgb(11, 166, 27);`;
        phone.style.border = '2px solid rgb(11, 166, 27)'
        message.innerHTML = "✔";
        return true;
    } else {
        message.style.cssText = `
        background: rgb(255, 127, 127);
        border: 2px solid red;
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

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

function makeGETRequest(url, callback) {
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

class GoodsItem {
    constructor(product_name, price, id_product) {
        this.product_name = product_name;
        this.price = price;
        this.id_product = id_product;
    }
    render() {
        return `<div class="goods-item">
        <div class="goods-item-info">
            <h3>${this.product_name}</h3>
            <p>${this.price} ₽</p>
        </div>
        <button class="buy-btn good${this.id_product}">Купить</button>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (goods) {
                        this.goods = JSON.parse(goods);
                        resolve(this.render());
                    } else {
                        reject('error');
                    }
                }, 100);
            })
        })
    }

    countPrice() {
        let price = 0;
        for (let i = 0; i < this.goods.length; i++) {
            price += this.goods[i].quantity * this.goods[i].price;
        };
        console.log(`Суммарная стоимость всех товаров ${price}`)
        return price;
    }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.product_name, good.price, good.id_product);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
        for (let i = 0; i < this.goods.length; i++) {
            document.querySelector(`.good${this.goods[i].id_product}`).addEventListener('click', (e) => cart.addToCart(this.goods[i]));
        }
    }
}

let list = new GoodsList();
list.fetchGoods();

class CartItem {
    constructor(product_name, price, quantity, id_product) {
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
        this.id_product = id_product;
    }
    render() {
        return `<div class="goods-item">
        <div class="goods-item-info">
            <h3>${this.product_name}</h3>
            <p>Цена: ${this.price} ₽</p>
        </div>
        <button class="del-btn good${this.id_product}">Удалить</button>
        </div>`;
    }
}

class CartList {
    constructor() {
        this.goods = [];
    };

    render() {
        if (this.goods.length <= 0) {
            let listHtml = '';
            listHtml = 'Корзина пуста.'
            document.querySelector('.goods-list').innerHTML = listHtml;
        } else {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new CartItem(good.product_name, good.price, good.quantity, good.id_product);
                listHtml += goodItem.render();
            });
            document.querySelector('.goods-list').innerHTML = listHtml + `<p class="cartPrice">Общая стоимость корзины: ${this.countCartPrice()} ₽</p>` + '<div class="cartList"></div>';
            this.generateCartList()
        }
        for (let i = 0; i < this.goods.length; i++) {
            document.querySelector(`.good${this.goods[i].id_product}`).addEventListener('click', (e) => this.deleteFromCart(this.goods[i]));
        }

        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', '<button class="back-btn btn absolute" style="left: 30px; top: 110px;">🠔 Назад</button>');
        document.querySelector('.back-btn').addEventListener('click', (e) => list.render());

    };

    generateCartList() {
        for (let i = 0; i < this.goods.length; i++) {
            document.querySelector('.cartList').insertAdjacentHTML('afterbegin', `<p>${this.goods[i].product_name} ${this.goods[i].quantity} шт.</p>`)
        }
    }

    addToCart(good) {
        const existGood = this.goods.find(item => item.id_product == good.id_product);
        if (existGood) {
            good.quantity++
        } else {
            good.quantity = 1;
            this.goods.push(good);
        }
        product.render()
        notification.render(good);
    }

    removeFromCart() {

    };

    deleteFromCart(good) {
        this.goods.pop(good);
        cart.render()
    }

    countCartPrice() {
        let cartPrice = 0;
        for (let i = 0; i < this.goods.length; i++) {
            cartPrice += this.goods[i].quantity * this.goods[i].price;
        };
        return cartPrice;
    }
}

let product = new CartItem();
let cart = new CartList();
document.querySelector('.cart-button').addEventListener('click', (e) => cart.render());

class Notification {
    constructor(heading) {
        this.heading = heading;
    }

    render(good) {
        const notifyBlock = document.querySelector('.notifications');
        notifyBlock.insertAdjacentHTML('afterbegin', `<div class="notification">
        <div class="addGoodNotification">
        <h3>${this.heading}</h3>
        <p>Товар ${good.product_name} добавлен в корзину</p>
        </div>
        </div>`);
        setTimeout(() => document.querySelector('.notification').remove(), 4000);
    }
}

const notification = new Notification(Headings[0]);



