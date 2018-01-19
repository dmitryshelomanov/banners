module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('rules', [
    {
      id: 1,
      area_id: 1,
      type: 'add',
      bind_element: 'head',
      position: 'TOP',
      content: '<meta name="ad.size" content="width=300,height=300">',
    },
    {
      id: 2,
      area_id: 1,
      type: 'wrapp',
      bind_element: '#canvas',
      position: null,
      content: '<a href="%link1%" target="_blank">body</a>',
    },
    {
      id: 3,
      area_id: 1,
      type: 'check_size',
      bind_element: null,
      position: null,
      content: 200,
    },
    {
      id: 4,
      area_id: 2,
      type: 'add',
      bind_element: 'body',
      position: 'DOWN',
      content: '<script>document.getElementById("click1_area").href = yandexHTML5BannerApi.getClickURLNum(1);</script>',
    },
    {
      id: 5,
      area_id: 2,
      type: 'wrapp',
      bind_element: '#canvas',
      position: null,
      content: '<a id="click1_area" href="#" target="_blank">body</a> ',
    },
    {
      id: 6,
      area_id: 2,
      type: 'add',
      bind_element: 'head',
      position: 'TOP',
      content: '<meta name="ad.size" content="width=300,height=250">',
    },
    {
      id: 7,
      area_id: 2,
      type: 'script_substitution',
      bind_element: 'head',
      position: 'TOP',
      content: '<script type="text/javascript" src="https://awaps.yandex.net/data/lib/adsdk.js"></script><script type="text/javascript" src="https://code.createjs.com/createjs-2015.11.26.min.js"></script>',
    },
  ], {}),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('rules', null, {}),
}
