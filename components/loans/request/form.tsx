'use client';
import { FC, useState } from 'react';
import UserForm from './userForm';
import BankForm from './bankForm';
import LoanForm from './loanForm';

interface LoanRequestWizardProps {
    loan: string;
}
const LoanRequestWizard: FC<LoanRequestWizardProps> = ({ loan }) => {
    const [activeTab, setActiveTab] = useState<any>(1);
    const [fields, setFields] = useState<Record<string, any>>({});
    const [isSuccess, setIsSuccess] = useState(false);

    return (
        <div className="inline-block w-full">
            <ul className="mb-5 grid grid-cols-3 text-center">
                <li>
                    <div
                        className={`${activeTab === 1 ? '!bg-primary text-white' : ''}
                block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}
                    >
                        مشخصات فردی
                    </div>
                </li>

                <li>
                    <div className={`${activeTab === 2 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}>اطلاعات بانکی</div>
                </li>

                <li>
                    <div className={`${activeTab === 3 ? '!bg-primary text-white' : ''} block rounded-full bg-[#f3f2ee] p-2.5 dark:bg-[#1b2e4b]`}>انتخاب نوع وام</div>
                </li>
            </ul>

            <div>
                <div className="mb-5">{activeTab === 1 && <UserForm fields={fields} setFields={setFields} goToNextPage={() => setActiveTab(2)} />}</div>
                <div className="mb-5">{activeTab === 2 && <BankForm fields={fields} setFields={setFields} setActiveTab={setActiveTab} />}</div>
                <div className="mb-5">{activeTab === 3 && <LoanForm fields={fields} setFields={setFields} setActiveTab={setActiveTab} selectedLoan={loan} setIsSuccess={setIsSuccess} />}</div>
                {isSuccess && (
                    <div className="relative mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700" role="alert">
                        <strong className="font-bold">موفقیت!</strong>
                        <span className="block sm:inline"> فرم با موفقیت ارسال شد.</span>
                    </div>
                )}
            </div>
            <div className="flex justify-between"></div>
        </div>
    );
};

export default LoanRequestWizard;
