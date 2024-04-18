import { MenuItem } from "primevue/menuitem";
import { ref } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();


export const LoginStructure = ref<MenuItem[]>([
    {
        label: 'Iniciar Sesion',
        icon: 'pi pi-users'
    },
    {
        label: 'Crear Cuenta',
        icon: 'pi pi-user-plus'
    },
]);

export const UserStructure = ref<any[]>([
    {
        label: 'Mis Pedidos',
        icon: 'pi pi-inbox',
    },
    {
        label: 'Lista de deseos',
        icon: 'pi pi-heart'
    },
    {
        label: 'Configuracion',
        icon: 'pi pi-cog'
    },
    {
        label: 'Cerrar Sesion',
        icon: 'pi pi-sign-in'
    },
]);


export const ItemsStructure = ref<any[]>([
    {
        label: 'Inicio',
        command: () => { router.push('/'); },
        root: true,
    },
    {
        label: 'Categorias',
        root: true,
        items:[
            {
                label: 'Clinica',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Clinica/PIEZA-DE-MANO'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            },
            {
                label: 'Equios Digitales',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Equios-Digitales/Anestecias'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            },
            {
                label: 'Instrumental',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Instrumental/Anestecias'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            },
            {
                label: 'Laboratorio',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Laboratorio/Anestecias'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            },
            {
                label: 'Ortodoncia',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Ortodoncia/Anestecias'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            },
            {
                label: 'Unidades Dentales',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Unidades-Dentales/Anestecias'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            },
            {
                label: 'Uniformes',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Uniformes/Anestecias'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            },
            {
                label: 'Estudiantes',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Estudiantes/Anestecias'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            },
            {
                label: 'Revistas',
                parent: true,
                items:[
                    { label: 'Anestecias', command: () => { router.push('/products/c/Revistas/Anestecias'); } },
                    { label: 'Cosas', command: () => { router.push('/'); } }
                ]
            }
        ]
    },
    {
        label: 'Marcas',
        //icon: 'pi pi-th-large',
        root: true,
        items:[
            {
                label: 'Todas',
                command: () => { router.push('/products/b'); },
                parent: true,
            },
            {
                label: 'Metabiomed',
                command: () => { router.push('/products/b/Metabiomed'); },
                parent: true,
            },
            {
                label: 'Papacaries',
                command: () => { router.push('/products/b/Papacaries'); },
                parent: true,
            },
            {
                label: 'Viarden',
                command: () => { router.push('/products/b/Viarden'); },
                parent: true,
            }
        ]
    },
    {
        label: 'Ofertas',
        //icon: 'pi pi-th-large',
        root: true,
    },
    {
        label: 'Contacto',
        //icon: 'pi pi-th-large',
        root: true,
    },
    {
        label: 'Nosotros',
        //icon: 'pi pi-th-large',
        root: true,
    },
]);
