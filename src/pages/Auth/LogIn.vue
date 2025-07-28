<template>
    <!-- LOGIN -->
    <div :class="'login-body flex min-h-screen bg-gray-50'">
        <Toast />
        <div class="w-full pt-3 m-3" style="background: var(--surface-ground)">
            <div
                class="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-center w-full flex align-items-center flex-column bg-auto md:bg-contain bg-no-repeat"
                style="background: var(--exception-pages-image)"
            >
                <div class="flex flex-column">
                    <div class="align-items-center mb-6 logo-container">
                        <!-- Logo -->
                        <img :src="'/src/images/logo/logo-bdr.svg'" class="login-appname" style="max-width: 360px;" />
                    </div>
                    <div class="border-1 border-round border-gray-300 shadow-lg" style="width: 100%; max-width: 400px;">
                        <div class="pt-5 px-6">
                            <div class="form-container text-left " style="max-width: 400px; min-width: 270px">
                                <h4 class="text-2xl font-semibold mb-2 text-center" style="font-family: 'Montsemibold';">Iniciar Sesión</h4>
                                <span class="block text-lg font-medium text-gray-600 mb-5 text-center" style="font-family: 'Montserrat';">Ingresa tus credenciales</span>

                                <!-- Campos de texto -->
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-envelope text-gray-600 pl-1" />
                                    <InputText v-model="entity.email" type="email" autocomplete="off" placeholder="Email" class="block mb-4 pl-6 w-full border-2 border-gray-300 rounded-md p-3" style="font-family: 'Montserrat';"/>
                                </IconField>

                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-key text-gray-600 pl-1" />
                                    <InputText @keyup.enter="submit" v-model="entity.password" type="password" autocomplete="off" placeholder="Contraseña" class="block mb-4 pl-6 w-full border-2 border-gray-300 rounded-md p-3" style="font-family: 'Montserrat';"/>
                                </IconField>
                            </div>

                            <!-- Botones de acción -->
                            <div class="button-container mt-4">
                                <div class="buttons flex flex-col gap-3">
                                    <Button type="button" @click="goHome" class="block w-full py-3 font-medium text-white bg-red-500 border-0 rounded-md hover:bg-red-600 transition duration-300 ease-in-out" style="font-family: 'Montserrat'">Cancelar</Button>
                                    <Button type="button" @click="submit" class="block w-full py-3 font-medium text-white bg-blue-600 border-0 rounded-md hover:bg-blue-700 transition duration-300 ease-in-out" style="font-family: 'Montserrat'">Enviar</Button>
                                </div>


                                <!-- Enlaces de registro y recuperación de contraseña -->
                                <div class="mt-4 text-center">
                                    <span class="text-lg text-gray-600" style="font-family: 'Montserrat';">¿No tienes cuenta? <a class="font-semibold cursor-pointer text-blue-600 hover:text-blue-700 transition-colors transition-duration-300" @click="goSingIn" style="font-family: 'Montserrat';">Registrate aquí</a></span>
                                </div>

                                <div class="mt-4 mb-4 text-center">
                                    <a class="font-semibold cursor-pointer text-blue-600 hover:text-blue-700 transition-colors transition-duration-300" @click="router.push('/auth/recoveryemail');">Olvidé mi contraseña</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Footer -->
                <div class="login-footer flex justify-center items-center mt-8">
                    <span class="text-sm text-gray-500" style="font-family: 'Montserrat';">Copyright {{ currentYear }}</span>
                </div>
                <AppLoading v-if="loading" />

            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useLayout } from '../../layout/composables/layout.js';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import axios from 'axios';
import Password from 'primevue/password';
import { useToast } from "primevue/usetoast";
import { useAuthStore } from '../../stores/auth';
import AppLoading from '../../components/reusables/AppLoading.vue';


const authStore = useAuthStore();
const toast = useToast();
const currentYear = new Date().getFullYear();
const loading = ref(false);

export interface ecomerce_user {
    id?: number | null;
    id_company?: number | null;
    id_branch?: number | null;
    name?: string | null;
    email?: string | null;
    password?: string | null;
    created?: Date | null;
    created_by?: string | null;
    modified?: Date | null;
    modified_by?: string | null;
}

const entity = ref<ecomerce_user>({
    id: null,
    id_company: null,
    id_branch: null,
    name: null,
    email: null,
    password: null,
    created: new Date(),
    created_by: null,
    modified: null,
    modified_by: null
});

const { layoutConfig } = useLayout();
const router = useRouter();

const confirmed = ref(false);

const goSingIn = () => {
    router.push('/auth/singin');
};

const goHome = () => {
    router.push('/');
};

const submit = async () => {
    try{
        loading.value = true
        if(entity.value.email == null || entity.value.password == null)
            throw "Favor de llenar todos los campos"
        let response = await axios.get('Comercial/EComerceUser/GetSession/'+entity.value.email+'/'+entity.value.password)
        toast.add({ severity: 'success', summary: 'Inicio de session', detail: "Credenciales Validadas", life: 7500 });
        //console.log(JSON.stringify(response.data))
        authStore.setSession(response.data.id_user,response.data.id_customer,response.data.user, response.data.company, response.data.branch, response.data.branch_name, response.data.zip_code);
        
        setTimeout((): void =>{
            window.location.reload();
        }, 200)
        await router.push('/');
    }catch(error){
        try{
            toast.add({ severity: 'error', summary: 'Error al crear usuario', detail: error.response.data, life: 7500 });
        }catch{
            toast.add({ severity: 'error', summary: 'Error al crear usuario', detail: error, life: 7500 });
        }
    }
    finally {
        loading.value = false
    }
    
};
</script>
<style scoped>
/* Agregar un fondo con gradiente sutil para la página */
.login-body {
    background: linear-gradient(180deg, rgba(250, 250, 250, 1) 0%, rgba(255, 255, 255, 1) 100%);
}

/* Estilización del contenedor de la imagen de fondo */
.login-appname {
    transition: transform 0.3s ease-in-out;
}
.login-appname:hover {
    transform: scale(1.05);
}

/* Botones: efectos al pasar el mouse */
button:hover {
    transform: translateY(-2px);
}

/* Efectos en enlaces */
a {
    transition: color 0.3s ease-in-out;
}
a:hover {
    color: #1D4ED8; /* Azul más brillante */
}

/* Estilos del pie de página */
.login-footer {
    font-family: 'Montserrat';
    font-size: 0.875rem;
    color: #6B7280; /* Gris */
}

/* Espaciado adecuado para los campos y botones */
button {
    padding: 12px 16px;
    font-size: 1rem;
    border-radius: 8px;
}

.input-text {
    padding: 10px;
    font-size: 1rem;
}

</style>