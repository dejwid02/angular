import { Station } from '../../model/station';
export interface StationsGroup {
    id: number;
    title: string;
    stations: Station[];
}
