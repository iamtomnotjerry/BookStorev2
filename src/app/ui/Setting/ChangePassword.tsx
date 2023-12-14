import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

interface ChangePasswordProps {
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password do not match');
      return;
    }

    try {
      // Make a POST request to the change-password API endpoint
      const response = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
          userEmail,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Password change successful
        console.log(data.message);
        toast.success(data.message, {
          autoClose: 1000,
          position: toast.POSITION.TOP_RIGHT,
        });
        onClose(e as any); // Close the modal
      } else {
        // Password change failed
        setError(data.error || 'An error occurred during password change');
      }
    } catch (error) {
      console.error('Error during password change:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Change Password</h3>
      <form onSubmit={handleChangePassword}>
        {/* Current Password */}
        <label className="block mb-2">
          Current Password:
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>

        {/* New Password */}
        <label className="block mb-2">
          New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>

        {/* Confirm New Password */}
        <label className="block mb-2">
          Confirm New Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        {/* Display error if there is any */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit button */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
