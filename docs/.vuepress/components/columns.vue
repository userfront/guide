<template>
  <div class="row">
    <div class="column-left">Left</div>
    <div class="column-right">Right</div>
  </div>
</template>

<style>
.row {
  width: 100%;
  display: flex;
}
.column-left {
  width: 55%;
  display: inline-block;
  padding: 0 20px 0 0;
  background-color: red;
}
.column-right {
  width: 45%;
  display: inline-block;
  background-color: blue;
}
@media (max-width: 767px) {
  .row {
    flex-direction: column;
  }
  .column-left,
  .column-right {
    display: block;
    width: 100%;
    padding-right: 0;
  }
  .column-left {
    margin-bottom: 20px;
  }
}
</style>
