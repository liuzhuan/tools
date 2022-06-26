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
  return list.value.map(({ quantity }) => quantity).reduce((a, b) => a + b, 0)
})

function onDel(idx) {
  list.value.splice(idx, 1)
}

function onClearAll() {
  list.value = []
}

function onAdd() {
  const defaultLabel = '默认商品' + (list.value.length + 1)
  list.value.push({ label: defaultLabel, price: 0, quantity: 1 })
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

    <div class="action">
      <button @click="onAdd">添加</button>
      <button @click="onClearAll" class="ml1">清空所有</button>
    </div>
    <div class="list" v-if="list.length <= 0">没有数据</div>
    <ol class="list" v-else>
      <li v-for="(item, index) of list">
        <ShoppingItem
          v-model:label="item.label"
          v-model:price.number="item.price"
          v-model:quantity.number="item.quantity"
          @del="onDel(index)"
        />
      </li>
    </ol>

    <div class="sum">
      总额：{{ sumCurrency }} 元，共计 {{ totalNum }} 件商品
    </div>
  </main>
</template>

<style>
* {
  padding: 0;
  margin: 0;
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

.list {
  padding: 1em;
  padding-bottom: 5em;
}

.ml1 {
  margin-left: 1em;
}

.ml2 {
  margin-left: 0.5em;
}

li {
  margin-bottom: 0.5em;
}
</style>
