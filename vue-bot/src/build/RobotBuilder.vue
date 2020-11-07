<template>
  <div v-if="availableParts" class="content">
    <div class="preview">
      <CollapsibleSection>
        <div class="preview-content">
          <div class="top-row">
            <img :src="selectedRobot.head.src"/>
          </div>
          <div class="middle-row">
            <img :src="selectedRobot.leftArm.src" class="rotate-left"/>
            <img :src="selectedRobot.torso.src"/>
            <img :src="selectedRobot.rightArm.src" class="rotate-right"/>
          </div>
          <div class="bottom-row">
            <img :src="selectedRobot.base.src"/>
          </div>
        </div>
      </CollapsibleSection>
      <button @click="addToCart()" class="add-to-cart">Add to cart</button>
    </div>
    <div class="top-row">
       <div class="robot-name">{{selectedRobot.head.title}}</div>
       <PartSelector
        :parts="availableParts.heads"
        @partSelected="part => selectedRobot.head = part"
        position="top" />
    </div>
    <div class="middle-row">
      <PartSelector
        :parts="availableParts.arms"
        @partSelected="part => selectedRobot.leftArm = part"
        position="left" />
      <PartSelector
        :parts="availableParts.torsos"
        @partSelected="part => selectedRobot.torso = part"
        position="center" />
      <PartSelector
        :parts="availableParts.arms"
        @partSelected="part => selectedRobot.rightArm = part"
        position="right" />
    </div>
    <div class="bottom-row">
      <PartSelector
        :parts="availableParts.bases"
        @partSelected="part => selectedRobot.base = part"
        position="bottom" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import PartSelector from './PartSelector.vue';
import CollapsibleSection from '../shared/CollapsibleSection.vue';

export default {
  name: 'RobotBuilder',
  created() {
    // this.$store.dispatch('robots/getParts');
    this.getParts();
  },
  beforeRouteLeave(to, from, next) {
    if (this.isAddedToCart) {
      next();
    } else {
      /* eslint no-alert: 0 */
      /* eslint no-restricted-globals: 0 */
      next(confirm('Are you sure to leave ?'));
    }
  },
  components: {
    PartSelector,
    CollapsibleSection,
  },
  computed: {
    availableParts() {
      return this.$store.state.robots.parts;
    },
  },
  data: () => ({
    isAddedToCart: false,
    cart: [],
    selectedRobot: {
      head: {},
      leftArm: {},
      torso: {},
      rightArm: {},
      base: {},
    },
  }),
  methods: {
    ...mapActions('robots', ['getParts', 'addRobotToCart']),
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost
        + robot.leftArm.cost
        + robot.torso.cost
        + robot.rightArm.cost
        + robot.base.cost;
      // this.$store.dispatch('robots/addRobotToCart', { ...robot, cost })
      this.addRobotToCart({ ...robot, cost })
        .then(() => this.$router.push('/cart'));
      this.isAddedToCart = true;
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
  img {
    width: 165px;
  }
}
.content {
    position: relative;
    .top-row {
        display:flex;
        justify-content: space-around;
        .robot-name {
            position: absolute;
            top: -25px;
            text-align: center;
            width: 100%;
        }
    }
    .middle-row {
        display:flex;
        justify-content: center;
    }
    .bottom-row {
        display:flex;
        justify-content: space-around;
        border-top: none;
    }
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
  img {
    width: 50px;
    height: 50px;
  }
  .add-to-cart {
    position: absolute;
    width: 210px;
    padding: 3px;
    font-size: 16px;
  }
}
.preview-content {
  border: 1px solid #999;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
