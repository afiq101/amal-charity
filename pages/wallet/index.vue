<script setup>
  // import axios from "axios";
  definePageMeta({
    title: "Your Wallet",
  });

  // Reactive wallet state
  const wallet = ref({
    balance: 1000.00,
    float: 0.0,
    transactions: [
        { date: "2024-11-30 12:06:56", reference: "PAY2411301206562578", type: "Print", amount: "+RM 1.25", status: "Success" },
        { date: "2024-11-30 12:00:12", reference: "PAY2411301200128958", type: "Print", amount: "+RM 0.85", status: "Success" },
        { date: "2024-11-30 11:58:09", reference: "PAY2411301158091440", type: "Print", amount: "+RM 0.85", status: "Success" },
        { date: "2024-11-30 11:56:43", reference: "PAY2411301156438692", type: "Print", amount: "+RM 0.65", status: "Success" },
        { date: "2024-11-30 11:55:55", reference: "PAY2411301155558245", type: "Print", amount: "+RM 0.25", status: "Success" },
        { date: "2024-11-30 11:54:47", reference: "PAY2411301154471791", type: "Print", amount: "+RM 0.05", status: "Success" },
    ],
    volunteers: [
      { date: "2024-11-30", task: "Tutoring", project: "Education", status: "Success", amount: "10.00" },
      { date: "2024-11-29", task: "Food Drive", project: "Community", status: "Success", amount: "15.00" },
      { date: "2024-11-28", task: "Mentoring", project: "Youth", status: "Success", amount: "20.00" },
    ],
    contributors: [
      { date: "2024-11-27", contribute: "Monthly Donation", project: "Education", status: "Success", amount: "50.00" },
      { date: "2024-11-26", contribute: "Special Event", project: "Community", status: "Success", amount: "100.00" },
      { date: "2024-11-25", contribute: "Emergency Fund", project: "Healthcare", status: "Success", amount: "75.00" },
    ],
    recipients: [
      { date: "2024-11-24", funds: "Education Fund", project: "School Supplies", status: "Success", amount: "1000.00" },
      { date: "2024-11-23", funds: "Medical Aid", project: "Healthcare", status: "Success", amount: "2000.00" },
      { date: "2024-11-22", funds: "Food Bank", project: "Community", status: "Success", amount: "1500.00" },
    ]
  });

  const activeTab = ref('transactions');

  const navigateToWithdraw = () => {
    navigateTo('/wallet/withdraw');
  };

  const setActiveTab = (tab) => {
    activeTab.value = tab;
  };
</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <div class="container">
      <div class="wallet-card">
        <h2>Wallet Balance</h2>
        <p class="balance">RM {{ wallet.balance.toFixed(2) }}</p>
        <div class="flex justify-end">
          <nuxt-link to="/wallet/withdraw">
            <rs-button class="btn btn-withdraw">Withdraw</rs-button>
          </nuxt-link>
        </div>
      </div>

      <div class="tab-buttons">
        <button 
          @click="setActiveTab('transactions')" 
          :class="['tab-btn', activeTab === 'transactions' ? 'active' : '']"
        >
          Transaction
        </button>
        <button 
          @click="setActiveTab('volunteers')" 
          :class="['tab-btn', activeTab === 'volunteers' ? 'active' : '']"
        >
          Volunteer
        </button>
        <button 
          @click="setActiveTab('contributors')" 
          :class="['tab-btn', activeTab === 'contributors' ? 'active' : '']"
        >
          Contributor
        </button>
        <button 
          @click="setActiveTab('recipients')" 
          :class="['tab-btn', activeTab === 'recipients' ? 'active' : '']"
        >
          Recipient
        </button>
      </div>

      <!-- Transactions Table -->
      <div v-if="activeTab === 'transactions'" class="table-container">
        <h5>Wallet Transactions</h5>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Reference</th>
              <th>Type</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in wallet.transactions" :key="index">
              <td>{{ item.date }}</td>
              <td>{{ item.reference }}</td>
              <td>{{ item.type }}</td>
              <td>{{ item.amount }}</td>
              <td>{{ item.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Volunteers Table -->
      <div v-if="activeTab === 'volunteers'" class="table-container">
        <h5>Volunteers Received Funds</h5>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Task</th>
              <th>Project</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in wallet.volunteers" :key="index">
              <td>{{ item.date }}</td>
              <td>{{ item.task }}</td>
              <td>{{ item.project }}</td>
              <td>{{ item.status }}</td>
              <td>RM {{ item.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Contributors Table -->
      <div v-if="activeTab === 'contributors'" class="table-container">
        <h5>Contributors Received Funds</h5> 
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Contribute</th>
              <th>Project</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in wallet.contributors" :key="index">
              <td>{{ item.date }}</td>
              <td>{{ item.contribute }}</td>
              <td>{{ item.project }}</td>
              <td>{{ item.status }}</td>
              <td>RM {{ item.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Recipients Table -->
      <div v-if="activeTab === 'recipients'" class="table-container">
        <h5>Recipients Received Funds</h5>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Funds</th>
              <th>Project</th>
              <th>Status</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in wallet.recipients" :key="index">
              <td>{{ item.date }}</td>
              <td>{{ item.funds }}</td>
              <td>{{ item.project }}</td>
              <td>{{ item.status }}</td>
              <td>RM {{ item.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wallet-card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  text-align: left;
}

.balance {
  font-size: 24px;
  font-weight: bold;
  margin: 10px 0;
}

.tab-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.tab-btn {
  padding: 10px 20px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.tab-btn.active {
  background: #007bff;
  color: white;
  border-color: #007bff;
}

.table-container {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
  margin: 0;
  padding: 0;
}
.container {
  padding: 20px;
}
.balances {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.card {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  flex: 1;
}
.actions {
  margin-bottom: 20px;
}
.btn {
  padding: 10px 20px;
  margin-right: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.btn-withdraw {
  background-color: red;
  color: white;
}
.btn-reload {
  background-color: green;
  color: white;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>