<script setup>
definePageMeta({
  layout: "landing",
});
const { t } = useI18n();

// Campaign details
const campaign = ref({
  id: 1,
  title: "PEMADAM, Selangor",
  slogan: "Building a Drug-Free Future, One Community at a Time",
  description:
    "Join our mission to create drug-free communities across Malaysia through education, prevention, and rehabilitation programs.",
  target: 500000,
  raised: 286812,
  supporters: 3234,
  image:
    "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=2070&auto=format&fit=crop",
});

// Projects under the campaign
const projects = ref([
  {
    id: 1,
    title: "Sponsor 100 Students' Education",
    description:
      "Provide full sponsorship for school fees, uniforms, books, and transport for 100 students from low-income families to ensure uninterrupted education.",
    target: 100000,
    raised: 86812,
    supporters: 1234,
    image:
      "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2073&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Shah Alam Micro-Entrepreneurship Program",
    description:
      "Offer grants and mentorship to 50 aspiring entrepreneurs from underprivileged communities, focusing on developing sustainable small businesses.",
    target: 100000,
    raised: 3112,
    supporters: 1234,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Food Security Initiative",
    description:
      "Establish a community food bank that provides essential groceries to 500 struggling households monthly, ensuring no one goes hungry.",
    target: 9000,
    raised: 1490,
    supporters: 2234,
    image:
      "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Affordable Housing Support",
    description:
      "Collaborate with developers to subsidize or renovate 50 homes for low-income families, ensuring safe and dignified living conditions.",
    target: 1000000,
    raised: 490000,
    supporters: 2234,
    image:
      "https://images.unsplash.com/photo-1460317442991-0ec209397118?q=80&w=2070&auto=format&fit=crop",
  },
]);

// FAQ data
const faqs = ref([
  {
    question: t("campaign.faq.donation_direction"),
    answer: t("campaign.faq.donation_direction_answer"),
  },
  {
    question: t("campaign.faq.volunteer"),
    answer: t("campaign.faq.volunteer_answer"),
  },
  {
    question: t("campaign.faq.workplace_giving"),
    answer: t("campaign.faq.workplace_giving_answer"),
  },
]);

// Helper functions
const calculateProgress = (raised, target) => {
  return (raised / target) * 100;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
  }).format(amount);
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section -->
    <div class="relative">
      <div class="absolute inset-0">
        <img
          :src="campaign.image"
          class="w-full h-full object-cover"
          alt="Campaign banner"
        />
        <div class="absolute inset-0 bg-gray-900/70"></div>
      </div>

      <div class="relative container mx-auto px-4 py-12 md:py-24">
        <h1 class="text-2xl md:text-4xl font-bold text-center text-white mb-4">
          {{ campaign.title }}
        </h1>
        <p
          class="text-xl md:text-2xl text-center text-white/90 mb-4 md:mb-8 font-light"
        >
          {{ campaign.slogan }}
        </p>
        <p
          class="text-lg md:text-xl text-center text-white/80 mb-8 md:mb-12 max-w-3xl mx-auto px-4"
        >
          {{ campaign.description }}
        </p>

        <!-- Campaign Progress -->
        <div class="max-w-2xl mx-auto bg-white rounded-lg p-4 md:p-6 shadow-lg">
          <rs-progress-bar
            :value="campaign.raised"
            :max="campaign.target"
            variant="primary"
            size="lg"
          />
          <div
            class="flex flex-col md:flex-row justify-between mt-4 mb-6 space-y-4 md:space-y-0"
          >
            <div class="text-center md:text-left">
              <p class="text-xl md:text-2xl font-bold text-gray-900">
                {{ formatCurrency(campaign.raised) }}
              </p>
              <p class="text-sm text-gray-600">
                {{ t("campaign.raised_of") }}
                {{ formatCurrency(campaign.target) }}
              </p>
            </div>
            <div class="text-center md:text-right">
              <p class="text-xl md:text-2xl font-bold text-gray-900">
                {{ campaign.supporters }}
              </p>
              <p class="text-sm text-gray-600">
                {{ t("campaign.supporters") }}
              </p>
            </div>
          </div>
          <rs-button
            @click="navigateTo('/campaigns/details')"
            variant="primary"
            class="w-full"
          >
            {{ t("campaign.donate_to_campaign") }}
          </rs-button>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="container mx-auto px-4 py-8 md:py-16">
      <h2
        class="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3 md:mb-4"
      >
        {{ t("campaign.projects.title") }}
      </h2>
      <p
        class="text-lg md:text-xl text-center text-gray-600 mb-8 md:mb-12 px-4"
      >
        {{ t("campaign.projects.subtitle") }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
        <!-- Project Cards -->
        <div
          v-for="project in projects"
          :key="project.id"
          class="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-4 md:p-6">
            <h3 class="text-lg md:text-xl font-semibold text-gray-900 mb-2">
              {{ project.title }}
            </h3>
            <p class="text-sm md:text-base text-gray-600 mb-4">
              {{ project.description }}
            </p>

            <!-- Progress Bar -->
            <div class="mb-4">
              <rs-progress-bar
                :value="project.raised"
                :max="project.target"
                variant="primary"
                size="sm"
              />
              <div class="flex justify-between mt-2 text-sm">
                <span class="text-gray-600">
                  {{ formatCurrency(project.raised) }}
                </span>
                <span class="text-gray-500">
                  {{ t("campaign.raised_of") }}
                  {{ formatCurrency(project.target) }}
                </span>
              </div>
            </div>

            <div
              class="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0"
            >
              <div class="flex items-center">
                <Icon name="mdi:heart" class="text-primary mr-2" />
                <span class="text-sm text-gray-600">
                  {{ project.supporters }} {{ t("campaign.supporters") }}
                </span>
              </div>
              <rs-button variant="primary">
                {{ t("campaign.donate_now") }}
              </rs-button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="container mx-auto px-4 py-8 md:py-12">
      <h2
        class="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8"
      >
        {{ t("campaign.faq.title") }}
      </h2>
      <div class="max-w-3xl mx-auto px-4">
        <rs-collapse accordion type="border">
          <rs-collapse-item v-for="(faq, index) in faqs" :key="index">
            <template #title>
              <div class="flex justify-between items-center w-full">
                <span
                  class="text-base md:text-lg font-semibold text-gray-900 pr-4"
                >
                  {{ faq.question }}
                </span>
              </div>
            </template>
            <p class="text-sm md:text-base text-gray-600 pt-2">
              {{ faq.answer }}
            </p>
          </rs-collapse-item>
        </rs-collapse>
      </div>
    </div>
  </div>
</template>
