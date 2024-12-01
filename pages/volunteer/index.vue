<script setup>
  definePageMeta({
    title: "Volunteer",
  });

  const volunteer = ref(false);
  const data = ref([
    {
      No: 1,
      Project: "Beach Cleanup Drive",
      Task: "5",
      Status: "In Progress",
      Action: "View",
    },
    {
      No: 2,
      Project: "Food Bank Distribution",
      Task: "3",
      Status: "Pending",
      Action: "View",
    },
    {
      No: 3,
      Project: "Tree Planting Initiative",
      Task: "7",
      Status: "Completed",
      Action: "View",
    },
    {
      No: 4,
      Project: "Senior Care Support",
      Task: "4",
      Status: "In Progress",
      Action: "View",
    },
    {
      No: 5,
      Project: "Animal Shelter Help",
      Task: "6",
      Status: "Pending",
      Action: "View",
    }
  ]);

</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-card v-if="volunteer" class="flex-wrap justify-between p-5 rounded-md flex-col">
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
          striped: false,
          borderless: false,
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
    </rs-card>

    <rs-card v-else class="flex justify-center text-primary/40 border-2 border-grey-200 p-5">
      <div class="text-center">
        <h5 class="font-semibold">You are not a volunteer</h5>
        <span class="text-sm text-gray-500">
          Please apply to become a volunteer
        </span>
      </div>
      <div class="flex justify-center">
      <rs-button variant="primary" class="mt-10" @click="volunteer = true">Apply</rs-button>
      </div>
    </rs-card>
  </div>
</template>