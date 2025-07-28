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
import { ref, watch, onMounted } from 'vue';

const emit = defineEmits(['v-model']);

interface Props {
        allcategories?: any[];
        filtername?: string;
        pickone?: boolean;
        selected?: any[];
    }

const props = withDefaults(defineProps<Props>(),{
        allcategories: () => [],
        filtername: '',
        pickone: false,
        selected: () => [],
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

onMounted(()=>{
    selectedCategories.value = props.selected
})

</script>

<style scoped>
.card {
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    margin: 20px;
}

h1.text-900 {
    font-size: 1.25rem;
    font-family: 'Montbold';
    color: #333;
}

label {
    font-size: 1rem;
    margin-left: 8px;
    color: rgb(19, 51, 73);
    font-family: 'Montsemibold';
}

button {
    margin-top: 15px;
    padding: 10px 20px;
    background-color: #0eabbd;
    color: white;
    border-radius: 4px;
    border: none;
    cursor: pointer;
    font-family: 'Montserrat';
}

button:hover {
    background-color: #009b99;
}

button:focus {
    outline: none;
}

.flex {
    display: flex;
    align-items: center;
}

.align-items-center {
    align-items: center;
}

.mb-4 {
    margin-bottom: 1rem;
}

.text-base {
    font-size: 1rem;
}

.text-900 {
    font-weight: bold;
}

.checkbox {
    margin-right: 10px;
}

br {
    margin-bottom: 15px;
}
</style>