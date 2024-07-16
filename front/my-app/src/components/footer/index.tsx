'use client'
import React, { useState, useEffect } from 'react'
import { DataStore} from '@/store/dataStore'
import Swal from 'sweetalert2'

const Footer: React.FC = () => {
  const { userDataUser, getDataUser } = DataStore()
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false)

  useEffect(() => {
    getDataUser()
  }, [getDataUser])

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userDataUser.id) {
      console.error('User ID is not available')
      return
    }

    try {
      const res = await fetch(
        `http://localhost:3000/users/suscriptUser/${userDataUser?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      )

      if (!res.ok) {
        throw new Error('Failed to subscribe')
      } else {
        Swal.fire({
          title: 'Success',
          text: 'Successfully subscribed',
          icon: 'success',
          customClass: {
            confirmButton: 'bg-[#f7a90e] text-white px-4 py-2 rounded',
          },
          buttonsStyling: false,
        })
        setIsSubscribed(true)
      }
    } catch (error) {
      console.error('Error subscribing:', error)
      Swal.fire({
        title: 'Error',
        text: 'Error subscribing',
        icon: 'error',
        customClass: {
          confirmButton: 'bg-[#f7a90e] text-white px-4 py-2 rounded',
        },
        buttonsStyling: false,
      })
    }
  }

  const handleUnsubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!userDataUser.id) {
      console.error('User ID is not available')
      return
    }

    try {
      const res = await fetch(
        `http://localhost:3000/users/unsuscriptUser/${userDataUser?.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      if (!res.ok) {
        throw new Error('Failed to unsubscribe')
      } else {
        Swal.fire({
          title: 'Success',
          text: 'Successfully unsubscribed',
          icon: 'info',
          customClass: {
            confirmButton: 'bg-[#f7a90e] text-white px-4 py-2 rounded',
          },
          buttonsStyling: false,
        })
        setIsSubscribed(false)
      }
    } catch (error) {
      console.error('Error unsubscribing:', error)
      Swal.fire({
        title: 'Error',
        text: 'Error unsubscribing',
        icon: 'error',
        customClass: {
          confirmButton: 'bg-[#f7a90e] text-white px-4 py-2 rounded',
        },
        buttonsStyling: false,
      })
    }
  }

  return (
    <footer className="bg-[#dadada] text-black py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Formulario */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-black h-8 w-64">
              Suscríbete
            </h2>
            <form onSubmit={isSubscribed ? handleUnsubscribe : handleSubscribe}>
              <button
                type="submit"
                className={`w-64 px-4 py-2 rounded-lg ${
                  isSubscribed
                    ? 'bg-red-500 text-white'
                    : 'bg-lightorangeinti text-white'
                }`}
              >
                {isSubscribed ? 'Darse de baja' : 'Suscribirse'}
              </button>
            </form>
          </div>
          {/* Nuestros servicios */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-black h-8 w-64">
              Nuestros Servicios
            </h2>
            <ul>
              <li className="mb-2"><a href="/Hire">DUSTERFLEX</a></li>
              <li className="mb-2"><a href="/Hire">SMARTDUSTER</a></li>
              <li className="mb-2"><a href="/Hire">SUNSIGHT</a></li>
            </ul>
          </div>

          {/* Contáctenos */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-black h-8 w-64">
              Contáctenos
            </h2>
            <p className="mb-2">Teléfono: (123) 456-7890</p>
            <p className="mb-2">Email: contacto@example.com</p>
            <p className="mb-2">Dirección: Calle Falsa 123, Ciudad, País</p>
          </div>

          {/* Imagen */}
          <div>
            <h2 className="text-xl font-bold mb-4 border-b border-black h-8 w-64">
              Encuéntranos
            </h2>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3330.7251368142765!2d-70.58366331973544!3d-33.40433447097393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf250de7f841%3A0xf9f838a245f24075!2sAlonso%20de%20C%C3%B3rdova%2C%20Vitacura%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses-419!2sar!4v1719588903935!5m2!1ses-419!2sar"
              width="325"
              height="225"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
