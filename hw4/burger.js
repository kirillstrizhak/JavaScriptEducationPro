class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
    };

    getStuffing() {                     // Узнать начинку гамбургера
        if (this.stuffing) {
            console.log(this.stuffing)
        } else {
            console.log('Начинки нет')
        }
    };

    calculatePrice() {                  // Узнать цену 
        let fullPrice = 0;
        for (let i = 0; i < compos.compos.length; i++) {
            fullPrice += compos.compos[i].price
        }
        return fullPrice;
    };

    calculateCalories() {               // Узнать калорийность 
        let calories = 0;
        for (let i = 0; i < compos.compos.length; i++) {
            calories += compos.compos[i].calories
        }
        return calories;
    };
}

class HamburgerComposition {
    constructor() {
    }

    compos = [
        { size: 'Маленький гамбургер', price: 50, calories: 20 },
        { title: 'Салатная начинка', price: 20, calories: 5 },
        { title: 'Посыпать приправой', price: 15, calories: 0 },
        { title: 'Полить майонезом', price: 20, calories: 5 },
    ]

}

class MenuItem {
    constructor(title, price, calories) {
        this.price = price;
        this.calories = calories;
        this.title = title;
    }
}

class MenuList {
    constructor() {
    }
    menuList = [
        { title: 'Маленький гамбургер', size: 'Маленький гамбургер', price: 50, calories: 20 },
        { title: 'Большой гамбургер', size: 'Большой гамбургер', price: 100, calories: 40 },
        { title: 'Сырная начинка', price: 10, calories: 20 },
        { title: 'Салатная начинка', price: 20, calories: 5 },
        { title: 'Посыпать приправой', price: 15, calories: 0 },
        { title: 'Полить майонезом', price: 20, calories: 5 },
    ]
    render() {
        for (let i = 0; i < menu.menuList.length; i++) {
            let menuItem = new MenuItem(menu.menuList[i].title, menu.menuList[i].price, menu.menuList[i].calories)
            console.log(menuItem)
        }
    }
}

let compos = new HamburgerComposition
let menu = new MenuList
menu.render()
let hum = new Hamburger(compos.compos[0].size, compos.compos[1].title)
console.log(hum)
hum.getStuffing()
console.log(`Стоимость: ${hum.calculatePrice()} руб.`)
console.log(`Калоийность: ${hum.calculateCalories()} калорий`)