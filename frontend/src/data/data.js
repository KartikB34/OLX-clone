export const stackedChartData = [
  [
    { x: 'One', y: 2827 },
    { x: 'Vodka', y: 2439 },
    { x: 'Martini', y: 2000 },
    { x: 'Shaken', y: 1704 },
    { x: 'Not', y: 1600 },
    { x: 'Stirred', y: 1509 },
    // { x: 'Please', y: 1402 },
  ],
];

export const stackedCustomSeries = [

  { dataSource: stackedChartData[0],
    xName: 'x',
    yName: 'y',
    name: 'Total sold',
    type: 'StackingColumn',
    background: 'blue',

  },
];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: 'Rotate45',
  valueType: 'Category',
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 500,
  maximum: 3000,
  interval: 400,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: '{value}',
};


export const LinePrimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'y',
    intervalType: 'Months',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 },
    background: 'white',
  };
  
  export const LinePrimaryYAxis = {
    labelFormat: '{value}',
    rangePadding: 'None',
    minimum: 0,
    maximum: 100,
    interval: 20,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 },
  };

  export const lineChartData = [
    [
      { x: new Date(2022, 3, 30), y: 3.6 },
      { x: new Date(2022, 4, 30), y: 6.3 },
      { x: new Date(2022, 5, 30), y: 9.4 },
      { x: new Date(2022, 6, 30), y: 7.2 },
      { x: new Date(2022, 7, 30), y: 10.5 },
      { x: new Date(2022, 8, 30), y: 11.6 },
      { x: new Date(2022, 9, 30), y: 10.1 },
    ],
  ];

  export const lineCustomSeries = [
  
    { dataSource: lineChartData[0],
      xName: 'x',
      yName: 'y',
      name: 'Sales in L',
      width: '2',
      marker: { visible: true, width: 10, height: 10 },
      type: 'Line' },
  
  ];