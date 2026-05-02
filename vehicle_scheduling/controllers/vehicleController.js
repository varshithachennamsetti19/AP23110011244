import { fetchDepots, fetchVehicles } from '../services/apiService.js';
import { knapsack } from '../utils/knapsack.js';

export const scheduleVehicles = async (req, res, next) => {
    try {
        const depots = await fetchDepots();
        const vehicles = await fetchVehicles();

        const resultDepots = depots.map(depot => {
            const knapsackResult = knapsack(vehicles, depot.MechanicHours);
            return {
                depotId: depot.ID || depot.id || depot.depotId,
                mechanicHours: depot.MechanicHours,
                selectedTasks: knapsackResult.selectedTasks,
                totalDuration: knapsackResult.totalDuration,
                totalImpact: knapsackResult.totalImpact
            };
        });

        res.status(200).json({ depots: resultDepots });
    } catch (err) {
        if (err.status && err.data) {
            return res.status(err.status).json(err.data);
        }
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
};
