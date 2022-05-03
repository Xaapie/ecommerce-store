export default{
    ADD_ITEM(state, data){
        let itemSearch = state.cart.filter((item) => {
            return item.id == data.id && item.flavour == data.flavour
        })
        if(itemSearch.length != 0){
            itemSearch[0].qte = itemSearch[0].qte + data.qte
        }else{
            state.cart.push(data)
        }
    },
    REMOVE_ITEM(state, data){
        let cart = []
        state.cart.forEach(element => {
            if(element.id == data.id){
                if(element.flavour != data.flavour){
                    cart.push(element)
                }
            }else{
                cart.push(element)
            }
        })
        state.cart = cart
    },
    INCREMENT_QTE(state, data){
        let itemSearch = state.cart.filter((item) => {
            return item.id == data.id && item.flavour == data.flavour
        })
        ++itemSearch[0].qte
    },
    DECREMENT_QTE(state, data){
        let itemSearch = state.cart.filter((item) => {
            return item.id == data.id && item.flavour == data.flavour
        })
        --itemSearch[0].qte
        if(itemSearch.qte < 0){
            itemSearch[0].qte = 0
        }
    },
    CLEAR_CART(state){
        state.cart = []
    },

    CHANGE_PRICE(state, data){
        let itemSearch = state.cart.filter((item) => {
            return item.id == data.id && item.flavour == data.flavour
        })
        itemSearch[0].price = data.price
        itemSearch[0].price_id = data.price_id
    }

}