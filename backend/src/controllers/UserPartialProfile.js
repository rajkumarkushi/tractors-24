// const admin = require('firebase-admin');
// const { db } = require('./firebaseConfig'); // Your existing Firebase admin config

// class UserProfileService {
//     static async getUserProfile(userId) {
//         try {
//             // Fetch user document from Firestore
//             const userDoc = await db.collection('users').doc(userId).get();
            
//             if (!userDoc.exists) {
//                 throw new Error('User not found');
//             }

//             // Extract user data
//             const userData = userDoc.data();

//             return {
//                 name: userData.name || 'User',
//                 email: userData.email || '',
//                 role : userData.role || 'Role',
//                 joiningDate: userData.createdAt || 'N/A',
//                 totalRemainingDays: userData.totalRemainingDays || 0,
//                 membershipEnd: userData.membershipEnd || 'N/A'
//             };
//         } catch (error) {
//             console.error('Error fetching user profile:', error);
//             throw error;
//         }
//     }

//     // You can add more methods here for user-related operations
// }

// module.exports = UserProfileService;

const admin = require('firebase-admin');
const { db } = require('./firebaseConfig'); // Your existing Firebase admin config

class UserProfileService {
    static async getUserProfile(userId) {
        try {
            // Fetch user document from Firestore
            const userDoc = await db.collection('users').doc(userId).get();
            
            if (!userDoc.exists) {
                throw new Error('User not found');
            }

            // Extract user data
            const userData = userDoc.data();

            return {
                name: userData.name || 'User',
                email: userData.email || '',
                role : userData.role || 'Role',
                joiningDate: userData.createdAt || 'N/A',
                // totalRemainingDays: userData.totalRemainingDays || 0,
                // membershipEnd: userData.membershipEnd || 'N/A'
            };
        } catch (error) {
            console.error('Error fetching user profile:', error);
            throw error;
        }
    }

    // You can add more methods here for user-related operations
}

module.exports = UserProfileService;