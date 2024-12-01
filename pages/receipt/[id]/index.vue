<script setup>
const { t } = useI18n();
const route = useRoute();
const { $swal } = useNuxtApp();

definePageMeta({
  layout: "landing",
});

const receipt = ref(null);
const receiptRef = ref(null);

// Add this composable to handle client-side only code
const isClient = ref(false);
onMounted(() => {
  isClient.value = true;
});

// Fetch receipt data
const fetchReceipt = async () => {
  try {
    const { data } = await useFetch(`/api/receipt/${route.params.id}`, {
      method: "GET",
    });

    if (data.value.status === 200) {
      receipt.value = data.value.data;
    } else {
      throw new Error(data.value.message);
    }
  } catch (error) {
    console.error("Error fetching receipt:", error);
    $swal
      .fire({
        title: "Error",
        text: "Failed to load receipt",
        icon: "error",
      })
      .then(() => {
        navigateTo("/");
      });
  }
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-MY", {
    style: "currency",
    currency: "MYR",
    minimumFractionDigits: 2,
  }).format(amount);
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Handle print receipt
const handlePrint = () => {
  if (!isClient.value) return;

  const printContent = receiptRef.value.innerHTML;
  const originalContent = document.body.innerHTML;

  // Create a new window for printing
  const printWindow = window.open("", "_blank");
  printWindow.document.open();
  printWindow.document.write(`
    <html>
      <head>
        <title>${t("receipt.title")} - ${receipt.value.id}</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
          @media print {
            body {
              padding: 20px;
            }
            .print\\:hidden {
              display: none !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="max-w-3xl mx-auto">
          ${printContent}
        </div>
      </body>
    </html>
  `);
  printWindow.document.close();

  // Wait for styles to load
  printWindow.onload = () => {
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
    };
  };
};

// Handle download PDF
const handleDownload = async () => {
  if (!isClient.value) return;

  try {
    // Show loading state
    $swal.fire({
      title: t("receipt.generating_pdf"),
      allowOutsideClick: false,
      didOpen: () => {
        $swal.showLoading();
      },
    });

    // Dynamically import jspdf and html2canvas
    const [{ default: jsPDF }, { default: html2canvas }] = await Promise.all([
      import("jspdf"),
      import("html2canvas"),
    ]);

    const element = receiptRef.value;
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`receipt-${receipt.value.id}.pdf`);

    // Close loading state
    $swal.close();

    // Show success message
    $swal.fire({
      title: t("receipt.download_success"),
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    $swal.fire({
      title: t("receipt.download_error"),
      text: error.message,
      icon: "error",
    });
  }
};

// Fetch data on component mount
onMounted(fetchReceipt);
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 md:py-12">
      <!-- Receipt Card -->
      <div class="max-w-3xl mx-auto">
        <!-- Back Button and Actions -->
        <div class="flex justify-between items-center mb-6 print:hidden">
          <!-- Back Button -->
          <NuxtLink
            to="/"
            class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Icon name="mdi:arrow-left" size="20" />
            {{ t("receipt.back_to_home") }}
          </NuxtLink>

          <!-- Actions -->
          <div class="flex gap-4">
            <button
              v-if="isClient"
              @click="handlePrint"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Icon name="mdi:printer" size="20" />
              {{ t("receipt.print") }}
            </button>
            <button
              v-if="isClient"
              @click="handleDownload"
              class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary/90"
            >
              <Icon name="mdi:download" size="20" />
              {{ t("receipt.download") }}
            </button>
          </div>
        </div>

        <!-- Receipt Content -->
        <div
          v-if="receipt"
          ref="receiptRef"
          class="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          <!-- Header -->
          <div class="border-b border-gray-200 p-6">
            <div class="flex justify-between items-start">
              <div>
                <h1 class="text-2xl font-bold text-gray-900">
                  {{ t("receipt.title") }}
                </h1>
                <p class="text-sm text-gray-500 mt-1">{{ receipt.id }}</p>
              </div>
              <div class="text-right">
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                  :class="{
                    'bg-green-100 text-green-800': receipt.status === 'success',
                    'bg-yellow-100 text-yellow-800':
                      receipt.status === 'pending',
                    'bg-red-100 text-red-800': receipt.status === 'failed',
                  }"
                >
                  <Icon
                    :name="
                      receipt.status === 'success'
                        ? 'mdi:check-circle'
                        : 'mdi:clock-outline'
                    "
                    size="16"
                  />
                  {{ receipt.status }}
                </span>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-6">
            <!-- Campaign Details -->
            <div class="flex gap-4">
              <img
                :src="receipt.campaign.image"
                :alt="receipt.campaign.title"
                class="w-20 h-20 rounded-lg object-cover"
              />
              <div>
                <h2 class="font-medium text-gray-900">
                  {{ receipt.campaign.title }}
                </h2>
                <p class="text-sm text-gray-500 mt-1">
                  {{ t("receipt.campaign_id") }}: {{ receipt.campaign.id }}
                </p>
              </div>
            </div>

            <!-- Donor Information -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-sm font-medium text-gray-500 mb-4">
                {{ t("receipt.donor_information") }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">{{ t("receipt.name") }}</p>
                  <p class="font-medium">{{ receipt.donor.name }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">{{ t("receipt.email") }}</p>
                  <p class="font-medium">{{ receipt.donor.email }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">{{ t("receipt.phone") }}</p>
                  <p class="font-medium">{{ receipt.donor.phone }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">{{ t("receipt.date") }}</p>
                  <p class="font-medium">{{ formatDate(receipt.date) }}</p>
                </div>
              </div>
            </div>

            <!-- Payment Details -->
            <div class="border-t border-gray-200 pt-6">
              <h3 class="text-sm font-medium text-gray-500 mb-4">
                {{ t("receipt.payment_details") }}
              </h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p class="text-sm text-gray-500">{{ t("receipt.amount") }}</p>
                  <p class="text-xl font-bold text-gray-900">
                    {{ formatCurrency(receipt.payment.amount) }}
                  </p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">
                    {{ t("receipt.payment_method") }}
                  </p>
                  <p class="font-medium">{{ receipt.payment.method }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">
                    {{ t("receipt.transaction_id") }}
                  </p>
                  <p class="font-medium">{{ receipt.payment.transactionId }}</p>
                </div>
                <div>
                  <p class="text-sm text-gray-500">{{ t("receipt.status") }}</p>
                  <p class="font-medium">{{ receipt.payment.status }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="border-t border-gray-200 p-6 bg-gray-50">
            <p class="text-sm text-gray-500 text-center">
              {{ t("receipt.thank_you") }}
            </p>
          </div>
        </div>
        <div v-else class="flex justify-center items-center h-64">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media print {
  .print\:hidden {
    display: none;
  }
}
</style>
