<script setup lang="ts">
import { useRouter } from 'vitepress'
import { defineComponent } from 'vue'

defineComponent({
  name: 'HomePage',
})
const router = useRouter()

function handleStartClick() {
  router.go(`/arsenal-design/guide/design`)
}
</script>

<template>
  <div class="homepage">
    <div class="homepage-main">
      <div class="homepage-main-one">
        <div class="homepage-main-title">
          Arsenal Design
        </div>
        <div class="homepage-main-desc">
          高度可定制化，全量
          <span class="homepage-en"> Typescript </span>
          支持，面向开发者的工具集
        </div>
        <div class="homepage-main-btn" @click="handleStartClick">
          开始使用
        </div>
      </div>
      <!---->
      <!-- <div class="homepage-main-three"> -->
      <!--   <div class="homepage-main-three-title"></div> -->
      <!--   <div class="homepage-main-three-mask"> -->
      <!--     <div class="homepage-main-three-wrapper"> -->
      <!--       <div v-for="tag in tags" class="homepage-main-three-tag"> -->
      <!--         {{ tag }} -->
      <!--       </div> -->
      <!--     </div> -->
      <!---->
      <!--     <div class="homepage-main-three-wrapper" data-reverse="true"> -->
      <!--       <div v-for="tag in tags.reverse()" class="homepage-main-three-tag"> -->
      <!--         {{ tag }} -->
      <!--       </div> -->
      <!--     </div> -->
      <!--   </div> -->
      <!-- </div> -->
    </div>
  </div>
</template>

<style lang="scss" scoped>
.homepage {
  &-en {
    margin: 0 4px;
  }

  &-main {
    display: flex;
    flex-direction: column;
    align-items: center;
    &-bg {
      pointer-events: none;
      position: absolute;
      z-index: -10;
    }
    &-one {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      padding-top: 200px;
    }
    &-two {
      padding-top: 200px;
    }
    &-logo {
      img {
        width: 310px;
      }
    }
    &-title {
      margin: 1rem 0;
      font-size: 5rem;
      font-weight: 800;
      color: var(--text-reverse);
    }
    &-desc {
      font-size: 1.4rem;
      font-weight: 400;
    }
    &-btn {
      display: flex;
      margin-top: 50px;
      gap: 40px;
      align-items: center;
      justify-content: center;
      background-color: black;
      color: white;
      border: 1px solid var(--text-reverse);
      width: 160px;
      height: 50px;
      border-radius: 2rem;
    }

    &-three {
      width: 70vw;
      overflow: clip;
      &-mask {
        -webkit-mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
        mask: linear-gradient(90deg, transparent, white 20%, white 80%, transparent);
      }
      &-wrapper {
        display: flex;
        justify-content: center;
        gap: 20px;
        width: 100%;
        animation: scrolling linear;
        animation-timeline: scroll(root);
        margin-bottom: 24px;
      }
      &-wrapper[data-reverse='true'] {
        animation-direction: reverse;
      }
      &-tag {
        padding: 8px 24px;
        font-size: 16px;
        color: var(--text-reverse);
        height: fit-content;
        text-wrap: nowrap;
        border: var(--bl-border-base);
        border-radius: var(--bl-radius-base);
      }
      @keyframes scrolling {
        to {
          transform: translate(calc(-50% - 0.5rem));
        }
      }
    }

    &-four {
      width: 60vw;
      text-align: center;
      margin: 10vw 0;

      span {
        background: linear-gradient(90deg, white, white);
        background-clip: text;
        background-size: 0% 100%;
        animation: scroll-reveal linear forwards;
        animation-timeline: view();
        animation-delay: 220ms;
        background-repeat: no-repeat;
        letter-spacing: 0.3em;
      }

      &-title span {
        display: inline-block;
        font-weight: 500;
        margin-bottom: 16px;
        font-size: 50px;
        animation-range-start: cover 20vh;
        animation-range-end: cover 40vh;
      }
      &-desc span {
        line-height: 40px;
        animation-range-start: cover 40vh;
        animation-range-end: cover 50vh;
      }

      @keyframes scroll-reveal {
        to {
          background-size: 100% 100%;
        }
      }
    }
  }

  &-wave {
    height: 220px;
  }
}
</style>
