<script setup>
definePageMeta({
  layout: "landing",
});

const { t } = useI18n();

// Featured campaigns data
const featuredCampaigns = [
  {
    title: "Forest Restoration and Rehabilitation",
    description: "Help restore our vital forest ecosystems",
    raised: 58472,
    goal: 100000,
    supporters: 6243,
  },
  {
    title: "The Clean-Up Team - Plastic waste reduction",
    description: "Join the fight against plastic pollution",
    raised: 51450,
    goal: 85000,
    supporters: 2134,
  },
  {
    title: "Panda Conservation: Promoting Protection",
    description: "Support panda habitat conservation",
    raised: 33112,
    goal: 65000,
    supporters: 1524,
  },
];

// Impact areas data
const impactAreas = [
  {
    key: 'drug_prevention',
    icon: 'mdi:pill-off',
  },
  {
    key: 'poverty',
    icon: 'mdi:hand-heart',
  },
  {
    key: 'education',
    icon: 'mdi:school',
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
</script>

<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero bg-white dark:bg-slate-800 py-20">
      <div class="container mx-auto px-4">
        <div class="text-center max-w-3xl mx-auto">
          <h1 class="text-4xl md:text-5xl font-bold mb-6">
            {{ $t('landing.hero.title') }}
          </h1>
          <p class="text-lg mb-8 text-gray-600 dark:text-gray-300">
            {{ $t('landing.hero.subtitle') }}
          </p>
          <div class="flex gap-4 justify-center">
            <rs-button variant="primary" size="lg">{{ $t('landing.hero.join_us') }}</rs-button>
            <rs-button variant="secondary" size="lg">{{ $t('landing.hero.donate') }}</rs-button>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about py-16 bg-gray-50 dark:bg-slate-900">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12">{{ $t('landing.about.title') }}</h2>
        <div class="grid md:grid-cols-1 gap-8">
          <div class="about-content">
            <p class="text-gray-600 dark:text-gray-300 mb-4">
              {{ $t('landing.about.description') }}
            </p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <div
                v-for="(area, index) in impactAreas"
                :key="index"
                class="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm"
              >
                <Icon :name="area.icon" size="32" class="text-primary mb-4" />
                <h3 class="font-semibold mb-2">{{ $t(`landing.about.impact_areas.${area.key}.title`) }}</h3>
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
        <h2 class="text-3xl font-bold mb-12">{{ $t('landing.projects.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <rs-card v-for="(campaign, index) in featuredCampaigns" :key="index">
            <div class="p-6">
              <h3 class="font-semibold mb-2">{{ campaign.title }}</h3>
              <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {{ campaign.description }}
              </p>
              <div class="progress-bar mb-4">
                <div class="h-2 bg-gray-200 rounded-full">
                  <div
                    class="h-2 bg-primary rounded-full"
                    :style="`width: ${(campaign.raised / campaign.goal) * 100}%`"
                  ></div>
                </div>
              </div>
              <div class="flex justify-between text-sm">
                <span>${{ campaign.raised.toLocaleString() }} {{ $t('landing.projects.raised') }}</span>
                <span>${{ campaign.goal.toLocaleString() }} {{ $t('landing.projects.goal') }}</span>
              </div>
              <rs-badge variant="primary" class="mt-4">
                {{ campaign.supporters }} {{ $t('landing.projects.supporters') }}
              </rs-badge>
            </div>
          </rs-card>
        </div>
        <div class="text-center mt-8">
          <rs-button variant="primary-outline">{{ $t('landing.projects.explore_more') }}</rs-button>
        </div>
      </div>
    </section>

    <!-- Featured Campaigns -->
    <section class="featured-campaigns py-16 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold mb-12">{{ $t('landing.featured.title') }}</h2>
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
                {{ $t('landing.featured.mainPost.title') }}
              </h3>
              <p class="text-sm text-gray-500 mb-4">31/06/2023</p>
              <rs-button variant="primary-text" size="sm">{{ $t('landing.featured.readMore') }}</rs-button>
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
          <h2 class="text-3xl font-bold mb-4">{{ $t('landing.connect.title') }}</h2>
          <p class="text-gray-600 mb-8">
            {{ $t('landing.connect.description') }}
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
              {{ $t('landing.connect.submit') }}
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
    url("@/assets/img/hero-bg.jpg");
  background-size: cover;
  background-position: center;
}

.dark .hero {
  background-image: linear-gradient(
      rgba(15, 23, 42, 0.9),
      rgba(15, 23, 42, 0.9)
    ),
    url("@/assets/img/hero-bg.jpg");
}
</style>
