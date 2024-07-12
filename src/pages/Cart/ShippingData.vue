<template>
    <div class="col-12 field mb-4">
        <span class="text-900 text-2xl block font-medium mb-5">Agregar direccion</span>
    </div>
    <div class="col-12 lg:col-6 field mb-4">
        <Dropdown :options="props.countries" v-model="entity.country" placeholder="Pais" optionLabel="name" optionValue="name" showClear class="w-full"></Dropdown>
    </div>
    <div class="col-12 lg:col-6 field mb-4">
        <input v-model="entity.state" id="Estado" placeholder="Estado" type="text" class="p-inputtext w-full" />
    </div>
    <div class="col-12 lg:col-6 field mb-4">
        <input v-model="entity.municipality" id="Municipio" placeholder="Municipio" type="text" class="p-inputtext w-full" />
    </div>
    <div class="col-12 lg:col-6 field mb-4">
        <input v-model="entity.suburb" id="Colonia" placeholder="Colonia" type="text" class="p-inputtext w-full" />
    </div>
    <div class="col-12 field mb-4">
        <input v-model="entity.address" id="Direccion" placeholder="Direccion" type="text" class="p-inputtext w-full" />
    </div>
    <div class="col-12 lg:col-6 field mb-4">
        <input v-model="entity.postal_code" id="pc" placeholder="Codigo Postal" type="number" class="p-inputtext w-full" />
    </div>
    <div class="col-12 flex align-items-center justify-content-center">
        <Button @click="save" class="flex align-items-center justify-content-center" label="Gurdar Direccion" icon="pi pi-save"></Button>
        &nbsp&nbsp&nbsp
        <Button @click="close" class="flex align-items-center justify-content-center" label="Cerrar" icon="pi pi-times"></Button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { CountryService } from '../../service/CountryService';
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
import axios from 'axios';
import { useToast } from "primevue/usetoast";


const toast = useToast();
const countryService = new CountryService();
const selectedCountry = ref(null);

export interface customer_reference {
    id?: number | null;
    id_company?: number | null;
    id_branch?: number | null;
    id_customer?: number | null;
    postal_code?: string | null;
    country?: string | null;
    state?: string | null;
    municipality?: string | null;
    suburb?: string | null;
    address?: string | null;
    created?: Date | null;
    created_by?: string | null;
    modified?: Date | null;
    modified_by?: string | null;
}

interface Props {
    countries?: any[];
}

const props = withDefaults(defineProps<Props>(), {
    countries: () => [],
})

const entity = ref<customer_reference>({
    id: null,
    id_company: authStore.company,
    id_branch: authStore.branch,
    id_customer: authStore.id_customer,
    postal_code: null,
    country: null,
    state: null,
    municipality: null,
    suburb: null,
    address: null,
    created: new Date(),
    created_by: null,
    modified: null,
    modified_by: null,
});

const emit = defineEmits(['saveShippingData','close'])

const save = async () => {
    try{
        if((entity.value.postal_code == null || entity.value.postal_code == "") || (entity.value.country == null || entity.value.country == "" ) 
        || (entity.value.state == null || entity.value.state == "") || (entity.value.municipality == null || entity.value.municipality == "") 
        || (entity.value.suburb == null || entity.value.suburb == "") || (entity.value.address == null || entity.value.address == ""))
            throw "Favor de llenar todos los campos obligatorios"
        console.log(JSON.stringify(entity.value))
        entity.value.postal_code = entity.value.postal_code.toString();
        let response = await axios.post('Comercial/EComerceUser/SaveShippingData',entity.value)
        toast.add({ severity: 'success', summary: 'Registrado', detail: "Direccion registrada", life: 7500 });
        emit('saveShippingData')
    }catch(error){
        try{
            toast.add({ severity: 'error', summary: 'Error al crear usuario', detail: error.response.data, life: 7500 });
        }catch{
            toast.add({ severity: 'error', summary: 'Error al crear usuario', detail: error, life: 7500 });
        }
    }
}

const close = () => {
    try{
        emit('close')
    }catch{

    }
}



// onMounted(() => {
//     countryService.getCountries().then((data) => (countries.value = data));
//     });
</script>
