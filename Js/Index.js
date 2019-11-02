$.get(
  "http://localhost/DataCenter",
  { action: "GetWebApiData", URL: 'http://gank.io/api/today' },
  function(data) {
    var json = JSON.parse(data);
    console.log("Gank.io Done!");
    console.log(json);
    $(".Gankio").show();
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    var Data = new Vue({
      el: "#Gankio",
      data: { category: json.category, results: json.results }
    });
    
  $("img.lazy").lazyload({effect: "fadeIn"});
  }
);
function search(){
  $.get(
    "http://localhost/DataCenter",
    { action: "GetWebApiData", URL: "https://api.imjad.cn/cloudmusic/?type=search&s="+$('#sarchInput').val() },
    function(data) {
      console.log('NetCloud Done!')
      
     const json = JSON.parse(data);
      console.log(json);
      NetCloudMusicData._data.Songs = json;
    }
  );
}
$.get(
  "http://localhost/DataCenter",
  { action: "GetWebApiData", URL: "https://www.billboard.com/charts/hot-100" },
  function(data) {
    console.log('BillBoard Done!')
    let Load_Box = document.createElement('div');
    Load_Box .innerHTML = data;
    let DataLoader = Load_Box.getElementsByTagName('div')[29];
    
   const json = JSON.parse(DataLoader.getAttribute('data-charts'));
    console.log(json);
    
    const Data = new Vue({
      el: "#BillBoard",
      data: { Songs:json }
   
        });
  }
);
let NetCloudMusicData;
$(function() {
  
   NetCloudMusicData = new Vue({
    el: "#NetCloudMusic",
    data: { Songs: []}
      });
  $(".titleBottom")
    .children()
    .on("click", function() {
      $(this)
        .siblings()
        .removeClass();
      $(this).addClass("current");
      var pointer = parseInt($(this).attr("Data-id"));
      document.getElementsByClassName("titleContent")[0].style.left =
        -(
          pointer *
          document.getElementsByClassName("titleContent")[0].scrollWidth
        ) /
          3 +
        "px";
    });
    
});
