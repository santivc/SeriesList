const consoleOptions = require('./helpers/consoleOptions');
const fileSystem = require('./helpers/fileSystem');
const Series = require('./models/series')
require('colors')


const main = async () => {

    let option = '';
    const series = new Series();
    const seriesDB = fileSystem.readFile();

    if (seriesDB) {
        series.listSeries = seriesDB
    }

    do {

        option = await consoleOptions.printMenu();

        switch (option) {
            case '1':
                const title = await consoleOptions.inputValue('Título:')
                series.addSerie(title);
                break;
            case '2':
                series.printSeries(true);
                break;
            case '3':
                series.printSeries(false, true);
                break;
            case '4':
                series.printSeries(false, false);
                break;
            case '5':
                const ids = await consoleOptions.checkValues('Seleccione:', series.listSeries);
                series.viewedSerie(ids)
                break;
            case '6':
                const idsDelete = await consoleOptions.checkValues('Seleccione:', series.listSeries, true);

                if (idsDelete.length > 0) {
                    const isConfirm = await consoleOptions.confirm('¿Estas seguro?');

                    if (isConfirm) {
                        series.deleteSeries(idsDelete);
                        console.log('Serie/s eleminado correctamente');
                    }
                }

                break;
            case '7':
                const id = await consoleOptions.listValues('Seleccione:', series.listSeries);
                if (id !== '0') {
                    const newtitle = await consoleOptions.inputValue('Título:');
                    const confirm = await consoleOptions.confirm('¿Estas seguro?');

                    if (confirm) {
                        series.updateSerie(id, newtitle);
                        console.log('Se ha actualizado correctamente');
                    }
                }
                break;
        }

        fileSystem.writeFile(series.listSeries);

        if (option !== '0') await consoleOptions.pauseConsole();

    } while (option !== '0')

}


main();