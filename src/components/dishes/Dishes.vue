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
    </form>
  </div>
</template>