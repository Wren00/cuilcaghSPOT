interface UnverifiedSighting {
  sightingId: number;
  organismId: number;
  organismName: string;
  userName: string;
  userId: number;
  pictureUrl: string;
  date: Date;
  lat: number;
  long: number;
  userVotes: number;
}

export { UnverifiedSighting };
