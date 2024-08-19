import { defineStore } from "pinia";
import { useStorage } from 'vue3-storage';
import { useRouter } from 'vue-router';

const router = useRouter();
const storage = useStorage();

export interface AuthState {
    id_usuario?: number;
    id_customer?: number;
    usuario?: string;
    company?: number;
    branch?: number;
    branch_name?: string;
    zip_code?: string;
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: (): AuthState => ({
        id_usuario: storage.getStorageSync<number>('id_usuario') ?? undefined,
        id_customer: storage.getStorageSync<number>('id_customer') ?? undefined,
        usuario: storage.getStorageSync<string>('usuario') ?? undefined,
        company: storage.getStorageSync<number>('company') ?? undefined,
        branch: storage.getStorageSync<number>('branch') ?? undefined,
        branch_name: storage.getStorageSync<string>('branch_name') ?? undefined,
        zip_code: storage.getStorageSync<string>('zip_code') ?? undefined,
    }),
    actions: {
        setSession(id_usuario: number, id_customer: number, usuario: string, company: number | undefined, branch: number | undefined, branch_name: string | undefined, zip_code: string | undefined) {
            // const sessionLength = parseInt(import.meta.env.VITE_SESSION_HOURS_DURATION) * 60 * 60000;
            storage.setStorageSync('id_usuario', id_usuario, undefined);
            storage.setStorageSync('id_customer', id_customer, undefined);
            storage.setStorageSync('usuario', usuario, undefined);
            storage.setStorageSync('company', company, undefined);
            storage.setStorageSync('branch', branch, undefined);
            storage.setStorageSync('branch_name', branch_name, undefined);
            storage.setStorageSync('zip_code', zip_code, undefined);
            console.log("cp",zip_code)
            this.id_usuario = id_usuario;
            this.id_customer = id_customer;
            this.usuario = usuario;
            this.company = company;
            this.branch = branch;
            this.branch_name = branch_name;
            this.zip_code = zip_code;
            // EnvUtils.isDev() && console.log('Using pinia 🍍 [auth:setSession]', this.$state);
        },
        logout() {
            storage.removeStorageSync('id_usuario');
            storage.removeStorageSync('id_customer');
            storage.removeStorageSync('usuario');
            storage.removeStorageSync('company');
            storage.removeStorageSync('branch');
            storage.removeStorageSync('branch_name');
            storage.removeStorageSync('zip_code');

            // Limpiar el estado del store
            this.id_customer = undefined;
            this.id_usuario = undefined;
            this.usuario = undefined;
            this.company = undefined;
            this.branch = undefined;
            this.branch_name = undefined;
            this.zip_code = undefined;
        },
    }
})