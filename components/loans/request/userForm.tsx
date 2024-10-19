import React, { FC, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { z } from 'zod';
import { InputDatePicker } from 'jalaali-react-date-picker';
import moment from 'moment-jalaali';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { verifyIranianNationalId } from '@persian-tools/persian-tools';

import 'jalaali-react-date-picker/lib/styles/index.css';

moment.loadPersian({ dialect: 'persian-modern' });

interface UserFormProps {
    fields: Record<string, any>;
    setFields: (fields: Record<string, any>) => void;
    goToNextPage: () => void;
}

const UserForm: FC<UserFormProps> = ({ setFields, goToNextPage, fields }) => {
    const [openDatePicker, setOpenDatePicker] = useState(false);

    const submitForm = ({ values }: { values: Record<string, any> }) => {
        setFields({ ...fields, ...values });
        goToNextPage();
    };

    const iranianNationalCode = z
        .string({ message: 'لطفا کدملی خودرا وارد کنید' })
        .length(10, { message: 'کد ملی باید ۱۰ رقم باشد' })
        .regex(/^\d{10}$/, { message: 'کد ملی باید شامل اعداد باشد' })
        .refine((nationalCode) => verifyIranianNationalId(nationalCode), { message: 'کد ملی معتبر نیست' });

    const schema = z.object({
        firstname: z.string({ message: 'لطفا نام خودرا وارد کنید' }).min(1),
        lastname: z.string({ message: 'لطفا نام خانوادگی خود را وارد کنید' }).min(1),
        nationalCode: iranianNationalCode, // Custom validation for national code
        birthday: z.date({ message: 'لطفا تاریخ تولد خود را وارد کنید' }),
        phone: z.string({ message: 'لطفا شماره موبایل خودرا وارد کنید' }).length(11, 'شماره موبایل ۱۱ رقم است'),
    });

    return (
        <Formik
            initialValues={{
                firstname: fields.firstname ?? '',
                lastname: fields.lastname ?? '',
                nationalCode: fields.nationalCode ?? '',
                birthday: fields.birthday ?? new Date(),
                phone: fields.phone ?? '',
            }}
            validationSchema={toFormikValidationSchema(schema)}
            onSubmit={() => {}}
        >
            {({ errors, submitCount, touched, values, setFieldValue, setValues }) => (
                <Form noValidate className="space-y-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                        <div className={submitCount ? (errors.firstname ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="firstname">نام</label>
                            <Field name="firstname" type="text" id="firstname" placeholder="نام خود را وارد کنید" className="form-input" />
                            {submitCount ? errors.firstname && <div className="mt-1 text-danger">{errors.firstname}</div> : ''}
                        </div>

                        <div className={submitCount ? (errors.lastname ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="lastname">نام خانوادگی</label>
                            <Field name="lastname" type="text" id="lastname" placeholder="نام خانوادگی خودرا وارد کنید" className="form-input" />
                            {submitCount ? errors.lastname && <div className="mt-1 text-danger">{errors.lastname}</div> : ''}
                        </div>

                        <div className={submitCount ? (errors.phone ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="phone">موبایل</label>
                            <Field name="phone" type="text" id="phone" placeholder="شماره موبایل خود را وارد کنید" className="form-input" />
                            {submitCount ? errors.phone && <div className="mt-1 text-danger">{errors.phone}</div> : ''}
                        </div>

                        <div className={submitCount ? (errors.nationalCode ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="nationalCode">کد ملی</label>
                            <Field name="nationalCode" type="text" id="nationalCode" placeholder="کد ملی خود را وارد کنید" className="form-input" />
                            {submitCount ? errors.nationalCode && <div className="mt-1 text-danger">{errors.nationalCode}</div> : ''}
                        </div>

                        <div className={submitCount ? (errors.birthday ? 'has-error' : 'has-success') : ''}>
                            <label htmlFor="birthday">تاریخ تولد</label>
                            <InputDatePicker
                                open={openDatePicker}
                                placement="bottom"
                                value={moment(values.birthday)}
                                onClick={() => {
                                    setOpenDatePicker(true);
                                }}
                                onClear={() => {
                                    setOpenDatePicker(false);
                                }}
                                onChange={async (date, dateString) => {
                                    setValues({ ...values, birthday: date?.toDate() ?? new Date() });
                                    setOpenDatePicker(false);
                                }}
                                className="form-input"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end">
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

export default UserForm;
