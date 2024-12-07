import React, { useState } from "react";

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    const faqs = [
        {
            question: "What is MicroVault?",
            answer: "MicroVault is a decentralized platform designed to provide microloans and financial services tailored for the crypto ecosystem.",
        },
        {
            question: "How do I interact with MicroVault?",
            answer: "Users can interact with MicroVault by connecting their cryptocurrency wallets and browsing available loan options.",
        },
        {
            question: "How does the crypto-backed loan work?",
            answer: "The crypto-backed loan allows you to put up crypto as collateral to access cash, while continuing to HODL. You can borrow up to 75% of the value of your crypto at a fixed interest rate of 15%, interest rates of 13.75% and 12.5% are available if additional initial collateral is provided. Your collateral is held by our qualified custodian and will never be rehypothecated...",
        },
        {
            question: "How is the required collateral calculated?",
            answer: "We allow an initial loan-to-value ratio (LTV) of up to 75%. You may choose to deposit more collateral initially to lower your initial LTV, borrow at a lower interest rate, and reduce the chance of being margin called over the life of your loan.",
        },
        {
            question: "What happens when I repay my loan?",
            answer: "When you repay your loan, your unliquidated crypto collateral will be returned to you, along with any excess fiat remaining. This crypto will be returned to a wallet address you specify...",
        },
        {
            question: "Do I need a wallet to use MicroVault?",
            answer: "Yes, a cryptocurrency wallet is required to interact with MicroVault.",
        },
        {
            question: "How do I borrow?",
            answer: "To borrow, select your desired loan type on the platform and follow the prompts.",
        },
        {
            question: "Why is my crypto score so low?",
            answer: "Your score may be low due to transaction history or overall asset management.",
        },
    ];

    return (
        <section className="bg-transparent mt-12 mx-4 md:mx-12 lg:mx-20 relative overflow-visible">
            {/* Background Blur effect */}
            <div className="absolute bottom-[50px] right-[50px] w-[500px] h-[500px] bg-[#48bf84]/10 rounded-full blur-[150px] z-0" />
            <div className="absolute top-[50px] left-[50px] w-[500px] h-[500px] bg-[#48bf84]/10 rounded-full blur-[150px] z-0" />

            <div className="container mx-auto px-6 pt-0 relative z-10">
                <div className="max-w-[1248px] w-full mx-auto">
                    <h1 className="text-4xl text-black font-bold mb-6">FAQ</h1>
                    {/* FAQ Questions */}
                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="border rounded-2xl border-gray-300 px-5 bg-white mb-4"
                            >
                                <div
                                    onClick={() => toggleQuestion(index)}
                                    className="flex gap-8 cursor-pointer py-4"
                                >
                                    <span className="text-xl font-bold text-[#48BF84]">
                                        {openIndex === index ? "-" : "+"}
                                    </span>
                                    <h2 className="text-lg font-semibold">
                                        {faq.question}
                                    </h2>
                                </div>
                                {openIndex === index && (
                                    <p className="text-gray-600 pb-4">{faq.answer}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Add padding at the bottom */}
            <div style={{ paddingBottom: '50px' }} />
        </section>
    );
}