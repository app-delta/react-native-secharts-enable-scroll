import {toString} from './utils';

const renderChart = (props) => {
  const height = `${props.height || 400}px`;
  const width = props.width ? `${props.width}px` : 'auto';
  const backgroundColor = props.backgroundColor;
  return `
      document.createElement('meta'); meta.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta);
      document.getElementById('main').style.height = "${height}";
      document.getElementById('main').style.width = "${width}";
      document.getElementById('main').style.backgroundColor = "${backgroundColor}";
      var myChart = echarts.init(document.getElementById('main'));
      myChart.setOption(${toString(props.option)});
      myChart.on('click', function(params) {
        var seen = [];
        var paramsString = JSON.stringify(params, function(key, val) {
          if (val != null && typeof val == "object") {
            if (seen.indexOf(val) >= 0) {
              return;
            }
            seen.push(val);
          }
          return val;
        });
        window.ReactNativeWebView.postMessage(JSON.stringify({"types":"ON_PRESS","payload": paramsString}));
      });
    `
}


export default renderChart;
