<template>
  <div class="container-fluid">
    <div class="textnotfound">
      <H1>404 Page Not Found</H1>
      <p>The requested path cound not be found</p>
    </div>
  </div>
</template>
<script>
export default {
  name:"PageNotFound"
}
</script>
<style scoped>
.textnotfound {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  resize: vertical;
  overflow: auto;
  text-align: center;
}
</style>