#!/usr/bin/env node

import { loadProfile, loadDefintions } from './files.js';
import { registerThreshold } from './engine.js';
import { getJobs } from './services.js';
import { Threshold, Notification } from './models.js';
import path from 'path';

if (process.argv.length === 2) {
  console.error('Expected folder with profiles and declarative files');
  process.exit(1);
}

const declarativeFiles = process.argv[2];

(async function main() {
  /**
   * TODO: Obvious problem is that currently the whole system supports only PostgreSQL connections / quesries. For POC it is sufficient.
   */
  const connectionDetails = loadProfile(path.join(declarativeFiles, 'profiles.yml'));
  const connectionDetailsTarget: string = connectionDetails.emitbase.target;
  const selectedDatabaseConnectionDetails = connectionDetails.emitbase.databases[connectionDetailsTarget];
  const emailConnectionDetails = connectionDetails.emitbase.notifications[connectionDetailsTarget].email;
  const slackConnectionDetails = connectionDetails.emitbase.notifications[connectionDetailsTarget].slack;
  // TODO: Add TypeGuard
  const thresholds = loadDefintions(path.join(declarativeFiles, 'thresholds')) as Threshold[];
  // TODO: Add TypeGuard
  const notifications = loadDefintions(path.join(declarativeFiles, 'notifications')) as Notification[];
  const jobs = getJobs(thresholds, notifications);

  try {
    registerThreshold(jobs, selectedDatabaseConnectionDetails, emailConnectionDetails, slackConnectionDetails);
    console.log('Emitbase is running! 🚀');
  } catch (error) {
    process.exit(1);
  }
})();
