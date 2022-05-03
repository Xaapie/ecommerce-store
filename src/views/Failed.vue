<template>
    <Layout>
        <div class="payment__card">
            <img src="frontend/img/gifs/failed.gif" alt=""/>
            <h2>Payment Failed</h2>
            <p><b>Don't worry your money is safe!</b> if money was debited from your account, it will be refunded automotically in 5-7 working days.</p>
            <p>You will be redirected to Homepage in few moments...</p>
        </div>
    </Layout>
</template>
<script>
import Layout from '@/views/layouts/Layout'
import TitlePage from '@/components/TitlePage'
import { mapGetters } from 'vuex'
import { query, collection, getDocs, orderBy, limit, doc, updateDoc } from "firebase/firestore"
import {db, auth} from '../firebase/index'
export default {
    name:'failed',
    components:{
        Layout,
        TitlePage,
    },
    computed:{
        ...mapGetters({
            status: 'get_status',
        }),
    },
    methods:{
        //we update the status of payment to Payment Failed when the payment is failed
        async getSpecifiedDoc(user_uid){
            const q = query(collection(db, `users/${user_uid}/orders`), orderBy('order_date', 'desc'), limit(1))
            const querySnap = await getDocs(q);

            querySnap.forEach( async(docs) => {
                let id_order= 'OrderNum_' + docs.data().numberOrder
                await updateDoc(doc(db, `users/${user_uid}/orders/${id_order}`), {
                    status: 'Payment Failed'
                }).then(() => {
                    localStorage.removeItem('user_uid')
                    setTimeout(() => {
                        this.$router.push('/')
                    },1500)
                })
            })
        }
    },
    mounted(){
        if(localStorage.getItem('status')){
            setTimeout(() => {
                localStorage.removeItem('status')
            }, 1500);
        }

        //we clear the cart after the payment is done
        this.$store.dispatch('clearCart').then(() => {
            let user_uid = localStorage.getItem('user_uid')
            if(user_uid){
                this.getSpecifiedDoc(user_uid)
            }
        })
    }
}
</script>
<style>
.payment__card{
    text-align: center;
    width: 500px;
    margin: auto;
}

.payment__card img{
    width: 400px;
}

.payment__card p{
    font-family: Consolas;
    font-weight: 500;
    font-size: 18px;
}
</style>