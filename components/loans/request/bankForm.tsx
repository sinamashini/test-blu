import React, { FC } from 'react';
import { Field, Form, Formik } from 'formik';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { getShebaInfo, isShebaValid } from '@persian-tools/persian-tools';

interface BankFormProps {
    fields: Record<string, any>;
    setFields: (fields: Record<string, any>) => void;
    setActiveTab: (page: number) => void;
}

const BankForm: FC<BankFormProps> = ({ setFields, setActiveTab, fields }) => {
    const submitForm = ({ values }: { values: Record<string, any> }) => {
        setFields({ ...fields, ...values });
        setActiveTab(3);
    };

    const shebaNumberValidate = z
        .string({ message: 'لطفا شماره شبا خود را وارد کنید' })
        .regex(/^IR.*/, { message: 'کد باید با IR شروع شود' })
        .refine((sheba) => isShebaValid(sheba), { message: 'شماره شبا نامعتبر است' });

    const schema = z.object({
        shebaNumber: shebaNumberValidate,
        accountNumber: z.string({ message: 'لطفا شماره حساب خود را وارد کنید' }),
        averageBalance: z.string({ message: 'لطفا میانگین ریالی موجودی سالیانه خود را وارد کنید' }),
    });

    return (
        <Formik
            initialValues={{
                accountNumber: fields.accountNumber ?? '',
                shebaNumber: fields.shebaNumber ?? '',
                averageBalance: fields.averageBalance ?? '',
            }}
            validationSchema={toFormikValidationSchema(schema)}
            onSubmit={() => {}}
        >
            {({ errors, submitCount, touched, values, setFieldValue, setValues }) => (
                <Form noValidate className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className={submitCount ? (errors.shebaNumber ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="shebaNumber">شبا</label>
                            <Field
                                name="shebaNumber"
                                type="text"
                                id="shebaNumber"
                                placeholder="شماره شبا را وارد کنید"
                                className="form-input"
                                onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                                    const sheba = e.target.value;
                                    // Check if the shebaNumber is valid
                                    if (isShebaValid(sheba)) {
                                        const shebaInfo = getShebaInfo(sheba);
                                        if (shebaInfo && shebaInfo.accountNumber) {
                                            // Set the accountNumber field based on the valid sheba number
                                            setFieldValue('accountNumber', shebaInfo.accountNumber);
                                        }
                                    }
                                }}
                            />
                            {submitCount ? errors.shebaNumber && <div className="mt-1 text-danger">{errors.shebaNumber}</div> : ''}
                        </div>

                        <div className={submitCount ? (errors.accountNumber ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="accountNumber">شماره حساب</label>
                            <Field name="accountNumber" type="text" id="accountNumber" placeholder="شماره حساب خود را وارد کنید" className="form-input" />
                            {submitCount ? errors.accountNumber && <div className="mt-1 text-danger">{errors.accountNumber}</div> : ''}
                        </div>

                        <div className={submitCount ? (errors.averageBalance ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="averageBalance">میانگین ریالی موجودی سالیانه</label>
                            <Field name="averageBalance" type="text" id="averageBalance" placeholder="میانگین ریالی موجودی سالیانه خود را وارد کنید" className="form-input" />
                            {submitCount ? errors.averageBalance && <div className="mt-1 text-danger">{errors.averageBalance}</div> : ''}
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <button type="button" className="btn btn-primary !mt-6" onClick={() => setActiveTab(1)}>
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
                            بعدی
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default BankForm;
