export const filterEnterprisesLast24h = (data) => {
    return data.filter(enterprise => {
        const createdAt = new Date(enterprise.createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - createdAt);
        const diffHours = diffTime / (1000 * 60 * 60);
        return diffHours <= 24;
    });
};

export const filterUsersLast24h = (data) => {
    return data.filter(user => {
        const createdAt = new Date(user.createdAt);
        const now = new Date();
        const diffTime = Math.abs(now - createdAt);
        const diffHours = diffTime / (1000 * 60 * 60);
        return diffHours <= 24;
    });
};

export const filterSubscriptionsLast24h = (data) => {
    return data.filter(subscription => {
        const createdAt = new Date(subscription.start_date);
        const now = new Date();
        const diffTime = Math.abs(now - createdAt);
        const diffHours = diffTime / (1000 * 60 * 60);
        return diffHours <= 24;
    });
};