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
                        <span class="text-900 text-2xl block font-medium mb-5">Los productos se entregarán en la sucursal seleccionada en cada uno.</span>
                    </div>
                </div>
                <div v-if="deliveryType == 2" class="grid formgrid">
                    <div class="col-12 field mb-4">
                        <span class="text-900 text-2xl block font-medium mb-5">Dirección de entrega</span>
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
                            <input v-model="invoiceAddress"  id="Direccion de Faturacion" placeholder="Dirección de Faturación" type="text" class="p-inputtext w-full" />
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
                <OrderDataProduct @update:flattenedArray="handleUpdate"></OrderDataProduct>
        <div class="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-end my-6">
            <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" severity="secondary" label="Regresar al carrito" icon="pi pi-fw pi-arrow-left"></Button>
            <Button class="w-full lg:w-auto flex-order-1 lg:flex-order-2" label="Pagar" icon="pi pi-fw pi-check" @click="processPayment"></Button>
            <Button class="w-full lg:w-auto flex-order-1 lg:flex-order-2" label="Crear Pedido" icon="pi pi-fw pi-save" @click="createOrder"></Button>
        </div>
    </div>
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
import {Buffer} from 'buffer'
import { useToast } from "primevue/usetoast";

// export interface open_pay_data {
//     method : string;
//     amount: string;
//     currency: string;
//     description: string;
//     order_id: string;
//     customer:{
//         name: string;
//         last_name: string;
//         phone_number: string;
//         email: string;
//     };
//     confirm: string;
//     send_email: string;
//     redirect_url: string;
// }

// const payment_info = ref<open_pay_data>({
//     method: "card",
//     amount: "100.00",
//     currency: "MXN",
//     description: "Botón de pago",
//     order_id: "aaa014",
//     customer:{
//         name: "Jorge",
//         last_name: "Aguilar",
//         phone_number: "8125714737",
//         email: "jeac1702@gmail.com",
//     },
//     confirm: "false",
//     send_email: "true",
//     redirect_url: import.meta.env.VITE_INDEX_URL,
// });

const openpayAxios = axios.create({
  baseURL: import.meta.env.VITE_OPENPAY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${Buffer.from(`${import.meta.env.VITE_OPENPAY_PRIVATE_API_KEY}:`).toString('base64')}`
  }
});

const toast = useToast();
const authStore = useAuthStore();
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
const flattenedArray = ref<any[]>([]);

function handleUpdate(value: any[]) {
    flattenedArray.value = value;
    console.log("flattened", flattenedArray.value)
}

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
        let order = await createOrder(); //se crea el pedido y se guarda en la tabla 'ecommerce_order' y 'ecommerce_order_item'
        let payment_info = await getPaymentInfo({id_order: order.id}); //se obtiene la información del cliente y del pedido
        let response = await openpayAxios.post('charges/', payment_info[0]) //se envía al api de open pay la información obtenida
        console.log('Respuesta de OpenPay:', response.data);
        // Maneja la respuesta de OpenPay, por ejemplo, redirige al cliente a la URL de confirmación
        // window.location.href = response.data.checkout_link;
        let update = await axios.post('Comercial/ECommerceOrder/updateOrder/' + response.data.order_id + '/' + response.data.id);
        // Maneja la respuesta de OpenPay, por ejemplo, redirige al cliente a la URL de confirmación
        window.location.href = response.data.payment_method.url;
    } catch (error) {
        console.log(JSON.stringify(error.response.data.request_id))
        try{
            let response = await openpayAxios.get('/charges/trb0rdnmtp6tmdpykevw/')
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

const createOrder = async () => {
    try{
        const params = {items: flattenedArray.value}
        let response = await axios.post('Inventory/Ecomerce/createOrder',params,{
            headers:{
                company: 1,
                branch: 1,
                user: authStore.id_usuario,
            }
        })
        toast.add({ severity: 'success', summary: 'Pedido', detail: 'Pedido registrado con éxito.', life: 5000 });
        return response.data;
    }catch{
        console.log("ERROR")
    }finally{

    }
}

const getPaymentInfo = async (params) => {
    try {
        let query = "?";
        if (params) {
            Object.keys(params).forEach(prop => {
                if (params[prop] != null) {
                    query = query + prop + "=" + params[prop] + "&";
                }
            });
            query = query.substring(0, query.length - 1);
        } else {
            query = "";
        }
        const response = await axios.get('Comercial/EcommerceOrder/getPaymentInfo/'+ authStore.id_usuario +'/' + query);
        return response.data;
    } catch (error) {
        
    }
}

onMounted(async () => {
    deliveryType.value = 1
    await refresh();
});

</script>