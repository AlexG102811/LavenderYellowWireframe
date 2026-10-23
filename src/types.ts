export interface UserRecord {
  password?: string;
  createdAt?: string;
}

export interface UsersMap {
  [username: string]: UserRecord;
}

export interface SessionData {
  username: string;
  remember?: boolean;
  signedInAt?: string;
  guest?: boolean;
}
