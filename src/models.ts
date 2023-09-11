export interface PostgreSQLConnectionDetails {
  host: string;
  database: string;
  port: number;
  user: string;
  password: string;
}

export interface EmailConnectionDetails {
  host: string;
  port: number;
  user: string;
  password: string;
}

export interface EmitbaseProfiles {
  emitbase: {
    databases: {
      [key: string]: PostgreSQLConnectionDetails;
    };
    notifications: {
      [key: string]: {
        email: EmailConnectionDetails;
      };
    };
    target: string;
  };
}

export interface Threshold {
  [id: string]: {
    expression: string;
    cron: string;
  };
}

export interface Notification {
  [id: string]: {
    email: {
      reciever: string;
      message: string;
    };
  };
}

export interface Job {
  id: string;
  expression: string;
  cron: string;
  notifications: {
    email: {
      reciever: string;
      message: string;
    };
  };
}
