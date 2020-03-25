<template>
  <div id="readMe">
    <v-app>
      <v-content>
        <v-container fluid fill-height>
          <v-layout align-center justify-center>
            <v-flex xs12 md7>
              <v-card class="elevation-12">
                <v-toolbar color="primary" dark flat>
                  <v-toolbar-title class="pl2">README.md</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-tooltip right>
                    <template v-slot:activator="{ on }">
                      <v-btn
                        icon
                        large
                        target="_blank"
                        v-on="on"
                        @click="backToRepos(username)"
                      >
                        <v-icon>library_books</v-icon>
                      </v-btn>
                    </template>
                    <span>Back to repos</span>
                  </v-tooltip>
                </v-toolbar>
                <v-card-text v-if="readmeObj.isLoaded == true">
                  <vue-markdown>{{readmeObj.content}}</vue-markdown>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
import GITHUB_API from './../api/api'

export default {
  name: 'Readme',
  data() {
    return {
      username: this.$router.currentRoute.params.username,
      reponame: this.$router.currentRoute.params.readme,
      readmeObj: {
        content: '',
        isLoaded: false
      }
    }
  },
  created() {
    let full_name = this.username+'/'+this.$router.currentRoute.params.readme
    axios
      .get(`${GITHUB_API.userReadme}${full_name}/readme`)
      .then(res => { this.decodeContent(res.data.content) })
      .catch(err => { this.readmeNotFound(err.response.data.message, err.response.status) })
  },
  methods: {
    backToRepos(username) {
      this.$router.push({
        name: 'ListRepos',
        params: {
          username: username
        }
      })
    },
    decodeContent(content) {
      if(content == '') {
        this.readmeObj.content = "README is empty"
        this.readmeObj.isLoaded = true
      } else {
        this.readmeObj.content = atob(content)
        this.readmeObj.isLoaded = true
      }
    },
    readmeNotFound(message, status) {
      if(status == 404) {
        this.readmeObj.content = `README ${message}`
        this.readmeObj.isLoaded = true
      }
    }
  },
}
</script>