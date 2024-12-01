<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// Table headers
const tableHeaders = [
  { key: 'date', label: 'Transaction Date' },
  { key: 'campaign', label: 'Campaign' },
  { key: 'project', label: 'Project' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status' },
  { key: 'documents', label: 'Documents' },
  { key: 'accept', label: 'Accept' },
  { key: 'actions', label: 'Actions' },
];

// Wallet data
const walletData = ref({
  balance: 25000,
  pendingFunds: 5000,
  lastUpdate: '2024-03-15',
});

// Selected transactions for acceptance
const selectedTransactions = ref(new Set());
const showUploadModal = ref(false);
const uploadFile = ref(null);
const uploadNotes = ref('');
const selectedTransactionId = ref(null);

// Transaction history with dummy data
const transactions = ref([
  {
    id: 1,
    type: 'received',
    amount: 10000,
    date: '2024-03-15',
    campaign: 'Education for All 2024',
    project: 'Rural School Development',
    status: 'pending_acceptance',
    description: 'March funding allocation',
    hasDocument: false,
    documents: [],
  },
  {
    id: 2,
    type: 'received',
    amount: 15000,
    date: '2024-03-10',
    campaign: 'Green City Initiative',
    project: 'Urban Garden Project',
    status: 'accepted',
    description: 'Initial funding release',
    hasDocument: true,
    documents: [
      { name: 'receipt.pdf', uploadDate: '2024-03-11' }
    ],
  },
  {
    id: 3,
    type: 'received',
    amount: 8000,
    date: '2024-03-05',
    campaign: 'Education for All 2024',
    project: 'Digital Learning Program',
    status: 'withdraw',
    description: 'Equipment purchase funding',
    hasDocument: true,
    documents: [
      { name: 'receipts.pdf', uploadDate: '2024-03-07' }
    ],
  },
  {
    id: 4,
    type: 'received',
    amount: 12000,
    date: '2024-03-01',
    campaign: 'Healthcare Access Program',
    project: 'Mobile Clinic Services',
    status: 'pending_acceptance',
    description: 'Medical supplies funding',
    hasDocument: false,
    documents: [],
  },
  {
    id: 5,
    type: 'received',
    amount: 20000,
    date: '2024-02-28',
    campaign: 'Community Development Fund',
    project: 'Youth Center Construction',
    status: 'accepted',
    description: 'Phase 1 funding',
    hasDocument: true,
    documents: [
      { name: 'contract.pdf', uploadDate: '2024-03-01' }
    ],
  }
]);

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'MYR',
  }).format(amount);
};

const getTransactionStatusColor = (status) => {
  switch (status) {
    case 'pending_acceptance':
      return 'bg-yellow-100 text-yellow-800';
    case 'accepted':
      return 'bg-blue-100 text-blue-800';
    case 'withdraw':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const toggleTransactionSelection = (transactionId) => {
  if (selectedTransactions.value.has(transactionId)) {
    selectedTransactions.value.delete(transactionId);
  } else {
    selectedTransactions.value.add(transactionId);
  }
};

const acceptTransactions = async () => {
  try {
    // TODO: Implement API call to accept transactions
    // await api.acceptTransactions(Array.from(selectedTransactions.value));
    
    // Update local transaction status
    transactions.value = transactions.value.map(transaction => {
      if (selectedTransactions.value.has(transaction.id)) {
        return {
          ...transaction,
          status: 'accepted'
        };
      }
      return transaction;
    });

    selectedTransactions.value.clear();
    // Add success notification
  } catch (error) {
    console.error('Failed to accept transactions:', error);
    // Add error notification
  }
};

const openUploadModal = (transactionId) => {
  selectedTransactionId.value = transactionId;
  uploadFile.value = null;
  uploadNotes.value = '';
  showUploadModal.value = true;
};

const handleFileUpload = (event) => {
  uploadFile.value = event.target.files[0];
};

const submitDocument = async () => {
  try {
    // TODO: Implement actual API call
    const transaction = transactions.value.find(t => t.id === selectedTransactionId.value);
    
    if (transaction) {
      transaction.documents.push({
        name: uploadFile.value.name,
        uploadDate: new Date().toISOString().split('T')[0]
      });
      transaction.hasDocument = true;
    }
    
    showUploadModal.value = false;
    uploadFile.value = null;
    uploadNotes.value = '';
    
    // Add success notification
  } catch (error) {
    console.error('Failed to upload document:', error);
    // Add error notification
  }
};

// Application history data
const applicationHistory = ref([
  {
    id: 1,
    projectName: 'Rural School Development',
    campaign: 'Education for All 2024',
    // role: 'Volunteer',
    appliedDate: '2024-03-15',
    status: 'approved',
    message: 'I would like to contribute to rural education development',
    responseDate: '2024-03-17',
    responseMessage: 'Welcome aboard! We appreciate your interest in helping.',
  },
  {
    id: 2,
    projectName: 'Urban Garden Project',
    campaign: 'Green City Initiative',
    // role: 'Contributor',
    appliedDate: '2024-03-10',
    status: 'in review',
    message: 'Interested in supporting sustainable urban farming',
    responseDate: null,
    responseMessage: null,
  },
  {
    id: 3,
    projectName: 'Mobile Clinic Services',
    campaign: 'Healthcare Access Program',
    // role: 'Logistics',
    appliedDate: '2024-03-05',
    status: 'rejected',
    message: 'Available to help with medical supply distribution',
    responseDate: '2024-03-07',
    responseMessage: 'Thank you for your interest. Unfortunately, all positions are filled.',
  },
  {
    id: 3,
    projectName: 'Mobile Clinic Services',
    campaign: 'Healthcare Access Program',
    // role: 'Logistics',
    appliedDate: '2024-03-05',
    status: 'new',
    message: 'Available to help with medical supply distribution',
    responseDate: '2024-03-07',
    responseMessage: 'Thank you for your interest. Unfortunately, all positions are filled.',
  },
]);

// Application table headers
const applicationTableHeaders = [
  { key: 'date', label: 'Date' },
  { key: 'project', label: 'Project' },
  // { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
  { key: 'details', label: 'Details' },
];

// Method to get application status color
const getApplicationStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'in review':
      return 'bg-yellow-100 text-yellow-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    // case 'new':
    //   return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

// Collapse states
const isTransactionCollapsed = ref(false);
const isApplicationCollapsed = ref(false);

// Add these methods for collapse functionality
const toggleTransactionCollapse = () => {
  isTransactionCollapsed.value = !isTransactionCollapsed.value;
};

const toggleApplicationCollapse = () => {
  isApplicationCollapsed.value = !isApplicationCollapsed.value;
};

</script>

<template>
  <div class="recipient-dashboard p-4 max-w-6xl mx-auto">
    <!-- Wallet Card Section -->
    <div class="mb-8">
      <div 
        class="bg-white rounded-lg shadow-sm p-6 cursor-pointer hover:shadow-md transition-shadow"
        @click="router.push('/wallet')"
      >
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="text-xl font-semibold mb-1">Wallet Balance</h2>
            <p class="text-sm text-gray-600">Last updated: {{ walletData.lastUpdate }}</p>
          </div>
          <button class="text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm">
            View Details
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="text-sm text-gray-600 mb-1">Available Balance</div>
            <div class="text-2xl font-semibold text-gray-700">
              {{ formatCurrency(walletData.balance) }}
            </div>
          </div>
          <div class="bg-gray-50 rounded-lg p-4">
            <div class="text-sm text-gray-600 mb-1">Pending Funds</div>
            <div class="text-2xl font-semibold text-gray-700">
              {{ formatCurrency(walletData.pendingFunds) }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction History Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <!-- Section Header with Collapse -->
      <div 
        class="flex justify-between items-center mb-6 cursor-pointer"
        @click="toggleTransactionCollapse"
      >
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-semibold">Transaction History</h2>
          <svg
            class="w-5 h-5 text-gray-500 transition-transform duration-200"
            :class="{ 'rotate-180': isTransactionCollapsed }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="flex gap-2">
          <button
            v-if="selectedTransactions.size > 0"
            @click.stop="acceptTransactions"
            class="bg-primary text-white px-4 py-2 rounded-lg text-sm"
          >
            Accept Selected ({{ selectedTransactions.size }})
          </button>
          <!-- <button 
            @click.stop
            class="text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm"
          >
            Filter
          </button>
          <button 
            @click.stop
            class="text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm"
          >
            Export
          </button> -->
        </div>
      </div>

      <!-- Transaction Table with Collapse -->
      <div
        class="transition-all duration-200 overflow-hidden"
        :class="{ 'h-0': isTransactionCollapsed }"
      >
        <!-- Existing Transaction Table Content -->
        <!-- Transactions Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                v-for="header in tableHeaders"
                :key="header.key"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ header.label }}
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="transaction in transactions" :key="transaction.id">

              <!-- Date Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ transaction.date }}</div>
              </td>

              <!-- From Column -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ transaction.campaign }}</div>
              </td>

              <!-- Project Column -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">{{ transaction.project }}</div>
                <div class="text-sm text-gray-500">{{ transaction.description }}</div>
              </td>

              <!-- Amount Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ formatCurrency(transaction.amount) }}
                </div>
              </td>

              <!-- Status Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 py-1 text-xs rounded-full capitalize"
                  :class="getTransactionStatusColor(transaction.status)"
                >
                  {{ transaction.status.replace('_', ' ') }}
                </span>
              </td>

              <!-- Documents Column -->
              <td class="px-6 py-4">
                <div class="text-sm text-gray-900">
                  <div v-if="transaction.documents.length === 0" class="text-gray-500">
                    No documents
                  </div>
                  <div 
                    v-for="(doc, index) in transaction.documents" 
                    :key="index"
                    class="flex items-center gap-2 mb-1"
                  >
                    <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>{{ doc.name }}</span>
                    <span class="text-xs text-gray-500">({{ doc.uploadDate }})</span>
                  </div>
                </div>
              </td>

              <!-- Accept Column -->
              <td class="px-6 py-4 whitespace-nowrap">
                <div v-if="transaction.status === 'pending_acceptance'" class="flex items-center">
                  <input
                    type="checkbox"
                    :checked="selectedTransactions.has(transaction.id)"
                    @change="toggleTransactionSelection(transaction.id)"
                    class="form-checkbox h-5 w-5 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                </div>
              </td>

              <!-- Actions Column -->
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button
                  @click="openUploadModal(transaction.id)"
                  class="text-primary hover:text-primary-dark"
                >
                  Upload
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div class="flex flex-1 justify-between sm:hidden">
            <button class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
            <button class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
          </div>
          <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Showing <span class="font-medium">1</span> to <span class="font-medium">5</span> of <span class="font-medium">5</span> results
              </p>
            </div>
            <div>
              <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                <button class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>

    <!-- Application History Section -->
    <div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <!-- Section Header with Collapse -->
      <div 
        class="flex justify-between items-center mb-6 cursor-pointer"
        @click="toggleApplicationCollapse"
      >
        <div class="flex items-center gap-2">
          <h2 class="text-xl font-semibold">Application History</h2>
          <svg
            class="w-5 h-5 text-gray-500 transition-transform duration-200"
            :class="{ 'rotate-180': isApplicationCollapsed }"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
        <div class="flex gap-2">
          <!-- <button 
            @click.stop
            class="text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm"
          >
            Filter
          </button>
          <button 
            @click.stop
            class="text-primary hover:bg-primary/10 px-4 py-2 rounded-lg text-sm"
          >
            Export
          </button> -->
        </div>
      </div>

      <!-- Application Table with Collapse -->
      <div
        class="transition-all duration-200 overflow-hidden"
        :class="{ 'h-0': isApplicationCollapsed }"
      >
        <!-- Existing Application Table Content -->
        <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in applicationTableHeaders"
              :key="header.key"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="application in applicationHistory" :key="application.id">
            <!-- Date Column -->
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ application.appliedDate }}</div>
            </td>

            <!-- Project Column -->
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">{{ application.projectName }}</div>
              <div class="text-sm text-gray-500">{{ application.campaign }}</div>
            </td>

            <!-- Status Column -->
            <td class="px-6 py-4 whitespace-nowrap">
              <span 
                class="px-2 py-1 text-xs rounded-full capitalize"
                :class="getApplicationStatusColor(application.status)"
              >
                {{ application.status }}
              </span>
            </td>

            <!-- Details Column -->
            <td class="px-6 py-4">
              <div class="space-y-2">
                <div class="text-sm">
                  <span class="text-gray-500">Message:</span>
                  <p class="text-gray-900">{{ application.message }}</p>
                </div>
                
                <!-- <div v-if="application.responseDate" class="text-sm">
                  <span class="text-gray-500">Response ({{ application.responseDate }}):</span>
                  <p class="text-gray-900">{{ application.responseMessage }}</p>
                </div>
                
                <div v-else-if="application.status === 'pending'" class="text-sm text-yellow-600">
                  Awaiting response
                </div> -->
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Application Pagination -->
      <div class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div class="flex flex-1 justify-between sm:hidden">
          <button class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</button>
          <button class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
        </div>
        <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">1</span> to <span class="font-medium">3</span> of <span class="font-medium">3</span> results
            </p>
          </div>
          <div>
            <nav class="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clip-rule="evenodd" />
                </svg>
              </button>
              <button class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <div
      v-if="showUploadModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 class="text-lg font-semibold mb-4">Upload Document</h3>
        
        <form @submit.prevent="submitDocument" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Document</label>
            <input
              type="file"
              @change="handleFileUpload"
              class="w-full p-2 border rounded-lg"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            <p class="mt-1 text-sm text-gray-500">
              Accepted formats: PDF, DOC, DOCX, JPG, PNG
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Notes (Optional)</label>
            <textarea
              v-model="uploadNotes"
              rows="3"
              class="w-full p-2 border rounded-lg"
              placeholder="Add any notes about this document..."
            ></textarea>
          </div>

          <div class="flex justify-end gap-4">
            <button
              type="button"
              @click="showUploadModal = false"
              class="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
              :disabled="!uploadFile"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<style scoped>
.form-checkbox {
  @apply rounded border-gray-300 text-primary focus:ring-primary;
}

.table-container {
  @apply overflow-x-auto;
}

table {
  @apply min-w-full divide-y divide-gray-200;
}

th {
  @apply px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

td {
  @apply px-6 py-4;
}

.hover\:bg-gray-50:hover {
  @apply bg-gray-50;
}
</style>