export type GridData = string[][];

export type CellStyles = {
    [key: string]: string;
}

export type GridCellLocation = {
    x: number;
    y: number;
}

export type GridCellData = {
    value: string;
} & GridCellLocation
