<template>
  <div class="box">
    <div class="box__setting-box">
      <p class="box__setting-box--title">
        各个情绪的弹幕数量
      </p>
    </div>
    <div id="main1" class="box__figure-box">
    </div>
  </div>
</template>


<script setup>

import { onMounted, ref, watch } from "vue";
import { getDMByBv } from '@/api/dm';
import * as echarts from 'echarts'


const props = defineProps(['bv'])

watch(() => props.bv, async () => {
  console.log("change");
  input.value = props.bv
  await getDMS()
})


let input = ref('BV1K741157wC')
let myChart = null;
let data = ref([])
let vname = ref("")

onMounted(async () => {
  input.value = props.bv
  await getDMS();
})


//改之后的代码
// async function analyzeDanmu(danmuText, date, att) {
//   try {
//     const response = await fetch('http://127.0.0.1:5000/analyze_danmu', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ danmu: danmuText }),
//     });
//
//     const result = await response.json();
//
//     const member = [];
//     member.push(att);
//     member.push(date);
//     member.push(danmuText);
//     member.push(result.emotion_result);
//
//     return member;
//   } catch (error) {
//     console.error('Error:', error);
//     throw error;
//   }
// }
//
// async function controlRes(res) {
//   vname.value = res.data[0].name;
//   console.log(vname.value);
//
//   for (const item of res.data) {
//     if (item.att !== undefined) {
//       const member = [];
//       member.push(Number.parseInt(item.att[0]));
//       const date = new Date(item.att[4] * 1000);
//       const Y = date.getFullYear() + '-';
//       const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
//       const D = date.getDate() + ' ';
//       const h = date.getHours() + ':';
//       const m = date.getMinutes() + ':';
//       const s = date.getSeconds();
//       const dat = Y + M + D + h + m + s;
//
//       try {
//         const analyzedResult = await analyzeDanmu(item.value, dat, Number.parseInt(item.att[0]));
//         data.value.push(analyzedResult);
//       } catch (error) {
//         // 处理错误
//         console.error('Error:', error);
//       }
//     }
//   }
//   console.log(data.value);
// }

async function getDMS() {
  if (myChart !== null) {
    console.log(data.value);
    data.value = [];
  }
  let res = await getDMByBv({
    bv: input.value
  });

  console.log(input.value);
  console.log(res.data);
  controlRes(res);
  // await controlRes(res);


  // var xhr = new XMLHttpRequest();
  // xhr.open('GET', 'src/views/newPage/output.json', false); // 设置为 false 表示同步请求
  // xhr.send();
  //
  // if (xhr.status === 200) {
  //   var rawData = JSON.parse(xhr.responseText);
  //   data.value = rawData;
  try {
    data.value = await analyzeDanmu(data.value);
  } catch (error) {
    // 处理错误
    console.error('Error:', error);
  }
  // 根据第四个值划分成四个数组
  var positiveData = [];
  var neutralData = [];
  var negativeData = [];
  var otherData = [];

  data.value.forEach(function (item) {
    var emotion = item[3];
    switch (emotion) {
      case 'positive':
        positiveData.push(item);
        break;
      case 'neutral':
        neutralData.push(item);
        break;
      case 'negative':
        negativeData.push(item);
        break;
      default:
        otherData.push(item);
    }
  });

  // 将划分后的数组存储在 data 对象中
  data.positive = positiveData;
  data.neutral = neutralData;
  data.negative = negativeData;
  data.other = otherData;

  // 在这里处理加载的 JSON 数据
  console.log(data.positive.length);
  console.log('Positive Data:', data.positive);
  console.log('Neutral Data:', data.neutral);
  console.log('Negative Data:', data.negative);
  console.log('Other Data:', data.other);
  // } else {
  //   console.error('Error loading JSON file:', xhr.status);
  // }
  // 假设你的数据结构中每个情绪类别都有一个中文翻译字段 translation 和一个原词字段 original
  // 你需要根据你的实际数据结构进行修改
  const dataWithTranslation = [
    { name: 'Positive', translation: '积极', original: 'Positive' },
    { name: 'Neutral', translation: '中性', original: 'Neutral' },
    { name: 'Negative', translation: '消极', original: 'Negative' },
    { name: 'Other', translation: '其他', original: 'Other' },
  ];

  // 提取中文翻译和原词作为 x 轴的数据
  const xAxisData = dataWithTranslation.map(item => `${item.translation}\n${item.original}`);
  myChart = echarts.init(document.getElementById("main1"));
  myChart.setOption({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params) {
        return `${params[0].name}<br/>${params[0].marker} 弹幕数量: ${params[0].value} 个`;
      },
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: xAxisData,
        axisTick: {
          alignWithLabel: true
        }
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        type: 'bar',
        barWidth: '20%', // 调整宽度
        data: [data.positive.length, data.neutral.length, data.negative.length, data.other.length],
        color: 'rgba(110, 114, 155, 212)',
        itemStyle: {
          borderRadius: [5, 5, 0, 0]
        },
      },
    ]
  });

  console.log(data.other.length);
}
async function analyzeDanmu(items) {
  try {
    const response = await fetch('http://8.130.40.44:5000/analyze_danmu', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ danmus: items }), // 更改为传递整个数组
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
function controlRes(res) {
  vname.value = res.data[0].name;
  console.log(vname.value);
  res.data.forEach((item) => {
    if (item.att !== undefined) {
      let member = [];
      member.push(Number.parseInt(item.att[0]));
      let date = new Date(item.att[4] * 1000);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      let dat = Y + M + D + h + m + s;
      console.log(dat);
      member.push(dat);
      console.log(item.value)
      member.push(item.value);
      data.value.push(member);
    }
  });
  console.log(data.value);
}
</script>

<style lang="sass" scoped>
.box
  height: 100%
  width: 100%
  box-shadow: 0px 1px 4px rgba(21, 34, 50, 0.08)

  &__setting-box
    display: flex
    flex-direction: row
    align-items: center
    justify-content: space-between


    &--title
      height: 24px
      margin-top: 28px
      margin-left: 28px
      font-size: 16px
      font-weight: 700
      letter-spacing: 0px
      line-height: 24px
      color: rgba(19, 21, 35, 1)
      text-align: left
      vertical-align: top

  &__figure-box
    height: 340px
    width: 100%

</style>