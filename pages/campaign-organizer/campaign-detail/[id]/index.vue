<script setup>

const route = useRoute();
const router = useRouter();

// States
const isLoading = ref(false);

// Dummy campaign details
const campaign = ref({
  id: route.params.id,
  name: "Education for All 2024",
  description: "Supporting educational initiatives across the country",
  goals: "Provide educational resources and support to underprivileged communities",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  status: "Active",
  categories: ['Education', 'Social Services'],
  creator: "John Smith",
  totalFundsRaised: 150000,
  fundRaisingGoal: 200000,
  guidelines: `
    1. Projects must directly benefit educational institutions
    2. Clear budget allocation is required
    3. Monthly progress reports are mandatory
    4. Focus on sustainable impact
  `,
});

// Dummy projects data
const projects = ref([
  {
    id: 1,
    name: "Rural School Development",
    description: "Building and equipping schools in rural areas",
    organizer: "Jane Cooper",
    status: "Active",
    progress: 75,
    fundsRaised: 45000,
    fundRaisingGoal: 60000,
    startDate: "2024-02-01",
    endDate: "2024-06-30",
    milestones: [
      { 
        title: "Location and Planning",
        amount: 15000,
        status: 'completed', // completed, in-progress, pending
        description: "Secure location and complete architectural plans"
      },
      { 
        title: "Foundation and Structure",
        amount: 25000,
        status: 'in-progress',
        description: "Complete foundation work and basic structure"
      },
      { 
        title: "Facilities and Equipment",
        amount: 20000,
        status: 'pending',
        description: "Install facilities and provide educational equipment"
      }
    ],
  },
  {
    id: 2,
    name: "Digital Learning Initiative",
    description: "Providing tablets and internet access to students",
    organizer: "Robert Fox",
    status: "Active",
    progress: 0,
    fundsRaised: 0,
    fundRaisingGoal: 40000,
    startDate: "2024-03-01",
    endDate: "2024-08-31",
    milestones: [],
  },
]);

const errors = ref({});

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR',
  }).format(amount);
};

const validateProjectForm = () => {
  errors.value = {};
  if (!newProject.value.name) errors.value.name = "Name is required";
  if (!newProject.value.description) errors.value.description = "Description is required";
  if (!newProject.value.fundRaisingGoal) errors.value.fundRaisingGoal = "Fund Raising Goal is required";
  if (!newProject.value.startDate) errors.value.startDate = "Start date is required";
  if (!newProject.value.endDate) errors.value.endDate = "End date is required";
  
  return Object.keys(errors.value).length === 0;
};

const navigateToCreateProject = (campaignId) => {
  router.push(`/project-organizer/create-project`);
};

// Add method to calculate milestone progress
const calculateMilestoneProgress = (achieved, target) => {
  return Math.round((achieved / target) * 100);
};

const getMilestoneStatusColor = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Add these states
const expandedProjects = ref(new Set());
const showApplyModal = ref(false);
const selectedProjectId = ref(null);
const applyMessage = ref('');

// Methods for project expansion
const toggleProject = (projectId) => {
  if (expandedProjects.value.has(projectId)) {
    expandedProjects.value.delete(projectId);
  } else {
    expandedProjects.value.add(projectId);
  }
};

const isProjectExpanded = (projectId) => {
  return expandedProjects.value.has(projectId);
};

// Methods for apply modal
const openApplyModal = (projectId) => {
  selectedProjectId.value = projectId;
  applyMessage.value = '';
  showApplyModal.value = true;
};

const submitApplication = async () => {
  try {
    // TODO: Implement API call
    // await api.submitApplication({
    //   projectId: selectedProjectId.value,
    //   message: applyMessage.value
    // });
    
    showApplyModal.value = false;
    // Add success notification here
  } catch (error) {
    console.error('Failed to submit application:', error);
    // Add error notification here
  }
};

</script>

<template>
  <div class="campaign-detail p-4">
    <!-- Campaign Header -->
    <div class="bg-white rounded-lg p-6 shadow-sm mb-6">
      <div class="flex justify-between items-start mb-6">
        <div>
          <h1 class="text-2xl font-bold">{{ campaign.name }}</h1>
          <p class="text-gray-600">{{ campaign.description }}</p>
        </div>
        <span 
          class="px-3 py-1 rounded-full text-sm"
          :class="campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
        >
          {{ campaign.status }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Funds Raised</div>
          <div class="text-xl font-semibold">
            {{ formatCurrency(campaign.totalFundsRaised) }}
            <span class="text-sm text-gray-500">
              of {{ formatCurrency(campaign.fundRaisingGoal) }}
            </span>
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              class="bg-primary h-2 rounded-full"
              :style="{ width: `${(campaign.totalFundsRaised / campaign.fundRaisingGoal) * 100}%` }"
            ></div>
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Duration</div>
          <div class="text-xl font-semibold">
            {{ campaign.startDate }} - {{ campaign.endDate }}
          </div>
        </div>
        <div class="bg-gray-50 p-4 rounded-lg">
          <div class="text-sm text-gray-600">Categories</div>
          <div class="flex gap-2 mt-2">
            <span
              v-for="category in campaign.categories"
              :key="category"
              class="px-2 py-1 bg-gray-200 rounded-full text-sm"
            >
              {{ category }}
            </span>
          </div>
        </div>
      </div>

      <div class="space-y-4">
        <div>
          <h2 class="font-semibold mb-2">Campaign Goals</h2>
          <p class="text-gray-600">{{ campaign.goals }}</p>
        </div>
        <div>
          <h2 class="font-semibold mb-2">Project Guidelines</h2>
          <div class="text-gray-600 whitespace-pre-line">{{ campaign.guidelines }}</div>
        </div>
      </div>
    </div>

    <!-- Projects Section -->
    <div class="mt-8">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold">Projects</h2>
        <button
          @click="navigateToCreateProject"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          Create Project
        </button>
      </div>
      
      <div class="space-y-4">
        <div
          v-for="project in projects"
          :key="project.id"
          class="border rounded-lg overflow-hidden"
        >
          <!-- Project Header -->
          <div class="p-4 bg-white">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4 flex-1">
                <button
                  @click="toggleProject(project.id)"
                  class="text-gray-500 hover:text-gray-700"
                >
                <div v-if="!isProjectExpanded(project.id)">
                  <Icon name="material-symbols:expand-circle-up-outline" />
                </div>
                <div v-else>
                  <Icon name="material-symbols:expand-circle-down-outline" />
                </div>
                </button>
                <h3 class="font-semibold">{{ project.name }}</h3>
              </div>
              
              <div class="flex items-center gap-2">
                <button
                  @click="openApplyModal(project.id)"
                  class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark text-sm"
                >
                  Apply
                </button>
              </div>
            </div>
            
            <p class="text-sm text-gray-600 mt-2">{{ project.description }}</p>
          </div>

          <!-- Collapsible Content -->
          <div
            v-show="isProjectExpanded(project.id)"
            class="border-t bg-gray-50"
          >
            <div class="p-4">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <div class="text-sm text-gray-600">Organizer</div>
                  <div class="font-medium">{{ project.organizer }}</div>
                </div>
                <div>
                  <div class="text-sm text-gray-600">Duration</div>
                  <div class="font-medium">{{ project.startDate }} - {{ project.endDate }}</div>
                </div>
                <div>
                <div class="text-sm text-gray-600">Funds Raised</div>
                  <div class="font-medium">
                    {{ formatCurrency(project.fundsRaised) }}
                    <span class="text-gray-500">
                      of {{ formatCurrency(project.fundRaisingGoal) }}
                    </span>
                  </div>
                </div>
              </div>

              <div 
                v-if="project.milestones.length" 
                class="border-t mt-4 pt-4"
              >
                <h4 class="font-medium mb-3">Milestones</h4>
                <div class="space-y-3">
                  <div
                    v-for="(milestone, index) in project.milestones"
                    :key="index"
                    class="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="flex-1">
                      <div class="flex items-center gap-3 mb-1">
                        <span class="font-medium">{{ milestone.title }}</span>
                        <span 
                          class="text-xs px-2 py-1 rounded-full capitalize"
                          :class="getMilestoneStatusColor(milestone.status)"
                        >
                          {{ milestone.status.replace('-', ' ') }}
                        </span>
                      </div>
                      <p class="text-sm text-gray-600">{{ milestone.description }}</p>
                    </div>
                    <div class="text-right ml-4">
                      <div class="font-medium">{{ formatCurrency(milestone.amount) }}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Simple Total Summary -->
              <div class="mt-4 pt-4 border-t">
                <div class="flex justify-between items-center">
                  <span class="font-medium">Total Progress</span>
                  <span>{{ formatCurrency(project.fundsRaised) }} of {{ formatCurrency(project.fundRaisingGoal) }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    class="bg-primary h-2 rounded-full"
                    :style="{ width: `${(project.fundsRaised / project.fundRaisingGoal) * 100}%` }"
                  ></div>
                </div>
              </div>
            </div>
            
            

              
          </div>
        </div>
      </div>
    </div>

    <!-- Apply Modal -->
    <div
      v-if="showApplyModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4"></h3>
        
        <form @submit.prevent="submitApplication" class="space-y-4">
          <div>
            <h4>Project: Rural School Development</h4>
            <label>Building and equipping schools in rural areas</label>
            <label class="block text-sm font-medium mb-1 mt-4">Message</label>
            <textarea
              v-model="applyMessage"
              rows="4"
              class="w-full p-2 border rounded-lg"
              placeholder=""
            ></textarea>
          </div>

          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="showApplyModal = false"
              class="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
              :disabled="!applyMessage.trim()"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
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

.project-transition {
  transition: all 0.3s ease-in-out;
}
</style>