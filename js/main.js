const app = new Vue({
    el: '#app',
    data: {
        API_URL: 'http://localhost:2300',
        cartGoods: [],
        catalogGoods: [],
        filteredGoods: [],
        isCartVisible: false,
        isCartEmpty: true,
        isFilteredList: false,
    },

    methods: {


        searchGood() {
            let searchForm = document.querySelector('.search-good');
            this.filteredGoods = []
            this.catalogGoods.forEach(good => {
                if (searchForm.value == good.product_name) {
                    this.filteredGoods.push(good)
                    this.isFilteredList = true
                }
            })

        },

        clearSearchFilter() {
            let searchForm = document.querySelector('.search-good');
            searchForm.value = '';
            this.filteredGoods = []
            this.isFilteredList = false;
        },

        countCartPrice() {
            let cartPrice = 0;
            this.cartGoods.forEach(good => {
                cartPrice += good.quantity * good.price;
            });
            return cartPrice;
        },

        addToCart(good) {
            const existGood = this.cartGoods.find(item => item.id_product == good.id_product);
            if (existGood) {
                good.quantity++;
            } else {
                good.quantity = 1;
                this.cartGoods.push(good);
            }
            this.isCartEmpty = false;
        },

        deleteFromCart(good) {
            this.cartGoods.splice(this.cartGoods.indexOf(good), 1)
            if (this.cartGoods.length <= 0) {
                this.isCartEmpty = true
            }
        },

        makeGETRequest(url, callback) {
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
        },
    },

    beforeMount() {
        this.makeGETRequest(`${this.API_URL}/catalog`, (goods) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (goods) {
                        this.catalogGoods = JSON.parse(goods);
                        resolve();
                    } else {
                        reject(console.log('FETCH ERROR, запустите сервер в терминале командой npm start'));
                    }
                }, 100);
            })
        })
    }
});