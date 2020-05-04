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
                <v-card-text>
                  <loader></loader>
                  {{ readme }}
                  <br>
                  <vue-simple-markdown :source="readme"></vue-simple-markdown>
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
import GithubService from '@/services/GithubService.js'

export default {
  name: 'Readme',
  data() {
    return {
      username: this.$router.currentRoute.params.username,
      repo: this.$router.currentRoute.params.repo
    }
  },
  created() {
    GithubService.getReadme(this.username+'/'+this.repo)
      .then(res => this.decodeContent(res.data.content))
      .catch(err => { console.log(err) })
  },
  computed: {
    readme() {
      return this.$store.state.repoReadme
    }
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
        content = "README is empty"
      } else {
        content = atob(content)
      }

      this.$store.dispatch('detailRepo', content)
    },
  }
}
</script>
