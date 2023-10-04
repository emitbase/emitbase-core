import { loadProfile, loadDefintions } from './files.js';
import { registerThreshold } from './engine.js';
import { getJobs } from './services.js';
import { Threshold, Notification } from './models.js';
import path from 'path';

(async function main() {
  /**
   * TODO: Obvious problem is that currently the whole system supports only PostgreSQL connections / quesries. For POC it is sufficient.
   */
  const connectionDetails = loadProfile(path.join('demo', 'profiles.yml'));
  const connectionDetailsTarget: string = connectionDetails.emitbase.target;
  const selectedDatabaseConnectionDetails = connectionDetails.emitbase.databases[connectionDetailsTarget];
  const selectedNotificationsConnectionDetails = connectionDetails.emitbase.notifications[connectionDetailsTarget].email;
  // TODO: Add TypeGuard
  const thresholds = loadDefintions(path.join('demo', 'thresholds')) as Threshold[];
  // TODO: Add TypeGuard
  const notifications = loadDefintions(path.join('demo', 'notifications')) as Notification[];
  const jobs = getJobs(thresholds, notifications);

  registerThreshold(jobs, selectedDatabaseConnectionDetails, selectedNotificationsConnectionDetails);

  console.log('Emitbase is running! 🚀');
})();
