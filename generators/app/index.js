"use strict";
import Generator from "yeoman-generator";
import chalk from "chalk";
import * as path from "path";
import { mkdirp } from "mkdirp";
import printMessage from "print-message";

export default class extends Generator {
    prompting() {
        // B-CREATIVE banner
        this.log("                                                                          ");
        this.log("██████         ██████ ██████  ███████  █████  ████████ ██ ██    ██ ███████");
        this.log("██   ██       ██      ██   ██ ██      ██   ██    ██    ██ ██    ██ ██     ");
        this.log("██████  █████ ██      ██████  █████   ███████    ██    ██ ██    ██ █████  ");
        this.log("██   ██       ██      ██   ██ ██      ██   ██    ██    ██  ██  ██  ██     ");
        this.log("██████         ██████ ██   ██ ███████ ██   ██    ██    ██   ████   ███████");
        this.log("                                                                          ");
        this.log(
            `Please enter the project's name. Supplying the name of the current folder will scaffold the application ${chalk.red(
                "in the current folder",
            )}. Supplying a new name will create the folder for you.`,
        );

        const prompts = [
            {
                type: "input",
                name: "name",
                message: "What is the name of the project?",
                validate: (input) => (input.length > 0 ? true : "Project name contains no characters."),
            },
            {
                type: "confirm",
                name: "react",
                message: "Include React support?",
                default: false,
            },
            {
                type: "input",
                name: "vhost",
                message: "What is your virtual host name? (full domain name e.g. www.bornfight.loc)",
                validate: (input) => (input.length > 0 ? true : "Virtual host name contains no characters."),
            },
        ];

        return this.prompt(prompts).then((props) => {
            // To access props later use this.props.someAnswer;
            this.props = props;
        });
    }

    createFolderIfDoesNotExist() {
        if (path.basename(this.destinationPath()) !== this.props.name) {
            this.log(`Creating a folder named ${this.props.name}`);
            mkdirp(this.props.name).then((made) => console.log(`Made directories, starting with ${made}`));
            this.destinationRoot(this.destinationPath(this.props.name));
        }
    }

    writing() {
        const context = {
            name: this.props.name,
            vhost: this.props.vhost,
            react: this.props.react,
        };

        const templateOptions = {};

        const copyOptions = {
            globOptions: {
                dot: true,
            },
        };

        this.fs.copyTpl(this.templatePath("common/**"), this.destinationRoot(), context, templateOptions, copyOptions);

        this.fs.copyTpl(this.templatePath("dotfiles/**"), this.destinationRoot(), context, templateOptions, copyOptions);

        this.fs.copyTpl(this.templatePath("static/**"), this.destinationPath("static"), context, templateOptions, copyOptions);

        if (context.react) {
            this.fs.copyTpl(
                this.templatePath("example_app/**"),
                this.destinationPath("static/js/example_app"),
                context,
                templateOptions,
                copyOptions,
            );
        }
    }

    end() {
        printMessage(
            [
                `Project ${this.props.name} created.`,
                `cd ${this.props.name}`,
                "nvm use",
                "npm install",
                "",
                "For development run",
                "npm run dev",
                "",
                "For production run",
                "npm run build",
            ],
            {
                border: true,
                color: "red",
                borderColor: "red",
                marginTop: 1,
                marginBottom: 1,
            },
        );
    }
}
