
class GoodsItem {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.img = image;
    }
    render() {
        return `<div class="goods-item">
        <img src="${this.img}"></img>
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        </div>`;
        // <button class="buy-btn good${this.id}">Купить</button>
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150, img: "img/photo-placeholder.jpg" },
            { title: 'Socks', price: 50, img: "img/photo-placeholder.jpg" },
            { title: 'Jacket', price: 350, img: "img/photo-placeholder.jpg" },
            { title: 'Shoes', price: 250, img: "img/photo-placeholder.jpg" },
        ];
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
            const goodItem = new GoodsItem(good.title, good.price, good.img);
            listHtml += goodItem.render();
        })
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
}

let list = new GoodsList();
list.fetchGoods();
list.render();

class CartItem {
    constructor(title, price, image) {
        this.title = title;
        this.price = price;
        this.img = image;
    }
    render() {
        return `<div class="goods-item">
        <img src="${this.img}"></img>
        <h3>${this.title}</h3>
        <p>${this.price}</p>
        </div>`
    }
}

class CartList {
    constructor() {
        this.goods = []
    };

    addToCart() {

    };

    removeFromCart() {

    };

    deleteFromCart() {

    };

    cpountCartPrice() {

    };
}

//В папке есть еще один неподключенный script.js, в котором я реализовал некий функционал и генерацию корзины
