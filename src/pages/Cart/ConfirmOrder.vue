<template>
    <div :class="'login-body flex min-h-screen'">
        <Toast />
        <!-- Imagen de fondo comentada (puedes descomentarla si la necesitas) -->
        <!-- <div class="login-image w-6 h-screen hidden md:block" style="max-width: 490px">
            <img :src="'/demo/images/pages/register-' + (layoutConfig.colorScheme.value === 'dark' ? 'ondark' : 'onlight') + '.png'" alt="atlantis" class="h-screen w-full" />
        </div> -->
        <div class="w-full pt-3 m-3" style="background: var(--surface-ground)">
            <div
                class="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-justify w-full flex align-items-center flex-column"
                style="background: var(--exception-pages-image)"
            >
                <div class="flex flex-column">
                    <div v-if="validated">
                        <div class="pt-3 m-3">
                            <br>
                            <br>
                            <div class="form-container text-center" style="max-width: 320px; min-width: 270px">
                                <h4 class="m-0 mb-2 text-3xl font-medium" style="font-family: 'Montsemibold'">Redireccionando en...</h4>
                                <br>
                                <br>
                                <div class="countdown-container">
                                    <h4 class="counter m-0 text-8xl font-bold" style="font-family: 'Montsemibold';">{{counter}}</h4>
                                </div>
                                <div class="loading-indicator">
                                    <div class="spinner"></div>
                                </div>
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


<style scoped>
/* Contenedor principal */
.login-body {
    background-color: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    min-height: 100vh;
}

/* Fondo con imagen para el formulario */
.bg-auto {
    background-size: cover;
    background-position: center;
}

.form-container {
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    text-align: center;
}

h4 {
    color: #333;
}

.text-3xl {
    font-size: 1.875rem;
}

.text-8xl {
    font-size: 6rem;
}

.text-center {
    text-align: center;
}

/* Estilo del contador */
.countdown-container {
    margin-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.counter {
    color: #0F7E8D; /* Color de texto destacado */
    animation: bounce 1s infinite alternate;
}

/* Efecto de animación de rebote */
@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-20px);
    }
}

/* Indicador de carga */
.loading-indicator {
    margin-top: 3rem;
}

.spinner {
    border: 6px solid #f3f3f3;
    border-top: 6px solid #0F7E8D; /* Color de la animación */
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1.5s linear infinite;
}

/* Efecto de rotación del spinner */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

/* Estilo adicional de texto */
.font-medium {
    font-weight: 500;
}

.font-bold {
    font-weight: 700;
}

</style>