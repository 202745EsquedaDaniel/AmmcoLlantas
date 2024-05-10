import { BuildingStorefrontIcon, HomeModernIcon, CircleStackIcon, TruckIcon, ClipboardDocumentCheckIcon, UserCircleIcon} from "@heroicons/react/24/solid"

const OrdersIcon = () => {
    return (
        <ClipboardDocumentCheckIcon className="h-6 w-6" />
    )
 }


const ProvidersIcon = () => {
    return (
        <TruckIcon className="h-6 w-6" />
    )
 }

const ProductsIcon = () => {
    return (
        <CircleStackIcon className="h-6 w-6" />
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