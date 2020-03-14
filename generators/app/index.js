'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');
const mkdirp = require('mkdirp');
const figlet = require('figlet');
const printMessage = require('print-message');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(`👋 Welcome to the ace ${chalk.red('generator-b-creative')} generator!`);
    this.log(
      `Please enter the project's name. Supplying the name of the current folder will scaffold the application ${chalk.red(
        'in the current folder'
      )}. Supplying a new name will create the folder for you.`
    );

    // Prompting the user
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the project?',
        validate: input => {
          return input.length > 0 ? true : 'Project name contains no characters.';
        }
      },
      {
        type: 'input',
        name: 'vhost',
        message:
          'What is your virtual host name? (full domain name e.g. www.bornfight.loc)',
        validate: input => {
          return input.length > 0 ? true : 'Virtual host name contains no characters.';
        }
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  createFolderIfDoesNotExist() {
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(`Creating a folder named ${this.props.name}`);
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    }
  }

  writing() {
    const config = {
      name: this.props.name,
      vhostName: this.props.vhost,
      globOptions: {
        dot: true
      }
    };

    this.fs.copyTpl(this.templatePath('common/**'), this.destinationRoot(), config);

    this.fs.copy(this.templatePath('dotfiles/**'), this.destinationRoot(), config);

    this.fs.copyTpl(
      this.templatePath('static/**'),
      this.destinationPath('static'),
      config
    );
  }

  createDirectories() {
    mkdirp.sync(path.join(this.destinationPath(), 'docs'));
    mkdirp.sync(path.join(this.destinationPath(), 'static/dist'));
    mkdirp.sync(path.join(this.destinationPath(), 'static/fonts'));
    mkdirp.sync(path.join(this.destinationPath(), 'static/icons'));
    mkdirp.sync(path.join(this.destinationPath(), 'static/images'));
    mkdirp.sync(path.join(this.destinationPath(), 'static/ui'));
    mkdirp.sync(path.join(this.destinationPath(), 'static/ui/favicon'));
    mkdirp.sync(path.join(this.destinationPath(), 'static/video'));
  }

  install() {
    this.installDependencies({
      npm: true,
      bower: false
    });
  }

  end() {
    // Have Yeoman greet the user.
    this.log(figlet.textSync('Bornfight'));
    this.log(figlet.textSync('Creative'));
    printMessage(
      [
        'Project files created',
        '',
        'Run "npm run dev" to start working',
        '',
        'Run "npm run build" to build files'
      ],
      {
        border: true,
        color: 'green',
        borderColor: 'green',
        marginTop: 1,
        marginBottom: 1,
        paddingTop: 1,
        paddingBottom: 1
      }
    );
  }
};
