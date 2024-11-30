<script setup>
import Menu from "~/navigation/index.js";
import RSItem from "~/components/layouts/sidemenu/Item.vue";

// const menuItem = Menu;

const props = defineProps({
  menuItem: {
    type: Array,
    default: () => Menu,
    required: false,
  },
});

onMounted(() => {
  try {
    const el = document.querySelector(".active-menu").closest(".menu-content");
    const elParent = el.parentElement.parentElement;

    if (elParent) {
      elParent.classList.remove("hide");
      elParent.querySelector("a").classList.add("nav-open");
    }
    if (el) el.classList.remove("hide");
  } catch (e) {
    // console.log(e);
    return;
  }
});
</script>

<template>
  <div class="vertical-menu">
    <div class="py-2 px-4">
      <nuxt-link to="/">
        <div class="flex flex-auto gap-3 justify-center items-center h-[48px]">
          <img
            class="h-10 block"
            src="@/assets/img/logo/logo-word-black.svg"
            alt=""
          />
        </div>
      </nuxt-link>
    </div>
    <div class="flex flex-col justify-between my-6 max-h-[85vh]">
      <div class="p-3">
        <div
          class="flex gap-2 border-2 border-slate-100 rounded-lg py-2 px-5 hover:cursor-pointer"
          @click="navigateTo('/wallet')"
        >
          <div
            class="flex justify-center items-center my-auto rounded-full text-primary bg-[#F9EDE9] w-8 h-8"
          >
            <Icon
              name="streamline:money-wallet-money-payment-finance-wallet"
              size="15"
            ></Icon>
          </div>
          <div>
            <p class="text-[10px] font-medium uppercase leading-4">
              Your Wallet
            </p>
            <h4 class="">
              <span></span>
              <span class="my-auto font-medium text-[#070707]">
                RM 10,000
              </span>
            </h4>
          </div>
        </div>
      </div>
    </div>
    <NuxtScrollbar
      class="flex flex-col justify-between my-6"
      style="max-height: 82dvh"
    >
      <RSItem :items="menuItem"></RSItem>
    </NuxtScrollbar>
  </div>
</template>
