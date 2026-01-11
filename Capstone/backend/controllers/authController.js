const authService = require('../services/authService');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const userData = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            profile: {
                age: req.body.age,
                gender: req.body.gender,
                education: req.body.education,
                dominant_hand: req.body.dominant_hand
            }
        };

        const result = await authService.register(userData);
        res.status(201).json(result);
    } catch (error) {
        const status = error.message === 'User already exists' || error.message === 'Please add all fields' ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('🔹 LOGIN ATTEMPT 🔹');
        console.log('Email:', email);
        console.log('Password Length:', password ? password.length : 'N/A');
        // Do NOT log the actual password in production, but for local debugging it helps to verify if it matches 'admin123456'
        // console.log('Password:', password); 

        const result = await authService.login(email, password);
        console.log('✅ Login Success for:', email);
        res.json(result);
    } catch (error) {
        console.error('❌ Login Failed:', error.message);
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = async (req, res) => {
    try {
        const updateData = { ...req.body };

        // Handle profile fields (because FormData sends them as flat keys)
        if (req.body.age || req.body.gender || req.body.education || req.body.dominant_hand) {
            updateData.profile = {
                ...(req.body.age && { age: req.body.age }),
                ...(req.body.gender && { gender: req.body.gender }),
                ...(req.body.education && { education: req.body.education }),
                ...(req.body.dominant_hand && { dominant_hand: req.body.dominant_hand }),
            };
        }

        // If file uploaded, add to updateData
        if (req.file) {
            updateData.profilePicture = `/uploads/profiles/${req.file.filename}`;
        }

        const result = await authService.updateProfile(req.user._id, updateData);
        res.json(result);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

// @desc    Change user password
// @route   POST /api/auth/change-password
// @access  Private
const changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Please provide current and new password' });
        }

        const result = await authService.changePassword(req.user._id, currentPassword, newPassword);
        res.json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
    updateUserProfile,
    changePassword
};
