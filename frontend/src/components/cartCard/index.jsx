import { XIcon } from "../icons";

const CartCard = props => {
const {id, name, price, handleDelete} = props;
let renderXIcon
if (handleDelete) {
    renderXIcon = <XIcon></XIcon>
}

    return (
        <div className="flex justify-between items-center mb-3">
            <div className="flex items-center gap-2">
                <figure className=" w-20 h-20">
                    <img className=" w-full h-full rounded-lg object-cover" src="https://e7.pngegg.com/pngimages/525/536/png-clipart-tires-tires.png" alt={name} />
                </figure>
                <p className=" text-sm font-light">{name}</p>
            </div>

        <div className=" flex items-center gap-2">
            <p className=" text-lg font-medium">${price}</p>
            <div className=" cursor-pointer"
            onClick={() => handleDelete(id)}
            >
                {renderXIcon}
            </div>
        </div>
            
        </div>
    )
}

export { CartCard }