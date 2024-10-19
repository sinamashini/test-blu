import LoanRequestWizard from '@/components/loans/request/form';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

const verifiedLoans = ['وام-ازدواج', 'وام-تحصیلی', 'وام-تجاری', 'وام-شخصی', 'وام خرید-خودرو', 'وام-تعمیرات-منزل'];

export const metadata: Metadata = {
    title: 'درخواست تسهیلات',
};

interface LoanPageProps {
    params: {
        loan: string;
    };
}

const LoanPage = ({ params }: LoanPageProps) => {
    const { loan } = params;

    const isVerifiedLoan = verifiedLoans.includes(decodeURIComponent(loan));

    if (!isVerifiedLoan) {
        notFound();
    }

    const validLoan = decodeURIComponent(loan);
    return (
        <div>
            <LoanRequestWizard loan={validLoan.replace(/-/g, ' ')} />
        </div>
    );
};

export default LoanPage;
