import { BuildingStorefrontIcon, HomeModernIcon, CircleStackIcon, TruckIcon, ClipboardDocumentCheckIcon, UserCircleIcon} from "@heroicons/react/24/solid"
import { FaTruckMoving } from "react-icons/fa";

const OrdersIcon = () => {
    return (
        <ClipboardDocumentCheckIcon className="h-6 w-6" />
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


 export { OrdersIcon, ProvidersIcon, ProductsIcon, HomeIcon, StoreIcon, UserIcon}