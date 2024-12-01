import { alertaSuccess } from "../alertas"
import { alertaError } from "../alertas"
import { alertaWarming } from "../alertas"

const Proveedor =() =>{ 
    return (
        <div className="container-fluir">
            <div className="row mt-3">
                <div className="col-md-4 offset-md-4">
                    <div className="d-grid mx-auto">
                        <button className="btn btn-primary">
                            <i className="fa-solid fa-circle-plus">Agregar</i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Proveedor