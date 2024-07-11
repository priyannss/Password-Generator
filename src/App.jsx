import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charactersAllowed, setCharacterAllowed] = useState(false);
    const [password, setPassword] = useState("");


    // +++++++++++++++++++++++++++++++ format for useCallBack hook +++++++++++++++++++++++++
    // useCallback(func, []);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if (numberAllowed) {
            str += "0123456789";
        }
        if (charactersAllowed) {
            str += "!@#$%^&*-_+=[]{}~`";
        }

        for (let i = 1; i <= length; i++) {
            let idx = Math.floor(1 + Math.random() * str.length);
            pass += str.charAt(idx);
        }

        setPassword(pass);
    }, [length, numberAllowed, charactersAllowed, setPassword]);



    // ++++++++++++++++++++++++++++ format for useEffect hook ++++++++++++++++++++++++++++
    // useEffect(func, []); or useEffect(callback func, dependencies array);

    useEffect( ()=> {
        passwordGenerator()
    }, [length, numberAllowed, charactersAllowed, passwordGenerator] );



    // +++++++++++++++++++++++++++++ useRef hook +++++++++++++++++++++++++++
    const passwordRef = useRef(null);

    const copyPasswordToClipboard = useCallback(()=> {
        passwordRef.current.select();
        // passwordRef.current.setSelectionRange(0, 30);
        window.navigator.clipboard.writeText(password);
    }, [password]);



    return (
        <>
            <div className='w-full max-w-lg mx-auto shadow-md rounded-lg my-8 p-4 text-white bg-slate-600'>
                <h1 className='text-4xl text-center font-bold text-slate-100'>Password generator</h1>

                <div className='flex gap-1 shadow rounded-lg overflow-hidden mb-4 p-4'>
                    <input readOnly type="text" value={password} placeholder='password' className='select-none rounded-md outline-none w-full py-2 px-3 text-black' ref={passwordRef}/>
                    <button className='outline-none rounded-md bg-blue-500 text-white font-semibold px-3 py-2 shrink-0 cursor-pointer transition ease-in-out delay-150 hover:bg-indigo-500 duration-300' onClick={copyPasswordToClipboard}>copy</button>
                </div>

                <div className='flex justify-center text-sm gap-x-4'>
                    <div className='flex items-center gap-x-1'>
                        <input type="range" min={8} max={50} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
                        <label>Length : {length}</label>
                    </div>

                    <div className='flex items-center gap-x-1'>
                        <input className='cursor-pointer' type="checkbox" defaultChecked={numberAllowed} id='numberInput' onChange={() => { setNumberAllowed((prev) => (!prev)); }} />
                        <label htmlFor="numberLabel">Numbers</label>
                    </div>

                    <div className='flex items-center gap-x-1'>
                        <input className='cursor-pointer' type="checkbox" defaultChecked={charactersAllowed} id='charInput' onChange={() => { setCharacterAllowed((prev) => (!prev)) }} />
                        <label htmlFor="characterLable">Characters</label>
                    </div>
                </div>
            </div>
        </>
    )
}

export default App
