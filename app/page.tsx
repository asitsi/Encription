"use client"
import { SetStateAction, useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState('');
  const [hashedText, setHashedText] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleInputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setInputText(e.target.value);
  };

  const handleHash = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(inputText);

    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashedString = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    setHashedText(hashedString);
  };

  const handleCopyClick = () => {
    // Create a temporary textarea to execute the copy command
    const textarea = document.createElement('textarea');
    textarea.value = hashedText;

    // Append the textarea to the document
    document.body.appendChild(textarea);

    // Select and copy the text
    textarea.select();
    document.execCommand('copy');

    // Remove the textarea from the document
    document.body.removeChild(textarea);

    // Update state to indicate that the text has been copied
    setIsCopied(true);

    // Reset the "copied" state after a short duration
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <main style={{height: '100svh', textAlign:'center' }} className="">
      <h1 className="text-transparent text-2xl md:text-3xl lg:text-2xl bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 my-20">SHA256 encription</h1>
      <div className="container-flud mx-auto my-5">
        <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="search" value={inputText} onChange={handleInputChange} id="search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Text:" required />
          <button type="submit" onClick={handleHash} className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Hash Text</button>
        </div>
        <div className="" style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '2rem' }}>
          <h1 className="text-transparent text-3xl md:text-2xl lg:text-3xl bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Hashed Text (SHA-256):</h1>
          <h1 onClick={handleCopyClick} className="display-4 text-3xl"> {hashedText}</h1>
          <button onClick={handleCopyClick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{isCopied ? 'Copied!' : 'Copy to Clipboard'}</button>
        </div>
      </div>
    </main>
  )
}