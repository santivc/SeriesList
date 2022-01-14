require('colors')
const inquirer = require('inquirer')

const consoleOptions = {

    //! METHODS PRINT CONSOLE
    printMenu: async () => {
        const question = [
            {
                type: 'list',
                name: 'option',
                message: '¿Qué desea hacer?',
                choices: [
                    { value: '1', name: `${'1.'.green} Añadir una serie` },
                    { value: '2', name: `${'2.'.green} Listar series` },
                    { value: '3', name: `${'3.'.green} Listar series vistas` },
                    { value: '4', name: `${'4.'.green} Listar series pendientes` },
                    { value: '5', name: `${'5.'.green} Completar serie/s` },
                    { value: '6', name: `${'6.'.green} Borrar serie` },
                    { value: '7', name: `${'7.'.green} Actualizar serie` },
                    { value: '0', name: `${'0.'.green} Salir` }
                ]
            }
        ];

        console.clear();
        const { option } = await inquirer.prompt(question)

        return option;
    },

    inputValue: async (message) => {
        const question = [
            {
                type: 'input',
                name: 'value',
                message,
                validate: (value) => {
                    if (value.length === 0) return 'Por favor ingrese un valor';

                    return true;
                }
            }
        ];

        console.log();
        const { value } = await inquirer.prompt(question)

        return value
    },

    checkValues: async (message, series = [], remove = false) => {

        const choices = series.map((serie, i) => {
            const index = `${i + 1}`.green;
            return { value: serie.id, name: `${index} ${serie.title}`, checked: remove ? false: serie.viewed }
        });

        const question = [
            {
                type: 'checkbox',
                name: 'values',
                message,
                choices
            }
        ]

        console.log();
        const { values } = await inquirer.prompt(question);

        return values;
    },

    listValues: async (message, list = []) => {
        const choices = list.map((serie, i) => {
            const index = `${i + 1}`.green;
            return { value: serie.id, name: `${index} ${serie.title}` }
        })

        choices.unshift({ value: '0', name: `${'0'.green} Cancelar` })

        const question = [
            {
                type: 'list',
                name: 'value',
                message,
                choices
            }
        ];

        console.log();
        const { value } = await inquirer.prompt(question);

        return value;
    },

    confirm: async (message) => {
        const question = [
            {
                type: 'confirm',
                name: 'isconfirm',
                message
            }
        ];

        console.log();
        const { isconfirm } = await inquirer.prompt(question);

        return isconfirm;
    },

    pauseConsole: async () => {
        const question = [
            {
                type: 'input',
                name: 'value',
                message: `Presione ${'ENTER'.green} para continuar`,
            }
        ];

        console.log();
        await inquirer.prompt(question)
    }
}


module.exports = consoleOptions;