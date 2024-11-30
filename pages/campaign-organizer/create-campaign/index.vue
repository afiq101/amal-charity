<script setup>
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Campaign form data
const campaign = reactive({
  name: "",
  description: "",
  goals: "",
  startDate: "",
  endDate: "",
  categories: [],
  guidelines: "",
  projectOrganizers: [], // Array of email addresses
});

// Other reactive variables
const newOrganizerEmail = ref("");
const errors = reactive({});

// Available categories
const availableCategories = [
  { id: 'education', label: 'Education' },
  { id: 'housing', label: 'Housing' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'environment', label: 'Environment' },
  { id: 'social', label: 'Social Services' },
];

// Methods
const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validateForm = () => {
  errors.value = {};
  if (!campaign.name) errors.name = "Name is required";
  if (!campaign.description) errors.description = "Description is required";
  if (!campaign.goals) errors.goals = "Goals are required";
  if (!campaign.startDate) errors.startDate = "Start date is required";
  if (!campaign.endDate) errors.endDate = "End date is required";
  if (campaign.categories.length === 0) errors.categories = "Select at least one category";
  
  return Object.keys(errors).length === 0;
};

const addProjectOrganizer = () => {
  if (newOrganizerEmail.value && validateEmail(newOrganizerEmail.value)) {
    campaign.projectOrganizers.push(newOrganizerEmail.value);
    newOrganizerEmail.value = "";
  }
};

const removeProjectOrganizer = (email) => {
  campaign.projectOrganizers = campaign.projectOrganizers.filter(
    (e) => e !== email
  );
};

const createCampaign = async () => {
  if (!validateForm()) return;

  try {
    // TODO: Implement API call to create campaign
    await $api.campaigns.create(campaign);
    router.push('/campaign-organizer');
  } catch (error) {
    console.error('Failed to create campaign:', error);
  }
};

const navigateBack = () => {
  router.push('/campaign-organizer');
};
</script>

<template>
  <rs-card class="p-5">
    <div class="">
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Create New Campaign</h1>
        <p class="text-gray-600">Define your campaign details</p>
      </div>

      <form @submit.prevent="createCampaign" class="space-y-6">
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
          <h2 class="text-xl font-semibold">Invite Project Organizers</h2>
          
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

        <!-- Submit Button -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            @click="$router.push('/campaign-organizer')"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
          >
            Create Campaign
          </button>
        </div>
      </form>
    </div>
  </rs-card>
    
</template>