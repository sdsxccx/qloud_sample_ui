const data = [
  {
    name: '查看目录',
    ori: '对你说你的卡上呢',
    list: 'dnasdnaskd',
    address: '陕西省西安市',
    tags: '日常巡检',
    state: '已完成',
    id: "1",
    type: 'yes',
    time: '2019-03-24 17:07:54',
    endtime: '2019-03-24 17:07:54',
    value: '',
    hasChildren: true,
  },
  {
    name: '查看目录',
    ori: '对你说你的卡上呢',
    list: 'dnasdnaskd',
    address: '陕西省西安市',
    id: "4",
    tags: '日常巡检',
    state: '已完成',
    type: 'yes',
    time: '2019-03-24 17:07:54',
    endtime: '2019-03-24 17:07:54',
    value: '',
    hasChildren: true,
  },
  {
    name: '查看目录',
    ori: '对你说你的卡上呢',
    list: 'dnasdnaskd',
    address: '陕西省西安市',
    tags: '日常巡检',
    id: "7",
    state: '已完成',
    type: 'yes',
    time: '2019-03-24 17:07:54',
    endtime: '2019-03-24 17:07:54',
    value: ''
  },
];
export default [
  {
    url: '/table/list',
    type: 'get',
    response: _ => {
      return {
        code: 200,
        list:data
      }
    }
  },
]
