export const knapsack = (items, capacity) => {
    const n = items.length;
    const dp = Array(n + 1).fill().map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
        const item = items[i - 1];
        const weight = item.Duration;
        const value = item.Impact;

        for (let w = 0; w <= capacity; w++) {
            if (weight <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }

    let res = dp[n][capacity];
    let w = capacity;
    const selectedTasks = [];
    let totalDuration = 0;

    for (let i = n; i > 0 && res > 0; i--) {
        if (res === dp[i - 1][w]) {
            continue;
        } else {
            const item = items[i - 1];
            selectedTasks.push(item.TaskID);
            totalDuration += item.Duration;
            res -= item.Impact;
            w -= item.Duration;
        }
    }

    return {
        selectedTasks: selectedTasks.reverse(),
        totalDuration,
        totalImpact: dp[n][capacity]
    };
};
