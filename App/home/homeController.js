var app = angular.module("flickrApp");

app.controller('homeController', ['flickrDataService', '$scope', function (flickrDataService, $scope) {
    var controller = this;
    controller.searchValue = "";
    controller.mainImageUrl = "";
    controller.currentId = 0;
     controller.perPage = 30;
    controller.selectedId = "";
    controller.selectedSrc = "";
    controller.selectedCaption = "";
    controller.infiniteScroll = "";

    //Fetch data from Flickr
    controller.getflickrData = function () {
        controller.isLoading = true;
        flickrDataService.getSearchData(controller.searchValue, controller.perPage).then(function (data) {
            controller.flickrData = data.photos.photo;
            controller.createImageUrl(controller.flickrData);
            controller.isLoading = false;
        }).catch(function (data) {
            controller.errorMessage = "Oops! Something went wrong.";
            controller.isLoading = false;
        });
    }

    //Find images and create url
    controller.createImageUrl = function (flickrData) {
        controller.urlData = [];
        var url = "";
        var title= "";
        if (!angular.isUndefined(flickrData) && flickrData.length > 0) {
            controller.mainImageUrl = "https://farm" + flickrData[0].farm + ".staticflickr.com/" + flickrData[0].server + "/" + flickrData[0].id + "_" + flickrData[0].secret + ".jpg";

            for (var i = 0; i < flickrData.length; i++) {
                url = "https://farm" + flickrData[i].farm + ".staticflickr.com/" + flickrData[i].server + "/" + flickrData[i].id + "_" + flickrData[i].secret + ".jpg";
                title = flickrData[i].title;
                controller.urlData.push({
                    id: i,
                    url: url,
                    title: title
                });
            }
        }
    }

    controller.init = function () {
        controller.getflickrData();
    }

    //Search images and show 30 results
    controller.searchImages = function () {
        controller.perPage = 30;
        controller.getflickrData();
    }

    //Get images and preview when clicked and diplay title
    controller.GetImage = function (index) {
        controller.mainImageUrl = "https://farm" + controller.flickrData[index].farm + ".staticflickr.com/" + controller.flickrData[index].server + "/" + controller.flickrData[index].id + "_" + controller.flickrData[index].secret + ".jpg";

        var selectedImage = document.getElementById(index);

        controller.selectedId = selectedImage.id;
        controller.selectedSrc = selectedImage.src;
        controller.selectedCaption = controller.flickrData[index].title;

        var modal = document.getElementById("fullscreen");
        modal.style.display = "block";
        
        var span = document.getElementsByClassName("close")[0];

        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    //Infinite scroll
    window.addEventListener('scroll', () => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if(clientHeight + scrollTop >= scrollHeight - 5) {
            controller.perPage = controller.perPage + 10;
            controller.getflickrData();
        }
    });

    controller.init();

}]);

// Focus on seach bar
document.querySelector('button').addEventListener('click', function () {
    document.getElementById('focus-input').focus();
});

