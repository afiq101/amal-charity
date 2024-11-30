<script setup>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Campaign details
const campaign = ref({
  id: route.params.id,
  name: "Education for All 2024",
  totalFundsRaised: 150000,
  availableFunds: 120000,
  distributedFunds: 30000,
});

// Projects under this campaign
const projects = ref([
  {
    id: 1,
    name: "Rural School Development",
    description: "Building and equipping schools in rural areas",
    organizer: "John Doe",
    status: "Active",
    totalBudget: 50000,
    receivedFunds: 15000,
    currentMilestone: "Construction phase 1",
    lastAllocation: "2024-02-15",
  },
  {
    id: 2,
    name: "Digital Learning Initiative",
    description: "Providing tablets and internet access to students",
    organizer: "Jane Smith",
    status: "Active",
    totalBudget: 75000,
    receivedFunds: 15000,
    currentMilestone: "Equipment procurement",
    lastAllocation: "2024-02-20",
  },
]);

// Fund allocation state
const selectedProject = ref(null);
const allocationAmount = ref("");
const showAllocationModal = ref(false);
const allocationNote = ref("");

// Computed
const remainingBudget = computed(() => {
  if (!selectedProject.value) return 0;
  const project = projects.value.find(p => p.id === selectedProject.value);
  return project ? project.totalBudget - project.receivedFunds : 0;
});

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR',
  }).format(amount);
};

const openAllocationModal = (projectId) => {
  selectedProject.value = projectId;
  allocationAmount.value = "";
  allocationNote.value = "";
  showAllocationModal.value = true;
};

const validateAllocation = () => {
  const amount = Number(allocationAmount.value);
  if (!amount || amount <= 0) return false;
  if (amount > campaign.value.availableFunds) return false;
  if (amount > remainingBudget.value) return false;
  return true;
};

const allocateFunds = async () => {
  if (!validateAllocation()) return;

  try {
    const amount = Number(allocationAmount.value);
    // Update project funds
    const project = projects.value.find(p => p.id === selectedProject.value);
    if (project) {
      project.receivedFunds += amount;
      project.lastAllocation = new Date().toISOString().split('T')[0];
    }

    // Update campaign funds
    campaign.value.availableFunds -= amount;
    campaign.value.distributedFunds += amount;

    // TODO: Implement API call
    // await api.allocateFunds({
    //   campaignId: campaign.value.id,
    //   projectId: selectedProject.value,
    //   amount,
    //   note: allocationNote.value
    // });

    showAllocationModal.value = false;
  } catch (error) {
    console.error('Failed to allocate funds:', error);
  }
};
</script>

<template>
  <div class="funds-distribution p-4 max-w-6xl mx-auto">
    <!-- Header -->
    <div class="bg-white rounded-lg p-6 shadow-sm mb-6">
      <h1 class="text-2xl font-bold mb-4">Funds Distribution</h1>
      <h2 class="text-lg text-gray-600 mb-4">{{ campaign.name }}</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Total Funds Raised</div>
          <div class="text-xl font-semibold">{{ formatCurrency(campaign.totalFundsRaised) }}</div>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Available Funds</div>
          <div class="text-xl font-semibold">{{ formatCurrency(campaign.availableFunds) }}</div>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Distributed Funds</div>
          <div class="text-xl font-semibold">{{ formatCurrency(campaign.distributedFunds) }}</div>
        </div>
      </div>
    </div>

    <!-- Projects List -->
    <div class="bg-white rounded-lg p-6 shadow-sm">
      <h2 class="text-xl font-semibold mb-4">Projects</h2>

      <div class="space-y-4">
        <div
          v-for="project in projects"
          :key="project.id"
          class="border rounded-lg p-4"
        >
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="font-semibold">{{ project.name }}</h3>
              <p class="text-sm text-gray-600">{{ project.description }}</p>
            </div>
            <button
              @click="openAllocationModal(project.id)"
              class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
              :disabled="campaign.availableFunds <= 0"
            >
              Allocate Funds
            </button>
          </div>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span class="text-gray-600">Organizer:</span>
              <div class="font-medium">{{ project.organizer }}</div>
            </div>
            <div>
              <span class="text-gray-600">Total Budget:</span>
              <div class="font-medium">{{ formatCurrency(project.totalBudget) }}</div>
            </div>
            <div>
              <span class="text-gray-600">Received Funds:</span>
              <div class="font-medium">{{ formatCurrency(project.receivedFunds) }}</div>
            </div>
            <div>
              <span class="text-gray-600">Current Milestone:</span>
              <div class="font-medium">{{ project.currentMilestone }}</div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="mt-4">
            <div class="flex justify-between text-sm mb-1">
              <span>Budget Progress</span>
              <span>{{ Math.round((project.receivedFunds / project.totalBudget) * 100) }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-primary h-2 rounded-full"
                :style="{ width: `${(project.receivedFunds / project.totalBudget) * 100}%` }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Allocation Modal -->
    <div
      v-if="showAllocationModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Allocate Funds</h3>
        
        <form @submit.prevent="allocateFunds" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Amount</label>
            <input
              v-model="allocationAmount"
              type="number"
              min="0"
              :max="Math.min(campaign.availableFunds, remainingBudget)"
              class="w-full p-2 border rounded-lg"
              placeholder="Enter amount"
            />
            <div class="text-sm text-gray-600 mt-1">
              Available: {{ formatCurrency(campaign.availableFunds) }}
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Note (Optional)</label>
            <textarea
              v-model="allocationNote"
              rows="3"
              class="w-full p-2 border rounded-lg"
              placeholder="Add a note about this allocation"
            ></textarea>
          </div>

          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="showAllocationModal = false"
              class="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
              :disabled="!validateAllocation()"
            >
              Allocate
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>