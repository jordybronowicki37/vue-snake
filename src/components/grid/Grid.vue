<script setup lang="ts">
import {GridData, CellStyles} from "./GridTypes.ts";

defineProps<{ data: GridData, cellStyles: CellStyles, height: number, width: number }>();
</script>

<template>
  <table>
    <tr v-for="i in data" class="grid-row">
      <td v-for="j in i" class="grid-cell" v-bind:style="cellStyles[j]"></td>
    </tr>
  </table>
</template>

<style scoped>
.grid-row {
  --cell-spacing: 0;
  display: flex;
  gap: var(--cell-spacing);
  margin-bottom: var(--cell-spacing);
}
.grid-cell {
  max-width: calc(100% / v-bind(width));
  height: 1.5rem;
  aspect-ratio : 1 / 1;
  background-color: #444;
}
</style>
