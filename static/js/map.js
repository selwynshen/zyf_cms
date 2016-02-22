/**
 * Created with PyCharm.
 * User: user
 * Date: 14-9-13
 * Time: 下午12:17
 * To change this template use File | Settings | File Templates.
 */
dojo.require("esri.map");
dojo.require("esri.tasks.geometry");
var MyMap;
var MyTiledMapServiceLayer;
var baseMap;
var initExtent;
function init(){
    initExtent = new esri.geometry.Extent({
        "xmin":120.39,"ymin":31.17,"xmax":120.80,"ymax":31.41,
        "spatialReference":{"wkid":4326}
    });
    MyMap = new esri.Map("map", {logo:false,autoResize:true,slider:false, center:[120.58,31.3], zoom:12});
    MyTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer");
    baseMap = MyMap.addLayer(MyTiledMapServiceLayer);
    dojo.connect(MyMap, "onMouseDown", showCoordinates);
}
function showCoordinates(event){
    var mp = event.mapPoint;
//    var Longitude = dojo.query("input[name='Longitude']");
//    var latitude = dojo.query("input[name='latitude']");
    var Longitude = dojo.byId("longitude");
    var latitude = dojo.byId("latitude");
    Longitude.value = mp.x;
    latitude.value = mp.y;
}
dojo.addOnLoad(init);