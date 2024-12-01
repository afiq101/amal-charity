<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const projectId = route.params.id;

// Form states
const isLoading = ref(false);
const errors = ref({});
const showUserModal = ref(false);

// Project form data with initial empty state
const project = ref({
  campaignId: "",
  name: "",
  description: "",
  fundraisingGoal: "",
  startDate: "",
  endDate: "",
  milestones: [],
  recipients: [],
  roles: {
    volunteers: false,
    contributors: false,
    logistics: false,
  },
});

// New milestone form
const newMilestone = ref({
  title: "",
  amount: "",
  description: "",
});

// User management state
const newUser = ref({
  username: '',
  fullname: '',
  email: '',
  phone: '',
  roles: [],
  status: 'active',
  message: '',
});

// Project users list
const projectUsers = ref([]);

// Available roles for users
const availableRoles = [
  { id: 'coordinator', label: 'Coordinator' },
  { id: 'volunteer', label: 'Volunteer' },
  { id: 'contributor', label: 'Contributor' },
  { id: 'recipient', label: 'Recipient' },
  { id: 'logistics', label: 'Logistics' },
];

// Load project data
const loadProjectData = async () => {
  try {
    isLoading.value = true;
    // TODO: Replace with actual API call
    // const response = await api.projects.getById(projectId);
    // Dummy data for example
    const response = {
      name: "Rural School Development",
      description: "Building and equipping schools in rural areas",
      fundraisingGoal: 60000,
      startDate: "2024-03-01",
      endDate: "2024-08-31",
      milestones: [
        {
          id: 1,
          title: "Location Selection",
          amount: 10000,
          description: "Select and acquire suitable location",
          completed: true
        },
        // ... other milestones
      ],
      users: [
        {
          id: 1,
          username: 'johndoe',
          fullname: 'John Doe',
          email: 'john@example.com',
          phone: '+1234567890',
          roles: ['coordinator', 'volunteer'],
          status: 'active',
          message: 'Project coordinator'
        },
        // ... other users
      ]
    };

    // Populate form with existing data
    project.value = {
      ...project.value,
      ...response
    };
    projectUsers.value = response.users;
  } catch (error) {
    console.error('Failed to load project:', error);
    // Add error notification here
  } finally {
    isLoading.value = false;
  }
};

// Methods (reuse from create-project)
const addMilestone = () => {
  if (!newMilestone.value.title || !newMilestone.value.amount) return;

  project.value.milestones.push({
    id: Date.now(),
    ...newMilestone.value,
    completed: false,
  });

  newMilestone.value = {
    title: "",
    amount: "",
    description: "",
  };
};

const removeMilestone = (id) => {
  project.value.milestones = project.value.milestones.filter(m => m.id !== id);
};

// User management methods
const validateUserForm = () => {
  const errors = {};
  if (!newUser.value.username) errors.username = "Username is required";
  if (!newUser.value.fullname) errors.fullname = "Full name is required";
  if (!newUser.value.email) errors.email = "Email is required";
  if (!newUser.value.roles.length) errors.roles = "At least one role is required";
  if (!newUser.value.status) errors.status = "Status is required";
  
  return Object.keys(errors).length === 0;
};

const addUser = () => {
  if (!validateUserForm()) return;

  projectUsers.value.push({
    id: Date.now(),
    ...newUser.value,
  });

  newUser.value = {
    username: '',
    fullname: '',
    email: '',
    phone: '',
    roles: [],
    status: 'active',
    message: '',
  };
  
  showUserModal.value = false;
};

const removeUser = (userId) => {
  projectUsers.value = projectUsers.value.filter(user => user.id !== userId);
};

const getRoleLabels = (roleIds) => {
  return roleIds
    .map(id => availableRoles.find(role => role.id === id)?.label)
    .filter(Boolean)
    .join(', ');
};

const getStatusColor = (status) => {
  switch (status) {
    case 'active':
      return 'bg-green-100 text-green-800';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'inactive':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const updateProject = async () => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;
    // TODO: Implement API call
    // await api.projects.update(projectId, project.value);
    router.push('/campaign-organizer');
  } catch (error) {
    console.error('Failed to update project:', error);
  } finally {
    isLoading.value = false;
  }
};

const validateForm = () => {
  errors.value = {};
  if (!project.value.name) errors.value.name = "Name is required";
  if (!project.value.description) errors.value.description = "Description is required";
  if (!project.value.fundraisingGoal) errors.value.fundraisingGoal = "Fundraising goal is required";
  if (!project.value.startDate) errors.value.startDate = "Start date is required";
  if (!project.value.endDate) errors.value.endDate = "End date is required";
  
  return Object.keys(errors.value).length === 0;
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR',
  }).format(amount);
};

// Load project data on mount
onMounted(() => {
  loadProjectData();
});
</script>

<template>
  <rs-card class="p-5">
    <div class="">
      <div class="mb-6">
        <h1 class="text-2xl font-bold">Edit Project</h1>
        <p class="text-gray-600">Update your project details</p>
      </div>

      <form @submit.prevent="createProject" class="space-y-6">
        <!-- Basic Information -->
        <div class="space-y-4">
          <h2 class="text-xl font-semibold">Basic Information</h2>

          <!-- <div>
            <label class="block text-sm font-medium mb-1">Select Campaign</label>
            <select
              v-model="project.campaignId"
              class="w-full p-2 border rounded-lg"
              :class="{ 'border-red-500': errors.campaignId }"
            >
              <option value="">Select a campaign</option>
              <option
                v-for="campaign in availableCampaigns"
                :key="campaign.id"
                :value="campaign.id"
              >
                {{ campaign.name }} ({{ campaign.category }})
              </option>
            </select>
            <span v-if="errors.campaignId" class="text-red-500 text-sm">{{ errors.campaignId }}</span>
          </div> -->

          <div>
            <label class="block text-sm font-medium mb-1">Project Name</label>
            <input
              v-model="project.name"
              type="text"
              class="w-full p-2 border rounded-lg"
              :class="{ 'border-red-500': errors.name }"
            />
            <span v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Description</label>
            <textarea
              v-model="project.description"
              rows="3"
              class="w-full p-2 border rounded-lg"
              :class="{ 'border-red-500': errors.description }"
            ></textarea>
            <span v-if="errors.description" class="text-red-500 text-sm">{{ errors.description }}</span>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Fundraising Goal</label>
            <input
              v-model="project.fundraisingGoal"
              type="number"
              class="w-full p-2 border rounded-lg"
              :class="{ 'border-red-500': errors.fundraisingGoal }"
            />
            <span v-if="errors.fundraisingGoal" class="text-red-500 text-sm">{{ errors.fundraisingGoal }}</span>
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-1">Start Date</label>
              <input
                v-model="project.startDate"
                type="date"
                class="w-full p-2 border rounded-lg"
                :class="{ 'border-red-500': errors.startDate }"
              />
              <span v-if="errors.startDate" class="text-red-500 text-sm">{{ errors.startDate }}</span>
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">End Date</label>
              <input
                v-model="project.endDate"
                type="date"
                class="w-full p-2 border rounded-lg"
                :class="{ 'border-red-500': errors.endDate }"
              />
              <span v-if="errors.endDate" class="text-red-500 text-sm">{{ errors.endDate }}</span>
            </div>
          </div>
        </div>

        <!-- Milestones -->
        <div class="space-y-4">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold">Milestones</h2>
            <div class="flex gap-2">
              <input
                v-model="newMilestone.title"
                type="text"
                placeholder="Milestone title"
                class="p-2 border rounded-lg"
              />
              <input
                v-model="newMilestone.amount"
                type="number"
                placeholder="Amount"
                class="p-2 border rounded-lg w-32"
              />
              <button
                type="button"
                @click="addMilestone"
                class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
              >
                Add
              </button>
            </div>
          </div>

          <div class="space-y-2">
            <div
              v-for="milestone in project.milestones"
              :key="milestone.id"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div>
                <div class="font-medium">{{ milestone.title }}</div>
                <div class="text-sm text-gray-600">{{ milestone.description }}</div>
              </div>
              <div class="flex items-center gap-4">
                <div class="font-medium">{{ formatCurrency(milestone.amount) }}</div>
                <button
                  type="button"
                  @click="removeMilestone(milestone.id)"
                  class="text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- User -->
        <div class="space-y-6">
          <!-- Project Team Section -->
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <h2 class="text-xl font-semibold">Users</h2>
              <button
                type="button"
                @click="showUserModal = true"
                class="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
              >
                Add User
              </button>
            </div>

            <!-- Team Members List -->
            <div class="space-y-3">
              <div
                v-for="user in projectUsers"
                :key="user.id"
                class="border rounded-lg p-4"
              >
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="font-semibold">{{ user.fullname }}</h3>
                    <p class="text-sm text-gray-600">@{{ user.username }}</p>
                  </div>
                  <span 
                    class="px-2 py-1 rounded-full text-sm capitalize"
                    :class="getStatusColor(user.status)"
                  >
                    {{ user.status }}
                  </span>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                  <div class="text-sm">
                    <span class="text-gray-600">Email:</span>
                    <div>{{ user.email }}</div>
                  </div>
                  <div class="text-sm">
                    <span class="text-gray-600">Phone:</span>
                    <div>{{ user.phone || 'N/A' }}</div>
                  </div>
                  <div class="text-sm">
                    <span class="text-gray-600">Roles:</span>
                    <div>{{ getRoleLabels(user.roles) }}</div>
                  </div>
                </div>

                <div v-if="user.message" class="mt-2 text-sm text-gray-600">
                  {{ user.message }}
                </div>

                <div class="mt-3 flex justify-end">
                  <button
                    @click="removeUser(user.id)"
                    class="text-red-600 hover:text-red-800 text-sm"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Buttons -->
        <div class="flex justify-end gap-4">
          <button
            type="button"
            @click="router.back()"
            class="px-4 py-2 border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark disabled:opacity-50"
            :disabled="isLoading"
          >
            {{ isLoading ? 'Updating...' : 'Update Project' }}
          </button>
        </div>
      </form>

      <!-- User Modal - Same as create-project -->
        <!-- User Modal -->
      <div
        v-if="showUserModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      >
        <div class="bg-white rounded-lg p-6 max-w-2xl w-full">
          <h3 class="text-lg font-semibold mb-4">Add User</h3>
          
          <form @submit.prevent="addUser" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Username</label>
                <input
                  v-model="newUser.username"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Full Name</label>
                <input
                  v-model="newUser.fullname"
                  type="text"
                  class="w-full p-2 border rounded-lg"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input
                  v-model="newUser.email"
                  type="email"
                  class="w-full p-2 border rounded-lg"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label class="block text-sm font-medium mb-1">Phone (Optional)</label>
                <input
                  v-model="newUser.phone"
                  type="tel"
                  class="w-full p-2 border rounded-lg"
                  placeholder="Enter phone number"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Roles</label>
              <div class="flex flex-wrap gap-2">
                <label
                  v-for="role in availableRoles"
                  :key="role.id"
                  class="inline-flex items-center p-2 border rounded-lg cursor-pointer hover:bg-gray-50"
                  :class="{ 'bg-primary/10 border-primary': newUser.roles.includes(role.id) }"
                >
                  <input
                    type="checkbox"
                    :value="role.id"
                    v-model="newUser.roles"
                    class="hidden"
                  />
                  <span>{{ role.label }}</span>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Status</label>
              <select
                v-model="newUser.status"
                class="w-full p-2 border rounded-lg"
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium mb-1">Message (Optional)</label>
              <textarea
                v-model="newUser.message"
                rows="3"
                class="w-full p-2 border rounded-lg"
                placeholder="Add a note"
              ></textarea>
            </div>

            <div class="flex justify-end gap-4">
              <button
                type="button"
                @click="showUserModal = false"
                class="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </rs-card>
</template>