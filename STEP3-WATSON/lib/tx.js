(function() {
  var Tx;
  var verdata;

  exports.tx = function(request, response, todoDB) {
    return new Tx(request, response, todoDB);
  };

  Tx = (function() {
    function Tx(request, response, todoDB) {
      this.request = request;
      this.response = response;
      this.todoDB = todoDB;
    }

    Tx.prototype.search = function() {
      return this.todoDB.search().then((function(_this) {
        return function(items) {
          //verdata = _this.response.send(items.title);
          //return datapassed(verdata);
          //console.log(_this.response.send(items.item.value));

          return _this.response.send(items);
        };
      })(this)).fail((function(_this) {
        return function(err) {
          return _this.response.send(500, {
            err: "" + err
          });
        };
      })(this)).done();
    };

    Tx.prototype.create = function create(datapassed) {
      return this.todoDB.create(this.request.body).then((function(_this)
      {
        return function (item) {
          return _this.response.send(item);
        };

      })(this)).fail((function(_this) {
        return function(err) {
          return _this.response.send(500, {
            err: "" + err
          });
        };
      })(this)).done();

    };

    Tx.prototype.read = function() {
      return this.todoDB.read(this.request.params.id).then((function(_this) {
        return function(item) {
          if (item != null) {
            return _this.response.send(item);
          } else {
            return _this.response.send(404);
          }
        };
      })(this)).fail((function(_this) {
        return function(err) {
          return _this.response.send(500, {
            err: "" + err
          });
        };
      })(this)).done();
    };




    Tx.prototype.update = function() {
      return this.todoDB.read(this.request.params.id).then((function(_this) {
        return function(item) {
          if (item == null) {
            _this.response.send(404);
            return null;
          }
          return _this.todoDB.update(_this.request.params.id, _this.request.body).then(function(item) {

            return _this.response.send(item);
          });
        };
      })(this)).fail((function(_this) {
        return function(err) {
          return _this.response.send(500, {
            err: "" + err
          });
        };
      })(this)).done();
    };

    Tx.prototype["delete"] = function() {
      return this.todoDB.read(this.request.params.id).then((function(_this) {
        return function(item) {
          if (item == null) {
            _this.response.send(404);
            return null;
          }
          return _this.todoDB["delete"](_this.request.params.id).then(function(id) {
            return _this.response.send(item);
          });
        };
      })(this)).fail((function(_this) {
        return function(err) {
          return _this.response.send(500, {
            err: "" + err
          });
        };
      })(this)).done();
    };

    return Tx;

  })();

}).call(this);
