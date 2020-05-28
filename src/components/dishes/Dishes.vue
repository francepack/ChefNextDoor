<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red-600" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new Dish</h3>
    <form @submit.prevent="addDish">
      <div class="mb-6">
        <label for="dish_name" class="label">Name</label>
        <input
          type="text"
          id="dish_name"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Type a name"
          v-model="newDish.name" />
      </div>
      <div class="mb-6">
        <label for="vendor" class="label">Vendor</label>
        <select id="vendor" class="select" v-model="newDish.vendor">
          <option disabled value="">Select a vendor</option>
          <option :value="vendor.id" v-for="vendor in vendors" :key="vendor.id">{{ vendor.name }}></option>
        </select>
        <p class="pt-4">Don't see a vendor? <router-link to="/vendors" class="link-gray-500">Create One</router-link></p>
      </div>
      <input type="submit" value="Add Dish" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green-500 hover:bg-green-600 block w-full py-4 text-white items-center justify-center" />
    </form>
    <hr class="border border-gray-400 my-6" />
    <ul class="list-reset mt-4">
      <li class="py-4" v-for="dish in dishes" :key="dish.id" :dish="dish">
        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex font-mono font-semibold flex items-center">
            {{ dish.name }} &mdash;
          </p>
          <p class="block font-mono font-semibold">{{ getVendor(dish) }}</p>
        </div>
          <button class="bg-transparent text-sm hover:bg-blue-600 hover:text-white text-blue-500 border border-blue-400 no-underline font-bold py-2 px-4 mr-2 rounded" @click.prevent="editDish(dish)">
            Edit
          </button>
          <button class="bg-transparent text-sm hover:bg-blue-600 hover:text-white text-blue-500 border border-blue-400 no-underline font-bold py-2 px-4 mr-2 rounded" @click.prevent="removeDish(dish)">
            Delete
          </button>
          <div v-if="dish == editedDish">
            <form action="" @submit.prevent="updatedDish(dish)">
              <div class="mb-6 p-4 bg-white rounded border border-gray-400 mt-4">
                <div class="mb-6">
                  <label class="label">Name</label>
                  <input class="input" v-model="dish.name" />
                </div>
                <div class="mb-6">
                  <select id="vendor_update" class="select" v-model="dish.vendor">
                    <option disabled value="">Select a vendor</option>
                    <option :value="vendor.id" v-for="vendor in vendors" :key="vendor.id">{{ vendor.name }}></option>
                  </select>
                </div>
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
  name: 'Dishes',
  data () {
    return {
      vendors: [],
      dishes: [],
      newDish: [],
      error: '',
      editDish: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/dishes')
        .then(response => { this.dishes = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
      this.$http.secured.get('/api/v1/vendors')
        .then(response => { this.vendors = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getVendor (dish) {
      const dishVendor = this.vendors.filter(vendor => vendor.id === dish.vendor_id)
      let vendor
      dishVendor.forEach(ven => {
        vendor = ven.name 
      })
      return vendor
    },
    addDish () {
      const val = this.newRecord
      if (!value) {
        return
      } else {
        this.$http.post('api/v1/dishes/', { dish : { name: this.newDish.name }})
          .then(response => {
            this.dishes.push(response.data)
            this.newRecord = ''
          })
          .catch(error => this.setError(error, 'Cannot create dish'))
      }
    },
    removeDish (dish) {
      this.$http.secured.delete(`api/v1/dishes/${dish.id}`)
        .then(response => {
          this.dishes.splice(this.dishes.indexOf(dish), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete dish'))
    },
    editDish (dish) {
      this.editedDish = dish
    },
    updateDish (dish) {
      this.editDish = ''
      this.$http.secured.patch(`/api/v1/records/${record.id}`, { dish: { name: dish.name }})
      .catch(error => this.setError(error, 'Cannot update dish'))
    }
  }
}
</script>
