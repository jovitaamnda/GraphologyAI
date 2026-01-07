const User = require('../models/User');
const TestResult = require('../models/TestResult');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments({ role: 'user' });
        const totalTests = await TestResult.countDocuments();

        // Enneagram Distribution (Aggregation)
        const distribution = await TestResult.aggregate([
            {
                $group: {
                    _id: "$results.personalityType",
                    count: { $sum: 1 }
                }
            }
        ]);

        res.json({
            totalUsers,
            totalTests,
            distribution
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ role: 'user' }).select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdminStats,
    getAllUsers
};
