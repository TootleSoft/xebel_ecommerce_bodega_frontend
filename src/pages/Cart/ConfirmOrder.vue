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
                    <!-- Proceso de validacion -->
                    <div v-if="!validated">
                        <div class="pt-3 m-3">
                            <br>
                            <br>
                            <div class="form-container text-center " style="max-width: 320px; min-width: 270px">
                                <h4 class="m-0 mb-2 text-3xl">Procesando pedido porfavor espere unos momentos...</h4>
                                <br>
                                <br>
                                <br>
                                <br>
                                <br>
                                <ProgressSpinner class="w-full"/>
                            </div>
                        </div>
                    </div>
                    <!-- proceso de redireccion -->
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
                    <Button  @click="redirectionCounter"></button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from "primevue/usetoast";
import { useAuthStore } from '../../stores/auth';
const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

const counter = ref<number>(5)
const validated = ref<boolean>(false)

const redirectionCounter = () => {
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




</script>