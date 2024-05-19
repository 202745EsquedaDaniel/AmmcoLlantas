const OrdersCard = props => {
    const { totalPrice, totalProducts} = props;

    return (
        <div className=" flex justify-between w-80 items-center mb-3 border-black p-4 mt-2 b-2 rounded-lg">
            <p className="w-full flex justify-between text-center">A</p>
        </div>
    )
}

export { OrdersCard }