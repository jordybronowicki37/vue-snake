import CSS from "csstype";
import {CellStyles} from "../../../grid/GridTypes";
import {AllSnakeDirections, AllSnakePieceTypes, SnakeGameDirections} from "./SnakeTypes";
import {CSSProperties} from "@vue/runtime-dom";
import {GenerateTypeIndex} from "./SnakeHelpers.ts";

export function SnakeGameCellStyles(
    selectedSnakeStyles: string[],
    backgroundColor: CSS.Property.BackgroundColor = "#444",
    outlineColor: CSS.Property.OutlineColor = "#333"): CellStyles {
    return {
        ".": {
            backgroundColor,
            outlineStyle: "solid",
            outlineWidth: "1px",
            outlineColor,
        },
        "F": GetImageStyling("url(src/assets/objects/Fruit.png)", backgroundColor, outlineColor),
        "C": GetImageStyling("url(src/assets/objects/Crate.png)", backgroundColor, outlineColor),
        ...GenerateAssetsList(selectedSnakeStyles, backgroundColor, outlineColor),
    }
}

function GenerateAssetsList(
    snakeTypes: string[],
    backgroundColor: CSS.Property.BackgroundColor,
    outlineColor: CSS.Property.OutlineColor): CellStyles {
    let styles: CellStyles = {};

    // Create all combinations of assets
    for (let i = 0; i < snakeTypes.length; i++) {
        const color = snakeTypes[i]
        for (const pieceType of AllSnakePieceTypes) {
            for (const direction of AllSnakeDirections) {
                const capPieceType = pieceType[0].toUpperCase() + pieceType.slice(1).toLowerCase();
                styles[GenerateTypeIndex({player:i, direction}, pieceType)] = GetImageStyling(`url(src/assets/snakes/${color}/Snake${color}${capPieceType}.png)`, backgroundColor, outlineColor, direction);
            }
        }
    }

    return styles;
}

function GetImageStyling(
    path: string,
    backgroundColor: CSS.Property.BackgroundColor,
    outlineColor: CSS.Property.OutlineColor,
    direction: SnakeGameDirections = "UP"): CSSProperties {
    let rotation = "rotate(0deg)";
    switch (direction) {
        case "RIGHT":
            rotation = "rotate(90deg)";
            break;
        case "DOWN":
            rotation = "rotate(180deg)";
            break;
        case "LEFT":
            rotation = "rotate(270deg)";
            break;
    }

    return {
        backgroundColor,
        backgroundImage: path,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        transform: rotation,
        outlineStyle: "solid",
        outlineWidth: "1px",
        outlineColor,
    };
}
