<template>
  <div>
    <div class="text-red-400" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Make a vendor profile!</h3>
    <form @submit.prevent="addVendor">
      <div class="mb-6">
        <input type="text"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Type your Vendor Name"
          v-model="newVendor.name">
      </div>

      <input type="submit" vlaue="Add Vendor" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-600 hover:bg-green-700 block w-full py-4 text-white item-center justify-center" />
    </form>

    <hr class="border border-grey-200 my-6">

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="vendor in vendors" :key="vendor.id" :vendor="vendor">
        <div class="flex items-center justify-between flex-wrap">
          <p class ="block flex-1 font-mono font-semibold flex items-center">
            {{ vendor.name }}
          </p>
          <button class="bg-transparent text-sm hover:bg-blue-600 hover:text-white text-blue-500 border border-blue-400 no-underline font-bold py-2 px-4 mr-2 rounded" @click.prevent="editVendor(vendor)">
            Edit
          </button>
          <button class="bg-transparent text-sm hover:bg-blue-600 hover:text-white text-blue-500 border border-blue-400 no-underline font-bold py-2 px-4 mr-2 rounded" @click.prevent="removeVendor(vendor)">
            Delete
          </button>
        </div>

        <div v-if="artist == editedArtist">
          <form @submit.prevent="updatedVendor(vendor)">
            <div class="mb-6 px-4 bg-white rounded border border-gray-400 mt-4">
              <input class="input" v-model="vendor.name" />
              <input type="submit" value="Update" class="my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue-400 border border-blue-400 no-underline font-bold py-2 px-4 rounded cursor-pointer" />
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Artists',
  data () {
    return {
      vendors: [],
      newVendor: [],
      error: '',
      editArtist: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/vendors')
        .then(response => { this.vendors = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addVendor () {
      const val = this.newVendor
      if (!val) {
        return
      }
      this.$http.secured.post('api/v1/vendors', {vendor: {name: this.newVendor.name}})
        .then(response => {
          this.vendors.push(response.data)
          this.newVendor = ''
        })
        .catch(error => this.setError(error, 'Cannot create artist'))
    },
    removeVendor (vendor) {
      this.$http.secured.delete(`api/v1/vendors/${vendor.id}`)
        .then(response => {
          this.vendors.splice(this.vendors.indexOf(vendor), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete vendor'))
    },
    editVendor (vendor) {
      this.editedVendor = vendor
    },
    updateVendor (vendor) {
      this.editedVendor = ''
      this.$http.secured.patch(`api/v1/vendors/${vendor.id}`, {vendor: {name: vendor.name}})
        .catch(error => this.setError(error, 'Cannot update vendor'))
    }
  }
}
</script>
