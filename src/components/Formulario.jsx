import React from 'react'
import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom' //hook para redireccioanar
import * as Yup from 'yup'
import Alerta from './Alerta'
import Spinner from './Spinner'

const Formulario = ({ cliente, cargando }) => {

    const navigate = useNavigate()

    const nuevoClienteSchema = Yup.object().shape({ //Validación con Yup
        nombre: Yup.string()
            .min(3, 'El nombre debe tener más de 3 caracteres')
            .max(30, 'El nombre debe tener menos de 30 caracteres')
            .required('El nombre del Cliente es obligatorio'),
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('El email no es válido')
            .required('El email es obligatorio'),
        telefono: Yup.number()
            .positive('Número no válido')
            .integer('Número no válido')
            .typeError('Número no válido'),
    })

    const handleSubmit = async (values) => {
        try {
            let respuesta
            if(cliente.id) {
                //Editando un registro
                const url = `http://localhost:4000/clientes/${cliente.id}` //petición
                respuesta = await fetch(url, {
                    method: 'PUT', //CREAR nuevo registro
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                
            }else {
                //Nuevo Registro
                const url = 'http://localhost:4000/clientes' //petición
                respuesta = await fetch(url, {
                    method: 'POST', //CREAR nuevo registro
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                await respuesta.json()// Una vez que se ejecute la petición, se obtiene el resultado en formato JSON y redirecciona a clientes
                navigate('/clientes') //redireccionar a clientes
            }            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w 3/4 mx-auto'>
                <h1 className='text-gray-600 font-bold text-xl uppercase text-center'>{cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}</h1>

                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '', //Nullish coalescing operator (??) si cliente existe, se le asigna el valor de nombre, sino se le asigna ''
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? '',
                    }}
                    enableReinitialize={true} //permite volver a inicializar el formulario
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values)

                        resetForm()
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {
                        console.log(touched)
                        return (
                            <Form className='mt-10 '>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='nombre'
                                    >Nombre:</label>
                                    <Field
                                        id='nombre'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Nombre del Cliente'
                                        name='nombre'
                                    />

                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='empresa'
                                    >Empresa:</label>
                                    <Field
                                        id='empresa'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Empresa del Cliente'
                                        name='empresa'
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='email'
                                    >E-mail:</label>
                                    <Field
                                        id='email'
                                        type='email'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Email del Cliente'
                                        name='email'
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='telefono'
                                    >Teléfono:</label>
                                    <Field
                                        id='telefono'
                                        type='tel'
                                        className='mt-2 block w-full p-3 bg-gray-50'
                                        placeholder='Teléfono del Cliente'
                                        name='telefono'
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>
                                <div className='mb-4'>
                                    <label
                                        className='text-gray-800'
                                        htmlFor='notas'
                                    >Notas:</label>
                                    <Field
                                        as='textarea' //para usar el input como textarea
                                        id='notas'
                                        type='text'
                                        className='mt-2 block w-full p-3 bg-gray-50 h-40'
                                        placeholder='Notas del Cliente'
                                        name='notas'
                                    />
                                </div>
                                <input
                                    className='mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg rounded-md'
                                    type='submit'
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                />
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        )
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario