import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';

import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const getEthereumContract = () => {
    const { ethereum } = window;
    if (!ethereum) {
        console.error("No ethereum object found in getEthereumContract");
        throw new Error("No ethereum object");
    }
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);

    console.log({
        provider,
        signer,
        transactionContract
    });

    return transactionContract;
}

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [formData, setFormData] = useState({ addressTo: '', amount: '', keyword: '', message: '' });

    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnected = async () => {
        try {
            const { ethereum } = window;
            console.log("checkIfWalletIsConnected: ethereum object", ethereum);
            if (!ethereum) {
                alert("Please install MetaMask");
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_accounts' });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }

            console.log("Accounts:", accounts);
        } catch (error) {
            console.error("Error in checkIfWalletIsConnected:", error);
            throw new Error("No ethereum object");
        }
    }

    const connectWallet = async () => {
        try {
            const { ethereum } = window;
            console.log("connectWallet: ethereum object", ethereum);
            if (!ethereum) {
                alert("Please install MetaMask");
                return;
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            setCurrentAccount(accounts[0]);
            console.log("Connected accounts:", accounts);
        } catch (error) {
            console.error("Error in connectWallet:", error);
            throw new Error("No ethereum object");
        }
    }

    const sendTransaction = async () => {
        try {
            const { ethereum } = window;
            console.log("sendTransaction: ethereum object", ethereum);
            if (!ethereum) {
                alert("Please install MetaMask");
                return;
            }

            const { addressTo, amount, keyword, message } = formData;
            getEthereumContract();


        } catch (error) {
            console.error("Error in sendTransaction:", error);
            throw new Error("No ethereum object");
        }
    }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount, formData, setFormData, handleChange, sendTransaction }}>
            {children}
        </TransactionContext.Provider>
    )
}
