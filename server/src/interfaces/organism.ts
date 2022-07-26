interface Organism {

    organismId: number;
    taxonName: string;
    latinName: string;
    taxonGroupId: number;
    pictureURL: string;
    description: string;

}

interface CreateOrganism {

    taxonName: string,
    latinName: string,
    taxonGroupId: number,
    pictureURL: string,
    description: string
}
export { Organism, CreateOrganism };