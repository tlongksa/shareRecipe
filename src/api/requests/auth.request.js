import axios from 'axios';

const resetNewPasswordRequest = (formData) =>
    axios.post(`/resetPassword?token=${formData.token}&password=${formData.password}`);

export { resetNewPasswordRequest };
