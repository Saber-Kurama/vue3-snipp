<!--
 * @Author: saber
 * @Date: 2022-02-14 11:36:35
 * @LastEditTime: 2022-03-09 15:19:06
 * @LastEditors: saber
 * @Description: 
-->
<script setup lang="ts">
// @ts-ignore
import MonacoEditor from '@dangojs/vue3-monaco';
import { ref } from 'vue';

const code = ref('');
</script>
<template>
  <MonacoEditor v-model="code" theme="vs-dark" />
</template>
<style lang="scss" scoped></style>
