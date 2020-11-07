<template>
    <div>
        <h1>{{ part.title }}</h1>
        <div>
            {{ part.description }}
        </div>
    </div>
</template>

<script>
import partsMixin from './parts-mixin';

export default {
  name: 'PartInfo',
  mixins: [partsMixin],
  props: {
    type: {
      type: String,
      required: true,
    },
    id: {
      type: [String, Number],
      required: true,
      validator: (value) => Number.isInteger(value),
    },
  },
  computed: {
    part() {
      const { type, id } = this;
      return this.parts[type].find((part) => part.id === +id);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
