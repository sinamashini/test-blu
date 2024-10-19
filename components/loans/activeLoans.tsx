'use client';

import { IRootState } from '@/store';
import { useSelector } from 'react-redux';
import { addCommas } from '@persian-tools/persian-tools';

const ActiveLoans = () => {
    const lones = useSelector((state: IRootState) => state.loanConfig.loans);
    return (
        <div className="table-responsive mb-5 bg-white">
            <table>
                <thead>
                    <tr>
                        <th>نوع تسهیلات</th>
                        <th>مبلغ وام (ریال)</th>
                        <th>تعداد ماه</th>
                        <th> قسط (ریال)</th>
                        <th>دیرکرد (ریال)</th>
                        <th>نرخ سود</th>
                        <th>نرخ دیرکرد</th>
                    </tr>
                </thead>
                <tbody>
                    {lones.map((data) => {
                        return (
                            <tr key={data.id}>
                                <td>
                                    <div className="whitespace-nowrap">{data.name}</div>
                                </td>
                                <td>{addCommas(data.amount)}</td>
                                <td>{data.repaymentType[0].name}</td>
                                <td>{addCommas((data.amount * data.interestRate + data.amount) / data.repaymentType[0].value)}</td>
                                <td>{addCommas(data.amount * data.penaltyRate)}</td>
                                <td>{data.interestRate}</td>
                                <td>{data.penaltyRate}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default ActiveLoans;
