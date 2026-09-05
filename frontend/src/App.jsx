import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from '@/components/layout/AppLayout'
import ComandoCentral from '@/pages/ComandoCentral'
import Vigilancia from '@/pages/Vigilancia'
import Alertas from '@/pages/Alertas'
import Seguridad from '@/pages/Seguridad'
import Forensia from '@/pages/Forensia'
import Ciberseguridad from '@/pages/Ciberseguridad'
import Protocolos from '@/pages/Protocolos'
import Edificio from '@/pages/Edificio'
import Configuracion from '@/pages/Configuracion'
import Login from '@/pages/Login'
import { RequireAuth } from '@/auth'
import { MayiaProvider } from '@/components/ui/Mayia'

// /login es público; todo lo demás exige sesión (RequireAuth).
export default function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        element={
          <RequireAuth>
            <MayiaProvider>
              <AppLayout />
            </MayiaProvider>
          </RequireAuth>
        }
      >
        <Route index                  element={<ComandoCentral />} />
        <Route path="vigilancia"      element={<Vigilancia />} />
        <Route path="alertas"         element={<Alertas />} />
        <Route path="seguridad"       element={<Seguridad />} />
        <Route path="ciberseguridad"  element={<Ciberseguridad />} />
        <Route path="forensia"        element={<Forensia />} />
        <Route path="protocolos"      element={<Protocolos />} />
        <Route path="edificio"        element={<Edificio />} />
        <Route path="configuracion"   element={<Configuracion />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  )
}
