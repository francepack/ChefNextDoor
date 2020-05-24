<template>
  <header class="bg-grey-lighter py-4">
    <div class="container m-auto flex flex-wrap items-center justify-between">
      <div class="flex item-center">
          <a href="/" class="text-sm font-mono pl-4 font-semibold no-underline text-indigo-700 hover:text-indigo-800">
            ChefNextDoor
          </a>
      </div>
      <div>
        <router-link to="/" class="text-gray-700 hover:text-gray-800 no-underline" v-if="!signedIn()">Sign in</router-link>
        <router-link to="/signup" class="text-gray-700 hover:text-gray-800 no-underline" v-if="!signedIn()">Sign up</router-link>
        <router-link to="/vendors" class="text-gray-700 hover:text-gray-800 no-underline" v-if="signedIn()"></router-link>
        <router-link to="dishes" class="text-gray-700 hover:text-gray-800 no-underline" v-if="signedIn()"></router-link>
        <a href="#" @click.prevent="signOut" v-if="signedIn()">Sign Out</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedInthis.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
