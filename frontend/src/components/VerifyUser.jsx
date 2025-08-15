import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from './Loading';

const VerifyUser = () => {

    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false);
    const [code, setCode] = useState('');

    useEffect(()=>{
        if(!localStorage.getItem("verifyEmail")){
            navigate("/signup");
            return;
        }
    },[])

    const handleVerification = async (e) => {
        e.preventDefault();
        setShowLoading(true);
        try {
            const res = await axios.post('https://bus-reservation-system-in-aspnet-production.up.railway.app/signup/verify-code', {
                email: localStorage.getItem("verifyEmail"),
                code
            });
            if (res.data.success) {
                localStorage.removeItem("verifyEmail")
                navigate('/login');
                alert(res.data.message);
            }
            else {
                alert(res.data.message);
            }
        } catch (err) {
            alert(err.response?.data?.message || "Something went wrong. Please try again.");
        } finally{
            setShowLoading(false);
        }
    };

    return (
        <div className="min-h-[100svh] flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: "url('/Images/21.jpg')" }}>
            <div className="max-w-md bg-black/80 rounded-xl shadow-md p-6 m-2 text-white">
                <h2 className="text-2xl font-bold text-center text-white mb-6">Enter Verification Code</h2>
                <form onSubmit={handleVerification} className="space-y-4">
                    <input
                        type="text"
                        placeholder='Code'
                        maxLength={6}
                        required
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-white bg-white/10"
                    />
                    <button
                        type="submit"
                        className="w-full bg-lime-600 hover:bg-lime-700 text-white py-2 rounded-md "
                    >
                        Verify
                    </button>
                </form>
            </div>
            {showLoading &&
                <Loading/>
            }
        </div>
    );
};

export default VerifyUser;
