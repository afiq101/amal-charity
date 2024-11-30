<script setup>
definePageMeta({
  title: "Dashboard",
  middleware: ["auth"],
  requiresAuth: true,
});

const donorProjects = ref([
  {
    name: "Sarah Johnson",
    amount: 5000,
    project: "Education Fund",
    startDate: "2024-03-15",
    endDate: "2024-06-15",
    status: "In Progress",
    milestones: [
      { progress: 10, fundUsed: 1000 }
    ],
    totalFundUsed: 3000
  },
  {
    name: "Michael Chen",
    amount: 7500,
    project: "Healthcare Initiative",
    startDate: "2024-02-01",
    endDate: "2024-08-30",
    status: "In Progress",
    milestones: [
      { progress: 40, fundUsed: 1500 }
    ],
    totalFundUsed: 6500
  },
  {
    name: "Emma Williams",
    amount: 3750,
    project: "Community Center",
    startDate: "2024-03-01",
    endDate: "2024-05-30",
    status: "Planning",
    milestones: [
      { progress: 45, fundUsed: 1500 }
    ],
    totalFundUsed: 2500
  }
]);

const volunteerStats = ref({
  campaignsJoined: 5,
  activeProjects: 3,
  totalTasks: 25,
  taskStatus: {
    completed: 8,
    inProgress: 12,
    pending: 5
  }
});

const volunteerProjects = ref([
  {
    project: "Beach Cleanup Drive",
    tasks: 5,
    status: "In Progress",
    completedTasks: 2
  },
  {
    project: "Food Bank Distribution",
    tasks: 3,
    status: "Pending",
    completedTasks: 0
  },
  {
    project: "Tree Planting Initiative",
    tasks: 7,
    status: "Completed",
    completedTasks: 7
  }
]);

// Add this new ref for beneficiary data
const beneficiaryAids = ref([
  {
    projectName: "Food Security Program",
    aids: [
      { name: "Monthly Food Pack", type: "Material", details: "Rice 10kg, Flour 5kg, Oil 2L" },
      { name: "Food Voucher", type: "Funds", details: "RM 150/month" }
    ]
  },
  {
    projectName: "Education Support",
    aids: [
      { name: "School Supplies", type: "Material", details: "Books, Stationery Set" },
      { name: "Tuition Classes", type: "Non-Material", details: "3 subjects" },
      { name: "Education Fund", type: "Funds", details: "RM 200/month" }
    ]
  },
  {
    projectName: "Elderly Care",
    aids: [
      { name: "Medical Supplies", type: "Material", details: "Monthly Medical Kit" },
      { name: "Home Care Service", type: "Non-Material", details: "Weekly Visit" },
      { name: "Healthcare Allowance", type: "Funds", details: "RM 300/month" }
    ]
  }
]);

// Add this new ref for project contributions
const projectContributions = ref([
  {
    date: "2024-03-20",
    contributor: "Sarah Chen",
    project: "Food Security Program",
    aidType: "Material",
    contribution: "Rice and Essential Foods",
    amount: "50kg",
    status: "Delivered"
  },
  {
    date: "2024-03-19",
    contributor: "John Smith",
    project: "Education Support",
    aidType: "Funds",
    contribution: "Education Fund",
    amount: "RM 2,000",
    status: "Processed"
  },
  {
    date: "2024-03-18",
    contributor: "Mary Johnson",
    project: "Elderly Care",
    aidType: "Non-Material",
    contribution: "Medical Consultation",
    amount: "20 hours",
    status: "Scheduled"
  },
  {
    date: "2024-03-17",
    contributor: "Tech Solutions Inc",
    project: "Education Support",
    aidType: "Material",
    contribution: "Laptops for Students",
    amount: "5 units",
    status: "In Transit"
  }
]);

</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <!-- Recent Donations -->
    <rs-card class="mt-6">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Recent Donations</h3>
          <button class="text-primary hover:text-primary-dark">View All</button>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Donate</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Milestones</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Disbursed</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(project, index) in donorProjects" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <!-- <div class="h-10 w-10 flex-shrink-0">
                      <img class="h-10 w-10 rounded-full" src="@/assets/img/avatar/user.webp" alt="" />
                    </div> -->
                    <div class="ml-4">
                      <!-- <div class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ project.name }}</div> -->
                      <div class="text-sm text-gray-500">RM {{ project.amount.toLocaleString() }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">{{ project.project }}</div>
                  <div class="text-sm text-gray-500">{{ project.status }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ new Date(project.startDate).toLocaleDateString() }} - 
                    {{ new Date(project.endDate).toLocaleDateString() }}
                  </div>
                  <div v-for="(milestone, mIndex) in project.milestones" :key="mIndex" class="mb-2">
                    <div class="flex justify-between text-sm mb-1">
                      <span class="text-gray-900 dark:text-gray-100">{{ milestone.name }}</span>
                      <span class="text-gray-500">{{ milestone.progress }}%</span>
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div 
                        class="bg-primary h-2 rounded-full" 
                        :style="{ width: milestone.progress + '%' }"
                      ></div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    RM {{ project.totalFundUsed.toLocaleString() }} / 
                    RM {{ project.amount.toLocaleString() }}
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mt-2">
                    <div 
                      class="bg-primary h-2.5 rounded-full" 
                      :style="{ width: (project.totalFundUsed / project.amount * 100) + '%' }"
                    ></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>

    <!-- Volunteer Activity -->
    <rs-card class="mt-6">
      <template #header>
        <h3 class="text-lg font-semibold">Volunteer Activity</h3>
      </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Summary Stats -->
          <div class="bg-primary/5 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">Campaigns Joined</div>
            <div class="text-2xl font-semibold text-primary mt-1">{{ volunteerStats.campaignsJoined }}</div>
          </div>
          <div class="bg-primary/5 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">Active Projects</div>
            <div class="text-2xl font-semibold text-primary mt-1">{{ volunteerStats.activeProjects }}</div>
          </div>
          <div class="bg-primary/5 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
            <div class="text-2xl font-semibold text-primary mt-1">{{ volunteerStats.totalTasks }}</div>
          </div>
        </div>

        <div class="flex flex-row">
          <!-- Active Projects List -->
          <div class="w-1/2 mr-5">
            <h4 class="text-base font-medium mb-4">Active Projects</h4>
            <div class="space-y-4">
              <div v-for="(project, index) in volunteerProjects" :key="index" 
                  class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div class="flex justify-between items-center mb-2">
                  <div>
                    <h5 class="font-medium">{{ project.project }}</h5>
                    <rs-badge
                      :variant="
                        project.status === 'Completed'
                          ? 'success'
                          : project.status === 'Pending'
                          ? 'warning'
                          : 'info'
                      "
                      class="mt-1"
                    >
                      {{ project.status }}
                    </rs-badge>
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ project.completedTasks }}/{{ project.tasks }} Tasks
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    class="bg-primary h-2 rounded-full" 
                    :style="{ width: (project.completedTasks / project.tasks * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
          <!-- Task Status Overview -->
          <div class="w-1/2">
            <h4 class="text-base font-medium mb-4">Overall Task Status</h4>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Completed</span>
                  <span class="font-medium">{{ volunteerStats.taskStatus.completed }} Tasks</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    class="bg-success h-2 rounded-full" 
                    :style="{ width: (volunteerStats.taskStatus.completed / volunteerStats.totalTasks * 100) + '%' }"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">In Progress</span>
                  <span class="font-medium">{{ volunteerStats.taskStatus.inProgress }} Tasks</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    class="bg-info h-2 rounded-full" 
                    :style="{ width: (volunteerStats.taskStatus.inProgress / volunteerStats.totalTasks * 100) + '%' }"
                  ></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-gray-600 dark:text-gray-400">Pending</span>
                  <span class="font-medium">{{ volunteerStats.taskStatus.pending }} Tasks</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                  <div 
                    class="bg-warning h-2 rounded-full" 
                    :style="{ width: (volunteerStats.taskStatus.pending / volunteerStats.totalTasks * 100) + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Project Aid Distribution -->
    <rs-card class="mt-6">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Project Aid Distribution</h3>
          <button class="text-primary hover:text-primary-dark">View All</button>
        </div>
      </template>
      <template #body>
        <!-- Project Groups -->
        <div class="space-y-6">
          <div v-for="project in beneficiaryAids" :key="project.projectName" 
               class="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-5">
            <!-- Project Header -->
            <h4 class="text-base font-medium mb-4 text-gray-900 dark:text-gray-100">
              {{ project.projectName }}
            </h4>
            
            <!-- Aid Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div v-for="aid in project.aids" :key="aid.name" 
                   class="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700
                          transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <!-- Aid Type Badge -->
                <div class="flex justify-between items-start mb-3">
                  <rs-badge
                    :variant="
                      aid.type === 'Material'
                        ? 'success'
                        : aid.type === 'Non-Material'
                        ? 'info'
                        : 'warning'
                    "
                    class="!rounded-lg"
                  >
                    {{ aid.type }}
                  </rs-badge>
                  
                  <!-- Icon based on type -->
                  <div class="text-gray-400">
                    <Icon 
                      :name="
                        aid.type === 'Material'
                          ? 'material-symbols:inventory-2-outline'
                          : aid.type === 'Non-Material'
                          ? 'material-symbols-light:support-agent-outline'
                          : 'material-symbols:payments-outline'
                      "
                      size="1.5rem"
                    />
                  </div>
                </div>
                
                <!-- Aid Name -->
                <h5 class="font-medium text-gray-900 dark:text-gray-100 mb-2">
                  {{ aid.name }}
                </h5>
                
                <!-- Aid Details -->
                <div class="text-sm text-gray-500">
                  {{ aid.details }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </rs-card>

    <!-- Project Contributions -->
    <rs-card class="mt-6">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Project Contributions</h3>
          <button class="text-primary hover:text-primary-dark">View All</button>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contributor</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aid Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contribution</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="contribution in projectContributions" :key="contribution.date" 
                  class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ new Date(contribution.date).toLocaleDateString() }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ contribution.contributor }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ contribution.project }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <rs-badge
                    :variant="
                      contribution.aidType === 'Material'
                        ? 'success'
                        : contribution.aidType === 'Non-Material'
                        ? 'info'
                        : 'warning'
                    "
                  >
                    {{ contribution.aidType }}
                  </rs-badge>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ contribution.contribution }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ contribution.amount }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <rs-badge
                    :variant="
                      contribution.status === 'Delivered'
                        ? 'success'
                        : contribution.status === 'Processed'
                        ? 'info'
                        : contribution.status === 'Scheduled'
                        ? 'warning'
                        : 'primary'
                    "
                  >
                    {{ contribution.status }}
                  </rs-badge>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>

  </div>
</template>
