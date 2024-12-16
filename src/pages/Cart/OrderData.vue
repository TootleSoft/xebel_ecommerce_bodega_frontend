<template>
    <ProgressSpinner v-if="loading" class="loading-overlay"/>
    <BlockUI :blocked="blocked" fullScreen />
    <Dialog v-model:visible="dialogVisible" header="Aviso" modal>
        <p>¿Quiere proceder el pago sin facturar su pedido?</p>
        <template #footer>
            <Button label="Si" icon="pi pi-check" @click="continueWithoutBilling" class="p-button-success"/>
            <Button label="No" icon="pi pi-times" @click="confirmBilling" class="p-button-danger"/> 
        </template>
    </Dialog>
    <div class="card p-4 shadow-2 border-round">
        <div class="grid grid-nogutter">
            <!-- Izquierda -->
            <div class="col-12 px-4 mt-4 md:mt-6 md:px-6">
                <span class="text-900 block font-bold text-xl" style="font-family: 'Montsemibold';">Detalle del pedido</span>
            </div>
            <div class="col-12 lg:col-6 h-full px-4 py-4 md:px-6">
                <div class="card flex justify-content-center p-3 shadow-2 border-round">
                    <div class="flex flex-wrap gap-3" style="font-family: 'Montserrat';">
                        <div v-if="pickup == 1" class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt1" name="delivery" :value="1" @change="deliveryChange"/>
                            <label for="dt1" class="ml-2">Entrega en Sucursal</label>
                        </div>
                        <div v-if="pickup == 0" class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt1" name="delivery" :value="1" :disabled="true" @change="deliveryChange"/>
                            <label for="dt1" class="ml-2 text-gray-500">Entrega en Sucursal</label>
                        </div>
                        <div v-if="delivery == 1" class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt2" name="delivery" :value="2" @change="deliveryChange"/>
                            <label for="dt2" class="ml-2">Entrega en domicilio</label>
                        </div>
                        <div v-if="delivery == 0" class="flex align-items-center">
                            <RadioButton v-model="deliveryType" inputId="dt2" name="delivery" :value="2" :disabled="true" @change="deliveryChange"/>
                            <label for="dt2" class="ml-2 text-gray-500">Entrega en domicilio</label>
                        </div>
                    </div>
                </div>
                <div v-if="deliveryType == 1" class="grid formgrid">
                    <div class="col-12 field mb-6">
                        <span class="text-900 text-2xl block font-medium mb-5" style="font-family: 'Montserrat';">Los productos se entregarán en la sucursal seleccionada en cada uno.</span>
                    </div>
                </div>
                <div v-if="deliveryType == 2" class="grid formgrid">
                    <ShippingData v-if="showShippingData" @saveShippingData="refreshReferences" @close="showShippingData=false" :countries="countries"></ShippingData>
                    <div v-if="!showShippingData" class="col-12 field mb-4">
                        <span class="text-900 text-2xl block font-medium mb-5">Dirección de entrega</span>
                        <Dropdown :options="customerReferences" v-model="selectedReference" placeholder="Selecciona una dirección de envío" optionLabel="name" optionValue="id" showClear class="w-full"/>
                        <br><br>
                        <div class="col-12 flex align-items-center justify-content-center">
                            <Button v-if="!showShippingData && !selectedReference" @click="showShippingData=true" class="flex align-items-center justify-content-center" label="Agregar nueva dirección" icon="pi pi-fw pi-check" style="background-color: #007bff; border-color: #007bff; color: white;"/>
                        </div><br><br>
                        <span v-if="selectedReference" class="text-900 text-2xl block font-medium mb-5" style="font-family: 'Montsemibold';">Paqueteria</span>
                        <Dropdown v-if="selectedReference" :options="carriers" v-model="selectedCarrier" placeholder="Selecciona una paquetería" optionLabel="name" optionValue="name" showClear class="w-full" @change="changeCarrier" style="font-family: 'Montserrat'"/>
                        <br><br><br>
                        <div v-if="selectedReference && selectedCarrier" class="grid">
                            <div class="col-12 lg:col-4">
                                <span class="text-1500 block font-medium mb-3 font-bold" style="font-family: 'Montsemibold';">Servicio</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!loading" v-for="(quote, i) in quotations" :key="i" style="font-family: 'Montserrat'"> 
                                        <RadioButton v-model="selectedService" :inputId="quote.key" name="dynamic" :value="quote.service_level_name" @change="serviceChange"/> 
                                        <label for="quote.key" style="font-family: 'Montserrat';">{{ " " + quotations[i].service_level_name }}</label>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-4">
                                <span class="text-1500 block font-medium mb-3 font-bold" style="font-family: 'Montsemibold'">Entrega</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!blocked" v-for="(quote, i) in quotations" :key="i" style="font-family: 'Montserrat'">{{ quotations[i].days }} días hábiles</li>
                                </ul>
                            </div>
                            <div class="col-12 lg:col-4">
                                <span class="text-1500 block font-medium mb-3 font-bold" style="font-family: 'Montsemibold'">Tarifa</span>
                                <ul class="py-0 pl-3 m-0 text-600 mb-3">
                                    <li class="mb-2" v-if="!blocked" v-for="(quote, i) in quotations" :key="i" style="font-family: 'Montserrat';">${{ quotations[i].total_pricing}}</li>
                                </ul>
                            </div>
                        </div>
                        <br></br>
                    </div>
                </div>
                <div class="grid formgrid">
                    <div class="col-12 field mb-4">
                        <div class="field-checkbox">
                            <Checkbox name="checkbox-2" v-model="billable" binary inputId="checkbox-2"/>
                            <label for="checkbox-2" style="cursor: pointer; font-family: 'Montserrat';">¿Desea facturar?</label>
                        </div>
                    </div>
                    <div v-if="billable" class="grid formgrid col-12">
                        <div class="col-12 lg:col-6 field mb-4">
                            <Dropdown :options="countries" v-model="invoice_entity.country" placeholder="País" optionLabel="name" optionValue="name" showClear class="w-full"/>
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.state" id="Estado" placeholder="Estado" type="text" class="p-inputtext w-full"/>
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.municipality" id="Municipio" placeholder="Municipio" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.suburb" id="Colonia" placeholder="Colonia" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 field mb-4">
                            <input v-model="invoice_entity.address" id="Direccion" placeholder="Dirección" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.postal_code" id="pc" placeholder="Código Postal" type="number" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <input v-model="invoice_entity.rfc" id="rfc" placeholder="RFC" type="text" class="p-inputtext w-full" />
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <Dropdown :options="useCfdi" v-model="invoice_entity.customerUseCfdi" placeholder="Uso CFDI" optionLabel="Descripcion" optionValue="c_UsoCFDI" showClear class="w-full"/>
                        </div>
                        <div class="col-12 lg:col-6 field mb-4">
                            <Dropdown :options="taxRegime" v-model="invoice_entity.customerTaxRegime" placeholder="Régimen Fiscal" optionLabel="Descripcion" optionValue="c_RegimenFiscal" showClear class="w-full"/>                        
                        </div>
                        <div class="col-12 flex align-items-center justify-content-center">
                            <Button @click="saveShippingData" class="flex align-items-center justify-content-center" label="Guardar/Modificar Datos de facturación" icon="pi pi-fw pi-save" style="background-color: #007bff; border-color: #007bff; color: white;"/>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Derecha -->
            <div class="col-12 lg:col-6 px-4 py-4 md:px-6" style="display: flex; flex-direction: column; align-items: flex-end;">
    <div class="mb-6 surface-border">
      <span class="text-900 font-medium text-xl" style="font-family: 'Montserrat';">Tus Productos</span>
    </div>
    <OrderDataProduct @update:flattenedArray="handleUpdate" @total-value="totalValue"/>
    <br>
    <div style="width: 100%; text-align: right;">
      <span class="text-900 block font-bold text-xl" style="font-family: 'Montsemibold';">Total del pedido ${{ total.toFixed(2) }}</span><br>
      <span v-if="deliveryType == 2" class="text-900 block font-bold text-xl" style="font-family: 'Montsemibold';">Envío a domicilio ${{ totalShipment.toFixed(2) }}</span><br>
      <span class="text-900 block font-bold text-xl" style="font-family: 'Montsemibold';">Total a pagar ${{ (Number(total.toFixed(2)) + Number(totalShipment.toFixed(2))).toFixed(2) }}</span>
    </div>
    <div class="col-12 flex flex-column lg:flex-row justify-content-center align-items-center lg:justify-content-end mt-7" style="align-items: flex-end; padding-right: 0">
      <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" severity="secondary" label="Regresar al carrito" icon="pi pi-fw pi-arrow-left" @click="router.push('/shoppingcart');" style="font-family: 'Montserrat';"/>
      <Button v-if="only_online == 0 && deliveryType != 2" 
        class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-2" 
        label="Pagar en sucursal" 
        icon="pi pi-fw pi-wallet" 
        @click="() => { processPaymentStore(); }" style="font-family: 'Montserrat'; background-color: #28a745; border-color: #28a745; color: white;"/>
      <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-2" 
        label="Pagar en línea" 
        icon="pi pi-fw pi-credit-card" 
        @click="() => { processPayment(); }" 
        :disabled="!acceptTerms" 
        style="font-family: 'Montserrat'; background-color: #007bff; border-color: #007bff; color: white;"/>
        <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-2" 
        label="Pagar en Efectivo" 
        icon="pi pi-fw pi-money-bill" 
        @click="() => { processPaymentForStore(); }" 
        :disabled="!acceptTerms" 
        style="font-family: 'Montserrat'; background-color: #007bff; border-color: #007bff; color: white;"/>
    </div>
    <!-- Checkbox con los Términos y Condiciones-->
    <div class="flex align-items-center mt-3 lg:mt-0" style="align-items: flex-end;">
      <input type="checkbox" id="termsCheckbox" v-model="acceptTerms" class="mr-1" />
      <label for="termsCheckbox" style="font-size: 14px; font-weight: 800; color: #1155cc;">
        Acepto los <span @click="router.push('/TermsAndConditions')" style="cursor: pointer; color: #1155cc;"> términos y condiciones</span>
      </label>
      <i class="pi pi-info-circle" @click="router.push('/TermsAndConditions')" style="cursor: pointer; margin-left: 6px;"></i>
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
import Dialog from 'primevue/dialog';


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
const acceptTerms = ref(false);
const carriers = ref<carriers[]>([]);
const quotations = ref<any[]>([]);
const shippingCost = ref<any[]>([]);
const prices = ref<any[]>([]);
const dialogVisible = ref<boolean>(false);
const optionBilling = ref<boolean>(true);
const processPaymentType = ref<Number>(0);


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

const invoiceNotNull = async ()=>{
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
    if(info == undefined){
        toast.add({severity:'error', summary: 'Dimensiones', detail: 'No hay dimensiones configuradas para este o varios articulos.', life: 7000});
        //Recarga la pagina despues de mostrar el toast
        setTimeout(() => {
            window.location.reload();
        },3000);
    }
    for(let i = 0; i < info.length; i++){
        shippingCost.value = [];
        const parameters = JSON.stringify({
        'zip_from': authStore.zip_code,
        'zip_to': separateAddress[1],
        'parcel': {'weight': info[i].weight, 'height': info[i].height, 'width': info[i].width, 'length': info[i].length},
        'carriers': [{'name': selectedCarrier.value}]
        });
        try{
            const response = await fetch('https://api-demo.skydropx.com/v1/quotations/', {
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
function confirmBilling() { //Esto ya está
    billable.value = true;
    dialogVisible.value = false;
}
function continueWithoutBilling() {
    try {
        dialogVisible.value = false;
        optionBilling.value = false;
    if (processPaymentType.value == 1 )
    {
        processPaymentStore();

    } else if (processPaymentType.value == 2) {
        processPayment();
    }
    }
    catch (error)
    {
        console.error("Error: " + error);
    }
}
function verifyBillableCheckbox() {
      if (billable.value == false)
    {
        dialogVisible.value = true;
        return false;
    } else {
        dialogVisible.value = false;
        return true;
    }
    
}

const processPaymentStore = async () => {
    try {
        
        loading.value = true;
        blocked.value = true;
        // Actualizamos el tipo de pago a 1 (para indicar pago en sucursal)
        processPaymentType.value = 1;

        // Verificamos la opción de facturación
        const response = verifyBillableCheckbox();
        if(response == false && optionBilling.value == true) {
            return false; // Si no se puede proceder, salir del método
        }

        // Verificamos si la factura tiene los datos completos
        let inn = await invoiceNotNull();
        if(billable.value == true) {
            if(inn == false) {
                throw "Favor de llenar todos los datos de facturación"; // Lanzamos un error si los datos no están completos
            }
        }

        // Creamos la orden de compra
        let order = await createOrder(1);  // se crea el pedido
        cartStore.saveOrder(order.id);  // almacenamos temporalmente el id del pedido y el estatus
        await entity.newOrderStore();  // guardamos la orden en el sistema

        // Redirigimos a la página de confirmación
        router.push('/confirmation');
    } catch (error) {
        // Manejo de errores de tipo Axios o errores generales
        if (axios.isAxiosError(error)) {
            toast.add({ severity: 'error', summary: 'Error procesando el pago:', detail: error.response?.data, life: 7000 });
        } else {
            toast.add({ severity: 'error', summary: 'Error procesando el pago:', detail: error, life: 7000 });
        }
    } finally {
        // Ocultamos el spinner al finalizar el proceso
        
        loading.value = false;
        blocked.value = false;
    }
};


const processPayment = async () => {
    try {
        processPaymentType.value = 2;
        const response = verifyBillableCheckbox();
        if(response == false && optionBilling.value == true)
        {
            return false;
        }
        if(deliveryType.value == 2 && selectedReference.value == null)
            throw "Pedido con envio, favor de seleccionar/crear una direccion de envio"
        let inn = await invoiceNotNull();
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

const testToken = async () => {
    try {
        // Obtén la información de la tarjeta
        let getCard = await axios.get('Comercial/ECommerceOrder/getInfoCard/' + authStore.id_usuario);
        let cardData = getCard.data;

        console.log('Card Data:', JSON.stringify(cardData, null, 2));

        // Asegúrate de acceder al primer elemento del array
        if (Array.isArray(cardData) && cardData.length > 0) {
            const card = cardData[0]; // Obtén el primer elemento del arreglo
            const address = card.address || {}; // Obtén la dirección o un objeto vacío por defecto

            console.log('Card:', card);
            console.log('Address:', address);

            // Crea el payload con los datos necesarios
            const payload = {
                card_number: card.card_number,
                holder_name: card.holder_name,
                expiration_year: card.expiration_year,
                expiration_month: card.expiration_month,
                cvv2: card.cvv2,
                address: {
                    city: address.city || "",
                    country_code: address.country_code || "",
                    postal_code: address.postal_code || "",
                    line1: address.line1 || "",
                    line2: address.line2 || "",
                    line3: address.line3 || "",
                    state: address.state || ""
                }
            };
            console.log('Payload:', JSON.stringify(payload, null, 2));
            // Envía la solicitud a OpenPay
            let response = await entity.openpayAxios.post('tokens/', payload);
            console.log('Respuesta del token:', response.data);
            console.log(`ID token;`,response.data.id);
            // let token = await entity.openpayAxios.get('tokens/kyag6lfte6ollsb2pie8/');
            // console.log(`objeto token:`,token);

        } else {
            console.error('La informacion de la tarjeta esta vacio o en formato incorrecto.');
        }



    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error en la solicitud:', error.response?.data);
        } else {
            console.error('Error desconocido:', error);
        }
    }
};

const createCharge = async () => {
    try {
        // Configura el cliente Axios con las credenciales y encabezados necesarios
        const openpayAxios = axios.create({
            baseURL: import.meta.env.VITE_OPENPAY_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${btoa(`${import.meta.env.VITE_OPENPAY_PRIVATE_API_KEY}:`)}`, // Encode credentials
            }
        });

        // Define el payload de la petición
        const payload = {
            method: "card",
            amount: 6000.00, // Monto de la transacción
            description: "Cargo 3D Secure", // Descripción del cargo
            order_id: "000000004", // ID del pedido
            source_id: "khf99xdrhkaerhjxzves", // ID del token (generado previamente)
            redirect_url: import.meta.env.VITE_INDEX_ROUTE, // URL de redirección
            use_3d_secure: "true" // Activar el uso de 3D Secure
        };
        console.log(`payload:`,payload)
        // Realiza la petición POST a OpenPay
        const response = await openpayAxios.post('charges/', payload);

        // Manejo de la respuesta
        console.log('Respuesta de OpenPay:', response.data);
    } catch (error) {
        // Manejo de errores
        if (axios.isAxiosError(error)) {
            console.error('Error en la petición:', error.response?.data || error.message);
        } else {
            console.error('Error desconocido:', error);
        }
    }
};

const processPaymentForStore = async () => {
    try {
        loading.value = true;
        blocked.value = true;

        // Crear pedido y calcular el total a pagar
        const order = await createOrder(2); // Se crea el pedido y se guarda en la base de datos
        const totalPay = total.value + totalShipment.value;
        const paymentInfo = await entity.getPaymentForStore({ id_order: order.id, total: totalPay }); // Obtener información de pago
        console.log(`paymentInfo:`, JSON.stringify(paymentInfo, null, 2));

        // Enviar información de pago a OpenPay
        const response = await entity.openpayAxios.post('charges/', paymentInfo[0]);
        console.log(`postOpenPay:`, JSON.stringify(response, null, 2));

        // Actualizar estado del pedido en la base de datos
        const { status, order_id, id } = response.data;
        const barcode_url = response.data.payment_method.reference;
        console.log(`barcode`,barcode_url);
        await axios.post(`Comercial/ECommerceOrder/updateOrder/${order_id}/${id}/${status}/${barcode_url}`);

        // Guardar el pedido en el store y redirigir a la página de confirmación
        cartStore.saveOrder(order.id);
        router.push('/confirmation');
    } catch (error) {
        // Manejo de errores: intentamos obtener más información de OpenPay si es posible
        try {
            const fallbackResponse = await entity.openpayAxios.get('/charges/tr5q8qvndmbfhdjtvvqy/');
            console.log('Respuesta de OpenPay (fallback):', fallbackResponse.data);
        } catch (fallbackError) {
            if (axios.isAxiosError(fallbackError)) {
                console.error('Error procesando el pago (fallback):', fallbackError.response?.data);
            } else {
                console.error('Error desconocido (fallback):', fallbackError);
            }
        }

        // Mostrar error principal al usuario
        if (axios.isAxiosError(error)) {
            toast.add({
                severity: 'error',
                summary: 'Error procesando el pago:',
                detail: error.response?.data,
                life: 7000,
            });
        } else {
            toast.add({
                severity: 'error',
                summary: 'Error procesando el pago:',
                detail: error,
                life: 7000,
            });
        }
    } finally {
        loading.value = false;
        blocked.value = false;
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
      const shipmentIdString = shipmentResponse.data.relationships.rates.data[0].id; //extraemos el id de la paqueteria seleccionada
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
    const url = `https://api-demo.skydropx.com/v1/shipments/${id}`; // Construye la URL usando el ID

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
        console.log('bodyLabel',JSON.stringify(parameters, null,2));
        try {
            const response = await fetch('https://api-demo.skydropx.com/v1/labels', {
            method: 'POST',
            headers: {
                'Authorization': `Token token=${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: parameters
            });
            const data = await response.json();
            console.log('labelCreated:', JSON.stringify(data, null, 2));
            return data;
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
<style>
.loading-overlay {
    position: fixed;         
    top: 0;                 
    left: 0;                 
    width: 100%;            
    height: 100%;            
    background-color: rgba(0, 0, 0, 0.5); 
    display: flex;           
    justify-content: center; 
    align-items: center;     
    z-index: 1000;           
}
.p-progress-spinner {
    width: 50px;             
    height: 50px;            
    border-width: 6px;       
    border-color: #ffffff;   
}
</style>