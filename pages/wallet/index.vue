<script setup>
  // import axios from "axios";
  definePageMeta({
    title: "Your Wallet",
  });

  // Reactive wallet state
  const wallet = ref({
    balance: 6141.19,
    float: 0.0,
    transactions: [
        { date: "2024-11-30 12:06:56", reference: "PAY2411301206562578", type: "Print", amount: "+RM 1.25", status: "Success" },
        { date: "2024-11-30 12:00:12", reference: "PAY2411301200128958", type: "Print", amount: "+RM 0.85", status: "Success" },
        { date: "2024-11-30 11:58:09", reference: "PAY2411301158091440", type: "Print", amount: "+RM 0.85", status: "Success" },
        { date: "2024-11-30 11:56:43", reference: "PAY2411301156438692", type: "Print", amount: "+RM 0.65", status: "Success" },
        { date: "2024-11-30 11:55:55", reference: "PAY2411301155558245", type: "Print", amount: "+RM 0.25", status: "Success" },
        { date: "2024-11-30 11:54:47", reference: "PAY2411301154471791", type: "Print", amount: "+RM 0.05", status: "Success" },
    ]
  });

  // Fetch wallet data
  // const fetchWallet = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/wallet");
  //     wallet.value = response.data;
  //   } catch (error) {
  //     console.error("Error fetching wallet data:", error);
  //   }
  // };

  // Withdraw function
  // const withdraw = async (amount) => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/wallet/action", {
  //       action: "withdraw",
  //       amount,
  //     });
  //     alert(response.data.message);
  //     await fetchWallet();
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // };

  // Reload function
  // const reload = async (amount) => {
  //   try {
  //     const response = await axios.post("http://localhost:3000/api/wallet/action", {
  //       action: "reload",
  //       amount,
  //     });
  //     alert(response.data.message);
  //     await fetchWallet();
  //   } catch (error) {
  //     alert(error.response.data.message);
  //   }
  // };

  // // Fetch wallet data on component mount
  // onMounted(fetchWallet);
</script>

<template>
  <div>
    <LayoutsBreadcrumb />

    <div class="container">
      
      <div class="balances">
        <div class="card">
          <h2>Wallet Balance</h2>
          <p>RM {{ wallet.balance.toFixed(2) }}</p>
        </div>
        <div class="card">
          <h2>Wallet Float</h2>
          <p>RM {{ wallet.float.toFixed(2) }}</p>
        </div>
      </div>
      <div class="actions">
        <button @click="withdraw(10)" class="btn btn-withdraw">Withdraw</button>
        <button @click="reload(10)" class="btn btn-reload">Reload</button>
      </div>
      <div class="transactions">
        <h2>Wallet Transactions</h2>
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
            <tr v-for="(transaction, index) in wallet.transactions" :key="index">
              <td>{{ transaction.date }}</td>
              <td>{{ transaction.reference }}</td>
              <td>{{ transaction.type }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
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