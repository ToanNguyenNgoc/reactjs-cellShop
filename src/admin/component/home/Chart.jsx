import HighChartsReact from 'highcharts-react-official';
import HighChart from 'highcharts';
import React, {useState, useEffect} from 'react';
import formatDate from '../../../commons/formatDate';
//import formatPrice from '../../../commons/formatPrice'

const generateOptions = (data) => {
      //const categories = test.map(item => moment(item.Date).format('DD/MM/YY'))
      const categories = data.map(item => formatDate(item.createdAt?.seconds))
      return {
            chart: {
                  height: 500,
            },
            title: {
                  text: 'Biểu đồ đơn hàng',
            },
            xAxis: {
                  categories: categories,
                  crosshair: true,
            },
            colors: ['var(--admin-primary-color)'],
            yAxis: {
                  min: 0,
                  title: {
                        text: null,
                  },
                  labels: {
                        align: 'right',
                  },
            },
            tooltip: {
                  headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                  pointFormat:
                        '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y} ca</b></td></tr>',
                  footerFormat: '</table>',
                  shared: true,
                  useHTML: true,
            },
            plotOptions: {
                  column: {
                        pointPadding: 0.2,
                        borderWidth: 0,
                  },
            },
            series: [
                  {
                        name: 'Tổng tiền',
                        data: data.map((item) => item.totalAmount)
                  }
            ],
      };
}


function Chart(props) {
      const {data} = props;
      const [options, setOptions] = useState({})
      // console.log(orderList);

      // let initialValue=0;
      // let sum = orderList.reduce(function(total, item){
      //       return total + item.totalAmount
      // }, initialValue)
      // console.log(sum);
      useEffect(()=>{
            setOptions(generateOptions(data))
      },[data])
      return (
            <div>
                  <HighChartsReact
                        highcharts={HighChart}
                        options={options}
                  />
            </div>
      );
}

export default Chart;