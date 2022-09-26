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
        <h3>${this.product_name}</h3>
        <p>${this.price}</p>
        <button class="buy-btn good${this.id_product}">Купить</button>
        </div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        // this.goods = [
        //     { product_name: 'Shirt', price: 150, img: "img/photo-placeholder.jpg" },
        //     { product_name: 'Socks', price: 50, img: "img/photo-placeholder.jpg" },
        //     { product_name: 'Jacket', price: 350, img: "img/photo-placeholder.jpg" },
        //     { product_name: 'Shoes', price: 250, img: "img/photo-placeholder.jpg" },
        // ];
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (goods) {
                        this.goods = JSON.parse(goods);
                        resolve(this.render());
                    } else {
                        reject('error')
                    }
                }, 100)
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
            document.querySelector(`.good${this.goods[i].id_product}`).addEventListener('click', (e) => cart.addToCart(this.goods[i]))
        }
    }
}

let list = new GoodsList();
list.fetchGoods();

class CartItem {
    constructor(product_name, price, quantity) {
        this.product_name = product_name;
        this.price = price;
        this.quantity = quantity;
    }
    render() {
        return `<div class="goods-item">
        <h3>${this.product_name}</h3>
        <p>Цена: ${this.price} ₽</p>
        <p>Кол-во: ${this.quantity} шт.</p>
        </div>`
    }
}

class CartList {
    constructor() {
        this.goods = []
    };

    render() {
        if (this.goods.length <= 0) {
            let listHtml = '';
            listHtml = 'Корзина пуста.'
            document.querySelector('.goods-list').innerHTML = listHtml;
        } else {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new CartItem(good.product_name, good.price, good.quantity);
                listHtml += goodItem.render();
            });
            document.querySelector('.goods-list').innerHTML = listHtml + `<p class="cartPrice">Общая стоимость корзины: ${this.countCartPrice()} ₽</p>`;
        }
        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', '<button class="back-btn btn absolute" style="left: 30px; top: 110px;">🠔 Назад</button>')
        document.querySelector('.back-btn').addEventListener('click', (e) => list.render())

    };

    addToCart(good) {
        const existGood = this.goods.find(item => item.id_product == good.id_product);
        if (existGood) {
            good.quantity++
        } else {
            good.quantity = 1;
            this.goods.push(good);
        }
        product.render()
    }

    removeFromCart() {

    };

    deleteFromCart(good) {
        this.goods.pop(good)
    }

    countCartPrice() {
        let cartPrice = 0;
        for (let i = 0; i < this.goods.length; i++) {
            cartPrice += this.goods[i].quantity * this.goods[i].price;
        };
        return cartPrice;
    }
}

let product = new CartItem()
let cart = new CartList();
document.querySelector('.cart-button').addEventListener('click', (e) => cart.render());
