Vue.component('cartwidget', {
    data() {
        return {}
    },

    template: `
    <div class="cart-widget" v-show="$parent.isCartVisible && !$parent.isCartEmpty">
        <div class="cart-list">
            <div class="cart-widget-item" v-for="good in $parent.cartGoods">
                <div class="cart-widget-item-info">
                    <h3>{{ good.product_name }}</h3>
                    <p>Цена: {{ good.price }}.00 ₽</p>
                    <p>Кол-во: {{ good.quantity }} шт.</p>
                </div>
                <button :class="'del-btn good' + good.id_product" @click="$parent.deleteFromCart(good)">Удалить</button>
            </div>
        </div>
    </div>
    `,

    methods: {}
})