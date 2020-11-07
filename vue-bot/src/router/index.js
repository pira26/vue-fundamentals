import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '../home/HomePage.vue';
import RobotBuilder from '../build/RobotBuilder.vue';
import PartInfo from '../parts/PartInfo.vue';
import BrowseParts from '../parts/BrowseParts.vue';
import RobotHeads from '../parts/RobotHeads.vue';
import RobotArms from '../parts/RobotArms.vue';
import RobotTorsos from '../parts/RobotTorsos.vue';
import RobotBases from '../parts/RobotBases.vue';
import SidebarStandard from '../sidebar/SidebarStandard.vue';
import SidebarBuild from '../sidebar/SidebarBuild.vue';
import ShoppingCart from '../cart/ShoppingCart.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      components: {
        default: HomePage,
        sidebar: SidebarStandard,
      },
    },
    {
      path: '/build',
      name: 'Build',
      components: {
        default: RobotBuilder,
        sidebar: SidebarBuild,
      },
    },
    {
      path: '/parts/browse',
      name: 'Browse',
      component: BrowseParts,
      children: [{
        path: 'heads',
        name: 'BrowseHeads',
        component: RobotHeads,
      },
      {
        path: 'arms',
        name: 'BrowseArms',
        component: RobotArms,
      }, {
        path: 'torsos',
        name: 'BrowseTorsos',
        component: RobotTorsos,
      }, {
        path: 'bases',
        name: 'BrowseBases',
        component: RobotBases,
      }],
    },
    {
      path: '/parts/:type/:id',
      name: 'Parts',
      component: PartInfo,
      props: true,
      beforeEnter: (to, from, next) => next(Number.isInteger(Number(to.params.id))),
    },
    {
      path: '/cart',
      name: 'Cart',
      component: ShoppingCart,
    },
  ],
});
