<template>
    <div class="chart-view">
        <h2>视频题目：{{ vname }}</h2>
        <el-text class="pl-5">
            弹幕总数：{{ data.length }}
        </el-text>
        <div class="mt-5 h-[100%] ">
            <div id="main" style="height: 90%;"></div>
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
        data.value = [];
    }

    let res = await getDMByBv({
        bv: input.value
    });
    console.log(input.value);
    console.log(res.data);

    controlRes(res);

    myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
        title: {
            left: 'left',
            text: '弹幕时空分布散点图'
        },
        tooltip: {
            formatter: function (params) {
                // 获取评论日期、弹幕内容和视频时间
                var commentDate = params.data[1];  // 评论日期
                var danmuContent = params.data[2];  // 弹幕内容
                var videoTime = params.data[0];  // 视频时间
                // 计算分钟和秒
                var minutes = Math.floor(videoTime / 60);
                var seconds = videoTime % 60;
                // 将结果输出为字符串
                var formattedTime = minutes + "分钟 " + seconds + "秒";
                // 进行拼接
                var result;

                result = "弹幕内容：" + danmuContent + "<br>评论日期：" + commentDate + "<br>视频时间：" + formattedTime

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
        yAxis: {
            name: '弹幕发送时间',
            type: 'time'
        },
        series: {
            symbolSize: 10,
            type: "scatter",
            data: data.value
        }
    });

    console.log(data.value);
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
            member.push(item.value);
            data.value.push(member);
        }
    });
    console.log(data.value);
}

</script>
  
<style lang="sass" scoped>
  
  .chart-view
    @apply h-[100%]
    &::-webkit-scrollbar
      @apply w-[5px]
  </style>