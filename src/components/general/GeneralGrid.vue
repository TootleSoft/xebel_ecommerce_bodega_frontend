<template>
    <div class="grid -mt-3 -ml-3 -mr-3">
            <div v-for="(object, i) in props.objects.slice(first/10*pagesize,first/10*pagesize+pagesize)" :key="i" class="col-12 md:col-5 lg:col-2 mb-5 lg:mb-0">
                <div class="mb-3 relative">
                    <img :src="imgroute(object.id)" class="w-full h-19rem border-3 border-500" :alt="String(i)" @click="router.push(object.path)"/>
                </div>
                <div class="flex flex-column align-items-center">
                    <span class="text-l text-900 font-bold mb-3">{{object.name}}</span>
                </div>
            </div>
            <br></br>
            <div class="field col-12 sm:col-12 md:col-12 xl:col-12">
                <Paginator v-model:first="first" :rows="10" :totalRecords="props.objects.length/(pagesize/10)"></Paginator>
            </div>
        </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';



    interface Props {
        objects?: any[];
        pagesize?: number;
    }

    const props = withDefaults(defineProps<Props>(),{
        objects: () => [],
        pagesize: 40,
    })
    
    const imgroute = (id) => {

        return import.meta.env.VITE_API_ROUTE+'Inventory/Brand/image/'+id;
    }

    const first  = ref<number>(0);

    const router = useRouter();
</script>
<style>

</style>