<script setup>
import { useLayout } from '@/layout/composables/layout';
import { useRouter } from 'vue-router';

const { layoutConfig } = useLayout();
const router = useRouter();

const goHome = () => {
    router.push('/');
};
</script>

<template>
    <div :class="'login-body flex min-h-screen  ' + (layoutConfig.colorScheme.value === 'light' ? 'layout-light' : 'layout-dark')">
        <div class="login-image w-6 h-screen hidden md:block" style="max-width: 490px">
            <img :src="'/demo/images/pages/forgot-password-' + (layoutConfig.colorScheme.value === 'dark' ? 'ondark' : 'onlight') + '.png'" alt="atlantis" class="h-screen w-full" />
        </div>
        <div class="w-full" style="background: var(--surface-ground)">
            <div
                class="p-fluid min-h-screen bg-auto md:bg-contain bg-no-repeat text-center w-full flex align-items-center md:align-items-start justify-content-center flex-column bg-auto md:bg-contain bg-no-repeat"
                style="padding: 20% 10% 20% 10%; background: var(--exception-pages-image)"
            >
                <div class="flex flex-column">
                    <div class="flex align-items-center mb-6 logo-container">
                        <img :src="'/layout/images/logo/logo-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'" class="login-logo" style="width: 45px" />
                        <img :src="'/layout/images/logo/appname-' + (layoutConfig.colorScheme.value === 'light' ? 'dark' : 'light') + '.png'" class="login-appname ml-3" style="width: 100px" />
                    </div>
                    <div class="form-container text-left" style="max-width: 320px; min-width: 270px">
                        <h4 class="m-0 mb-2">Forgot Password</h4>
                        <span class="block text-600 font-medium mb-4">Enter your email to reset your password</span>
                        <IconField iconPosition="left">
                            <InputIcon class="pi pi-envelope" />
                            <InputText type="mail" autocomplete="off" placeholder="Email" class="block mb-3" style="max-width: 320px; min-width: 270px" />
                        </IconField>
                    </div>
                    <div class="button-container mt-4 text-left" style="max-width: 320px; min-width: 270px">
                        <div class="buttons flex align-items-center gap-3">
                            <Button type="button" @click="goHome" class="block" style="max-width: 320px; margin-bottom: 32px">Submit</Button>
                        </div>
                    </div>
                </div>
                <div class="login-footer flex align-items-center absolute" style="bottom: 75px">
                    <div class="flex align-items-center login-footer-logo-container pr-4 mr-4 border-right-1 surface-border">
                        <img src="/layout/images/logo/logo-gray.png" class="login-footer-logo" style="width: 22px" />
                        <img src="/layout/images/logo/appname-gray.png" class="login-footer-appname ml-2" style="width: 45px" />
                    </div>
                    <span class="text-sm text-color-secondary mr-3">Copyright 2023</span>
                </div>
            </div>
        </div>
    </div>
</template>
