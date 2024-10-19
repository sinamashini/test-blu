import React, { FC, useState, useEffect } from 'react';
import { Field, Form, Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { data } from '@/data.json';
import { addCommas } from '@persian-tools/persian-tools';
import { useDispatch } from 'react-redux';
import { addLoan } from '@/store/loansSlice';

interface LoanFormProps {
    fields: Record<string, any>;
    setFields: (fields: Record<string, any>) => void;
    setActiveTab: (page: number) => void;
    selectedLoan: string;
    setIsSuccess: (isSuccess: boolean) => void;
}

const LoanForm: FC<LoanFormProps> = ({ fields, setFields, setActiveTab, selectedLoan, setIsSuccess }) => {
    const dispatch = useDispatch();
    const [repaymentOptions, setRepaymentOptions] = useState([]);
    const [penalty, setPenalty] = useState(0);
    const [installmentAmount, setInstallmentAmount] = useState(0);
    const [loanAmount, setLoanAmount] = useState(0);

    const SubmittedSchema = z.object({
        loanType: z.string({ message: 'لطفا نوع وام را مشخص کنید' }),
        repaymentType: z.string({ message: 'لطفا نوع بازپرداخت را مشخص کنید' }),
    });

    const submitForm = async ({ values }: { values: Record<string, any> }) => {
        const arg = { ...fields, ...values };
        setFields(arg);
        await fetch('http://localhost:3000/api/loan', { method: 'POST', body: JSON.stringify(arg) });
        setIsSuccess(true);
        const selectedLoan = data.find((item) => item.id === arg.loanType);
        dispatch(addLoan(selectedLoan));
        setTimeout(() => {
            setIsSuccess(false); // Automatically hide the success message after 3 seconds
        }, 3000);
    };

    useEffect(() => {
        const initialLoan = data.find((item) => item.name === selectedLoan);
        if (initialLoan) {
            setRepaymentOptions(initialLoan.repaymentType || []);
            const loanAmount = initialLoan?.amount || 0;
            setLoanAmount(loanAmount);
        }
    }, [selectedLoan]);

    return (
        <Formik
            initialValues={{
                loanType: data.find((item) => item.name === selectedLoan)?.id || '',
                repaymentType: '',
            }}
            validationSchema={toFormikValidationSchema(SubmittedSchema)}
            onSubmit={() => {}}
        >
            {({ errors, submitCount, touched, values, setFieldValue, setErrors }) => (
                <Form className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        {/* Loan Type Select */}
                        <div className={submitCount ? (errors.loanType ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="select">انتخاب نوع وام</label>
                            <Field
                                as="select"
                                name="loanType"
                                className="form-select"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const selectedLoanId = e.target.value;
                                    setFieldValue('loanType', selectedLoanId);

                                    const selectedLoan = data.find((item) => item.id === selectedLoanId);
                                    const loanAmount = selectedLoan?.amount || 0;
                                    setLoanAmount(loanAmount);
                                    if (selectedLoan) {
                                        setRepaymentOptions(selectedLoan.repaymentType || []);
                                        setFieldValue('repaymentType', '');
                                    }
                                }}
                            >
                                <option value="">لطفا نوع وام را انتخاب کنید</option>
                                {data.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </Field>
                            {submitCount ? errors.loanType && <div className="mt-1 text-danger">{errors.loanType}</div> : ''}
                        </div>

                        {repaymentOptions.length > 0 && (
                            <div className={submitCount ? (errors.repaymentType ? 'has-error' : 'has-success') : ''}>
                                <label htmlFor="repaymentType">انتخاب نوع بازپرداخت</label>
                                <Field
                                    as="select"
                                    name="repaymentType"
                                    className="form-select"
                                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                        const numberOfMonths = e.target.value;
                                        if (numberOfMonths === '') {
                                            setErrors({ repaymentType: 'لطفا نوع بازپرداخت را انتخاب کنید' });
                                            return;
                                        }
                                        const selectedLoan = data.find((item) => item.id === values.loanType);

                                        const interestRate = selectedLoan?.interestRate || 0;
                                        const penalty = (selectedLoan?.penaltyRate || 0) * loanAmount;
                                        setPenalty(penalty);
                                        const amountInstallment = (loanAmount * interestRate + loanAmount) / parseInt(numberOfMonths);
                                        setInstallmentAmount(amountInstallment.toFixed(2));

                                        setFieldValue('repaymentType', numberOfMonths);
                                    }}
                                >
                                    <option value="">لطفا نوع بازپرداخت را انتخاب کنید</option>
                                    {repaymentOptions.map((repayment) => (
                                        <option key={repayment.value} value={repayment.value}>
                                            {repayment.name}
                                        </option>
                                    ))}
                                </Field>
                                {submitCount ? errors.repaymentType && <div className="mt-1 text-danger">{errors.repaymentType}</div> : ''}
                            </div>
                        )}
                        <div>
                            {values.loanType !== '' ? (
                                <div>
                                    <label htmlFor="amount">مبلغ وام</label>
                                    <div className="flex">
                                        <input disabled name="amount" type="text" id="amount" value={addCommas(loanAmount)} className="form-input" />
                                        <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-l-md rtl:border-l-0">
                                            ریال
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            {values.repaymentType !== '' ? (
                                <div>
                                    <label htmlFor="penalty">جریمه دیرکرد</label>
                                    <div className="flex">
                                        <input disabled name="penalty" type="text" id="penalty" value={addCommas(penalty)} className="form-input" />
                                        <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-l-md rtl:border-l-0">
                                            ریال
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            {values.repaymentType !== '' ? (
                                <div>
                                    <label htmlFor="installmentAmount">قسط تسهیلات</label>
                                    <div className="flex">
                                        <input disabled name="installmentAmount" type="text" id="installmentAmount" value={addCommas(installmentAmount)} className="form-input" />
                                        <div className="flex items-center justify-center border border-white-light bg-[#eee] px-3 font-semibold dark:border-[#17263c] dark:bg-[#1b2e4b] ltr:rounded-l-md ltr:border-r-0 rtl:rounded-l-md rtl:border-l-0">
                                            ریال
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between">
                        <button type="button" className="btn btn-primary !mt-6" onClick={() => setActiveTab(2)}>
                            بازگشت
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary !mt-6"
                            onClick={() => {
                                if (Object.keys(touched).length !== 0 && Object.keys(errors).length === 0) {
                                    submitForm({ values });
                                }
                            }}
                        >
                            ثبت
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default LoanForm;
