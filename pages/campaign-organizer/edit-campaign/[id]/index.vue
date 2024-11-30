<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// Form state
const isLoading = ref(false);
const errors = ref({});

// Available categories (same as create page)
const availableCategories = [
  { id: 'education', label: 'Education' },
  { id: 'housing', label: 'Housing' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'environment', label: 'Environment' },
  { id: 'social', label: 'Social Services' },
];

// Campaign data with dummy initial values
const campaign = ref({
  id: route.params.id,
  name: "Education for All 2024",
  description: "Supporting educational initiatives across the country",
  goals: "Provide educational resources and support to underprivileged communities",
  startDate: "2024-01-01",
  endDate: "2024-12-31",
  categories: ['education', 'social'],
  guidelines: "1. Projects must directly benefit educational institutions\n2. Clear budget allocation is required\n3. Monthly progress reports are mandatory",
  projectOrganizers: [
    "john.doe@example.com",
    "jane.smith@example.com"
  ],
  status: "Active",
});

// New organizer email input
const newOrganizerEmail = ref("");

// Methods
const validateForm = () => {
  errors.value = {};
  
  if (!campaign.value.name) errors.value.name = "Name is required";
  if (!campaign.value.description) errors.value.description = "Description is required";
  if (!campaign.value.goals) errors.value.goals = "Goals are required";
  if (!campaign.value.startDate) errors.value.startDate = "Start date is required";
  if (!campaign.value.endDate) errors.value.endDate = "End date is required";
  if (campaign.value.categories.length === 0) errors.value.categories = "Select at least one category";
  
  return Object.keys(errors.value).length === 0;
};

const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const addProjectOrganizer = () => {
  if (newOrganizerEmail.value && validateEmail(newOrganizerEmail.value)) {
    campaign.value.projectOrganizers.push(newOrganizerEmail.value);
    newOrganizerEmail.value = "";
  }
};

const removeProjectOrganizer = (email) => {
  campaign.value.projectOrganizers = campaign.value.projectOrganizers.filter(
    e => e !== email
  );
};

const updateCampaign = async () => {
  if (!validateForm()) return;
  
  try {
    isLoading.value = true;
    // TODO: Implement API call
    // await api.campaigns.update(campaign.value.id, campaign.value);
    router.push('/campaign-organizer');
  } catch (error) {
    console.error('Failed to update campaign:', error);
  } finally {
    isLoading.value = false;
  }
};

// Fetch campaign data on mount
onMounted(async () => {
  try {
    isLoading.value = true;
    // TODO: Implement API call
    // const response = await api.campaigns.get(route.params.id);
    // campaign.value = response;
  } catch (error) {
    console.error('Failed to fetch campaign:', error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <rs-card class="p-5">
    <div class="">
      <div class="mb-6 flex justify-between items-center">
        <div>
          <h1 class="text-2xl font-bold">Edit Campaign</h1>
          <p class="text-gray-600">Update your campaign details</p>
        </div>
        <div class="flex items-center gap-2">
          <span 
            class="px-3 py-1 rounded-full text-sm"
            :class="{
              'bg-green-100 text-green-800': campaign.status === 'Active',
              'bg-yellow-100 text-yellow-800': campaign.status === 'Draft'
            }"
          >
            {{ campaign.status }}
          </span>
        </div>
      </div>

      <form @submit.prevent="updateCampaign" class="space-y-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold">Basic Information</h2>
          
          <div>
            <label class="block text-sm font-medium mb-1">Campaign Name</label>
            <input
              v-model="campaign.name"
              type="text"
              class="w-full p-2 border rounded-lg"
              :class="{ 'border-red-500': errors.name }"
            />
            <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="campaign.description"
              rows="3"
              class="w-full p-2 border rounded-lg"
              :class="{ 'border-red-500': errors.description }"
            ></textarea>
            <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Campaign Goals</label>
            <textarea
              v-model="campaign.goals"
              rows="3"
              class="w-full p-2 border rounded-lg"
              :class="{ 'border-red-500': errors.goals }"
            ></textarea>
            <span v-if="errors.goals" class="text-red-500 text-sm">{{ errors.goals }}</span>
          </div>
        </div>

        <!-- Duration -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold">Campaign Duration</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Start Date</label>
              <input
                v-model="campaign.startDate"
                type="date"
                class="w-full p-2 border rounded-lg"
                :class="{ 'border-red-500': errors.startDate }"
              />
              <span v-if="errors.startDate" class="text-red-500 text-sm">{{ errors.startDate }}</span>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">End Date</label>
              <input
                v-model="campaign.endDate"
                type="date"
                class="w-full p-2 border rounded-lg"
                :class="{ 'border-red-500': errors.endDate }"
              />
              <span v-if="errors.endDate" class="text-red-500 text-sm">{{ errors.endDate }}</span>
            </div>
          </div>
        </div>

        <!-- Categories -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold">Categories</h2>
          
          <div class="flex flex-wrap gap-2">
            <label
              v-for="category in availableCategories"
              :key="category.id"
              class="inline-flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
              :class="{ 'bg-primary/10 border-primary': campaign.categories.includes(category.id) }"
            >
              <input
                type="checkbox"
                :value="category.id"
                v-model="campaign.categories"
                class="hidden"
              />
              <span>{{ category.label }}</span>
            </label>
          </div>
          <span v-if="errors.categories" class="text-red-500 text-sm">{{ errors.categories }}</span>
        </div>

        <!-- Guidelines -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold">Project Guidelines</h2>
          
          <div>
            <textarea
              v-model="campaign.guidelines"
              rows="4"
              placeholder="Enter guidelines for project organizers..."
              class="w-full p-2 border rounded-lg"
            ></textarea>
          </div>
        </div>

        <!-- Project Organizers -->
        <!-- <div class="space-y-4">
          <h2 class="text-xl font-semibold">Project Organizers</h2>
          
          <div class="flex gap-2">
            <input
              v-model="newOrganizerEmail"
              type="email"
              placeholder="Enter email address"
              class="flex-1 p-2 border rounded-lg"
            />
            <button
              type="button"
              @click="addProjectOrganizer"
              class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
            >
              Add
            </button>
          </div>

          <div class="space-y-2">
            <div
              v-for="email in campaign.projectOrganizers"
              :key="email"
              class="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <span>{{ email }}</span>
              <button
                type="button"
                @click="removeProjectOrganizer(email)"
                class="text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          </div>
        </div> -->

        <!-- Submit Buttons -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            @click="router.push('/campaign-organizer')"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Updating...' : 'Update Campaign' }}
          </button>
        </div>
      </form>
    </div>
  </rs-card>
    
</template>