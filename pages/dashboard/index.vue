<script setup>
definePageMeta({
  title: "Dashboard",
  middleware: ["auth"],
  requiresAuth: true,
});

const donorProjects = ref([
  {
    amount: 5000,
    project: "Education Fund",
    startDate: "2024-03-15",
    endDate: "2024-06-15",
    status: "In Progress",
    targetAmount: 50000,
    disbursedBreakdown: [
      { category: "School Supplies", amount: 1000, color: "bg-primary" },
      { category: "Tuition Fees", amount: 1500, color: "bg-success" },
      { category: "Transportation", amount: 500, color: "bg-info" }
    ]
  },
  {
    amount: 7500,
    project: "Healthcare Initiative",
    startDate: "2024-02-01",
    endDate: "2024-08-30",
    status: "In Progress",
    targetAmount: 100000,
    disbursedBreakdown: [
      { category: "Medical Supplies", amount: 3000, color: "bg-primary" },
      { category: "Staff Wages", amount: 2500, color: "bg-success" },
      { category: "Facility Rental", amount: 1000, color: "bg-info" }
    ]
  },
  {
    amount: 3750,
    project: "Community Center",
    startDate: "2024-03-01",
    endDate: "2024-05-30",
    status: "Planning",
    targetAmount: 75000,
    disbursedBreakdown: [
      { category: "Construction", amount: 1500, color: "bg-primary" },
      { category: "Equipment", amount: 700, color: "bg-success" },
      { category: "Operations", amount: 300, color: "bg-info" }
    ]
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

// Helper functions to get translation keys
const getProjectKey = (projectName) => {
  const keyMap = {
    // Existing mappings
    'Education Fund': 'educationFund',
    'Healthcare Initiative': 'healthcareInitiative',
    'Community Center': 'communityCenter',
    'Beach Cleanup Drive': 'beachCleanup',
    'Food Bank Distribution': 'foodBank',
    'Tree Planting Initiative': 'treePlanting',
    // New mappings for beneficiary aids
    'Food Security Program': 'foodSecurity',
    'Education Support': 'educationSupport',
    'Elderly Care': 'elderlyCare'
  };
  return keyMap[projectName];
};

const getStatusKey = (status) => {
  const keyMap = {
     // Existing mappings
     'In Progress': 'inProgress',
    'Planning': 'planning',
    'Completed': 'completed',
    'Pending': 'pending',
    // New mappings for contributions
    'Delivered': 'delivered',
    'Processed': 'processed',
    'Scheduled': 'scheduled',
    'In Transit': 'inTransit'
  };
  return keyMap[status];
};

const getCategoryKey = (category) => {
  const keyMap = {
    'School Supplies': 'schoolSupplies',
    'Tuition Fees': 'tuitionFees',
    'Transportation': 'transportation',
    'Medical Supplies': 'medicalSupplies',
    'Staff Wages': 'staffWages',
    'Facility Rental': 'facilityRental',
    'Construction': 'construction',
    'Equipment': 'equipment',
    'Operations': 'operations'
  };
  return keyMap[category];
};

// Helper function to get status variant
const getStatusVariant = (statusVariant) => {
  const variantMap = {
    'Completed': 'success',
    'Pending': 'warning',
    'In Progress': 'info'
  };
  return variantMap[statusVariant];
};

const getAidKey = (aidName) => {
  const keyMap = {
    'Monthly Food Pack': 'monthlyFoodPack',
    'Food Voucher': 'foodVoucher',
    'School Supplies': 'schoolSupplies',
    'Tuition Classes': 'tuitionClasses',
    'Education Fund': 'educationFund',
    'Medical Supplies': 'medicalSupplies',
    'Home Care Service': 'homeCareService',
    'Healthcare Allowance': 'healthcareAllowance'
  };
  return keyMap[aidName];
};

const getAidTypeKey = (type) => {
  const keyMap = {
    'Material': 'material',
    'Non-Material': 'nonMaterial',
    'Funds': 'funds'
  };
  return keyMap[type];
};

const getContributionKey = (contribution) => {
  const keyMap = {
    'Rice and Essential Foods': 'riceEssentials',
    'Education Fund': 'educationFund',
    'Medical Consultation': 'medicalConsultation',
    'Laptops for Students': 'laptopsStudents'
  };
  return keyMap[contribution];
};

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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('donorProjects.headers.donate') }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('donorProjects.headers.project') }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('donorProjects.headers.targetProgress') }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('donorProjects.headers.fundUsage') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="(project, index) in donorProjects" :key="index" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-6 py-4">
                  <div class="flex items-center">
                    <div class="text-sm text-gray-500">RM {{ project.amount.toLocaleString() }}</div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ $t('donorProjects.projects.' + getProjectKey(project.project) + '.name') }}
                  </div>
                  <div class="text-sm text-gray-500">
                    {{ $t('donorProjects.status.' + getStatusKey(project.status)) }}
                  </div>
                  <div class="text-xs text-gray-500">
                    {{ new Date(project.startDate).toLocaleDateString() }} - 
                    {{ new Date(project.endDate).toLocaleDateString() }}
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    Target: RM {{ project.targetAmount.toLocaleString() }}
                  </div>
                  <div class="text-sm text-gray-500 mb-1">
                    Collected: RM {{ project.amount.toLocaleString() }}
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      class="bg-primary h-2 rounded-full" 
                      :style="{ width: (project.amount / project.targetAmount * 100) + '%' }"
                    ></div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="space-y-3">
                    <div v-for="(item, idx) in project.disbursedBreakdown" :key="idx">
                      <div class="flex justify-between text-sm mb-1">
                        <span class="text-gray-900 dark:text-gray-100">
                          {{ $t('donorProjects.projects.' + getProjectKey(project.project) + '.categories.' + getCategoryKey(item.category)) }}
                        </span>
                        <span class="text-gray-500">RM {{ item.amount.toLocaleString() }}</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          :class="item.color"
                          class="h-2 rounded-full" 
                          :style="{ width: (item.amount / project.amount * 100) + '%' }"
                        ></div>
                      </div>
                    </div>
                    <div class="text-sm text-gray-500 mt-2">
                      Total Used: RM {{ project.disbursedBreakdown.reduce((sum, item) => sum + item.amount, 0).toLocaleString() }}
                    </div>
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
        <h3 class="text-lg font-semibold">{{ $t('volunteerDashboard.stats.title') }}</h3>
      </template>
      <template #body>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Summary Stats -->
          <div class="bg-primary/5 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('volunteerDashboard.stats.campaignsJoined') }}
            </div>
            <div class="text-2xl font-semibold text-primary mt-1">
              {{ volunteerStats.campaignsJoined }}
            </div>
          </div>
          <div class="bg-primary/5 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('volunteerDashboard.stats.activeProjects') }}
            </div>
            <div class="text-2xl font-semibold text-primary mt-1">
              {{ volunteerStats.activeProjects }}
            </div>
          </div>
          <div class="bg-primary/5 rounded-lg p-4">
            <div class="text-sm text-gray-600 dark:text-gray-400">
              {{ $t('volunteerDashboard.stats.totalTasks') }}
            </div>
            <div class="text-2xl font-semibold text-primary mt-1">
              {{ volunteerStats.totalTasks }}
            </div>
          </div>
        </div>

        <!-- Projects List -->
        <div class="w-1/2 mr-5">
          <h4 class="text-base font-medium mb-4">
            {{ $t('volunteerDashboard.projects.title') }}
          </h4>
          <div class="space-y-4">
            <div v-for="(project, index) in volunteerProjects" :key="index" 
                 class="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div class="flex justify-between items-center mb-2">
                <div>
                  <h5 class="font-medium">
                    {{ $t(`volunteerDashboard.projects.projectNames.${getProjectKey(project.project)}`) }}
                  </h5>
                  <rs-badge
                    :variant="getStatusVariant(project.statusVariant)"
                    class="mt-1"
                  >
                    {{ $t(`volunteerDashboard.projects.status.${getStatusKey(project.status)}`) }}
                  </rs-badge>
                </div>
                <div class="text-sm text-gray-500">
                  {{ project.completedTasks }}/{{ project.tasks }} 
                  {{ $t('volunteerDashboard.projects.tasks') }}
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
      </template>
    </rs-card>

    <!-- Project Aid Distribution for recipient -->
    <rs-card class="mt-6">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">{{ $t('beneficiaryAids.title') }}</h3>
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
              {{ $t(`beneficiaryAids.projects.${getProjectKey(project.projectName)}.name`) }}
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
                  {{ $t(`beneficiaryAids.aidTypes.${getAidTypeKey(aid.type)}`) }}
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
                  {{ $t(`beneficiaryAids.projects.${getProjectKey(project.projectName)}.aids.${getAidKey(aid.name)}.name`) }}
                </h5>
                
                <!-- Aid Details -->
                <div class="text-sm text-gray-500">
                  {{ $t(`beneficiaryAids.projects.${getProjectKey(project.projectName)}.aids.${getAidKey(aid.name)}.details`) }}
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
          <h3 class="text-lg font-semibold">{{ $t('projectContributions.title') }}</h3>
          <button class="text-primary hover:text-primary-dark">View All</button>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('projectContributions.headers.date') }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('projectContributions.headers.project') }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('projectContributions.headers.aidType') }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('projectContributions.headers.contribution') }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('projectContributions.headers.amount') }}</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">{{ $t('projectContributions.headers.status') }}</th>
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
                    {{ $t(`projectContributions.status.${getStatusKey(contribution.status)}`) }}
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
