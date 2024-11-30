<script setup>
const isMenuOpen = ref(false);

// Language support
const { t, getLocaleCookie, setLocaleCookie, setLocale } = useI18n();
// console.log(locale.value);

const langList = languageList();

const locale = ref("en");

// Change language
const changeLanguage = async (lang) => {
  setLocaleCookie(lang);
  await setLocale(lang);
  locale.value = lang;
};

const languageNow = computed(() => {
  return langList.find((lang) => lang.value == locale.value);
});

// Navigation items
const navItems = [
  { label: "navigation.home", path: "/" },
  { label: "navigation.campaigns", path: "/campaigns" },
  { label: "navigation.contact", path: "/contact-us" },
];

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

onMounted(() => {
  locale.value = getLocaleCookie();
});
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <nav class="fixed w-full bg-white/90 backdrop-blur-sm shadow-sm z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <!-- Logo -->
          <div class="flex-shrink-0">
            <nuxt-link to="/" class="flex items-center">
              <img
                src="@/assets/img/logo/logo-word-black.svg"
                alt="Logo"
                class="h-8"
              />
            </nuxt-link>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <nuxt-link
              v-for="item in navItems"
              :key="item.label"
              :to="item.path"
              class="text-gray-600 hover:text-primary transition-colors"
            >
              {{ $t(item.label) }}
            </nuxt-link>

            <!-- Language Selector -->
            <div class="relative">
              <VDropdown placement="bottom-end" distance="13" name="language">
                <button class="icon-btn h-10 w-10 rounded-full">
                  <country-flag :country="languageNow.flagCode" />
                </button>
                <template #popper>
                  <ul class="header-dropdown w-full md:w-32">
                    <li
                      v-for="lang in langList"
                      class="flex items-center justify-center hover:bg-[rgb(var(--bg-1))]"
                    >
                      <button
                        @click="changeLanguage(lang.value)"
                        class="w-full py-2 px-2 flex justify-center items-center h-10"
                      >
                        <div class="ml-3 flex justify-center items-center">
                          <country-flag :country="lang.flagCode" />
                        </div>
                        <span class="grow">{{ lang.name }}</span>
                      </button>
                    </li>
                  </ul>
                </template>
              </VDropdown>
            </div>

            <div class="flex gap-2">
              <!-- Action Buttons -->
              <rs-button variant="primary-outline" size="sm">{{
                $t("login")
              }}</rs-button>
              <rs-button variant="primary" size="sm">{{
                $t("register")
              }}</rs-button>
            </div>
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center space-x-4">
            <!-- Mobile Language Selector -->
            <VDropdown placement="bottom-end" :offset="8">
              <button class="p-2">
                <country-flag :country="languageNow.flagCode" size="small" />
              </button>

              <template #popper>
                <div class="bg-white rounded-lg shadow-lg py-2 w-48">
                  <button
                    v-for="lang in languages"
                    :key="lang.code"
                    @click="changeLanguage(lang.code)"
                    class="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-50"
                  >
                    <country-flag :country="lang.flag" size="small" />
                    <span class="text-sm text-gray-700">{{ lang.name }}</span>
                  </button>
                </div>
              </template>
            </VDropdown>

            <button
              @click="toggleMenu"
              class="inline-flex items-center justify-center p-2 rounded-md text-gray-600"
            >
              <Icon
                :name="isMenuOpen ? 'ic:round-close' : 'ic:round-menu'"
                class="w-6 h-6"
              />
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0"
        >
          <div
            v-show="isMenuOpen"
            class="md:hidden absolute inset-x-0 top-16 bg-white shadow-lg rounded-b-lg"
          >
            <div class="px-2 pt-2 pb-3 space-y-1">
              <nuxt-link
                v-for="item in navItems"
                :key="item.label"
                :to="item.path"
                class="block px-3 py-2 text-base font-medium text-gray-600 hover:text-primary"
                @click="isMenuOpen = false"
              >
                {{ $t(item.label) }}
              </nuxt-link>
              <div class="flex gap-2 px-3 py-2">
                <rs-button variant="primary-outline" size="sm" class="flex-1">{{
                  $t("login")
                }}</rs-button>
                <rs-button variant="primary" size="sm" class="flex-1">{{
                  $t("register")
                }}</rs-button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="pt-16">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="bg-white max-w-screen-xl mx-auto">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Company Info -->
          <div>
            <img
              src="@/assets/img/logo/logo-word-black.svg"
              alt="Logo"
              class="h-8 mb-4"
            />
            <p class="text-gray-600">
              {{ $t("landing.footer.company_description") }}
            </p>
          </div>

          <!-- Company Links -->
          <div>
            <h3 class="font-semibold mb-4">
              {{ $t("landing.footer.company") }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.about_us") }}
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.careers") }}
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.contact") }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Resources Links -->
          <div>
            <h3 class="font-semibold mb-4">
              {{ $t("landing.footer.resources") }}
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.blog") }}
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.newsletter") }}
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.events") }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Legal Links -->
          <div>
            <h3 class="font-semibold mb-4">{{ $t("landing.footer.legal") }}</h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.privacy") }}
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.terms") }}
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-600 hover:text-primary">
                  {{ $t("landing.footer.cookie_policy") }}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- Copyright -->
        <div
          class="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600"
        >
          <p>
            &copy; {{ new Date().getFullYear() }}
            {{ $t("landing.footer.company_name") }}.
            {{ $t("landing.footer.rights_reserved") }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply text-primary;
}
</style>
