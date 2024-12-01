<script setup>
import { useLayoutStore } from "~/stores/layout";
import { useWindowSize } from "vue-window-size";

import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

definePageMeta({
  layout: "landing",
});

const { t } = useI18n();

const layoutStore = useLayoutStore();
const mobileWidth = layoutStore.mobileWidth;

const { width } = useWindowSize();
const windowWidth = ref(width);

// Campaign details
const campaign = ref({
  id: 2,
  title: "Shah Alam Micro-Entrepreneurship Program",
  slogan: "Empowering Communities Through Entrepreneurship",
  description:
    "Offer grants and mentorship to 50 aspiring entrepreneurs from underprivileged communities, focusing on developing sustainable small businesses.",
  images: [
    "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=2074&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1664575600850-c4b712e6e2bf?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
  ],
  challenge: {
    title: "Challenge",
    description:
      "Many talented individuals in underprivileged communities lack the resources and guidance needed to start their own businesses, perpetuating cycles of poverty.",
  },
  work: {
    title: "Our Work",
    description:
      "Our program provides comprehensive support including business training, mentorship, and seed funding to help aspiring entrepreneurs build sustainable businesses.",
  },
  target: 100000,
  raised: 73112,
  distributed: 35000,
  supporters: 1234,
});

const isDesktop = computed(() => {
  return windowWidth.value >= mobileWidth ? true : false;
});

const swiperModules = [Autoplay, Pagination, Navigation];
const swiperOptions = {
  slidesPerView: 1,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  pagination: {
    clickable: true,
  },
  navigation: true,
};

// Predefined donation amounts
const donationAmounts = ref([
  { value: 50, label: "RM50", popular: false },
  { value: 100, label: "RM100", popular: true },
  { value: 200, label: "RM200", popular: false },
  { value: 500, label: "RM500", popular: false },
]);

const selectedAmount = ref(null);
const customAmount = ref("");
const email = ref("");
const message = ref("");

const recentDonors = ref([
  { name: "Ahmad Razali", amount: 100, time: "2m ago" },
  { name: "Sarah Lee", amount: 500, time: "15m ago" },
  { name: "Mike Tan", amount: 200, time: "1h ago" },
]);

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const { $swal } = useNuxtApp();

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

const handleStayConnected = () => {
  // Handle stay connected form submission
  console.log("Email:", email.value, "Message:", message.value);
};

// Add this new data for transparency table
const transparencyData = ref([
  {
    date: "2024-03-15",
    recipient: "Rehabilitation Center",
    amount: 50000,
    purpose: "Medical Equipment",
    status: "Disbursed",
  },
  {
    date: "2024-03-10",
    recipient: "Support Group",
    amount: 25000,
    purpose: "Counseling Services",
    status: "Disbursed",
  },
  {
    date: "2024-03-05",
    recipient: "Emergency Fund",
    amount: 30000,
    purpose: "Emergency Assistance",
    status: "Disbursed",
  },
]);

// Table configuration
const tableFields = ["Date", "Recipient", "Amount", "Purpose", "Status"];
const tableOptions = {
  variant: "primary",
  striped: true,
  hover: true,
  bordered: false,
};
const tableAdvancedOptions = {
  sortable: true,
  filterable: true,
  responsive: false,
  outsideBorder: false,
};

// Add milestone data
const milestones = ref([
  {
    amount: 100000,
    title: "First Milestone",
    description: "Set up drug prevention education programs in 5 schools",
    status: "completed",
    completedDate: "Feb 15, 2024",
  },
  {
    amount: 250000,
    title: "Second Milestone",
    description: "Establish community support center and counseling services",
    status: "current",
    progress: 75,
  },
  {
    amount: 400000,
    title: "Third Milestone",
    description:
      "Launch rehabilitation support program and family assistance network",
    status: "upcoming",
  },
  {
    amount: 500000,
    title: "Final Goal",
    description:
      "Expand programs to neighboring communities and create sustainable support system",
    status: "upcoming",
  },
]);

// Mixed one-level and two-level Sankey data
const sankeyData = ref({
  nodes: [
    { id: "Total_Funds", name: "Total Funds" },
    { id: "Rehab_Center", name: "Rehabilitation Center" },
    { id: "Support_Group", name: "Support Group" },
    { id: "Emergency", name: "Emergency Fund" },
    { id: "Medical", name: "Medical Equipment" },
    { id: "Counseling", name: "Counseling Services" },
  ],
  links: [
    // Two-level links (through intermediate nodes)
    { source: "Total_Funds", target: "Rehab_Center", value: 50000 },
    { source: "Rehab_Center", target: "Medical", value: 50000 },
    { source: "Total_Funds", target: "Support_Group", value: 25000 },
    { source: "Support_Group", target: "Counseling", value: 25000 },
    // Direct one-level link
    { source: "Total_Funds", target: "Emergency", value: 30000 },
  ],
});

// Add this utility function
const useClient = () => process.client;

// Modify the createSankeyDiagram function
const createSankeyDiagram = () => {
  if (!useClient()) return;

  const element = document.getElementById("sankey-diagram");
  if (!element) return;

  d3.select("#sankey-diagram").selectAll("*").remove();

  // Increase width and height for better spacing
  const width = 1000;
  const height = 500;
  const margin = { top: 20, right: 200, bottom: 20, left: 200 }; // Increased margins

  const svg = d3
    .select("#sankey-diagram")
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
    .nodePadding(40) // Increased padding between nodes
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
      // Break long labels into multiple lines if needed
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
          // max line width
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

// Update the handleResize function to use debounce
const handleResize = debounce(() => {
  if (useClient()) {
    createSankeyDiagram();
  }
}, 250);

// Add debounce utility function
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

// Modify the lifecycle hooks
onMounted(() => {
  // Wait for next tick to ensure DOM is ready
  nextTick(() => {
    createSankeyDiagram();
    window.addEventListener("resize", handleResize);
  });
});

onUnmounted(() => {
  if (useClient()) {
    window.removeEventListener("resize", handleResize);
  }
});

// Add this utility function
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Hero Section with Carousel -->
    <div class="relative">
      <!-- Carousel -->
      <div class="h-[60vh] md:h-[70vh] relative">
        <Swiper
          v-bind="swiperOptions"
          :modules="swiperModules"
          class="h-full w-full"
        >
          <SwiperSlide v-for="(image, index) in campaign.images" :key="index">
            <div class="relative w-full h-full">
              <img
                :src="image"
                class="w-full h-full object-cover"
                alt="Campaign image"
              />
              <div class="absolute inset-0 bg-black/50"></div>
            </div>
          </SwiperSlide>
        </Swiper>

        <!-- Title Overlay -->
        <div
          class="absolute inset-0 z-10 flex flex-col items-center justify-center text-white px-4"
        >
          <h1 class="text-3xl md:text-5xl font-bold text-center mb-4">
            {{ campaign.title }}
          </h1>
          <p class="text-xl md:text-2xl text-center mb-4 font-light">
            {{ campaign.slogan }}
          </p>
          <p
            class="text-base md:text-lg text-center max-w-3xl mx-auto text-white/90"
          >
            {{ campaign.description }}
          </p>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <!-- Left Column - Content -->
        <div class="space-y-8">
          <!-- Challenge Section -->
          <div>
            <h2 class="text-2xl font-bold mb-4">
              {{ t("campaign.details.challenge") }}
            </h2>
            <p class="text-gray-600 leading-relaxed">
              {{ campaign.challenge.description }}
            </p>
          </div>

          <!-- Our Work Section -->
          <div>
            <h2 class="text-2xl font-bold mb-4">
              {{ t("campaign.details.our_work") }}
            </h2>
            <p class="text-gray-600 leading-relaxed">
              {{ campaign.work.description }}
            </p>
          </div>
        </div>

        <!-- Right Column - Donation -->
        <div class="lg:sticky lg:top-4">
          <div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <!-- Progress Section -->
            <div class="space-y-6">
              <!-- Main Amount -->
              <div>
                <h2 class="text-4xl font-bold mb-1">
                  RM {{ formatNumber(campaign.raised) }}
                </h2>
                <div class="flex items-center text-gray-600 text-sm">
                  <span>RM {{ formatNumber(campaign.raised) }}</span>
                  <span class="text-gray-400 mx-1"
                    >(RM
                    {{ formatNumber(campaign.distributed) }} distributed)</span
                  >
                  <span>of RM {{ formatNumber(campaign.target) }}</span>
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
                      width: `${Math.min((campaign.distributed / campaign.target) * 100, 100)}%`,
                    }"
                  ></div>
                  <!-- Raised Progress -->
                  <div
                    class="h-full bg-gray-900 rounded-full absolute"
                    :style="{
                      width: `${Math.min(((campaign.raised - campaign.distributed) / campaign.target) * 100, 100)}%`,
                      left: `${Math.min((campaign.distributed / campaign.target) * 100, 100)}%`,
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

              <!-- Stats -->
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-3xl font-bold">
                    {{ formatNumber(campaign.supporters) }}
                  </p>
                  <p class="text-gray-600">supporters</p>
                </div>
                <div>
                  <p class="text-3xl font-bold">
                    RM {{ formatNumber(campaign.distributed) }}
                  </p>
                  <p class="text-gray-600">distributed</p>
                </div>
              </div>
            </div>

            <!-- Campaign Message -->
            <p
              class="text-gray-600 mb-6 text-center px-4 border-l-4 border-primary/20 bg-primary/5 py-3 rounded"
            >
              {{ t("campaign.details.campaign_message") }}
            </p>

            <!-- Donation Amount Selection -->
            <div class="space-y-6">
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
                    {{ t("campaign.details.popular") }}
                  </span>
                </button>
              </div>

              <!-- Custom Amount Input -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t("campaign.details.custom_amount") }}
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
                    :placeholder="t('campaign.details.enter_amount')"
                    @focus="selectedAmount = null"
                  />
                </div>
              </div>

              <!-- Donation Button -->
              <button
                @click="handleDonate"
                class="w-full bg-primary hover:bg-primary-dark text-white font-medium py-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <Icon name="mdi:heart" />
                {{ t("campaign.donate_now") }}
              </button>

              <!-- Security Notice -->
              <div
                class="flex items-center justify-center gap-2 text-sm text-gray-500"
              >
                <Icon name="mdi:shield-check" />
                {{ t("campaign.details.secure_payment") }}
              </div>
            </div>

            <!-- Recent Donors -->
            <div class="mt-8 pt-6 border-t border-gray-100">
              <h4 class="font-medium mb-4">
                {{ t("campaign.details.recent_donors") }}
              </h4>
              <div class="space-y-4">
                <div
                  v-for="(donor, index) in recentDonors"
                  :key="index"
                  class="flex items-center gap-3"
                >
                  <div
                    class="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center"
                  >
                    <span class="text-primary font-medium">{{
                      donor.name.charAt(0)
                    }}</span>
                  </div>
                  <div>
                    <p class="font-medium">{{ donor.name }}</p>
                    <p class="text-sm text-gray-500">
                      {{ formatCurrency(donor.amount) }}
                    </p>
                  </div>
                  <span class="ml-auto text-xs text-gray-400">{{
                    donor.time
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Milestones Section -->
      <div class="max-w-4xl mx-auto mt-12 md:mt-16">
        <!-- Section Header -->
        <div class="text-center mb-8 md:mb-12">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">
            {{ t("campaign.details.milestones") }}
          </h2>
          <p class="text-gray-600">
            {{ t("campaign.details.milestones_description") }}
          </p>
        </div>

        <!-- Milestones Timeline -->
        <div class="relative">
          <!-- Vertical Line -->
          <div
            class="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gray-200"
          ></div>

          <!-- Milestone Items -->
          <div class="space-y-8">
            <div
              v-for="(milestone, index) in milestones"
              :key="index"
              class="relative"
            >
              <!-- Milestone Card -->
              <div
                class="ml-12 md:ml-0 md:flex md:items-center"
                :class="index % 2 === 0 ? 'md:flex-row-reverse' : ''"
              >
                <!-- Timeline Dot -->
                <div
                  class="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2"
                  :class="{
                    'bg-green-500 border-green-500':
                      milestone.status === 'completed',
                    'bg-primary border-primary': milestone.status === 'current',
                    'bg-white border-gray-300': milestone.status === 'upcoming',
                  }"
                ></div>

                <!-- Content Card -->
                <div
                  class="bg-white rounded-xl shadow-sm p-6 md:w-[calc(50%-2rem)]"
                  :class="index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'"
                >
                  <!-- Status Badge -->
                  <div class="flex items-center justify-between mb-4">
                    <span
                      class="text-sm font-medium px-3 py-1 rounded-full"
                      :class="{
                        'bg-green-100 text-green-800':
                          milestone.status === 'completed',
                        'bg-primary/10 text-primary':
                          milestone.status === 'current',
                        'bg-gray-100 text-gray-600':
                          milestone.status === 'upcoming',
                      }"
                    >
                      {{ formatCurrency(milestone.amount) }}
                    </span>
                    <span
                      v-if="milestone.status === 'completed'"
                      class="text-xs text-gray-500"
                    >
                      {{ milestone.completedDate }}
                    </span>
                  </div>

                  <h3 class="text-lg font-semibold mb-2">
                    {{ milestone.title }}
                  </h3>
                  <p class="text-gray-600 text-sm">
                    {{ milestone.description }}
                  </p>

                  <!-- Progress Bar for Current Milestone -->
                  <div
                    v-if="milestone.status === 'current'"
                    class="mt-4 space-y-2"
                  >
                    <div
                      class="relative w-full h-2 bg-gray-100 rounded-full overflow-hidden"
                    >
                      <div
                        class="absolute left-0 top-0 h-full bg-primary rounded-full transition-all duration-500"
                        :style="{ width: `${milestone.progress}%` }"
                      ></div>
                    </div>
                    <p class="text-xs text-gray-500 text-right">
                      {{ milestone.progress }}% completed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Transparency Section -->
      <div class="bg-gray-50/50 py-8 md:py-16 mt-8 md:mt-12">
        <div class="container mx-auto px-4">
          <div class="max-w-7xl mx-auto">
            <!-- Section Header -->
            <div class="text-center mb-8 md:mb-12">
              <h2 class="text-2xl md:text-4xl font-bold mb-3 md:mb-4">
                {{ t("campaign.details.transparency_title") }}
              </h2>
              <p
                class="text-gray-600 text-sm md:text-base max-w-2xl mx-auto px-4"
              >
                {{ t("campaign.details.transparency_description") }}
              </p>
            </div>

            <!-- Stats Cards -->
            <div
              class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12"
            >
              <!-- Total Disbursed Card -->
              <div class="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <div class="flex items-center justify-between mb-3 md:mb-4">
                  <h3 class="text-gray-600 text-sm md:text-base">
                    {{ t("campaign.details.total_disbursed") }}
                  </h3>
                  <div class="bg-green-100 p-1.5 md:p-2 rounded-lg">
                    <Icon
                      name="mdi:cash-multiple"
                      class="text-green-600"
                      :size="isDesktop ? '24' : '20'"
                    />
                  </div>
                </div>
                <p class="text-xl md:text-2xl font-bold">
                  {{ formatCurrency(140000) }}
                </p>
                <p class="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                  {{ t("campaign.details.from_total_donations") }}
                </p>
              </div>

              <!-- Beneficiaries Card -->
              <div class="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                <div class="flex items-center justify-between mb-3 md:mb-4">
                  <h3 class="text-gray-600 text-sm md:text-base">
                    {{ t("campaign.details.beneficiaries") }}
                  </h3>
                  <div class="bg-blue-100 p-1.5 md:p-2 rounded-lg">
                    <Icon
                      name="mdi:account-group"
                      class="text-blue-600"
                      :size="isDesktop ? '24' : '20'"
                    />
                  </div>
                </div>
                <p class="text-xl md:text-2xl font-bold">4</p>
                <p class="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                  {{ t("campaign.details.organizations_helped") }}
                </p>
              </div>

              <!-- Last Update Card -->
              <div
                class="bg-white rounded-xl p-4 md:p-6 shadow-sm sm:col-span-2 md:col-span-1"
              >
                <div class="flex items-center justify-between mb-3 md:mb-4">
                  <h3 class="text-gray-600 text-sm md:text-base">
                    {{ t("campaign.details.last_update") }}
                  </h3>
                  <div class="bg-purple-100 p-1.5 md:p-2 rounded-lg">
                    <Icon
                      name="mdi:clock-outline"
                      class="text-purple-600"
                      :size="isDesktop ? '24' : '20'"
                    />
                  </div>
                </div>
                <p class="text-xl md:text-2xl font-bold">15 Mar 2024</p>
                <p class="text-xs md:text-sm text-gray-500 mt-1 md:mt-2">
                  {{ t("campaign.details.next_update_soon") }}
                </p>
              </div>
            </div>

            <!-- Transparency Table Section -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <!-- Table Header -->
              <div class="p-4 md:p-6 border-b border-gray-100">
                <div
                  class="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4"
                >
                  <h3 class="text-lg md:text-xl font-semibold">
                    {{ t("campaign.details.disbursement_history") }}
                  </h3>

                  <!-- Action Buttons -->
                  <div class="flex items-center gap-2 self-end md:self-auto">
                    <rs-button
                      variant="secondary"
                      size="sm"
                      class="text-xs md:text-sm px-2 md:px-3 py-1.5"
                    >
                      <Icon
                        name="mdi:filter-variant"
                        class="mr-1 md:mr-2"
                        :size="isDesktop ? '16' : '14'"
                      />
                      {{ t("campaign.details.filter") }}
                    </rs-button>
                    <rs-button
                      variant="primary"
                      size="sm"
                      class="text-xs md:text-sm px-2 md:px-3 py-1.5"
                    >
                      <Icon
                        name="mdi:download"
                        class="mr-1 md:mr-2"
                        :size="isDesktop ? '16' : '14'"
                      />
                      {{ t("campaign.details.export") }}
                    </rs-button>
                  </div>
                </div>
              </div>

              <!-- Table Component -->
              <rs-table
                :field="tableFields"
                :data="transparencyData"
                :options="tableOptions"
                :options-advanced="tableAdvancedOptions"
                :advanced="true"
                :page-size="5"
              >
                <!-- Amount Column -->
                <template #Amount="{ text }">
                  <span class="font-medium text-sm md:text-base">
                    {{ formatCurrency(text) }}
                  </span>
                </template>

                <!-- Status Column -->
                <template #Status="{ text }">
                  <span
                    class="px-2 md:px-3 py-0.5 md:py-1 rounded-full text-xs md:text-sm font-medium inline-flex items-center gap-1"
                    :class="{
                      'bg-green-100 text-green-800': text === 'Disbursed',
                      'bg-yellow-100 text-yellow-800': text === 'Processing',
                    }"
                  >
                    <Icon
                      :name="
                        text === 'Disbursed'
                          ? 'mdi:check-circle'
                          : 'mdi:clock-outline'
                      "
                      :size="isDesktop ? '16' : '14'"
                    />
                    {{ text }}
                  </span>
                </template>

                <!-- Purpose Column -->
                <template #Purpose="{ text }">
                  <div class="max-w-[200px] md:max-w-md text-sm md:text-base">
                    {{ text }}
                  </div>
                </template>
              </rs-table>

              <!-- Disbursement Flow Section -->
              <div class="bg-white rounded-xl shadow-sm p-6 mt-8">
                <h2 class="text-2xl font-bold mb-6">
                  {{ t("campaign.details.disbursement_flow") }}
                </h2>
                <p class="text-gray-600 mb-6">
                  {{ t("campaign.details.disbursement_flow_description") }}
                </p>
                <div id="sankey-diagram" class="w-full overflow-x-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stay Connected Section -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 lg:mt-16">
        <!-- Left Column - Form -->
        <div>
          <h2 class="text-3xl font-bold mb-4">
            {{ t("campaign.details.stay_connected") }}
          </h2>
          <p class="text-gray-600 mb-6">
            {{ t("campaign.details.stay_connected_description") }}
          </p>

          <FormKit type="form" @submit="handleStayConnected" :actions="false">
            <FormKit
              type="email"
              v-model="email"
              :placeholder="t('campaign.details.email')"
              validation="required|email"
              :validation-messages="{
                required: t('validation.required'),
                email: t('validation.email'),
              }"
              class="mb-4"
            />

            <FormKit
              type="textarea"
              v-model="message"
              :placeholder="t('campaign.details.message')"
              validation="required"
              :validation-messages="{
                required: t('validation.required'),
              }"
              class="mb-4"
              :rows="4"
            />

            <rs-button type="submit" variant="secondary" class="w-32">
              {{ t("campaign.details.submit") }}
            </rs-button>
          </FormKit>
        </div>

        <!-- Right Column - Image Grid -->
        <div class="grid grid-cols-2 gap-4">
          <img
            src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2613&auto=format&fit=crop"
            alt="Community Impact"
            class="aspect-square object-cover rounded-lg w-full h-full"
          />
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=2670&auto=format&fit=crop"
            alt="Environmental Protection"
            class="aspect-square object-cover rounded-lg w-full h-full"
          />
          <img
            src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=2670&auto=format&fit=crop"
            alt="Education Initiative"
            class="aspect-square object-cover rounded-lg w-full h-full"
          />
          <img
            src="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2670&auto=format&fit=crop"
            alt="Community Support"
            class="aspect-square object-cover rounded-lg w-full h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Swiper custom styles */
:deep(.swiper-pagination-bullet) {
  background: white;
  opacity: 0.7;
}

:deep(.swiper-pagination-bullet-active) {
  opacity: 1;
}

:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
  color: white;
}

@media (min-width: 1024px) {
  .lg\:sticky {
    position: sticky;
    align-self: start;
  }
}

/* Optional: Add animation for milestone cards */
.milestone-enter-active,
.milestone-leave-active {
  transition: all 0.3s ease;
}
.milestone-enter-from,
.milestone-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
