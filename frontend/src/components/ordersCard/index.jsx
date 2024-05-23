import { CalendarIcon, DollarIcon } from "../icons";

const OrdersCard = ({ id, date, totalPrice }) => {
    const parsedDate = new Date(date).toLocaleDateString();

    return (
        <div className="flex justify-between w-80 items-center mb-3 border border-black p-4 mt-2 b-2 rounded-lg">
            <p className="w-full flex justify-between text-center">
                <span className="flex items-center gap-1">
                    <CalendarIcon />
                    {parsedDate}
                </span>
                <span className="flex items-center gap-1">
                    Folio: {id}
                </span>
                <span className="flex items-center gap-1">
                    <DollarIcon />
                    ${totalPrice}
                </span>
            </p>
        </div>
    );
}

export { OrdersCard };
