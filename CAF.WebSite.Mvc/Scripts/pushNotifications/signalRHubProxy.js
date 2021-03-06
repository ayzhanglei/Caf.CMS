﻿function signalRHubProxy(serverUrl, hubName, startOptions) {
    var connection = $.hubConnection(serverUrl);
    var proxy = connection.createHubProxy(hubName);
    //connection.logging = true;
    connection.start(startOptions).done(function () { });

    connection.disconnected(function () {
        setTimeout(function () {
            connection.start();
        }, 5000); // Restart connection after 5 seconds.
    });

    return {
        on: function (eventName, callback) {
            proxy.on(eventName, function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },
        off: function (eventName, callback) {
            proxy.off(eventName, function (result) {
                if (callback) {
                    callback(result);
                }
            });
        },
        invoke: function (methodName, callback) {
            proxy.invoke(methodName)
                .done(function (result) {
                    if (callback) {
                        callback(result);
                    }
                });
        },
        connection: connection
    };
};