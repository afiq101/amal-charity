<script setup>
  definePageMeta({
    title: "Contributor",
  });

  const projectContributions = ref([
    {
      no: 1,
      project: "Food Security Program",
      aidType: "Material",
      contribution: "Rice and Essential Foods",
      status: "Delivered",
      disbursedContributions: [
        { category: "Rice Distribution", amount: 3000, target: 5000, color: "bg-primary" },
        { category: "Essential Foods", amount: 2000, target: 4000, color: "bg-success" },
        { category: "Vegetables", amount: 1000, target: 2000, color: "bg-info" }
      ]
    },
    {
      no: 2,
      project: "Education Support",
      aidType: "Funds",
      contribution: "Education Fund",
      status: "Processed",
      disbursedContributions: [
        { category: "School Supplies", amount: 1500, target: 2000, color: "bg-primary" },
        { category: "Tuition Fees", amount: 3000, target: 5000, color: "bg-success" },
        { category: "Transportation", amount: 800, target: 1000, color: "bg-info" }
      ]
    }
  ]);
</script>
<template>
  <div>
    <LayoutsBreadcrumb />

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
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Aid Type</th>
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
                  <div class="space-y-3">
                    <div v-for="(item, idx) in contribution.disbursedContributions" :key="idx">
                      <div class="flex justify-between text-sm mb-1">
                        <span class="text-gray-900 dark:text-gray-100">
                          {{ item.category }}
                        </span>
                        <span class="text-gray-500">{{ item.amount.toLocaleString() }} / {{ item.target.toLocaleString() }}</span>
                      </div>
                      <div class="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          :class="item.color"
                          class="h-2 rounded-full" 
                          :style="{ width: (item.amount / item.target * 100) + '%' }"
                        ></div>
                      </div>
                    </div>
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
                    <nuxt-link :to="`/contributor/details/${contribution.no}`">
                      <rs-button variant="primary">Update</rs-button>
                    </nuxt-link>
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