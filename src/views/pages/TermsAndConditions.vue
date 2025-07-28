<template>
    <div class="card px-4 py-8 md:px-6 lg:px-8" style="position: relative;">
        <!-- Botón "Regresar" con una flecha en la parte superior izquierda -->
        <button @click="goBack" class="goBackButton">
            ← Regresar
        </button>

        <div class="flex flex-wrap mb-4">
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
                    Aceptamos pagos con tarjetas de crédito y débito (Visa, MasterCard) a través de OpenPay, así como
                    pagos en efectivo en tiendas de conveniencia mediante un código de pago.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        goBack() {
            window.history.back();
        }
    }
};
</script>

<style scoped>
.goBackButton {
    position: absolute;
    top: 16px;
    left: 16px;
    padding: 8px 16px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease;
}

.goBackButton:hover {
    background-color: #2980b9;
}

.goBackButton:focus {
    outline: none;
}
</style>
