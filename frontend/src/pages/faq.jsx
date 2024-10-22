import React, { useState } from "react";

export default function FAQ() {
    // This state will keep track of which question is open
    const [openIndex, setOpenIndex] = useState(null);

    // Toggle the index of the currently open question
    const toggleQuestion = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Close if open, open if closed
    };

    const faqs = [
        {
            question: "How does the crypto-backed loan work?",
            answer: "The crypto-backed loan allows you to put up crypto as collateral to access cash, while continuing to HODL. You can borrow up to 75% of the value of your crypto at a fixed interest rate of 15%, interest rates of 13.75% and 12.5% are available if additional initial collateral is provided. Your collateral is held by our qualified custodian and will never be rehypothecated. You can make monthly interest-only payments over the course of your 12-month term, or opt to defer interest for a fee1. Your remaining balance and any deferred interest is due in full at maturity. Once your loan is paid, any excess collateral and/or fiat will be returned to you. The fee to defer interest payments is 1% of the interest owed. For borrowers residing in FL, IN, LA, MO, NM, ND, OR, PA, and RI there is no fee. Deferral fee depends on loan amount for customers residing in the following states: CA - no fee if your loan amount is <= $10,000, 1% fee if >$10,000; ME - no fee if your loan amount is <= $69,500, 1% fee if >$69,500; MN - no fee if your loan amount is <= $50,000, 1% fee if >$50,000; NC - no fee if your loan amount is <= $300,000, 1% fee if >$300,000; SC - no fee if your loan amount is <= $115,000, 1% fee if >$115,000; WV - no fee if your loan amount is <= $45,000; 1% fee if >$45,000",
        },
        {
            question: "How is the required collateral calculated?",
            answer: "We allow an initial loan-to-value ratio (LTV) of up to 75%. You may choose to deposit more collateral initially to lower your initial LTV, borrow at a lower interest rate, and reduce the chance of being margin called over the life of your loan.",
        },
        {
            question: "What happens when I repay my loan?",
            answer: "When you repay your loan, your unliquidated crypto collateral will be returned to you, along with any excess fiat remaining. This crypto will be returned to a wallet address you specify. If you pay off your loan via ACH, we will hold your crypto back 3 weeks to ensure the payment is processed. If you pay your balance using a wire transfer, you will receive your crypto collateral back within 3 days.",
        },
    ];

    return (
        <div className="mx-16 mt-10">
            <h1 className="text-4xl text-black font-bold mb-6">FAQ</h1>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border rounded-2xl border-gray-300 px-5 bg-primary"
                    >
                        <div
                            onClick={() => toggleQuestion(index)}
                            className="flex gap-8  cursor-pointer py-4"
                        >
                            <span className="text-xl font-bold">
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
    );
}
