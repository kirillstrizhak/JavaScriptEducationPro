document.querySelector('.clear-search').addEventListener('click', () => {
    let filteredGoods = document.querySelectorAll('.goods-item');
    input.value = ''
    filteredGoods.forEach(good => {
        good.classList.remove('disabled');
    })
})

let input = document.querySelector('.search-good');
input.addEventListener('input', () => {
    let value = input.value.trim();
    input.value.toUpperCase();
    let filteredGoods = document.querySelectorAll('.goods-item');
    if (value != '') {
        filteredGoods.forEach(good => {
            if (good.innerText.search(value) == -1) {
                good.classList.add('disabled');
            } else {
                good.classList.remove('disabled');
            }
        })
    } else {
        filteredGoods.forEach(good => {
            good.classList.remove('disabled');
        })
    }
})

