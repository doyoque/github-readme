<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <form @submit.prevent="getRepos">
      <input type="text" v-model="user.name" placeholder="github username" />

      <button type="submit">Looking for user repository</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  data() {
    return {
      user: {
        name: '',
        submitted: {
          name: ''
        }
      }
    }
  },
  methods: {

    getRepos() {
      this.user.submitted.name = this.user.name
      let username = { name: this.user.submitted.name }
      this.user.name = ''
      event.target.reset()

      this.$router.push({ name: 'ListRepos', params: {username: username.name} })
    }
  }
}
</script>
