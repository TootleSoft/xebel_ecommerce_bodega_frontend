<template>
    <ProgressSpinner v-if="loading" class="loading-overlay"/>
    <BlockUI :blocked="blocked" fullScreen />
    <div class="card">
        <div class="grid grid-nogutter">
            <!-- Izquierda -->
            <div class="col-12 px-4 mt-4 md:mt-6 md:px-6">
                <span class="text-900 block font-bold text-xl">Detalle del pedido</span>

            </div>
            <div class="col-12 lg:col-6 h-full px-4 py-4 md:px-6">
                <div class="card flex justify-content-center">
                    <div class="flex flex-wrap gap-3">
                        <div v-if="pickup == 1" class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt1" name="delivery" :value="1" @change="deliveryChange"/>
                            <label for="dt1" class="ml-2">Entrega en Sucursal</label>
                        </div>
                        <div v-if="pickup == 0" class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt1" name="delivery" :value="1" :disabled="true" @change="deliveryChange"/>
                            <label for="dt1" class="ml-2">Entrega en Sucursal</label>
                        </div>
                        <div v-if="delivery == 1" class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt2" name="delivery" :value="2" @change="deliveryChange"/>
                            <label for="dt2" class="ml-2">Entrega en domicilio</label>
                        </div>
                        <div v-if="delivery == 0" class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt2" name="delivery" :value="2" :disabled="true" @change="deliveryChange"/>
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
                    <ShippingData v-if="showShippingData" @saveShippingData="refreshReferences" @close="showShippingData=false" :countries="countries"></ShippingData>
                    <div v-if="!showShippingData" class="col-12 field mb-4">
                        <span class="text-900 text-2xl block font-medium mb-5">Dirección de entrega</span>
                        <Dropdown :options="customerReferences" v-model="selectedReference" placeholder="Selecciona una dirección de envío" optionLabel="name" optionValue="id" showClear class="w-full"></Dropdown>
                        <br>
                        <br>
                        <div class="col-12 flex align-items-center justify-content-center">
                            <Button v-if="!showShippingData && !selectedReference" @click="showShippingData=true" class="flex align-items-center justify-content-center" label="Agregar nueva dirección" icon="pi pi-fw pi-check"></Button>
                        </div><br><br>
                        <span v-if="selectedReference" class="text-900 text-2xl block font-medium mb-5">Paqueteria</span>
                        <Dropdown v-if="selectedReference" :options="carriers" v-model="selectedCarrier" placeholder="Selecciona una paquetería" optionLabel="name" optionValue="name" showClear class="w-full" @change="changeCarrier"></Dropdown><br><br><br>
                        <div v-if="selectedReference && selectedCarrier" class="grid">
                            <div class="col-12 lg:col-4">
                                <span class="text-1500 block font-medium mb-3 font-bold">Servicio</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading" v-for="(quote, i) in quotations" :key="i"> 
                                        <RadioButton v-model="selectedService" :inputId="quote.key" name="dynamic" :value="quote.service_level_name" @change="serviceChange"/> 
                                        <label for="quote.key">{{ " " + quotations[i].service_level_name }}</label>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-4">
                                    <span class="text-1500 block font-medium mb-3 font-bold">Entrega</span>
                                    <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                        <li class="mb-2" v-if="!blocked" v-for="(quote, i) in quotations" :key="i">{{ quotations[i].days }} días hábiles</li>
                                    </ul>
                            </div>
                            <div class="col-12 lg:col-4">
                                    <span class="text-1500 block font-medium mb-3 font-bold">Tarifa</span>
                                    <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                        <li class="mb-2" v-if="!blocked" v-for="(quote, i) in quotations" :key="i">${{ quotations[i].total_pricing}}</li>
                                    </ul>
                            </div>
                        </div>
                        <br></br>
                        <!-- <div class="col-12 flex align-items-center justify-content-center">
                            <Button v-if="!showShippingData" @click="generateShipment" class="flex align-items-center justify-content-center" label="Ver resumen envio" icon="pi pi-fw pi-check"></Button>
                        </div> -->
                    </div>
                </div>
                <div class="grid formgrid">
                    <div class="col-12 field mb-4">
                        <div class="field-checkbox">
                            <Checkbox name="checkbox-2" v-model="billable" binary inputId="checkbox-2"></Checkbox>
                            <label for="checkbox-2">¿Desea facturar?</label>
                        </div>
                    </div>
                    <div v-if="billable" class="grid formgrid col-12">
                        <div class="col-12 lg:col-6 field mb-4">
                            <Dropdown :options="countries" v-model="invoice_entity.country" placeholder="Pais" optionLabel="name" optionValue="name" showClear class="w-full"></Dropdown>
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.state" id="Estado" placeholder="Estado" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.municipality" id="Municipio" placeholder="Municipio" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.suburb" id="Colonia" placeholder="Colonia" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 field mb-4">
                            <input v-model="invoice_entity.address" id="Direccion" placeholder="Direccion" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.postal_code" id="pc" placeholder="Codigo Postal" type="number" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.rfc" id="rfc" placeholder="RFC" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <Dropdown :options="useCfdi" v-model="invoice_entity.customerUseCfdi" placeholder="Uso CFDI" optionLabel="Descripcion" optionValue="c_UsoCFDI" showClear class="w-full"></Dropdown>
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <Dropdown :options="taxRegime" v-model="invoice_entity.customerTaxRegime" placeholder="Regimen Fiscal" optionLabel="Descripcion" optionValue="c_RegimenFiscal" showClear class="w-full"></Dropdown>                        
                        </div>
                        <div class="col-12 flex align-items-center justify-content-center">
                            <Button  @click="saveShippingData" class="flex align-items-center justify-content-center" label="Guardar/Modificar Datos de Facturacion" icon="pi pi-fw pi-save"></Button>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Derecha -->
            <div class="col-12 lg:col-6 px-4 py-4 md:px-6">
                <div class="pb-3 surface-border">
                    <span class="text-900 font-medium text-xl">Tus Productos</span>
                </div>
                <OrderDataProduct @update:flattenedArray="handleUpdate" @total-value="totalValue"></OrderDataProduct>
        <br>
        <div>
            <span class="text-900 block font-bold text-xl">Total del pedido ${{ total.toFixed(2) }}</span><br>
            <span v-if="deliveryType == 2" class="text-900 block font-bold text-xl">Envío a domicilio ${{ totalShipment.toFixed(2) }}</span><br>
            <span class="text-900 block font-bold text-xl">Total a pagar ${{ Number(total.toFixed(2)) + Number(totalShipment.toFixed(2)) }}</span>
        </div>
        <div class="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-end my-6">
            <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" severity="secondary" label="Regresar al carrito" icon="pi pi-fw pi-arrow-left" @click="router.push('/shoppingcart');"></Button>
            <Button v-if="only_online == 0 && deliveryType != 2" class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" label="Pagar en sucursal" icon="pi pi-fw pi-wallet" @click="processPaymentStore()"></Button>
            <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" label="Pagar en línea" icon="pi pi-fw pi-credit-card" @click="processPayment()"></Button>
        </div>
    </div>
    </div>
    </div>
</template>

<script setup lang="ts">
import { CountryService } from '../../service/CountryService';
import { ref, onMounted, watch, computed } from 'vue';
import ShippingData from './ShippingData.vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import OrderDataProduct from './OrderDataProduct.vue';
import cfdiData from '../Cart/useCFDI.json';
import taxReg from '../Cart/taxRegime.json'
import { useToast } from "primevue/usetoast";
import { useCartStore } from '../../stores/cart';
import { useRouter } from 'vue-router';
import {OrderData} from '../Cart/Function/OrderData';
import BlockUI from 'primevue/blockui';
import Dropdown from 'primevue/dropdown';
import { aW } from '@fullcalendar/core/internal-common';
import { isParameter } from 'typescript';

const countryService = new CountryService();
const countries = ref([]);
const loading = ref<boolean>(false);
const toast = useToast();
const entity = new OrderData();
const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();
const billable = ref<boolean>(false);
const selectedReference = ref(null);
const selectedCarrier = ref(null);
const selectedService = ref(null);
const customerReferences = ref<any[]>([])
const deliveryType = ref<number>(1);
const showShippingData = ref<boolean>(false);
const useCfdi = ref<any[]>(cfdiData)
const taxRegime = ref<any[]>(taxReg)
const flattenedArray = ref<any[]>([]);
const total = ref<number>(0);
const totalShipment = ref<number>(0);
const blocked = ref<boolean>(false);
const pickup = ref<number>(0);
const delivery = ref<number>(0);
const only_online = ref<number>(0);
const parcels = ref<Parcel[]>([]); // Array parcels dinámico aqui se guardan las dimensiones del envio

const carriers = ref<carriers[]>([]);
const quotations = ref<any[]>([]);
const shippingCost = ref<any[]>([]);
const prices = ref<any[]>([]);
const id_tracking = ref<number>(0);
const id_shipment = ref<number>(0);
const id_tracking_shipment = ref<number>(0);

export interface carriers {
    id?: string;
    name?: string;
}

export interface invoice_data {
    id_customer?: number | null;
    postal_code?: string | null;
    country?: string | null;
    state?: string | null;
    municipality?: string | null;
    suburb?: string | null;
    address?: string | null;
    rfc?: string | null;
    customerUseCfdi?: string | null;
    customerTaxRegime?: string | null;
}

const invoice_entity = ref<invoice_data>({
    id_customer: authStore.id_customer,
    postal_code: null,
    country: null,
    state: null,
    municipality: null,
    suburb: null,
    address: null,
    rfc: null,
    customerUseCfdi: null,
    customerTaxRegime: null,
});
//Se declara los campos que solicita de informacion Skydropx
export interface address_data {
  province: string | null;
  city: string | null;
  name: string | null;
  zip: string | null;
  country: string | null;
  address1: string | null;
  company: string | null;
  address2: string | null;
  phone: string | null;
  email: string | null;
  reference?: string | null;
  contents?: string | null;
}

const addressShipment = ref<Address>({
  province: null,
  city: null,
  name: null,
  zip: null,
  country: null,
  address1: null,
  company: null,
  address2: null,
  phone: null,
  email: null,
  reference: null,
  contents: null
});

interface Address {
  province: string;
  city: string;
  name: string;
  zip: string;
  country: string;
  address1: string;
  company: string;
  address2: string;
  phone: string;
  email: string;
  reference?: string;
  contents?: string;
}

interface Parcel {
  weight: number;
  distance_unit: string;
  mass_unit: string;
  height: number;
  width: number;
  length: number;
}

interface Carrier {
  name: string;
}

interface Shipment {
  address_from: Address;
  parcels: Parcel[];
  address_to: Address;
  consignment_note_class_code: string;
  consignment_note_packaging_code: string;
  carriers: Carrier[];
}

//Se utiliza para aplanar el arreglo cuando el carrito contenga paquetes y todos los articulos se encuentren en el mismo nivel
function handleUpdate(value: any[]) {
    flattenedArray.value = value;
    console.log("flattened", flattenedArray.value)
}

function totalValue(value: number){
    total.value = value;
}

const saveShippingData = async () =>{
    if(billable && invoiceNotNull()){
        let response = await axios.post('Comercial/EComerceUser/SaveInvoiceData',invoice_entity.value)
        toast.add({ severity: 'success', summary: 'Informacion guardada', detail: "Se guardaron los datos de facturacion correctamente", life: 7500 });
    }else{
        toast.add({ severity: 'error', summary: 'Error al guardar informacion de facturacion', detail: "Favor de llenar todos los datos correctamente", life: 7500 });
    }
}

const invoiceNotNull = ()=>{
    console.log(JSON.stringify(invoice_entity.value))
    for (const key in invoice_entity.value){
        if (invoice_entity.value[key as keyof invoice_data] === null || invoice_entity.value[key as keyof invoice_data] === "") {
            return false;
        }
    }
    return true;
}

const refresh = async () => {
    try{
        pickup.value = parseInt(import.meta.env.VITE_PICKUP);
        delivery.value = parseInt(import.meta.env.VITE_DELIVERY);
        only_online.value = parseInt(import.meta.env.VITE_ONLY_ONLINE_SALES);
        if(pickup.value == 0){
            deliveryType.value=2;
        }else{
            deliveryType.value=1;
        }
        if(cartStore.order.length == 1)
            await entity.newOrder();
        let response = await axios.get('Comercial/EComerceUser/GetReferences/'+authStore.id_customer)
        customerReferences.value = response.data;
        console.log(`direcciones`,customerReferences.value)
        response = await axios.get('Comercial/EComerceUser/GetInvoiceData/'+authStore.id_customer)
        invoice_entity.value.address = response.data[0].address;
        invoice_entity.value.postal_code = response.data[0].postal_code;
        invoice_entity.value.suburb = response.data[0].suburb;
        invoice_entity.value.municipality = response.data[0].municipality;
        invoice_entity.value.state = response.data[0].state;
        invoice_entity.value.country = response.data[0].country;
        invoice_entity.value.rfc = response.data[0].rfc;
        invoice_entity.value.customerTaxRegime = response.data[0].tax_regime;
        invoice_entity.value.customerUseCfdi = response.data[0].use_cfdi;
        countries.value = countries.value.map(x => {
            return {
                ...x,
                name: x.name.toUpperCase()
            }
        })
        await getCarriers();
    }catch(error){
        console.log(error)
    }
}

const refreshReferences = async () => {
    try{
        let response = await axios.get('Comercial/EComerceUser/GetReferences/'+authStore.id_customer)
        customerReferences.value = response.data;
        response = await axios.get('Comercial/EComerceUser/GetInvoiceData/'+authStore.id_customer)
        invoice_entity.value.address = response.data[0].address;
        invoice_entity.value.postal_code = response.data[0].postal_code;
        invoice_entity.value.suburb = response.data[0].suburb;
        invoice_entity.value.municipality = response.data[0].municipality;
        invoice_entity.value.state = response.data[0].state;
        invoice_entity.value.country = response.data[0].country;
        invoice_entity.value.rfc = response.data[0].rfc;
        showShippingData.value = false;
    }catch(error){
        console.log(error)
    }
}

const getCarriers = async () => {
    const apiKey = import.meta.env.VITE_TOKEN_SKYDROPX;
    const urlBase = import.meta.env.VITE_SKYDROPX_BASE_URL;
    const response = await fetch(urlBase +'/'+'carriers/', {
        method: 'GET',
        headers: {
            'Authorization': `Token token=${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    //limitamos el numero de items del array
    const limitedCarriers = data.data.slice(0,3); //solo tomara los primeros 3 elementos del array
    for(let i = 0; i < limitedCarriers.length; i++){
        carriers.value.push(limitedCarriers[i].attributes);
    }
}

//Obtiene el nombre de la dirección seleccionada
const selectedAddress = computed(()=> {
    const selectedOption = customerReferences.value.find(x => x.id === selectedReference.value);
    return Array(selectedOption);
});

const changeCarrier = async () => {
    loading.value = true;
    blocked.value = true;
    prices.value = [];
    const apiKey = import.meta.env.VITE_TOKEN_SKYDROPX;
    const address = selectedAddress.value.map(x => x.name).toString();
    const separateAddress = address.split(", ") //Se separan los datos de la dirección para obtener el código postal de destino.
    const info = await entity.getDimensionsByArticle(flattenedArray.value); //Se obtienen los parámetros de las dimensiones del paquete para poder cotizar el envío.
    console.log("dimensiones", info);
    for(let i = 0; i < info.length; i++){
        shippingCost.value = [];
        const parameters = JSON.stringify({
        'zip_from': authStore.zip_code,
        'zip_to': separateAddress[1],
        'parcel': {'weight': info[i].weight, 'height': info[i].height, 'width': info[i].width, 'length': info[i].length},
        'carriers': [{'name': selectedCarrier.value}]
        });
        try{
            const response = await fetch('https://api.skydropx.com/v1/quotations/', {
            method: 'POST',
            headers: {
                'Authorization': `Token token=${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: parameters
            });
            quotations.value = await response.json();
            if(quotations.value.length == 0){
                toast.add({ severity: 'warn', summary: 'Envío', detail: "No hay servicios disponibles en la paqueteria seleccionada.", life: 7000 });
                selectedCarrier.value = null;
            }else{
                //Se suma el costo de las guías a la tarifa de costo de envío
                if(quotations.value.length > 0){
                    for(let j = 0; j < quotations.value.length; j++){
                        quotations.value[j].days += 1; //se suma un dia mas a los dias habiles de entrega para dejar un dia de colchon para embalaje
                        shippingCost.value.push(quotations.value[j].total_pricing);
                        if(prices.value.length > 0){
                            prices.value[j] = parseFloat(shippingCost.value[j] ?? "0") + parseFloat(prices.value[j] ?? "0");
                        }else{
                            prices.value.push(shippingCost.value[j]);
                        }
                        quotations.value[j].total_pricing = prices.value[j];
                    }
                }
            }
        }catch(error){
            console.log("error", error)
        }finally{
            blocked.value = false;
            loading.value = false;
        }
    }
}

const serviceChange = () => {
    for(const quote of quotations.value){
        if(quote.service_level_name == selectedService.value){
            totalShipment.value = 0;
            totalShipment.value = parseFloat(quote.total_pricing);
        }else{
            continue;
        }
    }
}

const deliveryChange = () => {
    quotations.value = undefined;
    selectedCarrier.value = null;
    totalShipment.value = 0;
}

const processPayment = async () => {
    try {
        if(deliveryType.value == 2 && selectedReference.value == null)
            throw "Pedido con envio, favor de seleccionar/crear una direccion de envio"
        let inn = invoiceNotNull();
        if(billable.value == true){
            if(inn == false){
                throw "Favor de llenar todos los datos de facturacion"
            }
        }
        console.log(inn)
        loading.value = true;
        blocked.value = true;
        if(cartStore.order.length == 1){
            if(cartStore.order[0].status == 1){
                let payment = await entity.getOpenPayOrder();
                console.log("payment", payment)
                window.location.href = payment.payment_method.url;
            }
        }else if(cartStore.order.length == 0){
            if(deliveryType.value == 2 && (selectedCarrier.value == null || selectedService.value == null)){
                toast.add({ severity: 'error', summary: 'Error', detail: "Favor de seleccionar una paqueteria o servicio", life: 7000 });
            }else{
                let payment_info = []
                let order = await createOrder(2); //se crea el pedido y se guarda en la tabla 'ecommerce_order' y 'ecommerce_order_item'
                // let shipmentCreated = saveShimpent(); // se guardan los datos del envio
                let url = import.meta.env.VITE_INDEX_ROUTE
                let totalPay = total.value + totalShipment.value;
                payment_info = await entity.getPaymentInfo({id_order: order.id, total: totalPay , url: url}); //se obtiene la información del cliente y del pedido
                console.log(`payment`,JSON.stringify(payment_info, null, 2))
                let response = await entity.openpayAxios.post('charges/', payment_info[0]) //se envía al api de open pay la información obtenida
                let status = response.data.status;
                let update = await axios.post('Comercial/ECommerceOrder/updateOrder/' + response.data.order_id + '/' + response.data.id + '/' + status); //guarda el id_tracking del pedido y actualiza el estatus a pagado o no pagado
                window.location.href = response.data.payment_method.url; //redirige al cliente a la URL de confirmación
                cartStore.saveOrder(order.id); //almacena temporalmente el id del pedido y el estatus
                if(deliveryType.value == 2){
                    let createshipment = await generateShipment();
                }
            }
        }
    } catch (error) {
        try{
            let response = await entity.openpayAxios.get('/charges/trb0rdnmtp6tmdpykevw/')
            console.log('Respuesta de OpenPay:', response.data);
        }catch(error2){
            if (axios.isAxiosError(error2)) {
                console.error('Error procesando el pago:', error2.response?.data);
            } else {
                console.error('Error desconocido:', error2);
            }
        }
        if (axios.isAxiosError(error)) {
            toast.add({ severity: 'error', summary: 'Error procesando el pago:', detail: error.response?.data, life: 7000 });
        } else {
            toast.add({ severity: 'error', summary: 'Error procesando el pago:', detail: error, life: 7000 });
        }
    } finally{
        loading.value = false;
        blocked.value = false;
    }
};

const processPaymentStore = async () => {
    try {
        let inn = invoiceNotNull();
        if(billable.value == true){
            if(inn == false){
                throw "Favor de llenar todos los datos de facturacion"
            }
        }
        loading.value = true;
        let order = await createOrder(1); //se crea el pedido y se guarda en la tabla 'ecommerce_order' y 'ecommerce_order_item'
        cartStore.saveOrder(order.id); //almacena temporalmente el id del pedido y el estatus
        await entity.newOrderStore();
        router.push('/confirmation')
    } catch (error) {
        if (axios.isAxiosError(error)) {
            toast.add({ severity: 'error', summary: 'Error procesando el pago:', detail: error.response?.data, life: 7000 });
        } else {
            toast.add({ severity: 'error', summary: 'Error procesando el pago:', detail: error, life: 7000 });
        }
    } finally{
        loading.value = false;
    }
};

const createOrder = async (payment_type) => {
    try{
        console.log(JSON.stringify(payment_type))
        const params = {items: flattenedArray.value, total: total.value, payment_type: payment_type, is_billable: billable.value, delivery_type: deliveryType.value, id_customer_reference: deliveryType.value == 2 ? selectedReference.value : null}
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

// const saveShimpent = async () => {
//     try {
//         const entity = {id_shipment: id_shipment.value, id_tracking_shipment: id_tracking_shipment.value}
//         let response = await axios.post('Inventory/Ecomerce/CreateShipment', entity, {
//             headers: {
//                 company: 1,
//                 branch: 1,
//                 users: authStore.id_usuario,
//             }
//         })
//         toast.add({severity: 'success', summary: 'Envio', detail: 'Su envio se genero con exito. Recibira pronto un email con mas informacion.', life: 5000});
//         return response.data;
//     } catch (error) {
//         console.log("Error ");
//     }
// }
//Aqui se crean los nodos que solicita Skydropx para generar las guias de envio
const generateShipment = async () =>{
    const info = await entity.getDimensionsByArticle(flattenedArray.value); //Se obtienen los parámetros de las dimensiones del paquete para poder cotizar el envío.

    //Aqui se guardan los parametros de dimenciones en el array parcels y usarlos para el envio
    if (info && Array.isArray(info)) {
        parcels.value = info.map((item) => ({
            weight: item.weight,
            height: item.height,
            width: item.width,
            length: item.length,
            distance_unit: "CM",
            mass_unit: "KG"      
        }));
    }
  const shipment: Shipment = {
    address_from: {
      province: "Nuevo Leon",
      city: "Monterrey",
      name: "Dalal Safar",
      zip: "64460",
      country: "MX",
      address1: "Eduardo Aguirre Pequeño 1302, Mitras Centro, Monterrey",
      company: "Villa de Cortés Monterrey",
      address2: "Centro",
      phone: "8129486399",
      email: "villa@villacortes.com",
    },
      parcels: parcels.value,
    address_to: {
      province: addressShipment.value.province,
      city: addressShipment.value.city,
      name: addressShipment.value.name,
      zip: addressShipment.value.zip,
      country: addressShipment.value.country,
      address1: addressShipment.value.address1,
      company: "-",
      address2: addressShipment.value.address1,
      phone: addressShipment.value.phone,
      email: addressShipment.value.email,
      reference: addressShipment.value.reference,
      contents: addressShipment.value.contents
    },
    consignment_note_class_code: "53131600",
    consignment_note_packaging_code: "1H1",
    carriers: [{ name: selectedCarrier.value }]
  };
  console.log(`datos envio`,JSON.stringify(shipment, null, 2));
  const apiKey = import.meta.env.VITE_TOKEN_SKYDROPX;

  try {
      const shipmentResponse = await createShipment(shipment, apiKey);
      console.log('Shipment created:', JSON.stringify(shipmentResponse, null, 2));
      
      // Accede al ID del `shipmentResponse`
      id_tracking_shipment.value = shipmentResponse.data[0].id;
      console.log(`id_tracking`,id_tracking_shipment.value);
      const shipmentIdString = shipmentResponse.data.relationships.rates.data[0].id; //extraemos el id de la paqueteria seleccionadas ("rate" dentro de nodo de skydropx)
      const shipmentId = +shipmentIdString;
      // Usa `shipmentId` como argumento para `createLabel`
      const label = await createLabel(shipmentId);
      console.log('Created label:', JSON.stringify(label, null, 2));
        //Obtiene todos los envios generados.
      const get = await getShipmentsById(shipmentId);
      console.log('GetShipments:', JSON.stringify(get, null, 2));

  } catch (error) {
    console.error('Error creating shipment:', error);
  }
}

//Este metodo se conecta con Skydropx para crear envios a domicilio
const createShipment = async (shipment: Shipment, apiKey: string) => { 
  const urlBase = import.meta.env.VITE_SKYDROPX_BASE_URL;
  const response = await fetch(urlBase + '/' +'shipments/', {
    method: 'POST',
    headers: {
      'Authorization': `Token token=${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(shipment)
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }

  const data = await response.json();
  console.log(`data`,data)
  toast.add({ severity: 'success', summary: 'Envio generado', detail: 'Revise su correo para ver mas detalles.', life: 5000 });
  return data;
}

    // Watcher para escuchar cambios en la selección de direcciones de envio
    watch(selectedReference, (newVal) => {
      console.log("Nuevo ID seleccionado:", newVal);
      // se va al metodo para con esa id poner la direccion que corresponde al cliente en los datos de envio
      getSelectedReferenceId();
    });

    // Método que devuelve el ID seleccionado correspondiente a la direccion de envio
    const getSelectedReferenceId = async  () => {
      let response = await axios.get('Comercial/EComerceUser/GetCustomerAddress/'+authStore.id_customer+'/'+selectedReference.value)
        addressShipment.value.province = response.data[0].province;
        addressShipment.value.city = response.data[0].city;
        addressShipment.value.name = response.data[0].name;
        addressShipment.value.zip = response.data[0].zip;
        addressShipment.value.country = response.data[0].country;
        addressShipment.value.address1 = response.data[0].address;
        addressShipment.value.company = response.data[0].company;
        addressShipment.value.address2 = response.data[0].address;
        addressShipment.value.phone = response.data[0].phone;
        addressShipment.value.email = response.data[0].email;
        addressShipment.value.reference = response.data[0].reference;
        addressShipment.value.contents = response.data[0].contents;
        console.log('address:',JSON.stringify(addressShipment.value, null, 2))
      return selectedReference.value;
    };

    const getShipments = async (id: number) => {
    const apiKey = import.meta.env.VITE_TOKEN_SKYDROPX;
    const urlBase = import.meta.env.VITE_SKYDROPX_BASE_URL;
    const requets = await fetch(urlBase + '/' +'shipments', {
        method: 'GET',
        headers: {
            'Authorization': `Token token=${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    const data = await requets.json();
    console.log('shipments:',JSON.stringify(data));
    return data;
}

const getShipmentsById = async (id: number) => {
    const apiKey = import.meta.env.VITE_TOKEN_SKYDROPX;
    const url = `https://api.skydropx.com/v1/shipments/${id}`; // Construye la URL usando el ID

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Token token=${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error al crear etiqueta revise el mensaje: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('specific shipment:', JSON.stringify(data, null, 2));
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Para que quien llame a la función pueda manejar el error
    }
};

const createLabel = async (id: number) => {
    const apiKey = import.meta.env.VITE_TOKEN_SKYDROPX;
    // Construcción del cuerpo de la solicitud POST
    const parameters = JSON.stringify({
        "rate_id": id,  // Aquí se asigna el valor directamente
        "label_format": "pdf"  // Aquí se asigna el valor directamente
    });
        try {
            const response = await fetch('https://api.skydropx.com/v1/labels', {
            method: 'POST',
            headers: {
                'Authorization': `Token token=${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: parameters
            });
            const request = await response.json();
            // Accede al ID del numero de rastreo para el envio
            id_tracking_shipment.value = request.data.attributes.data[0].tracking_number;
            console.log('labelCreated:', JSON.stringify(request, null, 2));
            console.log(`id_traking:`,id_tracking_shipment);
            return request;
        }catch(error){
            console.log("error", error)
        }finally{
            blocked.value = false;
            loading.value = false;
        }
}

onMounted(async () => {
    countryService.getCountries().then((data) => (countries.value = data));
    await refresh();
});

</script>