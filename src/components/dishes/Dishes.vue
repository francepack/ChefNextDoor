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
              </div>
            </form>
          </div>
      </li>
    </ul>
  </div>
</template>