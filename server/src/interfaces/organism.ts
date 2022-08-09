interface Organism {

    organismId: number;
    taxonName: string;
    latinName: string;
    taxonGroupId: number;
    pictureURL: string;
    description: string;
    isProtected: boolean;

}

interface CreateOrganism {

    taxonName: string;
    latinName: string;
    taxonGroupId: number;
    pictureURL: string;
    description: string;
    isProtected: boolean;
}
export { Organism, CreateOrganism };