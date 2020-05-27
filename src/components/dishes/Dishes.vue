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
  </div>
</template>