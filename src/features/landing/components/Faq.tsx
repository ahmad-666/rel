import { ReactNode } from 'react';
import Icon from '@/components/Icon';

//* Types -----------------------------
type Props = {
    answer: ReactNode;
    question: ReactNode;
    type?: 'string' | 'jsx';
    onChange?: (newShow: boolean) => void;
    show: boolean;
    className?: string;
    answerClassName?: string;
    questionClassName?: string;
};

//* Component -------------------------
const Faq = ({
    answer,
    question,
    onChange,
    type = 'string',
    show = false,
    className = '',
    answerClassName = '',
    questionClassName = ''
}: Props) => {
    const QuestionTag = type === 'string' ? 'h4' : 'div';
    const AnswerTag = type === 'string' ? 'p' : 'div';
    const toggleShow = () => {
        if (onChange) onChange(!show);
    };

    return (
        <div className={`${className}`}>
            <div role='button' className='flex cursor-pointer items-center gap-4' onClick={toggleShow}>
                <QuestionTag className={`text-title-lg text-neutral-dark4 grow capitalize ${questionClassName}`}>
                    {question}
                </QuestionTag>
                <Icon
                    icon={show ? 'fluent:minimize-28-filled' : 'heroicons:plus-solid'}
                    size='md'
                    color='neutral-dark4'
                    className='shrink-0'
                />
            </div>
            <div
                className={`grid transition-[grid-template-rows] duration-300 ${show ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
                <div className='overflow-hidden'>
                    <div className='pt-3'>
                        <AnswerTag className={`text-body-md text-neutral ${answerClassName}`}>{answer}</AnswerTag>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Faq;
