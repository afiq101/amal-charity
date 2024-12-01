<script setup>
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";
definePageMeta({
  layout: "landing",
});
const { t } = useI18n();
const id = useRoute().params.id;
const { $swal } = useNuxtApp();

// Campaign details
const campaign = ref({
  id: 1,
  title: "PEMADAM, Selangor",
  slogan: "Building a Drug-Free Future, One Community at a Time",
  description:
    "Join our mission to create drug-free communities across Malaysia through education, prevention, and rehabilitation programs.",
  target: 500000,
  raised: 286812,
  distributed: 150000,
  supporters: 3234,
  daysLeft: 30,
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
    distributed: 45000,
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
    raised: 73112,
    distributed: 35000,
    supporters: 1234,
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Food Security Initiative",
    description:
      "Establish a community food bank that provides essential groceries to 500 struggling households monthly, ensuring no one goes hungry.",
    target: 90000,
    raised: 41490,
    distributed: 20000,
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
    distributed: 250000,
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

// Add this utility function
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Pagination settings for projects
const currentPage = ref(1);
const projectsPerPage = 6; // Show 6 projects per page
const totalPages = computed(() =>
  Math.ceil(projects.value.length / projectsPerPage)
);

// Paginated projects
const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * projectsPerPage;
  const end = start + projectsPerPage;
  return projects.value.slice(start, end);
});

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
  // Scroll to top of projects section smoothly
  document
    .getElementById("projects-section")
    ?.scrollIntoView({ behavior: "smooth" });
};

// Donation modal state
const showDonationModal = ref(false);

// Donation data
const selectedAmount = ref(null);
const customAmount = ref("");

// Predefined donation amounts
const donationAmounts = ref([
  { value: 50, label: "RM50", popular: false },
  { value: 100, label: "RM100", popular: true },
  { value: 200, label: "RM200", popular: false },
  { value: 500, label: "RM500", popular: false },
]);

// Update the handleDonate function
const handleDonate = async () => {
  const amount = selectedAmount.value || Number(customAmount.value);

  if (!amount || isNaN(amount)) {
    $swal.fire({
      title: "Error",
      text: t("campaign.donation.invalid_amount"),
      icon: "error",
    });
    return;
  }

  try {
    const { data } = await useFetch("/api/payment/create", {
      method: "POST",
      body: {
        amount: amount,
      },
    });

    if (data.value.status === 200) {
      // Close the donation modal
      showDonationModal.value = false;

      // Redirect to payment URL
      window.location.href = data.value.data.url;
    } else {
      $swal.fire({
        title: "Error",
        text: data.value.message || t("campaign.donation.payment_failed"),
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Payment error:", error);
    $swal.fire({
      title: "Error",
      text: t("campaign.donation.system_error"),
      icon: "error",
    });
  }
};

// Sankey data preparation
const sankeyData = computed(() => {
  // Create nodes array starting with the campaign
  const nodes = [{ id: "Campaign", name: campaign.value.title }];

  // Add project nodes
  projects.value.forEach((project) => {
    nodes.push({
      id: `Project_${project.id}`,
      name: project.title,
    });
  });

  // Create links array
  const links = projects.value.map((project) => ({
    source: "Campaign",
    target: `Project_${project.id}`,
    value: project.raised,
  }));

  return { nodes, links };
});

const useClient = () => process.client;

// Create Sankey diagram
const createSankeyDiagram = () => {
  if (!useClient()) return;

  const element = document.getElementById("campaign-sankey");
  if (!element) return;

  d3.select("#campaign-sankey").selectAll("*").remove();

  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 250, bottom: 20, left: 250 };

  const svg = d3
    .select("#campaign-sankey")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const data = {
    nodes: JSON.parse(JSON.stringify(sankeyData.value.nodes)),
    links: JSON.parse(JSON.stringify(sankeyData.value.links)),
  };

  data.links = data.links.map((d) => ({
    source: data.nodes.findIndex((node) => node.id === d.source),
    target: data.nodes.findIndex((node) => node.id === d.target),
    value: +d.value,
  }));

  const sankeyGenerator = sankey()
    .nodeWidth(20)
    .nodePadding(40)
    .extent([
      [0, 0],
      [width - margin.left - margin.right, height - margin.top - margin.bottom],
    ]);

  const { nodes, links } = sankeyGenerator(data);

  // Add links
  svg
    .append("g")
    .selectAll("path")
    .data(links)
    .join("path")
    .attr("d", sankeyLinkHorizontal())
    .attr("fill", "none")
    .attr("stroke", "#cbd5e1")
    .attr("stroke-width", (d) => Math.max(1, d.width))
    .attr("opacity", 0.5);

  // Add nodes
  svg
    .append("g")
    .selectAll("rect")
    .data(nodes)
    .join("rect")
    .attr("x", (d) => d.x0)
    .attr("y", (d) => d.y0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("fill", "#3b82f6")
    .attr("opacity", 0.8);

  // Add labels with improved positioning
  svg
    .append("g")
    .selectAll("text")
    .data(nodes)
    .join("text")
    .attr("x", (d) => (d.x0 < width / 2 ? d.x1 + 10 : d.x0 - 10))
    .attr("y", (d) => (d.y1 + d.y0) / 2)
    .attr("dy", "0.35em")
    .attr("text-anchor", (d) => (d.x0 < width / 2 ? "start" : "end"))
    .text((d) => {
      const name = sankeyData.value.nodes[d.index].name;
      const value = formatCurrency(d.value);
      return `${name} (${value})`;
    })
    .attr("font-size", "12px")
    .attr("fill", "#64748b")
    .each(function (d) {
      // Break long labels into multiple lines
      const text = d3.select(this);
      const words = text.text().split(" ");
      const lineHeight = 1.1;
      const y = text.attr("y");
      const x = text.attr("x");
      const dy = parseFloat(text.attr("dy"));
      let tspan = text
        .text(null)
        .append("tspan")
        .attr("x", x)
        .attr("y", y)
        .attr("dy", dy + "em");

      let line = [];
      let lineNumber = 0;

      words.forEach((word) => {
        line.push(word);
        tspan.text(line.join(" "));

        if (tspan.node().getComputedTextLength() > 150) {
          line.pop();
          tspan.text(line.join(" "));
          line = [word];
          tspan = text
            .append("tspan")
            .attr("x", x)
            .attr("y", y)
            .attr("dy", ++lineNumber * lineHeight + dy + "em")
            .text(word);
        }
      });
    });
};

// Handle resize with debounce
const handleResize = debounce(() => {
  if (useClient()) {
    createSankeyDiagram();
  }
}, 250);

// Debounce utility
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Initialize diagram
onMounted(() => {
  if (useClient()) {
    createSankeyDiagram();
    window.addEventListener("resize", handleResize);
  }
});

onUnmounted(() => {
  if (useClient()) {
    window.removeEventListener("resize", handleResize);
  }
});
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
          <!-- Main Amount -->
          <div class="mb-6">
            <h2 class="text-4xl font-bold mb-1">
              RM {{ formatNumber(campaign.raised) }}
            </h2>
            <div class="flex items-center text-gray-600 text-sm">
              <span>RM {{ formatNumber(campaign.raised) }}</span>
              <span class="text-gray-400 mx-1"
                >(RM {{ formatNumber(campaign.distributed) }} distributed)</span
              >
              <span>of RM {{ formatNumber(campaign.target) }}</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="space-y-2 mb-6">
            <div
              class="h-2.5 bg-gray-100 rounded-full overflow-hidden relative"
            >
              <!-- Distributed Progress -->
              <div
                class="h-full bg-emerald-500 rounded-full absolute"
                :style="{
                  width: `${(campaign.distributed / campaign.target) * 100}%`,
                }"
              ></div>
              <!-- Raised Progress -->
              <div
                class="h-full bg-gray-900 rounded-full absolute"
                :style="{
                  width: `${(campaign.raised / campaign.target) * 100}%`,
                  left: `${(campaign.distributed / campaign.target) * 100}%`,
                }"
              ></div>
            </div>

            <!-- Legend -->
            <div class="flex gap-4 text-sm">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-gray-900"></div>
                <span>Raised</span>
              </div>
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span>Distributed</span>
              </div>
            </div>
          </div>

          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-3xl font-bold">
                {{ formatNumber(campaign.supporters) }}
              </p>
              <p class="text-gray-600">supporters</p>
            </div>
            <div>
              <p class="text-3xl font-bold">{{ campaign.daysLeft }}</p>
              <p class="text-gray-600">days left</p>
            </div>
          </div>

          <rs-button
            @click="showDonationModal = true"
            variant="primary"
            class="w-full mt-6"
          >
            {{ t("campaign.donate_to_campaign") }}
          </rs-button>
        </div>
      </div>
    </div>

    <!-- Add this section where you want to display the Sankey diagram -->
    <div class="container mx-auto px-4 py-8 md:py-16">
      <h2
        class="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-3 md:mb-4"
      >
        {{ t("campaign.fund_distribution") }}
      </h2>
      <p
        class="text-lg md:text-xl text-center text-gray-600 mb-8 md:mb-12 px-4"
      >
        {{ t("campaign.fund_distribution_description") }}
      </p>

      <div
        id="campaign-sankey"
        class="w-full overflow-x-auto bg-white rounded-lg shadow-lg p-4"
      ></div>
    </div>

    <!-- Projects Grid -->
    <div id="projects-section" class="container mx-auto px-4 py-8 md:py-16">
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mb-8">
        <!-- Project Cards -->
        <div
          v-for="project in paginatedProjects"
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

            <!-- Progress Section -->
            <div class="space-y-4 mb-4">
              <!-- Amount Info -->
              <div>
                <div class="text-xl font-bold mb-1">
                  RM {{ formatNumber(project.raised) }}
                </div>
                <div class="flex items-center text-gray-600 text-sm">
                  <span>RM {{ formatNumber(project.raised) }}</span>
                  <span class="text-gray-400 mx-1"
                    >(RM
                    {{ formatNumber(project.distributed) }} distributed)</span
                  >
                  <span>of RM {{ formatNumber(project.target) }}</span>
                </div>
              </div>

              <!-- Progress Bar -->
              <div class="space-y-2">
                <div
                  class="h-2 bg-gray-100 rounded-full overflow-hidden relative"
                >
                  <!-- Distributed Progress -->
                  <div
                    class="h-full bg-emerald-500 rounded-full absolute"
                    :style="{
                      width: `${Math.min((project.distributed / project.target) * 100, 100)}%`,
                    }"
                  ></div>
                  <!-- Raised Progress -->
                  <div
                    class="h-full bg-gray-900 rounded-full absolute"
                    :style="{
                      width: `${Math.min(((project.raised - project.distributed) / project.target) * 100, 100)}%`,
                      left: `${Math.min((project.distributed / project.target) * 100, 100)}%`,
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
                    <div class="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                    <span>{{ t("campaigns.index.progress.distributed") }}</span>
                  </div>
                </div>
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
              <rs-button
                @click="navigateTo(`/campaigns/${id}/project/${project.id}`)"
                variant="primary"
              >
                {{ t("campaign.donate_now") }}
              </rs-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex justify-center items-center gap-2">
        <!-- Previous Page -->
        <button
          @click="handlePageChange(currentPage - 1)"
          :disabled="currentPage === 1"
          class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          :class="{ 'text-gray-400': currentPage === 1 }"
          :aria-label="t('campaigns.index.pagination.previous')"
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
              page === currentPage - 2 || page === currentPage + 2 ? "..." : ""
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
            :aria-label="t('campaigns.index.pagination.page', { number: page })"
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
          :aria-label="t('campaigns.index.pagination.next')"
        >
          <Icon name="mdi:chevron-right" size="20" />
        </button>
      </div>
    </div>

    <!-- FAQ Section -->
    <div class="container mx-auto px-4 py-8 md:py-12">
      <h2
        class="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-6 md:mb-8"
      >
        {{ t("campaign.faq.title") }}
      </h2>
      <div class="mx-auto px-4">
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

    <!-- Donation Modal -->
    <rs-modal
      v-model="showDonationModal"
      :title="t('campaign.donation.title')"
      size="md"
      position="center"
      :ok-title="t('campaign.donation.donate')"
      :cancel-title="t('campaign.donation.cancel')"
      :ok-callback="handleDonate"
    >
      <template #body>
        <div class="space-y-6 p-4">
          <!-- Campaign Info -->
          <div class="text-center">
            <h3 class="font-semibold text-lg mb-2">{{ campaign.title }}</h3>
            <p class="text-gray-600 text-sm">{{ campaign.slogan }}</p>
          </div>

          <!-- Preset Amounts -->
          <div class="grid grid-cols-2 gap-3">
            <button
              v-for="amount in donationAmounts"
              :key="amount.value"
              @click="
                selectedAmount = amount.value;
                customAmount = '';
              "
              class="relative h-16 rounded-xl border-2 transition-all duration-200"
              :class="[
                selectedAmount === amount.value
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-gray-200 hover:border-primary/50',
              ]"
            >
              <span class="text-lg font-medium">{{ amount.label }}</span>
              <span
                v-if="amount.popular"
                class="absolute -top-2 left-1/2 -translate-x-1/2 bg-primary text-white text-xs px-2 py-0.5 rounded-full"
              >
                {{ t("campaign.donation.popular") }}
              </span>
            </button>
          </div>

          <!-- Custom Amount -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t("campaign.donation.custom_amount") }}
            </label>
            <div class="relative">
              <span
                class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                >RM</span
              >
              <input
                v-model="customAmount"
                type="number"
                class="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-0 transition-colors"
                :placeholder="t('campaign.donation.enter_amount')"
                @focus="selectedAmount = null"
              />
            </div>
          </div>

          <!-- Security Notice -->
          <div
            class="flex items-center justify-center gap-2 text-sm text-gray-500"
          >
            <Icon name="mdi:shield-check" />
            {{ t("campaign.donation.secure_payment") }}
          </div>
        </div>
      </template>
    </rs-modal>
  </div>
</template>

<style scoped>
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
