import {CSSProperties} from "vue";

export type GridData = string[][];

export type CellStyles = {
    [key: string]: CSSProperties;
}

export type GridCellLocation = {
    x: number;
    y: number;
}

export type GridCellData = {
    value: string;
} & GridCellLocation
