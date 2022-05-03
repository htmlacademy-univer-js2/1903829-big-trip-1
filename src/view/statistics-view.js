import SmartView from './Smart-view.js';
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MONEY, COUNTTYPE } from '../utils/informations.js';
import { sortStatistics } from '../utils/common.js';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

const changeMoneyChart = (moneyCtx) => {
  const typeForMoney = Object.entries(MONEY).sort(sortStatistics);
  const countKeysMoney = typeForMoney.map((key) => key[0].toUpperCase());
  const countDataMoney = typeForMoney.map((data) => data[1]);

  return new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: countKeysMoney,
      datasets: [{
        data: countDataMoney,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: { size: 13, },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const changeTypeChart = (typeCtx) => {
  const typeEntries =  Object.entries(COUNTTYPE).sort(sortStatistics);
  const countKeysType = typeEntries.map((key) => key[0].toUpperCase());
  const countDataType = typeEntries.map((data) => data[1]);

  return new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: countKeysType,
      datasets: [{
        data: countDataType,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: { size: 13, },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const changeTimeChart = () => {};

const createStatisticsTemplate = () =>
  `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="money" width="900"></canvas>
    </div>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="type" width="900"></canvas>
    </div>
    <div class="statistics__item">
      <canvas class="statistics__chart" id="time" width="900"></canvas>
    </div>
  </section>`;

export default class StatisticsView extends SmartView {
  #moneyChart = null;
  #typeChart = null;
  #timeChart = null;

  constructor() {
    super();
    this.#setCharts();
  }

  get template() {
    return createStatisticsTemplate();
  }

  restoreHandlers = () => {
    this.#setCharts();
  };

  removeElement = () => {
    super.removeElement();

    if (this.#moneyChart) {
      this.#moneyChart.destroy();
      this.#moneyChart = null;
    }

    if (this.#typeChart) {
      this.#typeChart.destroy();
      this.#typeChart = null;
    }

    if (this.#timeChart) {
      this.#timeChart.destroy();
      this.#timeChart = null;
    }
  };

  #setCharts = () => {
    const moneyCtx = document.querySelector('#money');
    const typeCtx = document.querySelector('#type');
    const timeCtx = document.querySelector('#time');

    this.#moneyChart = changeMoneyChart(moneyCtx);
    this.#typeChart = changeTypeChart(typeCtx);
    this.#timeChart = changeTimeChart(timeCtx);
  };
}
