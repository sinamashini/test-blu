export interface RepaymentType {
    name: string;
    value: number;
}

export interface Loan {
    id: string;
    createdDate: string;
    name: string;
    repaymentType: RepaymentType[];
    amount: number;
    percentageRate?: number;
    interestRate?: number;
    penaltyRate: number;
}

interface LoanData {
    data: Loan[];
}
