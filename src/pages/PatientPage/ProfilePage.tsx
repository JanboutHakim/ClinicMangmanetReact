import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../contexts/ContextsAuth';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { uploadProfileImage } from '../../services/userService';

const ProfilePage: React.FC = () => {
    const { user, logout } = useAuth();
    const { accessToken } = useAuth();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [uploadMessage, setUploadMessage] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [imageError, setImageError] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !user) return;

        try {
            const response = await uploadProfileImage(user.id, selectedFile, accessToken!);
            setUploadMessage("Image uploaded successfully!");
            setImageUrl(response); // path returned from backend
        } catch (error) {
            setUploadMessage("Image upload failed.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <div className="p-6 flex flex-col items-center gap-4">
                {user?.imageUrl && !imageError ? (
                    <img
                        src={`http://localhost:8080${user.imageUrl}`}
                        alt="Profile"
                        className="w-16 h-16 rounded-full object-cover border-2 border-white"
                        onError={() => setImageError(true)} // 👈 fallback if image fails
                    />
                ) : (
                    <div className="w-24 h-24 rounded-full bg-white text-blue-700 flex items-center justify-center font-bold">
                        {user?.username.charAt(0).toUpperCase()}
                    </div>
                )}
                <p className="text-lg font-semibold">{user?.username}</p>

                <div className="flex flex-col items-center gap-2">
                    <input type="file" onChange={handleFileChange} />
                    <button
                        onClick={handleUpload}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                        Upload Image
                    </button>
                    {uploadMessage && <p className="text-sm text-gray-500">{uploadMessage}</p>}
                </div>

                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 mt-4"
                >
                    {t('logout')}
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;
