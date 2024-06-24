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
                        <img :src="'/layout/images/logo/appname-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'" class="login-appname ml-3" style="width: 100px" />
                    </div>
                    <div class="border-1 border-round border-gray-50">
                        <div class="pt-3 m-3">
                            <div class="form-container text-left " style="max-width: 320px; min-width: 270px">
                                <h4 class="m-0 mb-2">Iniciar Sesion</h4>
                                <span class="block text-600 font-medium mb-4">Ingresa tus credenciales</span>
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-envelope" />
                                    <InputText v-model="entity.email" type="mail" autocomplete="off" placeholder="Email" class="block mb-3" style="max-width: 320px; min-width: 270px" />
                                </IconField>
                                <IconField iconPosition="left">
                                    <InputIcon class="pi pi-key" />
                                    <InputText @keyup.enter="submit" v-model="entity.password" type="password" autocomplete="off" placeholder="Contraseña" class="block mb-3" style="max-width: 320px; min-width: 270px" />
                                </IconField>
                            </div>
                            <div class="button-container mt-4 text-left" style="max-width: 320px; min-width: 270px">
                                <div class="buttons flex align-items-center gap-3">
                                    <Button type="button" @click="goHome" class="block" severity="danger" outlined style="max-width: 320px; margin-bottom: 32px">Cancelar</Button>
                                    <Button type="button" @click="submit" class="block" style="max-width: 320px; margin-bottom: 32px">Enviar</Button>
                                </div>
                                <span class="font-medium text-600">¿No tienes tienes cuenta? <a class="font-semibold cursor-pointer text-900 hover:text-primary transition-colors transition-duration-300" @click="goSingIn">Registrate aqui</a></span>
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
        if(entity.value.email == null || entity.value.password == null)
            throw "Favor de llenar todos los campos"
        let response = await axios.get('Comercial/EComerceUser/GetSession/'+entity.value.email+'/'+entity.value.password)
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