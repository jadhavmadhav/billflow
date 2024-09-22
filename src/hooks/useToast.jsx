import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function useToast() {
 
 
  const showToast = (message, type = 'success', options = {}) => {
    const toastType = type === 'success' ? 'success' : 'error';

    toast(message, {
      autoClose: 3000,
      hideProgressBar: false,
      type: toastType, // Use 'success' or 'error' as the type
      ...options,
    });
  };

  return {
    showToast,
  };
}

export default useToast;
