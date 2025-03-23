import { useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

const ResetPasswordPage = () => {
	const [formData, setFormData] = useState({
		email: "",
		code: "",
		newPassword: "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await axios.post("/auth/reset-password", formData);
			toast.success("Password reset successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to reset password");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<h2 className='text-center text-3xl font-extrabold text-emerald-400'>Reset Password</h2>
			<form onSubmit={handleSubmit} className='mt-8 space-y-6'>
				<div>
					<label htmlFor='email' className='block text-sm font-medium text-gray-300'>
						Email address
					</label>
					<input
						id='email'
						type='email'
						required
						value={formData.email}
						onChange={(e) => setFormData({ ...formData, email: e.target.value })}
						className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white'
					/>
				</div>
				<div>
					<label htmlFor='code' className='block text-sm font-medium text-gray-300'>
						Reset Code
					</label>
					<input
						id='code'
						type='text'
						required
						value={formData.code}
						onChange={(e) => setFormData({ ...formData, code: e.target.value })}
						className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white'
					/>
				</div>
				<div>
					<label htmlFor='newPassword' className='block text-sm font-medium text-gray-300'>
						New Password
					</label>
					<input
						id='newPassword'
						type='password'
						required
						value={formData.newPassword}
						onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
						className='mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white'
					/>
				</div>
				<button
					type='submit'
					className='w-full py-2 px-4 bg-emerald-600 text-white rounded-md'
					disabled={loading}
				>
					{loading ? "Resetting..." : "Reset Password"}
				</button>
			</form>
		</div>
	);
};

export default ResetPasswordPage;
