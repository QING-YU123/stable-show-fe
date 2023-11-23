<template>
    <div class="chart-view">
        <div class="slider-demo-block">
            <el-text class="pl-5">
                视频数量：
            </el-text>
            <el-slider v-model="tdata.NumberOfVideos" show-input max="30" />
        </div>
        <div class="mt-5 h-[100%]">
            <div id="main" style="height: 100%;"></div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, watch, ref, reactive } from "vue";
import { getDM, getDMByBv, getUpsVideo } from '@/api/dm';
import { useMultUpStore } from '@/stores/multUp';
import * as echarts from 'echarts';

// 初始化变量
let myChart = null;
let data = ref([]);
let vname = ref("");
let bvdata = ref([]);
let upVideoList = ref([]);
let userList = ref([]);
let dmList = ref([]);
let dmarr = ref([]);
let upNameList = ref([])
let input = ref('')
const tdata = reactive({
    uidList: [
    ],
    NumberOfVideos: 10,
    ya: [],
    upsData: [

    ],
    tabledata: []
})

const useMultUp = useMultUpStore()


onMounted(async () => {
    await getChartData();
    console.log(tdata.tabledata, "tdata.upsData");
    await getDMS();
})

// 监听NumberOfVideos的变化
watch(() => tdata.NumberOfVideos, async () => {
    await getChartData();
    await getDMS();
})
watch(
    () => useMultUp.getData().length,
    async (newVal, oldVal) => {
        await getChartData();
        await getDMS();
    },
    {
        deep: true
    }
)

// 循环获取每个UID的数据
async function getChartData() {
    tdata.upsData = []
    tdata.tabledata = []
    tdata.ya = []

    // y轴数据,从1到NumberOfVideos
    for (let i = 1; i <= tdata.NumberOfVideos; i++) {
        tdata.ya.push(i)
    }

    tdata.uidList = useMultUp.getData()
    console.log(tdata.uidList, "tdata.uidList");

    for (let i = 0; i < tdata.uidList.length; i++) {
        let res = await getDate(tdata.uidList[i])
        console.log(res, 'res');
        tdata.upsData.push(res.data)
        setOneUpMsg(res.data)
    }
    console.log(tdata.upsData, "tdata.upsData");
}

function setOneUpMsg(data) {
    console.log(data[3], "onece");
    let upName = data[0].author
    console.log(upName, "upName");
    let upVideoDm = []
    for (let i = 0; i < tdata.NumberOfVideos; i++) {
        upVideoDm.push(data[i].video_review)
        console.log(upVideoDm, "upVideoDm");
    }
    let oneUpMsg = {
        name: upName,
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
            focus: 'series'
        },
        data: upVideoDm
    }
    tdata.tabledata.push(oneUpMsg)
}

// 获取特定UID的数据
async function getDate(mid = "255113131") {
    return await getUpsVideo({
        "mid": mid
    });
}


// 更新ECharts图表的数据
async function getDMS() {
    // 初始化或更新ECharts图表
    myChart = null
    myChart = echarts.init(document.getElementById("main"));
    myChart.setOption({
        title: {
            left: 'left',
            text: '多UP弹幕数量趋势分析'
        },
        // ECharts图表选项
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: upNameList.value
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: tdata.ya
        },
        yAxis: {
            type: 'value'
        },
        series: tdata.tabledata
    });

}
</script>


<style lang="sass" scoped>


.slider-demo-block 
    display: flex
    align-items: center

.slider-demo-block .el-slider 
    margin-top: 0
    margin-left: 12px

.chart-view
    @apply overflow-scroll h-[70vh]
    &::-webkit-scrollbar
      @apply w-[5px]

</style>