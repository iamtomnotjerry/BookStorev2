'use client'
import PropTypes from 'prop-types';
import { useState } from 'react';
import { ArrowUpIcon, ArrowPathIcon, XCircleIcon } from "@heroicons/react/24/solid";

import UpdateDeleteBook from './UpdateDeleteBook';
import UploadBook from './UploadBook';


interface SettingsOptionProps {
  title: 'Upload Book' | 'Update&Delete Books'; // Specify the possible values for title
  isDestructive?: boolean;
}

const AdminOption: React.FC<SettingsOptionProps> = ({ title, isDestructive = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Map titles to corresponding icons
  const titleIcons = {
    'Upload Book': <ArrowUpIcon className="w-6 h-6 mr-2" />,
    'Update&Delete Books': <ArrowPathIcon className="w-6 h-6 mr-2" />,
    // Add more titles and icons as needed
  };

  return (
    <div className={`mb-4 ${isDestructive ? 'text-red-500' : ''}`}>
      <button className="flex items-center text-xl font-semibold mb-2 text-gray-800 transition duration-300 hover:text-gray-600" onClick={openModal}>
        {titleIcons[title]} {title}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md shadow-md max-w-md relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={closeModal}>
              <XCircleIcon className="w-6 h-6" />
            </button>
            {title === 'Upload Book' ? (
              <UploadBook onClose={closeModal} />
            ) : title === 'Update&Delete Books' ? (
              <UpdateDeleteBook/>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

AdminOption.propTypes = {
  title: PropTypes.oneOf(['Change Password', 'Delete Account']).isRequired as any, // Ignore the TypeScript validation for PropTypes
  isDestructive: PropTypes.bool,
};

export default AdminOption;
