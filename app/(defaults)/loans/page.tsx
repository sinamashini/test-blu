import { Metadata } from 'next';
import React from 'react';
import data from '@/data.json';
import ActiveLoans from '@/components/loans/activeLoans';

export const metadata: Metadata = {
    title: 'تسهیلات فعال',
};

const Loans = () => {
    return <ActiveLoans />;
};

export default Loans;
