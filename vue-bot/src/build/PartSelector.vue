<template>
  <div class="part" :class="position">
    <router-link :to="{
        name: 'Parts',
        params: { id: this.selectedPart.id, type: this.selectedPart.type },
      }">
      <img :src="selectedPart.src" title="part" alt="part name"/>
    </router-link>
    <button @click="selectPreviousPart()" class="prev-selector"></button>
    <button @click="selectNextPart()" class="next-selector"></button>
    <span v-pin="{bottom: '10px', right: '5px'}"
          v-show="selectedPart.onSale"
          class="sale">Sale!</span>
  </div>
</template>

<script>
const getPreviousValidIndex = (length, i) => {
  const deprecatedIndex = i - 1;
  return deprecatedIndex < 0 ? length - 1 : deprecatedIndex;
};

const getNextValidIndex = (length, i) => {
  const incrementedIndex = i + 1;
  return incrementedIndex > length - 1 ? 0 : incrementedIndex;
};

export default {
  name: 'PartSelector',
  props: {
    parts: {
      type: Array,
      required: true,
    },
    position: {
      type: String,
      required: true,
      validator: (value) => ['top', 'left', 'center', 'right', 'bottom'].includes(value),
    },
  },
  data() {
    return { selectedPartIndex: 0 };
  },
  computed: {
    selectedPart() {
      return this.parts[this.selectedPartIndex];
    },
  },
  created() {
    this.emitSelectedPart();
  },
  updated() {
    this.emitSelectedPart();
  },
  methods: {
    emitSelectedPart() {
      this.$emit('partSelected', this.selectedPart);
    },
    selectNextPart() {
      this.selectedPartIndex = getNextValidIndex(
        this.parts.length,
        this.selectedPartIndex,
      );
    },
    selectPreviousPart() {
      this.selectedPartIndex = getPreviousValidIndex(
        this.parts.length,
        this.selectedPartIndex,
      );
    },
  },
};

</script>

<style lang="scss" scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
  .sale {
    color: white;
    background-color: red;
    padding: 3px;
  }
}

.prev-selector, .next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  width: 25px;
  height: 171px;
}
.prev-selector {
  left: -28px;
}
.next-selector {
  right: -28px;
}

.part-title {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: red;
  padding-top: 5px;
  top: -25px;
}
.part img {
  width:165px;
  cursor: pointer;
}
.top {
  border-bottom: none;
}
.left {
  border-right: none;
  .prev-selector {
    top: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }
  .next-selector {
    top: auto;
    bottom: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }
}
.right {
  border-left: none;
  .prev-selector {
    top: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
  .next-selector {
    top: auto;
    bottom: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
}
.bottom {
  border-top: none;
}
.center {
    .prev-selector, .next-selector {
      opacity: 0.8;
    }
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.left, .right {
    .prev-selector::after {
        content: '\25B2'
    }
}
.left, .right {
    .next-selector::after {
        content: '\25BC'
    }
}
.top, .bottom, .center {
    .prev-selector::after {
        content: '\25C4'
    }
}
.top, .bottom, .center {
    .next-selector::after {
        content: '\25BA'
    }
}
.highlight {
  border: 1px solid red;
}
</style>
