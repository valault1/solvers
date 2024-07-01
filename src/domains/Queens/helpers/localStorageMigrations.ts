const clearOldLevelsMigrationKey = "hasRunClearOldLevelsMigration";

export const runClearOldLevelsMigration = () => {
  const hasRunMigration = localStorage.getItem(clearOldLevelsMigrationKey);
  if (hasRunMigration) {
    return;
  }

  console.log("RUNNING MIGRATION: clearOldLevelsMigration");
  localStorage.clear();
  localStorage.setItem(clearOldLevelsMigrationKey, "true");
};
