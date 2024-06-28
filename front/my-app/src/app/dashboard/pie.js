import {Doughnut} from 'react-chartjs-2'
import {Chart as ChartJS, ArcElement, Tooltip, Legend} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

let pie_data ={
          labels:['opcion 1', 'opcion 2', 'opcion 3'],
          datasets:[{
                    label:"Consumo total / Inyeccion total",
                    data:[10, 20, 30, 40],
                    backgroundColor:["#e18104", "#f7a90e", "#ffed00"],
                    borderColor:["grey"],
                    borderWidth:1
          }]
}
let pie_options={
          responsive:true,
          maintainAspectRatio:false
}
export function Circular_Chart (){
          return <Doughnut data={pie_data} options={pie_options} />
}