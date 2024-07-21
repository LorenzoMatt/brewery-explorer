import { BreweryType } from './brewery-type';

export interface Brewery {
    id: string;
    name: string;
    breweryType: BreweryType;
    address1: string;
    address2: string;
    address3: string;
    city: string;
    stateProvince: string;
    postalCode: string;
    country: string;
    longitude: string;
    latitude: string;
    phone: string;
    websiteUrl: string;
    state: string;
    street: string;
}
