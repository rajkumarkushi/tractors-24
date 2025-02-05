const referralSchema = {
    referral_codes: {
      code: String,
      userId: String,
      createdAt: Timestamp,
      isActive: Boolean
    },
    referrals: {
      referrerId: String,
      refereeId: String,
      code: String,
      status: String, // 'pending', 'successful', 'rejected'
      rewardStatus: String, // 'pending', 'paid'
      createdAt: Timestamp,
      completedAt: Timestamp
    },
    rewards: {
      userId: String,
      type: String, // 'referrer', 'referee'
      amount: Number,
      status: String, // 'pending', 'credited'
      referralId: String,
      createdAt: Timestamp
    }
  };