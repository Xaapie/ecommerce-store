<template>
    <Layout>
        <TitlePage title="Login"/>
        <section class="login_part section_padding ">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-6 col-md-6">
                    <div class="login_part_text text-center">
                        <div class="login_part_text_iner">
                            <h2>New to our Shop?</h2>
                            <p>There are advances being made in science and technology
                                everyday, and a good example of this is the</p>
                            <router-link to="/register" class="btn_3">Create an Account</router-link>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6 col-md-6">
                    <div class="login_part_form">
                        <div class="login_part_form_iner">
                            <h3>Welcome Back ! <br>
                                Please Sign in now</h3>
                            <a-alert v-if="lengthPass && lengthPass < 8" style="margin-bottom: 10px;" message="Passwords must be at least 8 characters in length" type="error" />
                            <a-alert v-if="checkEmail" style="margin-bottom: 10px;" message="We just need to verify your email address before you can access, can you please check your inbox." type="error" />
                            <form @submit.prevent="handleSubmit" class="row contact_form">
                                <div class="col-md-12 form-group p_star">
                                    <input type="email" class="form-control" id="email" name="email"
                                        placeholder="Email" v-model="formState.email" required>
                                </div>
                                <div class="col-md-12 form-group p_star">
                                    <input type="password" class="form-control" id="password" name="password"
                                        placeholder="Password" v-model="formState.password" required>
                                </div>
                                <div class="col-md-12 form-group">
                                    <router-link to="/forgot-password" style="float:right;">Forgot password?</router-link> <br>
                                    <div class="creat_account d-flex align-items-center">
                                        <input type="checkbox" id="f-option" name="selector">
                                        <label for="f-option">Remember me</label>
                                    </div>
                                    <a-button v-if="loading" type="primary" loading size="large" style="marginTop:15px;">Loading</a-button>
                                    <a-button v-else type="primary" html-type="submit" size="large" style="marginTop:15px;">Log in</a-button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </section>
    </Layout>
</template>
<script>
import Layout from './layouts/Layout.vue';
import TitlePage from '../components/TitlePage';
import { notification } from 'ant-design-vue';
import { mapGetters } from 'vuex'
import {auth} from '../firebase/index'
export default {
    name:'Login',
    components: { Layout, TitlePage },
    data(){
        return{
            formState:{},
            loading: false,
            checkEmail:false,
            lengthPass: false,
            attemptCount:0,
        }
    },
    computed:{
        //we calculate the length of password
        lengthPass(){
            if(this.formState.password){
                return this.formState.password.length
            }
        },

        ...mapGetters({
            user: 'get_user'
        })
    },
    mounted(){
        this.attemptCount = 0
    },
    methods:{
        openNotification(type) {
            notification.config({
                duration: 3.5,
            });
            if(type=="success"){
                notification['success']({
                    message: 'Welcome',
                    description:'Happy to see you!',
                });
            }else{
                notification['error']({
                    message: 'Oops!',
                    description:'Please verify your email or password',
                });
            }
        },
        //to submit the form of login
        handleSubmit(){
            this.loading = true;
            if(this.formState.password.length >= 8){
                this.lengthPass = false
                this.$store.dispatch('login', this.formState).then(() => {
                    if(this.user){
                        if(this.user.emailVerified){
                            this.$store.dispatch('getUserInfo', this.formState.email).then(() => {
                                this.loading = false;
                                this.openNotification('success')
                                setTimeout(() => {
                                    window.scrollTo(0, 0);
                                    this.$router.push('/')
                                }, 1000);
                            }).catch(() => {
                                this.loading = false;
                                this.openNotification('error')
                            })
                        }else{
                            ++this.attemptCount
                            if(this.attemptCount === 5){
                                this.attemptCount = 0
                                this.$router.push('/forgot-password')
                            }
                            this.loading = false;
                            this.checkEmail = true;
                            this.$store.dispatch('sendEmail')
                        }
                    }else{
                        console.log('Hey')
                        console.log(this.attemptCount)
                        ++this.attemptCount
                        if(this.attemptCount === 5){
                            this.attemptCount = 0
                            this.$router.push('/forgot-password')
                        }
                        this.loading = false;
                        this.openNotification('error')
                    }
                })
            }
        }
    }
    
}
</script>
<style>
    
</style>