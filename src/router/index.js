import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/registersales',
    name: 'RegisterSales',
    component: () => import('../views/RegisterSales.vue'),
  },
  {
    path: '/registerproducts',
    name: 'RegisterProducts',
    component: () => import('../views/RegisterProducts.vue'),
  },
  {
    path: '/receiveorder',
    name: 'ReceiveOrder',
    component: () => import('../views/ReceiveOrder.vue'),
  },
  {
    path: '/updateprice',
    name: 'UpdatePrice',
    component: () => import('../views/UpdatePrice.vue'),
  },
  {
    path: '/updateprice/productrecent/:id',
    name: 'UpdateOnlyPrice',
    component: () => import('../components/products/UpdateOnlyPrice'),
  },
  {
    path: '/updateprice/product/:id',
    name: 'UpdateAllFields',
    component: () =>
      import('../components/products/UpdateAllFields.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
