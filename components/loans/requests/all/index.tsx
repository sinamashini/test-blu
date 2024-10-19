'use client';

import { Loan } from '@/store/types';
import { CarFrontIcon, GemIcon, TicketsPlane, MicroscopeIcon, HousePlug, PersonStanding } from 'lucide-react';
import { FC } from 'react';
import { useRouter } from 'next/navigation';

interface OptionProps {
    loans: Loan[];
}

const RequestOptions: FC<OptionProps> = (props) => {
    const { loans } = props;
    const { push, replace } = useRouter();
    const icons = {
        'وام ازدواج': <GemIcon size={40} color="white" />,
        'وام تحصیلی': <MicroscopeIcon size={40} color="white" />,
        'وام تجاری': <TicketsPlane size={40} color="white" />,
        'وام شخصی': <PersonStanding size={40} color="white" />,
        'وام خرید خودرو': <CarFrontIcon size={40} color="white" />,
        'وام تعمیرات منزل': <HousePlug size={40} color="white" />,
    };

    return (
        <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-4">
            {loans.map((item) => (
                <div className="pt-5" key={item.id}>
                    <div className="mb-5 flex w-full flex-wrap justify-center">
                        <div className="relative mt-8 rounded-md border border-gray-500/20 p-6 pt-12 shadow-[rgb(31_45_61_/_10%)_0px_2px_10px_1px] dark:shadow-[0_2px_11px_0_rgb(6_8_24_/_39%)]">
                            <div className="absolute -top-8 mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-md bg-primary text-white-light ltr:left-6 rtl:right-6">
                                {icons[item.name] ?? <></>}
                            </div>
                            <h5 className="mb-3.5 text-lg font-semibold text-dark dark:text-white-light">{item.name}</h5>

                            <button type="button" className="group font-semibold text-primary hover:underline" onClick={() => replace(`/loan/${item.name.replace(/ /g, '-')}`)}>
                                درخواست
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RequestOptions;
