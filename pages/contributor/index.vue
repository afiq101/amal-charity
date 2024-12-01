<script setup>
  definePageMeta({
    title: "Contributor",
  });

  const data = ref([
    {
      project: "Education Fund",
      status: "In Progress",
      contributions: [
        { category: "School Supplies", amount: 1000, color: "bg-primary" },
        { category: "Tuition Fees", amount: 1500, color: "bg-success" },
        { category: "Transportation", amount: 500, color: "bg-info" }
      ]
    },
    
  ]);

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

    <!-- <rs-card v-if="volunteer" class="flex-wrap justify-between p-5 rounded-md flex-col">
      <div class="flex justify-between items-center mb-5">
        <div>
          <h5 class="font-semibold">Tasks</h5>
        </div>
      </div>
      <rs-table 
        :field="['No', 'Project', 'Tasks', 'Status', 'Action']"
        :data="data"
        :options="{
          variant: 'default',
          striped: true,
          borderless: true,
        }"
        :options-advanced="{
          sortable: true,
          responsive: true,
          filterable: false,
        }"
        advanced
      >
        <template v-slot:No="data">
          {{ data.value.No }}
        </template>
        <template v-slot:Project="data">
          <p>{{ data.value.Project }}</p>
        </template>
        <template v-slot:Task="data">
          <p>{{ data.value.Task }}</p>
        </template>
        <template v-slot:Status="data">
          <rs-badge
            :variant="
              data.value.Status === 'Completed'
                ? 'success'
                : data.value.Status == 'Pending'
                ? 'warning'
                : data.value.Status == 'In Progress'
                ? 'info'
                : 'danger'
            ">
            {{ data.value.Status }}
          </rs-badge>
        </template>
        <template v-slot:Action="data">
          <nuxt-link :to="`/volunteer/task/${data.value.No}`">
            <rs-button variant="primary">View</rs-button>
          </nuxt-link>
        </template>
      </rs-table> 
    </rs-card> -->
  
    <rs-card class="mt-6">
      <template #header>
        <div class="flex justify-between items-center">
          <h3 class="text-lg font-semibold">Material / Non-material Contributions</h3>
          <button class="text-primary hover:text-primary-dark">View All</button>
        </div>
      </template>
      <template #body>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contribution</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="contribution in projectContributions" :key="contribution.date" 
                  class="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ contribution.project }}
                  </div>
                </td>
                <!-- <td class="px-6 py-4">
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
                </td> -->
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    {{ contribution.contribution }}
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
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900 dark:text-gray-100">
                    <rs-button variant="primary">Update</rs-button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </rs-card>
  </div>
</template>