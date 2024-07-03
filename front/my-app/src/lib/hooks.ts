import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './store'
import {addToCart} from "@/lib/features/cartSlice"//es un ejemplo eliminar despues de utilizar

//hook al que le paso las funciones que modifican el estado
export const useAppDispatch =()=> useDispatch<AppDispatch>()
//hook con el que voy a acceder y llevar informacion al estado global
export const useAppSelector:TypedUseSelectorHook <RootState> = useSelector


//tienen que ser importados en el componente desde donde se modifica el estado, por ejemplo desde los botones de agregar al carrito. useAppDispatch accede  las funciones que vas a ejecutar para cambiar aumentar o disminuir o borrar el carrito. Mientras que useAppSelector te va a servir para acceder al estado desde el componente y en caso de tener varios estados seleccionar cual.

const cart = useAppSelector (state=>state.cartReducer.value)// accede al estado inicial de cartReducer que es 0

const dispatch = useAppDispatch()// instanciar el hook creado

dispatch(addToCart())// importar la funcion que modifica el estado y pasarla dentro de la instancia dispatch. En teoria debe ejecutarse la funcion. 



