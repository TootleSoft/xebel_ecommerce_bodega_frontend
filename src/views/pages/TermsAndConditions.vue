<script setup>
import { ref } from 'vue';
const visibleMember = ref(null);

const setVisibleMember = (member) => {
    visibleMember.value = member;
};
</script>

<template>
    <div class="card px-4 py-8 md:px-6 lg:px-8">
        <div class="flex flex-wrap mb-4">
            <!-- <div class="w-full lg:w-6 pl-0 lg:pr-5">
                <img src="/demo/images/blocks/about/about-1.png" alt="Image" class="w-full border-round" />
            </div> -->
            <div class="w-full lg:w-6 pr-0 lg:pl-4 mt-3 lg:mt-0">
                <div class="font-bold text-4xl mb-4 text-900">Términos y Condiciones de Equipos Dentales Villa de Cortés
                    S.A. de C.V.</div>
                <div class="font-bold text-2mb mb-4 text-900">
                    Dirección: Eduardo Aguirre Pequeño #1302, Mitras Centro, Monterrey, Nuevo León, C.P 64460<br>
                    Correo Electrónico: ventas@edvcmty.com
                </div>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    <div class="font-bold text-4xl mb-4 text-900">1. Ámbito Legal</div>
                    Estos Términos y Condiciones se rigen y se interpretan exclusivamente conforme a las leyes del
                    estado de Nuevo León, México, sin tener en cuenta sus principios sobre conflictos de leyes.
                    Cualquier disputa o reclamo relacionado con el uso de este sitio o los servicios ofrecidos será
                    resuelta en la jurisdicción competente, la cual será el estado de Nuevo León.<br>
                    La aplicación de la Convención de Contratos de las Naciones Unidas para la Compraventa Internacional
                    de Mercaderías queda expresamente excluida.<br>
                    En ningún caso, Equipos Dentales Villa de Cortés S.A. de C.V. será responsable por daños indirectos,
                    incidentales, especiales o punitivos que surjan del uso de los servicios, incluidos, entre otros,
                    pérdida de ganancias, daño a datos o cualquier pérdida intangible.
                </p>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    <div class="font-bold text-4xl mb-4 text-900">2. Uso del Sitio</div>
                    Este sitio web es propiedad de Equipos Dentales Villa de Cortés S.A. de C.V. y ofrece la venta de
                    equipos e insumos dentales, de podología y médicos. Al acceder o usar este sitio web, confirmas que
                    has leído, entendido y aceptas cumplir estos Términos y Condiciones.
                </p>
                <ul class="line-height-3 mt-0 mb-3 p-0">
                    <strong>Requisitos:</strong>
                    <li>Tener al menos 18 años o la mayoría de edad legal en tu jurisdicción.</li>
                    <li>Proveer información precisa y actualizada para garantizar el contacto y la entrega correcta de
                        los productos adquiridos.</li>
                </ul>
                <ul class="line-height-3 my-0 p-0">
                    <strong>Prohibiciones:</strong>
                    <li>Está prohibido el uso no autorizado de nuestra marca, logotipos o contenido.</li>
                    <li>Nos reservamos el derecho de bloquear usuarios que incumplan cualquier disposición de los
                        términos y condiciones y/o cualquier otra disposición solicitada por Equipos Dentales Villa de
                        Cortés S.A. de C.V.</li>
                </ul>
                <br>
                <div class="font-bold text-4xl mb-4 text-900">5. Política de Devoluciones y Reembolsos</div>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    Los productos pueden devolverse dentro de los 15 días posteriores a la compra, siempre que estén en
                    perfectas condiciones, con su empaque original y el comprobante de compra.
                </p>
                <p class="line-height-3 mt-0 mb-3 p-0"><strong>Condiciones:</strong></p>
                <ul class="line-height-3 mt-0 mb-3 p-0">
                    <li>No se aceptan devoluciones de productos desechables como guantes, cubrebocas, batas, entre
                        otros.</li>
                    <li>No realizamos reembolsos en efectivo; las devoluciones serán acreditadas como saldo a favor en
                        tienda, válido por 30 días.</li>
                </ul>

                <div class="font-bold text-4xl mb-4 text-900">6. Garantías</div>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    Para reclamar una garantía, el cliente debe proporcionar el comprobante de compra, el número de
                    serie del producto y evidencia fotográfica del defecto o uso correcto del equipo.
                </p>
                <p class="line-height-3 mt-0 mb-3 p-0"><strong>Términos:</strong></p>
                <ul class="line-height-3 mt-0 mb-3 p-0">
                    <li>Los productos defectuosos serán reparados o reemplazados dentro de un plazo de 3 meses.</li>
                    <li>El cliente cubrirá los costos de envío al devolver el producto, y nosotros cubriremos los costos
                        de envío al cliente en caso de reparación o reemplazo.</li>
                </ul>
            </div>
            <div class="w-full lg:w-6 pr-0 lg:pl-4 mt-3 lg:mt-0">
                <div class="font-bold text-4xl mb-4 text-900">3. Condiciones de Compra</div>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    Al realizar una compra, aceptas que:
                </p>
                <ul class="line-height-3 mt-0 mb-3 p-0">
                    <li>Es tu responsabilidad revisar la información completa del producto antes de adquirirlo.</li>
                    <li>Estás formando un contrato legalmente vinculante al completar el proceso de compra.</li>
                </ul>
                <p class="line-height-3 mt-0 mb-3 p-0"><strong>Precios:</strong></p>
                <ul class="line-height-3 mt-0 mb-3 p-0">
                    <li>Los precios incluyen IVA, excepto en productos que, por ley, están exentos.</li>
                    <li>Los costos de envío son responsabilidad del cliente y dependen de la paquetería seleccionada a
                        través de nuestra plataforma.</li>
                    <li>Equipos Dentales Villa de Cortés S.A. de C.V. se reserva el derecho de modificar precios sin
                        previo aviso.</li>
                </ul>
                <p class="line-height-3 mt-0 mb-3 p-0"><strong>Proceso de Compra:</strong></p>
                <ol class="line-height-3 mt-0 mb-3 p-0">
                    <li>Regístrate en nuestro sitio web.</li>
                    <li>Agrega los productos deseados al carrito.</li>
                    <li>Realiza el pago mediante OpenPay o genera un código para pago en efectivo en tiendas de
                        conveniencia.</li>
                    <li>Elige la paquetería de tu preferencia.</li>
                </ol>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    <strong>Inventario:</strong> La disponibilidad de los productos está sujeta al stock en tienda o en
                    nuestras bodegas.
                </p>
                <div class="font-bold text-4xl mb-4 text-900">4. Envíos y Entregas</div>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    Realizamos envíos a toda la República Mexicana, sujetos a las limitaciones de nuestra plataforma
                    logística (Skydropx).
                </p>
                <p class="line-height-3 mt-0 mb-3 p-0"><strong>Términos:</strong></p>
                <ul class="line-height-3 mt-0 mb-3 p-0">
                    <li>Los tiempos de entrega pueden variar y, en casos especiales, tardar hasta 2 o 3 semanas.</li>
                    <li>Una vez que el pedido es entregado a la paquetería, nuestra responsabilidad concluye.</li>
                    <li>El cliente recibirá un número de rastreo para seguir su envío. Para más información, consulta
                        los términos de Skydropx.</li>
                </ul>
                <div class="font-bold text-4xl mb-4 text-900">7. Métodos de Pago</div>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    Aceptamos pagos mediante OpenPay, operado por BBVA México. La seguridad de los datos está
                    garantizada conforme a la política de privacidad de OpenPay. Para más información, consulta su aviso
                    de privacidad (enlace).
                </p>

                <div class="font-bold text-4xl mb-4 text-900">8. Protección de Datos</div>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    El cliente acepta que cualquier contenido cargado en el sitio web es de su propiedad o cuenta con
                    las licencias necesarias. Nos reservamos el derecho de suspender el acceso al sitio por violaciones
                    a estos términos.
                </p>
                <p class="line-height-3 mt-0 mb-3 p-0">
                    El cliente puede solicitar la cancelación de su cuenta en cualquier momento. Asimismo, puede optar
                    por no recibir materiales promocionales notificándonos por escrito.
                </p>
                    <div class="font-bold text-4xl mb-4 text-900">9. Modificaciones a los Términos</div>
                    <p class="line-height-3 mt-0 mb-3 p-0">
                        Nos reservamos el derecho de modificar estos Términos en cualquier momento. Los cambios serán
                        notificados de manera oportuna. El uso continuado del sitio tras dichas modificaciones
                        constituye la aceptación de los nuevos términos.
                    </p>
            </div>
        </div>
        <!-- <div class="mt-3 md:mt-8">
            <span class="block text-900 font-bold text-3xl mb-3 text-center">Our Team</span>
            <div class="text-center text-lg line-height-3 mb-6">Faucibus ornare suspendisse sed nisi. Nisl rhoncus
                mattis rhoncus urna neque viverra justo nec.</div>
            <div class="grid">
                <div class="col-12 md:col-6 lg:col-3 p-3">
                    <div class="relative overflow-hidden" @mouseenter="setVisibleMember(0)"
                        @mouseleave="setVisibleMember(-1)">
                        <img src="/demo/images/blocks/team/team-1.png" class="w-full block" alt="Team 1" />

                        <div v-if="visibleMember === 0"
                            class="absolute top-0 left-0 h-full w-full border-round fadein animation-duration-300 select-none"
                            :style="{ backgroundColor: 'rgba(0,0,0,0.7)' }">
                            <div class="flex flex-column p-5 h-full">
                                <span class="block font-medium text-white text-xl mb-3">Jeff Davies</span>
                                <span class="font-medium text-400">Software Developer</span>
                                <div class="mt-auto">
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-twitter text-600 text-xl mr-3"></i>
                                    </a>
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-github text-600 text-xl mr-3"></i>
                                    </a>
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-facebook text-600 text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-3 p-3">
                    <div class="relative overflow-hidden" @mouseenter="setVisibleMember(1)"
                        @mouseleave="setVisibleMember(-1)">
                        <img src="/demo/images/blocks/team/team-2.png" class="w-full block" alt="Team 2" />

                        <div v-if="visibleMember === 1"
                            class="absolute top-0 left-0 h-full w-full border-round fadein animation-duration-300 select-none"
                            :style="{ backgroundColor: 'rgba(0,0,0,0.7)' }">
                            <div class="flex flex-column p-5 h-full">
                                <span class="block font-medium text-white text-xl mb-3">Kristin Watson</span>
                                <span class="font-medium text-400">UI/UX Designer</span>
                                <div class="mt-auto">
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-twitter text-600 text-xl mr-3"></i>
                                    </a>
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-github text-600 text-xl mr-3"></i>
                                    </a>
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-facebook text-600 text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-3 p-3">
                    <div class="relative overflow-hidden" @mouseenter="setVisibleMember(2)"
                        @mouseleave="setVisibleMember(-1)">
                        <img src="/demo/images/blocks/team/team-3.png" class="w-full block" alt="Team 3" />

                        <div v-if="visibleMember === 2"
                            class="absolute top-0 left-0 h-full w-full border-round fadein animation-duration-300 select-none"
                            :style="{ backgroundColor: 'rgba(0,0,0,0.7)' }">
                            <div class="flex flex-column p-5 h-full">
                                <span class="block font-medium text-white text-xl mb-3">Jenna Williams</span>
                                <span class="font-medium text-400">Marketing Specialist</span>
                                <div class="mt-auto">
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-twitter text-600 text-xl mr-3"></i>
                                    </a>
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-github text-600 text-xl mr-3"></i>
                                    </a>
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-facebook text-600 text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-12 md:col-6 lg:col-3 p-3">
                    <div class="relative overflow-hidden" @mouseenter="setVisibleMember(3)"
                        @mouseleave="setVisibleMember(-1)">
                        <img src="/demo/images/blocks/team/team-4.png" class="w-full block" alt="Team 4" />

                        <div v-if="visibleMember === 3"
                            class="absolute top-0 left-0 h-full w-full border-round fadein animation-duration-300 select-none"
                            :style="{ backgroundColor: 'rgba(0,0,0,0.7)' }">
                            <div class="flex flex-column p-5 h-full">
                                <span class="block font-medium text-white text-xl mb-3">Joe Clifford</span>
                                <span class="font-medium text-400">Customer Relations</span>
                                <div class="mt-auto">
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-twitter text-600 text-xl mr-3"></i>
                                    </a>
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-github text-600 text-xl mr-3"></i>
                                    </a>
                                    <a tabindex="0" class="cursor-pointer text-white">
                                        <i class="pi pi-facebook text-600 text-xl"></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
