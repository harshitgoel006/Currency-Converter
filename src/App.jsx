import { useState } from 'react' 
import { InputBox } from './components'
import useCurrencyInfo from './hooks/useCurrencyInfo'

function App() {
  const [amount, setAmount] = useState(0)
  const [from, setFrom] = useState("usd")
  const [to, setTo] = useState("inr")
  const [convertedAmount, setConvertedAmount] = useState(0)

  const currencyInfo = useCurrencyInfo(from)
  const options = Object.keys(currencyInfo)

  const swap = () => {
    setFrom(to)
    setTo(from)
    setAmount(convertedAmount)
    setConvertedAmount(amount)
  }
  
  const convert = () => {
    if (currencyInfo[to]) {
        setConvertedAmount(Number((amount * currencyInfo[to]).toFixed(3)))
    }
  }

  

  return (
    <div
        className="w-full h-screen flex justify-center items-center bg-[#020617]"
        style={{
            backgroundImage: `radial-gradient(circle at 50% -20%, #1e40af 0%, transparent 50%), radial-gradient(circle at 50% 120%, #0891b2 0%, transparent 50%)`,
        }}
    >
        <div className="w-full px-4">
            {/* Main Glass Card */}
            <div className="w-full max-w-lg mx-auto border border-white/10 rounded-[3rem] p-10 backdrop-blur-2xl bg-slate-950/40 shadow-2xl relative">
                
                <h1 className="text-white text-4xl font-black text-center mb-10 tracking-tighter italic">
                    Currency -  <span className="text-cyan-400 not-italic">Converter</span>
                </h1>

                <form onSubmit={(e) => { e.preventDefault(); convert(); }} className="relative">
                    
                    {/* Input Boxes */}
                    <div className="space-y-2">
                        <InputBox
                            label="From"
                            amount={amount}
                            currencyOptions={options}
                            onCurrencyChange={(curr) => setFrom(curr)}
                            selectCurrency={from}
                            onAmountChange={(amt) => setAmount(amt)}
                        />

                        {/* HIGH-END SWAP BUTTON */}
                        <div className="relative h-4 w-full flex justify-center items-center z-30">
                            <button
                                type="button"
                                onClick={swap}
                                className="group absolute flex items-center justify-center w-14 h-14 rounded-full bg-cyan-500 text-slate-950 border-[6px] border-[#0f172a] shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all duration-500 hover:rotate-180 hover:scale-110 active:scale-90"
                            >
                                <svg 
                                  xmlns="http://www.w3.org/2000/svg" 
                                  fill="none" viewBox="0 0 24 24" 
                                  strokeWidth={3} 
                                  stroke="currentColor" 
                                  className="w-6 h-6 transition-transform group-hover:scale-110"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                                </svg>
                            </button>
                        </div>

                        <InputBox
                            label="To"
                            amount={convertedAmount}
                            currencyOptions={options}
                            onCurrencyChange={(curr) => setTo(curr)}
                            selectCurrency={to}
                            amountDisable
                        />
                    </div>
                    
                    {/* Final Action Button */}
                    <button 
                        type="submit" 
                        className="w-full mt-8 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 py-5 rounded-2xl font-black text-lg uppercase tracking-[0.2em] shadow-[0_10px_30px_rgba(6,182,212,0.3)] hover:shadow-cyan-500/50 hover:-translate-y-1 transition-all active:translate-y-0"
                    >
                        Execute Exchange
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
}

export default App;