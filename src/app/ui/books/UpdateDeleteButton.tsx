import React from 'react';

const UpdateDeleteButton = () => {
  const handleUpdate = () => {
    // Implement your update logic here
    console.log('Update button clicked');
  };

  const handleDelete = () => {
    // Implement your delete logic here
    console.log('Delete button clicked');
  };

  return (
    <div className="flex ">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded"
        onClick={handleUpdate}
      >
        Update
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default UpdateDeleteButton;
