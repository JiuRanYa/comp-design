<script setup lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

defineComponent({
  name: 'App',
})
</script>

<template>
  <div class="dev">
    <div class="dev-nav">
      <router-link
        v-for="route in router.options.routes"
        :key="route.path"
        class="router-link dev-nav-item"
        :to="route.path"
      >
        {{ route.name }}
      </router-link>
    </div>
    <main class="dev-main">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.dev {
  height: 100vh;
  padding: 10px 50px 30px;
  background: #f8f9fa;

  &-nav {
    display: flex;
    align-items: center;
    height: 50px;

    .router-link {
      color: var(--bl-color-primary-base);
      text-decoration: none;
    }

    &-item {
      padding: 10px;
    }

    .router-link-active {
      color: var(--bl-color-warning-base);
    }
  }

  &-main {
    height: calc(100% - 50px);
    padding: 20px;
    overflow: auto;
    background: white;
    border: 1px solid var(--bl-border-color-light-1);
  }
}
</style>
