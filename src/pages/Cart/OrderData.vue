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
            <Button class="mt-3 lg:mt-0 w-full lg:w-auto flex-order-2 lg:flex-order-1 lg:mr-4" severity="secondary" label="Return to Cart" icon="pi pi-fw pi-arrow-left"></Button>
            <Button class="w-full lg:w-auto flex-order-1 lg:flex-order-2" label="Continue to Shipping" icon="pi pi-fw pi-check"></Button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import ShippingData from './ShippingData.vue';
import axios from 'axios';
import { useAuthStore } from '../../stores/auth';
import OrderDataProduct from './OrderDataProduct.vue';

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

const useCfdi = ref<any[]>([
    {
        "c_UsoCFDI": "G01",
        "Descripcion": "Adquisición de mercancías.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "G02",
        "Descripcion": "Devoluciones, descuentos o bonificaciones.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "G03",
        "Descripcion": "Gastos en general.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "I01",
        "Descripcion": "Construcciones.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "I02",
        "Descripcion": "Mobiliario y equipo de oficina por inversiones.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "I03",
        "Descripcion": "Equipo de transporte.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "I04",
        "Descripcion": "Equipo de computo y accesorios.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "I05",
        "Descripcion": "Dados, troqueles, moldes, matrices y herramental.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "I06",
        "Descripcion": "Comunicaciones telefónicas.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "I07",
        "Descripcion": "Comunicaciones satelitales.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "I08",
        "Descripcion": "Otra maquinaria y equipo.",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "D01",
        "Descripcion": "Honorarios médicos, dentales y gastos hospitalarios.",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D02",
        "Descripcion": "Gastos médicos por incapacidad o discapacidad.",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D03",
        "Descripcion": "Gastos funerales.",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D04",
        "Descripcion": "Donativos.",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D05",
        "Descripcion": "Intereses reales efectivamente pagados por créditos hipotecarios (casa habitación).",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D06",
        "Descripcion": "Aportaciones voluntarias al SAR.",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D07",
        "Descripcion": "Primas por seguros de gastos médicos.",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D08",
        "Descripcion": "Gastos de transportación escolar obligatoria.",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D09",
        "Descripcion": "Depósitos en cuentas para el ahorro, primas que tengan como base planes de pensiones.",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "D10",
        "Descripcion": "Pagos por servicios educativos (colegiaturas).",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_UsoCFDI": "S01",
        "Descripcion": "Sin efectos fiscales.  ",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "CP01",
        "Descripcion": "Pagos",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_UsoCFDI": "CN01",
        "Descripcion": "Nómina",
        "Fisica": "Sí",
        "Moral": "No"
    }
])

const taxRegime = ref<any[]>([
    {
        "c_RegimenFiscal": "601",
        "Descripcion": "General de Ley Personas Morales",
        "Fisica": "No",
        "Moral": "Sí"
    },
    {
        "c_RegimenFiscal": "603",
        "Descripcion": "Personas Morales con Fines no Lucrativos",
        "Fisica": "No",
        "Moral": "Sí"
    },
    {
        "c_RegimenFiscal": "605",
        "Descripcion": "Sueldos y Salarios e Ingresos Asimilados a Salarios",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "606",
        "Descripcion": "Arrendamiento",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "607",
        "Descripcion": "Régimen de Enajenación o Adquisición de Bienes",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "608",
        "Descripcion": "Demás ingresos",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "610",
        "Descripcion": "Residentes en el Extranjero sin Establecimiento Permanente en México",
        "Fisica": "Sí",
        "Moral": "Sí"
    },
    {
        "c_RegimenFiscal": "611",
        "Descripcion": "Ingresos por Dividendos (socios y accionistas)",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "612",
        "Descripcion": "Personas Físicas con Actividades Empresariales y Profesionales",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "614",
        "Descripcion": "Ingresos por intereses",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "615",
        "Descripcion": "Régimen de los ingresos por obtención de premios",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "616",
        "Descripcion": "Sin obligaciones fiscales",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "620",
        "Descripcion": "Sociedades Cooperativas de Producción que optan por diferir sus ingresos",
        "Fisica": "No",
        "Moral": "Sí"
    },
    {
        "c_RegimenFiscal": "621",
        "Descripcion": "Incorporación Fiscal",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "622",
        "Descripcion": "Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras",
        "Fisica": "No",
        "Moral": "Sí"
    },
    {
        "c_RegimenFiscal": "623",
        "Descripcion": "Opcional para Grupos de Sociedades",
        "Fisica": "No",
        "Moral": "Sí"
    },
    {
        "c_RegimenFiscal": "624",
        "Descripcion": "Coordinados",
        "Fisica": "No",
        "Moral": "Sí"
    },
    {
        "c_RegimenFiscal": "625",
        "Descripcion": "Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas",
        "Fisica": "Sí",
        "Moral": "No"
    },
    {
        "c_RegimenFiscal": "626",
        "Descripcion": "Régimen Simplificado de Confianza",
        "Fisica": "Sí",
        "Moral": "Sí"
    }
]) 

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

onMounted(async () => {
    deliveryType.value = 1
    await refresh();
});
</script>