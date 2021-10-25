import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCurrencyFilter from "vue-currency-filter";

Vue.use(VueCurrencyFilter, [
  {
    symbol: "$",
    thousandsSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: true,
    avoidEmptyDecimals: undefined,
  },
  {
    name: "currency_2",
    symbol: "",
    thousandsSeparator: ".",
    symbolPosition: "front",
    symbolSpacing: true,
    avoidEmptyDecimals: undefined,
  },
]);

Vue.filter("capitalize", function (value) {
  if (!value) return "";
  let cap = value.replace(/\w\S*/g, (w) =>
    w.replace(/^\w/, (c) => c.toUpperCase())
  );
  return cap;
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
