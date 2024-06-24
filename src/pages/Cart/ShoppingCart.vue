<template>
    <div class="card">
        <div class="flex flex-column align-items-center mb-6">
            <div class="text-900 text-4xl mb-4 font-medium">Tu total en el carrito es {{total.toFixed(2)}}</div>
            <Button label="Pagar" @click="router.push('/orderdata')"/>
        </div>
        <ul class="list-none p-0 m-0">
            <ShoppingCartProduct></ShoppingCartProduct>
        </ul>
        <div class="flex">
            <div class="w-12rem hidden md:block"></div>
            <ul class="list-none py-0 pr-0 pl-0 md:pl-5 mt-6 mx-0 mb-0 flex-auto">
                <li class="flex justify-content-between mb-4">
                    <span class="text-xl text-900 font-semibold">Subtotal</span>
                    <span class="text-xl text-900">${{subtotal.toFixed(2)}}</span>
                </li>
                <li class="flex justify-content-between mb-4">
                    <span class="text-xl text-900 font-semibold">Impuestos</span>
                    <span class="text-xl text-900">${{taxes.toFixed(2)}}</span>
                </li>
                <li class="flex justify-content-between border-top-1 surface-border mb-4 pt-4">
                    <span class="text-xl text-900 font-bold text-3xl">Total</span>
                    <span class="text-xl text-900 font-bold text-3xl">${{ total.toFixed(2) }}</span>
                </li>
                <li class="flex justify-content-end">
                    <Button label="Pagar" @click="router.push('/orderdata')"></Button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import ShoppingCartProduct from './ShoppingCartProduct.vue';
import { useCartStore } from '../../stores/cart';
import { useRouter } from 'vue-router';
const cartStore = useCartStore();
const router = useRouter();

const quantityOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 }
];

const total = computed(()=>{
    let i = 0;
    for(const product of cartStore.cart){
        i = i + (product.price_tax*product.quantity)
    }
    return i
})

const subtotal = computed(()=>{
    let i = 0;
    for(const product of cartStore.cart){
        if(product.is_bundle){
            i = i + ((product.price_tax)*product.quantity / 1.16)
        }else{
            i = i + ((product.ecomerce_offer_price ?? product.unit_price)*product.quantity)
        }
    }
    return i
})

const taxes = computed(()=>{
    let i = 0;
    for(const product of cartStore.cart){
        i = i + ((product.ecomerce_offer_price ?? product.unit_price ?? product.price_tax)*((product.iva_transferred+product.ieps_transferred)*.01)*product.quantity)
    }
    return i
})

const selectedQuantity = ref({ label: '1', value: 1 });
const selectedQuantity2 = ref({ label: '1', value: 1 });
</script>