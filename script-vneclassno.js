class GoodsItem {
    constructor(title, price, image, id) {
        this.title = title;
        this.price = price;
        this.img = image;
        this.id = id;
    }
    render() {
        return `<div class="goods-item">
        <img src="${this.img}"></img>
        <h3>${this.title}</h3>
        <p>${this.price} ₽</p>
        <button class="buy-btn good${this.id}">Купить</button>
        </div>`;

    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, img: "img/shirt.jpg", id: 1, quantity: 1 },
            { title: 'Socks', price: 50, img: "img/socks.webp", id: 2, quantity: 1 },
            { title: 'Jacket', price: 350, img: "img/jacket.jpg", id: 3, quantity: 1 },
            { title: 'Shoes', price: 250, img: "img/shoes.webp", id: 4, quantity: 1 },
        ];
    }

    // countPrice() {
    //     let price = 0;
    //     for (let i = 0; i < this.goods.length; i++) {
    //         price += this.goods[i].quantity * this.goods[i].price;
    //     };
    //     console.log(`Суммарная стоимость всех товаров ${price}`)
    //     return price;
    // }

    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price, good.img, good.id);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
        for (let i = 0; i < this.goods.length; i++) {
            document.querySelector(`.good${i + 1}`).addEventListener('click', (e) => cart.addToCart(this.goods[i]))
        }
        //this.countPrice()
    }
}

let list = new GoodsList()
list.fetchGoods()
list.render()

class CartItem {
    constructor(title, price, image, id, quantity) {
        this.title = title;
        this.id = id;
        this.price = price;
        this.img = image;
        this.quantity = quantity;
    }
    render() {
        return `<div class="goods-item">
        <img src="${this.img}"></img>
        <h3>${this.title}</h3>
        <p>Price ${this.price} ₽</p>
        <div class="countBtns">
            <button class="del-btn${this.id}">Удалить</button>
            <button class="count-btn${this.id}">+</button>
            <p>${this.quantity}</p>
            <button class="count-btn${this.id}">-</button>
        </div>
        </div>`;
    };
}

class CartList {
    constructor() {
        this.goods = [];
    }

    render() {
        if (this.goods.length <= 0) {
            let listHtml = '';
            listHtml = 'Корзина пуста.'
            document.querySelector('.goods-list').innerHTML = listHtml;
        } else {
            let listHtml = '';
            this.goods.forEach(good => {
                const goodItem = new CartItem(good.title, good.price, good.img, good.id, good.quantity);
                listHtml += goodItem.render();
            });
            document.querySelector('.goods-list').innerHTML = listHtml + `<p class="cartPrice">Общая стоимость корзины: ${this.countCartPrice()} ₽</p>`;
        }
        document.querySelector('.goods-list').insertAdjacentHTML('beforeend', '<button class="back-btn btn absolute" style="left: 30px; top: 110px;">🠔 Назад</button>')
        document.querySelector('.back-btn').addEventListener('click', (e) => list.render())

    };

    addToCart(good) { //Метод добавления товара в корзину
        const existGood = this.goods.find(item => item.id == good.id);
        if (existGood) {
            good.quantity++
            console.log(this.goods);
        } else {
            good.quantity = 1;
            this.goods.push(good);
            console.log(this.goods);
        }
    }

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

let cart = new CartList();
document.querySelector('.cart-button').addEventListener('click', (e) => cart.render());
