<!--
 * @Author: saber
 * @Date: 2022-02-11 17:10:32
 * @LastEditTime: 2022-02-11 18:54:10
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts"></script>

<template>
  <main>
    <div id="main-layout">
      <div>============1</div>
      <div>2-----------000000000</div>
      <div>33333</div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;
}
#main-layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 50px auto 1fr;
  position: relative;
  background-color: var(--color-secondary-light);
  position: relative;
}
</style>
