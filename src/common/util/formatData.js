// 由于原系统数据规划不合理，强行修改后台会影响线上系统运行，
//所以根据需要修改部分数据，若后期有其他方式的话再自行是否使用
/**
 * 
 * code: 0,
data: {
    flowActivityInstance: {},
    flowActivityInstanceUser: {},
    flowActivityInstances: [],
    flowInstanceId: ""
},message: '',
 *  */

export const statusOption = [
    { value: "1", label: "未处理", },
    { value: "2", label: "正在处理", },
    { value: "10", label: "搁置", },
    { value: "100", label: "已完成", },
    { value: "-1", label: "驳回", }
];

const detailSpeHead = [
    { label: "任务名称", name: "title", groupName: "详情", type: "string", position: "1" },
    { label: "任务描述", name: "content", groupName: "详情", type: "string", position: "2" },
    {
        label: "任务状态",
        name: "status",
        groupName: "详情",
        type: "type",
        option: statusOption,
        position: "3"
    },
    { label: "相关内容", name: "flowInstance", groupName: "详情", type: "child", position: "4" },
    { label: "创建时间", name: "createDatetime", groupName: "详情", type: "date", format: "YYYY-MM-DD", position: "5" },
];

const offerDetailHead = [
    { label: "客户姓名", name: "customerName", groupName: "客户信息", type: "string", position: "1" },
    { label: "房屋类型", name: "houseHouseModel", groupName: "客户信息", type: "string", position: "2" },
    { label: "房屋户型", name: "houseHouseType", groupName: "客户信息", type: "string", position: "3" },
    { label: "房屋新旧", name: "houseHouseAge", groupName: "客户信息", type: "string", position: "4" },
    { label: "房屋建筑面积(用于报价)(㎡)", name: "houseBuildingArea", groupName: "客户信息", type: "string", position: "5" },
    { label: "实测套内建筑面积(㎡)", name: "houseActualArea", groupName: "客户信息", type: "string", position: "6" },
    { label: "实测套内建筑面积(不含内墙)(㎡)", name: "insideActualArea", groupName: "客户信息", type: "string", position: "7" },
    { label: "硬装套包", name: "hardPackage", groupName: "客户信息", type: "string", position: "8" },
    { label: "方案风格", name: "style", groupName: "客户信息", type: "string", position: "9" },

    { label: "标配硬装总价(元)", name: "standardPrice", groupName: "费用信息", type: "string", position: "1" },
    { label: "老房拆除修复总价(元)", name: "changeFee", groupName: "费用信息", type: "string", position: "2" },
    { label: "硬装个性化施工价(元)", name: "personalServicePrice", groupName: "费用信息", type: "string", position: "3" },
    { label: "硬装个性化产品价(元)", name: "personalProductPrice", groupName: "费用信息", type: "string", position: "4" },
    { label: "税金(元)", name: "tax", groupName: "费用信息", type: "string", position: "5" },
    { label: "硬装总价(元)", name: "hardPrice", groupName: "费用信息", type: "string", position: "6" },
    { label: "软装价(元)", name: "softPrice", groupName: "费用信息", type: "string", position: "7" },
    { label: "全案价(元)", name: "totalPrice", groupName: "费用信息", type: "string", position: "8" },
    { label: "远程费(元)", name: "remoteFee", groupName: "费用信息", type: "string", position: "9" },
    { label: "周边产品总价(元)", name: "procurementProductPrice", groupName: "费用信息", type: "string", position: "10" },
    { label: "优惠费(元)", name: "discount", groupName: "费用信息", type: "string", position: "11" },
    { label: "合同总价(元)", name: "actualPayment", groupName: "费用信息", type: "string", position: "12" }
];

export function formatDetailSpe(data) {
    const nextData = data.data.flowActivityInstance;
    const flowActivityInstances = data.data.flowActivityInstances;
    const activityData = {
        head: detailSpeHead,
        data: nextData,
        flowActivityInstances,
        statusOption
    };
    return nextData ? activityData : {
        head:[],
        data:[],
        flowActivityInstances:data.data,
    }
}

export function formatOfferDetailData(offer) {
    return {
        head: offerDetailHead,
        data: offer,
        tabs: {
            code: 0,
            message: '',
            spaces: []
        }
    }
}





