<template>
    <div class="chart-view">
        <h2>视频题目：{{ vname }}</h2>
        <el-text class="pl-5">
            弹幕总数：{{ vsize }}
        </el-text>
        <div class="mt-5 h-[100%]">
            <div id="main" style="height: 80%;"></div>
        </div>
    </div>
</template>


<script setup>

import { onMounted, onBeforeUpdate, ref, watch } from "vue";
import { getDMByBv, getVedioInfo } from '@/api/dm';
import * as echarts from 'echarts'

const props = defineProps(['bv'])

watch(() => props.bv, async () => {
    input.value = props.bv
    await getDMS()
})

onBeforeUpdate(async () => {
    await getDMS()
})

let input = ref('BV1K741157wC')
var myChart = null;
let rData = ref([]);
let data = [];
let vname = ref("")
let vLength = ref();
let vsize = ref();
//设置数据区间大小
let dSize = 10;
//普通折线图数据
let xdata = [];
let ydata = [];

onMounted(async () => {
    await getDMS();
})

async function getDMS() {
    input.value = props.bv
    if (myChart !== null) {
        data = [];
    }

    //res：视频弹幕数据
    let res = await getDMByBv({
        bv: input.value
    });

    //视频时长：ress.data.duration
    let ress = await getVedioInfo({
        bv: input.value
    });
    vLength.value = ress.data.duration;
    console.log("视频时长:" + vLength.value);
    //处理数据
    // data = [];
    // controlRes(res);
    xdata = [];
    ydata = [];
    dealRes(res);
    var chartDom = document.getElementById('main');
    myChart = echarts.init(chartDom);
    var option;

    option = {
        title: {
            left: 'left',
            text: '弹幕数量分布折线图'
        },
        tooltip: {
            trigger: 'axis',
            formatter: function (params) {
                let content = '';
                console.log("params:" + params);
                console.log(params[0]);
                params.forEach(function (item) {
                    // item.value is an array containing [x, y] values
                    console.log("视频长度" + vLength.value);
                    let xValue = Number.parseInt(params[0].axisValue);
                    let yValue = params[0].value;
                    let xValue1 = 0;
                    if (xValue !== 0 && xValue <= vLength.value) {
                        xValue1 = xValue - dSize;
                        if (xValue + dSize >= vLength.value) {
                            xValue = vLength.value;
                        }
                        // Format and append tooltip content
                        content += `时间段：${xValue1}~${xValue}秒<br>`;
                        content += `弹幕数量: ${yValue}个<br>`;
                    }
                });
                return content;
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xdata,
            axisTick: {
                show: true,
                alignWithLabel: true,
                interval: 0
            }
        },
        yAxis: {
            name: '弹幕数量',
            type: 'value'
        },
        dataZoom: [
            {
                type: 'inside', // 内置的缩放区域
                xAxisIndex: 0, // 对应 x 轴
                start: 0, // 默认开始位置
                end: 100, // 默认结束位置（即不缩放）
            },
            {
                type: 'inside', // 内置的缩放区域
                yAxisIndex: 0, // 对应 y 轴
                start: 0, // 默认开始位置
                end: 100, // 默认结束位置（即不缩放）
            },
        ],
        series: [
            {
                data: ydata,
                type: 'line',
                areaStyle: {},
                smooth: true
            }
        ]
    };
    myChart.setOption(option);
}

//处理数据
function dealRes(res) {
    //获取视频总弹幕数
    vsize.value = 0;
    res.data.forEach((item) => {
        if (item.att !== undefined) {
            vsize.value++;
        }
    })
    //获取视频名称
    vname.value = res.data[0].name;
    for (var i = 0; i <= vLength.value; i++) {
        rData.value[i] = 0;
    }
    //逐个遍历数组
    res.data.forEach((item) => {
        if (item.att !== undefined) {
            if (item.att[0]) {
                let x = Number.parseInt(item.att[0]) + 1;
                rData.value[x]++;
            }
        }
    })
    let temp = 0;
    let ttemp = 0;
    xdata.push(0);
    ydata.push(0);
    for (var i = 1; i <= vLength.value; i++) {
        temp += rData.value[i];
        if (i % dSize === 0 && i + dSize < vLength.value) {
            data.push([i, temp]);
            xdata.push(i);
            ydata.push(temp);
            ttemp = i;
            temp = 0;
        }
        else if (i === vLength.value) {
            data.push([ttemp + dSize, temp]);
            xdata.push(ttemp + dSize);
            ydata.push(temp);
            temp = 0;
        }
    }
    xdata.push(ttemp + dSize);
    ydata.push(0);
}

</script>
  
<style lang="sass" scoped>
  
  .chart-view
    @apply overflow-scroll h-[90vh]
    &::-webkit-scrollbar
      @apply w-[5px]
  </style>