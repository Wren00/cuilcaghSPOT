interface ConfirmedSighting {

    sightingId: number;
    organismId: number;
    userId: number;
    organismName: string;
    userName: string;
    pictureUrl: string;
    date: string;
    lat: number;
    long: number;

}

export { ConfirmedSighting };