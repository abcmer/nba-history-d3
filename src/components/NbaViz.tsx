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
  isPlaying: boolean;
  isMobile: boolean;
  allData: TeamData[];
  _wasPlayingBeforeDrag: boolean;
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
  onPlayPauseToggle?: () => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;

  constructor() {
    this.year = 1947;
    this.isPlaying = true;
    this.isMobile = this.checkForMobile();
    this.allData = [];
    this._wasPlayingBeforeDrag = false;
  }

  checkForMobile(): boolean {
    return window.innerWidth < 768;
  }

  defineProperties(): void {
    if (this.isMobile) {
      this.props = {
        barHeight: 20,
        yTickFontSize: '13',
        chartMarginLeft: 5,
        chartMarginRight: 5,
        chartMarginUp: 10,
        chartMarginDown: 110,
        chartTitleFontSize: '0.85rem',
        width: window.innerWidth,
        height: window.innerHeight,
        chartWidth: window.innerWidth - 10,
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
        // On mobile, push slider right enough to clear the play button (≈60px)
        xOffset: this.isMobile
          ? Math.max(60, this.props.chartWidth * 0.1)
          : this.props.chartWidth * 0.1,
        yOffset: this.props.height - this.props.chartMarginDown / 2,
      }),
      yearSliderKnob: null as unknown as d3.Selection<SVGGElement, unknown, HTMLElement, unknown>,
      chartTitle: this.addGroup({
        class: 'chartTitle',
        xOffset: this.isMobile
          ? this.props.width / 2
          : this.props.width - this.props.chartMarginRight - 440,
        yOffset: this.props.chartMarginUp + 30,
      }),
    };
  }

  addChartTitle(): void {
    this.layers.chartTitle
      .append('text')
      .text(this.isMobile ? 'NBA Championships' : 'NBA Championship Teams Over Time')
      .attr('font-size', this.props.chartTitleFontSize)
      .attr('text-anchor', this.isMobile ? 'middle' : 'start');
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

  get sliderTrackWidth(): number {
    if (this.isMobile) {
      const sliderOriginX = Math.max(60, this.props.chartWidth * 0.1);
      return this.props.chartWidth - sliderOriginX - this.props.chartMarginRight;
    }
    return this.props.chartWidth * 0.9;
  }

  createYearsToHorizontalPixelsScale(): void {
    this.yearsToHorizontalPixelsScale = d3.scaleLinear()
      .domain([1947, 2025])
      .range([10, this.sliderTrackWidth - 10]);
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
    // Skip labels that would overlap: require at least 22px between them
    const pixelsPerTick = this.titlesToPixelsScale(1);
    const labelStep = Math.max(1, Math.ceil(22 / pixelsPerTick));
    const labelFontSize = this.isMobile ? '11px' : '16px';

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

      if (i % labelStep === 0) {
        this.layers.xAxisTicks[i]
          .append('text')
          .text(i)
          .attr('text-anchor', 'middle')
          .attr('alignment-baseline', 'middle')
          .attr('font-size', labelFontSize)
          .attr('y', 20);
      }
    }
  }

  addYaxisTicks(data: TeamData[]): void {
    const teams = data.map(t => t.shortName);
    const chartHeight = this.props.height - this.props.chartMarginUp - this.props.chartMarginDown;
    const teamIndexToPixels = d3.scaleLinear()
      .domain([0, teams.length + 1])
      .range([0, chartHeight * Math.min(1, teams.length / 20)]);

    for (let i = 0; i < teams.length; i++) {
      this.layers.yAxisTicks[i] = this.layers.axis
        .append('g')
        .attr('class', `yAxis${i}`)
        .attr('transform', `translate(0, -${teamIndexToPixels(i + 1)})`);
    }
  }

  addYearSlider(): void {
    this.layers.yearSlider
      .append('line')
      .attr('y1', 10)
      .attr('y2', -10)
      .attr('stroke', 'black')
      .attr('stroke-width', 2);

    this.layers.yearSlider
      .append('line')
      .attr('x1', 0)
      .attr('x2', this.sliderTrackWidth)
      .style('stroke', 'black')
      .style('stroke-width', 2);

    this.layers.yearSlider
      .append('line')
      .attr('x1', this.sliderTrackWidth)
      .attr('x2', this.sliderTrackWidth)
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
      .attr('alignment-baseline', 'middle')
      .attr('font-size', this.isMobile ? '13px' : '16px');

    this.layers.yearSliderKnob
      .append('circle')
      .attr('r', this.isMobile ? 16 : 10)
      .style('fill', 'white')
      .style('stroke-width', 3)
      .style('stroke', 'black');
  }

  getTeamColor(shortName: string): string {
    const colors: Record<string, string> = {
      Lakers:    '#552583', // purple
      Celtics:   '#007A33', // green
      Warriors:  '#FFC72C', // gold
      Bulls:     '#CE1141', // red
      Spurs:     '#000000', // black
      '76ers':   '#006BB6', // blue
      Pistons:   '#C8102E', // red
      Heat:      '#98002E', // heat red
      Knicks:    '#F58426', // orange
      Rockets:   '#CE1141', // red
      Cavaliers: '#6F263D', // wine
      Hawks:     '#E03A3E', // red
      Wizards:   '#002B5C', // navy
      Thunder:   '#007AC1', // blue
      Blazers:   '#E03A3E', // red
      Bucks:     '#00471B', // green
      Mavericks: '#00538C', // blue
      Raptors:   '#CE1141', // red
      Nuggets:   '#0E2240', // navy
      Bullets:   '#000000', // black (historic team)
      Royals:    '#5A2D81', // purple (became Sacramento Kings)
    };
    return colors[shortName] ?? '#000000';
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
        .style('fill', this.getTeamColor(t.shortName));

      this.layers.yAxisTicks[idx]
        .append('text')
        .text(t.shortName)
        .attr('dominant-baseline', 'middle')
        .attr('x', this.titlesToPixelsScale(t.yearsWon.length) + 2)
        .attr('font-size', this.props.yTickFontSize)
        .attr('fill', 'black');
    });
  }

  addPlayPauseButton(): void {
    const self = this;
    // Position inside the red box, bottom-left corner
    const btnX = this.props.chartMarginLeft + 30;
    const btnY = this.props.height - this.props.chartMarginDown / 2;

    const btnGroup = this.svg
      .append('g')
      .attr('class', 'playPauseBtn')
      .attr('transform', `translate(${btnX}, ${btnY})`)
      .style('cursor', 'pointer')
      .on('click', () => {
        if (self.onPlayPauseToggle) self.onPlayPauseToggle();
      });

    const r = this.isMobile ? 20 : 18;
    btnGroup.append('rect')
      .attr('x', -r)
      .attr('y', -r)
      .attr('width', r * 2)
      .attr('height', r * 2)
      .attr('rx', 4)
      .style('fill', 'white')
      .style('stroke', '#C40628')
      .style('stroke-width', 2.5);

    const s = r / 18; // scale factor for icons
    if (this.isPlaying) {
      // Pause icon: two vertical bars
      btnGroup.append('rect')
        .attr('x', -9 * s).attr('y', -10 * s)
        .attr('width', 7 * s).attr('height', 20 * s)
        .style('fill', '#C40628');
      btnGroup.append('rect')
        .attr('x', 2 * s).attr('y', -10 * s)
        .attr('width', 7 * s).attr('height', 20 * s)
        .style('fill', '#C40628');
    } else {
      // Play icon: triangle
      btnGroup.append('polygon')
        .attr('points', `${-7 * s},${-12 * s} ${15 * s},0 ${-7 * s},${12 * s}`)
        .style('fill', '#C40628');
    }
  }

  addSliderDrag(): void {
    const self = this;
    const minX = this.yearsToHorizontalPixelsScale(1947);
    const maxX = this.yearsToHorizontalPixelsScale(2025);

    const drag = d3.drag<SVGGElement, unknown>()
      .subject(() => ({ x: self.yearsToHorizontalPixelsScale(self.year), y: 0 }))
      .on('start', () => {
        if (self.onDragStart) self.onDragStart();
        d3.select('.yearSliderKnob').style('cursor', 'grabbing');
      })
      .on('drag', (event) => {
        const clampedX = Math.max(minX, Math.min(maxX, event.x));
        const year = Math.round(self.yearsToHorizontalPixelsScale.invert(clampedX));
        if (year !== self.year) {
          self.year = year;
          self.initialize(self.allData, year);
        }
      })
      .on('end', () => {
        if (self.onDragEnd) self.onDragEnd();
      });

    this.layers.yearSliderKnob
      .style('cursor', 'grab')
      .call(drag);
  }

  initialize(allData: TeamData[], year: number): void {
    this.allData = allData;
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
    this.addYearSlider();
    this.addYearSliderKnob({ year });
    this.addBars(sortedData);
    this.addPlayPauseButton();
    this.addSliderDrag();
  }
}

export default function NbaViz() {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const viz = new Viz();

    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const startInterval = () => {
      stopInterval();
      intervalRef.current = setInterval(() => {
        if (viz.year < 2025) {
          viz.year += 1;
        } else {
          stopInterval();
          viz.isPlaying = false;
          viz.initialize(viz.allData, viz.year);
          return;
        }
        viz.initialize(viz.allData, viz.year);
      }, 500);
    };

    viz.onPlayPauseToggle = () => {
      viz.isPlaying = !viz.isPlaying;
      if (viz.isPlaying) {
        if (viz.year >= 2025) viz.year = 1947;
        startInterval();
      } else {
        stopInterval();
        viz.initialize(viz.allData, viz.year);
      }
    };

    viz.onDragStart = () => {
      viz._wasPlayingBeforeDrag = viz.isPlaying;
      viz.isPlaying = false;
      stopInterval();
    };

    viz.onDragEnd = () => {
      if (viz._wasPlayingBeforeDrag && viz.year < 2025) {
        viz.isPlaying = true;
        startInterval();
      } else {
        viz.initialize(viz.allData, viz.year);
      }
    };

    fetch('/data/teamData.json')
      .then(res => res.json())
      .then((allData: TeamData[]) => {
        viz.initialize(allData, viz.year);
        startInterval();
      })
      .catch(err => console.error(err));

    return () => stopInterval();
  }, []);

  return null;
}
