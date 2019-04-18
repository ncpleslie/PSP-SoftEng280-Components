<template>
  <div>
    <b-container>
      <b-card no-body>
        <h1>Rules</h1>
        <p>{{ rule }}</p>
      </b-card>
    </b-container>
  </div>
</template>

<script>
export default {
  props: {
    rule: String
  }
};
</script>

<style scoped>
div {
  margin: 20px auto;
}
</style>


