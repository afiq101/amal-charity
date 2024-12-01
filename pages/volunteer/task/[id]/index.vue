<script setup>
  definePageMeta({
    title: "Volunteer tasks",
  });

  const projectID = useRoute().params.id;
  const showModal = ref(false);

  const taskStatus = ref([
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ]);

  const listTask = ref([
    {
      No: 1,
      projectID: 1,
      Project: "Beach Cleanup Drive",
      Task: "Collect plastic waste from shoreline",
      Status: "In Progress",
      Action: "",
    },
    {
      No: 2,
      projectID: 1,
      Project: "Beach Cleanup Drive",
      Task: "Sort recyclable materials",
      Status: "Pending",
      Action: "",
    },
    {
      No: 3,
      projectID: 1,
      Project: "Beach Cleanup Drive",
      Task: "Record waste collection data",
      Status: "Pending",
      Action: "",
    },
    {
      No: 4,
      projectID: 1,
      Project: "Beach Cleanup Drive",
      Task: "Clean beach equipment and tools",
      Status: "Pending",
      Action: "",
    },
    {
      No: 5,
      projectID: 1,
      Project: "Beach Cleanup Drive",
      Task: "Submit cleanup report",
      Status: "Pending",
      Action: "",
    }
  ]);

  const form = ref({
    project: "",
    task: "",
    status: "",
    notes: "",
    proof: "",
    report: "",
  });

  const openModalEdit = (data) => {
    form.value.project = data.Project;
    form.value.task = data.Task;
    // form.value.status = data.Status;
    // form.value.notes = data.Notes;
    // form.value.proof = data.Proof;
    // form.value.report = data.Report;
    showModal.value = true;
  };

</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <rs-card class="flex-wrap justify-between p-5 rounded-md flex-col">
      <div class="flex justify-between items-center mb-5">
        <div>
          <h5 class="font-semibold">Tasks {{ listTask[0].Project }}</h5>
        </div>
      </div>
      <rs-table 
        :field="['No', 'Task', 'Status', 'Action']"
        :data="listTask"
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
          <rs-button @click="openModalEdit(data.value)">Upload</rs-button>
        </template>
      </rs-table> 
    </rs-card>

    <rs-modal title="Update Task" size="lg"  v-model="showModal">
      <FormKit
        type="form"
        :actions="false"
        @submit="submitUpdateTask"
        :incomplete-message="true"
      >
        <FormKit 
          type="text" 
          label="Project" 
          v-model="form.project"
          readonly
        />
        <FormKit 
          type="text" 
          label="Task" 
          v-model="form.task"
          readonly
        />
        <FormKit 
          type="select" 
          label="status" 
          :options="taskStatus"
          v-model="form.status"
        />
        <FormKit 
          type="textarea" 
          label="Notes" 
          rows="3"
          v-model="form.notes"
        />
        <FormKit 
          type="file" 
          label="Proof" 
          v-model="form.proof"
        />
        <FormKit
          type="dropzone"
          label="Report"
          help="Select as many documents as you would like."
          multiple="true"
          v-model="form.report"
        />
      </FormKit>
    </rs-modal>
  </div>
</template>