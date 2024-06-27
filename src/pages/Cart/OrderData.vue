<template>
    <div class="card">
        <div class="grid grid-nogutter">
            <!-- Izquierda -->
            <div class="col-12 px-4 mt-4 md:mt-6 md:px-6">
                <span class="text-900 block font-bold text-xl">Detalle del pedido</span>
            </div>
            <div class="col-12 lg:col-6 h-full px-4 py-4 md:px-6">
                <div class="card flex justify-content-center">
                    <div class="flex flex-wrap gap-3">
                        <div class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt1" name="delivery" value="1" />
                            <label for="dt1" class="ml-2">Entrega en Sucursal</label>
                        </div>
                        <div class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt2" name="delivery" value="2" />
                            <label for="dt2" class="ml-2">Entrega en domicilio</label>
                        </div>
                    </div>
                </div>
                <div v-if="deliveryType == 1" class="grid formgrid">
                    <div class="col-12 field mb-6">
                        <span class="text-900 text-2xl block font-medium mb-5">Los productos se entregaran en la sucursar seleccionada en cada uno</span>
                    </div>
                    <!-- <div class="col-12 lg:col-6 field mb-4">
                        <div class="field-checkbox">
                            <Checkbox name="checkbox-2" v-model="billable" binary inputId="checkbox-2"></Checkbox>
                            <label for="checkbox-2">¿Deseas Facturar?</label>
                        </div>
                    </div> -->
                </div>
                <div v-if="deliveryType == 2" class="grid formgrid">
                    <!-- <div class="col-12 field mb-6">
                        <span class="text-900 text-2xl block font-medium mb-5">Contact Information</span>
                        <input id="email" placeholder="Email" type="text" class="p-inputtext w-full mb-4" />
                    </div> -->
                    <div class="col-12 field mb-4">
                        <span class="text-900 text-2xl block font-medium mb-5">Direccion de entrega</span>
                        <Dropdown :options="customerReferences" v-model="selectedReference" placeholder="Selecciona una direccion de envio" optionLabel="name" optionValue="id" showClear class="w-full"></Dropdown>
                        <br>
                        <br>
                        <div class="col-12 flex align-items-center justify-content-center">
                            <Button v-if="!showShippingData" @click="showShippingData=true" class="flex align-items-center justify-content-center" label="Agregar Nueva direccion" icon="pi pi-fw pi-check"></Button>
                        </div>
                    </div>
                    <ShippingData v-if="showShippingData" @saveShippingData="refreshReferences" @close="showShippingData=false"></ShippingData>
                    <br>
                    <br>
                    <br>
                    <!-- <div class="col-12 lg:col-6 field mb-4">
                        <div class="field-checkbox">
                            <Checkbox name="checkbox-2" v-model="billable" binary inputId="checkbox-2"></Checkbox>
                            <label for="checkbox-2">¿Desea facturar?</label>
                        </div>
                    </div> -->
                </div>
                <div class="grid formgrid">
                    <div class="col-12 field mb-4">
                        <div class="field-checkbox">
                            <Checkbox name="checkbox-2" v-model="billable" binary inputId="checkbox-2"></Checkbox>
                            <label for="checkbox-2">¿Desea facturar?</label>
                        </div>
                    </div>
                    <div v-if="billable" class="grid formgrid col-12">
                        <div class="col-12 field mb-4">
                            <input v-model="invoiceAddress"  id="Direccion de Faturacion" placeholder="Direccion de Faturacion" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="rfc" id="rfc" placeholder="RFC" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <Dropdown :options="useCfdi" v-model="customerUseCfdi" placeholder="Uso CFDI" optionLabel="Descripcion" optionValue="c_UsoCFDI" showClear class="w-full"></Dropdown>
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <Dropdown :options="taxRegime" v-model="customerTaxRegime" placeholder="Regimen Fiscal" optionLabel="Descripcion" optionValue="c_RegimenFiscal" showClear class="w-full"></Dropdown>                        </div>
                    </div>
                </div>
            </div>
            <!-- Derecha -->
            <div class="col-12 lg:col-6 px-4 py-4 md:px-6">
                <div class="pb-3 surface-border">
                    <span class="text-900 font-medium text-xl">Tus Productos</span>
                </div>
                <OrderDataProduct></OrderDataProduct>
                <div class="flex flex-column lg:flex-row flex-wrap lg:align-items-center py-2 mt-3 surface-border">
                    <img src="/demo/images/ecommerce/shop/shop-1.png" class="w-8rem h-8rem flex-shrink-0 mb-3" alt="product" />
                    <div class="flex-auto lg:ml-3">
                        <div class="flex align-items-center justify-content-between mb-3">
                            <span class="text-900 font-bold">Product Name</span>
                            <span class="text-900 font-bold">$123.00</span>
                        </div>
                        <div class="text-600 text-sm mb-3">Black | Large</div>
                        <div class="flex flex-auto justify-content-between align-items-center">
                            <InputNumber
                                showButtons
                                buttonLayout="horizontal"
                                :min="0"
                                inputClass="w-2rem text-center py-2 px-1 border-transparent outline-none shadow-none"
                                v-model="quantities[0]"
                                class="border-1 surface-border border-round"
                                decrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                                incrementButtonClass="p-button-text text-600 hover:text-primary py-1 px-1"
                                incrementButtonIcon="pi pi-plus"
                                decrementButtonIcon="pi pi-minus"
                            ></InputNumber>
                            <Button icon="pi pi-trash" text rounded></Button>
                        </div>
                    </div>
                </div>
                <div class="py-2 mt-3 surface-border">
                    <InputGroup class="mt-3">
                        <InputText type="text" v-model="value" placeholder="Promo code" class="w-full" />
                        <Button type="button" label="Apply" :disabled="!value"></Button>
                    </InputGroup>
                </div>
                <div class="py-2 mt-3">
                    <div class="flex justify-content-between align-items-center mb-3">
                        <span class="text-900 font-medium">Subtotal</span>
                        <span class="text-900">$123.00</span>
                    </div>
                    <div class="flex justify-content-between align-items-center mb-3">
                        <span class="text-900 font-medium">Shipping</span>
                        <span class="text-primary font-bold">Free</span>
                    </div>
                    <div class="flex justify-content-between align-items-center mb-3">
                        <span class="text-900 font-bold">Total</span>
                        <span class="text-900 font-medium text-xl">$123.00</span>
                    </div>
                </div>
                <div class="py-2 mt-3 bg-yellow-100 flex align-items-center justify-content-center border-round">
                    <img src="/demo/images/ecommerce/shop/flag.png" class="mr-2" alt="Country Flag" />
                    <span class="text-black-alpha-90 font-medium">No additional duties or taxes.</span>
                </div>
            </div>
        </div>
        <div class="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-end my-6">
            <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" severity="secondary" label="Regresar al carrito" icon="pi pi-fw pi-arrow-left"></Button>
            <Button class="w-full lg:w-auto flex-order-1 lg:flex-order-2" label="Pagar" icon="pi pi-fw pi-check" @click="processPayment"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import ShippingData from './ShippingData.vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import OrderDataProduct from './OrderDataProduct.vue';
import cfdiData from '../Cart/useCFDI.json';
import taxReg from '../Cart/taxRegime.json'
import { ImportsNotUsedAsValues, isEntityName } from 'typescript';
import {Buffer} from 'buffer'
import { pointInsideRect } from '@fullcalendar/core/internal';

export interface open_pay_data {
    amount: string;
    currency: string;
    description: string;
    order_id: string;
    send_email: string;
    capture: string;
    customer:{
        name: string;
        last_name: string;
        phone_number: string;
        email: string;
    };
    redirect_url: string;
}

export interface open_pay_check{
    amount: string;
}

const payment_info = ref<open_pay_data>({
    amount: "100.00",
    currency: "MXN",
    description: "Botón de pago",
    order_id: "ord-00011",
    send_email: "true",
    capture: "false",
    customer:{
        name: "Jorge",
        last_name: "Aguilar",
        phone_number: "8125714737",
        email: "jeac1702@gmail.com",
    },
    redirect_url: import.meta.env.INDEX_URL,
});

const payment_check = ref<open_pay_check>({
    amount: "100.00",
})

const openpayAxios = axios.create({
  baseURL: import.meta.env.VITE_OPENPAY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(`${import.meta.env.VITE_OPENPAY_PRIVATE_API_KEY}:`).toString('base64')}`
  }
});

const authStore = useAuthStore();
const value = ref('');
const quantities = ref([1, 1, 1]);
const billable = ref(false);
const selectedReference = ref(null);
const customerReferences = ref<any[]>([])
const deliveryType = ref<number>(1);
const showShippingData = ref<boolean>(false);
const invoiceAddress = ref<string>(null)
const rfc = ref<string>(null)
const customerUseCfdi = ref<string>(null)
const customerTaxRegime = ref<string>(null)
const useCfdi = ref<any[]>(cfdiData)
const taxRegime = ref<any[]>(taxReg) 

const refresh = async () => {
    try{
        let response = await axios.get('Comercial/EComerceUser/GetReferences/'+authStore.id_customer)
        customerReferences.value = response.data;
        response = await axios.get('Comercial/EComerceUser/GetInvoiceData/'+authStore.id_customer)
        invoiceAddress.value = response.data[0].address;
        rfc.value = response.data[0].rfc;
    }catch(error){
        console.log(JSON.stringify(error))
    }
}

const refreshReferences = async () => {
    try{
        let response = await axios.get('Comercial/EComerceUser/GetReferences/'+authStore.id_customer)
        customerReferences.value = response.data;
        response = await axios.get('Comercial/EComerceUser/GetInvoiceData/'+authStore.id_customer)
        invoiceAddress.value = response.data[0].address;
        rfc.value = response.data[0].rfc;
        showShippingData.value = false;
    }catch(error){
        console.log(JSON.stringify(error))
    }
}

const processPayment = async () => {
    try {
        let response = await openpayAxios.post('checkouts/', payment_info.value)
        console.log('Respuesta de OpenPay:', response.data);
        // Maneja la respuesta de OpenPay, por ejemplo, redirige al cliente a la URL de confirmación
        // window.location.href = response.data.checkout_link;
    } catch (error) {
        console.log(JSON.stringify(error.response.data.request_id))
        try{
            let response = await openpayAxios.post('/charges/ckv5eod38kjhyecknuhw/capture')
            console.log('Respuesta de OpenPay:', response.data);
        }catch(error2){
            if (axios.isAxiosError(error2)) {
                console.error('Error procesando el pago:', error2.response?.data);
            } else {
                console.error('Error desconocido:', error2);
            }
        }
        if (axios.isAxiosError(error)) {
            console.error('Error procesando el pago:', error.response?.data);
        } else {
            console.error('Error desconocido:', error);
        }
    }
};

onMounted(async () => {
    deliveryType.value = 1
    await refresh();
});


</script>