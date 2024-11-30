<script setup>
definePageMeta({
  layout: "landing",
});

const { t } = useI18n();

// Featured campaigns data
const featuredCampaigns = [
  {
    id: 1,
    type: "campaign",
    title: "PEMADAM, Selangor",
    category: "healthcare",
    location: "selangor",
    image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
    goal: 500000,
    raised: 286812,
    daysLeft: 30,
    supporters: 3234,
    description: "Building a Drug-Free Future, One Community at a Time",
    featured: true,
    reimbursed: 150000,
    lastReimbursement: "2024-03-15",
    nextReimbursement: "2024-03-30",
    reimbursementProgress: [
      { date: "2024-02-15", amount: 50000 },
      { date: "2024-03-01", amount: 50000 },
      { date: "2024-03-15", amount: 50000 },
    ],
  },
  {
    id: 2,
    type: "campaign",
    title: "Education for Rural Malaysia",
    category: "education",
    location: "johor",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2069&auto=format&fit=crop",
    goal: 250000,
    raised: 175000,
    daysLeft: 45,
    supporters: 1892,
    description: "Providing quality education resources to rural communities",
    featured: true,
    reimbursed: 100000,
    lastReimbursement: "2024-03-10",
    nextReimbursement: "2024-03-25",
    reimbursementProgress: [
      { date: "2024-02-25", amount: 15000 },
      { date: "2024-03-10", amount: 10000 },
    ],
  },
  {
    id: 3,
    type: "campaign",
    title: "Save Our Rainforests",
    category: "environment",
    location: "selangor",
    image: "https://images.unsplash.com/photo-1469125155630-7ed37e065743?q=80&w=2069&auto=format&fit=crop",
    goal: 750000,
    raised: 423650,
    daysLeft: 60,
    supporters: 4521,
    description: "Protecting Malaysian rainforests through conservation efforts",
    featured: true,
    reimbursed: 200000,
    lastReimbursement: "2024-03-15",
    nextReimbursement: "2024-03-30",
    reimbursementProgress: [
      { date: "2024-02-15", amount: 50000 },
      { date: "2024-03-01", amount: 50000 },
      { date: "2024-03-15", amount: 50000 },
    ],
  },
  {
    id: 4,
    type: "campaign",
    title: "Food Bank KL",
    category: "community",
    location: "kl",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    goal: 100000,
    raised: 67890,
    daysLeft: 15,
    supporters: 892,
    description: "Supporting urban poor families with essential food supplies",
    featured: false,
    reimbursed: 50000,
    lastReimbursement: "2024-03-10",
    nextReimbursement: "2024-03-25",
    reimbursementProgress: [
      { date: "2024-02-25", amount: 15000 },
      { date: "2024-03-10", amount: 10000 },
    ],
  }
];

// Impact areas data
const impactAreas = [
  {
    key: "drug_prevention",
    icon: "mdi:pill-off",
  },
  {
    key: "poverty",
    icon: "mdi:hand-heart",
  },
  {
    key: "education",
    icon: "mdi:school",
  },
];

// Blog posts data
const blogPosts = [
  {
    title: "Getting kids outside: one of the best things",
    date: "26/08/2023",
    image: "/images/blog1.jpg",
  },
  {
    title: "Understanding people is key to protecting nature",
    date: "28/08/2023",
    image: "/images/blog2.jpg",
  },
  {
    title: "Protecting sea turtles across the Pacific",
    date: "10/09/2023",
    image: "/images/blog3.jpg",
  },
];

const onSubmit = (data) => {
  console.log(data);
};

// Add these utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const getReimbursementPercentage = (reimbursed, raised) => {
  return (reimbursed / raised) * 100;
};
</script>

<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero bg-white dark:bg-slate-800 py-20">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            {{ $t("home.hero.title") }}
          </h1>
          <p class="text-lg mb-8 text-gray-600 dark:text-gray-300">
            {{ $t("home.hero.subtitle") }}
          </p>
          <div class="flex gap-4 justify-center">
            <rs-button variant="primary" size="lg">{{
              $t("home.hero.join")
            }}</rs-button>
            <rs-button variant="secondary" size="lg">{{
              $t("home.hero.donate")
            }}</rs-button>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about py-16 bg-gray-50 dark:bg-slate-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12">
          {{ $t("landing.about.title") }}
        </h2>
        <div class="grid md:grid-cols-1 gap-8">
          <div class="about-content">
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ $t("landing.about.description") }}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div
                v-for="(area, index) in impactAreas"
                :key="index"
                class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
              >
                <Icon :name="area.icon" size="32" class="text-primary mb-4" />
                <h3 class="font-semibold mb-2">
                  {{ $t(`landing.about.impact_areas.${area.key}.title`) }}
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ $t(`landing.about.impact_areas.${area.key}.description`) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="projects py-16">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12">
          {{ $t("landing.projects.title") }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          <NuxtLink
            v-for="campaign in featuredCampaigns"
            :key="campaign.title"
            :to="`/campaigns/${campaign.id}`"
            class="group"
          >
            <div class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <!-- Campaign Image -->
              <div class="aspect-video relative overflow-hidden">
                <img
                  :src="campaign.image || 'https://placehold.co/600x400'"
                  :alt="campaign.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <!-- Campaign Info -->
              <div class="p-4">
                <h3 class="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {{ campaign.title }}
                </h3>
                <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                  {{ campaign.description }}
                </p>

                <!-- Progress Section -->
                <div class="space-y-3 mb-4">
                  <!-- Amount Info -->
                  <div>
                    <div class="text-2xl font-bold">
                      {{ formatCurrency(campaign.raised) }}
                    </div>
                    <div class="flex flex-wrap items-baseline text-sm space-x-1">
                      <span class="text-gray-600">{{ formatCurrency(campaign.raised) }}</span>
                      <span class="text-gray-400">
                        ({{ formatCurrency(campaign.reimbursed) }}
                        {{ $t("campaigns.index.stats.reimbursed") }})
                      </span>
                      <div class="flex items-baseline space-x-1">
                        <span class="text-gray-600">{{ $t("campaigns.index.progress.of") }}</span>
                        <span class="text-gray-600">{{ formatCurrency(campaign.goal) }}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div class="space-y-2">
                    <div class="h-2 bg-gray-100 rounded-full overflow-hidden relative">
                      <!-- Reimbursed Progress -->
                      <div
                        class="h-full bg-emerald-500 rounded-full absolute"
                        :style="{
                          width: `${Math.min((campaign.reimbursed / campaign.goal) * 100, 100)}%`,
                        }"
                      ></div>
                      <!-- Raised Progress -->
                      <div
                        class="h-full bg-gray-900 rounded-full absolute"
                        :style="{
                          width: `${Math.min(((campaign.raised - campaign.reimbursed) / campaign.goal) * 100, 100)}%`,
                          left: `${Math.min((campaign.reimbursed / campaign.goal) * 100, 100)}%`,
                        }"
                      ></div>
                    </div>

                    <!-- Legend -->
                    <div class="flex gap-4 text-xs">
                      <div class="flex items-center gap-1.5">
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                        <span>{{ $t("campaigns.index.progress.raised") }}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                        <span>{{ $t("campaigns.index.progress.reimbursed") }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Campaign Stats -->
                <div class="text-sm text-gray-500">
                  <span>{{ campaign.supporters.toLocaleString() }} {{ $t("landing.projects.supporters") }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-8">
          <rs-button variant="primary-outline">
            {{ $t("landing.projects.explore_more") }}
          </rs-button>
        </div>
      </div>
    </section>

    <!-- Featured Campaigns -->
    <section class="featured-campaigns py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12">
          {{ $t("landing.featured.title") }}
        </h2>
        <div class="grid md:grid-cols-3 gap-8">
          <!-- Main Featured Post -->
          <div
            class="md:col-span-1 bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div class="aspect-w-16 aspect-h-9 bg-gray-100">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=60"
                alt="Forest"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="p-6">
              <h3 class="font-semibold mb-2">
                {{ $t("landing.featured.mainPost.title") }}
              </h3>
              <p class="text-sm text-gray-500 mb-4">31/06/2023</p>
              <rs-button variant="primary-text" size="sm">{{
                $t("landing.featured.readMore")
              }}</rs-button>
            </div>
          </div>

          <!-- Right Side Posts -->
          <div class="md:col-span-2 space-y-4">
            <div
              v-for="(post, index) in [
                {
                  title: 'Getting kids outside: one of the best things',
                  date: '26/06/2023',
                  image:
                    'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=400&auto=format&fit=crop&q=60',
                },
                {
                  title: 'Understanding people is key to protecting nature',
                  date: '24/06/2023',
                  image:
                    'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&auto=format&fit=crop&q=60',
                },
                {
                  title: 'Protecting sea turtles across the Pacific',
                  date: '18/06/2023',
                  image:
                    'https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=400&auto=format&fit=crop&q=60',
                },
              ]"
              :key="index"
              class="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <div class="flex items-center p-4 gap-4">
                <div class="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0">
                  <img
                    :src="post.image"
                    :alt="post.title"
                    class="object-cover w-full h-full rounded-lg"
                  />
                </div>
                <div class="flex-grow">
                  <h3 class="font-semibold mb-1">{{ post.title }}</h3>
                  <p class="text-sm text-gray-500">{{ post.date }}</p>
                </div>
                <rs-button variant="primary-text" size="sm"
                  >Read more</rs-button
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stay Connected Section -->
    <section class="stay-connected py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <div class="max-w-xl mx-auto">
          <h2 class="text-3xl font-bold mb-4">
            {{ $t("landing.connect.title") }}
          </h2>
          <p class="text-gray-600 mb-8">
            {{ $t("landing.connect.description") }}
          </p>
          <FormKit type="form" @submit="onSubmit" :actions="false">
            <FormKit
              type="email"
              name="email"
              :placeholder="$t('landing.connect.email')"
              validation="required|email"
              class="mb-4"
            />
            <FormKit
              type="textarea"
              name="message"
              :placeholder="$t('landing.connect.message')"
              validation="required"
              class="mb-4"
            />
            <rs-button type="submit" variant="primary" class="w-full">
              {{ $t("landing.connect.submit") }}
            </rs-button>
          </FormKit>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.landing-page {
  @apply bg-white dark:bg-slate-800;
}

.hero {
  background-image: linear-gradient(
      rgba(255, 255, 255, 0.9),
      rgba(255, 255, 255, 0.9)
    ),
    url("https://placehold.co/1920x1080");
  background-size: cover;
  background-position: center;
}

.dark .hero {
  background-image: linear-gradient(
      rgba(15, 23, 42, 0.9),
      rgba(15, 23, 42, 0.9)
    ),
    url("https://placehold.co/1920x1080");
}
</style>
