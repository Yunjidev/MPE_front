export const filterLast24h = (data) => {
    return data.filter(enterprise => {
      const createdAt = new Date(enterprise.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - createdAt);
      const diffHours = diffTime / (1000 * 60 * 60);
      return diffHours <= 24;
    });
  };