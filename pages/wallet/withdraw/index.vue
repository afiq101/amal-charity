<script setup>
  definePageMeta({
    title: "Withdrawal",
  });

  const showModal = ref(false);
  const bankList = ref([
    { label: "CIMB Bank", value: "CIMB Bank" },
    { label: "Maybank", value: "Maybank" },
    { label: "HSBC Bank", value: "HSBC Bank" },
  ]);
  const wallet = ref({
    balance: 6307.39,
    float: 0.00,
  });

  const withdrawAmount = ref(0.00);
  const searchQuery = ref('');

  const withdrawTransactions = ref([
    {
      date: "2024-11-04 11:31:05",
      reference: "PAY2411041131051234",
      type: "withdrawal",
      amount: "RM 2,082.32",
      status: "Success"
    },
    {
      date: "2024-10-15 11:48:03",
      reference: "PAY2410151148031234",
      type: "withdrawal",
      amount: "RM 2,000.00",
      status: "Success"
    },
    {
      date: "2024-10-01 10:48:09",
      reference: "PAY2410011048091234",
      type: "withdrawal",
      amount: "RM 1,009.17",
      status: "Success"
    }
  ]);

  const bankDetails = {
    name: "KIARA NATASYIA BINTI KASMAN",
    accountNumber: "9876123450",
    bank: "CIMB Bank"
  };

  const handleWithdraw = () => {
    // Add your withdrawal logic here
    console.log(`Withdrawing RM ${withdrawAmount.value}`);
  };

  const form = ref({
    name: "",
    accountNumber: "",
    bank: ""
  });

  const openModalEdit = (bankDetails) => {
    form.value.name = bankDetails.name;
    form.value.accountNumber = bankDetails.accountNumber;
    form.value.bank = bankDetails.bank;
    showModal.value = true;
  };
</script>

<template>
  <div class="container p-4">
    <h1 class="text-2xl font-bold mb-6">Withdraw</h1>

    <!-- Balance Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="bg-white rounded-lg p-4 shadow">
        <div class="text-gray-600">Available Balance</div>
        <div class="text-2xl font-bold">RM {{ wallet.balance.toFixed(2) }}</div>
      </div>
      <div class="bg-white rounded-lg p-4 shadow">
        <div class="text-gray-600">Wallet Float</div>
        <div class="text-2xl font-bold">RM {{ wallet.float.toFixed(2) }}</div>
      </div>
    </div>

    <!-- Information Box -->
    <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
      <div class="font-bold text-blue-700">Information</div>
      <div class="text-blue-600">
        Withdraw amount will take 1 business day to be reflected in your bank account.
      </div>
    </div>

    <!-- Withdrawal Form -->
    <div class="bg-white rounded-lg p-6 shadow mb-6">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Withdraw Amount</label>
        <div class="relative">
          <span class="absolute left-3 top-2">RM</span>
          <input
            v-model="withdrawAmount"
            type="number"
            class="w-full pl-12 pr-4 py-2 border rounded"
            placeholder="0.00"
            step="0.01"
          >
        </div>
      </div>

      <div class="mb-4">
        <div class="text-gray-700 mb-2">Amount will be withdrawn to this account:</div>
        <div class="bg-gray-50 p-4 rounded">
          <div class="font-medium">{{ bankDetails.name }}</div>
          <div class="text-gray-600">{{ bankDetails.accountNumber }}</div>
          <div class="text-gray-600">{{ bankDetails.bank }}</div>
          <div class="text-gray-600 flex justify-end">
            <rs-button class="btn btn-primary" @click="openModalEdit(bankDetails)">Change Bank</rs-button>
          </div>
        </div>
      </div>

      <div class="text-right">
        <button
          @click="handleWithdraw"
          class="bg-pink-500 text-white px-6 py-2 rounded hover:bg-pink-600"
        >
          Withdraw RM {{ withdrawAmount.toFixed(2) }}
        </button>
      </div>
    </div>

    <!-- Transactions Section -->
    <div>
      <h2 class="text-xl font-bold mb-4">Withdraw Transactions</h2>
      <div class="bg-white rounded-lg shadow">
        <div class="p-4">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search transactions..."
            class="w-full p-2 border rounded"
          >
        </div>
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-2 text-left">DATE</th>
                <th class="px-4 py-2 text-left">REFERENCE</th>
                <th class="px-4 py-2 text-left">TYPE</th>
                <th class="px-4 py-2 text-left">AMOUNT</th>
                <th class="px-4 py-2 text-left">STATUS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(transaction, index) in withdrawTransactions" :key="index" class="border-t">
                <td class="px-4 py-2">{{ transaction.date }}</td>
                <td class="px-4 py-2">{{ transaction.reference }}</td>
                <td class="px-4 py-2 capitalize">{{ transaction.type }}</td>
                <td class="px-4 py-2">{{ transaction.amount }}</td>
                <td class="px-4 py-2">
                  <span class="text-green-500 flex items-center">
                    <svg class="w-4 h-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                    {{ transaction.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <rs-modal title="Change Bank Details" size="lg"  v-model="showModal">
      <FormKit
        type="form"
        :actions="false"
        @submit="submitChangeBank"
        :incomplete-message="true"
      >
        <FormKit 
          type="text" 
          label="Name" 
          v-model="form.name"
        />
        <FormKit 
          type="text" 
          label="Account Number" 
          v-model="form.accountNumber"
        />
        <FormKit 
          type="select" 
          label="Bank" 
          :options="bankList"
          v-model="form.bank"
        />
      </FormKit>
    </rs-modal>
  </div>
</template>

<style scoped>
input[type="number"]::-webkit-inner-spin-button,
input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
      