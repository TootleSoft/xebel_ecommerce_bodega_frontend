<template>
    <div class="card">
        <h1 class="text-900 font-small text-base mb-4">{{filtername}}</h1>
        <div v-for="category of categories" :key="category.id" class="flex align-items-center">
            <Checkbox v-model="selectedCategories" name="category" :value="category.id" />
            <label :for="category.key">{{ category.name }}</label>
            <br>
            <br>
        </div>
            <Button v-if="!ViewMoreLess && allcategories.length > 5" label=" Ver Mas" link @click="viewmore"/>
            <Button v-if="ViewMoreLess" label=" Ver Menos" link @click="viewless"/>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits(['v-model']);

interface Props {
        allcategories?: any[];
        filtername?: string;
        pickone?: boolean;
    }

const props = withDefaults(defineProps<Props>(),{
        allcategories: () => [],
        filtername: '',
        pickone: false,
    })

const categories = ref<any[]>(props.allcategories.slice(0, 5));
const ViewMoreLess = ref<boolean>(false);
const selectedCategories = ref<string[]>([]);


const viewmore = () => {
    categories.value = props.allcategories;
    ViewMoreLess.value = true;
}
const viewless = () => {
    categories.value = props.allcategories.slice(0, 5);
    ViewMoreLess.value = false;
}

watch(selectedCategories, (newValue) => {
    if(props.pickone && newValue.length > 1){
        selectedCategories.value = [newValue[newValue.length-1]]
    }
    console.log(newValue)
    emit('v-model', newValue)
});


</script>