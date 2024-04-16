import React, { useState } from 'react';
import axios from 'axios';

const AddRentPayment = ({ setRentPayments, tenants }) => {
    const [tenant, setTenant] = useState('');
    const [amount, setAmount] = useState('');
    const [datePaid, setDatePaid] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const newRentPayment = {
                tenant,
                amount,
                datePaid,
            };
            const response = await axios.post('http://localhost:5001/api/rent-payments', newRentPayment);
            setRentPayments(prevRents => [...prevRents, response.data]);
            setTenant('');
            setAmount('');
            setDatePaid('');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>Add Rent Payment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Tenant:
                    <select value={tenant} onChange={(e) => setTenant(e.target.value)}>
                        <option value="">Select Tenant</option>
                        {tenants.map(tenant => (
                            <option key={tenant._id} value={tenant._id} required>
                                {tenant.firstName} {tenant.lastName}
                            </option>
                        ))}
                    </select>
                </label>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                </label>
                <label>
                    Date Paid:
                    <input type="date" value={datePaid} onChange={(e) => setDatePaid(e.target.value)} />
                </label>
                <button type="submit">Add Rent Payment</button>
            </form>
        </div>
    );
};

export default AddRentPayment;
