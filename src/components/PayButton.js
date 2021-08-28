import React, { useEffect } from 'react';

import { PayPalButton } from "react-paypal-button-v2";

export default function PayButton({ total, onSuccess }) {

    useEffect(() => {
        console.log(total);

    }, [])

    const onCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: total,
                    },
                },
            ],
        });
    }
    const onApproveOrder = async (data, actions) => {
        await actions.order.capture();
        onSuccess();

    };


    return (
        <div>
            <PayPalButton createOrder={onCreateOrder} onApprove={onApproveOrder} />
        </div>
    )
}