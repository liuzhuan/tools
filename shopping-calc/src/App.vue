<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import ShoppingItem from './components/ShoppingItem.vue'
import { currency } from './utils/index.js'

const cachedKey = 'shopping-calc.app'

const list = ref([])

onMounted(() => {
  list.value = load()
})

const sum = computed(() => {
  return list.value
    .map(({ price, quantity }) => price * quantity)
    .reduce((a, b) => a + b, 0)
})

const sumCurrency = computed(() => {
  return currency(sum.value)
})

const totalNum = computed(() => {
  return list.value
    .map(({ quantity }) => quantity)
    .reduce((a, b) => a + (b || 0), 0)
})

function onDel(idx) {
  list.value.splice(idx, 1)
}

function onClearAll() {
  list.value = []
}

function onAdd() {
  list.value.push({ label: '', price: 0, quantity: 1 })
}

function store(val) {
  localStorage.setItem(cachedKey, JSON.stringify(val))
}

function load() {
  try {
    const raw = localStorage.getItem(cachedKey)
    const parsed = JSON.parse(raw)
    return parsed || []
  } catch (e) {
    return []
  }
}

watch(
  list,
  (newVal) => {
    store(newVal)
  },
  {
    deep: true,
  }
)
</script>

<template>
  <main class="calc">
    <h1>购物计算器</h1>

    <div class="action mb1 mt1">
      <button @click="onClearAll">清空所有</button>
    </div>
    <div class="list" v-if="list.length <= 0">没有数据</div>
    <div class="list" v-else>
      <div v-for="(item, index) of list" class="flex items-center mb2">
        <div class="w-2">{{ index + 1 }}.</div>
        <ShoppingItem
          class="flex-1 ml2"
          v-model:label="item.label"
          v-model:price.number="item.price"
          v-model:quantity.number="item.quantity"
          @del="onDel(index)"
        />
      </div>
    </div>

    <div class="pb-5 flex mt1">
      <button class="flex-1 btn-primary" @click="onAdd">添加</button>
    </div>

    <div class="sum">
      总额：{{ sumCurrency }} 元，共计 {{ totalNum }} 件商品
    </div>
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

button {
  appearance: none;
  border-radius: 0.5em;
  padding: 0.6em 0.8em;
  border: none;
}

input {
  padding: 0.4em;
}

button,
input {
  font-size: 14px;
}

.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.flex-shrink-1 {
  flex-shrink: 1;
}
.items-center {
  align-items: center;
}

.calc {
  padding: 1em;
}

.sum {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  padding: 1em;
  background: steelblue;
  color: #fff;
}

.w-1 {
  width: 1em;
}

.w-2 {
  width: 1.2em;
}

.pb-5 {
  padding-bottom: 5em;
}

.ml1 {
  margin-left: 1em;
}

.ml2 {
  margin-left: 0.5em;
}

.mb1 {
  margin-bottom: 1em;
}

.mb2 {
  margin-bottom: 0.5em;
}

.mt1 {
  margin-top: 1em;
}

.btn-primary {
  background: green;
  color: white;
}
</style>
