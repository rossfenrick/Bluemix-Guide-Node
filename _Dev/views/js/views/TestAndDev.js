$(function() {
    var Service = Backbone.Model.extend({
        defaults: {
            id: '1',
            title: 'abc',
        }

        //parse: function(response) {
        //    return response.data;
        //}
    });

    // Create a collection of services
    var ServiceList = Backbone.Collection.extend({
        // url: "/api/album/1",
        url: 'https://api.github.com/repos/vmg/redcarpet/issues?state=closed',
        model: Service
    });

    var ServiceView = Backbone.View.extend({
        tagName: 'li',
        events: {
            'click': 'toggleService'
        },

        initialize: function() {
            this.listenTo(this.model, 'change', this.render);
        },

        render: function() {
            this.$el.html('<input type="checkbox" value="1" name="' + this.model.get('title') + '" /> ' + this.model.get('title') + '<span>$' + this.model.get('artist') + '</span>');
            this.$('input').prop('checked', this.model.get('checked'));

            return this;
        },

        toggleService: function() {
            console.log('click');
        }
    });

    var App = Backbone.View.extend({
        el: $('#main'),

        initialize: function() {
            var serviceList = new ServiceList(),
            //services    = $(this.el).html('<div id="services"></div>'),
                services    = $(this.el).find('#services'),
                serviceView;

            serviceList.fetch({
                success: function (collection) {
                    collection.each(function (model) {
                        serviceView = new ServiceView({
                            model: model
                        });

                        services.append(serviceView.render().el);
                    });
                }
            });
        },

        render: function() {
            return this;
        }
    });

    new App();
});