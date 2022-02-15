<!--
 * @Author: saber
 * @Date: 2022-02-15 14:42:05
 * @LastEditTime: 2022-02-15 15:32:00
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts"></script>
<template>
  <div :class="['file-item']">
    <div class="clickable-area">文件</div>
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
}
</style>
