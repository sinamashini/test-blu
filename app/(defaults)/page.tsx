import RequestOptions from '@/components/loans/requests/all';
import { Metadata } from 'next';
import React from 'react';
import data from '@/data.json';

export const metadata: Metadata = {
    title: 'تسهیلات قابل درخواست',
};

const Loans = () => {
    return (
        <div>
            <RequestOptions loans={data.data} />
        </div>
    );
};

export default Loans;
