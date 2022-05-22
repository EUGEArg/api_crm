import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './Layout/Layout'
import Inicio from './páginas/Inicio'
import NuevoCliente from './páginas/NuevoCliente'
import EditarCliente from './páginas/EditarCliente'
import VerCliente from './páginas/VerCliente'

function App() {

    return (
		<BrowserRouter>
			<Routes>
				<Route path='/clientes' element={<Layout />}>
					<Route index element={<Inicio />} />
					<Route path='nuevo' element={<NuevoCliente />} />
					<Route path='editar/:id' element={<EditarCliente />} />
					<Route path=':id' element={<VerCliente />} />
				</Route>

				
			</Routes>
		</BrowserRouter>
	)
}

export default App
