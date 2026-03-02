<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vitepress'
import type { Link } from '../../../type'
import { isActive } from '../../../utils/index'

const props = defineProps<{
  item: Link
}>()

defineComponent({
  name: 'BlSidebarLink',
})
const route = useRoute()
const realLink = computed(() => `/arsenal-design/${props.item.link}`)
</script>

<template>
  <a
    class="link" :class="{
      active: isActive(route.path, realLink),
    }"
    :href="realLink"
  >
    <p class="link-text">{{ item.text }}</p>
  </a>
</template>

<style lang="scss" scoped>
.link:not(.flex) {
  display: block;
}

.link {
  padding: 8px 0px;
  line-height: 1.5;
  font-size: 0.9rem;
  border-radius: 8px;
  cursor: pointer;

  .link-text {
    margin: 0;
  }
}

.link:hover .link-text {
  text-decoration: underline;
  transition: color 0.25s;
}

.active {
  font-weight: 500;
  color: var(--text-active);
}

.link-text {
  line-height: 20px;
  font-size: 14px;
}
</style>
