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
            // 显示数组第三个值
            formatter: function (params) {
                return "弹幕内容：" + params.data[2];
            }
        },
        xAxis: {},
        yAxis: {
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