import CSS from "csstype";
import {CellStyles} from "../../grid/GridTypes";
import {AllSnakeColors, AllSnakeDirections, AllSnakePieceTypes, SnakeGameDirections} from "./SnakeGameTypes";
import {CSSProperties} from "@vue/runtime-dom";

export function SnakeGameCellStyles(
    backgroundColor: CSS.Property.BackgroundColor = "#444",
    outlineColor: CSS.Property.OutlineColor = "#333"): CellStyles {
    return {
        ".": {
            backgroundColor,
            outlineStyle: "solid",
            outlineWidth: "1px",
            outlineColor,
        },
        "F": GetImageStyling("url(src/assets/snake/SnakeFruit.png)", backgroundColor, outlineColor),
        ...GenerateAssetsList(backgroundColor, outlineColor),
    }
}

function GenerateAssetsList(
    backgroundColor: CSS.Property.BackgroundColor,
    outlineColor: CSS.Property.OutlineColor): CellStyles {
    let styles: CellStyles = {};

    // Create all combinations of assets
    for (const color of AllSnakeColors) {
        for (const pieceType of AllSnakePieceTypes) {
            for (const direction of AllSnakeDirections) {
                const capColor = color[0].toUpperCase() + color.slice(1).toLowerCase();
                const capPieceType = pieceType[0].toUpperCase() + pieceType.slice(1).toLowerCase();
                styles[`${pieceType[0]}${color[0]}${direction[0]}`] = GetImageStyling(`url(src/assets/snake/Snake${capColor}${capPieceType}.png)`, backgroundColor, outlineColor, direction);
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
