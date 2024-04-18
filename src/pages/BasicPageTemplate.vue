<template>
    <ProgressSpinner v-if="loading" class="loading-overlay"/>
    <ProductSkeleton :skeleton="skeleton"/>
    <div class="p-grid crud-demo" v-if="!skeleton">
        <div class="col-12">
            <div class="grid formgrid p-fluid">
                <div class="field col-12 sm:col-12 md:col-12 xl:col-12">
                    <div class="card">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import ProductSkeleton from '../components/general/ProductSkeleton.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { ref, onMounted, watch } from 'vue';
const route = useRoute();
const router = useRouter();
const skeleton = ref<boolean>(true);
const loading = ref<boolean>(true);


const refresh = () => {
    loading.value=true;
    try{
        
    }catch {
        console.log("No se cargaron los datos")
    }finally{
        skeleton.value=false
        loading.value=false;
    }
}

onMounted(async () => {
    await refresh();
});

</script>