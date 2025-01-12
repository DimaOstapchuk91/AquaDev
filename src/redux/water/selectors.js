export const selectTotalWater = (state) => state.water.waterInfo.totalWater;
export const selectWaterPortions = (state) =>
  state.water.waterInfo.waterPortions;
export const selectLoading = (state) => state.water.waterInfo.loading;
export const selectError = (state) => state.water.waterInfo.error;
