<!--
 * @Author: saber
 * @Date: 2022-02-15 14:42:05
 * @LastEditTime: 2022-02-15 15:32:00
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
import { FileCode } from '@icon-park/vue-next';
import { ref } from 'vue';
const filename = ref('saber');
const readonly = ref(true);
</script>
<template>
  <div :class="['file-item']">
    <div class="clickable-area">
      <FileCode class="icon" size="20px"></FileCode>
      <form>
          <input type="text" v-model="filename" :readonly="readonly" size="2" />
        </form>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.file-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px 5px 2px 0;
  margin: 0 5px 1px 5px;
  border-radius: 5px;
  .clickable-area {
    display: flex;
    align-items: center;
    flex: 1;
    padding: 3px 10px;
  }
  .icon {
    margin-right: 5px;
    width: 20px;
  }

  form {
    flex: 1;
    display: flex;
    flex-direction: column;
  }

   input {
    border: 0;
    padding: 6px 8px;
    border-radius: 2px;
    color: var(--font-color);
    border: 2px solid transparent;
    outline: none;
    transition: 0.2s all ease-in-out;
    background: transparent;
    min-width: 0;

    &[readonly] {
      pointer-events: none;
    }

    &:focus {
      border-bottom: 2px solid var(--color-primary);
    }
  }
}
</style>
