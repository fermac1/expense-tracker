 <template>
  <div class=" w-full">
    <div class="flex justify-between items-center mb-4">
        <div class="text-[#010101]">
            <h1 class="text-[15px] font-bold mb-2">Your Spending insights</h1>
            <p class="text-[12px] font-light mb-6">Here's a breakdown of your year in numbers</p>
        </div>
      <button
        class="flex items-center gap-2 border rounded-lg px-3 py-2 md:text-[10px] text-[8px] hover:bg-gray-50"
      >
        This year
        <Icon name="mdi:chevron-down" class="w-4 h-4" />
      </button>
    </div>

    <div class="h-[400px]">
      <Bar id="spend-chart" :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>
<!--
<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { useFinanceStore } from '~/stores/finance'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const store = useFinanceStore()

const chartData = computed(() => store.chartData)

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      grid: { color: 'rgba(243, 244, 246, 0.5)' },
      ticks: { color: '#6B7280', callback: (value: number) => value + 'K' }
    },
    x: {
      grid: { display: false },
      ticks: { color: '#6B7280' }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#1E1B4B',
      callbacks: {
        label: (ctx: any) => {
          const label = ctx.dataset.label
          const value = ctx.formattedValue
          // return `${label}: ₦${value.replace('K', ',000')}`
          return `${label}: ₦${value.replace('K')}`
        }
      }
    }
  }
}
</script> -->


<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, } from 'chart.js'
import { useExpenseFormStore } from '~/stores/expenseForm'
const store = useExpenseFormStore()

// Create diagonal stripe pattern when hovering over bars
const hatchPatternPlugin = {
  id: 'hatchPattern',
  afterDatasetDraw(chart: any, args: any, options: any) {
    const { ctx } = chart
    const dataset = chart.getDatasetMeta(args.index)
    const hoverIndex = chart._active?.[0]?.index

    dataset.data.forEach((bar: any, index: number) => {
      if (index !== hoverIndex) return
      const { x, y, width, height } = bar.getProps(['x', 'y', 'width', 'height'])

      const patternCanvas = document.createElement('canvas')
      patternCanvas.width = 20
      patternCanvas.height = 20
      const pctx = patternCanvas.getContext('2d')
      if (!pctx) return; 

      pctx.strokeStyle = 'rgba(255,255,255,0.35)'
      pctx.lineWidth = 4
      pctx.beginPath()
      pctx.moveTo(0, 20)
      pctx.lineTo(20, 0)
      pctx.stroke()

      const pattern = ctx.createPattern(patternCanvas, 'repeat')

      ctx.save()
      ctx.fillStyle = pattern
      ctx.fillRect(x - width / 2, y, width, height)
      ctx.restore()
    })
  }
}


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, hatchPatternPlugin)


// Build chart data from dailySpend
// const chartData = computed(() => {
//   const days = store.dailySpend.map(d => d.day)
//   const totals = store.dailySpend.map(d => d.total)

//   return {
//     labels: days,
//     datasets: [
//       {
//         label: 'Daily Spend',
//         data: totals,
//         borderWidth: 1,
//         backgroundColor: 'rgba(37, 99, 235, 0.4)',
//       }
//     ]
//   }
// })

const chartData = computed(() => {
  return {
    labels: store.dailySpend.map((d) => d.day),
    datasets: [
      {
        label: "Daily Spend",
        data: store.dailySpend.map((d) => d.total),

        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) return "#E9ECF3";

          const index = context.dataIndex;
          const activeIndex = chart._active?.[0]?.index;

          // Create gradient
          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );

          const initialGradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );

          // Your gradient colors
          gradient.addColorStop(0, "#FAFFFC"); 
          gradient.addColorStop(1, "#5454D4");

          initialGradient.addColorStop(0, "#FAFFFC"); 
          initialGradient.addColorStop(1, "#E9ECF3");

          // Hovered bar ALWAYS gradient
          if (index === activeIndex) return gradient;

          // Alternating pattern:
          // Odd index → gradient
          // Even index → gray
          return index % 2 === 0 ? initialGradient : gradient;
        },

        // borderRadius: 12,
        barThickness: 45,
        borderSkipped: false
      }
    ]
  };
});




const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: '#615E83',
        callback: (v) => `${(v / 1000) | 0}K`
      },
      grid: {
        color: 'rgba(233, 236, 243, 0.6)'
      }
    },
    x: {
      grid: { display: false },
      ticks: {
        color: '#615E83',
        font: { weight: '600' }
      }
    }
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#13003D',
      padding: 10,
      cornerRadius: 8,
      callbacks: {
        label(ctx) {
          return '₦' + ctx.raw.toLocaleString()
        }
      }
    }
  },
  hover: { mode: 'nearest', intersect: true }
}


// const chartOptions = {
//   responsive: true,
//   maintainAspectRatio: false,
//   scales: {
//     y: {
//       beginAtZero: true,
//       ticks: {
//         color: '#6B7280',
//         callback(value: number) {
//           return '₦' + value.toLocaleString()
//         }
//       },
//       grid: {
//         color: 'rgba(243, 244, 246)'
//       }
//     },
//     x: {
//       ticks: {
//         color: '#6B7280'
//       },
//       grid: {
//         display: false
//       }
//     }
//   },
//   plugins: {
//     legend: { display: false },
//     tooltip: {
//       callbacks: {
//         label(ctx: any) {
//           return '₦' + ctx.raw.toLocaleString()
//         }
//       }
//     }
//   }
// }
</script>
