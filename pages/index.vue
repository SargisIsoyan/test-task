<template>
  <section class="container">
    <main class="main">
      <div class="container">
        <div class="form-container">
          <h2>Login</h2>
          <div class="form">
            <input type="email" class="form__input" placeholder="Email" v-model="authData.email">
            <input type="password" class="form__input" placeholder="Password" v-model="authData.password">
            <button type="button" class="form__btn btn btn-login" @click="startLogin"> Login </button>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'index',
  computed: mapGetters({
    userData: 'getUserData',
  }),
  data () {
    return {
      authData: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    startLogin () {
      this.$store.dispatch('authLogin', this.authData).then(resp => {
        this.$router.push('home')
      }).catch(err => {
        console.error(err.statusText ? err.statusText : err)
      })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
