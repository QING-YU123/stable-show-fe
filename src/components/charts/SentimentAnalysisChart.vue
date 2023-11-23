<template>
    <div class="chart-view">
        <h2>视频题目：{{ vname }}</h2>
        <el-text class="pl-5">
            弹幕总数：{{ data.length }}
        </el-text>
        <div class="mt-5 h-[100%]">
            <div id="main" style="height: 80%;"></div>
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
    console.log(data.value);
    console.log('Positive Data:', data.positive);
    console.log('Neutral Data:', data.neutral);
    console.log('Negative Data:', data.negative);
    console.log('Other Data:', data.other);
    // } else {
    //   console.error('Error loading JSON file:', xhr.status);
    // }
    // 找到数据中的最小日期
    var minDate = new Date(Math.min(
        ...data.positive.map(item => new Date(item[1]).getTime()),
        ...data.neutral.map(item => new Date(item[1]).getTime()),
        ...data.negative.map(item => new Date(item[1]).getTime()),
        ...data.other.map(item => new Date(item[1]).getTime())
    ));
    // 将最小日期减去半年
    // 将最小日期转换为 YYYY-MM-DD格式的字符串
    var minDateString = minDate.getFullYear() + '-' + (minDate.getMonth() + 1) + '-' + minDate.getDate();
    console.log(minDateString);
    myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
        title: {
            text: '每条弹幕的情绪情况', // 设置标题文本
            textStyle: {
                fontSize: 18, // 设置标题字体大小
                fontWeight: 'bold' // 设置标题字体粗细
            },
            padding: 10 // 设置标题内边距
        },
        color: ['#ffc000', '#ff9999', '#8fd9b6', '#808080'],
        legend: {
            // 右边显示，纵向

            right: 50,
            top: 30,
            data: ['积极', '中性', '消极', '其它'],
            textStyle: {
                fontSize: 16
            }
        },
        grid: {
            left: '10%',
            right: 150,
            top: '18%',
            bottom: '10%',
            containLabel: true, // 设置为 true，确保内容包含在容器中
        },
        tooltip: {
            formatter: function (params) {
                // 获取评论日期、弹幕内容和视频时间
                var commentDate = params.data[1];  // 评论日期
                var danmuContent = params.data[2];  // 弹幕内容
                var videoTime = params.data[0];  // 视频时间
                var fourthElement = params.value[3];  // 用于判断情感的值
                // 计算分钟和秒
                var minutes = Math.floor(videoTime / 60);
                var seconds = videoTime % 60;
                // 将结果输出为字符串
                var formattedTime = minutes + "分钟 " + seconds + "秒";
                // 进行拼接
                var result;
                if (fourthElement === 'positive') {
                    result = "弹幕内容：" + danmuContent + "<br>评论日期：" + commentDate + "<br>视频时间：" + formattedTime + "<br>情感：积极";
                } else if (fourthElement === 'negative') {
                    result = "弹幕内容：" + danmuContent + "<br>评论日期：" + commentDate + "<br>视频时间：" + formattedTime + "<br>情感：消极";
                } else if (fourthElement === 'neutral') {
                    result = "弹幕内容：" + danmuContent + "<br>评论日期：" + commentDate + "<br>视频时间：" + formattedTime + "<br>情感：中性";
                } else {
                    result = "弹幕内容：" + danmuContent + "<br>评论日期：" + commentDate + "<br>视频时间：" + formattedTime + "<br>情感：其它";
                }

                return result;
            }

        },
        xAxis: {
            type: 'value',
            name: '视频时间',
            nameGap: 16,
            nameTextStyle: {
                fontSize: 16
            },
            splitLine: {
                show: true,
                lineStyle: {
                    type: 'solid', // 将 type 设置为 'solid' 启用实线
                }
            },
            axisLabel: {
                formatter: function (value) {
                    return value + '秒';
                }
            }
        },
        yAxis: {
            type: 'time', // 设置 y 轴类型为时间
            min: minDateString, // 设置 y 轴的最小值
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
                name: '积极',
                symbolSize: 10,
                type: "scatter",
                data: data.positive, // 使用积极情感的数据
                itemStyle: {
                    color: '#ffc000'
                },
            },
            {
                name: '中性',
                symbolSize: 10,
                type: "scatter",
                data: data.neutral, // 使用中性情感的数据
                itemStyle: {
                    color: '#ff9999'
                },
            },
            {
                name: '消极',
                symbolSize: 10,
                type: "scatter",
                data: data.negative, // 使用消极情感的数据
                itemStyle: {
                    color: '#8fd9b6'
                },
            },
            {
                name: '其它',
                symbolSize: 10,
                type: "scatter",
                data: data.other, // 使用其他情感的数据
                itemStyle: {
                    color: '#808080'
                },
            }
        ]
    });
    console.log(data.value);
}
async function analyzeDanmu(items) {
    try {
        const response = await fetch('http://127.0.0.1:5000/analyze_danmu', {
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
  
  .chart-view
    @apply overflow-scroll h-[100%]
    &::-webkit-scrollbar
      @apply w-[5px]
  </style>