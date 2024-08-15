<template>
    <div :class="'login-body flex min-h-screen'">
        <Toast />
        <!-- <div class="login-image w-6 h-screen hidden md:block" style="max-width: 490px">
            <img :src="'/demo/images/pages/register-' + (layoutConfig.colorScheme.value === 'dark' ? 'ondark' : 'onlight') + '.png'" alt="atlantis" class="h-screen w-full" />
        </div> -->
        <div class="w-full pt-3 m-3" style="background: var(--surface-ground)">
            <div
                class="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-center w-full flex align-items-center flex-column bg-auto md:bg-contain bg-no-repeat"
                style="background: var(--exception-pages-image)"
            >
                <div class="flex flex-column">
                    <div class="align-items-center mb-6 logo-container">
                        <!-- <img :src="'/layout/images/logo/logo-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'" class="login-logo" style="width: 45px" /> -->
                        <img :src="'/src/images/logo/appname-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'" class="login-appname ml-3" style="width: 100px" />
                    </div>
                    <div class="border-1 border-round border-gray-50">
                        <div class="pt-3 m-3">
                            <div class="form-container text-left " style="max-width: 320px; min-width: 270px">
                                <h4 class="m-0 mb-2">Recuperar Contraseña</h4>
                                <span class="block text-600 font-medium mb-4">Ingresa el correo de tu usuario</span>
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-envelope" />
                                    <InputText v-model="email" type="mail" autocomplete="off" placeholder="Email" class="block mb-3" style="max-width: 320px; min-width: 270px" />
                                </IconField>
                            </div>
                            <div class="button-container mt-4 text-left" style="max-width: 320px; min-width: 270px">
                                <div class="buttons flex align-items-center gap-3">
                                    <Button type="button" @click="goLogin" class="block" severity="danger" outlined style="max-width: 320px; margin-bottom: 32px">Cancelar</Button>
                                    <Button type="button" @click="submit" class="block" style="max-width: 320px; margin-bottom: 32px">Enviar</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="login-footer flex align-items-center mt-4">
                    <span class="text-sm text-color-secondary mr-3">Copyright 2024</span>
                </div>
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
const authStore = useAuthStore();
const toast = useToast();
const email = ref<string>('')


const { layoutConfig } = useLayout();
const router = useRouter();

const confirmed = ref(false);

const goSingIn = () => {
    router.push('/auth/singin');
};

const goLogin = () => {
    router.push('/auth/login');
};

const submit = async () => {
    try{
        if(email.value == null)
            throw "Favor de ingresar un correo valido"
        let response = await axios.get('Comercial/EComerceUser/Reset/'+email.value)
        toast.add({ severity: 'success', summary: 'Inicio de session', detail: "Credenciales Validadas", life: 7500 });
        console.log(JSON.stringify(response.data))
        authStore.setSession(response.data.id_user,response.data.id_customer,response.data.user, response.data.company, response.data.branch, response.data.branch_name);
        router.push('/');
        setTimeout((): void =>{
            window.location.reload();
        }, 200)
    }catch(error){
        try{
            toast.add({ severity: 'error', summary: 'Error al crear usuario', detail: error.response.data, life: 7500 });
        }catch{
            toast.add({ severity: 'error', summary: 'Error al crear usuario', detail: error, life: 7500 });
        }
    }
    
};
</script>