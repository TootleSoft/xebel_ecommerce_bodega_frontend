<template>
    <div :class="'login-body flex min-h-screen'">
        <Toast />
        <!-- <div class="login-image w-6 h-screen hidden md:block" style="max-width: 490px">
            <img :src="'/demo/images/pages/register-' + (layoutConfig.colorScheme.value === 'dark' ? 'ondark' : 'onlight') + '.png'" alt="atlantis" class="h-screen w-full" />
        </div> -->
        <div class="w-full pt-3 m-3" style="background: var(--surface-ground)">
            <div
                class="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-justify w-full flex align-items-center flex-column bg-auto md:bg-contain bg-no-repeat"
                style="background: var(--exception-pages-image)"
            >
                <div class="flex flex-column">
                    <div v-if="validated">
                        <div class="pt-3 m-3">
                            <br>
                            <br>
                            <div class="form-container text-center " style="max-width: 320px; min-width: 270px">
                                <h4 class="m-0 mb-2 text-3xl">Redireccionando en...</h4>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <h4 class="m-0 mb-2 text-8xl">{{counter}}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const counter = ref<number>(5)
const validated = ref<boolean>(true)

const redirectionCounter = () => {
    toast.add({ severity: 'success', summary: 'Pedido Registrado', detail: "El pedido fue creado con exito", life: 7500 });
    validated.value = true;
    let interval = null
    interval = window.setInterval(() => {
        if(counter.value > 0){
            counter.value--;
        }
        else{
            clearInterval(interval);
            router.push('/');
        }
    }, 800)
}


onMounted(() =>{
    redirectionCounter();
})


</script>