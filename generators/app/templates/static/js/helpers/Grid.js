/**
 * Grid
 * show grid overlay when developing
 */
export default class Grid {
    constructor() {
        /**
         * Grid DOM selector
         * @type {{grid: string}}
         */
        this.DOM = {
            grid: "grid",
        };

        /**
         * Grid options
         * @type {{
         * gutterFixed: boolean,
         * initialDisplay: string,
         * gridFixed: boolean,
         * gutterWidth: number,
         * gridColor: string,
         * columnCount: number,
         * gridWidth: number,
         * columnBgColor: string
         * }}
         */
        this.gridOptions = {
            initialDisplay: "none", // "flex" or "none" — initial display for the grid — string
            columnCount: 24, // number of grid columns — integer
            gridWidth: 1440, // base grid used in design; value in px — integer
            gridFixed: true, // should grid width be restricted to gridWidth, or it should go full width a nd behave fluidly across all screen sizes
            gutterWidth: 0, // grid gutters value in px — integer
            gutterFixed: false, // should grid gutter be a fixed value (px) or fluid — integer
            gridColor: "rgb(255, 0, 255, 0.15)", // grid guides color — string of an rgba or hex value
            columnBgColor: "rgb(255, 0, 255, 0.025)", // grid columns background color — string of an rgba or hex value
        };

        const consoleLogStyle = [
            "background-color: #a6a6a6",
            "color: black",
            "display: block",
            "line-height: 24px",
            "text-align: center",
            "border: 1px solid #ffffff",
            "font-weight: 700",
        ].join(";");

        console.info("toggle grid: %c Control + G ", consoleLogStyle);

        this.grid = null;

        this.columnWidth =
            (this.gridOptions.gridWidth - (this.gridOptions.columnCount - 1) * this.gridOptions.gutterWidth) / this.gridOptions.columnCount;

        this.columnWidthPercentage = `${(this.columnWidth / this.gridOptions.gridWidth) * 100}%`;

        this.gutterWidthPercentage = `${(this.gridOptions.gutterWidth / this.gridOptions.gridWidth) * 100}%`;
    }

    /**
     * Init
     */
    init() {
        this.initGrid();
        this.keyboardShortcut();
    }

    /**
     * Init grid
     */
    initGrid() {
        // create grid overlay element
        this.grid = document.createElement("div");
        this.grid.id = this.DOM.grid;

        // style grid element
        this.grid.style.cssText = `
            pointer-events: none;
            display: ${this.gridOptions.initialDisplay};
            flex-direction: row;
            width: 100%;
            height: 100%;
            position: fixed;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 999;
        `;

        if (this.gridOptions.gridFixed === true) {
            this.grid.style.maxWidth = `${this.gridOptions.gridWidth}px`;
        }

        if (!this.gridOptions.gutterWidth > 0) {
            this.grid.style.borderLeft = "none";
        }

        // add grid container to page
        document.body.appendChild(this.grid);

        // add columns to grid
        for (let i = 0; i < this.gridOptions.columnCount; i++) {
            const column = document.createElement("i");
            this.grid.appendChild(column);

            column.style.cssText = `
                height: auto;
                flex-grow: 1;
                background-color: ${this.gridOptions.columnBgColor};
                border-left: 1px solid ${this.gridOptions.gridColor};
            `;

            if (this.gridOptions.gutterWidth > 0) {
                column.style.borderRight = `1px solid ${this.gridOptions.gridColor}`;
            } else {
                this.grid.style.borderRight = `1px solid ${this.gridOptions.gridColor}`;
            }

            if (this.gridOptions.gutterFixed === true) {
                column.style.marginRight = `${this.gridOptions.gutterWidth}px`;
            } else {
                column.style.marginRight = this.gutterWidthPercentage;
                column.style.width = this.columnWidthPercentage;
            }
        }

        this.grid.lastChild.style.marginRight = 0;
    }

    /**
     * Keyboard shortcut
     */
    keyboardShortcut() {
        let keysPressed = {};

        document.addEventListener("keydown", (event) => {
            keysPressed[event.key] = true;

            if (keysPressed["Control"] && event.key === "g") {
                if (this.grid.style.display === "none") {
                    this.grid.style.display = "flex";
                } else {
                    this.grid.style.display = "none";
                }
            }
        });

        document.addEventListener("keyup", (event) => {
            delete keysPressed[event.key];
        });
    }
}
