<script setup>
defineProps(['label', 'price', 'quantity'])
defineEmits(['update:label', 'update:price', 'update:quantity', 'del'])
</script>

<template>
  <div class="flex">
    <input
      type="text"
      class="flex-1 flex-shrink-1 label"
      placeholder="名称"
      :value="label"
      @input="$emit('update:label', $event.target.value)"
    />
    <input
      type="number"
      min="0"
      max="9999"
      class="ml2 price"
      placeholder="单价"
      :value="price"
      @input="$emit('update:price', $event.target.value)"
    />
    <input
      type="number"
      min="0"
      max="999"
      class="ml2 quantity"
      placeholder="数量"
      :value="quantity"
      @input="$emit('update:quantity', $event.target.value)"
    />
    <button class="ml2 delete" @click="$emit('del')">X</button>
  </div>
</template>

<style>
.label {
  width: 4em;
}

.price {
  width: 5em;
}

.quantity {
  width: 3em;
}

.delete {
  background: #e2141e;
  color: white;
}
</style>
