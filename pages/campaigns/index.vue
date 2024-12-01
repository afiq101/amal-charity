<script setup>
const { t } = useI18n();

definePageMeta({
  layout: "landing",
});

// Filter states
const selectedCategory = ref("all");
const selectedSort = ref("trending");
const selectedLocation = ref("all");

// Filter options
const categories = ref([
  { id: "all", name: "All Categories" },
  { id: "education", name: "Education" },
  { id: "healthcare", name: "Healthcare" },
  { id: "environment", name: "Environment" },
  { id: "community", name: "Community" },
  { id: "disaster", name: "Disaster Relief" },
]);

const sortOptions = ref([
  { id: "trending", name: "Trending" },
  { id: "newest", name: "Newest" },
  { id: "most-funded", name: "Most Funded" },
  { id: "ending-soon", name: "Ending Soon" },
]);

const locations = ref([
  { id: "all", name: "All Locations" },
  { id: "selangor", name: "Selangor" },
  { id: "kl", name: "Kuala Lumpur" },
  { id: "penang", name: "Penang" },
  { id: "johor", name: "Johor" },
]);

// Campaign data
const campaigns = ref([
  {
    id: 1,
    type: "campaign",
    title: "PEMADAM, Selangor",
    category: "healthcare",
    location: "selangor",
    image:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
    target: 500000,
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
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2069&auto=format&fit=crop",
    target: 250000,
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
    image:
      "https://images.unsplash.com/photo-1469125155630-7ed37e065743?q=80&w=2069&auto=format&fit=crop",
    target: 750000,
    raised: 423650,
    daysLeft: 60,
    supporters: 4521,
    description:
      "Protecting Malaysian rainforests through conservation efforts",
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
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
    target: 100000,
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
  },
  {
    id: 5,
    type: "campaign",
    title: "Flood Relief Kelantan",
    category: "disaster",
    location: "kl",
    image:
      "https://images.unsplash.com/photo-1547683905-f686c993aae5?q=80&w=2070&auto=format&fit=crop",
    target: 300000,
    raised: 245000,
    daysLeft: 5,
    supporters: 2156,
    description: "Emergency support for flood-affected communities",
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
    id: 6,
    type: "campaign",
    title: "Mental Health Awareness",
    category: "healthcare",
    location: "penang",
    image:
      "https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?q=80&w=2070&auto=format&fit=crop",
    target: 150000,
    raised: 89000,
    daysLeft: 25,
    supporters: 945,
    description: "Breaking stigma and providing mental health support",
    featured: false,
    reimbursed: 50000,
    lastReimbursement: "2024-03-10",
    nextReimbursement: "2024-03-25",
    reimbursementProgress: [
      { date: "2024-02-25", amount: 15000 },
      { date: "2024-03-10", amount: 10000 },
    ],
  },
]);

// Project data
const projects = ref([
  {
    id: 1,
    type: "project",
    title: "Community Garden Initiative",
    category: "environment",
    location: "penang",
    image:
      "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=2070&auto=format&fit=crop",
    target: 100000,
    raised: 45000,
    daysLeft: 45,
    supporters: 523,
    description: "Creating sustainable community gardens in urban areas",
    status: "ongoing",
    reimbursed: 25000,
    lastReimbursement: "2024-03-10",
    nextReimbursement: "2024-03-25",
    reimbursementProgress: [
      { date: "2024-02-25", amount: 15000 },
      { date: "2024-03-10", amount: 10000 },
    ],
  },
  {
    id: 2,
    type: "project",
    title: "Tech Skills Workshop",
    category: "education",
    location: "kl",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=2070&auto=format&fit=crop",
    target: 75000,
    raised: 62000,
    daysLeft: 10,
    supporters: 348,
    description: "Teaching coding skills to underprivileged youth",
    status: "ending soon",
    reimbursed: 30000,
    lastReimbursement: "2024-03-10",
    nextReimbursement: "2024-03-25",
    reimbursementProgress: [
      { date: "2024-02-25", amount: 15000 },
      { date: "2024-03-10", amount: 10000 },
    ],
  },
  {
    id: 3,
    type: "project",
    title: "Mobile Medical Clinic",
    category: "healthcare",
    location: "johor",
    image:
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=2070&auto=format&fit=crop",
    target: 200000,
    raised: 156000,
    daysLeft: 30,
    supporters: 789,
    description: "Bringing healthcare services to remote areas",
    status: "ongoing",
    reimbursed: 100000,
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
    type: "project",
    title: "Youth Sports Program",
    category: "community",
    location: "selangor",
    image:
      "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?q=80&w=2069&auto=format&fit=crop",
    target: 50000,
    raised: 23000,
    daysLeft: 20,
    supporters: 245,
    description: "Empowering youth through sports and leadership",
    status: "ongoing",
    reimbursed: 15000,
    lastReimbursement: "2024-03-10",
    nextReimbursement: "2024-03-25",
    reimbursementProgress: [
      { date: "2024-02-25", amount: 15000 },
      { date: "2024-03-10", amount: 10000 },
    ],
  },
  {
    id: 5,
    type: "project",
    title: "Elderly Care Support",
    category: "healthcare",
    location: "penang",
    image:
      "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?q=80&w=2078&auto=format&fit=crop",
    target: 120000,
    raised: 98000,
    daysLeft: 15,
    supporters: 634,
    description: "Supporting elderly care facilities and programs",
    status: "ongoing",
    reimbursed: 75000,
    lastReimbursement: "2024-03-15",
    nextReimbursement: "2024-03-30",
    reimbursementProgress: [
      { date: "2024-02-15", amount: 50000 },
      { date: "2024-03-01", amount: 50000 },
      { date: "2024-03-15", amount: 50000 },
    ],
  },
  {
    id: 7,
    type: "project",
    title: "Local Arts Festival",
    category: "community",
    location: "kl",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?q=80&w=2080&auto=format&fit=crop",
    target: 80000,
    raised: 45000,
    daysLeft: 25,
    supporters: 378,
    description: "Celebrating local artists and cultural heritage",
    status: "ongoing",
    reimbursed: 20000,
    lastReimbursement: "2024-03-10",
    nextReimbursement: "2024-03-25",
    reimbursementProgress: [
      { date: "2024-02-25", amount: 15000 },
      { date: "2024-03-10", amount: 10000 },
    ],
  },
  {
    id: 8,
    type: "project",
    title: "Stray Animal Shelter",
    category: "community",
    location: "selangor",
    image:
      "https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=2086&auto=format&fit=crop",
    target: 150000,
    raised: 89000,
    daysLeft: 35,
    supporters: 923,
    description: "Building a new shelter for stray animals",
    status: "ongoing",
    reimbursed: 50000,
    lastReimbursement: "2024-03-15",
    nextReimbursement: "2024-03-30",
    reimbursementProgress: [
      { date: "2024-02-15", amount: 50000 },
      { date: "2024-03-01", amount: 50000 },
      { date: "2024-03-15", amount: 50000 },
    ],
  },
]);

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Add these utility functions
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getReimbursementPercentage = (reimbursed, raised) => {
  return (reimbursed / raised) * 100;
};

const getDaysUntilNextReimbursement = (nextDate) => {
  const today = new Date();
  const next = new Date(nextDate);
  const diffTime = Math.abs(next - today);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// Computed filtered data
const filteredCampaigns = computed(() => {
  return campaigns.value.filter((campaign) => {
    if (
      selectedCategory.value !== "all" &&
      campaign.category !== selectedCategory.value
    )
      return false;
    if (
      selectedLocation.value !== "all" &&
      campaign.location !== selectedLocation.value
    )
      return false;
    return true;
  });
});

const filteredProjects = computed(() => {
  return projects.value.filter((project) => {
    if (
      selectedCategory.value !== "all" &&
      project.category !== selectedCategory.value
    )
      return false;
    if (
      selectedLocation.value !== "all" &&
      project.location !== selectedLocation.value
    )
      return false;
    return true;
  });
});

// Add formatNumber utility function
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Pagination settings for campaigns
const currentCampaignPage = ref(1);
const campaignsPerPage = 6; // Showing fewer campaigns since they're larger
const totalCampaignPages = computed(() =>
  Math.ceil(filteredCampaigns.value.length / campaignsPerPage)
);

// Paginated campaigns
const paginatedCampaigns = computed(() => {
  const start = (currentCampaignPage.value - 1) * campaignsPerPage;
  const end = start + campaignsPerPage;
  return filteredCampaigns.value.slice(start, end);
});

// Handle campaign page change
const handleCampaignPageChange = (page) => {
  currentCampaignPage.value = page;
  // Scroll to top of campaigns section smoothly
  document
    .getElementById("campaigns-section")
    ?.scrollIntoView({ behavior: "smooth" });
};

// Pagination settings
const currentPage = ref(1);
const itemsPerPage = 8; // Adjust this number based on your needs
const totalPages = computed(() =>
  Math.ceil(filteredProjects.value.length / itemsPerPage)
);

// Paginated projects
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredProjects.value.slice(start, end);
});

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
  // Scroll to top of projects section smoothly
  document
    .getElementById("projects-section")
    ?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Filter Section -->
    <section class="border-b border-gray-200 bg-white sticky top-0 z-10">
      <div class="container mx-auto px-4 py-4">
        <div class="flex flex-col sm:flex-row gap-3 sm:items-center sm:gap-4">
          <!-- Category Filter -->
          <div class="relative flex-1 min-w-[150px]">
            <select
              v-model="selectedCategory"
              class="w-full appearance-none bg-white border border-gray-200 rounded-full px-4 py-2 pr-8 hover:border-gray-300 focus:outline-none focus:border-primary text-sm"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </select>
            <Icon
              name="mdi:chevron-down"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size="16"
            />
          </div>

          <!-- Sort Filter -->
          <div class="relative flex-1 min-w-[150px]">
            <select
              v-model="selectedSort"
              class="w-full appearance-none bg-white border border-gray-200 rounded-full px-4 py-2 pr-8 hover:border-gray-300 focus:outline-none focus:border-primary text-sm"
            >
              <option
                v-for="option in sortOptions"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name }}
              </option>
            </select>
            <Icon
              name="mdi:chevron-down"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size="16"
            />
          </div>

          <!-- Location Filter -->
          <div class="relative flex-1 min-w-[150px]">
            <select
              v-model="selectedLocation"
              class="w-full appearance-none bg-white border border-gray-200 rounded-full px-4 py-2 pr-8 hover:border-gray-300 focus:outline-none focus:border-primary text-sm"
            >
              <option
                v-for="location in locations"
                :key="location.id"
                :value="location.id"
              >
                {{ location.name }}
              </option>
            </select>
            <Icon
              name="mdi:chevron-down"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size="16"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Campaigns Section -->
    <section id="campaigns-section" class="py-6 sm:py-8 md:py-12">
      <div class="container mx-auto px-4">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          {{ t("campaigns.index.featured_campaigns") }}
        </h2>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8"
        >
          <!-- Campaign Cards -->
          <NuxtLink
            v-for="campaign in paginatedCampaigns"
            :key="campaign.id"
            :to="`/campaigns/${campaign.id}`"
            class="group"
          >
            <div
              class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <!-- Campaign Image -->
              <div class="aspect-video relative overflow-hidden">
                <img
                  :src="campaign.image"
                  :alt="campaign.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-2 sm:top-3 left-2 sm:left-3">
                  <span
                    class="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {{
                      categories.find((c) => c.id === campaign.category)?.name
                    }}
                  </span>
                </div>
              </div>

              <!-- Campaign Info -->
              <div class="p-3 sm:p-4">
                <h3
                  class="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2"
                >
                  {{ campaign.title }}
                </h3>
                <p
                  class="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2"
                >
                  {{ campaign.description }}
                </p>

                <!-- Progress Section -->
                <div class="space-y-3 mb-4">
                  <!-- Amount Info -->
                  <div>
                    <div class="text-2xl font-bold">
                      {{ t("campaigns.index.progress.currency") }}
                      {{ formatNumber(campaign.raised) }}
                    </div>
                    <div
                      class="flex flex-wrap items-baseline text-sm space-x-1"
                    >
                      <span class="text-gray-600">{{
                        t("campaigns.index.progress.currency")
                      }}</span>
                      <span class="text-gray-600">{{
                        formatNumber(campaign.raised)
                      }}</span>
                      <span class="text-gray-400">
                        ({{ t("campaigns.index.progress.currency") }}
                        {{ formatNumber(campaign.reimbursed) }}
                        {{ t("campaigns.index.stats.reimbursed") }})
                      </span>
                      <div class="flex items-baseline space-x-1">
                        <span class="text-gray-600">{{
                          t("campaigns.index.progress.of")
                        }}</span>
                        <span class="text-gray-600"
                          >{{ t("campaigns.index.progress.currency") }}
                          {{ formatNumber(campaign.target) }}</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div class="space-y-2">
                    <div
                      class="h-2 bg-gray-100 rounded-full overflow-hidden relative"
                    >
                      <!-- Reimbursed Progress -->
                      <div
                        class="h-full bg-emerald-500 rounded-full absolute"
                        :style="{
                          width: `${Math.min((campaign.reimbursed / campaign.target) * 100, 100)}%`,
                        }"
                      ></div>
                      <!-- Raised Progress -->
                      <div
                        class="h-full bg-gray-900 rounded-full absolute"
                        :style="{
                          width: `${Math.min(((campaign.raised - campaign.reimbursed) / campaign.target) * 100, 100)}%`,
                          left: `${Math.min((campaign.reimbursed / campaign.target) * 100, 100)}%`,
                        }"
                      ></div>
                    </div>

                    <!-- Legend -->
                    <div class="flex gap-4 text-xs">
                      <div class="flex items-center gap-1.5">
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                        <span>{{ t("campaigns.index.progress.raised") }}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <div
                          class="w-1.5 h-1.5 rounded-full bg-emerald-500"
                        ></div>
                        <span>{{
                          t("campaigns.index.progress.reimbursed")
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Campaign Stats - Only Supporters -->
                <div class="text-xs sm:text-sm text-gray-500">
                  <span
                    >{{ campaign.supporters.toLocaleString() }}
                    {{ t("campaigns.index.stats.supporters") }}</span
                  >
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Campaigns Pagination -->
        <div
          v-if="totalCampaignPages > 1"
          class="flex justify-center items-center gap-2 mb-8"
        >
          <!-- Previous Page -->
          <button
            @click="handleCampaignPageChange(currentCampaignPage - 1)"
            :disabled="currentCampaignPage === 1"
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'text-gray-400': currentCampaignPage === 1 }"
            :aria-label="t('campaigns.index.pagination.previous')"
          >
            <Icon name="mdi:chevron-left" size="20" />
          </button>

          <!-- Page Numbers -->
          <template v-for="page in totalCampaignPages" :key="page">
            <!-- Show ellipsis for many pages -->
            <span
              v-if="
                totalCampaignPages > 7 &&
                ((page > 2 && page < currentCampaignPage - 1) ||
                  (page > currentCampaignPage + 1 &&
                    page < totalCampaignPages - 1))
              "
              class="px-2"
            >
              {{
                page === currentCampaignPage - 2 ||
                page === currentCampaignPage + 2
                  ? "..."
                  : ""
              }}
            </span>

            <!-- Page buttons -->
            <button
              v-else
              @click="handleCampaignPageChange(page)"
              class="min-w-[32px] h-8 px-2 rounded-lg transition-colors"
              :class="{
                'bg-primary text-white': currentCampaignPage === page,
                'hover:bg-gray-100': currentCampaignPage !== page,
              }"
              :aria-label="
                t('campaigns.index.pagination.page', { number: page })
              "
            >
              {{ page }}
            </button>
          </template>

          <!-- Next Page -->
          <button
            @click="handleCampaignPageChange(currentCampaignPage + 1)"
            :disabled="currentCampaignPage === totalCampaignPages"
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{
              'text-gray-400': currentCampaignPage === totalCampaignPages,
            }"
            :aria-label="t('campaigns.index.pagination.next')"
          >
            <Icon name="mdi:chevron-right" size="20" />
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section id="projects-section" class="py-6 sm:py-8 md:py-12 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6">
          {{ t("campaigns.index.community_projects") }}
        </h2>

        <!-- Projects Grid -->
        <div
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8"
        >
          <NuxtLink
            v-for="project in paginatedProjects"
            :key="project.id"
            :to="`/projects/${project.id}`"
            class="group"
          >
            <div
              class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <!-- Project Image -->
              <div class="aspect-video relative overflow-hidden">
                <img
                  :src="project.image"
                  :alt="project.title"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div class="absolute top-3 left-3 flex gap-2">
                  <span
                    class="bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {{
                      categories.find((c) => c.id === project.category)?.name
                    }}
                  </span>
                  <span
                    class="bg-green-100/90 backdrop-blur-sm text-green-800 text-xs font-medium px-2 py-1 rounded-full"
                  >
                    {{ project.status }}
                  </span>
                </div>
              </div>

              <!-- Project Info -->
              <div class="p-3 sm:p-4">
                <h3
                  class="font-semibold text-base sm:text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2"
                >
                  {{ project.title }}
                </h3>
                <p
                  class="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2"
                >
                  {{ project.description }}
                </p>

                <!-- Progress Section -->
                <div class="space-y-3 mb-4">
                  <!-- Amount Info -->
                  <div>
                    <div class="text-2xl font-bold">
                      {{ t("campaigns.index.progress.currency") }}
                      {{ formatNumber(project.raised) }}
                    </div>
                    <div
                      class="flex flex-wrap items-baseline text-sm space-x-1"
                    >
                      <span class="text-gray-600">{{
                        t("campaigns.index.progress.currency")
                      }}</span>
                      <span class="text-gray-600">{{
                        formatNumber(project.raised)
                      }}</span>
                      <span class="text-gray-400">
                        ({{ t("campaigns.index.progress.currency") }}
                        {{ formatNumber(project.reimbursed) }}
                        {{ t("campaigns.index.stats.reimbursed") }})
                      </span>
                      <div class="flex items-baseline space-x-1">
                        <span class="text-gray-600">{{
                          t("campaigns.index.progress.of")
                        }}</span>
                        <span class="text-gray-600"
                          >{{ t("campaigns.index.progress.currency") }}
                          {{ formatNumber(project.target) }}</span
                        >
                      </div>
                    </div>
                  </div>

                  <!-- Progress Bar -->
                  <div class="space-y-2">
                    <div
                      class="h-2 bg-gray-100 rounded-full overflow-hidden relative"
                    >
                      <!-- Reimbursed Progress -->
                      <div
                        class="h-full bg-emerald-500 rounded-full absolute"
                        :style="{
                          width: `${Math.min((project.reimbursed / project.target) * 100, 100)}%`,
                        }"
                      ></div>
                      <!-- Raised Progress -->
                      <div
                        class="h-full bg-gray-900 rounded-full absolute"
                        :style="{
                          width: `${Math.min(((project.raised - project.reimbursed) / project.target) * 100, 100)}%`,
                          left: `${Math.min((project.reimbursed / project.target) * 100, 100)}%`,
                        }"
                      ></div>
                    </div>

                    <!-- Legend -->
                    <div class="flex gap-4 text-xs">
                      <div class="flex items-center gap-1.5">
                        <div class="w-1.5 h-1.5 rounded-full bg-gray-900"></div>
                        <span>{{ t("campaigns.index.progress.raised") }}</span>
                      </div>
                      <div class="flex items-center gap-1.5">
                        <div
                          class="w-1.5 h-1.5 rounded-full bg-emerald-500"
                        ></div>
                        <span>{{
                          t("campaigns.index.progress.reimbursed")
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Project Stats -->
                <div
                  class="flex items-center justify-between text-xs sm:text-sm text-gray-500"
                >
                  <span
                    >{{ formatNumber(project.supporters) }}
                    {{ t("campaigns.index.stats.supporters") }}</span
                  >
                  <span
                    >{{ project.daysLeft }}
                    {{ t("campaigns.index.stats.days_left") }}</span
                  >
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Pagination -->
        <div
          v-if="totalPages > 1"
          class="flex justify-center items-center gap-2"
        >
          <!-- Previous Page -->
          <button
            @click="handlePageChange(currentPage - 1)"
            :disabled="currentPage === 1"
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'text-gray-400': currentPage === 1 }"
          >
            <Icon name="mdi:chevron-left" size="20" />
          </button>

          <!-- Page Numbers -->
          <template v-for="page in totalPages" :key="page">
            <!-- Show ellipsis for many pages -->
            <span
              v-if="
                totalPages > 7 &&
                ((page > 2 && page < currentPage - 1) ||
                  (page > currentPage + 1 && page < totalPages - 1))
              "
              class="px-2"
            >
              {{
                page === currentPage - 2 || page === currentPage + 2
                  ? "..."
                  : ""
              }}
            </span>

            <!-- Page buttons -->
            <button
              v-else
              @click="handlePageChange(page)"
              class="min-w-[32px] h-8 px-2 rounded-lg transition-colors"
              :class="{
                'bg-primary text-white': currentPage === page,
                'hover:bg-gray-100': currentPage !== page,
              }"
            >
              {{ page }}
            </button>
          </template>

          <!-- Next Page -->
          <button
            @click="handlePageChange(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            :class="{ 'text-gray-400': currentPage === totalPages }"
          >
            <Icon name="mdi:chevron-right" size="20" />
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sticky {
  position: sticky;
  top: 0;
  z-index: 10;
}

.group:hover .hidden {
  display: block;
}

/* Tooltip arrow */
.group:hover .bg-gray-800:after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #1f2937 transparent transparent transparent;
}

/* Optional: Add smooth transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
