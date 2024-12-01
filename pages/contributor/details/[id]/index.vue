<script setup>
  definePageMeta({
    title: "Details Contribution",
  });

  const projectID = useRoute().params.id;
  const showModal = ref(false);

  const contributionStatus = ref([
    { label: "Delivered", value: "Delivered" },
    { label: "Processed", value: "Processed" },
    { label: "In Transit", value: "In Transit" },
    { label: "Pending", value: "Pending" },
    { label: "In Progress", value: "In Progress" },
    { label: "Completed", value: "Completed" },
  ]);

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

  const listContribution = ref([
    {
      No: 1,
      projectID: 1,
      Project: "Rice and Essential Foods",
      Contribute: "Rice Distribution",
      AidType: "Material",
      Status: "In Progress",
      Action: "",
    },
    {
      No: 2,
      projectID: 1,
      Project: "Rice and Essential Foods",
      Contribute: "Essential Foods",
      AidType: "Material",
      Status: "Pending",
      Action: "",
    },
    {
      No: 3,
      projectID: 1,
      Project: "Rice and Essential Foods",
      Contribute: "Vegetables",
      AidType: "Material",
      Status: "Pending",
      Action: "",
    }
  ]);

  const form = ref({
    project: "",
    type: "",
    contribute: "",
    status: "",
    notes: "",
    proof: "",
    report: "",
  });

  const openModalEdit = (data) => {
    form.value.project = data.Project;
    form.value.type = data.AidType;
    form.value.contribute = data.Contribute;
    form.value.status = data.Status;
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
          <h5 class="font-semibold">Contribution {{ listContribution[0].Project }}</h5>
        </div>
      </div>
      <rs-table 
        :field="['No', 'Contribute', 'Status', 'Action']"
        :data="listContribution"
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
        <template v-slot:Contribute="data">
          <p>{{ data.value.Contribute }}</p>
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

    <rs-modal title="Update Contribution" size="lg"  v-model="showModal">
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
        <div class="flex flex-row justify-between">
          <div class="w-2/3 mr-5">
            <FormKit 
              type="text" 
              label="Contribute" 
              v-model="form.contribute"
              readonly
            />
          </div>
          <div class="w-1/3">
            <FormKit 
              type="text" 
              label="AidType" 
              v-model="form.type"
              readonly
            />
          </div>
        </div>
        <!-- <div class="mt-5 mb-10">
          <h4 class="font-semibold">Contribution Tracking</h4>
          <div class="flex flex-row">
            <p class="font-regular" :class="{ 'text-primary': form.status === 'Processed' }">Processed --- </p>
            <p class="font-regular" :class="{ 'text-primary': form.status === 'In Transit' }"> --- In Transit --- </p>
            <p class="font-regular" :class="{ 'text-primary': form.status === 'Delivered' }"> --- Delivered</p>
          </div>
        </div> -->
        <FormKit 
          type="select" 
          label="Status" 
          :options="contributionStatus"
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