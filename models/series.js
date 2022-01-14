const Serie = require("./serie");

class Series {
    series = {};

    constructor() {
        this.series = {};
    }

    get listSeries() {
        const listSeries = [];

        Object.keys(this.series).forEach(key => {
            listSeries.push(this.series[key]);
        })

        return listSeries;
    }

    set listSeries(arrSeries = []) {
        arrSeries.forEach(serie => {
            this.series[serie.id] = serie;
        });
    }

    addSerie(title = '') {
        const serie = new Serie(title);
        this.series[serie.id] = serie;
    }

    printSeries(all = false, complete = false) {
        console.log();

        let count = 0;

        this.listSeries.forEach((serie, i) => {

            const index = `${i + 1}`.green;
            const { title, viewed } = serie;
            const state = viewed ? 'Visto'.green : 'Pendiente'.red;
        
            if (all) {
                console.log(`${index}. ${title} :: ${state}`)

            } else {
                if (viewed && complete) {
                    const index = `${++count}`.green;
                    console.log(`${index}. ${title} :: ${state}`)

                } else if (!viewed && !complete) {
                    const index = `${++count}`.green;
                    console.log(`${index}. ${title} :: ${state}`)
                }
            }
        });
    }

    viewedSerie(ids = []) {
        ids.forEach(id => {
            const serie = this.series[id]

            if (!serie.viewed) serie.viewed = true;
        });

        this.listSeries.forEach(serie => {
            if (!ids.includes(serie.id)) {
                this.series[serie.id].viewed = false;
            }
        })
    }

    deleteSeries(ids = []) {
        ids.forEach(id => {
            if (this.series[id]) {
                delete this.series[id];
            }
        });
    }

    updateSerie(id = '', title = '') {
        if (this.series[id]) {
            this.series[id].title = title;
        }
    }
}

module.exports = Series;