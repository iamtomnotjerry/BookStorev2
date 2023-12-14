import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { toast } from 'react-toastify';

interface DeleteAccountProps {
  onClose: () => void; // Update the prop type
}

const DeleteAccount: React.FC<DeleteAccountProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null); // Specify the type explicitly

  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if the user entered the confirmation correctly
    if (confirmation.trim().toLowerCase() !== 'delete') {
      setError('Confirmation does not match');
      return;
    }

    try {
      const response = await fetch('/api/auth/delete-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          password, // Send the password to the server
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Account deletion successful
        toast.success(data.message, {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT,
        });

        // Sign the user out
        await signOut();

        onClose(); // Close the modal or navigate to a different page
      } else {
        // Account deletion failed
        setError(data.error || 'An error occurred during account deletion');
      }
    } catch (error) {
      console.error('Error during account deletion:', error);
      setError('An unexpected error occurred');
    }
  };

  return (
    <div>
      <h3 className="text-xl font-semibold mb-2">Delete Account</h3>

      <form onSubmit={handleDeleteAccount}>
        {/* Password input */}
        <label className="block mb-2">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {/* Confirmation input */}
        <label className="block mb-2">
        Type &apos;DELETE&apos; to confirm:
          <input
            type="text"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            required
          />
        </label>

        {/* Display error if there is any */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Submit button */}
        <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded">
          Delete Account
        </button>
      </form>
    </div>
  );
};

export default DeleteAccount;
