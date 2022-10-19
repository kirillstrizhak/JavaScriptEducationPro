Vue.component('goodslist', {
    data() {
        return {}
    },

    template: `
    <div class="goods-list" v-show="!$parent.isFilteredList">
        <div class="goods-item" v-for="good in $parent.catalogGoods">
            <div class="goods-item-info">
            <img class="good-img" :src="'img/products/' + good.img">
                <h3 class="good-header">{{good.product_name}}</h3>
                <p>{{good.price}} ₽</p>
            </div>
            <button :class="'buy-btn good' + good.id_product" @click="$parent.addToCart(good)">Купить</button>
            </div>
    </div>
    `,

    methods: {},
})