import Swal from "sweetalert2";


const alertaSuccess = (mensaje) => {
    Swal.fire({
        title:mensaje,
        icon:'success'
    })
}

const alertaError = (mensaje) => {
    Swal.fire({
        title:mensaje,
        icon:'error'
    })
}

//id es opcional se inicializa con un campo vacio por si no viene parametro
const alertaWarming = (mensaje, id = '') => {
    onFocus(id)

    Swal.fire({
        title:mensaje,
        icon:'warning'
    })
}

const onFocus = (id) => {
    if (id !== ''){
        document.getElementById(id).focus()
    }
}

export {
    alertaSuccess,
    alertaError,
    alertaWarming
}