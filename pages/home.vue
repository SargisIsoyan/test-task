<template>
  <section class="container">
    <header class="header">
      <nav class="header__nav">
        <h1 class="header__headline">Q</h1>
        <ul class="header__list">
          <li class="header__item"><a @click="$router.push('home')">Projects</a></li>
          <li class="header__item"><a @click="logout">Logout</a></li>
        </ul>
      </nav>
    </header>
    <main class="main">
      <div class="container">
        <div class="block-container" v-if="projects.length">
          <div class="block" v-for="(project, key) in projects" :key="key">
            <div class="block__item">
              <img :src="project.logo_url" alt="Logo" v-if="project.logo_url">
              <img src="@/assets/img/media-icon.png" alt="Logo" v-else>
              <h4>{{project.name}}</h4>
            </div>
            <div class="block__item block__item__parts" :class="{'active': project.is_active}">
              <h4>{{project.is_active ? 'Active' : 'Inactive'}}</h4>
            </div>
            <div class="block__item">
              <div class="block__item-time block__week">
                <span>time this week</span>
                <span>00:00:07</span>
              </div>
              <div class="block__item-time block__month">
                <span>this month</span>
                <span>00:00:07</span>
              </div>
              <div class="block__item-time block__total">
                <span>total</span>
                <span>00:00:07</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'home',
  computed: mapGetters({
    projects: 'getProjects'
  }),
  mounted() {
    if (!localStorage.getItem('userInfo')) {
      this.$router.push({name: 'index'})
    }
    this.$store.dispatch('getProjects')
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(resp => {
        this.$router.push({name: 'index'})
      })
    }
  }
}
</script>

<style src="@/assets/css/style.css"></style>
