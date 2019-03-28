function map_load() {
    var load = document.createElement("script");
    load.src = "http://api.map.baidu.com/api?v=2.0&callback=map_init";
    document.body.appendChild(load);
}

function map_init() {
    var map = new BMap.Map("map"); // 创建Map实例
    var point = new BMap.Point(112.882851, 28.240399); //地图中心点
    map.centerAndZoom(point, 16); // 初始化地图,设置中心点坐标和地图级别。
    // map.enableScrollWheelZoom(false); //启用滚轮放大缩小
    var points = []; //存放标注点经纬信息的数组
    var marker = []; //存放标注点对象的数组
    var info = []; //存放提示信息窗口对象的数组
    for (var i = 0; i < markerArr.length; i++) {
        var p0 = markerArr[i].point.split(",")[0]; //
        var p1 = markerArr[i].point.split(",")[1]; //按照原数组的point格式将地图点坐标的经纬度分别提出来
        points[i] = new window.BMap.Point(p0, p1); //循环生成新的地图点
        marker[i] = new window.BMap.Marker(points[i]); //按照地图点坐标生成标记
        map.addOverlay(marker[i]);
        var label = new window.BMap.Label(markerArr[i].title, {offset: new window.BMap.Size(20, -10)});
        marker[i].setLabel(label);
        info[i] = new window.BMap.InfoWindow("<p style=‘font-size:14px;line-height:3em;’>" + markerArr[i].title + "</br>地址：" + markerArr[i].address + "</br> 电话：" + markerArr[i].tel + "</br></p>"); // 创建信息窗口对象
    }
    $(function () {
        $(marker).each(function (index) {
            marker[index].addEventListener('click', function () {
                this.openInfoWindow(info[index]);
            })
        })
    })
}
