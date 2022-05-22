import { useState, useEffect } from 'react'
import Cliente from '../components/Cliente'

const Inicio = () => {

	const [clientes, setClientes] = useState([])

	useEffect(() => {
		const obtenerClientesAPI = async () => { // Función para obtener los clientes de la API
			try {
					const url = 'http://localhost:4000/clientes'
					const respuesta = await fetch(url)
					const resultado = await respuesta.json()

					setClientes(resultado)
			} catch (error) {
				console.log(error)
			}
		}

		obtenerClientesAPI()
	}, [])

	const handleEliminar = async id => { // Función para eliminar un cliente
		const confirmar = confirm('Deseas eliminar este cliente?') //función de js para confirmar la eliminación

		if(confirmar) {
			try{
				const url = `http://localhost:4000/clientes/${id}`
				const respuesta = await fetch(url, {
					method: 'DELETE'
				})
				
				await respuesta.json()

				const arrayClientes = clientes.filter(cliente => cliente.id !== id)
				setClientes(arrayClientes) // Actualizar el state con el array de clientes actualizado, sin estar recargando la página

			}catch{
				console.log(error)
			}
		}
		console.log(confirmar)
	}

	return (
		<div>
			<>
				<h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
				<p className='mt-3'>Administra tus Clientes</p>

				<table className='w-full mt-5 table-auto shadow bg-white'>
					<thead className='bg-blue-800 text-white'>
						<tr>
							<th className='p-2'>Nombre</th>
							<th className='p-2'>Contacto</th>
							<th className='p-2'>Empresa</th>
							<th className='p-2'>Acciones</th>
						</tr>	
					</thead>

					<tbody>
						{clientes.map( cliente => ( //me muestra la cantidad de clientes que hay en la API
							<Cliente 
								key={cliente.id}
								cliente={cliente}  // paso la información del cliente en el prop del cliente
								handleEliminar={handleEliminar}
							/>
						))}
					</tbody>
				</table>

    		</>
		</div>
	)
}

export default Inicio