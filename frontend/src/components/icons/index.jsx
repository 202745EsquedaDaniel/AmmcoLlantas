import { BuildingStorefrontIcon, HomeModernIcon, CircleStackIcon, TruckIcon, ClipboardDocumentCheckIcon, UserCircleIcon} from "@heroicons/react/24/solid"
import { FaTruckMoving, FaShoppingCart, FaRegPlusSquare, FaRegCalendarCheck, FaDollarSign, FaRegWindowClose    } from "react-icons/fa";
import { FaSquareCheck } from "react-icons/fa6";

const OrdersIcon = () => {
    return (
        <ClipboardDocumentCheckIcon className="h-6 w-6" />
    )
 }
 
 const XIcon = () => {
    return (
        <FaRegWindowClose className="h-6 w-6" />
    )
}

 const DollarIcon = () => {
    return (
        <FaDollarSign className="h-6 w-6" />
    )
    }

 const CalendarIcon = () => {
    return (
        <FaRegCalendarCheck className="h-6 w-6" />
    )
 }



 const AddIcon = () => {
    return (
        <FaRegPlusSquare className="h-6 w-6" />
    )
 }

 const CheckIcon = () => {
    return (
        <FaSquareCheck className="h-6 w-6" />
    )
 
 }


 const CartIcon = () => 
    {
        return (
            <FaShoppingCart className="h-6 w-6" />
        )
    }

const ProvidersIcon = () => {
    return (
        <FaTruckMoving className="h-6 w-6" />
    )
 }

const ProductsIcon = () => {
    return (
        <CircleStackIcon className="h-8 w-8" />
    )
 }

const HomeIcon = () => {
    return (
        <HomeModernIcon className="h-6 w-6" />
    )
 }

const StoreIcon = () => {
   return (
       <BuildingStorefrontIcon className="h-6 w-6" />
   )
}

const UserIcon = () => {
    return (
        <UserCircleIcon className="h-6 w-6" />
    )
 }


 export { OrdersIcon, CartIcon, ProvidersIcon, ProductsIcon, HomeIcon, StoreIcon, UserIcon, AddIcon, CheckIcon, DollarIcon, CalendarIcon, XIcon}