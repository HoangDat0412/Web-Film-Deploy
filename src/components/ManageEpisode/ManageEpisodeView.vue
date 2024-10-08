<template>
  <div class="mt-5">
    <h1 class="text-2xl font-bold mb-6 text-gray-700">Manage Episodes</h1>
    <!-- Add New Episode Button -->
    <button
      @click="showCreateModal = true"
      class="btn px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      style="font-size: 15px"
    >
      Add Episode
    </button>

    <!-- Episodes List -->
    <div v-if="episodeStore.episodes.length > 0" class="mt-6">
      <table class="min-w-full bg-white border text-gray-700">
        <thead class="bg-gray-200">
          <tr>
            <th class="text-left py-2 px-4">Name</th>
            <th class="text-left py-2 px-4">Server</th>
            <th class="text-left py-2 px-4">Link</th>
            <th class="text-left py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="episode in episodeStore.episodes"
            :key="episode.episode_id"
            class="border-t"
          >
            <td class="py-2 px-4">{{ episode.name }}</td>
            <td class="py-2 px-4">{{ episode.server_name }}</td>
            <td class="py-2 px-4">{{ episode.link_film }}</td>
            <td class="py-2 px-4">
              <button
                @click="deleteEpisode(episode.episode_id)"
                style="box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px"
                class="btn cursor-pointer bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] text-gray-500 hover:text-red-500 h-7 rounded-md px-2"
              >
                <font-awesome-icon
                  icon="fa-solid fa-trash"
                  style="font-size: 13px"
                />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- If no episodes found -->
    <p v-else class="text-center text-gray-500 mt-6">No episodes available.</p>

    <!-- Modal for creating a new episode -->
    <div
      style="z-index: 100"
      v-if="showCreateModal"
      class="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-2 rounded-md shadow-lg" style="width: 400px">
        <h2 class="text-xl font-bold mb-4 text-gray-700">Create New Episode</h2>
        <form @submit.prevent="createEpisode">
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700"
              >Episode Name</label
            >
            <input
              v-model="newEpisode.name"
              id="name"
              class="mt-1 block w-full border-gray-300 rounded-md ps-2 text-gray-700"
              required
            />
          </div>
          <div class="mb-4">
            <label
              for="server_name"
              class="block text-sm font-medium text-gray-700"
              >Server Name</label
            >
            <input
              v-model="newEpisode.server_name"
              id="server_name"
              class="mt-1 block w-full border-gray-300 rounded-md ps-2 text-gray-700"
            />
          </div>
          <div class="mb-4">
            <label
              for="link_film"
              class="block text-sm font-medium text-gray-700"
              >Link Film</label
            >
            <input
              v-model="newEpisode.link_film"
              id="link_film"
              class="mt-1 block w-full border-gray-300 rounded-md ps-2 text-gray-700"
            />
          </div>
          <div class="flex justify-end">
            <button
              @click="showCreateModal = false"
              style="box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 1px"
              class="btn cursor-pointer mr-2 bg-white relative inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#F5F5F5] hover:text-[#67a7b3] h-9 rounded-md px-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="text-sm font-medium btn px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useEpisodeStore } from "@/stores/episode";
import { useRoute } from "vue-router";

const showCreateModal = ref(false);

const newEpisode = ref({
  name: "",
  server_name: "",
  link_film: "",
});
const episodeStore = useEpisodeStore();
const route = useRoute();
onMounted(async () => {
  await episodeStore.getAllEpisodes(route.params.id);
});

const createEpisode = async () => {
  await episodeStore.createEpisode(route.params.id, newEpisode.value);
  // await fetchEpisodes(); // Refresh list after creation
  newEpisode.value = { name: "", server_name: "", link_film: "" }; // Reset the form
  showCreateModal.value = false; // Close the modal
};

const deleteEpisode = async (id) => {
  await episodeStore.deleteEpisode(id);
};
</script>

<style scoped>
input {
  border-color: #374151;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
}
</style>
