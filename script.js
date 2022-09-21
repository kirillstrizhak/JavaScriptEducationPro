const goods = [
    { title: 'Shirt', price: 150, img: src = "img/photo-placeholder.jpg" },
    { title: 'Socks', price: 50, img: src = "img/photo-placeholder.jpg" },
    { title: 'Jacket', price: 350, img: src = "img/photo-placeholder.jpg" },
    { title: 'Shoes', price: 250, img: src = "img/photo-placeholder.jpg" },
];

const renderGoodsItem = (title = 'item', price = 'null', img = 0) => {
    return `<div class="goods-item">
    <img src="${img}"></img>
    <h3>${title}</h3>
    <p>${price}</p>
    </div>`;
};

const renderGoodsList = (list) => {
    let goodsList = list.map(item => renderGoodsItem(item.title, item.price, item.img));
    document.querySelector('.goods-list').innerHTML = goodsList;

    // let goodsList = document.querySelector('.goods-list')
    // for (let i = 0; i < goods.length; i++) {
    //     goodsList.insertAdjacentHTML('afterbegin', renderGoodsItem(list[i].title, list[i].price, list[i].img));

    // }
}

renderGoodsList(goods);

//ВОПРОС 1
// Не могу сказать, каким образом функции можно сделать ещё проще или короче :(

//ВОПРОС 2
// Запятые появляются из-за метода Array.map, тк он перебирает все элементы массива, прогоняя их через метод toString, который разделяет элементы массива запятыми

// В функции рендера каталога товаров в комментарии я привёл альтернативный пример, чтобы его генерация была без разделения запятыми


