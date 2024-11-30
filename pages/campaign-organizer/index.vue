<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Dummy data
const allCampaigns = ref([
  {
    id: 1,
    name: "Education for All 2024",
    description: "Supporting educational initiatives across the country",
    creator: "John Smith",
    status: "Active",
    totalProjects: 1,
    totalFundsRaised: 150000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: 2,
    name: "Green City Initiative",
    description: "Environmental sustainability projects for urban areas",
    creator: "Emma Wilson",
    status: "Active",
    totalProjects: 8,
    totalFundsRaised: 85000,
    startDate: "2024-02-01",
    endDate: "2024-12-31",
  },
  {
    id: 3,
    name: "Healthcare Access Program",
    description: "Improving healthcare accessibility in rural areas",
    creator: "David Chen",
    status: "Upcoming",
    totalProjects: 5,
    totalFundsRaised: 0,
    startDate: "2024-04-01",
    endDate: "2024-12-31",
  },
]);

const userCampaigns = ref([
  {
    id: 1,
    name: "Education for All 2024",
    description: "Supporting educational initiatives across the country",
    status: "Active",
    totalProjects: 1,
    totalFundsRaised: 150000,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  },
  {
    id: 4,
    name: "Tech Skills Workshop",
    description: "Free programming workshops for underprivileged youth",
    status: "Active",
    totalProjects: 0,
    totalFundsRaised: 0,
    startDate: "2024-05-01",
    endDate: "2024-12-31",
  },
]);

// Methods
const createNewCampaign = () => {
  router.push('/campaign-organizer/create-campaign');
};

const navigateToCampaignManagement = (campaignId) => {
  router.push(`/campaign-organizer/campaign-management/${campaignId}`);
};

const navigateToCampaignDetails = (campaignId) => {
  router.push(`/campaign-organizer/campaign-detail/${campaignId}`);
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR',
  }).format(amount);
};

const deleteCampaign = async (campaignId) => {
  if (!confirm('Are you sure you want to delete this campaign?')) return;
  userCampaigns.value = userCampaigns.value.filter(c => c.id !== campaignId);
};
</script>

<template>
  <rs-card class="p-5">
    <div class="campaign-organizer p-4">
      <!-- Header Section -->
      <div class="mb-6 flex justify-between items-center">
        <h1 class="text-2xl font-bold">Campaign Organizer</h1>
        <button
          @click="createNewCampaign"
          class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
        >
          Create New Campaign
        </button>
      </div>

      <!-- Your Campaigns Section -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold mb-4">Your Campaigns</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-if="userCampaigns.length === 0"
            class="col-span-full text-gray-500 text-center py-8"
          >
            You haven't created any campaigns yet
          </div>
          <div
            v-for="campaign in userCampaigns"
            :key="campaign.id"
            class="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <!-- Campaign Card Content -->
            <div class="flex justify-between items-start mb-3">
              <h3 class="font-semibold">{{ campaign.name }}</h3>
              <span 
                class="px-2 py-1 rounded-full text-xs"
                :class="{
                  'bg-green-100 text-green-800': campaign.status === 'Active',
                  'bg-yellow-100 text-yellow-800': campaign.status === 'Draft',
                  'bg-blue-100 text-blue-800': campaign.status === 'Upcoming'
                }"
              >
                {{ campaign.status }}
              </span>
            </div>
            <p class="text-sm text-gray-600 mb-3">{{ campaign.description }}</p>
            
            <div class="space-y-2 mb-4">
              <div class="text-sm">
                <span class="font-medium">Projects:</span> {{ campaign.totalProjects }}
              </div>
              <div class="text-sm">
                <span class="font-medium">Funds Raised:</span> 
                {{ formatCurrency(campaign.totalFundsRaised) }}
              </div>
              <div class="text-sm">
                <span class="font-medium">Duration:</span> 
                {{ campaign.startDate }} - {{ campaign.endDate }}
              </div>
            </div>

            <div class="flex justify-end items-center gap-2 mt-4 border-t pt-4">
              <button
                class="text-primary hover:underline text-sm"
                @click="navigateToCampaignManagement(campaign.id)"
              >
                Manage
              </button>
              <button
                class="text-primary hover:underline text-sm"
                @click="router.push(`/campaign-organizer/edit-campaign/${campaign.id}`)"
              >
                Edit
              </button>
              <!-- <button 
                class="text-red-600 hover:underline text-sm"
                @click="deleteCampaign(campaign.id)"
              >
                Delete
              </button> -->
            </div>
          </div>
        </div>
      </div>

      <!-- All Campaigns Section -->
      <div>
        <h2 class="text-xl font-semibold mb-4">All Campaigns</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div
            v-if="allCampaigns.length === 0"
            class="col-span-full text-gray-500 text-center py-8"
          >
            No campaigns available
          </div>
          <div
            v-for="campaign in allCampaigns"
            :key="campaign.id"
            class="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <!-- Campaign Card Content -->
            <div class="flex justify-between items-start mb-3">
              <h3 class="font-semibold">{{ campaign.name }}</h3>
              <span 
                class="px-2 py-1 rounded-full text-xs"
                :class="{
                  'bg-green-100 text-green-800': campaign.status === 'Active',
                  'bg-yellow-100 text-yellow-800': campaign.status === 'Draft',
                  'bg-blue-100 text-blue-800': campaign.status === 'Upcoming'
                }"
              >
                {{ campaign.status }}
              </span>
            </div>
            
            <p class="text-sm text-gray-600 mb-3">{{ campaign.description }}</p>
            
            <div class="space-y-2 mb-4">
              <div class="text-sm">
                <span class="font-medium">Created by:</span> {{ campaign.creator }}
              </div>
              <div class="text-sm">
                <span class="font-medium">Projects:</span> {{ campaign.totalProjects }}
              </div>
              <div class="text-sm">
                <span class="font-medium">Funds Raised:</span> 
                {{ formatCurrency(campaign.totalFundsRaised) }}
              </div>
            </div>

            <div class="mt-4 flex justify-end items-center gap-2 mt-4 border-t pt-4">
              <button
                class="text-primary hover:underline text-sm"
                @click="navigateToCampaignDetails(campaign.id)"
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </rs-card>
    
</template>