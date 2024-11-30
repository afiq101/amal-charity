<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Dummy data for demonstration
const campaignDetails = ref({
  id: 1,
  name: "Education for All 2024",
  description: "Supporting educational initiatives across the country",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  status: "Active",
  totalProjects: 1,
  totalFundsRaised: 150000,
  availableFunds: 120000, // Funds not yet distributed
  distributedFunds: 30000, // Funds already distributed
});

const projects = ref([
  {
    id: 1,
    name: "Rural School Development",
    organizer: "John Doe",
    status: "In Progress",
    fundsRaised: 45000,
    targetAmount: 50000,
    milestones: [
      { 
        title: "Location and Planning",
        targetAmount: 15000,
        achieved: 15000,
        completed: true,
        description: "Secure location and complete architectural plans"
      },
      { 
        title: "Foundation and Structure",
        targetAmount: 25000,
        achieved: 20000,
        completed: false,
        description: "Complete foundation work and basic structure"
      },
      // { 
      //   title: "Facilities and Equipment",
      //   targetAmount: 20000,
      //   achieved: 10000,
      //   completed: false,
      //   description: "Install facilities and provide educational equipment"
      // }
    ],
    lastUpdate: "2024-03-15",
  },
  {
    id: 2,
    name: "Digital Learning Initiative",
    organizer: "Jane Smith",
    status: "Pending Approval",
    fundsRaised: 0,
    targetAmount: 75000,
    milestones: [],
    lastUpdate: "2024-03-18",
  },
  // Add more dummy projects as needed
]);

const pendingProjects = ref([
  {
    id: 3,
    name: "Community Library Project",
    organizer: "Mike Johnson",
    proposedBudget: 30000,
    submissionDate: "2024-03-17",
    description: "Establishing a community library in downtown area",
    documents: ["proposal.pdf", "budget.xlsx"],
  },
]);

// Tabs state
const activeTab = ref('overview');

// Methods
const approveProject = (projectId) => {
  const project = pendingProjects.value.find(p => p.id === projectId);
  if (project) {
    pendingProjects.value = pendingProjects.value.filter(p => p.id !== projectId);
    projects.value.push({
      ...project,
      status: 'In Progress',
      fundsRaised: 0,
      milestones: [],
      lastUpdate: new Date().toISOString().split('T')[0],
    });
  }
};

// Add method to calculate milestone progress
const calculateMilestoneProgress = (achieved, target) => {
  return Math.round((achieved / target) * 100);
};

const rejectProject = (projectId) => {
  pendingProjects.value = pendingProjects.value.filter(p => p.id !== projectId);
};

const calculateProgress = (fundsRaised, targetAmount) => {
  return (fundsRaised / targetAmount) * 100;
};

// Format currency
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR',
  }).format(amount);
};

// Add navigation method
const navigateToFundsDistribution = () => {
  router.push(`/campaign-organizer/fund-distribution/${campaignDetails.value.id}`);
};
</script>

<template>
  <div class="campaign-management p-4">
    <!-- Campaign Header -->
    <div class="bg-white rounded-lg p-6 shadow-sm mb-6">
      <div class="flex justify-between items-start mb-4">
        <div>
          <h1 class="text-2xl font-bold">{{ campaignDetails.name }}</h1>
          <p class="text-gray-600">{{ campaignDetails.description }}</p>
        </div>
        <span 
          class="px-3 py-1 rounded-full text-sm"
          :class="campaignDetails.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
        >
          {{ campaignDetails.status }}
        </span>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Total Projects</div>
          <div class="text-xl font-semibold">{{ campaignDetails.totalProjects }}</div>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Total Funds Raised</div>
          <div class="text-xl font-semibold">{{ formatCurrency(campaignDetails.totalFundsRaised) }}</div>
          <div>
            <button
            @click="navigateToFundsDistribution"
            class="mt-2 w-full bg-primary text-white px-3 py-1 rounded-lg hover:bg-primary-dark text-sm"
            >
              Manage Distribution
            </button>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Duration</div>
          <div class="text-xl font-semibold">
            {{ campaignDetails.startDate }} - {{ campaignDetails.endDate }}
          </div>
        </div>
      </div>
    </div>

    <!-- Tabs -->
    <div class="mb-6">
      <div class="border-b">
        <nav class="flex space-x-8">
          <button
            v-for="tab in ['overview', 'pending']"
            :key="tab"
            @click="activeTab = tab"
            class="py-4 px-1 border-b-2 font-medium text-sm"
            :class="activeTab === tab ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'"
          >
            {{ tab.charAt(0).toUpperCase() + tab.slice(1) }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Tab Content -->
    <div class="bg-white rounded-lg shadow-sm">
      <!-- Overview Tab -->
      <div v-if="activeTab === 'overview'" class="p-6">
        <div class="grid grid-cols-1 gap-6">
          <div
            v-for="project in projects"
            :key="project.id"
            class="border rounded-lg p-4"
          >
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-semibold">{{ project.name }}</h3>
                <p class="text-sm text-gray-600">Organized by {{ project.organizer }}</p>
              </div>
              <!-- <span 
                class="px-3 py-1 rounded-full text-sm"
                :class="project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'"
              >
                {{ project.status }}
              </span> -->
            </div>

            <div class="mb-4">
              <div class="flex justify-between text-sm mb-1">
                <span>Funds Raised</span>
                <span>{{ formatCurrency(project.fundsRaised) }} of {{ formatCurrency(project.targetAmount) }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary h-2 rounded-full"
                  :style="{ width: `${calculateProgress(project.fundsRaised, project.targetAmount)}%` }"
                ></div>
              </div>
            </div>

            <div 
            v-if="project.milestones.length" 
            class="border-t mt-4 pt-4"
          >
            <h4 class="font-medium mb-3">Project Milestones</h4>
            <div class="space-y-4">
              <div
                v-for="(milestone, index) in project.milestones"
                :key="index"
                class="bg-gray-50 rounded-lg p-4"
              >
                <div class="flex justify-between items-start mb-2">
                  <div class="flex items-center gap-2">
                    <span
                      class="w-6 h-6 rounded-full flex items-center justify-center text-sm"
                      :class="milestone.completed ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-600'"
                    >
                      {{ index + 1 }}
                    </span>
                    <span class="font-medium">{{ milestone.title }}</span>
                  </div>
                  <span 
                    class="text-sm px-2 py-1 rounded-full"
                    :class="milestone.completed ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'"
                  >
                    {{ milestone.completed ? 'Completed' : 'In Progress' }}
                  </span>
                </div>

                <p class="text-sm text-gray-600 mb-3">
                  {{ milestone.description }}
                </p>

                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>
                      {{ formatCurrency(milestone.achieved) }} of {{ formatCurrency(milestone.targetAmount) }}
                      <span class="text-gray-500 ml-1">
                        ({{ calculateMilestoneProgress(milestone.achieved, milestone.targetAmount) }}%)
                      </span>
                    </span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full transition-all duration-300"
                      :class="milestone.completed ? 'bg-green-500' : 'bg-primary'"
                      :style="{ width: `${calculateMilestoneProgress(milestone.achieved, milestone.targetAmount)}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Milestone Timeline Connector -->
                <div 
                  v-if="index < project.milestones.length - 1"
                  class="h-6 w-px bg-gray-300 mx-auto my-2"
                ></div>
              </div>
            </div>

            <!-- Total Progress Summary -->
            <div class="mt-4 pt-4 border-t">
              <div class="flex justify-between text-sm mb-2">
                <span class="font-medium">Total Project Progress</span>
                <span>
                  {{ formatCurrency(project.fundsRaised) }} of {{ formatCurrency(project.targetAmount) }}
                  ({{ Math.round((project.fundsRaised / project.targetAmount) * 100) }}%)
                </span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary h-2 rounded-full transition-all duration-300"
                  :style="{ width: `${(project.fundsRaised / project.targetAmount) * 100}%` }"
                ></div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <!-- Pending Approvals Tab -->
      <div v-if="activeTab === 'pending'" class="p-6">
        <div class="space-y-4">
          <div
            v-for="project in pendingProjects"
            :key="project.id"
            class="border rounded-lg p-4"
          >
            <div class="mb-4">
              <h3 class="font-semibold">{{ project.name }}</h3>
              <p class="text-sm text-gray-600">Submitted by {{ project.organizer }}</p>
            </div>

            <div class="space-y-2 mb-4">
              <p class="text-sm">{{ project.description }}</p>
              <p class="text-sm">
                <span class="font-medium">Proposed Budget:</span>
                {{ formatCurrency(project.proposedBudget) }}
              </p>
              <p class="text-sm">
                <span class="font-medium">Submitted:</span>
                {{ project.submissionDate }}
              </p>
            </div>

            <div class="flex gap-2">
              <button
                @click="approveProject(project.id)"
                class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
              >
                Approve
              </button>
              <button
                @click="rejectProject(project.id)"
                class="border border-red-600 text-red-600 px-4 py-2 rounded-lg hover:bg-red-50"
              >
                Reject
              </button>
            </div>
          </div>

          <div
            v-if="pendingProjects.length === 0"
            class="text-center text-gray-500 py-8"
          >
            No pending projects to review
          </div>
        </div>
      </div>

      <!-- Updates Tab -->
      <!-- <div v-if="activeTab === 'updates'" class="p-6">
        <div class="space-y-4">
          <div
            v-for="project in projects"
            :key="project.id"
            class="border rounded-lg p-4"
          >
            <div class="mb-4">
              <h3 class="font-semibold">{{ project.name }}</h3>
              <p class="text-sm text-gray-600">Last updated: {{ project.lastUpdate }}</p>
            </div>

            <div class="space-y-2">
              <div class="flex justify-between text-sm">
                <span>Fundraising Progress</span>
                <span>{{ formatCurrency(project.fundsRaised) }} of {{ formatCurrency(project.targetAmount) }}</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  class="bg-primary h-2 rounded-full"
                  :style="{ width: `${calculateProgress(project.fundsRaised, project.targetAmount)}%` }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<style scoped>
.milestone-connector {
  position: relative;
}

.milestone-connector::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  width: 2px;
  height: 20px;
  background-color: #e5e7eb;
}
</style>