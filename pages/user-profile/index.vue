<template>
  <div class="max-w-7xl mx-auto p-6">
    <!-- Profile Header -->
    <div class="bg-gray-50 rounded-lg p-6 mb-6">
      <div class="flex gap-6">
        <!-- Avatar -->
        <div class="relative">
          <img 
            :src="profile.avatar" 
            :alt="profile.name" 
            class="w-36 h-36 rounded-full object-cover"
          />
          <button class="absolute bottom-0 right-0 bg-white p-2 rounded-full border border-gray-200 hover:bg-gray-50">
            ✏️
          </button>
        </div>

        <!-- Profile Info -->
        <div class="flex-1">
          <h1 class="text-2xl font-semibold text-gray-900">{{ profile.name }}</h1>
          <p class="text-gray-600 mt-2">{{ profile.title }}</p>
          <p class="text-gray-600 mt-1">📍 {{ profile.location }}</p>
          <div class="flex gap-3 mt-4">
            <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Share profile
            </button>
            <button class="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              Add section
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-3 gap-6">
      <!-- Left Column (2/3 width) -->
      <div class="col-span-2 space-y-6">
        <!-- Opportunities Section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold mb-3">Open to new opportunities</h3>
          <p class="text-gray-600">{{ opportunities.roles.join(', ') }}</p>
          <button class="mt-3 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50">
            Change
          </button>
        </div>

        <!-- Experience Section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold mb-4">Experience</h3>
          <div v-for="job in experience" :key="job.company" class="flex gap-4 mb-6">
            <img 
              :src="job.logo" 
              :alt="job.company" 
              class="w-12 h-12 rounded-lg"
            />
            <div>
              <h4 class="font-medium">{{ job.company }}</h4>
              <p class="text-gray-600 text-sm">{{ job.duration }}</p>
              <p class="text-gray-600 text-sm mt-1">Skills: {{ job.skills.join(', ') }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column (1/3 width) -->
      <div class="col-span-1">
        <!-- Activities Section -->
        <div class="bg-white rounded-lg border border-gray-200 p-6">
          <h3 class="text-lg font-semibold mb-4">Activities</h3>
          <div class="flex gap-4 border-b border-gray-200">
            <button 
              v-for="tab in activityTabs" 
              :key="tab"
              @click="currentTab = tab"
              :class="[
                'pb-3 px-2 text-sm',
                currentTab === tab 
                  ? 'border-b-2 border-blue-600 text-blue-600' 
                  : 'text-gray-500 hover:text-gray-700'
              ]"
            >
              {{ tab }}
            </button>
          </div>
          <div class="mt-4">
            <div v-for="activity in filteredActivities" :key="activity.id" class="mb-4 p-3 border-b">
              <div class="flex items-center gap-2 mb-2">
                <img :src="activity.authorAvatar" alt="" class="w-8 h-8 rounded-full">
                <div>
                  <p class="font-medium">{{ activity.author }}</p>
                  <p class="text-sm text-gray-500">{{ activity.date }}</p>
                </div>
              </div>
              <p class="text-gray-700">{{ activity.content }}</p>
              <div class="flex gap-4 mt-2 text-sm text-gray-500">
                <span>👍 {{ activity.likes }}</span>
                <span>💬 {{ activity.comments }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const profile = ref({
  name: 'Jordan Mendez',
  title: 'Software Engineer',
  location: '1789 North Street, San Antonio, TX 78201',
  avatar: '/default-avatar.png'
})

const opportunities = ref({
  roles: ['Software Engineer', 'Full Stack Developer', 'Frontend Engineer']
})

const experience = ref([
  {
    company: 'SoftShift',
    logo: '/company-logo.png',
    duration: '3 yrs 11 mos',
    skills: ['HTML', 'CSS', 'JAVA']
  },
  {
    company: 'TechCorp',
    logo: '/company-logo-2.png',
    duration: '2 yrs 3 mos',
    skills: ['React', 'Node.js', 'MongoDB']
  },
  {
    company: 'WebSolutions',
    logo: '/company-logo-3.png',
    duration: '1 yr 6 mos',
    skills: ['Vue.js', 'PHP', 'MySQL']
  }
])

const activityTabs = ['Posts', 'Videos', 'Images', 'Share']
const currentTab = ref('Posts')

const activities = ref([
  {
    id: 1,
    type: 'Posts',
    author: 'Jordan Mendez',
    authorAvatar: '/default-avatar.png',
    date: 'Mar 25, 2024',
    content: 'Just completed a major project using Vue.js and Tailwind CSS. Love how the combination makes development so efficient!',
    likes: 20,
    comments: 5
  },
  {
    id: 2,
    type: 'Images',
    author: 'Jordan Mendez',
    authorAvatar: '/default-avatar.png',
    date: 'Mar 23, 2024',
    content: 'Speaking at the local tech conference about modern web development practices.',
    likes: 45,
    comments: 12
  },
  {
    id: 3,
    type: 'Videos',
    author: 'Jordan Mendez',
    authorAvatar: '/default-avatar.png',
    date: 'Mar 20, 2024',
    content: 'Check out my new tutorial on building scalable applications!',
    likes: 67,
    comments: 8
  }
])

const filteredActivities = computed(() => {
  if (currentTab.value === 'Share') return []
  return activities.value.filter(activity => activity.type === currentTab.value)
})
</script>
