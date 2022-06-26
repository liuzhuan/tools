<script setup>
defineProps(['label', 'price', 'quantity'])
defineEmits(['update:label', 'update:price', 'update:quantity', 'del'])
</script>

<template>
  <div>
    <input
      type="text"
      placeholder="名称"
      :value="label"
      @input="$emit('update:label', $event.target.value)"
    />
    <input
      type="number"
      min="0"
      max="9999"
      class="ml2"
      placeholder="单价"
      :value="price"
      @input="$emit('update:price', $event.target.value)"
    />
    <input
      type="number"
      min="0"
      max="999"
      class="ml2"
      placeholder="数量"
      :value="quantity"
      @input="$emit('update:quantity', $event.target.value)"
    />
    <button class="ml2" @click="$emit('del')">删除</button>
  </div>
</template>
