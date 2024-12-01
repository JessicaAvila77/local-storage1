
import 'bootstrap/dist/css/bootstrap.min.css'
import useProveedor from '../hooks/useProveedor'
import { useEffect,  useState } from "react";
import Swal from 'sweetalert2';  

const Proveedor =() =>{ 

    
    const {getProveedores, 
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
        setCorreo,
    } = useProveedor()

    const [selectedIds, setSelectedIds] = useState([]);  

    // Al recargar la página recarga la info  
    useEffect(() => {  
        getProveedores();  
    }, []);   

    // Manejo de la eliminación de proveedores seleccionados  
    const handleDeleteSelected = () => {  
        if (selectedIds.length === 0) {  
            Swal.fire({  
                title: 'Error',  
                text: 'No se han seleccionado proveedores para eliminar.',  
                icon: 'error'  
            });  
            return;          
        }  

        // Mostrar alerta de confirmación  
        Swal.fire({  
            title: '¿Estás seguro?',  
            text: "No podrás recuperar los proveedores eliminados.",  
            icon: 'warning',  
            showCancelButton: true,  
            confirmButtonText: 'Sí, eliminar',  
            cancelButtonText: 'Cancelar'  
        }).then((result) => {  
            if (result.isConfirmed) {  
                deleteProveedores(selectedIds); // Llama a la función para eliminar varios proveedores   
                setSelectedIds([]); // Resetea la selección después de eliminar  
            }  
        });  
    };  

    const handleSelect = (id) => {  
        setSelectedIds(prevSelected =>   
            prevSelected.includes(id)   
                ? prevSelected.filter(item => item !== id)   
                : [...prevSelected, id]  
        );  
    };  

    const handleSelectAll = (event) => {  
        if (event.target.checked) {  
            const allIds = proveedores.map(proveedor => proveedor.id);  
            setSelectedIds(allIds);  
        } else {  
            setSelectedIds([]);  
        }  
    };  


//finalagregado

    return (
        <div className="container-fluir">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button onClick={() => openModal(1)} className="btn btn-success" data-bs-toggle = "modal" data-bs-target="#modalProveedores">
                            <i className="fa-solid fa-circle-plus">Agregar</i>
                        </button>
                    </div>
                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-lg-2">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr className="text-center">
                                <th>  
                                        <input   
                                            type="checkbox"   
                                            onChange={handleSelectAll}   
                                            checked={selectedIds.length === proveedores.length && proveedores.length > 0}  
                                        />  
                                    </th>  
                                    <th>Id</th>      
                                    <th>Proveedor</th> 
                                    <th>Dirección</th> 
                                    <th>Telefono</th> 
                                    <th>Correo electrónico</th>        
                                    <th>Acciones</th>                            
                                </tr>
                            </thead>
                            <tbody className="table-group-divider">
                                {
                                    proveedores.map((proveedor, i) =>(
                                        <tr key = {proveedor.id}>  
                                            <td>  
                                                <input   
                                                    type="checkbox"   
                                                    checked={selectedIds.includes(proveedor.id)}   
                                                    onChange={() => handleSelect(proveedor.id)}   
                                                />  
                                            </td>

                                            <td>{i + 1}</td>
                                            <td>{proveedor.nombre}</td>
                                            <td>{proveedor.direccion}</td>
                                            <td>{proveedor.telefono}</td>
                                            <td>{proveedor.correo}</td>
                                            <td>
                                                <button onClick={() => openModal(2, proveedor.id, proveedor.nombre, proveedor.direccion,proveedor.telefono, proveedor.correo)} className="btn btn-warning" data-bs-toggle = 'modal' data-bs-target = '#modalProveedores'> <i className="fa-solid fa-edit"></i></button>

                                                <button onClick={() => deleteProveedor(proveedor.id)} className="btn btn-danger"><i className="fa-solid fa-trash"></i>
                                                </button>                                           
                                            </td>
                                       </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <div className="d-grid mt-3">  
                            <button className="btn btn-danger" onClick={handleDeleteSelected}>  
                                Eliminar Seleccionados  
                            </button>  
                        </div>  
                    </div>
                </div>
            </div>

            <div id="modalProveedores" className="modal fade" aria-hidden='true'>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <label className="h5">{titleModal}</label>
                            <button className="btn-close" data-bs-dismiss="modal" aria-label="close"/>
                        </div>
                        <div className="modal-body">
                            <input type='hidden' id='id' />
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-clipboard" /></span>
                                <input type='text' id='nombre' className="form-control" placeholder="Nombre del proveedor" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-clipboard" /></span>
                                <input type='text' id='direccion' className="form-control" placeholder="Dirección" value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-clipboard" /></span>
                                <input type='text' id='telefono' className="form-control" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)}/>
                            </div>
                            <div className="input-group mb-3">
                                <span className="input-group-text"><i className="fa-regular fa-clipboard" /></span>
                                <input type='mail' id='correo' className="form-control" placeholder="Correo Electrónico" value={correo} onChange={(e) => setCorreo(e.target.value)} />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={() => validar()}>
                                <i className="fa-solid fa-floppy-disk" /> Guardar
                            </button>
                            <button id="btnCerrarModal" className="btn btn-danger" data-bs-dismiss='modal'>Cerrar</button>
                        </div> 
                    </div>                                          
                </div>
            </div>          
        </div>        
    );
}

export default Proveedor