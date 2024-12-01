import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { alertaSuccess, alertaError, alertaWarning } from "../alertas";
import Proveedor from "../components/Proveedor";


const useProveedor = () =>{
    const [proveedores, setProveedores] = useState([])
    const [id, setId] = useState('')
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [titleModal, setTitleModal] = useState('')
    const [operacion, setOperacion] = useState(1)

    //listado de proveedores

    const getProveedores = ()=>{
        const localStorageProveedores = localStorage.getItem('PROVEEDORES')
        const parseProveedores = localStorageProveedores ? JSON.parse(localStorageProveedores):[]

        if (!Array.isArray(parseProveedores)){
            setProveedores([])

        }else{
            setProveedores(parseProveedores)
        }
    }

    const openModal = (operation, id, nombre, direccion, telefono, correo) =>{
        setId('')
        setNombre('')
        setDireccion('')
        setTelefono('')
        setCorreo('')

        if (operation === 1){
            setTitleModal('Registrar proveedor')
            setOperacion(1)
        }else if (operation === 2){
            setTitleModal('Editar proveedor')
            setOperacion(2)
            setId(id)
            setNombre(nombre)
            setDireccion(direccion)
            setTelefono(telefono)
            setCorreo(correo)
        }
    }

    const enviarSolicitud = (metodo, parametros = {}) => {
        const saveUpdateProveedor = [...proveedores]
        let mensaje 

        if (metodo === 'POST'){
            saveUpdateProveedor.push({...parametros, id:Date.now()})
            mensaje = 'Proveedor ingresado correctamente'
        }else if (metodo === 'PUT'){
            const Proveedorindex = saveUpdateProveedor.findIndex(proveedor=> proveedor.id == parametros.id)

            if (Proveedorindex !== -1){//si encuentra un registro
                saveUpdateProveedor[Proveedorindex] = {...parametros}
                mensaje = 'Proveedor actualizado correctamente'
            }
        }else if (metodo === 'DELETE'){
            const proveedorArr = saveUpdateProveedor.filter(proveedor => proveedor.id !== parametros.id)
            setProveedores(proveedorArr)
            localStorage.setItem('PROVEEDORES', JSON.stringify(proveedorArr))
            alertaSuccess('Proveedor eliminado correctamente')
            return
        }

        localStorage.setItem('PROVEEDORES', JSON.stringify(saveUpdateProveedor)) //guardamos el del arreglo post y put
        setProveedores(saveUpdateProveedor)
        alertaSuccess(mensaje)
        document.getElementById('btnCerrarModal').click()

    }

    const validar = () => {
        let metodo = ''
        
        if (nombre === ''){
            alertaWarning('Nombre del proveedor en blanco', 'nombre')
        }else if (direccion === ''){
            alertaWarning('Dirección del proveedor en blanco', 'direccion')
        }else if (telefono === ''){
            alertaWarning('Telefono del proveedor en blanco', 'telefono')
        }else if (correo === ''){
            alertaWarning('Email del proveedor en blanco', 'correo')
        }else{
            let payload = {
                id: id || Date.now(),
                nombre: nombre,
                direccion: direccion,
                telefono: telefono,
                correo: correo
            }

            if (operacion === 1){
                metodo = 'POST'
            }else{
                metodo = 'PUT'
            }

            enviarSolicitud(metodo, payload)

        }

    }

    const deleteProveedores = (ids) => {  
        Swal.fire({  
            title: '¿Está seguro que desea eliminar los proveedores seleccionados?',  
            icon: 'question',  
            text: 'NO habrá marcha atrás',  
            showCancelButton: true,  
            confirmButtonText: 'Sí, eliminar',  
            cancelButtonText: 'Cancelar'  
        }).then((result) => {  
            if (result.isConfirmed) {  
                const proveedorArr = proveedores.filter(proveedor => !ids.includes(proveedor.id));  
                setProveedores(proveedorArr);  
                localStorage.setItem('PROVEEDORES', JSON.stringify(proveedorArr));  
                alertaSuccess('Proveedores eliminados correctamente');  
            }  
        }).catch((error) => {  
            alertaError(error);  
        });  
    };  

    const deleteProveedor = (id) => {
        Swal.fire({
            title:'Seguro que desea eliminar el proveedor?',
            incon: 'question',
            text: 'NO habrá marcha atrás',
            showCancelButton: true,
            confirmButtonText: 'Si, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed){
                enviarSolicitud('DELETE', {id})
            }
        }).catch((error) => {
            alertaError(error)
        })
    }

   
    return {
        getProveedores,
        openModal,
        validar,
        deleteProveedores,
        deleteProveedor,
        proveedores,
        titleModal,
        nombre,
        setNombre,
        direccion,
        setDireccion,
        telefono,
        setTelefono,
        correo,
        setCorreo 

        
    }
}

export default useProveedor

