import { createSlice } from '@reduxjs/toolkit';

const loans = [
    {
        id: '1',
        createdDate: '2024-04-28T11:57:17.315Z',
        name: 'وام ازدواج',
        repaymentType: [
            {
                name: '120 ماهه',
                value: 120,
            },
        ],
        amount: 3000000000,
        interestRate: 4,
        penaltyRate: 3.5,
    },
    {
        id: '5',
        createdDate: '2020-08-05T16:20:30.456Z',
        name: 'وام تجاری',
        repaymentType: [
            {
                name: '36 ماهه',
                value: 36,
            },
        ],
        amount: 4000000000,
        interestRate: 22,
        penaltyRate: 3.5,
    },
];

const intialState = {
    loans,
};

const lonsSlice = createSlice({
    name: 'loans',
    initialState: intialState,
    reducers: {
        addLoan: (state, action) => {
            const newLoan = action.payload;
            state.loans.push(newLoan);
        },
        deleteLoan: (state, action) => {
            const loanId = action.payload;
            state.loans = state.loans.filter((loan) => loan.id !== loanId);
        },
        editLoan: (state, action) => {
            const updatedLoan = action.payload;
            const index = state.loans.findIndex((loan) => loan.id === updatedLoan.id);
            if (index !== -1) {
                state.loans[index] = updatedLoan;
            }
        },
    },
});

export const { addLoan, deleteLoan, editLoan } = lonsSlice.actions;

export default lonsSlice.reducer;
