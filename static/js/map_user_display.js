/**
 * Created with PyCharm.
 * User: user
 * Date: 14-9-13
 * Time: 下午12:17
 * To change this template use File | Settings | File Templates.
 */
var MyMap;
var MyTiledMapServiceLayer;
var baseMap;

require([
    "esri/map", "esri/toolbars/draw",
    "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol","esri/symbols/PictureMarkerSymbol","esri/geometry/Point","esri/layers/GraphicsLayer",
    "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol", "esri/SpatialReference","esri/InfoTemplate",
    "esri/graphic",
    "dojo/_base/Color", "dojo/dom", "dojo/on", "dojo/domReady!", "dojo/request"
], function(
    Map, Draw,
    SimpleMarkerSymbol, SimpleLineSymbol,PictureMarkerSymbol,Point,GraphicsLayer,
    PictureFillSymbol, CartographicLineSymbol, SpatialReference,InfoTemplate,
    Graphic,
    Color, dom, on, request
    ){
    MyMap = new esri.Map("map", {logo:false,autoResize:true,slider:false, center:[120.58,31.3], zoom:12});
    MyTiledMapServiceLayer = new esri.layers.ArcGISTiledMapServiceLayer("http://cache1.arcgisonline.cn/arcgis/rest/services/ChinaOnlineCommunity/MapServer");
    baseMap = MyMap.addLayer(MyTiledMapServiceLayer);

    dojo.connect(MyMap,"onload", showUserByCoord);

    function showUserByCoord(event){
         request.POST(
            "/ajax/show_user_in_map/",
             {
                 data:{
                     allUser:'xx'
                       },
                 handleAs: "json"
             }).then(function(result){
                alert("success")
             });
    }
});