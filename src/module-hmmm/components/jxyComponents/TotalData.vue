<template>
  <div class="total-data" style="margin-bottom: 15px">
    <slot name="icon"></slot>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  created() {},

  methods: {},
};
</script>

<style scoped>
.total-data {
  background-color: #f4f4f5;
  color: #909399;
  padding: 8px 16px;
  margin: 0;
  border-radius: 4px;
  transition: opacity 0.2s;
}
</style>
