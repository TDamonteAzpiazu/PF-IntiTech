import {Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

let pie_data ={
          labels:['opcion 1', 'opcion 2'],
          datasets:[{
                    label:"Consumo total / Inyeccion total",
                    data:[10, 20, 30, 40],
                    backgroundColor:["#e18104", "#f7a90e", "#ffed00"],
                    hoverBackgroundColor: ["#ffa500", "#ffd700"], 
                    borderColor:["grey"],
                    borderWidth:1
          }]
}
let pie_options={
          responsive:true,
          maintainAspectRatio:false,
          animation: {
                    animateScale: true,
                    animateRotate: true, 
                  },
                  plugins: {
                    legend: {
                              position: 'top',
                              labels: {
                                font: {
                                  size: 14,
                                },
                                color: 'black',
                              },
                    tooltip: {
                      enabled: true,
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      titleFont: {
                        size: 16,
                      },
                      bodyFont: {
                        size: 14,
                      },
                      callbacks: {
                        label: function(tooltipItem) {
                          return `Valor: ${tooltipItem.raw}`;
                        }
                      } } } }
}
export function Circular_Chart (){
          return <Doughnut data={pie_data} options={pie_options} />
}