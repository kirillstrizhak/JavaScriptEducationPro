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
        this.goods.forEach(good => {
            price += good.quantity * good.price;
        });
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
        this.goods.forEach(good => {
            document.querySelector(`.good${good.id_product}`).addEventListener('click', (e) => cart.addToCart(good));
        })
    }
}

let list = new GoodsList();
list.fetchGoods();

class CartButton {
    constructor() { }

    render() {
        parent = document.querySelector('.cart-button');
        parent.innerHTML =
            `<div class="cart-button-info">
        <svg class="cart-icon" width="33" height="29" viewBox="0 0 33 29" xmlns="http://www.w3.org/2000/svg">
<path d="M27.199 29C26.5512 28.9738 25.9396 28.6948 25.4952 28.2227C25.0509 27.7506 24.8094 27.1232 24.8225 26.475C24.8356 25.8269 25.1023 25.2097 25.5653 24.7559C26.0283 24.3022 26.6508 24.048 27.2991 24.048C27.9474 24.048 28.5697 24.3022 29.0327 24.7559C29.4957 25.2097 29.7624 25.8269 29.7755 26.475C29.7886 27.1232 29.5471 27.7506 29.1028 28.2227C28.6585 28.6948 28.0468 28.9738 27.399 29H27.199ZM7.75098 26.32C7.75098 25.79 7.90815 25.2718 8.20264 24.8311C8.49712 24.3904 8.91569 24.0469 9.4054 23.844C9.8951 23.6412 10.434 23.5881 10.9539 23.6915C11.4737 23.7949 11.9512 24.0502 12.326 24.425C12.7009 24.7998 12.9562 25.2773 13.0596 25.7972C13.163 26.317 13.1098 26.8559 12.907 27.3456C12.7041 27.8353 12.3606 28.2539 11.9199 28.5483C11.4792 28.8428 10.9611 29 10.431 29C10.0789 29.0003 9.73017 28.9311 9.40479 28.7966C9.0794 28.662 8.78374 28.4646 8.53467 28.2158C8.28559 27.9669 8.08805 27.6713 7.95325 27.3461C7.81844 27.0208 7.74902 26.6721 7.74902 26.32H7.75098ZM11.551 20.686C11.2916 20.6868 11.039 20.6024 10.8322 20.4457C10.6253 20.2891 10.4756 20.0689 10.406 19.819L5.573 2.36401H2.18005C1.86657 2.36401 1.56591 2.23947 1.34424 2.01781C1.12257 1.79614 0.998047 1.49549 0.998047 1.18201C0.998047 0.868519 1.12257 0.567873 1.34424 0.346205C1.56591 0.124537 1.86657 5.81268e-06 2.18005 5.81268e-06H6.46106C6.72055 -0.00080736 6.97309 0.0837201 7.17981 0.240568C7.38653 0.397416 7.53589 0.617884 7.60498 0.868006L12.438 18.323H25.616L29.999 8.27501H15.399C15.2409 8.27961 15.0834 8.25242 14.9359 8.19507C14.7884 8.13771 14.6539 8.05134 14.5404 7.94108C14.4269 7.83082 14.3366 7.69891 14.275 7.55315C14.2134 7.40739 14.1816 7.25075 14.1816 7.0925C14.1816 6.93426 14.2134 6.77762 14.275 6.63186C14.3366 6.4861 14.4269 6.35419 14.5404 6.24393C14.6539 6.13367 14.7884 6.0473 14.9359 5.98994C15.0834 5.93259 15.2409 5.90541 15.399 5.91001H31.812C32.0077 5.90996 32.2003 5.95866 32.3724 6.05172C32.5446 6.14478 32.6908 6.27926 32.798 6.44301C32.9058 6.60729 32.9714 6.79569 32.9889 6.99145C33.0063 7.18721 32.9752 7.38424 32.8981 7.565L27.493 19.977C27.4007 20.1876 27.249 20.3668 27.0565 20.4927C26.864 20.6186 26.6391 20.6858 26.4091 20.686H11.551Z"/>
</svg>
</div>
`
        if (cart.goods.length > 0) {
            document.querySelector('.cart-button-info').insertAdjacentHTML('beforeend', `
            <div>
                <p>Товаров: ${cart.goods.length} </p>
                <p>${this.countCartPrice()} ₽</p>
            </div>
     `)
        } else {
            document.querySelector('.cart-button-info').insertAdjacentHTML('beforeend', '<p>Корзина пуста</p>')
        }
    }

    countCartPrice() {
        let cartPrice = 0;
        cart.goods.forEach(good => {
            cartPrice += good.quantity * good.price;
        });
        return cartPrice;
    }
}

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
        this.goods.forEach(good => {
            document.querySelector(`.good${good.id_product}`).addEventListener('click', (e) => this.deleteFromCart(good));
        })

        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', '<button class="back-btn btn absolute" style="left: 30px; top: 110px;">🠔 Назад</button>');
        document.querySelector('.back-btn').addEventListener('click', (e) => list.render());

    };

    generateCartList() {
        this.goods.forEach(good => {
            document.querySelector('.cartList').insertAdjacentHTML('afterbegin', `<p>${good.product_name} ${good.quantity} шт.</p>`)
        })
    }

    addToCart(good) {
        const existGood = this.goods.find(item => item.id_product == good.id_product);
        if (existGood) {
            good.quantity++
        } else {
            good.quantity = 1;
            this.goods.push(good);
        }
        product.render();
        notification.render(good);
        cartButton.render();
    }

    removeFromCart() {

    };

    deleteFromCart(good) {
        this.goods.pop(good);
        cart.render()
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

let cartButton = new CartButton
cartButton.render()

