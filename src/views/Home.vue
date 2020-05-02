<template>
  <div id="home">
    <v-app>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 sm8 md4>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title>README Viewer</v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-toolbar>
                <v-card-text>
                  <v-form onSubmit="return false;">
                    <v-text-field
                      ref="username" 
                      label="username" 
                      placeholder="github username" 
                      prepend-icon="person" 
                      type="text"
                      required
                      :rules="[() => !!username || 'This field is required']"
                      v-model="username"
                      :error-messages="errorMessages"
                    ></v-text-field>
                  </v-form>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="getRepos">Search</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import GithubService from '@/services/GithubService.js'

export default {
  name: 'Home',
  data() {
    return {
      errorMessages: '',
      formHasError: false,
      username: null,
    }
  },
  created() {
    this.$store.dispatch('initState')
  },
  computed: {
    form() {
      return {
        username: this.username
      }
    }
  },
  methods: {

    getRepos() {
      this.formHasError = false

      Object.keys(this.form).forEach(f => {
        if(!this.form[f]) this.formHasError = true
        this.$refs[f].validate(true)
      })

      if(this.formHasError == false) {
        GithubService.getRepos(this.username)
          .then(res => { 
            this.$store.dispatch('getAllRepos', res.data) 
          })
          .catch(err => { console.log(err) })
        
        this.$router.push({ name: 'ListRepos', params: {username: this.username} })
      }
    }
  }
}
</script>
