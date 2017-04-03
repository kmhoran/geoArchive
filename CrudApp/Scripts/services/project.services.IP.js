// Service for getting user's location based on current IP address

project.services.IP = project.services.IP || {};


project.services.IP.getLocation = function (onSuccess, onError) {
                // GeoLocation from IP address API
                var url = "http://ip-api.com/json";

                var settings = {
                    cache: false,
                    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                    dataType: "jsonp",
                    success: onSuccess,
                    error: onError,
                    type: "GET",
                    crossDomain: true,
                }

                $.ajax(url, settings);
            }