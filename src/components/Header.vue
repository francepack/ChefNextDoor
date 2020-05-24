<template>
  <header class="bg-grey-lighter py-4">
    <div class="flex item-center">
        <a href="/" class="text-sm font-mono pl-4 font-semibold no-underline text-indigo-700 hover:text-indigo-800">
          ChefNextDoor
        </a>
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
