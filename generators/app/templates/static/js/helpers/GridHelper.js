/**
 * Grid helper
 * Show grid overlay when developing
 * Not included in production bundle JS file
 */
export default class GridHelper {
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
         * @type {{gutterFixed: boolean, initialDisplay: string, gridFixed: boolean, gutterWidth: number, gridColor: string, columnCount: number, gridWidth: number, columnBgColor: string}}
         */
        this.gridOptions = {
            initialDisplay: "none", // "flex" or "none"
            columnCount: 24,
            gridWidth: 1440, // px
            gridFixed: true,
            gutterWidth: 0, // px
            gutterFixed: false,
            gridColor: "rgb(255, 0, 255, 0.15)",
            columnBgColor: "rgb(255, 0, 255, 0.025)",
        };

        const consoleLogStyle = [
            "background-color: #a6a6a6",
            "color: black",
            "display: block",
            "line-height: 24px",
            "text-align: center",
            "border: 1px solid #ffffff",
            "font-weight: bold",
        ].join(";");

        console.info("toggle grid: %c Alt/Option + G ", consoleLogStyle);

        this.grid = null;

        this.columnWidth =
            (this.gridOptions.gridWidth - (this.gridOptions.columnCount - 1) * this.gridOptions.gutterWidth) / this.gridOptions.columnCount;

        this.columnWidthPercentage = `${(this.columnWidth / this.gridOptions.gridWidth) * 100}%`;

        this.gutterWidthPercentage = `${(this.gridOptions.gutterWidth / this.gridOptions.gridWidth) * 100}%`;
    }

    init() {
        console.log("GridHelper init()");
        this.initGrid();
        this.keyboardShortcut();
    }

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
            position: absolute;
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
        for (var i = 0; i < this.gridOptions.columnCount; i++) {
            var column = document.createElement("i");
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

    keyboardShortcut() {
        document.addEventListener("keyup", (ev) => {
            if (ev.keyCode === 71 && ev.altKey) {
                if (this.grid.style.display === "none") {
                    this.grid.style.display = "flex";
                } else {
                    this.grid.style.display = "none";
                }
            }
        });
    }
}
