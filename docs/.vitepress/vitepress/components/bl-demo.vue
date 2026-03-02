<script setup lang="ts">
import { computed, defineComponent, ref } from 'vue'
// import { CollapseTransition } from 'arsenal-design'
import SourceCode from './source-code.vue'

const props = defineProps<{
  demos: {
    type: object
  }
  source: string
  path: string
  desc?: string
}>()
defineComponent({
  name: 'BlDemo',
})
const showCode = ref(false)

const targetDemo = computed(() => {
  const keys = Object.keys(props.demos)

  const targetPath = keys.filter(key => key.includes(props.path))?.[0] as keyof typeof props.demos

  if (targetPath)
    return props.demos[targetPath]
  else
    return ''
})

const decodedDescription = computed(() => decodeURIComponent(props.desc!))

function expandCode() {
  showCode.value = !showCode.value
}
</script>

<template>
  <div class="demo-box">
    <div class="demo-box-top">
      <p v-if="decodedDescription" v-html="decodedDescription" />

      <div class="demo-container" style="">
        <component :is="targetDemo" v-if="targetDemo" />
      </div>
    </div>

    <div class="demo-code-actions">
      <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
      <svg width="12px" height="12px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" @click="expandCode">

        <title />

        <g id="Complete">

          <g id="expand">

            <g>

              <polyline id="Right-2" data-name="Right" fill="none" points="3 17.3 3 21 6.7 21" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />

              <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="10" x2="3.8" y1="14" y2="20.2" />

              <line fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" x1="14" x2="20.2" y1="10" y2="3.8" />

              <polyline id="Right-3" data-name="Right" fill="none" points="21 6.7 21 3 17.3 3" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />

            </g>

          </g>

        </g>

      </svg>
    </div>

    <CollapseTransition>
      <SourceCode v-if="showCode" :source="source" />
    </CollapseTransition>
  </div>
</template>

<style lang="scss" scoped>
.demo-box {
  border: 1px solid var(--bl-c-divider);
  border-radius: 6px;
  margin-top: 12px;
  &-top {
    padding: 24px;
  }
  .demo-code-actions {
    width: 100%;
    height: 28px;
    display: flex;
    padding: 0 20px;
    box-sizing: border-box;
    justify-content: end;
    align-items: center;
    border-radius: 1px;
    border-top: 1px dotted var(--bl-c-divider);
    .code-expand-icon-show {
      width: 18px;
      height: 18px;
      opacity: 0.3;
      cursor: pointer;
    }
    .demo-code-action {
      cursor: pointer;
      transition: var(--vxp-transition-color);
      &:hover,
      &:focus {
        color: var(--bl-color-primary-opacity-2);
      }
    }
  }
}
</style>
