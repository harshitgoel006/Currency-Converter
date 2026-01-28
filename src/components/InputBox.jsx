import React, { useId } from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectCurrency = "usd",
    amountDisable = false,
    currencyDisable = false,
    className = "",
}) {
   const amountInputId = useId()

    return (
        <div className={`bg-slate-900/60 p-5 rounded-2xl flex flex-col gap-3 border border-white/5 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all duration-300 ${className}`}>
            <div className="flex justify-between text-slate-400 text-xs uppercase tracking-widest font-bold">
                <label htmlFor={amountInputId}>{label}</label>
                <span>Currency Type</span>
            </div>
            <div className="flex gap-4 items-center">
                <input
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1 text-2xl font-bold text-white placeholder:text-slate-700"
                    type="number"
                    placeholder="0"
                    disabled={amountDisable}
                    // FIX: This prevents '0100' by showing empty string when value is 0
                    value={amount === 0 ? "" : amount} 
                    onChange={(e) => {
                        const val = e.target.value === "" ? 0 : Number(e.target.value);
                        onAmountChange && onAmountChange(val);
                    }}
                />
                <select
                    className="rounded-xl px-3 py-2 bg-slate-800 text-cyan-400 cursor-pointer outline-none border border-white/5 hover:bg-slate-700 transition-all font-bold text-sm shadow-inner"
                    value={selectCurrency}
                    onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
                    disabled={currencyDisable}
                >
                    {currencyOptions.map((currency) => (
                        <option key={currency} value={currency} className="bg-slate-900 text-white">
                            {currency.toUpperCase()}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}

export default InputBox;