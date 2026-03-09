'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface TeamData {
  teamName: string;
  shortName: string;
  yearsWon: string[];
  yearsRunnerUp: string[];
}

interface VizProps {
  barHeight: number;
  yTickFontSize: string;
  chartMarginLeft: number;
  chartMarginRight: number;
  chartMarginUp: number;
  chartMarginDown: number;
  chartTitleFontSize: string;
  width: number;
  height: number;
  chartWidth: number;
}

class Viz {
  year: number;
  autoPlay: boolean;
  isMobile: boolean;
  props!: VizProps;
  svg!: d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
  graphBackground!: d3.Selection<SVGRectElement, unknown, HTMLElement, unknown>;
  titlesMax!: number;
  titlesToPixelsScale!: d3.ScaleLinear<number, number>;
  yearsToHorizontalPixelsScale!: d3.ScaleLinear<number, number>;
  yAxis!: d3.Selection<SVGLineElement | SVGCircleElement, unknown, HTMLElement, unknown>;
  xAxis!: d3.Selection<SVGLineElement, unknown, HTMLElement, unknown>;
  layers!: {
    axis: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
    xAxisTicks: Record<number, d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>;
    yAxisTicks: Record<number, d3.Selection<SVGGElement, unknown, HTMLElement, unknown>>;
    yearSlider: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
    yearSliderKnob: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
    chartTitle: d3.Selection<SVGGElement, unknown, HTMLElement, unknown>;
  };

  constructor() {
    this.year = 1947;
    this.autoPlay = true;
    this.isMobile = this.checkForMobile();
  }

  checkForMobile(): boolean {
    let check = false;
    const a = navigator.userAgent || navigator.vendor || (window as Window & { opera?: string }).opera || '';
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(String(a).substring(0, 4))) {
      check = true;
    }
    return check;
  }

  defineProperties(): void {
    if (this.isMobile) {
      this.props = {
        barHeight: 50,
        yTickFontSize: '24',
        chartMarginLeft: 0,
        chartMarginRight: 0,
        chartMarginUp: 0,
        chartMarginDown: 200,
        chartTitleFontSize: '1.7rem',
        width: window.innerWidth,
        height: window.innerHeight,
        chartWidth: window.innerWidth,
      };
    } else {
      this.props = {
        barHeight: 25,
        yTickFontSize: '24',
        chartMarginLeft: 50,
        chartMarginRight: 200,
        chartMarginUp: 25,
        chartMarginDown: 150,
        chartTitleFontSize: '1.7rem',
        width: window.innerWidth,
        height: window.innerHeight,
        chartWidth: window.innerWidth - 50 - 200,
      };
    }
    this.props.chartWidth = window.innerWidth - this.props.chartMarginLeft - this.props.chartMarginRight;
  }

  filterOnYear(data: TeamData[], year: number): TeamData[] {
    return data.map(t => ({
      shortName: t.shortName,
      yearsWon: t.yearsWon.filter(y => parseInt(y) <= year),
      teamName: t.teamName,
      yearsRunnerUp: t.yearsRunnerUp,
    }));
  }

  filterForTitleTeams(data: TeamData[]): TeamData[] {
    return data.filter(t => t.yearsWon.length > 0);
  }

  sortData(data: TeamData[]): TeamData[] {
    return [...data].sort((a, b) => b.yearsWon.length - a.yearsWon.length);
  }

  setTitlesMax(data: TeamData[]): number {
    return Math.max(...data.map(t => t.yearsWon.length));
  }

  addGroup(options: { class: string; xOffset: number; yOffset: number }): d3.Selection<SVGGElement, unknown, HTMLElement, unknown> {
    return d3.select('svg')
      .append('g')
      .attr('class', options.class)
      .attr('transform', `translate(${options.xOffset}, ${options.yOffset})`);
  }

  addSvg(): void {
    d3.select('#container').selectAll('*').remove();
    this.svg = d3.select('#container')
      .append('svg')
      .attr('width', this.props.width)
      .attr('height', this.props.height) as d3.Selection<SVGSVGElement, unknown, HTMLElement, unknown>;
  }

  addChartBackground(): void {
    this.graphBackground = this.svg
      .append('rect')
      .attr('x', this.props.chartMarginLeft)
      .attr('y', this.props.chartMarginUp)
      .attr('width', this.props.width - this.props.chartMarginRight - this.props.chartMarginLeft)
      .attr('height', this.props.height - this.props.chartMarginDown - this.props.chartMarginUp)
      .style('fill', '#ededed')
      .style('stroke', '#C40628')
      .style('stroke-width', 3) as d3.Selection<SVGRectElement, unknown, HTMLElement, unknown>;
  }

  addLayers(): void {
    this.layers = {
      axis: this.addGroup({
        class: 'axis',
        xOffset: this.props.chartMarginLeft,
        yOffset: this.props.height - this.props.chartMarginDown,
      }),
      xAxisTicks: {},
      yAxisTicks: {},
      yearSlider: this.addGroup({
        class: 'yearSlider',
        xOffset: this.props.chartWidth * 0.1,
        yOffset: this.props.height - this.props.chartMarginDown / 2,
      }),
      yearSliderKnob: null as unknown as d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
      chartTitle: this.addGroup({
        class: 'chartTitle',
        xOffset: this.props.width - this.props.chartMarginRight - 440,
        yOffset: this.props.chartMarginUp + 30,
      }),
    };
  }

  addChartTitle(): void {
    this.layers.chartTitle
      .append('text')
      .text('NBA Championship Teams Over Time')
      .attr('font-size', this.props.chartTitleFontSize);
  }

  addZeroCoordinate(): void {
    this.layers.axis
      .append('circle')
      .attr('cx', 0)
      .attr('cy', 0)
      .attr('r', 2)
      .style('fill', 'black')
      .style('stroke-width', 3)
      .style('stroke', 'black');
  }

  createTitlesToPixelsScale(options: { titlesMax: number }): void {
    this.titlesToPixelsScale = d3.scaleLinear()
      .domain([0, options.titlesMax + 1.8])
      .range([0, this.props.width - this.props.chartMarginRight - this.props.chartMarginLeft]);
  }

  createYearsToHorizontalPixelsScale(): void {
    this.yearsToHorizontalPixelsScale = d3.scaleLinear()
      .domain([1947, 2025])
      .range([10, this.props.chartWidth * 0.9 - 10]);
  }

  addAxisLines(): void {
    const axisLineStrokeWidth = 3;
    this.layers.axis
      .append('line')
      .attr('x1', 0)
      .attr('y1', -3)
      .attr('x2', 0)
      .attr('y2', -1 * (this.props.height - this.props.chartMarginUp - this.props.chartMarginDown))
      .style('stroke', '#C40628')
      .style('stroke-width', axisLineStrokeWidth);

    this.layers.axis
      .append('line')
      .attr('x1', 3)
      .attr('y1', 0)
      .attr('x2', this.props.width - this.props.chartMarginRight - this.props.chartMarginLeft)
      .attr('y2', 0)
      .style('stroke', '#C40628')
      .style('stroke-width', axisLineStrokeWidth);
  }

  addXaxisTicks(options: { titlesMax: number }): void {
    const titlesMax = options.titlesMax;
    for (let i = 1; i <= titlesMax; i++) {
      this.layers.xAxisTicks[i] = this.layers.axis
        .append('g')
        .attr('class', `xAxis${i}`)
        .attr('transform', `translate(${this.titlesToPixelsScale(i)}, 0)`);

      this.layers.xAxisTicks[i]
        .append('line')
        .attr('x1', 0)
        .attr('y1', -5)
        .attr('x2', 0)
        .attr('y2', 5)
        .style('stroke', 'black')
        .style('stroke-width', 2);

      this.layers.xAxisTicks[i]
        .append('text')
        .text(i)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .attr('y', 20);
    }
  }

  addYaxisTicks(data: TeamData[]): void {
    const teams = data.map(t => t.shortName);
    const teamIndexToPixels = d3.scaleLinear()
      .domain([0, teams.length + 1])
      .range([0, (this.props.height - this.props.chartMarginUp - this.props.chartMarginDown) * (teams.length / 20)]);

    for (let i = 0; i < teams.length; i++) {
      this.layers.yAxisTicks[i] = this.layers.axis
        .append('g')
        .attr('class', `yAxis${i}`)
        .attr('transform', `translate(0, -${teamIndexToPixels(i + 1)})`);
    }
  }

  addYearSlider(options: { year: number }): void {
    this.layers.yearSlider
      .append('line')
      .attr('y1', 10)
      .attr('y2', -10)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    this.layers.yearSlider
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.props.chartWidth * 0.9)
      .style('stroke', 'black')
      .style('stroke-width', 2);

    this.layers.yearSlider
      .append('line')
      .attr('x1', this.props.chartWidth * 0.9)
      .attr('x2', this.props.chartWidth * 0.9)
      .attr('y1', 10)
      .attr('y2', -10)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);
  }

  addYearSliderKnob(options: { year: number }): void {
    this.layers.yearSliderKnob = this.layers.yearSlider
      .append('g')
      .attr('class', 'yearSliderKnob')
      .attr('transform', `translate(${this.yearsToHorizontalPixelsScale(options.year)}, 0)`);

    this.layers.yearSliderKnob
      .append('text')
      .attr('y', 25)
      .text(options.year)
      .attr('text-anchor', 'middle')
      .attr('alignment-baseline', 'middle');

    this.layers.yearSliderKnob
      .append('circle')
      .attr('r', 10)
      .style('fill', 'white')
      .style('stroke-width', 3)
      .style('stroke', 'black');
  }

  addBars(data: TeamData[]): void {
    data.forEach((t, idx) => {
      this.layers.yAxisTicks[idx]
        .append('rect')
        .attr('y', -1 * (this.props.barHeight / 2))
        .attr('x', 1)
        .attr('width', this.titlesToPixelsScale(t.yearsWon.length))
        .attr('height', this.props.barHeight)
        .attr('rx', '3')
        .style('fill', '#1D4289');

      this.layers.yAxisTicks[idx]
        .append('text')
        .text(t.shortName)
        .attr('dominant-baseline', 'middle')
        .attr('x', this.titlesToPixelsScale(t.yearsWon.length) + 2)
        .attr('font-size', this.props.yTickFontSize)
        .attr('fill', 'black');
    });
  }

  initialize(allData: TeamData[], year: number): void {
    this.isMobile = this.checkForMobile();
    this.defineProperties();

    let filteredData = this.filterOnYear(allData, year);
    filteredData = this.filterForTitleTeams(filteredData);
    const sortedData = this.sortData(filteredData);

    this.addSvg();
    this.addChartBackground();
    this.addLayers();
    this.addChartTitle();
    this.addZeroCoordinate();
    this.titlesMax = this.setTitlesMax(allData);
    this.createTitlesToPixelsScale({ titlesMax: this.titlesMax });
    this.createYearsToHorizontalPixelsScale();
    this.addAxisLines();
    this.addXaxisTicks({ titlesMax: this.titlesMax });
    this.addYaxisTicks(sortedData);
    this.addYearSlider({ year });
    this.addYearSliderKnob({ year });
    this.addBars(sortedData);
  }
}

export default function NbaViz() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const viz = new Viz();

    fetch('/data/teamData.json')
      .then(res => res.json())
      .then((allData: TeamData[]) => {
        viz.initialize(allData, viz.year);

        if (viz.autoPlay) {
          intervalRef.current = setInterval(() => {
            if (viz.year < 2025) {
              viz.year += 1;
            } else {
              if (intervalRef.current) clearInterval(intervalRef.current);
              return;
            }
            viz.initialize(allData, viz.year);
          }, 500);
        }
      })
      .catch(err => console.error(err));

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return null;
}
